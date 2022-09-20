import assert from 'node:assert';
import { lookupDOI } from '../src/index.js';

describe('lookup-doi', () => {
  it('retrieves DOI data', async () => {
    const doi = '10.1111/cgf.13720';
    const data = await lookupDOI(doi);
    assert.strictEqual(data?.DOI, '10.1111/cgf.13720');
    assert.strictEqual(data?.author[0].family, 'Conlen');
    assert.strictEqual(data?.author[1].family, 'Kale');
    assert.strictEqual(data?.author[2].family, 'Heer');
  });

  it('handles a missing DOI', async () => {
    const doi = 'bad-doi';
    const data = await lookupDOI(doi);
    assert.strictEqual(!data.error, false);
  });
});
