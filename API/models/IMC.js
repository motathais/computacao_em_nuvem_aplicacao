const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IMCSchema = new Schema({

    data: {
        type: String,
    },
    peso: {
        type: String,
    },
    altura: {
        type: Date,
    },
    imc: {
        type: String,
    },
    id_usuario:
    {
        type: String,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("IMC", IMCSchema);