const express = require("express");
const { response, request } = require("express");
const {randomUUID} = require("crypto");
const fs = require("fs");

const app = express();

let produtos = [];

fs.readFile("produtos.json", "utf-8", (err,data) => {
    if (err) {
        console.log(err);
    } else {
        produtos = JSON.parse(data)
        console.log("Arquivo carregado com produtos!!");
    }
})

app.use(express.json());

app.get("/primeira", (request,response) => {
    return response.send("apenas um teste!")
})

app.post("/produtos",(request, response) => {

    const {nome, preco} = request.body;

    const produto = { nome,
        preco,
        id: randomUUID(),}

    produtos.push(produto);

    arquivaProduto();

    return response.json(produto)
    //console.log(body);
})

app.get("/produtos", (request, response) => {
    return response.json(produtos)
})

app.get("/produtos/:id", (request, response) => {
    const {id} = request.params;
    const produto = produtos.find((produto) => produto.id === id);
    return response.json(produto);
});

app.put("/produtos/:id", (request, response) => {
    const {id} = request.params;
    const {nome, preco} = request.body;
    const produtoIndex = produtos.findIndex((produto) => produto.id === id);
    produtos[produtoIndex] = {
        ...produtos[produtoIndex],
        nome,
        preco,
    };

    arquivaProduto();

    return response.json({mensagem: "Produto alterado com sucesso!!"});
});

app.delete("/produtos/:id", (request, response) => {
    const {id} = request.params;
    const produtoIndex = produtos.findIndex((produto) => produto.id === id);
    produtos.splice(produtoIndex,1);

    arquivaProduto();

    return response.json({mensagem: "Produto removido com sucesso!!"});
});

function arquivaProduto() {
    fs.writeFile("produtos.json", JSON.stringify(produtos), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Produto inserido no arquivo!!");
    }
    });
}

app.listen(4002, () => console.log ("Servidor rodando na porta 4002!!"))