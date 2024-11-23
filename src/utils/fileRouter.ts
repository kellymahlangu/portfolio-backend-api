import {Application, RequestHandler} from 'express';
import fs from 'fs';
import path from 'path';
import {pathToFileURL} from 'url';

export async function loadRoutes(app: Application, routesDir: string): Promise<void> {
    const load = async (dir: string, basePath: string = ''): Promise<void> => {
        const files = fs.readdirSync(dir);

        // Initialize folder-level middleware
        let folderMiddleware: RequestHandler[] = [];
        const middlewareFilePath = path.join(dir, 'middleware.ts');
        const middlewareJsFilePath = path.join(dir, 'middleware.js');

        // Load middleware if `middleware.ts` or `middleware.js` exists
        if (fs.existsSync(middlewareFilePath) || fs.existsSync(middlewareJsFilePath)) {
            const middlewareModulePath = fs.existsSync(middlewareFilePath)
                ? middlewareFilePath
                : middlewareJsFilePath;

            const middlewareModule = await import(pathToFileURL(middlewareModulePath).href);
            if (middlewareModule.default) {
                folderMiddleware = Array.isArray(middlewareModule.default)
                    ? middlewareModule.default
                    : [middlewareModule.default];
            }
        }

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                // Skip folder name in API path if wrapped in parentheses
                const isWrappedFolder = file.startsWith('(') && file.endsWith(')');
                const updatedBasePath = isWrappedFolder ? basePath : `${basePath}/${file}`;
                await load(filePath, updatedBasePath);
            } else if (file.endsWith('.ts') || file.endsWith('.js')) {
                // Ignore middleware files
                if (file === 'middleware.ts' || file === 'middleware.js') {
                    continue;
                }

                // Remove file extension and handle "index" files
                const routePath = file === 'index.ts' || file === 'index.js' ? basePath : `${basePath}/${file.replace(/\.[tj]s$/, '')}`;
                const module = await import(pathToFileURL(filePath).href);
                const route = module.default;

                if (typeof route === 'function') {
                    app.use(routePath || '/', folderMiddleware, route);
                }
            }
        }
    };

    await load(routesDir);
}
