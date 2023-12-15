const knex = require('../conexao.js');
const { groupBy } = require('lodash');

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;

    try {

        if (cliente_id) {
            const clienteExistente = await knex('clientes').where('id', cliente_id);

            if (clienteExistente.length === 0) {
                return res.status(400).json({ mensagem: 'Cliente não encontrado' });
            }
        }

        let consultaPedidos = knex('pedidos')
            .leftJoin('pedido_produtos', 'pedidos.id', '=', 'pedido_produtos.pedido_id')
            .select(
                'pedidos.id as pedido.id',
                'pedidos.valor_total as pedido.valor_total',
                'pedidos.observacao as pedido.observacao',
                'pedidos.cliente_id as pedido.cliente_id',
                'pedido_produtos.id as pedido_produtos.id',
                'pedido_produtos.quantidade_produto as pedido_produtos.quantidade_produto',
                'pedido_produtos.valor_produto as pedido_produtos.valor_produto',
                'pedido_produtos.pedido_id as pedido_produtos.pedido_id',
                'pedido_produtos.produto_id as pedido_produtos.produto_id'
            );
        
        if (cliente_id) {
            consultaPedidos.where('pedidos.cliente_id', cliente_id);
        }

        const resultadoPedidos = await consultaPedidos;
        const pedidosAgrupados = groupBy(resultadoPedidos, 'pedido.id');

        const respostaFormatada = Object.values(pedidosAgrupados).map((grupo) => {
            return {
                pedido: {
                    id: grupo[0]['pedido.id'],
                    valor_total: grupo[0]['pedido.valor_total'],
                    observacao: grupo[0]['pedido.observacao'],
                    cliente_id: grupo[0]['pedido.cliente_id']
                },
                pedido_produtos: grupo.map((item) => {
                    return {
                        id: item['pedido_produtos.id'],
                        quantidade_produto: item['pedido_produtos.quantidade_produto'],
                        valor_produto: item['pedido_produtos.valor_produto'],
                        pedido_id: item['pedido_produtos.pedido_id'],
                        produto_id: item['pedido_produtos.produto_id']
                    };
                })
            };
        });

        return res.status(200).json(respostaFormatada);
    }
    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}


module.exports = listarPedidos