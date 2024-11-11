import cache from "../utils/cacheClient";

export async function getCachedData<T>(
  key: string,
  fetchData: () => Promise<T>
): Promise<T> {
  const cachedData = cache.get(key);
  if (cachedData) {
    return cachedData as T;
  }

  const freshData = await fetchData();

  cache.set(key, freshData);

  return freshData;
}
