
const objetos = [
    { codigo: "cafe", descricao: "Café", valor: 'R$ 3,00' },
    { codigo: "suco", descricao: "Suco Natural", valor: 'R$ 6,20' },
    { codigo: "sanduiche", descricao: "Sanduíche", valor: 'R$ 6,50' },
    { codigo: "salgado", descricao: "Salgado", valor: 'R$ 7,25' },
    { codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 'R$ 1,50' },
    { codigo: "queijo", descricao: "Queijo (extra do sanduiche)", valor: 'R$ 2,00' },
    { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 'R$ 9,50' },
    { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 'R$ 7,50' }
]

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const valores = []
        const nomes = []
        const numeros = []
        const objetosEncontrados = []

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!"
        }

        itens.forEach(element => {
            const novosElementos = element.split(',')
            const nome = novosElementos[0]
            const numero = novosElementos[1]
            nomes.push(nome)
            numeros.push(numero)

        });

        nomes.forEach(nome => {
            objetos.forEach(objeto => {
                if (nome === objeto.codigo) {
                    objetosEncontrados.push(objeto)
                }
            })
        })

        if (nomes.includes('chantily') && !nomes.includes('cafe')) {
            return "Item extra não pode ser pedido sem o principal"
        }

        if (nomes.includes('queijo') && !nomes.includes('sanduiche')) {
            return "Item extra não pode ser pedido sem o principal"
        }

        if (objetosEncontrados.length < 1) {
            return "Item inválido!"
        }

        for (let i = 0; i < objetosEncontrados.length; i++) {

            if (numeros[i] <= 0) {
                return "Quantidade inválida!"
            }

            if (objetosEncontrados[i].codigo != nomes[i]) {
                return "Item inválido!"
            }
            const valorString = objetosEncontrados[i].valor.substring(3).replace(',', '.')
            const valorFormatado = Number(valorString)
            const total = valorFormatado * numeros[i]
            valores.push(total)
        }

        let valorTotalCompra = valores.reduce((acc, valor) => acc + valor, 0)
        const desconto = valorTotalCompra * 0.05
        const acrescimo = valorTotalCompra * 0.03

        if (metodoDePagamento.toLowerCase() === 'dinheiro') {
            valorTotalCompra -= desconto
            const valorCompra = 'R$ ' + valorTotalCompra.toFixed(2)
            const valorFormatado = valorCompra.replace('.', ',')
            return valorFormatado
        }
        else if (metodoDePagamento.toLowerCase() === "credito") {
            valorTotalCompra += acrescimo
            const valorCompra = 'R$ ' + valorTotalCompra.toFixed(2)
            const valorFormatado = valorCompra.replace('.', ',')
            return valorFormatado
        }
        else if (metodoDePagamento.toLowerCase() === 'debito') {
            const valorCompra = 'R$ ' + valorTotalCompra.toFixed(2)
            const valorFormatado = valorCompra.replace('.', ',')
            return valorFormatado
        }
        else {
            return "Forma de pagamento inválida!"
        }
    }

}

export { CaixaDaLanchonete };
