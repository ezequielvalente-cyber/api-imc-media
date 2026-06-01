const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

//http://localhost:3000/saudacao?nome=maria
app.get("/saudacao", (req, res) => {
    const nome = req.query.nome;
    if (!nome) {
        return res.status(404).json(
            {
                erro: "nome não informado"
            }
        )
    }
    res.json(
        {
            mensagem: `saudação ${nome}!`
        }
    )
})
app.post("/imc", (req, res) => {
    const { nome, idade, altura, peso } = req.body;

    if (!nome || !idade || !altura || !peso) {
        return res.status(404).json({ erro: "dados imcompletos" })
    }
    const imc = peso / (altura * altura);
    res.json({
        nome,
        idade,
        imc: imc.toFixed(2)
    })
})
app.post("/media", (req, res) => {
    const { nota1, nota2 } = req.body;

    if (!nota1 || !nota2) {
        return res.status(404).json({ erro: "dados incompletos" })
    }
    const media = (parseFloat(nota1) + parseFloat(nota2)) / 2;

    res.json({
        mensagem: media >= 7 ? "aprovado" : "reprovado",
        media: parseFloat(media)
    })

})
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(404).json({ erro: "dados incompletos" })
    }
     if (email === "admin@admin.com" && senha === "123456") {
        return res.status(200).json({ token: "123456" })
    } else {
        return res.status(404).json({ erro: "senha ou email incorreto" })
    }
})
//finalzao
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})