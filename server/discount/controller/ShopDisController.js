const ShopDisModel = require('../model/ShopDisModel');

module.exports = {
    get: (req, res) => {

        ShopDisModel.getAllDiscount().then((result) => {
            res.status(200).send(result);
        });
        
    },

    post: async (req, res) => {
        //validate dữ liệu
        ShopDisModel.addDiscount(req.body)
        .then((result) => {
            res.status(200).send(result);
        });
    },
    
    getDiscountWithExpireDate: (req, res) => {
        ShopDisModel.getDiscountWithExpireDate(req.query.date).then((result) => {
            res.status(200).send(result);
        });
        
    },

    getShopHasValidDiscount : (req, res) => {
        ShopDisModel.getShopHasValidDiscount(req.query.num).then((result) => {
            res.status(200).send(result);
        });
        
    },

    getDiscountState : (req, res) => {
        ShopDisModel.getDiscountState(req.query.code).then((result) => {
            res.status(200).send(result);
        });
        
    },
}