import express, { Application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadRoutes } from './utils/fileRouter.js';
import {validateToken} from "./middleware/validate.js";

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.PRIVATE_TOKEN_SECRET || 'default-private-secret';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();

// Middleware
app.use(validateToken(TOKEN))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dynamically load routes
loadRoutes(app, path.join(__dirname, 'routes')).then(()=> console.log("Routes Loaded"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});