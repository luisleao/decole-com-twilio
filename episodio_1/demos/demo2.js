// Decole com Twilio - Episódio 1
// Demo sobre como modificar chamadas em andamento


const twilio = require("twilio");
require("dotenv").config();


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.calls.each(call => {
    if (call.status === 'in-progress') {
        const twiml = new twilio.twiml.VoiceResponse();
        twiml.say({ voice: 'alice', language: 'pt-BR' }, 'Então é isso pessoal! Obrigado por participar da nossa demonstração.');
        client.calls(call.sid)
            .update({ twiml: twiml.toString() })
            .then(call => console.log('encerrada: '));
    }
})