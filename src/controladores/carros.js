const knex = require('../conexao');


const listarCarros = async (req, res) => {
	try {
		const carros = await knex('carros');

		return res.status(200).json(carros);
	} catch (error) {
		return res.status(500).json('Erro interno do servidor')
	}
}

const detalharCarro = async (req, res) => {
	const { id } = req.params;

	try {
		const carro = await knex('carros').where({ id }).first();

		if (!carro) return res.status(400).json({ mensagem: "Carro não encontrado" });

		return res.json(carro);
	} catch (error) {
		return res.status(500).json('Erro interno do servidor')
	}
}

const cadastrarCarro = async (req, res) => {
	const { modelo, marca, ano, cor, descricao } = req.body

	if (!modelo || !marca || !ano) return res.status(400).json({ mensagem: "preencha todos o campos obrigatórios" });

	try {
		const novoCarro = await knex('carros')
			.insert({ modelo, marca, ano, cor, descricao })
			.returning('*');

		return res.status(201).json(novoCarro);
	} catch (error) {
		return res.status(500).json('Erro interno do servidor')
	}
}

const atualizarCarro = async (req, res) => {
	const { id } = req.params
	const { modelo, marca, ano, cor, descricao } = req.body

	try {
		const carro = await knex('carros').where({ id }).first();

		if (!carro) return res.status(400).json({ mensagem: "Carro não encontrado" })

		await knex('carros').update({ modelo, marca, ano, cor, descricao }).where({ id });

		return res.status(204).send()
	} catch (error) {
		return res.status(500).json('Erro interno do servidor')
	}
}

const excluirCarro = async (req, res) => {
	const { id } = req.params

	try {
		const carro = await knex('carros').where({ id }).first();

		if (!carro) return res.status(400).json({ mensagem: "Carro não encontrado" });

		await knex('carros').delete().where({ id });

		return res.status(204).send()
	} catch (error) {
		return res.status(500).json('Erro interno do servidor')
	}
}

module.exports = {
	listarCarros,
	detalharCarro,
	cadastrarCarro,
	atualizarCarro,
	excluirCarro,
}
