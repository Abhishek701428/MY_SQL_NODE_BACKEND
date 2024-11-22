import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import path from 'path';
import * as dotenv from "dotenv";
import { testConnection } from './database/db';
import authRoutes from './modules/authUsers/auth-routes'
import categoryRoutes from './modules/category/category-routes'
import serviceRoutes from './modules/service/service-routes'
dotenv.config();
testConnection();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cors({origin: '*'}));
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hi, I am Hi Tech Project!</h1>`);
});
//For Users 
app.use('/api/auth',authRoutes)
app.use('/api',categoryRoutes)
app.use('/api',serviceRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
