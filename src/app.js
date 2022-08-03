import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './router.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 5000; /* eslint-disable-line */
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
