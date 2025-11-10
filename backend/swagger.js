// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for managing contacts (CSE341 - W02 Project: Contacts Part 2). Armenta',
    version: '1.0.0',
  },
  host: 'localhost:8080',
  schemes: ['http'],
  tags: [
    {
      name: 'Contacts',
      description: 'Endpoints for managing contacts',
    },
  ],
  definitions: {
    Contact: {
      firstName: 'Ana',
      lastName: 'Pérez',
      email: 'ana@example.com',
      favoriteColor: 'Blue',
      birthday: '1998-04-12',
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.js', './routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('swagger.json correcly generated');
});
