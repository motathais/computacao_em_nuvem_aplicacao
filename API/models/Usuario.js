const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({

    nome: {
        type: String,
    },
    usuario: {
        type: String,
    },
    nascimento: {
        type: Date,
    },
    email: {
        type: String,
    },
    senha: {
        type: String,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);