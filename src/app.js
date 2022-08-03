import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000; /* eslint-disable-line */
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
