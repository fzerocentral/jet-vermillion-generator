/*
 * jet-vermillion-generator
 * http://fzerocentral.org
 *
 * Copyright (c) 2013 Ricardo Mendes
 * Licensed under the MIT license.
 */
'use strict';

var isInputValid = require('./jet-vermillion-generator/validations').isInputValid;

// The numeric-to-text mapping for the password characters
var numericToTextMapping =  "0123456789A?CEFHJKLMNPQRTVWXY=-+";
var registerModifications = [
  [[6, - 1], [5, + 1], [4, + 1], [3, + 1], [2, - 1], [1, - 1]],
  [[2, + 8], [2, +16], [0, +16], [9, + 1], [8, + 1], [7, - 1]],
  [[3, - 4], [3, + 8], [3, -16], [0, - 8], [2, - 2], [2, - 4]],
  [[4, - 2], [4, - 4], [4, - 8], [4, -16], [0, + 4], [3, + 2]],
  [[0, - 1], [5, - 2], [5, - 4], [5, + 8], [5, +16], [0, + 2]],
  [[7, +16], [1, -16], [6, + 2], [6, + 4], [6, - 8], [6, -16]],
  [[8, - 8], [8, +16], [1, - 8], [7, + 2], [7, + 4], [7, - 8]],
  [[9, - 4], [9, - 8], [9, -16], [1, - 4], [8, - 2], [8, + 4]]
];

function seededPassword() {
  return [0x09, 0x1F, 0x07, 0x14, 0x1E, 0x06, 0x19, 0x09, 0x0A, 0x1E];
}

function passwordRegisterModifications(name) {
  var password = seededPassword();

  name
    .split("")
    .map(function displacedCharCode(char) { return char.charCodeAt(0) - 32; })
    .forEach(function modifyPassword(charCode, i) {
      for (var b = 0; b < 6; b++) {
        if ((charCode & (1 << b)) === 0) { continue; }

        password[registerModifications[i][b][0]] += registerModifications[i][b][1];
      }
    });

  return password;
}

function passwordToString(password) {
  return password
    .map(function bitwiseTruncate(charCode) { return charCode & 0x1F; })
    .map(function mapToString(charCode)     { return numericToTextMapping.charAt(charCode); })
    .join("")
    .concat('30');
}

function treatInput(name) {
  return name.trim().toUpperCase();
}

function generator(input) {
  var name = treatInput(input);

  if (!isInputValid(name)) { return ""; }
  var modifiedPassword = passwordRegisterModifications(name);

  return passwordToString(modifiedPassword);
}

exports.generate = generator;
