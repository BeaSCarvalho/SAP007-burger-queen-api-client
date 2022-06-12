<div align="center">
   <img alt="Logo Burger Queen" src="/src/imgs/logo-burger-queen.png">
  
**Deploy:** https://sap-007-burger-queen-api-client-beascarvalho.vercel.app/
</div>

## ÍNDICE

* [1. Sobre o Projeto](#1-sobre-o-projeto)
* [2. Histórias de Usuários](#2-histórias-de-usuários)
* [3. Definição de Pronto](#3-definição-de-pronto)
* [4. Protótipo](#4-protótipo)
* [5. Tecnologias Utilizadas](#5-tecnologias-utilizadas)
* [6. Autora](#6-autora)

***

## 1. SOBRE O PROJETO

Projeto desenvolvido para um restaurante de hambúrgueres em crescimento que, após abrir o serviço 24 horas, percebeu a necessidade de um sistema que ajude a receber os pedidos dos clientes.

>O restaurante Burger Queen possui dois menus. Um simples para o café da manhã:
>
>| Ítem                      |Preço R$|
>|---------------------------|------|
>| Café americano            |    5 |
>| Café com leite            |    7 |
>| Sanduíche de presunto e queijo|   10 |
>| Suco de fruta natural     |    7 |
>
>E outro menu para o resto do dia:
>
>| Ítem                      |Preço |
>|---------------------------|------|
>|**Hambúrgueres**           |   **R$**   |
>|Hambúrguer simples         |    10|
>|Hambúrguer duplo           |    15|
>|**Acompanhamentos**        |   **R$**   |
>|Batata frita               |     5|
>|Anéis de cebola            |     5|
>|**Bebidas**                |   **R$**   |
>|Água 500ml                 |     5|
>|Água 750ml                 |     7|
>|Bebida gaseificada 500ml   |     7|
>|Bebida gaseificada 750ml   |    10|
>
>Os clientes podem escolher entre hambúrgueres de carne bovina, frango ou vegetariano. Além disso, por um adicional de R$ 1,00 , eles podem adicionar queijo ou ovo.

### ACESSO

Email e senha de contas já cadastradas para utilizar a aplicação.
- Atendimento - Email: atendente@bq.com Senha: 123456
- Cozinha - Email: cozinha@bq.com Senha: 123456

## 2. HISTÓRIAS DE USUÁRIOS

### História de usuário 1
>"Eu, como garçom/garçonete quero entrar no sistema de pedidos."<br><br>
Para isso, o usuário precisa acessar uma tela de login em que seja possível inserir um email e senha, receber mensagens de erro conforme as informações inseridas ou caso falte alguma delas e entrar no sistema de pedidos com as credenciais corretas 
<br>

### História de usuário 2
>"Eu como garçom/garçonete quero poder anotar o pedido de um cliente para não depender da minha memória, saber quanto cobrar e poder enviar os pedidos para a cozinha para serem preparados em ordem."<br><br>
Na tela de atendimento o usuário poderá anotar o nome do cliente e o número de sua mesa, adicionar os produtos ao pedido, excluir produtos, ver o valor total do pedido e enviá-lo para a cozinha. Os produtos no cardápio estarão separados em quatro categorias: Café da manhã, Lanches, porções e bebidas. Dentro da categoria 'Lanches' há uma divisão por lanches de frango, carne e vegetariano.
<br>

### História de usuário 3
>"Eu como chefe de cozinha quero ver os pedidos dos clientes em ordem, poder marcar que estão prontos e poder notificar os garçons/garçonetes que o pedido está pronto para ser entregue ao cliente."<br><br>
O cozinheiro, ao fazer login com sua conta, poderá ver os pedidos que estão pendentes e que estão sendo preparados. Ao receber um pedido clicará em um botão para atualizar ao garçom que o pedido está sendo preparado. Ao clicar novamente no botão, o status do pedido passa para 'Pronto para Servir', mostra o tempo que levou para a cozinha preparar e sai da tela do cozinheiro.
<br>

### História de usuário 4
>"Eu como garçom/garçonete quero ver os pedidos que estão prontos para entregá-los rapidamente aos clientes."<br><br>
Garçom/garçonete poderá visualizar uma tela que mostra apenas os pedidos prontos para servir. Ao clicar no botão, o status do pedido passará para 'Entregue' e marcará  o tempo que levou para ser entregue na mesa correspondente. 
<br>

## 3. DEFINIÇÃO DE PRONTO 
- Ser uma SPA (Single Page Application).
- Ter recebido code review de pelo menos uma parceira.
- Fazer testes unitários e, além disso, testar o produto manualmente.
- Fazer testes de usabilidade e incorporar o feedback do usuário.
- Funcionar bem em um tablet.

## 4. PROTÓTIPO

Prototipo desenvolvido no Figma.

<img alt="Protótipo do Projeto" src="/src/imgs/Frame 8.png" width=800>

### *Paleta de Cores*

<img alt="Paleta de Cores" src="/src/imgs/palet.png" width=800>

## 5. TECNOLOGIAS UTILIZADAS

- **React.JS**
- **CSS3**
- **HTML5**
- **GitHub**
- **Visual Studio Code**
- Planejamento: **[Trello](https://trello.com/b/IUBQZnI0/projeto-burger-queen)**
- Protótipos: **[Figma](https://www.figma.com/)**
- Edições de imagem: **[Canva](https://www.canva.com/)**
- Paleta de cores: **[Adobe Color](https://color.adobe.com/pt/create/color-wheel)**

## 6. AUTORA

<table>
  <td>
    <div align= "center">
      <img alt="Beatriz de Sousa Carvalho" height="150" src="https://avatars.githubusercontent.com/u/99045620?v=4"> 
    </div>
    <h3 align="center"><a href="https://github.com/BeaSCarvalho">Beatriz de Sousa Carvalho</a></h3>
    <h4 align="center">Projeto do Bootcamp da <em><a href="https://hub.laboratoria.la/br">Laboratoria</a></em></h4>
    <div align="center">
       <a href = "mailto:beaproscarva@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>
      <a href="https://www.linkedin.com/in/beatriz-de-sousa-carvalho/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
    </div>
  </td>
</table>  
