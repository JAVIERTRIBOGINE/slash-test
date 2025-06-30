"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWithMaxConcurrency = callWithMaxConcurrency;
async function callWithMaxConcurrency(urls, // Lista de URLs a solicitar
maxConcurrency // Máximo número de peticiones simultáneas
) {
    const results = []; // Array para guardar los resultados
    const inProgress = new Set(); // Set para rastrear fetches en curso
    let index = 0; // Índice actual dentro del array de URLs
    return new Promise((resolve) => {
        function next() {
            if (index === urls.length && inProgress.size === 0) {
                resolve(results); // Resolvemos la promesa final con los resultados
                return;
            }
            while (index < urls.length && inProgress.size < maxConcurrency) {
                const url = urls[index]; // Obtenemos la URL actual
                const promise = fetch(url)
                    .then((response) => {
                    // Si la respuesta no es "ok", lanzamos un error
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status} for ${url}`);
                    }
                    return response.json(); // Convertimos la respuesta a JSON
                })
                    .then((data) => {
                    results.push({ url, status: 'fulfilled', value: data });
                })
                    .catch((error) => {
                    results.push({ url, status: 'rejected', reason: error.message });
                })
                    .finally(() => {
                    inProgress.delete(promise);
                    console.log('inProgress: ', inProgress);
                    next();
                });
                inProgress.add(promise);
                index++;
            }
        }
        next();
    });
}
if (require.main === module) {
    const urlsToFetch = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
        'https://jsonplaceholder.typicode.com/posts/4',
        'https://jsonplaceholder.typicode.com/posts/5',
        'https://jsonplaceholder.typicode.com/posts/6',
        'https://jsonplaceholder.typicode.com/posts/7',
        'https://jsonplaceholder.typicode.com/posts/8',
    ];
    const maxConcurrentFetches = 3; // Límite de concurrencia
    callWithMaxConcurrency(urlsToFetch, maxConcurrentFetches)
        .then((allResults) => {
        console.log('All fetches completed:');
        allResults.forEach((result) => {
            if (result.status === 'fulfilled') {
                console.log(`  Fulfilled ${result.url}:`, result.value?.title);
            }
            else {
                console.error(`  Rejected ${result.url}:`, result.reason);
            }
        });
    })
        .catch((error) => {
        console.error('An unhandled error occurred:', error);
    });
}
