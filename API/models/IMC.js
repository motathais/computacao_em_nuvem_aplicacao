const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IMCSchema = new Schema({

    peso: {
        type: Number,
    },
    altura: {
        type: Number,
    },
    imc: {
        type: Number,
    },
    id_usuario:
    {
        type: String,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("IMC", IMCSchema);