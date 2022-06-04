const { Router } = require("express");
const { validateJWT, validateROLE } = require("../middlewares/authenticated");
const ctrl = require("../controllers/suppliers");
const router = Router();

//--> http://localhost:3000/api/suppliers <--//
router.post("/create", [validateJWT, validateROLE], ctrl.create_supplier);
router.get("/search/:filter?", [validateJWT, validateROLE], ctrl.read_suppliers);
router.get("/:id", [validateJWT, validateROLE], ctrl.read_supplier_by_id);
router.put("/:id", [validateJWT, validateROLE], ctrl.update_supplier);
router.delete("/:id", [validateJWT, validateROLE], ctrl.delete_supplier);

module.exports = router;
