const produto = require('../models/produto');
const status = require('http-status');
 
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const descrição = req.body.descrição;
    const preço = req.body.preço;
    const quantidade = req.body.quantidade;
 
    produto.create({
        nome: nome,
        descrição: descrição,
        preço: preço,
        quantidade: quantidade,
    })
    
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
exports.SelectAll = (req, res, next) => {
    produto.findAll()
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            }
        })
        .catch(error => next(error));
}
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    produto.findByPk(id)
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const descrição = req.body.descrição;
    const preço = req.body.preço;
    const quantidade = req.body.quantidade;
 
    produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.update({
                    nome: nome,
                    descrição: descrição,
                    preço: preço,
                    quantidade: quantidade
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};