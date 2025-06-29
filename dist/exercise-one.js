"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWithMaxConcurrency = callWithMaxConcurrency;
// Función principal que hace fetch a múltiples URLs con una concurrencia máxima
async function callWithMaxConcurrency(urls, // Lista de URLs a solicitar
maxConcurrency // Máximo número de peticiones simultáneas
) {
    const results = []; // Array para guardar los resultados
    const inProgress = new Set(); // Set para rastrear fetches en curso
    let index = 0; // Índice actual dentro del array de URLs
    // Retornamos una promesa que se resuelve cuando todas las peticiones han terminado
    return new Promise((resolve) => {
        // Función interna que controla el ciclo de ejecución
        function next() {
            // Si ya procesamos todas las URLs y no queda ninguna petición pendiente
            if (index === urls.length && inProgress.size === 0) {
                resolve(results); // Resolvemos la promesa final con los resultados
                return;
            }
            // Mientras queden URLs por procesar y no se haya alcanzado el límite de concurrencia
            while (index < urls.length && inProgress.size < maxConcurrency) {
                const url = urls[index]; // Obtenemos la URL actual
                // Creamos la promesa del fetch
                const promise = fetch(url)
                    .then((response) => {
                    // Si la respuesta no es "ok", lanzamos un error
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status} for ${url}`);
                    }
                    return response.json(); // Convertimos la respuesta a JSON
                })
                    .then((data) => {
                    // Si todo fue bien, almacenamos el resultado como "fulfilled"
                    results.push({ url, status: 'fulfilled', value: data });
                })
                    .catch((error) => {
                    // Si hubo error, almacenamos el resultado como "rejected"
                    results.push({ url, status: 'rejected', reason: error.message });
                })
                    .finally(() => {
                    // Al terminar (éxito o error), quitamos la promesa del set
                    inProgress.delete(promise);
                    console.log('inProgress: ', inProgress);
                    // Llamamos a next() para procesar más URLs si quedan
                    next();
                });
                // Añadimos la promesa al conjunto de peticiones en curso
                inProgress.add(promise);
                index++; // Avanzamos al siguiente índice
            }
        }
        next(); // Llamamos por primera vez a la función recursiva
    });
}
// --- Uso de ejemplo ---
// Si este archivo se ejecuta directamente (no importado como módulo)
if (require.main === module) {
    // Creamos un array de URLs para probar
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
    // Ejecutamos la función con nuestras URLs y concurrencia deseada
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
        // Por si ocurre algún error inesperado
        console.error('An unhandled error occurred:', error);
    });
}
