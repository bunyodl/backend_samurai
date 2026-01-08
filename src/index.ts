import { app } from './app.js';
import { swaggerDocs } from './config/swagger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port hahaha ${PORT}`);

  swaggerDocs(app);
});
