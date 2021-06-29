![Decole com a Twilio](decole.png)
# Decole com a Twilio

 A Twilio possui ferramentas incríveis, mas para nós, desenvolvedores, pode ser intimidante saber por onde começar.  
  
Nesta série de três webinars, abordaremos desde conceitos básicos e como resolver problemas do mundo real através de APIs e implementar ideias mais avançadas utilizando ferramentas de programação.

Este repositório está vinculado a série de 3 webinars realizada em Junho de 2021.

# **[Assistir episódios](https://ahoy.twilio.com/devgen_webinar_liftoff_1_LATAM_BR-1)**
  

### Episódio 1 (15/06): Primeiros passos com APIs

Vamos abordar uma introdução aos "webhooks" e requisições na API da Twilio, repletas de códigos com exemplos reais como, por exemplo, responder mensagens e realizar e controlar chamadas telefônicas.

### [Acompanhar com código-fonte](/episodio_1)
  

## Episódio 2 (22/06): Problemas do mundo real

Construiremos a partir dos fundamentos que aprendemos no primeiro episódio com exemplos mais concretos do mundo real. Abordaremos como interagir com seus bancos de dados existentes e utilizaremos um problema muito comum: como verificar o número de telefone de um usuário quando eles se registram em seu aplicativo.

  ### [Acompanhar com código-fonte](/episodio_2)


## Episódio 3 (29/06): Seu app com escala

Vamos conferir alguns tópicos mais avançados para desenvolvedores, como agendamento de comandos para notificar usuários e alterar a abordagem das chamadas das APIs para um modelo assíncrono, para que nosso aplicativo seja muito mais escalável.

 ### [Acompanhar com código-fonte](/episodio_3)

  
  
 # Rodando os exemplos
* Configure as variáveis de ambiente
* Cada episódio utiliza um arquivo principal `index.js` ou `server.js`
* Rode utilizando o comando `node ARQUIVO.js`

## Variáveis de ambiente para configurar

* `TWILIO_ACCOUNT_SID`: ACCOUNT_SID na home do https://www.twilio.com/console
* `TWILIO_AUTH_TOKEN`: AUTH TOKEN na home do https://www.twilio.com/console
* `OPENWEATHERKEY`: Faça login e registro um token em https://openweathermap.org/appid
* `TWILIO_MOBILE_NUMBER`: Seu número Twilio (pode ser um número dos Estados Unidos que tenha SMS)
* `MY_PHONE_NUMBER`: Seu número pessoal no formato +5511912345678
* `TWILIO_MESSAGING_SERVICE_SID`: crie em https://www.twilio.com/console/sms/services (começa com `MG`)
* `TWILIO_NOTIFY_SERVICE_SID`: crie em https://www.twilio.com/console/notify/services (começa com `IS`)

**Você pode criar um arquivo `.env` com essas variáveis**

Salve este arquivo na raiz de cada episódio!
