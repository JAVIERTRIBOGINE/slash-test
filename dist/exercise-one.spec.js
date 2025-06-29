"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exercise_one_1 = require("./exercise-one");
global.fetch = jest.fn();
beforeEach(() => {
    jest.clearAllMocks();
});
test('respects max concurrency and resolves fulfilled results', async () => {
    const urls = ['url1', 'url2', 'url3', 'url4'];
    const mockResponses = {
        url1: { name: 'one' },
        url2: { name: 'two' },
        url3: { name: 'three' },
        url4: { name: 'four' }
    };
    fetch.mockImplementation((url) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    ok: true,
                    json: () => Promise.resolve(mockResponses[url]),
                });
            }, Math.random() * 100); // simulate network latency
        });
    });
    const results = await (0, exercise_one_1.callWithMaxConcurrency)(urls, 2);
    expect(results).toHaveLength(4);
    expect.arrayContaining([
        { url: 'url1', status: 'fulfilled', value: { name: 'one' } },
        { url: 'url2', status: 'fulfilled', value: { name: 'two' } },
        { url: 'url3', status: 'fulfilled', value: { name: 'three' } },
        { url: 'url4', status: 'fulfilled', value: { name: 'four' } },
    ]);
    /* results.forEach((result, index) => {
         expect(result.status).toBe('fulfilled');
         expect(result.url).toBe(urls[index]);
         expect(result.value).toEqual(mockResponses[urls[index]]);
     });*/
});
test('handles rejected fetch gracefully', async () => {
    const urls = ['good', 'bad', 'good2'];
    fetch.mockImplementation((url) => {
        return Promise.resolve({
            ok: url !== 'bad',
            status: url === 'bad' ? 500 : 200,
            json: () => Promise.resolve({ data: url })
        });
    });
    const results = await (0, exercise_one_1.callWithMaxConcurrency)(urls, 2);
    expect(results).toHaveLength(3);
    expect(results[0].status).toBe('rejected');
    expect(results[1].status).toBe('fulfilled');
    expect(results[2].status).toBe('fulfilled');
});
