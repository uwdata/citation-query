import assert from 'node:assert';
import { lookupS2 } from '../src/index.js';

describe('lookup-doi', () => {
  it('retrieves S2ID data', async () => {
    const s2id = 'fe1ea23231e63bdc8738635046e21d7e655e55f2';
    const data = await lookupS2(s2id, { fields: [ 'externalIds', 'authors' ]});
    assert.strictEqual(data.paperId, s2id);
    assert.strictEqual(data.externalIds.DOI, '10.1111/cgf.13720');
    assert.strictEqual(data.authors[0].name, 'Matthew Conlen');
    assert.strictEqual(data.authors[1].name, 'Alex Kale');
    assert.strictEqual(data.authors[2].name, 'Jeffrey Heer');
  });

  it('retrieves DOI data', async () => {
    const doi = '10.1111/cgf.13720';
    const data = await lookupS2(doi, { fields: [ 'externalIds', 'authors' ]});
    assert.strictEqual(data.paperId, 'fe1ea23231e63bdc8738635046e21d7e655e55f2');
    assert.strictEqual(data.externalIds.DOI, doi);
    assert.strictEqual(data.authors[0].name, 'Matthew Conlen');
    assert.strictEqual(data.authors[1].name, 'Alex Kale');
    assert.strictEqual(data.authors[2].name, 'Jeffrey Heer');
  });

  it('handles missing id', async () => {
    const s2id = 'bad-s2id';
    const data = await lookupS2(s2id);
    assert.strictEqual(!data.error, false);
  });
});
