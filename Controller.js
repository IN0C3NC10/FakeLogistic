// estas declarações são basicamente "imports" no back-end
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models/index');
const QRCode = require('qrcode');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

    QRCode.toDataURL(req.body.code).then(url=>{
        // ..diretorio do arquivo
        QRCode.toFile('./assets/img/code.png', req.body.code);
        res.send(JSON.stringify(url));
    })
});
//................................................................
// ..ROTAS
//................................................................


// ..recebe a porta do env ou em caso de local é a porta 3000
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Started Server!');
});