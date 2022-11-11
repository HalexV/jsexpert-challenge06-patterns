[challengeguide]: https://github.com/training-erickwendel/jsexpert-challenge-guide/

> ATENÇÃO: ESTE DESAFIO É EXTREMAMENTE EXPERT, RECOMENDAMOS FAZER O RESTANTE DO CURSO ATÉ AQUI ANTES DE MERGULHAR NAS ARQUITETURAS EXIGIDAS DESSE DESAFIO EM DIANTE

# Story: Envio de Mensagens em Diferentes Plataformas

> Nota do Wells: Esse desafio faz parte deixar uma série de desafios e quaisquer informações adicionais e/ou ajuda que você precise, é só conferir aqui no [Guia oficial dos Desafios JS Expert][challengeguide]! Bons estudos e ótimo desafio! :rocket:

## Motivação

Com o objetivo de colocar vocês para pensar em quais design patterns usar dado um cenário prático, usando o conteúdo visto no `módulo 07 - Design Patterns PT 01 - Best Practices and Creational Design Patterns`, você deverá criar um **Serviço de Envio de Mensagens**, apresentando a melhor grupo de padrões para **enviar mensagens em diferentes plataformas** com o máximo de planejamento e qualidade usando as boas práticas `DRY`, `KISS` e `YAGNI`, juntamente com `Clean Code` e `SOLID`, e lembrando de reconhecer os comportamentos em comum do sistema para aplicar os `Design Patterns` que melhor servir ao desenvolvimento da sua solução!

Design Patterns sugeridos para serem implementados aqui:

- [x] Factory
- [ ] Abstract Factory
- [x] N-Tiers Architecture
- [x] Dependency Injection
- [ ] Builder
- [x] Fluent API
- [ ] Facade
- [x] Test Data Builder
- [x] Object Mother

> Nota do Wells: **Não precisa usar todos**, mas no decorrer da implementação quando bater aquela clááássica dúvida dev: "Caramba, como eu organizo isso? 🤔"; Muito provavelmente é a hora de revisar os conceitos e os códigos do módulo, pois muito provavelmente existe um Design Pattern pra isso!

## Idéia geral

Uma empresa específica necessita disponibilizar a aquisição e o uso de diferentes tipos de créditos para envios de mensagens. Os créditos podem ser divididos em: `e-mail`, `sms` e `whatsapp`.

Cada tipo de crédito representará quantas mensagens o usuário poderá enviar na plataforma em questão. Exemplo: 1 crédito de `e-mail` permite que o usuário envie 1 mensagem via e-mail para qualquer destinatário.

### Até onde implementar?

Visando entregar uma POC (Proof Of Concept) do projeto, a empresa deseja que você apresente e implemente uma arquitetura que seja viável para o projeto, mas nesse estágio inicial não será necessário fazer o envio de mensagens de fato ou realizar qualquer integração com terceiros para a aquisição de créditos. (Isto é: você **não precisa** implementar o envio de e-mail, sms e whatsapp! Apenas definir os fluxos para que estes detalhes de implementação sejam vistos no futuro. O mesmo vale para a aquisição de crédito)

### Como validar a solução?

Ainda por ser um POC, o projeto não precisará ter uma interface gráfica (nem web e nem no terminal)! A saída dos dados e validação das funções deverá ser feita por meio de testes automatizados que cubram os comportamentos esperados e documentem muito bem todos cenários possíveis, visando ser uma boa documentação para implementações futuras.

## O projeto

Como o nível de dificuldade do curso tende a subir bastante desse módulo em diante, a idéia é trazer vocês para juntarem as peças do quebra cabeça e combinarem os design patterns como acharem melhor, então especialmente nesse desafio **não necessariamente existe certo ou errado**. Mas esse é um ótimo lugar para praticar a resolução de problemas e o seu posicionamento na tomada de decisões de um sistema importante.

> Nota do Wells: Inclusive, com certeza vai valer a pena dar uma olhada nas soluções desenvolvidas pelos colegas e na solução oficial do desafio depois para poder comparar com a sua. Interessante ver como podemos organizar as coisas de maneiras diferentes!

Então o que será avaliado é:

- [ ] Tomada de decisões referente à escolha de arquiteturas
- [ ] Implementação do esqueleto da aplicação (O POC para validar a viabilidade da sua solução proposta)
- [ ] Cobertura de testes e documentação, mostrando entendimento das funcionalidades desenvolvidas

> Nota do Wells: Só repetindo pra ficar claro: **Não precisa** "enviar um e-mail" de verdade, nem "integrar um gateway de pagamentos pra comprar o crédito", é só propor uma estrutura interessante e implementar ela usando os conceitos vistos em aula :) - afinal essa é a parte difícil da parada hehehe "fazer" a gente sabe, mas e "fazer bem feito"?

## Requisitos do desafio

- [x] Entendimento dos requisitos e implementação da solução
- [x] Uso de **no mínimo 6** dos Design Patterns mencionados
- [ ] Documentação de quais Design Patterns decidiu usar e por quê no arquivo `ARCHITECTURE.md`
- [ ] Testes Unitários e **100% de Code Coverage**
- [x] (opcional) Uso de TDD do início ao fim do projeto

> Dica do Wells: lembre-se de conferir os **projetos feitos em aula durante o módulo 07** para ter uma idéia do que usar :)

### Arquitetura e onde trabalhar

```
project
│   README.md
│   ARCHITECTURE.md
│   package.json
│
│   // QUE OS JOGOS COMECEM
.
.
.
```

> Nota do Wells: Cê achou mesmo que ia ter um guia de arquitetura no desafio de arquitetura? 😆

## Submissão

1. Crie um fork deste repositório e modifique o README.md inserindo o seu nome no início do arquivo.

2. Implemente sua solução usando a arquitetura desejada.

3. Documente suas decisões no arquivo `ARCHITECTURE.md`.

4. Suba suas alterações no repo que você fez o fork.

5. Envie o link no canal `#desafios-jsexpert` da nossa comunidade no discord.

## Até quando?

Se você está pegando esse desafio na estréia, corre lá e envia pra gente até _Quarta-feira, 10 de agosto de 2022 (10/08/2022)_!
