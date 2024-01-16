import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT: number = 5000;
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});

const mongoURI: string | undefined = process.env.MONGO_URL;

// console.log(mongoURI);

if (!mongoURI) {
  console.error(
    'MongoDB URI is not defined in the environment variables.'
  );
  process.exit(1); // Exit the application if MongoDB URI is not defined.
}

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
