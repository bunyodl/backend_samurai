import { app } from '@/app';
import { env } from '@/config/env';
import { swaggerDocs } from '@/config/swagger';

const PORT = env.PORT;

swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
