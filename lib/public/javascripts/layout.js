$(window).on('scroll', function() {
    if ($(window).scrollTop()) {
        $('header').addClass('squish');
    } else {
        $('header').removeClass('squish');
    }
});

$(document).ready(function() {
    $('form input').keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });    
});