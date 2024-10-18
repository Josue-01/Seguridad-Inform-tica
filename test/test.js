var unalib = require('../unalib/index');
var assert = require('assert');

// Pruebas
describe('unalib', function() {
    // Pruebas para la función is_valid_phone
    describe('función is_valid_phone', function() {
        it('debería devolver true para 8297-8547', function() {
            // Esta es la comprobación 
            assert.equal(unalib.is_valid_phone('8297-8547'), true);
        });
    });

    // Pruebas para la validación de URLs
    describe('función is_valid_url', function() {
        it('debería devolver true para una URL de imagen válida', function() {
            assert.equal(unalib.is_valid_url('https://example.com/image.jpg'), true);
        });

        it('debería devolver false para una URL de imagen inválida', function() {
            assert.equal(unalib.is_valid_url('https://example.com/not-image.txt'), false);
        });

        it('debería devolver true para una URL de video válida', function() {
            assert.equal(unalib.is_valid_url('https://example.com/video.mp4'), true);
        });

        it('debería devolver false para una URL de video inválida', function() {
            assert.equal(unalib.is_valid_url('https://example.com/not-video.avi'), false);
        });
    });

    // Pruebas para la prevención de inyecciones de scripts
    describe('función validateMessage', function() {
        it('debería prevenir inyecciones de scripts', function() {
            const input = JSON.stringify({ mensaje: '<script>alert("hacked")</script>' });
            const output = JSON.parse(unalib.validateMessage(input));
            assert.strictEqual(output.mensaje, '&lt;script&gt;alert("hacked")&lt;/script&gt;');
        });
    });
});
