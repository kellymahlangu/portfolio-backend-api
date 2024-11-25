import express, { Application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadRoutes } from './utils/fileRouter.js';
import { Request, Response, NextFunction } from 'express';
import {Get} from "./utils/fetch.js";


const PORT = process.env.PORT || 3000;
const PUBLIC_API_TOKEN = process.env.PUBLIC_API_TOKEN || 'default-public-token';
const PRIVATE_API_TOKEN = process.env.PRIVATE_API_TOKEN || 'default-private-token';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
export const fetchInstance = new Get()

// Middleware
// @ts-ignore
app.use((req: Request, res:Response, next:NextFunction)=> {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader.split(' ')[1] !== PUBLIC_API_TOKEN) {
        console.log("Unauthorized");
        return res.status(401).json({ message: 'Unauthorized Access' });
    }
    next();
});

// @ts-ignore
app.use('/v0/admin',(req: Request, res:Response, next:NextFunction)=> {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader.split(' ')[1] !== PRIVATE_API_TOKEN) {
        console.log("Unauthorized User Token");
        return res.status(401).json({ message: 'Unauthorized Admin Token' });
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dynamically load routes
loadRoutes(app, path.join(__dirname, 'routes')).then(()=> console.log("Routes Loaded"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});