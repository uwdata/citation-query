#! /usr/bin/env node
// Retrieve paper data from doi.org given a paper DOI
// Usage:
//  doi.js <doi>
// Example:
//  doi.js 10.1111/cgf.13720

import { lookupDOI } from '../src/index.js';

// lookup doi
const result = await lookupDOI(process.argv[2]);

// write results to standard output
process.stdout.write(JSON.stringify(result));
