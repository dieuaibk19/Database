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
        console.log(req.query.date);
        ShopDisModel.getDiscountWithExpireDate(req.query.date).then((result) => {
            res.status(200).send(result);
        });
        
    },
    // put: async (req, res) => {
    //     ShopDisModel.updateDiscount();
    //     res.send(result);
    // },

    // delete: async (req, res) => {
    //     ShopDisModel.delete();
    //     res.send(result);
    // }
}