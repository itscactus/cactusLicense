const express = require("express");
const Sales = require("../models/Sales");
const User = require("../models/User");
const Products = require("../models/Products");
const Licenses = require("../models/Licenses");

const router = express.Router();
router.get("/sales/summary", async(req,res) => {
    let sales = await Sales.find({});
    res.send(sales);
})
router.get("/users/", async(req,res) => {
    let users = await User.find({});
    users = await Promise.all(users.map((usr) => ({
        id: usr.userId,
        username: usr.username,
        discriminator: usr.discriminator
    })));
    res.send(users);
})
router.get("/products", async(req, res) => {
    let products = await Products.find({});
    products = products.filter((product) => product.active == true).map((prd) => ({
        _id: prd.id,
        data: {
            createdAt: prd.createdAt,
            name: prd.name,
            price: prd.price,
            thumbnail: prd.thumbnail,
            iconURL: prd.iconURL,
            active: prd.active,
            _id: prd.id
        }
    }));

    res.send(products);
})
router.get("/licenses", async(req, res) => {
    let licenses = await Licenses.find({});
    licenses = licenses.map((license) => ({
        _id: license.id
    }));

    res.send(licenses);
})

router.post("/users/search", async(req, res) => {
    let { string } = req.body;
    let users = await User.find({});
    let user = await Promise.all(users.filter((usr) => usr.username == string || usr.userId == string || usr.email == string));
    res.send(user);
})

router.post("/products/create", async(req, res) => {
    if(req.session.profile == null || req.session.profile.permission != 1) return res.send({
        message: 'You have no permissions to visit this page.'
    });
    let { name, thumbnail, icon, price, status, description, version, downloadUrl, supportedVersions } = req.body;
    let product = await new Products({
        active: status,
        name: name,
        description: description,
        thumbnail: thumbnail,
        iconURL: icon,
        price: price,
        createdAt: new Date(),
        version: version,
        downloadUrl: downloadUrl,
        supportedVersions: supportedVersions
    }).save();
    res.send(product);
})
router.post("/products/edit", async(req, res) => {
    if(req.session.profile == null || req.session.profile.permission != 1) return res.send({
        message: 'You have no permissions to visit this page.'
    });
    let { id, name, thumbnail, icon, price, status, description, version, downloadUrl, supportedVersions } = req.body;
    let product = await Products.findById(id);
    product.name = name;
    product.description = description;
    product.thumbnail = thumbnail;
    product.iconURL = icon;
    product.price = price;
    product.active = status;
    product.version = version;
    product.downloadUrl = downloadUrl;
    product.supportedVersions = supportedVersions;
    await product.save();
    res.send(product);
})

module.exports = router;