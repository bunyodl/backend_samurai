import swaggerUi from 'swagger-ui-express';
import { type Express, type Request, type Response } from 'express';
import { openApiDocument } from '../openapi/document.js';

export function swaggerDocs(app: Express) {
  app.use('/api-spec', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  app.get('/swagger.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(openApiDocument);
  });
}
