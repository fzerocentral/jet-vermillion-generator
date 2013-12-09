/*
 * jet-vermillion-generator
 * http://fzerocentral.org
 *
 * Copyright (c) 2013 Ricardo Mendes
 * Licensed under the MIT license.
 */

'use strict';

var validCharacters = " !&',-./0123456789?ABCDEFGHIJKLMNOPQRSTUVWXYZ_";

function isEightCharactersOrLess(name) {
  return (name && name.length > 0 && name.length <= 8 && name.trim());
}

function allCharactersValid(name) {
  for (var letterIndex in name) {
    if (validCharacters.indexOf(name.charAt(letterIndex)) < 0) { return false; }
  }

  return true;
}

function isInputValid(name) {
  return (isEightCharactersOrLess(name) && allCharactersValid(name));
}

exports.isInputValid = isInputValid;
