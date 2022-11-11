[gitmd]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

# Documentação da arquitetura do projeto

Aqui você deverá documentar quais decisões técnicas tomou no decorrer do projeto, explicando quais design patterns escolheu em cada cenário e por quê.

Arquitetura N-Tiers: Em construção. As responsabilidades até o momento estão separadas em repositories e use cases.

Singleton: Aplicado nos repositories para que eles retornem a mesma instância já criada anteriormente. Com isso, partes diferentes do projeto irão utilizar a mesma fonte de dados toda vez que o repositório for instanciado.

Test Data Builder com Mother Objects: Aplicado nos testes para padronizar os dados utilizados e melhorar a semântica do fluxo de teste.

Fluent API: Apesar de não haver no momento uma fluent api construída por mim, a fluent api de expect do jest é utilizada nos testes.

Factory: Factories foram usadas nos testes unitários dos use cases para gerar os objetos de use cases. Para gerar um objeto de use case é necessário construir as instâncias das dependências e injetá-las no use case.

Dependency Injection: Técnica utilizada nos use cases para diminuir o acoplamento, aumentar a coesão e facilitar a construção dos testes unitários.

> Nota do Wells: Se precisar de qualquer ajuda com a formatação desse arquivo MARKDOWN (.md) aqui, dá uma olhada na [documentação oficial do GitHub][gitmd] pra isso que pode ajudar :)
