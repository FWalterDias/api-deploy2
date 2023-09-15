const express = require('express');
const {
	listarCarros,
	detalharCarro,
	cadastrarCarro,
	atualizarCarro,
	excluirCarro,
} = require('./controladores/carros');

const {
	cadastrarUsuario,
	login,
	obterPerfil,
} = require('./controladores/usuarios');

const { usuarioAutenticado } = require('./intermediarios/auenticacao');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', login);

rotas.get('/', (req, res)=>{
	return res.json('API OK! - HEROKU CLI'); 
});

rotas.use(usuarioAutenticado);

rotas.get('/perfil', obterPerfil);

rotas.get('/carro', listarCarros);
rotas.get('/carro/:id', detalharCarro);
rotas.post('/carro', cadastrarCarro);
rotas.put('/carro/:id', atualizarCarro);
rotas.delete('/carro/:id', excluirCarro);

module.exports = rotas
