import {finishCurrentMethod, getCurrentMethod} from '../lib/routing-table';

export default function method(options) {
  options = options || {};

  if (!options.verb) {
    throw new Error(`\`options.verb\` is required`);
  }

  if (!options.path) {
    options.path = `/`;
  }

  return function _method(target, name) {
    const method = getCurrentMethod(target, name);
    method.set(`path`, options.path.toLowerCase());
    method.set(`verb`, options.verb.toLowerCase());
    if (options.after) {
      method.set(`after`, options.after);
    }
    finishCurrentMethod(target, name);
  };
}
