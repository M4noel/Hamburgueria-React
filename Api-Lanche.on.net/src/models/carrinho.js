const mongoose = require('mongoose');

const CarrinhoSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true
  },
  nome: String,
  carne: String,
  pao: String,
  opcionais: [String],
  bebida: String,
  porcao: String,
  combo: {
    nomeCombo: String, // Novo campo adicionado para armazenar o nome do combo
    qtdCombo: Number,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Combos'
    }
  },
  descricaoCombo: String,
  descricaoPorcao: String,
  numeroPedido: { type: Number, unique: true },
  data: {
    type: Date,
    default: Date.now
  }
});

const Carrinho = mongoose.model('Carrinho', CarrinhoSchema);

module.exports = Carrinho;
