const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');
const pool = require('../conexao');

const usuarioAutenticado = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.send(401).json({ mensagem: 'Não autorizado!' });

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, senhaJwt);

        const { rows, rowCount } = await pool.query(`
            select * from usuarios where id = $1
        `, [id]);

        if (!rowCount) return res.send(401).json({ mensagem: 'Não autorizado!' });

        req.usuario = rows[0];

        next();
    } catch (error) {
        return res.status(500).json(error.message);
    }

}

module.exports = { usuarioAutenticado };