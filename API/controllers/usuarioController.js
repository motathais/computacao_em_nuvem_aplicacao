const Usuarios = require("../models/Usuario");

const bcrypt = require('bcrypt');

const usuarioController = {
  create: async (req, res) => {
    try {
      const { nome, usuario, nascimento, email, senha } = req.body;

      // configurando hash de senha
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(senha, salt);

      // validando se usuário e apelido já existem
      const usuarioExiste = await Usuarios.findOne({ usuario });
      const emailExiste = await Usuarios.findOne({ email });

      if (usuarioExiste) {
        return res.status(401).json({ message: "O usuario inserido está em uso, por gentileza utilize outro." });
      }

      if (emailExiste) {
        return res.status(401).json({ message: "O email inserido já está em uso, por gentileza utilize outro." });
      }

      // criando o usuário
      const usuarios = new Usuarios({
        nome,
        usuario,
        nascimento,
        email,
        senha: hash,
      });

      // salvando o usuário
      await usuarios.save();

      const { senha: _, ...usuarioSemSenha } = usuarios.toObject();

      res.status(201).json({ usuarios: usuarioSemSenha, message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao processar a requisição." });
    }
  },
  // função para buscar todos os usuários da lista via GET
  getAll: async (req, res) => {
    try {
      // Exclui o campo 'senha' de todos os usuários
      const usuarios = await Usuarios.find({}, '-senha');

      res.json(usuarios);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar usuários." });
    }
  },
  // função para buscar apenas um usuário passando o ID via GET
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await Usuarios.findById(id, '-senha'); // Exclui a senha

      if (!usuario) {
        res.status(404).json({ msg: "Usuário não encontrado" });
        return;
      }

      res.json(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o usuário." });
    }
  },
  // função para deletar o usuário passando ID via DELETE
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const usuario = await Usuarios.findById(id);

      if (!usuario) {
        res.status(404).json({ msg: "Usuário não encontrado!" });
        return;
      }

      const deletedUsuario = await Usuarios.findByIdAndDelete(id).select("-senha");

      res.status(200).json({
        deletedUsuario,
        msg: "Usuário excluído com sucesso"
      });


    } catch (error) {
      console.log(error)
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      // recebendo os parâmetros do body
      const { nome, nascimento, email } = req.body;

      // Montando objeto com os campos atualizados
      const usuario = {
        nome,
        usuario,
        nascimento,
        email
      };

      // Atualizando o usuário   
      const updatedUsuario = await Usuarios.findByIdAndUpdate(id, usuario).select("-senha")


      if (!updatedUsuario) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      res.status(200).json({ updatedUsuario, msg: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao processar a atualização do usuário." });
    }
  },
};

module.exports = usuarioController; 