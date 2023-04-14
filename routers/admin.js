const express = require("express");
const Products = require('../models/Products');
const router = express.Router();
router.get('/', async(req, res) => {
    if(req.session.profile && req.session.profile.permission == 1) {
        res.render('admin/index', {
            layout: 'layouts/admin',
            profile: req.session.profile
        });
    } else {
        res.redirect('/');
    }
})

router.get(['/products/:action', '/products/', '/products/:action/:id'], async(req, res) => {
    if(req.session.profile && req.session.profile.permission == 1) {
        let action = req.params.action != null ? req.params.action : 'list'
        let id = req.params.id != null ? req.params.id : null;
        let product = id != null ? await Products.findById(id).catch(err => (null)) : null;
        if(action == 'delete' && product != null) {
            await product.deleteOne();
            return res.redirect('/admin/products');
        }
        res.render('admin/products', {
            layout: 'layouts/admin',
            profile: req.session.profile,
            action,
            id,
            product
        });
    } else {
        res.redirect('/');
    }
})

module.exports = router;