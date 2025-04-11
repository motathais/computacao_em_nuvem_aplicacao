const router = require("express").Router();

const usuarioController = require("../controllers/usuarioController");
const loginController = require("../controllers/loginController");
const calculadoraController = require("../controllers/calculadoraController");
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

// IMC

//router.post("/imc", calculadoraController.create);

router.route("/imc")
  .post(checkToken, calculadoraController.create)
  .get(checkToken, calculadoraController.getAll)


router.route("/imc/:id")
  .get(checkToken, calculadoraController.get)
  .delete(checkToken, calculadoraController.delete)
  .put(checkToken, calculadoraController.update);

module.exports = router;
