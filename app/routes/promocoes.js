module.exports = function(app) {
    
    app.get("/promocoes/form",function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);
        produtosDAO.lista(function(erros,resultados){
            res.render('promocoes/form',{lista:resultados});
        });
        connection.end();
    });

    app.post("/promocoes",function(req,res){
        var io = app.get('io');
        var promocao = req.body;
        io.emit('novaPromocao',promocao);
        res.send(promocao)
        console.log(promocao);
    });
}