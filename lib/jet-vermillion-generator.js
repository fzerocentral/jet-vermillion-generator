/*
 * jet-vermillion-generator
 * http://fzerocentral.org
 *
 * Copyright (c) 2013 Ricardo Mendes
 * Licensed under the MIT license.
 */

'use strict';

var validCharacters = " !&',-./0123456789?ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
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

function isEightCharactersOrLess(name) {
  return (!name || name.length > 0 || !name.trim());
}

function allCharactersValid(name) {
  var x;

  for (x = 0, name = name.toUpperCase(); x < name.length; x++)
  {
    if (validCharacters.indexOf(name.charAt(x)) < 0) { return false; }
  }

  return true;
}

function isInputValid(name) {
  if (!isEightCharactersOrLess(name)) { return false; }
  if (!allCharactersValid(name))      { return false; }

  return true;
}

function actualPasswordGenerator(name) {
  var x, a, b;
  var password = seededPassword();

  // Password register modifications
  for (x = 0; x < name.length; x++) {
    for (a = name.charCodeAt(x) - 32, b = 0; b < 6; b++) {
      if (a & (1 << b)) {
        password[registerModifications[x][b][0]] += registerModifications[x][b][1];
      }
    }
  }

  // Convert the password to a string and return it
  for (x = 0, a = ""; x < 10; x++) {
    a += numericToTextMapping.charAt(password[x] & 0x1F);
  }

  return a + "30";
}

function transformPlayerNameIntoJetVermillionCode(name) {
  if (!isInputValid(name)) {
    return "";
  }

  return actualPasswordGenerator(name);
}

exports.generate = transformPlayerNameIntoJetVermillionCode;