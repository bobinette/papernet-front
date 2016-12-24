/**
 * Copied from remark:parse:tokenize:code-inline
 * Modified to use an exclamation mark as starter
 * for inline math
 *
 * original @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 */

const startingBlock = '$';
const endingChar = '$';

const locator = (value, fromIndex) => value.indexOf(startingBlock, fromIndex);

const tokenizer = (eat, value, silent) => {
  if (!value.startsWith(startingBlock)) {
    return undefined;
  }

  if (value.length === startingBlock.length + endingChar.length) {
    return undefined;
  }

  if (silent) {
    return true;
  }

  let index = startingBlock.length;
  const length = value.length;
  while (index < length && value.charAt(index) !== endingChar) {
    index += 1;
  }

  const full = value.substring(0, index + 1);
  const eq = value.substring(startingBlock.length, index);

  return eat(full)({
    type: 'inlineCode',
    value: eq,
    data: {
      hProperties: { className: 'language-inlineEquation' },
    },
  });
};

tokenizer.locator = locator;
tokenizer.notInLink = true;

const plugin = (processor) => {
  const Parser = processor.Parser;
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  tokenizers.math = tokenizer;
  methods.splice(methods.indexOf('code'), 0, 'math');
};

export default plugin;
