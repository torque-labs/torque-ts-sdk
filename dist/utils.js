"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uint8ArrayToBase64 = exports.base64ToUint8Array = void 0;
/**
 * Converts a Base64-encoded string to a Uint8Array.
 *
 * @param {string} base64 - The Base64-encoded string to be converted to a Uint8Array.
 *
 * @returns {Uint8Array} The Uint8Array representation of the input Base64 string.
 */
function base64ToUint8Array(base64) {
    var binaryString = Buffer.from(base64, 'base64').toString('binary');
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
exports.base64ToUint8Array = base64ToUint8Array;
/**
 * Converts a Uint8Array to a Base64-encoded string.
 *
 * @param {Uint8Array} bytes - The Uint8Array to be converted to a Base64-encoded string.
 *
 * @returns {string} The Base64-encoded string representation of the input Uint8Array.
 */
function uint8ArrayToBase64(bytes) {
    var binary = bytes.reduce(function (acc, byte) { return acc + String.fromCharCode(byte); }, '');
    return btoa(binary);
}
exports.uint8ArrayToBase64 = uint8ArrayToBase64;
