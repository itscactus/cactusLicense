require("dotenv").config();
const express = require("express");
const app = express();
const expressEjsLayouts = require("express-ejs-layouts");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const User = require("./models/User.js");
const MemoryStore = require('memorystore')(session);
const bodyParser = require("body-parser");
const Products = require("./models/Products.js");
const moment = require("moment-timezone");
const Sales = require("./models/Sales.js");
let { PORT, MONGO_URI, SESSION_SECRET, DISCORD_TOKEN, DISCORD_SECRET, DISCORD_ID, URI } = process.env;
mongoose.connect(MONGO_URI, {
    keepAlive: true
}).then(() => {
    app.listen(PORT, () => console.log("App is listening on Port " + PORT));
    console.log("[MongoDB] Database connected.")
}).catch((err) => {
    console.log("[MongoDB] Database connect failed.", err)
    process.exit(1);
});
moment.locale('en');
app.set('trust proxy', 1);
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
        checkPeriod: 86400000
    })
}))

app.set("view engine", 'ejs');
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main');

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}))
app.use(bodyParser.json({
    limit: '5mb'
}))

app.use(async(req,res,next) => {
    if(req.session.profile) {
        let user = await User.findOne({
            userId: req.session.profile.id
        });
        req.session.profile.permission = user.permission
    }
    next();
});

app.use('/', express.static('public'))
app.get('/', async(req, res) => {
    res.render('index', {
        profile: (req.session.profile || null)
    });
})

app.use('/api', require('./routers/api.js'));
app.use('/admin', require('./routers/admin.js'));
app.get(['/products/:id', '/products', '/product/:id'], async(req, res) => {
    let id = req.params.id != null ? req.params.id : null;
    let action = id != null ? 'view_product' : 'products';
    let products = await Products.find({});
    let sales = await Sales.find({});
    res.render('products', {
        id,
        products,
        action,
        profile: req.session.profile,
        sales: sales, 
        parseTime: (date) => {
            return moment(date).tz('Europe/Istanbul').calendar()
        }
    })
})

app.get('/login', async(req, res) => {
    let url = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_ID}&redirect_uri=${URI}callback&response_type=code&scope=identify%20email`
    res.redirect(url);
})
app.get('/logout', async(req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    });
})
// Callback
app.get('/callback', async(req, res) => {
    let code = req.query?.code || null;
    if(code == null) return res.send({
        message: "401: Unauthorized."
    });
    const api = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: DISCORD_ID,
            client_secret: DISCORD_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: URI + "callback",
            scope: 'identify'
        }).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then((res) => res.json());
    const userData = await fetch('https://discord.com/api/users/@me', {
        headers: {
            'Authorization': `${api.token_type} ${api.access_token}`
        }
    }).then((res) => res.json());

    req.session.profile = userData;
    res.redirect("/")
});

function checkAuth(req, res, next) {
    if(req.session.profile) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = { checkAuth };