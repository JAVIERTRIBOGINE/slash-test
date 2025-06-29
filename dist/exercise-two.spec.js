"use strict";
// src/licensePlate.spec.ts
Object.defineProperty(exports, "__esModule", { value: true });
const exercise_two_1 = require("./exercise-two");
describe('getLicensePlateAt', () => {
    test('returns numeric-only plates correctly', () => {
        expect((0, exercise_two_1.getLicensePlateAt)(0)).toBe('000000');
        expect((0, exercise_two_1.getLicensePlateAt)(1)).toBe('000001');
        expect((0, exercise_two_1.getLicensePlateAt)(999999)).toBe('999999');
    });
    test('transitions into one-letter plates correctly', () => {
        expect((0, exercise_two_1.getLicensePlateAt)(1000000)).toBe('00000A');
        expect((0, exercise_two_1.getLicensePlateAt)(1000001)).toBe('00001A');
        expect((0, exercise_two_1.getLicensePlateAt)(1000026)).toBe('00026A');
        expect((0, exercise_two_1.getLicensePlateAt)(1000000 + 26 * 10 ** 5 - 1)).toBe('99999Z');
    });
    test('transitions into two-letter plates correctly', () => {
        // After all one-letter plates are exhausted
        const startOfTwoLetters = 10 ** 6 + 26 * 10 ** 5;
        expect((0, exercise_two_1.getLicensePlateAt)(startOfTwoLetters)).toBe('0000AA');
        expect((0, exercise_two_1.getLicensePlateAt)(startOfTwoLetters + 1)).toBe('0001AA');
        expect((0, exercise_two_1.getLicensePlateAt)(startOfTwoLetters + 26)).toBe('0026AA');
    });
    test('returns plate with only letters when digits run out', () => {
        // Last possible plate (all letters)
        const totalPlates = Math.pow(10, 6) +
            Math.pow(10, 5) * 26 +
            Math.pow(10, 4) * 26 ** 2 +
            Math.pow(10, 3) * 26 ** 3 +
            Math.pow(10, 2) * 26 ** 4 +
            Math.pow(10, 1) * 26 ** 5 +
            26 ** 6;
        expect((0, exercise_two_1.getLicensePlateAt)(totalPlates - 1)).toBe('ZZZZZZ');
    });
    test('throws error if index is out of range', () => {
        const totalPlates = Math.pow(10, 6) +
            Math.pow(10, 5) * 26 +
            Math.pow(10, 4) * 26 ** 2 +
            Math.pow(10, 3) * 26 ** 3 +
            Math.pow(10, 2) * 26 ** 4 +
            Math.pow(10, 1) * 26 ** 5 +
            26 ** 6;
        expect(() => (0, exercise_two_1.getLicensePlateAt)(totalPlates)).toThrow('Index exceeds available license plates.');
    });
});
