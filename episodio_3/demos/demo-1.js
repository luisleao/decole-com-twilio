// Decole com Twilio - Episódio 2
// Exemplo padrão para disparo de múltiplas mensagens, sem tratar concorrência e erros


require('dotenv').config();
const twilio = require('twilio')();
//carrega automaticamente se tiver as variáveis de ambiente TWILIO_ACCOUNT_SID, TWILIO_ACCOUNT_TOKEN

const body = 'A Black Friday do Leão vem aí!\nJá preparou seu servidor?';

const numeros = [process.env.MY_PHONE_NUMBER];

numeros.forEach(numero => {
    twilio.messages.create({
        to: numero,
        from: process.env.TWILIO_MOBILE_NUMBER,
        body
    }).then(mensagem => {
        console.log(mensagem.sid);
    });
});
