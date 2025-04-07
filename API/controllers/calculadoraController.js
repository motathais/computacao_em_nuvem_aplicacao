const IMC = require("../models/IMC");

const calculadoraController = {
  create: async (req, res) => {
    try {
      const { peso, altura, id_usuario } = req.body;

      altura_metros = altura/100

      // criando o registro
      const imc = new IMC({
        peso,
        altura,
        imc: peso / (altura_metros * altura_metros),
        id_usuario,
      });

      // salvando o IMC
      await imc.save();

      res.status(201).json({ imc, message: "IMC registrado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao processar a requisição." });
    }
  },
  // função para buscar todos os registros da lista via GET
  getAll: async (req, res) => {
    try {
      // Exclui o campo 'senha' de todos os registros
      const imc = await IMC.find();

      res.json(imc);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar os registros." });
    }
  },
  // função para buscar apenas um registro passando o ID via GET
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const imc = await IMC.findById(id); // Exclui a senha

      if (!imc) {
        res.status(404).json({ msg: "Registro não encontrado" });
        return;
      }

      res.json(imc);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o registro." });
    }
  },
  // função para deletar o imc passando ID via DELETE
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const imc = await IMC.findById(id);

      if (!imc) {
        res.status(404).json({ msg: "Registro não encontrado!" });
        return;
      }

      const deletedIMC = await IMC.findByIdAndDelete(id);

      res.status(200).json({
        deletedIMC,
        msg: "Registro excluído com sucesso"
      });


    } catch (error) {
      console.log(error)
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      // recebendo os parâmetros do body
      const { peso, altura } = req.body;

      // Montando objeto com os campos atualizados
      const imc = {
        peso,
        altura
      };

      // Atualizando o registro   
      const updatedIMC = await IMC.findByIdAndUpdate(id, imc);


      if (!updatedIMC) {
        return res.status(404).json({ msg: "Registro não encontrado." });
      }

      res.status(200).json({ updatedIMC, msg: "Registro atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao processar a atualização do registro." });
    }
  },
};

module.exports = calculadoraController; 