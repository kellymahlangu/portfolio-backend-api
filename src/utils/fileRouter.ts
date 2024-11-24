import { Application } from 'express';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export async function loadRoutes(app: Application, routesDir: string): Promise<void> {
    const load = async (dir: string, basePath: string = ''): Promise<void> => {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                // Skip folder name in API path if wrapped in parentheses
                const isWrappedFolder = file.startsWith('(') && file.endsWith(')');
                const updatedBasePath = isWrappedFolder ? basePath : `${basePath}/${file}`;
                await load(filePath, updatedBasePath);
            } else if (file.endsWith('.ts') || file.endsWith('.js')) {
                // Remove file extension and handle "index" files
                const routePath = file === 'index.ts' || file === 'index.js' ? basePath : `${basePath}/${file.replace(/\.[tj]s$/, '')}`;
                const module = await import(pathToFileURL(filePath).href);
                const route = module.default;

                if (typeof route === 'function') {
                    app.use(routePath || '/', route);
                }
            }
        }
    };

    await load(routesDir);
}
