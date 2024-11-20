import { Application } from 'express';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export async function loadRoutes(app: Application, routesDir: string): Promise<void> {
    const load = async (dir: string, basePath: string = ''): Promise<void> => {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const routePath = `${basePath}/${file.replace(/\.[tj]s$/, '')}`; // Remove file extension

            if (fs.statSync(filePath).isDirectory()) {
                await load(filePath, routePath);
            } else if (file.endsWith('.ts') || file.endsWith('.js')) {
                const route = (await import(pathToFileURL(filePath).href)).default;
                if (typeof route === 'function') {
                    app.use(routePath === '/index' ? '/' : routePath, route);
                }
            }
        }
    };

    await load(routesDir);
}
