// Components

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6613f2bdc315bc5b6210e5a3"
 *         nome:
 *           type: string
 *           example: "João da Silva"
 *         usuario:
 *           type: string
 *           example: "joaodasilva"
 *         nascimento:
 *           type: string
 *           format: date
 *           example: "1990-05-21"
 *         email:
 *           type: string
 *           example: "joao@email.com"

 *     UsuarioCreate:
 *       type: object
 *       required:
 *         - nome
 *         - usuario
 *         - nascimento
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *         usuario:
 *           type: string
 *         nascimento:
 *           type: string
 *           format: date
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *           format: password

 *     IMC:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6614ab27a13e54a13d2ff3c7"
 *         peso:
 *           type: number
 *           example: 70
 *         altura:
 *           type: number
 *           example: 175
 *         imc:
 *           type: number
 *           example: 22.86
 *         id_usuario:
 *           type: string
 *           example: "6613f2bdc315bc5b6210e5a3"

 *     IMCCreate:
 *       type: object
 *       required:
 *         - peso
 *         - altura
 *         - id_usuario
 *       properties:
 *         peso:
 *           type: number
 *           example: 70
 *         altura:
 *           type: number
 *           example: 175
 *         id_usuario:
 *           type: string
 *           example: "6613f2bdc315bc5b6210e5a3"
 */


// Swagger Login:

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Login]
 *     description: Realiza o login de um usuário e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - senha
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: joaodasilva
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                 msg:
 *                   type: string
 *                   example: Usuário logado com sucesso!
 *       400:
 *         description: Dados incompletos fornecidos
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */

// Swagger usuários

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCreate'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuarios:
 *                   $ref: '#/components/schemas/Usuario'
 *                 message:
 *                   type: string
 *                   example: "Usuário criado com sucesso!"
 *       401:
 *         description: Usuário ou e-mail já existente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "O email inserido já está em uso, por gentileza utilize outro."
 *       500:
 *         description: Erro interno no servidor

 *   get:
 *     summary: Lista todos os usuários (sem senhas)
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro ao buscar usuários

 * /api/usuarios/{id}:
 *   get:
 *     summary: Busca um único usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário

 *   put:
 *     summary: Atualiza um usuário por ID (sem alterar senha)
 *     tags: [Usuários]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               usuario:
 *                 type: string
 *               nascimento:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedUsuario:
 *                   $ref: '#/components/schemas/Usuario'
 *                 msg:
 *                   type: string
 *                   example: "Usuário atualizado com sucesso!"
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar

 *   delete:
 *     summary: Remove um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedUsuario:
 *                   $ref: '#/components/schemas/Usuario'
 *                 msg:
 *                   type: string
 *                   example: "Usuário excluído com sucesso"
 *       404:
 *         description: Usuário não encontrado
 */

// Swagger IMC

/**
 * @swagger
 * /api/imc:
 *   post:
 *     summary: Registra um novo cálculo de IMC
 *     tags: [IMC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IMCCreate'
 *     responses:
 *       201:
 *         description: IMC registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imc:
 *                   $ref: '#/components/schemas/IMC'
 *                 message:
 *                   type: string
 *                   example: IMC registrado com sucesso!
 *       500:
 *         description: Erro ao processar a requisição

 *   get:
 *     summary: Lista todos os registros de IMC
 *     tags: [IMC]
 *     responses:
 *       200:
 *         description: Lista de registros de IMC
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IMC'
 *       500:
 *         description: Erro ao buscar os registros

 * /api/imc/{id}:
 *   get:
 *     summary: Busca um registro de IMC por ID
 *     tags: [IMC]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IMC'
 *       404:
 *         description: Registro não encontrado
 *       500:
 *         description: Erro ao buscar o registro

 *   put:
 *     summary: Atualiza um registro de IMC por ID (recalcula no backend)
 *     tags: [IMC]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               peso:
 *                 type: number
 *                 example: 75
 *               altura:
 *                 type: number
 *                 example: 180
 *     responses:
 *       200:
 *         description: Registro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedIMC:
 *                   $ref: '#/components/schemas/IMC'
 *                 msg:
 *                   type: string
 *                   example: Registro atualizado com sucesso!
 *       404:
 *         description: Registro não encontrado
 *       500:
 *         description: Erro ao atualizar

 *   delete:
 *     summary: Remove um registro de IMC por ID
 *     tags: [IMC]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedIMC:
 *                   $ref: '#/components/schemas/IMC'
 *                 msg:
 *                   type: string
 *                   example: Registro excluído com sucesso
 *       404:
 *         description: Registro não encontrado
 */