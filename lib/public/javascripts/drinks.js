$('document').ready(function(){
  $(h1).click(function() {
    console.log('test');
  });
  $.ajax({
    type: "GET",
    url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
    dataType: "json"
  }).done(function(data, status) {
       console.log(data);
  }).fail(function(err) {
      console.log(err);
  });
});