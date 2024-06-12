import { Md5 } from 'ts-md5';
/**
 * Converts a Base64-encoded string to a Uint8Array.
 *
 * @param {string} base64 - The Base64-encoded string to be converted to a Uint8Array.
 *
 * @returns {Uint8Array} The Uint8Array representation of the input Base64 string.
 */
export function base64ToUint8Array(base64) {
    const binaryString = Buffer.from(base64, 'base64').toString('binary');
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
/**
 * Converts a Uint8Array to a Base64-encoded string.
 *
 * @param {Uint8Array} bytes - The Uint8Array to be converted to a Base64-encoded string.
 *
 * @returns {string} The Base64-encoded string representation of the input Uint8Array.
 */
export function uint8ArrayToBase64(bytes) {
    const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binary);
}
/**
 * Generates a unique ID for an object in MongoDB
 *
 * @param {unknown} object The object to hash
 *
 * @returns {ObjectId} The MD5 hash of the object in the form of the MongoDB ObjectId
 */
export function getObjectIdHash(object) {
    // Generate MD5 hash of the object
    const hash = Md5.hashStr(JSON.stringify(object)).toString();
    // Ensure the hash is at least 24 characters long
    // If the hash is shorter, pad it with zeros
    const objectIdStr = hash.padEnd(24, '0').substring(0, 24);
    // Convert the 24-character string to an ObjectId
    return objectIdStr;
}
//# sourceMappingURL=utils.js.map