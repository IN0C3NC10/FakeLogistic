// estas declarações são basicamente "imports" no back-end
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models/');
const QRCode = require('qrcode');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ..o sistema entende que pode acessar imagens e etc
app.use(express.static('assets'));

let user = models.User;
let tracking = models.Tracking;
let product = models.Product;

//................................................................
// ..ROTAS
//................................................................

// ..login
app.post('/login', async (req, res) => {
    let response = await user.findOne({
        where: {
            name: req.body.name,
            password: req.body.password,
        }
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }
});

// ..altera a senha
app.post('/verifyPass', async (req, res) => {
    // ..realiza a busca no banco
    let response = await user.findOne({
        where: {
            id: req.body.id,
            password: req.body.oldPass,
        }
    })
    // ..recebe se a senha existe
    if (response === null) {
        res.send(JSON.stringify('Senha inválida!'));
    } else {
        // ..se existir, verifica se as 2 novas batem
        if (req.body.newPass === req.body.confNewPass) {
            response.password = req.body.newPass;
            response.save();
            res.send(JSON.stringify('Senha atualizada!'));
        } else {
            res.send(JSON.stringify('Novas senhas não conferem!'));
        }

    }
});

// ..insere os dados
app.post('/store', async (req, res) => {
    let trackingId = '';
    // ..insere os dados na tabela rastreio
    await tracking.create({
        code: req.body.code,
        local: req.body.address,
        userId: req.body.id,

    }).then((response) => {
        // ..recupera o id do item cadastrado
        trackingId += response.id;
    });

    await product.create({
        trackingId: trackingId,
        name: req.body.product,
    });

    QRCode.toDataURL(req.body.code).then(url => {
        // ..diretorio do arquivo
        QRCode.toFile('./assets/img/code.png', req.body.code);
        res.send(JSON.stringify(url));
    })
});

// ..mostra os dados de um produto
app.post('/show', async (req, res) => {
    let response = await tracking.findAll({
        where: {
            code: req.body.code,
        },
        include: [{
            model: product,
        }],
    });

    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        // ..retorna apenas o nome do produto
        res.send(JSON.stringify(response[0].Products[0].name));
    }
});

// ..encontra os dados para o rastreio
app.post('/show-track', async (req, res) => {
    try {
        let response = await tracking.findAll({
            where: {
                code: req.body.code,
            },
            include: [{
                model: product,
            }],
        });

        // ..retorna os dados para o fron-end em react
        if (response == null) {
            res.send(JSON.stringify('Nenhum produto encontrado com este código.'));
        } else {
            // ..retorna apenas o nome do produto
            res.send(JSON.stringify('Sua encomenda ' + response[0].Products[0].name + ', se encontra no seguinte local/coordenadas ' + response[0].local + '.'));
        }
    } catch (error) {
        res.send(JSON.stringify('Ocorreu um erro, tente novamente.'));
    }
});

// ..mostra os dados de um produto
app.post('/update', async (req, res) => {
    let response = await tracking.findAll({
        where: {
            code: req.body.code,
        },
        include: [{ model: product }],
    });
    // ..atualiza os dados
    response[0].local = req.body.local;
    response[0].updatedAt = new Date();
    response[0].Products[0].name = req.body.product;
    // ..de fato os salva
    response[0].save();
    response[0].Products[0].save();

    res.send(JSON.stringify('Dados atualizados!'));

});
//................................................................
// ..ROTAS
//................................................................


// ..recebe a porta do env ou em caso de local é a porta 3000
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Started Server!');
});