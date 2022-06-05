const { Router } = require("express");
const { validateJWT, validateROLE } = require("../middlewares/authenticated");
const ctrl = require("../controllers/discounts");
const router = Router();

var multiparty = require("connect-multiparty");
var path = multiparty({ uploadDir: "./uploads/discounts" });

//--> http://localhost:3000/api/discounts <--//
router.get("/image/:img", ctrl.image);
router.post("/create_discount", [validateJWT, validateROLE, path], ctrl.create_discount);
router.get("/read_discounts/:filter?", [validateJWT, validateROLE], ctrl.read_discounts);
router.get("/read_discount_by_id/:id", [validateJWT, validateROLE], ctrl.read_discount_by_id);
router.put("/update_discount/:id", [validateJWT, validateROLE, path], ctrl.update_discount);
router.delete("/delete_discount/:id", [validateJWT, validateROLE, path], ctrl.delete_discount);
router.get("/get_discount_active", ctrl.get_discount_active);

module.exports = router;
