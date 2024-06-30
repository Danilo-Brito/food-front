/**
 *  Variáveis de acesso a API externa.
 */

const baseUrl = 'https://api.spoonacular.com';
const apiKey = 'dc82011ca20a4c4286afa195d15614f3';

const food = document.getElementById('food');
const mealList = document.getElementById('meal');

var foods = [];

const getSearchInput = () => {
    let searchInput = document.getElementById('search-input').value;

    if (searchInput === '') {
        alert("Digite o nome do alimento.")
    } else {
        getFood(searchInput)
    }
}

const getFood = async (searchInput) => {
    fetch(`${baseUrl}/food/ingredients/search?apiKey=${apiKey}&query=${searchInput}&number=5`, {
        method: 'get'
    })
        .then((response) => response.json())
        .then((data) => {
            data.results.forEach(item => getFoodInfo(item))
            // console.log('Response:', data)
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Não foi encontrado o alimento!')
        });
}

const getFoodInfo = async (data) => {
    fetch(`${baseUrl}/food/ingredients/${data.id}/information?amount=1&apiKey=${apiKey}`, {
        method: 'get'
    })
        .then((response) => response.json())
        .then((data) => {
            responseData = data;
            console.log('Response:', data)

            // data.forEach(item => insertIntoList(item))
            insertIntoList(data)
        })
}


const insertIntoList = (data) => {
    var id = data.id;
    var name = data.name;
    var image = data.image;
    var description = data.nutrition.nutrients[0].amount;

    // Create the main card div
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.width = '18rem';

    // Create the img element
    var img = document.createElement('img');
    img.src = `https://img.spoonacular.com/ingredients_250x250/${image}`;
    img.className = 'card-img-top';

    // Append the img to the card div
    cardDiv.appendChild(img);

    // Create the card body div
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create the card title h5
    var cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = name;

    cardBody.appendChild(cardTitle);

    var cardDescription = document.createElement('p');
    cardDescription.className = 'card-text';
    cardDescription.textContent = `Calorias: ${description}`

    cardBody.appendChild(cardDescription);

    // Create the button
    var button = document.createElement('button');
    button.href = '#';
    button.className = 'btn btn-dark btn-sm';
    button.textContent = 'Adicionar';

    // Append the button to the card body
    cardBody.appendChild(button);

    // Append the card body to the card div
    cardDiv.appendChild(cardBody);

    document.getElementById('containerResult').appendChild(cardDiv);
}