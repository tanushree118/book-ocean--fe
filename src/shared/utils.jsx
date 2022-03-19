import CryptoJS from "crypto-js";

export const emailRegex = "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])";

export const getCipheredText = (text) => {
    return CryptoJS.AES.encrypt(text, 'my-secret-key@123').toString();
}

export const getDecryptedText = (text) => {
    let bytes = CryptoJS.AES.decrypt(text, 'my-secret-key@123');
    return (bytes.toString(CryptoJS.enc.Utf8));
}