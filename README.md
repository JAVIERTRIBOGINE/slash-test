
# 🧠 How It Works
Clone the repository.
Install Node.js. <<------  IMPORTANT!!!  - VERSION 24.3.0
Install packages: run  `npm i`
For EXERCISE ONE: run `npm run execute:one` in console
For EXERCISE ONE: run `npm run execute:two` in console
For TESTING: run `npm run test`


# EXERCISE ONE: Fetch with Max Concurrency 🕸️⚙️

A utility function written in TypeScript to perform concurrent HTTP requests (`fetch`) with a configurable **maximum concurrency limit**.

## 🚀 Purpose

To efficiently fetch multiple URLs in parallel **without exceeding a given number of simultaneous requests**, preventing overload of network or API rate limits.

## 📦 Features

- Control over the number of concurrent `fetch` calls
- Captures both fulfilled and rejected results
- Returns structured results for easy handling


## 📄 Interface

```ts
export interface FetchResult {
  url: string;
  status: 'fulfilled' | 'rejected';
  value?: any;
  reason?: string;
}

export function callWithMaxConcurrency(
  urls: string[],
  maxConcurrency: number
): Promise<FetchResult[]>

🧪 Example Usage

const urlsToFetch = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  // ...
];

const maxConcurrentFetches = 2;

callWithMaxConcurrency(urlsToFetch, maxConcurrentFetches)
  .then((results) => {
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        console.log(`✅ ${result.url}:`, result.value?.title);
      } else {
        console.error(`❌ ${result.url}:`, result.reason);
      }
    });
  });

```

Uses a recursive next funct to launch new requests as others complete.
A Set tracks in-progress fetches.
The process continues until all URLs are fetched.
Results are returned in the order they are finalized (not necessarily the input order).


# Plate Gen from position 🕸️⚙️

This utility allows you to generate a specific plate (string) based on its position in the lexicographically ordered list of all possible combinations.

📘 Use Case
Imagine you want to generate all possible 4-character license plates using uppercase letters A–Z and digits 0–9, like:
AA00, AA01, ..., ZZ99

Instead of generating all combinations, this utility lets you directly compute the plate at a given index, for example:

getPlateAtPosition(1578); // returns "AB12"

⚙️ How It Works
The function uses positional number systems (similar to base-N conversions) to compute each character of the plate.
Characters are selected from a defined charset (e.g., ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789).
Given:
A charset
A fixed plateLength
A position (0-based index)
It calculates the nth plate in lexicographic order without generating the full list.