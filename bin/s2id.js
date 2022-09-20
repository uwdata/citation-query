#! /usr/bin/env node
// Retrieve paper data from Semantic Scholar for an id (s2id, doi, etc.)
// If no fields are specified, loads a default set of paper fields
// For supported fields, see https://api.semanticscholar.org/api-docs/graph#tag/Paper-Data/operation/get_graph_get_paper
// Usage:
//  s2id.js <paper-id> [comma-separated-fields-to-retrieve]
// Example:
//  s2id.js 10.1111/cgf.13720 title,year,venue

import { lookupS2 } from '../src/index.js';

const DEFAULT_FIELDS = [
  'externalIds', 'url', 'title', 'abstract', 'venue', 'year',
  'authors.name', 'authors.externalIds',
  'authors.citationCount', 'authors.hIndex',
  'references.externalIds', 'references.title', 'references.year',
  'referenceCount', 'citationCount', 'influentialCitationCount',
  'tldr', 'embedding'
];

const endpoint = process.argv[2];
const fields = process.argv[3] || DEFAULT_FIELDS;
const params = fields ? { fields } : undefined;

// lookup semantic scholar data
const result = await lookupS2(endpoint, params);

// write results to standard output
process.stdout.write(JSON.stringify(result));
