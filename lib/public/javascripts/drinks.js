$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
    dataType: "json"
  }).done(function(data, status) {
      console.log(data.drinks[0]);
      $('.container').append('<h1>Find A Random Drink</h1><div class="row"><div class="col-lg-5" id="drinkImg"></div><div class="col-lg-7" id="drinkTitleTags"></div></div>');
      $('#drinkImg').append('<img class="mb-3" style="max-width:100%" src="' + data.drinks[0].strDrinkThumb + '">');
      $('#drinkTitleTags').append('<h1>' + data.drinks[0].strDrink + '</h1>');
      $('#drinkTitleTags').append('<h3 class="text-secondary">Recommended Glass: ' + data.drinks[0].strGlass + '</h3><br>');
      $('#drinkTitleTags').append('<div class="row"><div class="col-md-6"><h6>Ingredients</h6><ul id="ingredientsList"></ul></div><div class="col-md-6" id="instructions"></div></div>');
      $('#instructions').append('<h6>Instructions</h6><p>' + data.drinks[0].strInstructions + '</p>');
      for (let i = 1; i < 16; i++) {
        let ingredientVariable = i.toString();
        let ingredientData = data.drinks[0]['strIngredient' + ingredientVariable];
        let amountData = data.drinks[0]['strMeasure' + ingredientVariable];
        if (ingredientData && amountData) {
          $('#ingredientsList').append('<li>' + amountData + ' ' + ingredientData + '</li>');
        }
        else if (ingredientData) {
          $('#ingredientsList').append('<li>' + ingredientData + '</li>');
        }
      }
  }).fail(function(err) {
      console.log(err);
  });
});