// Criando url base
const baseUrl = "http://127.0.0.1:5000";

/**
 * Requisição GET para buscar a lista de alimentos
 */
const getList = async () => {
    fetch(`${baseUrl}/foods`, {
        method: 'get'
    })
        .then((response) => response.json())
        .then((data) => {
            data.foods.forEach(item => insertIntoList(
                item.id,
                item.name,
                item.image,
                item.quantity,
                item.calories
            ))
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
}

/**
 * Requisição GET para buscar total de calorias.
 */
const getTotalCalories = async () => {
    fetch(`${baseUrl}/calories`, {
        method: 'get'
    })
        .then((response) => response.json())
        .then((data) => {
            totalCaloiresInput = document.getElementById("total_calories");
            totalCaloiresInput.innerText = data.total;
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
}

// Função para trazer o carregamento inicial dos dados.
getList()
getTotalCalories()


/**
 * Função para inserir um item na lista.
 */
const insertIntoList = async (itemId, nameFood, image, quantity, calories) => {

    // Cria o elemento de table principal
    var tr = document.createElement('tr');

    // Cria o primeiro item da tabela com um icone
    var th = document.createElement('th');
    th.scope = 'row';
    th.className = 'text-center';

    var icon = document.createElement('i');
    icon.className = 'fa-regular fa-circle-xmark';

    th.appendChild(icon);
    tr.appendChild(th);

    // Cria o segundo item com imagem
    var tdImage = document.createElement('td');
    tdImage.className = 'row-image';

    // Botão de remoção
    var img = document.createElement('img');
    img.src = `https://img.spoonacular.com/ingredients_100x100/${image}`;
    img.className = 'card-img-top';

    tdImage.appendChild(img);
    tr.appendChild(tdImage);

    // Criando o terceiro item com o nome
    var tdTitle = document.createElement('td');
    tdTitle.className = 'text-title';
    tdTitle.textContent = nameFood;

    tr.appendChild(tdTitle);

    // Criando o quarto item com a quantidade e o botão para salvar.
    var tdQuantity = document.createElement('td');
    tdQuantity.className = 'text-quantity';

    // Input de quantidade
    var input = document.createElement('input');
    input.type = 'number';
    input.className = "input_calories";
    input.id = 'quantity';
    input.name = 'quantity';
    input.value = quantity;
    input.min = quantity;

    //Botão de salvar
    var button = document.createElement('button');
    button.className = 'quantity-btn';
    button.role = 'button';
    button.textContent = 'Salvar';

    tdQuantity.appendChild(input);
    tdQuantity.appendChild(button);
    tr.appendChild(tdQuantity);

    // Cria o campo que exibe as calorias.
    var tdCalories = document.createElement('td');
    tdCalories.className = 'text-calories';
    tdCalories.textContent = calories;

    tr.appendChild(tdCalories);

    // Fazendo o append na table no tbody
    document.querySelector('tbody').appendChild(tr);


    // Adiciona um event listener ao botão para obter o valor do input
    button.addEventListener('click', function () {
        var inputValue = input.value;
        console.log('Input value:', inputValue);

        saveChangeClick(itemId, inputValue);
        alert("Atualizado!")
    });
    removeItem();

}

/**
 * Cria uma requisição PUT para enviar os novos dados para editar o alimento no servidor.
 * 
 * @param {Int} id id do livro
 * @param {String} name Nome do livro
 */
const saveChangeClick = async (id, quantity) => {

    const formData = new FormData();
    formData.append('id', id);
    formData.append('quantity', quantity);

    fetch(`${baseUrl}/update`, {
        method: 'put',
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}

/**
 * Função para remover um item na lista.
 */
const removeItem = async () => {
    let deleteBtn = document.getElementsByClassName("fa-regular fa-circle-xmark");
    let i;

    for (i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].onclick = function () {
            let div = this.parentElement.parentElement;

            const itemName = div.getElementsByTagName('td')[1].innerHTML
            console.log("Item a ser deletado: ", itemName)

            // Condição para exibir um alerta para confirmar a deleção do item.
            if (confirm("Você tem certeza?")) {
                div.remove()

                // Chama função para deletar item.
                deleteItem(itemName)
                alert("Removido!")
            }
        }
    }
}

/**
 * Cria uma requisição de delete para deletar o item do banco de dados.
 * 
 * @param {int} item nome do livro
 */
const deleteItem = (item) => {
    let url = 'http://127.0.0.1:5000/delete?name=' + item;
    fetch(url, {
        method: 'delete'
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}