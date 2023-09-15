const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');

const listarUsuarios = async (req, res) => {
	try {
		const usuarios = await knex('usuarios');

		return res.status(200).json(usuarios);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ mensagem: "Erro interno do servidor!" });
	}
}

const cadastrarUsuario = async (req, res) => {
	const { nome, email, senha } = req.body;

	try {
		const existeUsuario = await knex('usuarios').where({ email }).first();

		if (existeUsuario) return res.status(400).json({ mensagem: "Usuario já cadastrado!" });

		const senhaCriptografada = await bcrypt.hash(senha, 10);

		const novoUsuario = await knex('usuarios')
			.insert({ nome, email, senha: senhaCriptografada })
			.returning(['id', 'nome', 'email']);

		return res.status(201).json(novoUsuario);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ mensagem: 'Erro interno do servidor' })
	}
}

const login = async (req, res) => {
	const { email, senha } = req.body;

	if (!email || !senha) return res.status(400).json({ mensagem: "Preencha todos os campos" });

	try {
		const usuario = await knex('usuarios').where({ email }).first();

		if (!usuario) return res.status(404).json({ mensagem: 'Email ou senha inválida!' });

		const senhaValida = await bcrypt.compare(senha, usuario.senha);

		if (!senhaValida) return res.status(404).json({ mensagem: 'Email ou senha inválida!' });

		const token = jwt.sign({ id: usuario.id }, 'bananinha123', { expiresIn: '8h' });

		const { senha: _, ...usuarioLogado } = usuario;

		return res.json({ usuarioLogado, token });
	} catch (error) {
		console.log(error);
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
