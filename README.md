# citation-query

Retrieve paper citatation data from doi.org and Semantic Scholar.

## Install

Requires at least Node.js v14.14.0.

```
npm install @uwdata/citation-query
```

## Usage

### JavaScript Module

`@uwdata/citation-query` is an ESM-only module - you are not able to import it with `require()`.

#### Retrieve citation data from doi.org

```js
import { lookupDOI } from '@uwdata/citation-query';

const doiData = await lookupDoi('10.1111/cgf.13720');
```

#### Retrieve citation data from Semantic Scholar

For a full list of available paper fields, see the [Semantic Scholar API documentation](https://api.semanticscholar.org/api-docs/graph#tag/Paper-Data/operation/get_graph_get_paper).

```js
import { lookupS2, urlS2 } from '@uwdata/citation-query';

// paper fields to retrieve
const params = {
  fields: ['externalIds', 'title', 'authors', 'year', 'venue']
}

// using a DOI
const s2DataFromDOI = await lookupS2('10.1111/cgf.13720', params);

// using an S2ID (Semantic Scholar ID)
const s2id = 'fe1ea23231e63bdc8738635046e21d7e655e55f2';
const s2DataFromS2ID = await lookupS2(s2id, params);

// generate a URL for the Semantic Scholar REST API
const url = urlS2(s2id, params);
```

### Command Line Utilities

#### Retrieve citation data from doi.org

Given a DOI, return JSON data to standard output.

```
doi 10.1111/cgf.13720
```

#### Retrieve citation data from Semantic Scholar

Given a paper id (DOI, S2ID, etc.) return JSON data to standard output.

Retrieve a default set of fields using an S2ID:

```
s2id fe1ea23231e63bdc8738635046e21d7e655e55f2
```

Retrieve a default set of fields using a DOI:

```
s2id 10.1111/cgf.13720
```

Retrieve a custom set of fields:

```
s2id fe1ea23231e63bdc8738635046e21d7e655e55f2 title,year,venue
```
