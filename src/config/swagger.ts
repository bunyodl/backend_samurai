import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { type Express, type Request, type Response } from 'express';
import { env } from './env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.join(__dirname, '..');
const ext = path.basename(baseDir) === 'dist' ? 'js' : 'ts';

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
      url: `${env.API_URL}/swagger.json`,
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(baseDir, 'config', `swagger-schemas.${ext}`),
    path.join(baseDir, 'modules', '**', `*.${ext}`),
  ], // files containing annotations
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
