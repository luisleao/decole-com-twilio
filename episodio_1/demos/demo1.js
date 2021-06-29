// Decole com Twilio - Episódio 1
// Demo sobre como responder um webhook de chamada telefônica e consultar informações de clima de acordo com a cidade do usuário


const express = require("express");
const app = express();
const server = require("http").createServer(app);
const twilio = require("twilio");
const axios = require("axios");
require("dotenv").config();


app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.send("Vamos decolar com a Twilio!");
})

function escondeNumero(number) {
    // +5511999991234 => +55119****1234
    if (!number) return 'numero oculto';
    return number.substr(0, number.length - 8) + '****-' + number.substr(number.length - 4 )
}
let url = `http://api.openweathermap.org/data/2.5/weather`;

app.post("/voz", async (req, res) => {
    let cidade = req.body.CallerCity;
    let estado = req.body.CallerState;
    let numero = req.body.From;

    let weather = await axios.get(url, {
        params: {
            units: 'metric',
            lang: 'pt_br',
            q: `${cidade}, ${estado}, Brazil`,
            appid: process.env.OPENWEATHERKEY
        }
    }).then((result) => {
        return result.data;
    }).catch(e => {
        console.log('error ', e);
        return null
    });

    console.log(`Nova ligação de ${escondeNumero(numero)} em ${cidade}`);

    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say({ voice: "alice", language: "pt-BR"},"Olha! Este é o novo teste do Leão!");

    if (weather) {
        console.log('chegou tempo ', weather.main.temp)
        twiml.say({ language: 'pt-BR', voice: 'alice'}, `A temperatura atual da sua cidade é de ${Math.round(weather.main.temp)} graus.`);
        twiml.say({ language: 'pt-BR', voice: 'alice'}, `Com sensação térmica de ${Math.round(weather.main.feels_like)} graus.`);

    } else {
        twiml.say({ language: 'pt-BR', voice: 'alice'}, `Não consegui identificar a sua cidade.`);
    }

    twiml.pause({ length: 5 });
    twiml.play("http://demo.twilio.com/docs/classic.mp3");

    res.contentType("text/xml");
    res.send(twiml.toString());


    // // Esta é a resposta padrão em XML sem utilizar a biblioteca
    // res.send(`<?xml version="1.0" encoding="UTF-8"?>
    // <Response>
    // <Say voice="alice" language="pt-BR">Olá. Obrigado por fazer o teste com o Leão!</Say>
    // <Pause length="1"/>
    // <Say voice="alice" language="pt-BR">Estamos felizes com você participando da nossa demonstração</Say>
    // </Response>
    // `);
})

server.listen(8080);

