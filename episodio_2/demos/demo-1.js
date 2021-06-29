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

app.all('/', twilio.webhook(), (req, res) => {
    // VAI FALHAR SE O LOCALHOST NÃO FOR HTTPS!!! POR ISSO INCLUIR {validate: false} dentro da chamada da função webhook()
    console.log('> ', escondeNumero(req.body.From), ':', req.body.Body);

    const twiml = new MessagingResponse;
    twiml.message(`Obrigado por enviar uma mensagem.`);

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