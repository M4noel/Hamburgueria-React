const Carrinho = require('../models/carrinho');
const Pedido = require('../models/pedidos');

module.exports = {
  async create(req, res) {
    try {
      const { pedidoNumero } = req.body;

      // Busca o pedido pelo número do pedido e popula seus dados
      const pedido = await Pedido.findOne({ numeroPedido: pedidoNumero }).exec();

      if (!pedido) {
        return res.status(400).json({ error: 'Pedido não encontrado.' });
      }

      // Cria o carrinho com os dados do pedido
      const carrinhoData = {
        pedido: pedido._id,
        nome: pedido.nome,
        carne: pedido.carne,
        pao: pedido.pao,
        opcionais: pedido.opcionais,
        bebida: pedido.bebida,
        porcao: pedido.porcao,
        combo: pedido.combo,
        descricaoCombo: pedido.descricaoCombo,
        descricaoPorcao: pedido.descricaoPorcao,
        numeroPedido: pedido.numeroPedido,
      };

      const carrinho = await Carrinho.create(carrinhoData);

      return res.status(201).json({ carrinho, message: 'Pedido adicionado ao carrinho com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao adicionar pedido ao carrinho.', message: error.message });
    }
  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const carrinho = await Carrinho.findById(id).populate('pedido').exec();

      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado.' });
      }

      return res.json({ carrinho });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar o carrinho.', message: error.message });
    }
  },

  async remove(req, res) {
    const { id } = req.params;

    try {
      const carrinho = await Carrinho.findByIdAndDelete(id);

      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado.' });
      }

      return res.json({ message: 'Carrinho removido com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover o carrinho.', message: error.message });
    }
  },
};
