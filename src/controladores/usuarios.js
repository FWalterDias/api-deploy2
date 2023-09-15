const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');

const listarUsuarios = async (req, res) => {
	try {
		const usuarios = await knex('usuarios').first();

		const daodsUsuarios = {
			Total: usuarios.rowCount,
			usuarios
		}

		return res.status(200).json(daodsUsuarios);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ mensagem: "Erro interno!" });
	}
}

const cadastrarUsuario = async (req, res) => {
	const { nome, email, senha } = req.body;

	try {
		const senhaCriptografada = await bcrypt.hash(senha, 10)

		const novoUsuario = await pool.query(
			'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *',
			[nome, email, senhaCriptografada]
		)

		return res.status(201).json(novoUsuario.rows[0])
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' })
	}
}

const login = async (req, res) => {
	const { email, senha } = req.body

	try {
		const usuario = await pool.query('select * from usuarios where email = $1', [email]);

		if (!usuario.rowCount) return res.status(404).json({ mensagem: 'Email ou senha inválida!' });

		const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

		if (!senhaValida) return res.status(404).json({ mensagem: 'Email ou senha inválida!' });

		const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, { expiresIn: '8h' });

		const { senha: _, ...usuarioLogado } = usuario.rows[0];

		return res.json({ usuarioLogado, token });
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' })
	}
}

const obterPerfil = async (req, res) => {
	return res.json(req.usuario);
}

module.exports = {
	listarUsuarios,
	cadastrarUsuario,
	login,
	obterPerfil,
}
