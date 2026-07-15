import { env } from '@/config/env';
import { swaggerDocs } from '@/config/swagger';

import { app } from '@/app';

const PORT = env.PORT;

swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
