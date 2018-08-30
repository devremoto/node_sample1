
function produtosDAO(connection) {
    this.connection = connection;

    this.lista = function (callback) {
        this.connection.query('SELECT id,titulo,descricao,preco FROM livros', callback);
    }

    this.detalhe = function (id, callback) {
        this.connection.query(`SELECT id,titulo,descricao,preco FROM livros WHERE id =${id}`, callback);
    }

    this.remove = function (id, callback) {
        this.detalhe(id, (err, results) => {
            this.connection.query(`DELETE FROM livros WHERE id =${result.id}`, callback);
        })
    }

    this.removeAll = function ( callback) {
        this.connection.query(`DELETE FROM livros`, callback);
    }

    this.salva = function (produto, callback) {
        this.connection.query(`INSERT INTO livros SET ?`, produto, callback);
    }
}

module.exports = function () {
    return produtosDAO;
}