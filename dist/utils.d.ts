/**
 * Converts a Base64-encoded string to a Uint8Array.
 *
 * @param {string} base64 - The Base64-encoded string to be converted to a Uint8Array.
 *
 * @returns {Uint8Array} The Uint8Array representation of the input Base64 string.
 */
export declare function base64ToUint8Array(base64: string): Uint8Array;
/**
 * Converts a Uint8Array to a Base64-encoded string.
 *
 * @param {Uint8Array} bytes - The Uint8Array to be converted to a Base64-encoded string.
 *
 * @returns {string} The Base64-encoded string representation of the input Uint8Array.
 */
export declare function uint8ArrayToBase64(bytes: Uint8Array): string;
/**
 * Generates a unique ID for an object in MongoDB
 *
 * @param {unknown} object The object to hash
 *
 * @returns {ObjectId} The MD5 hash of the object in the form of the MongoDB ObjectId
 */
export declare function getObjectIdHash(object: unknown): string;
//# sourceMappingURL=utils.d.ts.map