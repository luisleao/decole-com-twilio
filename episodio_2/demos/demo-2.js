// Decole com Twilio - Episódio 2
// 


require('dotenv').config();

const express = require('express');
const app = express();
const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;

app.use(express.urlencoded({
    extended: true
}));

app.all('/', twilio.webhook({validate: false}), (req, res) => {
    console.log('> ', escondeNumero(req.body.From), ':', req.body.Body);

    const twiml = new MessagingResponse;
    twiml.message(`Obrigado por enviar uma mensagem.`);
    res.type('xml');
    res.send(twiml.toString());
});


app.all('/mensagem', (req, res) => {
    const twilioSignature = req.headers['x-twilio-signature'];
    const params = req.body;
    const url = 'https://leao.ngrok.io/mensagem'; // Utilizar aqui a URL IGUAL AO CONFIGURADO NO SEU WEBHOOK!

    const requestIsValid = twilio.validateRequest(
        process.env.TWILIO_AUTH_TOKEN,
        twilioSignature,
        url,
        params
    );

    console.log('$ ', escondeNumero(req.body.From), ':', req.body.Body);

    if (!requestIsValid) {
        console.log('Chamada inválida!');
        return res.status(401).send('Unauthorized');
    }

    console.log('Chamada válida!');
    console.log();

    // Executar alguma ação, salvar em banco ...
    // então responder a mensagem!
    const twiml = new MessagingResponse;
    twiml.message(`Obrigado por enviar uma mensagem *com segurança*.`);
    res.type('xml');
    res.send(twiml.toString());
});

app.listen(
    3000,
    () => console.log(`Servidor rodando!`)
);



const client = twilio( process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN );


function escondeNumero(number) {
    // +5511999991234 => +55119****1234
    number = number.replace('whatsapp:', '');
    return number.substr(0, number.length - 8) + '****-' + number.substr(number.length - 4 )
}