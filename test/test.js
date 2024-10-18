var unalib = require('../unalib/index');
 var assert = require('assert');
  //Pruebas
 
 
 describe('unalib', function(){
    //Dentro de 'unalib', vamos a probar una función especifica
    describe('función is_valid_phone', function(){
   
        it('debería devolver true para 8297-8547',function(){
            //Esta es la comprobación 
            assert.equal(unalib.is_valid_phone('8297-8547'),true);
        });
    });
 });