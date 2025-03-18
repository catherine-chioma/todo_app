import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'API documentation for the Todo app',
    },
  },
  apis: ['./src/routes/*.ts'],  // Path to your API route files (adjust as needed)
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
