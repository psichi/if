/**
 * 
 * Modified version of the If logic used in DomBuilder
 * 
 * Copyright (c) 2011, Jonathan Buchanan
 * 
 * https://github.com/insin/DOMBuilder/blob/master/lib/dombuilder/template.js#L732-L775
 * 
 */

var ops = '( ) && || == === <= < >= > != !== !! !'.split(' '),
   opsRE = /(\(|\)|&&|\|\||={2,3}|<=|<|>=|>|!={1,2}|!{1,2})/,
   numberRE = /^-?(?:\d+(?:\.\d+)?|(?:\d+)?\.\d+)$/,
   isQuotedString = function(s) {
     var q = s.charAt(0);
     return (s.length > 1 &&
       ['\'', '"'].indexOf(q) !== -1 &&
       s.lastIndexOf(q) === s.length - 1);
   },
   isBoolean = function(s) {
     return s === 'true' || s === 'false'
   };

/** RegExp for trimming whitespace. */
var TRIM_RE = /^\s+|\s+$/g;

function validVar(bit, keys) {
  var r;

  for(var i = 0; i < keys.length; i++) {
    r = new RegExp('^' + keys[i] + '(\.|$)')
    if(r.test(bit)) {
      return true;
    }
  }

  return false;

}

function parseExpr(expr, vars) {

  var bit;
  var bits = expr.split(opsRE);
  var keys = Object.keys(vars);
  var code = ['return function(' + keys.join(',') + ') { return (' ];
  for(var i = 0; i < bits.length; i++) {
     bit = bits[i];
     if(ops.indexOf(bit) !== -1) {
       code.push(bit);
     } else {
       bit = bit.replace(TRIM_RE, '');
       if(bit) {
         if(numberRE.test(bit) ||
         isQuotedString(bit) ||
         isBoolean(bit) ||
         bit === 'typeof' ||
         bit === 'undefined' ||
         bit === 'null'
         ) {
           code.push(bit);
         } else if(validVar(bit, keys)) {

           code.push(bit);

         } else {

           throw new Error("Unspecified value: " + bit);

         }
       }
     }
  }
  code.push('); }');

  try {
    var func = new Function(code.join(' '))();
    var v = [];
    for(var key in vars) { v.push(vars[key]); }
    return func.apply(null, v); 
  } catch (e) {
    throw new Error('Invalid if expression (' + e.message + '): ' + expr);
  }

}

module.exports = parseExpr;
