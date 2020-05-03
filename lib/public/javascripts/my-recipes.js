$(document).ready(function() {
    $('#createRecipe').hover(
        function() {
            $(this).toggleClass('far');
            $(this).toggleClass('fas');
        },
        function() {
            $(this).toggleClass('far');
            $(this).toggleClass('fas');
        }
    );

});