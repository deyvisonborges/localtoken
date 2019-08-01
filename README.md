##  :inbox_tray: localtoken
### :package: Uma nova forma de autenticar
Um módulo que visa simular o Local Storage dos browsers.

Tire suas dúvidas comigo:
- [web.dborges@gmail.com][1]
<hr>

Você também pode visualizar a reputação do módulo na NPM 
* https://www.npmjs.com/package/localtoken
### Instalação
`npm install --save localtoken`

### Estrutura do Middleware
A primeira coisa a se fazer, é criar um diretório chamado `middleware` e dentro dele criar um arquivo chamado `auth.js`.

O `auth.js` deve conter o código abaixo:
![alt text](https://i.imgur.com/AEve2qo.png) <br>

*Calma, vamos já entender como tudo funciona...*


Nesse arquivo possuimos a criação do token com o módulo `jsonwebtoken`. Ele será o responsável com *gerar* e *decodificar* o token.

<br>
<hr>

O próximo passo, é definir uma pasta chamada `controller`. Dentro dela criaremos um arquivo chamado `user.js`.
Quando o usuário fizer o **GET** deve-se renderizar a view de login de sua aplicação. O código ficará mais ou menos assim:

![alt text](https://i.imgur.com/0CyQJJD.png)
<hr>
<br>

Continuando no `user.js` iremos incluir um novo trecho de código, que deve ficar assim:
![alt text](https://i.imgur.com/bfhEfoI.png)

Quando o usuario submeter as informações, o nosso código verificará se as informações batem com as que estão em nosso repositório (vale ressaltar que você já deve ter seu repositório com as informações do banco de dados). Para conferir se a `senha hasheada no banco` confere com a que o `usuário informou`, utilizo o módulo `bcrypt`.

Se as informações estão corretas você lancará o usuário para o *storage* (o storage é o nosso módulo `localtoken`). Simples assim.

Será lançada uma chave chamada *login* e o valor dessa chave serão as *informações do usuário*.
> Ressalto que a o nome da chave pode ser de sua escolha

*Até aqui tudo beleza!* <br>

## Agora iremos tratar nas rotas
Crie uma pasta chamada `routes` e dentro dela crie um arquivo chamado `user_routes.js`.
Seu código deve ficar assim:
![alt text](https://i.imgur.com/jKj7vxj.png)

O que acontece aqui em bem simples. Você poderá chamar o middleware `auth` para as rotas que você quer proteger. Estamos simplesmente informando ao nosso middleware em quais rotas ele vai trabalhar.

> a rota que faz o GET do login não pode ter o middleware, pois a rota estará protegida e você não poderá fazer nada com ela.
<br>

## E como vai funcionar, ainda não entendi??? <br>
Então, o middleware entrará em ação nas rotas especificadas, no nosso caso em específico, a *rota de login*. Quando a rota for requisitada, no caso *a rota de POST*, ela entrará em nosso controller, que por sua vez vai fazer todo o processo de validação das informações enviadas com as informações que já temos. O controller, caso haja sucesso na validação, vai enviar as informações para o `localtoken`. <br>
Voltemos ao nosso middleware.
![alt text](https://i.imgur.com/hNAZOp0.png)


Se possuirmos informações no nosso storage, simplesmente mandamos o *next()* e nossa aplicação vai para o próximo passo, próximo passo esse, que foi definido lá no controller. 

Se não for encontrado nada, renderizamos um erro ou uma mensagem bonitinha.

Agora, toda vez que solicitarmos outras routas *como a de edição, por exemplo,* o middleware já vai possuir as informações do usuário logado no storage e vai permitir que você acesse tal rota.

*Simples, não!?*

>Observação: Recomendo trabalhar de forma mais eficiente nas validações. Pode-se até mesmo criar uma dinâmica para renderizar as view, acredite, já testei, funciona.

<br>

*Espero que tenham gostado!*

