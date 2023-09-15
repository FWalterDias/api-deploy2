const express = require('express');
const {
	listarCarros,
	detalharCarro,
	cadastrarCarro,
	atualizarCarro,
	excluirCarro,
} = require('./controladores/carros');

const {
	listarUsuarios,
	cadastrarUsuario,
	login,
	obterPerfil,
} = require('./controladores/usuarios');

const { usuarioAutenticado } = require('./intermediarios/auenticacao');

const rotas = express();

rotas.get('/', listarUsuarios);
rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', login);

rotas.use(usuarioAutenticado);

rotas.get('/perfil', obterPerfil);

rotas.get('/carro', listarCarros);
rotas.get('/carro/:id', detalharCarro);
rotas.post('/carro', cadastrarCarro);
rotas.put('/carro/:id', atualizarCarro);
rotas.delete('/carro/:id', excluirCarro);

module.exports = rotas
