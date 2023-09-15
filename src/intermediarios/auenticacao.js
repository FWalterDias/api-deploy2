const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');
const knex = require('../conexao');

const usuarioAutenticado = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.send(401).json({ mensagem: 'Não autorizado!' });

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, 'bananinha123');

        const usuario = await knex('usuarios').where({ id }).firts();

        console.log(usuario);

        if (!usuario) return res.send(401).json({ mensagem: 'Não autorizado!' });

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(500).json(error);
    }

}

module.exports = { usuarioAutenticado };