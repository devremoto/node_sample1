var express = require('../config/express')
var request = require('supertest')(express)
//var assert=require('assert');
process.env.NODE_ENV = "test";


describe('#ProdutosController', function () {
    beforeEach(function (done) {
        var connection = express.infra.connectionFactory();
        var produtosDAO = new express.infra.produtosDAO(connection);
        if (process.env.NODE_ENV == "test") {
            produtosDAO.removeAll((err, result) => {
                done();
            })
        } else {
            done();
        }

        connection.end();
    })
    it('#listagem JSON', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200, done)
    });

    it('#listagem HTML', function (done) {
        request.get('/produtos')
            .set('Accept', 'text/html')
            .expect('Content-type', /html/)
            .expect(200, done)
    });

    it('#cadastro com dados invalidos', function (done) {
        request.post('/produtos')
            .send({
                titulo: '',
                preco: 20,
                descricao: 'isso aí'
            })
            .expect(400, done)
    });

    it('#cadastro com dados validos', function (done) {
        request.post('/produtos')
            .send({
                titulo: 'mais um livro',
                preco: 20,
                descricao: 'isso aí'
            })
            .expect(302, done)
    });
});
