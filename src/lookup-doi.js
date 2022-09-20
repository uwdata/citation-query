const fetch = globalThis.fetch || (await import('node-fetch')).default;

export function lookupDOI(doi) {
  return fetch(`https://doi.org/${doi}`, {
    checkContentType: true,
    method: 'GET',
    headers: {
      Accept: 'application/vnd.citationstyles.csl+json'
    }
  }).then(res => {
    return res.status === 200
      ? res.json()
      : { error: `DOI lookup failed with status ${res.status}: ${doi}` };
  })
}
