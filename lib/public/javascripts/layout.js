$(window).on('scroll', function() {
    if ($(window).scrollTop()) {
        $('header').addClass('squish');
    } else {
        $('header').removeClass('squish');
    }
});

$(document).ready(function() {
    $('#logout').click(function() {
        $.ajax({
            url: '/auth/logout',
            type:'POST',
            success: function(response) {
    
            }
        });
    });
});