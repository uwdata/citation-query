export function cacheMethod({
  cache, method, keyFunction, ttl,
  validate = result => result !== undefined
}) {
  return async function(...args) {
    const key = keyFunction(...args);
    const data = await cache.get(key);

    if (data !== undefined) {
      return data;
    } else {
      const result = await method(...args);
      if (validate(result)) {
        cache.set(key, result, ttl);
        return result;
      } else {
        return undefined;
      }
    }
  }
}
