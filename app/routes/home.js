
module.exports = function (app) {

    var listaProdutos = (req, res, next) => {
        var connection = app.infra.connectionFactory();

        var produtosDAO = new app.infra.produtosDAO(connection);
        produtosDAO.connection = connection;

        produtosDAO.lista((err, results) => {
            if (err) {
                return next(err)
            }
            res.format({
                html: function () {
                    res.render("home/index", { livros: results });
                },
                json: function () {
                    res.json(results);
                }
            });
        });

        connection.end();
    }

    app.get('/', listaProdutos);
}