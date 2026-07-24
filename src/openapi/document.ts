import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';

import '@/openapi/register-paths';
import { registry } from '@/openapi/registry-instance';

import { env } from '@/config/env';

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'GoingSpot API',
    version: '1.0.0',
    description: 'Local event discovery and coordination API',
  },
  servers: [
    {
      url: env.API_URL,
    },
  ],
  externalDocs: {
    description: 'Swagger json file',
    url: `${env.API_URL}/swagger.json`,
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
});

openApiDocument.components ??= {};
openApiDocument.components.securitySchemes = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
};
