var should = require("should");
var IF = require('../if.js');
var ret;

describe('IFFI', function() {

 it('should accept strings', function(done) {
   ret = IF('input == "a string"', {
       input: 'a string'
   });
   ret.should.eql(true);
   done();
 });

 it('should accept boolean', function(done) {
   ret = IF('input == true', {
       input: true
   });
   ret.should.eql(true);

   ret = IF('input == false', {
       input: true
   });
   ret.should.eql(false);
   done();
 });

 it('should accept object property', function(done) {
   ret = IF('input.a == "a string"', {
       input: { a: 'a string' }
   });
   ret.should.eql(true);
   done();
 });

 it('should accept multiple allowed values', function(done) {
   ret = IF('input.a == input2.a', {
       input:  { a: 'a string' },
       input2: { a: 'a string' }
   });
   ret.should.eql(true);
   done();
 });

 it('should allow more complex', function(done) {
   ret = IF('input.x === true && (input2.a === "q" && true === true)', {
       input:  { x: true },
       input2: { a: 'q' }
   });
   ret.should.eql(true);
   done();
 });

});
