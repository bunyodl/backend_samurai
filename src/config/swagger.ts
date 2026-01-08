import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { type Express, type Request, type Response } from 'express';

// Swagger setup
const swaggerOptions: swaggerJsDoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Samurai API',
      version: '1.0.0',
      description: 'API documentation',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    externalDocs: {
      description: 'Swagger json file',
      url: `${process.env.API_URL}/swagger.json`,
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/config/swagger-schemas.ts', './src/entities/**/*.ts'], // files containing annotations
};

// Setup swagger
const swaggerSpec = swaggerJsDoc(swaggerOptions);

export function swaggerDocs(app: Express) {
  // Swagger page
  app.use('/api-spec', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/swagger.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(swaggerSpec);
  });
}
