const Router = require('express');
const router = Router();

const controller = require('../controller/ShopDisController');

router.get("/shop",controller.get);

router.post("/shop", controller.post);

// get discount có ngày expire = expire date
router.get("/shop/expire_date", controller.getDiscountWithExpireDate);

// get những shop có số discount valid lớn hơn n
router.get("/shop/shop_valid_date", controller.getShopHasValidDiscount);

// get trạng thái của mã giảm giá
router.get("/shop/discount_state", controller.getDiscountState);


module.exports = router;