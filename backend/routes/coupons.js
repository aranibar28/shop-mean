const { Router } = require("express");
const { validateJWT } = require("../middlewares/authenticated");
const ctrl = require("../controllers/coupons");
const router = Router();

//--> http://localhost:3000/api/coupons <--//
router.post("/create", [validateJWT], ctrl.create_coupon);
router.get("/search/:filter?", [validateJWT], ctrl.read_coupons);
router.get("/:id", [validateJWT], ctrl.read_coupon_by_id);
router.put("/:id", [validateJWT], ctrl.update_coupon);
router.delete("/:id", [validateJWT], ctrl.delete_coupon);

module.exports = router;
