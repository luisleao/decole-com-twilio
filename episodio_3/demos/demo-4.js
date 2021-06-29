// Decole com Twilio - Episódio 2
// Uso do Twilio Notify para disparar até 10.000 destinatários por chamada

// Quer saber mais sobre esse produto? Acesse https://www.twilio.com/notify


require('dotenv').config();
const twilio = require('twilio')();



const body = 'A Black Friday do Leão vem aí!\nJá preparou seu servidor?';

const numeros = [process.env.MY_PHONE_NUMBER];

const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);


// Cria as conexões para cada uma das mensagens a enviar
const bindings = numeros.map(numero => {
    return JSON.stringify({
        binding_type: 'sms',
        address: numero
    });
});

// Criar a notificação adicionando os vínculos
service.notifications.create({
    toBinding: bindings,
    body
}).then(notification => {
    console.log(notification.sid);
});



// // Criar um binding para cada destinatário
// service.bindings.create({
//         identity: 'GUID_ALEATORIO', // NAO USAR INFORMAÇÕES PESSOAIS OU QUE POSSAM IDENTIFICAR PESSOALMENTE (LGPD/GDPR)!!!
//         // Você pode armazenar até 20 destinos na mesma identity
//         binding_type: 'sms',
//         address: number
//         // tag: [] // é possível adicionar tags para filtrar o disparo
//     })
//     .then(binding => console.log(binding.sid));



// Criar notificação filtrando por tag
// service.notifications
//     .create({tag: ['TAG_DO_USUARIO'], body})
//     .then(notification => console.log(notification.sid));