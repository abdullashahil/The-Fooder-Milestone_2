const seachbutton = document.querySelector('.button');

const api_random = "https://www.themealdb.com/api/json/v1/1/random.php";
const randomMealText = document.querySelector('#recommended-meal-title');







// const ingredientList = document.querySelector('.ingredient-list')
const viewIngredients = document.querySelectorAll('.recommended-meal-ingredients');
const modalContainer = document.querySelector('.modal-container');
const closeButton = document.querySelector('.close');
const modalTitle = document.querySelector('.modal-title');
const modalImage = document.querySelector('.modal-img');

viewIngredients.forEach(function (viewIngredients) {
    viewIngredients.addEventListener('click', () => {
        modalContainer.classList.add('show');
    });

});

closeButton.addEventListener('click', () => {
    modalContainer.classList.remove('show');
});


// FETCHING AND GENERATING USER SEARCH RESULTS

seachbutton.addEventListener('click', () => {
    console.log('hello')
    const userInput = document.querySelector('input').value
    const resultContainer = document.querySelector('.results');
    const resultText = document.querySelector('.search-result');
    var api_category = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + userInput;
    console.log(api_category)

    resultText.style.display = 'block'
    resultContainer.style.display = 'grid'


    function generateSearchResults(data) {

        const resultImageContainers = document.querySelectorAll('.resultimg')
        const resultMealNames = document.querySelectorAll('.result-title')


        for (let i = 0; i < 6; i++) {
            // console.log('test')

            data.meals.slice(0, 12).forEach((element, i) => {
                resultImageContainers[i].style.backgroundImage = `url(${element.strMealThumb})`;
                resultMealNames[i].innerHTML = `${element.strMeal}`

                // modalImage[i].style.backgroundImage = `url(${element.strMealThumb})`;
                // modalTitle[i].innerHTML = `${element.strMeal}`

            });
        }

    }


    fetch(api_category)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("Result is: ", data);
            generateSearchResults(data);
        })

})


// FETCHING AND GENERATING RANDOM MEALS

function generateRandomMeal(data) {
    const randomImageBox = document.querySelector('.recommended-img-div')

    data.meals.forEach(element => {
        randomMealText.innerHTML = `${element.strMeal}`
        randomImageBox.style.backgroundImage = `url(${element.strMealThumb})`
    });
    console.log(data.meals)


}


fetch(api_random)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log('data:', data)
        generateRandomMeal(data)
        // randomMealText.innerHTML= this.data.meals.strMeal
    })


