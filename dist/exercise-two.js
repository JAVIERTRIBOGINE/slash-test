"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLicensePlateAt = getLicensePlateAt;
function getLicensePlateAt(n) {
    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Cadena con las letras que usaremos para las matrículas
    // Recorremos desde 6 dígitos numéricos hasta 0 (es decir, desde 0 letras hasta 6 letras)
    for (let digitCount = 6; digitCount >= 0; digitCount--) {
        const letterCount = 6 - digitCount; // Cuántas letras tendrá esta "capa" de matrículas
        // Calculamos cuántas combinaciones existen en esta capa: 10^dígitos * 26^letras
        const tierSize = Math.pow(10, digitCount) * Math.pow(26, letterCount);
        // Si el índice n cabe dentro de esta capa, generamos la matrícula aquí
        if (n < tierSize) {
            // Parte numérica: el residuo cuando n se divide por 10^dígitos (avanza más rápido)
            const numericValue = n % Math.pow(10, digitCount);
            // Parte de letras: el cociente cuando n se divide por 10^dígitos (avanza más lento)
            const letterValue = Math.floor(n / Math.pow(10, digitCount));
            // Convertimos la parte numérica a string con ceros al inicio si hace falta
            const digits = digitCount > 0 ?
                numericValue.toString().padStart(digitCount, '0') :
                "";
            // Construimos la parte de letras convirtiendo letterValue a base 26
            let letters = '';
            let remaining = letterValue;
            for (let i = 0; i < letterCount; i++) {
                const index = remaining % 26; // Letra actual
                letters = LETTERS[index] + letters; // Añadimos la letra a la izquierda
                remaining = Math.floor(remaining / 26); // Pasamos a la siguiente posición
            }
            // Devolvemos la matrícula completa (dígitos seguidos de letras)
            return digits + letters;
        }
        // Si no cabe en esta capa, restamos esa cantidad de combinaciones y seguimos con la siguiente
        n -= tierSize;
    }
    // Si terminamos todas las capas sin encontrar el índice, entonces es un valor demasiado alto
    throw new Error('Index exceeds available license plates.');
}
console.log("Plate: ", getLicensePlateAt(8605230));
