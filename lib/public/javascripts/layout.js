$(window).on('scroll', function() {
    if ($(window).scrollTop()) {
        $('header').addClass('squish');
    } else {
        $('header').removeClass('squish');
    }
});