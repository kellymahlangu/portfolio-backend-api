import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadRoutes } from './utils/fileRouter.js';
// Emulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Dynamically load routes
loadRoutes(app, path.join(__dirname, 'routes'));
export default app;
//# sourceMappingURL=app.js.map