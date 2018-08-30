
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
                    res.render("produtos/lista", { livros: results });
                },
                json: function () {
                    res.json(results);
                }
            });
        });

        connection.end();
    }

    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', (req, res) => {

        res.render("produtos/form", { errosValidacao: [], produto: {} });
    });

    app.post('/produtos', (req, res) => {

        var connection = app.infra.connectionFactory();

        var produtosDAO = new app.infra.produtosDAO(connection);
        produtosDAO.connection = connection;
        var produto = req.body;
        req.assert('titulo', 'Titulo Obrigatório').notEmpty();
        req.assert('preco', 'Preco obrigatório').notEmpty().isFloat();
        var errors = req.validationErrors();
        if (errors) {
            res.format({
                html: function () {
                    res.status(400).render('produtos/form', { errosValidacao: errors, produto: produto });
                },
                json: function () {
                    res.status(400).json(errors);
                }
            });

            return;
        }
        produtosDAO.salva(produto, (err, results) => {
            res.redirect('/produtos');
        });

        connection.end();
    });
};