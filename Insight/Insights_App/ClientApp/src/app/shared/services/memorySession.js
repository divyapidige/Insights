/**
 * @description This helps in storing the data when session storage is not available
 */
export class MemorySession {
    /**
     * sets an object in storage
     * @param key object key to be stored or replaced
     * @param value object
     */
    static setItem(key, value) {
        MemorySession.storage[key] = value;
    }
    /**
     * Retrieves the object of which key is provided.
     * Undefined is key is not listed.
     * @param key Object key which has to be retrieved
     */
    static getItem(key) {
        return MemorySession.storage[key];
    }
    /**
     * This method removes the value of the particular key
     */
    static removeItem(key) {
        delete MemorySession.storage[key];
    }
    /**
     * This method removes all data from object
     */
    static removeAll() {
        MemorySession.storage = {};
    }
}
/**
 * in-memory storage object if no session is
 * available on client browser due to browser's
 * restriction or incompatible browser version.
 */
MemorySession.storage = {};
//# sourceMappingURL=memorySession.js.map