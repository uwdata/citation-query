#! /usr/bin/env node
// Retrieve paper data from both doi.org and Semantic Scholar
// Requires an input JSON file with an array { doi, s2id } objects.
// Writes retrieved data to standard output in JSON format.
// Usage:
//  retrieve-papers.js <papers-json-file> > <output-json-file>

import { readFile } from 'node:fs/promises';
import { fileCache } from '@uwdata/file-cache';
import { cacheMethod, lookupDOI, lookupS2, urlS2 } from '../src/index.js';

// use a file based cache for repeated requests
const cache = await fileCache();

// validation prior to cache write
// must return true for a cache write to occur
function validate(result) {
  if (result && result.error) {
    console.error('ERROR', result.error);
    return false;
  }
  return result !== undefined;
}

// create cache-aware lookup methods
const getDOI = cacheMethod({
  cache, validate, method: lookupDOI, keyFunction: id => `doi:${id}`,
});
const getS2 = cacheMethod({
  cache, validate, method: lookupS2, keyFunction: urlS2,
});

// semantic scholar paper fields to retrieve
const s2params = {
  fields: [
    'externalIds', 'url', 'title', 'abstract', 'venue', 'year',
    'authors.name', 'authors.externalIds',
    'authors.citationCount', 'authors.hIndex',
    'references.externalIds', 'references.title', 'references.year',
    'referenceCount', 'citationCount', 'influentialCitationCount',
    'tldr', 'embedding'
  ]
};

// load input papers, we expect an array of { doi, s2id } objects
const input = process.argv[2];
const papers = JSON.parse(await readFile(input, 'utf8'));

// load data for all papers
// perform sequentially to avoid rate-limiting errors
const result = [];
for (let i = 0; i < papers.length; ++i) {
  const { doi, s2id } = papers[i];
  console.error('PROCESSING', doi, s2id);
  try {
    result[i] = {
      doi,
      s2id,
      csl: (doi ? await getDOI(doi) : null) || null,
      s2data: (s2id ? await getS2(s2id, s2params) : null) || null
    };
  } catch (err) {
    console.error(`Error processing doi:${doi} s2id:${s2id}`);
    console.error(err);
  }
}

// write non-null results to standard output
process.stdout.write(JSON.stringify(result.filter(x => x)));
