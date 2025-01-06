const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  encrypt(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
    return this.process(message, key, "encrypt");
  }
  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error("Incorrect arguments!");
    }
    return this.process(encryptedMessage, key, "decrypt");
  }

  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  process(input, key, mode) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const keyUpper = key.toUpperCase();
    const inputUpper = input.toUpperCase();

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < inputUpper.length; i++) {
      const char = inputUpper[i];

      if (alphabet.includes(char)) {
        const inputIndex = alphabet.indexOf(char);
        const keyChar = keyUpper[keyIndex % keyUpper.length];
        const keyIndexValue = alphabet.indexOf(keyChar);

        let cipherIndex;
        if (mode === "encrypt") {
          cipherIndex = (inputIndex + keyIndexValue) % 26;
        } else {
          cipherIndex = (inputIndex - keyIndexValue + 26) % 26;
        }

        result += alphabet[cipherIndex];
        keyIndex++;
      } else {
        result += char;
      }
    }

    if (!this.isDirect) {
      result = result.split("").reverse().join("");
    }

    return result;
  }
}

module.exports = {
  VigenereCipheringMachine,
};
