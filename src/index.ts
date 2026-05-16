import { app } from './app.js';
import { env } from './config/env.js';
import { swaggerDocs } from './config/swagger.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = env.PORT;

swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
