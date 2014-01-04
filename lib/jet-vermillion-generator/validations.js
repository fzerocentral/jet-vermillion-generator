/*
 * jet-vermillion-generator
 * http://fzerocentral.org
 *
 * Copyright (c) 2013 Ricardo Mendes
 * Licensed under the MIT license.
 */

'use strict';

var validCharacters = /[ !&',-.\/0-9?A-Z_]/;

function isEightCharactersOrLess(name) {
  return (name && name.length > 0 && name.length <= 8 && name.trim());
}

function allCharactersValid(name) {
  return validCharacters.test(name);
}

function isInputValid(name) {
  return (isEightCharactersOrLess(name) && allCharactersValid(name));
}

exports.isInputValid = isInputValid;
