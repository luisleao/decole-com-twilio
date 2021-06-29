// Decole com a Twilio!
// DEMO EXTRA DE VERIFY :D
// Você precisa rodar os dois códigos de forma individual.
// Atenção: este código deve rodar sempre como backend!

// Quer saber mais sobre esse produto? Acesse https://twilio.com/verify


require('dotenv').config();
const twilio = require('twilio');
const client = twilio( process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN );

let to = process.env.MY_PHONE_NUMBER;

// // CHAMADA PARA CRIAR E ENVIAR UM CÓDIGO DE VERIFICAÇÃO (ou chamada telefônica)
// // Documentação: https://www.twilio.com/docs/verify/api/verification#fetch-a-verification

// const locale = 'pt-br';
// const channel = 'sms';
// client.verify.services(process.env.VERIFICATION_SID)
//     .verifications
//     .create({
//       to: to,
//       channel: channel,
//       locale: locale
//     })
//     .then(verification => {
//       console.log(`Sent verification: '${verification.sid}'`);
//     });


// // CHAMADA PRA CONFERIR O CÓDIGO INFORMADO PELO USUÁRIO
// // Documentação: https://www.twilio.com/docs/verify/api/verification-check

// client.verify.services(process.env.VERIFICATION_SID)
//       .verificationChecks
//       .create({to: to, code: '<INSIRA_O_CODIGO_RECEBIDO>'})
//       .then(verification_check => console.log(verification_check.status))
//       .catch(e => {
//         logger.error(e);
//       });

