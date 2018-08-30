var express = require('express');
var load = require("express-load");
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function () {
    var app = express();
    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    load('routes', { cwd: 'app' })
        .then('infra')
        .into(app);

    app.use((req, res, next) => {
        console.log(res)
        res.status(404).render('error/404');
        next();
    })

    app.use((error, req, res, next) => {
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'production') {
            res.status(500).render('error/500');
            return;
        }
        next(error);
    })

    return app;
}()
