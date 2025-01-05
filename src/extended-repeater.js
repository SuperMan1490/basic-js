const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
      str = String(str);
      const addition = options.addition !== undefined ? String(options.addition) : '';
      const repeatTimes = options.repeatTimes || 1;
      const separator = options.separator || '+';
      const additionRepeatTimes = options.additionRepeatTimes || 1;
      const additionSeparator = options.additionSeparator || '|';
  
      const additionPart = Array(additionRepeatTimes).fill(addition).join(additionSeparator);
      const fullStr = Array(repeatTimes).fill(str + additionPart).join(separator);
  
      return fullStr;
}

module.exports = {
  repeater
};
