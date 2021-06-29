// Decole com Twilio - Episódio 2
// Exemplo com inclusão de uma fila para controlar múltiplas chamadas simultâneas e evitar erro HTTP 429
// Ainda estamos usando um único número Twilio para disparar as mensagens


require('dotenv').config();
const twilio = require('twilio')();



const apiQueue = require('queue');
const q = apiQueue({ concurrency: 10 });
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
            body
        });
        //cria um Promisse que será processada individualmente após o comando q.start().
    });
});

q.on('error', (error) => {
    console.log(error);
});

q.start();
