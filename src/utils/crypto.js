import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const SECRET_KEY = 'INSIGHTS_MESH_SECRET'; // For demo only

export const encryptData = (data) => {
  return AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (cipherText) => {
  try {
    const bytes = AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(Utf8));
  } catch (err) {
    console.error('Decryption failed', err);
    return null;
  }
};
