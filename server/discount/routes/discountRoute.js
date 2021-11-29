const Router = require('express');
const router = Router();

const controller = require('../controller/ShopDisController');

router.get("/shop",controller.get);

router.post("/shop", controller.post);

// get discount có ngày expire = expire date
router.get("/shop/expire_date", controller.getDiscountWithExpireDate);

// get những shop có số discount valid là n
router.get("/shop/shop_valid_date", controller.getShopHasValidDiscount);

// router.put("/shop", controller.put);

// router.delete("/shop", controller.delete);

module.exports = router;