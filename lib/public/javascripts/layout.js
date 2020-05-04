// $(window).on('scroll', function() {
//     if ($(window).scrollTop()) {
//         $('header').addClass('squish');
//     } else {
//         $('header').removeClass('squish');
//     }
// });

$(window).on('scroll', function() {
    if ($(window).scrollTop()) {
        $('header').addClass('squish');
        $('#nibbles').addClass('squish');
    } else {
        $('header').removeClass('squish');
        $('#nibbles').removeClass('squish');
    }
});

// $(window).on('scroll', function() {
//     if ($(window).scrollTop()) {
//         $('header').addClass('squish');
//         $('#nibbles').addClass('squish');
//         $('#siteTitle').removeClass('mr-n5');
//         $('#siteTitle').removeClass('ml-5');
//         $('#nibbles').addClass('ml-2');
//     } else {
//         $('header').removeClass('squish');
//         $('#nibbles').removeClass('squish');
//         $('#siteTitle').addClass('ml-5');
//         $('#siteTitle').addClass('mr-n5');
//         $('#nibbles').removeClass('ml-2');
//     }
// });

$(document).ready(function() {
    $('form input').keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });    
});