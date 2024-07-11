/**
* Objeto para armazenar o response da api de busca.
*/
class FoodInformation {
    constructor(id, name, image, calories) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.calories = calories;
    }
}


/**
 *  Variáveis de acesso a API externa.
 */

const baseUrl = 'https://api.spoonacular.com';
const apiKey = 'YOUR_API_KEY';

const food = document.getElementById('food');
const mealList = document.getElementById('meal');

var foodList = [];

/**
* Verifica se foi digitado um campo no input de busca e se sim incia a requisição com o valor digitado.
*/

const getSearchInput = () => {
    let searchInput = document.getElementById('search-input').value;

    if (searchInput === '') {
        alert("Digite o nome do alimento.")
    } else {
        getFood(searchInput)
    }
}

/**
 * Requisição GET para buscar os items na api externa Spoonacular
 * @param {String} searchInput Valor digitado.
 */

const getFood = async (searchInput) => {
    fetch(`${baseUrl}/food/ingredients/search?apiKey=${apiKey}&query=${searchInput}&number=5`, {
        method: 'get'
    })
        .then((response) => response.json())
        .then((data) => {
            data.results.forEach(item => getFoodInfo(item));
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Não foi encontrado o alimento!')
        });
}

/**
* Executa a segunda na api externa a partir do ID do item buscado. Essa api é a que contém o objeto com as informações dos alimentos.
*/
/**
 * Requisição GET para buscar na api externa a partir do ID do item buscado. Essa api é a que contém o objeto com as informações dos alimentos.
 * @param {Object} data (id, name, image)
 */
const getFoodInfo = async (data) => {
    fetch(`${baseUrl}/food/ingredients/${data.id}/information?amount=1&apiKey=${apiKey}`, {
        method: 'get'
    })
        .then((response) => response.json())
        .then((data) => {
            responseData = data;

            //Criando uma lista local com os items da api para manipulações futuras.
            foodList.push(new FoodInformation(responseData.id, responseData.name, responseData.image, responseData.nutrition.nutrients[0].amount));
            console.log('Lista:', foodList)
            insertIntoList(data)
        })
}


/**
*  Função para criar os campos dinamicamentes no HTML
*/

const insertIntoList = (data) => {
    var foodId = data.id;
    var foodName = data.name;
    var foodImage = data.image;
    var foodCalories = data.nutrition.nutrients[0].amount;

    // Criaando a div principal
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.width = '18rem';

    // Criando o elemento de imagem
    var img = document.createElement('img');
    img.src = `https://img.spoonacular.com/ingredients_100x100/${foodImage}`;
    img.className = 'card-img-top';

    // Fazendo o append da img
    cardDiv.appendChild(img);

    // Criando a div card
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Criando o card title h5
    var cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = foodName;

    cardBody.appendChild(cardTitle);

    var cardDescription = document.createElement('p');
    cardDescription.className = 'card-text';
    cardDescription.textContent = `Calorias: ${foodCalories}`

    cardBody.appendChild(cardDescription);

    // Criando o button Adicionar
    var button = document.createElement('button');
    button.href = '#';
    button.className = 'btn btn-dark btn-sm';
    button.textContent = 'Adicionar';


    // Fazendo o append do buttom
    cardBody.appendChild(button);

    // Fazendo o append do cardBody no cardDiv
    cardDiv.appendChild(cardBody);

    document.getElementById('containerResult').appendChild(cardDiv);

    // Função para o click do botão adicionar.
    buttonClick()
}


/**
*  Função para pergar o valor do item selecionado e fazer uma busca na lista local para separar o objeto que será adicionado no banco.
*/
const buttonClick = () => {
    let addBtn = document.getElementsByClassName("btn btn-dark btn-sm");

    let i;
    for (i = 0; i < addBtn.length; i++) {
        addBtn[i].onclick = function () {

            let div = this.parentElement.parentElement;
            const itemName = div.getElementsByTagName('h5')[0].innerHTML


            let itemSelected = foodList.find(food => food.name === itemName)
            postItem(itemSelected.name, itemSelected.image, itemSelected.calories)

            alert('Item adicionado!')
        }
    }
}

/**
 * Requisição POST para adicionar um alimento no banco.
 * @param {String} name Nome do alimento.
 * @param {String} foodImage Url da imagem
 * @param {String} foodCalories Quantidade de calorias.
 */
const postItem = (foodName, foodImage, foodCalories) => {

    const formData = new FormData();
    formData.append('name', foodName);
    formData.append('image', foodImage);
    formData.append('calories', foodCalories);
    formData.append('quantity', 1);

    let url = 'http://localhost:5001/create';
    fetch(url, {
        method: "post",
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}