const fs = require('fs'); 

const objProdutos= require('./broken-database.json'); 

const dadosString = JSON.stringify(objProdutos);

const dadosProdutos= JSON.parse(dadosString);

//Função que corrige os caracteres que foram trocados dos nomes dos produtos
function corrigirNome(nameProduto) {
    nameProduto = nameProduto.replaceAll('æ', 'a').replaceAll('¢', 'c').replaceAll('ø', 'o').replaceAll('ß', 'b');
    return nameProduto;
}

//Função que transforma o preço que for string em número
function corrigirPreco(priceProduto) {
    if (typeof priceProduto == "string") {
        priceProduto = parseFloat(priceProduto);
    }

    return priceProduto;
}

//Função que corrige as quantidades caso o produto não tenha esse dado
function corrigirQtd(qtdProduto) {
    if (qtdProduto == undefined) {
        qtdProduto = 0;
    }

    return qtdProduto;
}

//Função que corrige os dados e ao fim faz a validação e salva no arquivo saida.json
function corrigirTudo() {
    const dadosCorrigidos = dadosProdutos.map(dados => {
        const nomeCorrigido = corrigirNome(dados.name);
        dados.name = nomeCorrigido;

        const precoCorrigido = corrigirPreco(dados.price);
        dados.price = precoCorrigido;

        const qtdCorrigida = corrigirQtd(dados.quantity);
        dados.quantity = qtdCorrigida;

        return dados;
    })

    console.log("Dados corrigidos", dadosCorrigidos);

    ordernarCategoriaId(dadosCorrigidos);
    somarPorCategoria(dadosCorrigidos);

    salvarDados(dadosCorrigidos);
}

//Função que ordena os produtos pela categoria e pelo id
function ordernarCategoriaId(dadosProdutos) {
    dadosProdutos.sort((a, b) => {
        if (a.category < b.category) 
             return -1;

        else if (a.category > b.category) 
            return 1;

        else
            return 0;
    })

    dadosProdutos.sort((a, b) => {
        if (a.category == b.category) {
            if (a.id < b.id) 
             return -1;
        }

        else if (a.id > b.id) 
            return 1;

        else
            return 0;
    })

    console.log("Dados Ordenados Categoria e Id");
    console.log(dadosProdutos);

}

//Função que faz a soma dos produtos da mesma categoria
function somarPorCategoria(dadosProdutos) {
        dadosProdutos.map((produto) => {
            if(produto.category == "Eletrônicos"){
                const precosEletronicos = produto.price;
                console.log("lista Eletronicos", precosEletronicos);
            }
            if(produto.category == "Eletrodomésticos"){
                const precosEletrodomesticos = produto.price;
                console.log("lista Eletrodomésticos", precosEletrodomesticos);
            }
            if(produto.category == "Panelas"){
                const precosPanelas = produto.price;
                console.log("lista Panelas", precosPanelas);
            }
            if(produto.category == "Acessórios"){
                const precosAcessorios = produto.price;
                console.log("lista Acessórios", precosAcessorios);
            }

    });

}

//Função que escreve os dados recuperados no arquivo saida.json
function salvarDados (dados) {
    const dadosJson = JSON.stringify(dados, null, 2); //referência: https://stackabuse.com/reading-and-writing-json-files-with-node-js/
    fs.writeFileSync('saida.json', dadosJson);
}

corrigirTudo();