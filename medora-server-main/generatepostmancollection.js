// generatePostmanCollectionFull.js
const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, 'routes'); 
const CONTROLLERS_DIR = path.join(__dirname, 'controllers');
const OUTPUT_FILE = path.join(__dirname, 'postman_collection.json');

// UTIL: Sentence Case for folders
function toSentenceCase(str) {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, char => char.toUpperCase())
        .trim()
        .replace(/\b\w/g, c => c.toUpperCase());
}

// UTIL: Parse route file for endpoints
function parseRouteFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /router\.(post|get|put|delete)\(["'`](.*?)["'`],\s*(\w+)/gi;
    const routes = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        routes.push({
            method: match[1].toUpperCase(),
            path: match[2],
            controllerFn: match[3] // function name in controller
        });
    }
    return routes;
}

// UTIL: Get example body from controller (requires controllers exporting field examples)
function getExampleBody(controllerName, functionName) {
    try {
        const controller = require(path.join(CONTROLLERS_DIR, controllerName));
        return controller.examples && controller.examples[functionName] || {};
    } catch (err) {
        return {};
    }
}

// MAIN
function generateCollection() {
    const collection = {
        info: {
            name: "Medora API",
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
            description: "Auto-generated Postman collection for Medora API"
        },
        item: []
    };

    let routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.route.js'));
    routeFiles.sort();

    for (const file of routeFiles) {
        const routes = parseRouteFile(path.join(ROUTES_DIR, file));
        if (!routes.length) continue;

        const folderName = toSentenceCase(file.replace('.route.js', ''));
        const folderItem = { name: folderName, item: [] };

        for (const r of routes) {
            const exampleBody = getExampleBody(file.replace('.route.js', ''), r.controllerFn);
            const description = `**Method:** ${r.method}\n**URL:** {{host}}/${r.path}\nAuto-generated description for ${r.controllerFn}`;

            folderItem.item.push({
                name: `${r.method} ${r.path}`,
                request: {
                    method: r.method,
                    header: [
                        { key: "Content-Type", value: "application/json" }
                    ],
                    body: r.method !== "GET" ? {
                        mode: "raw",
                        raw: JSON.stringify(exampleBody, null, 2)
                    } : undefined,
                    url: {
                        raw: `{{host}}/${r.path.replace(/^\/+/g, '')}`,
                        host: ["{{host}}"],
                        path: r.path.split('/').filter(p => p)
                    },
                    description
                },
                response: []
            });
        }

        collection.item.push(folderItem);
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(collection, null, 2));
    console.log(`Postman collection generated at ${OUTPUT_FILE}`);
}

generateCollection();
