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


//Swagger Login

// Swagger Usuários

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Autenticação do usuário
 *     description: Valida as credenciais do usuário e retorna um token de autenticação para acesso aos endpoints protegidos.
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string  
 *                 example: "maria"
 *               senha:
 *                 type: string  
 *                 example: "senha@123"
 *     responses:
 *       200:
 *         description: Login bem sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário logado com sucesso!"
 *       400:
 *         description: Apelido ou senha não informados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Por favor, preencha as informações para login!"
 *       401:
 *         description: Senha inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Nome de usuário ou senha inválido!"
 *       404:
 *         description: Usuário não existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Nome de usuário ou senha inválido!"  
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro interno no servidor. Tente novamente mais tarde."
 */


module.exports = router;
