$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
    dataType: "json"
  }).done(function(data, status) {
      console.log(data);
      $('.container').append('<div class="row"><div class="col-lg-5" id="drinkImg"></div></div>')
      $('.row').append('<h1>' + data.drinks[0].strDrink + '</h1>');
  }).fail(function(err) {
      console.log(err);
  });
});