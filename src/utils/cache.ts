import cache from 'memory-cache';

class CacheUtil {
    /**
     * Get a cached value by key.
     * @param key The key of the cached value.
     * @returns The cached value or null if not found.
     */
    static get<T>(key: string): T | null {
        return cache.get(key) || null;
    }

    /**
     * Put a value into the cache.
     * @param key The key for the value.
     * @param value The value to cache.
     * @param duration The duration in milliseconds for the cache to be valid.
     */
    static put<T>(key: string, value: T, duration: number): void {
        cache.put(key, value, duration);
    }

    /**
     * Clear a specific cache key.
     * @param key The key to clear.
     */
    static clear(key: string): void {
        cache.del(key);
    }

    /**
     * Clear all cache.
     */
    static clearAll(): void {
        cache.clear();
    }
}

export default CacheUtil;
