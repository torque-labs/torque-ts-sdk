/**
 * Converts a Base64-encoded string to a Uint8Array.
 *
 * @param {string} base64 - The Base64-encoded string to be converted to a Uint8Array.
 * @returns {Uint8Array} The Uint8Array representation of the input Base64 string.
 */
export function base64ToUint8Array(base64: string) {
  const binaryString = Buffer.from(base64, "base64").toString("binary");
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
 * @returns {string} The Base64-encoded string representation of the input Uint8Array.
 */
export function uint8ArrayToBase64(bytes: Uint8Array) {
  const binary = bytes.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    ""
  );
  return btoa(binary);
}
