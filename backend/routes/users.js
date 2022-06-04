const { Router } = require("express");
const crtl = require("../controllers/users");
const { validateJWT, validateROLE } = require("../middlewares/authenticated");
const { validateUser } = require("../middlewares/validate-fields");
const router = Router();

//--> http://localhost:3000/api/users <--//
router.post("/create", [validateUser], crtl.create_user);
router.get("/search", [validateJWT, validateROLE], crtl.read_users);
router.get("/:id", [validateJWT, validateROLE], crtl.read_user_by_id);
router.put("/:id", [validateJWT, validateROLE], crtl.update_user);
router.delete("/:id", [validateJWT, validateROLE], crtl.delete_user);

module.exports = router;
