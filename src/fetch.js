const _fetch = typeof fetch !== 'undefined'
  ? fetch
  : (await import('node-fetch')).default;

export default _fetch;
