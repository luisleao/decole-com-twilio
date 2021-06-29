// Decole com Twilio - Episódio 2
// 


require('dotenv').config();
const db = require('./database'); // <========================================

const express = require('express');
const app = express();
const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;

app.use(express.urlencoded({
    extended: true
}));

app.all('/telefone', async (req, res) => {
    console.log('> ', escondeNumero(req.body.From), ':', req.body.Body);

    const twiml = new MessagingResponse;
    const numero = req.body.From.replace('whatsapp:', '');
    const pedido = await db.getOrderByPhoneNumber(numero);

    if (pedido) {
        twiml.message(`O seu pedido de *${pedido.orderItem}* está com a situação *${pedido.orderStatus}* e entrega estimada para ${pedido.deliveryDate}`)
    } else {
        twiml.message(`Não consegui encontrar seu número em nosso registro. Confire online em twilioshoes.com`)
    }
    // Comando para retornar ao fluxo do Twilio Studio e continuar a sequência
    // Copiar o link abaixo das configurações de webhook do seu fluxo. Incluir o parâmetro '?FlowEvent=return' no final da URL.
    twiml.redirect('https://webhooks.twilio.com/v1/Accounts/<SUA_ACCOUNT_ID>/Flows/<FLUXO_SERVICE_SID>?FlowEvent=return');

    res.type('xml');
    res.send(twiml.toString());
});


app.all('/pedido', async (req, res) => {
    console.log('> ', escondeNumero(req.body.From), ':', req.body.Body);

    const twiml = new MessagingResponse;
    const numeroPedido = req.body.Body.trim();
    const pedido = await db.getOrderByOrderNumber(numeroPedido);

    if (pedido) {
        twiml.message(`O seu pedido de *${pedido.orderItem}* está com a situação *${pedido.orderStatus}* e entrega estimada para ${pedido.deliveryDate}`)
    } else {
        twiml.message(`Não consegui encontrar seu número em nosso registro. Confire online em twilioshoes.com`)
    }
    // Comando para retornar ao fluxo do Twilio Studio e continuar a sequência
    // Copiar o link abaixo das configurações de webhook do seu fluxo. Incluir o parâmetro '?FlowEvent=return' no final da URL.
    twiml.redirect('https://webhooks.twilio.com/v1/Accounts/<SUA_ACCOUNT_ID>/Flows/<FLUXO_SERVICE_SID>?FlowEvent=return');

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