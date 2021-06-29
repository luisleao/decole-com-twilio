// Decole com Twilio - Episódio 2
// 


require('dotenv').config();
const db = require('./database');

const twilio = require('twilio');
const client = twilio( process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN );

let orders = db.getOrdersByStatus('saiu_entrega');
orders.forEach(pedido => {
    const mensagem = `O seu pedido de *${pedido.orderItem}* na *Owl Shoes* ${pedido.orderStatus.toLowerCase()} com previsão de recebimento em ${pedido.deliveryDate}`;
    client.messages.create({
        to: `whatsapp:${pedido.phoneNumber}`,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        body: mensagem
    });
    console.log('PEDIDO > ', pedido);
})

