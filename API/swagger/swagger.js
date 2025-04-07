const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Calculadora de IMC",
      version: "1.0.0",
      description: "Documentação Calculadora de IMC",
    },
    servers: [
      {
        url: "https://cuddly-system-q7p7qq55w5c999p-3000.app.github.dev/",
        description: "Servidor Codespace",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./routes/router.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;