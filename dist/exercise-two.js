"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLicensePlateAt = getLicensePlateAt;
function getLicensePlateAt(n) {
    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let digitCount = 6; digitCount >= 0; digitCount--) {
        const letterCount = 6 - digitCount;
        const tierSize = Math.pow(10, digitCount) * Math.pow(26, letterCount);
        if (n < tierSize) {
            const numericValue = n % Math.pow(10, digitCount);
            const letterValue = Math.floor(n / Math.pow(10, digitCount));
            const digits = digitCount > 0 ?
                numericValue.toString().padStart(digitCount, '0') :
                "";
            let letters = '';
            let remaining = letterValue;
            for (let i = 0; i < letterCount; i++) {
                const index = remaining % 26;
                letters = LETTERS[index] + letters;
                remaining = Math.floor(remaining / 26);
            }
            return digits + letters;
        }
        n -= tierSize;
    }
    throw new Error('Index exceeds available license plates.');
}
console.log("Plate: ", getLicensePlateAt(8605230));
