// Decole com Twilio - Episódio 2
// Exemplo de uso do 'statusCallback' para receber chamadas da Twilio quando mudar o status de envio de cada mensagem


require('dotenv').config();
const twilio = require('twilio')();



const apiQueue = require('queue');
const q = apiQueue({ concurrency: 500 });
// concurrency permite controlar o número de requisições simultâneas
// evitar o erro HTTP 429: Too Many Requests
// https://www.npmjs.com/package/queue




const body = 'A Black Friday do Leão vem aí!\nJá preparou seu servidor?';

const numeros = [process.env.MY_PHONE_NUMBER];
numeros.forEach(numero => {
    q.push(()=> {
        return twilio.messages.create({
            to: numero,
            from: process.env.TWILIO_MOBILE_NUMBER,
            body,
            statusCallback: 'https://urlParaRastrearEntregaDaMensagem'
        });
    });
});

q.on('error', (error) => {
    console.log(error);
});

q.start();