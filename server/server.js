const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spotifyWebApiConnect = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('./login'), (req, res) => {
    const code = req.body.code;

    const spotifyApi = new spotifyWebApiConnect ({
        redirectUri: 'http://localhost:3000',
        clientId: '2ec42fd274a541d184c33779393cc9cb',
        clientSecret: '6355b5d56a864e6f8f393aba6676d009',
    }) 

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refresh_token: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
        .catch(() => {
            res.sendstatus(400)
        })
    });

    app.listen(3001)
}

