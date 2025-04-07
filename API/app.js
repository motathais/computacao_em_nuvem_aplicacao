const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');


app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json());


// importando dados do .env

require("dotenv").config({ path: './env/.env' });

const port = process.env.PORT;


// DB Connection

const conn = require("./db/conn");

conn();


// Configuração do Swagger

const setupSwagger = require("./swagger/swagger");

setupSwagger(app);


//Routes

const routes = require("./routes/router");

app.use("/api", routes);

app.listen(port, function () {
    console.log(`Servidor Online na porta ${port}`)
});
