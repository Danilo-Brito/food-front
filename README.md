<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="resources/lojinha.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Calculadora de Calorias - Front</h3>

  <p align="center">
   Projeto MVP - Sprint: Arquitetura de Software
</div>

## Sobre o Projeto

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Este projeto tem como objetivo consultar os alimentos em uma api externa e fazer a adição e calculos das calorias dos alimentos selecionados

Nesta API você ira conseguir fazer as seguintes ações:

* Adicionar um alimento
* Editar a quantidade de um alimento
* Deletar um alimento
* Listar todos os alimento


## Como Executar

### Installation

1. Faça o clone do reposítorio.
   ```sh
   git clone https://github.com/Danilo-Brito/food-front.git
   ```
2. Siga os passos para a execução da api e criação do banco de dados na doc: https://github.com/Danilo-Brito/food-api
3. Execute o arquivo index.html no seu browser.

---

## Execução via docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal.
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t food-front . 
```

Depois execute o comando para criar a imagem

```
$ docker run -p 53018:80 food-front 
```

Uma vez executando, para acessar a API, basta abrir o [http://localhost:53018/index.html](http://localhost:53018/index.html) no navegador.
---

<!-- CONTACT -->
## Contact

Danilo Brito - danilomelo.brito19@gmail.com

Project Link: https://github.com/Danilo-Brito/food-front.git

[product-screenshot]: resources/application.png
