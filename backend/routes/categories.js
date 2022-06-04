const { Router } = require("express");
const { validateJWT, validateROLE } = require("../middlewares/authenticated");
const ctrl = require("../controllers/categories");
const router = Router();
const multiparty = require("connect-multiparty");
const path = multiparty({ uploadDir: "./uploads/categories" });

//--> http://localhost:3000/api/categories <--//
router.post("/create", [validateJWT, validateROLE, path], ctrl.create_category);
router.get("/search/:filter?", ctrl.read_category);
router.get("/:id", [validateJWT, validateROLE], ctrl.read_category_by_id);
router.put("/:id", [validateJWT, validateROLE, path], ctrl.update_category);
router.delete("/:id", [validateJWT, validateROLE, path], ctrl.delete_category);
router.get("/image/:img", ctrl.image);

module.exports = router;
