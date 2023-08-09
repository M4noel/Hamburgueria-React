const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');
const Carrinho = require('../models/carrinho');

// Rota para buscar os dados do carrinho
router.get('/', async (req, res) => {
  try {
    // Busque os dados do carrinho no banco de dados, mas selecione apenas os campos desejados (exceto o campo "status")
    const carrinho = await Carrinho.find().populate('pedido').select('-status').exec();

    // Retorne os dados do carrinho na resposta
    return res.json(carrinho);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar os dados do carrinho.', message: error.message });
  }
});

// Rota para adicionar um pedido ao carrinho
router.post('/', carrinhoController.create);

// Rota para remover um pedido do carrinho
router.delete('/:id', carrinhoController.remove);

// Rota para buscar o carrinho pelo ID do carrinho
router.get('/:id', carrinhoController.getById);

module.exports = router;
