const knex = require('../conexao');
const trasportador = require('../email');

const cadastrarPedido = async (req, res) => {
    const {cliente_id,observacao,pedido_produtos} = req.body;
    
    try {
        const clienteLocalizado = await knex('clientes').where('id',cliente_id);
        
        if (clienteLocalizado.length < 1){
            return res.status(404).json({mensagem:'Cliente não localizado!'});
        }
        let  valorTotalPedido = 0;
        for(let i=0; i<pedido_produtos.length;i++){
            const produtoPedido = await knex('produtos').where('id', pedido_produtos[i].produto_id);

            if(produtoPedido.length<1){
                return res.status(404).json({mensagem:'Produto não localizado!'});
            }

            if(produtoPedido[0].quantidade_estoque<pedido_produtos[i].quantidade_produto){
                return res.status(400).json({mensagem:'A quantidade do estoque é menor que a do pedido!'});
            }
            
            const valorProduto = (pedido_produtos[i].quantidade_produto) * (produtoPedido[0].valor);
            
            valorTotalPedido = valorProduto + valorTotalPedido
        }

        for(let i=0; i<pedido_produtos.length;i++){
            await knex('produtos')
            .decrement('quantidade_estoque',pedido_produtos[i].quantidade_produto)
            .where('id',pedido_produtos[i].produto_id);
        }

        const pedido = {
            cliente_id,
            observacao,
            valor_total: valorTotalPedido
        }

        const idPedidoNovo = await knex('pedidos').insert(pedido).returning('id');

        for(let i=0; i<pedido_produtos.length;i++){
            const produtoPedido = await knex('produtos').where('id', pedido_produtos[i].produto_id);
                        
            const cadastroProdutoPedido = {
                pedido_id: idPedidoNovo[0].id,
                produto_id:pedido_produtos[i].produto_id,
                quantidade_produto: pedido_produtos[i].quantidade_produto,
                valor_produto: produtoPedido[0].valor
            }
            
            await knex('pedido_produtos').insert(cadastroProdutoPedido);
        }

        const pedidosCadastrados = await knex('pedidos').where('id',idPedidoNovo[0].id).first();

        trasportador.sendMail({
            from:`${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to:`${clienteLocalizado[0].nome} <${clienteLocalizado[0].email}>`,
            subject: 'PEDIDO EFETUADO COM SUCESSO',
            html: `
            <h2 style="text-align: center;">Parabéns ${clienteLocalizado[0].nome}, seu pedido foi concluído com sucesso!</h2>

            <p>Dados do pedido:</p>
            
            <p>Id do pedido: ${pedidosCadastrados.id}</p>
            <p>Observação: ${pedidosCadastrados.observacao}</p>
            <p>Valor total do pedido: ${pedidosCadastrados.valor_total}</p>            
            `
        })

        return res.status(200).json(pedidosCadastrados);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports ={
    cadastrarPedido
}