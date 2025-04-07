const router = require("express").Router();

const usuarioController = require("../controllers/usuarioController");
const loginController = require("../controllers/loginController");
const { checkToken } = require("../checkToken/checkToken");

// Usuários
router.post("/usuarios", usuarioController.create);

router.route("/usuarios")
  .get(checkToken, usuarioController.getAll);

router.route("/usuarios/:id")
  .get(checkToken, usuarioController.get)
  .delete(checkToken, usuarioController.delete)
  .put(checkToken, usuarioController.update);

// Login
router.post("/login", loginController.post);

module.exports = router;
