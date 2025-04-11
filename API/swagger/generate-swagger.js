const fs = require('fs');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ["./swagger.js"],
};

const swaggerSpec = swaggerJsDoc(options);

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Arquivo swagger.json gerado com sucesso!');
