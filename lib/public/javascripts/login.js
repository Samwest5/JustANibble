$('document').ready(function(){
    $('#username').on('blur', function() {
        let username = $('#username').val();
        if (username == '') {
            $('#usernameFeedback').html('Please enter a username.');
            $('#username').addClass('is-invalid');
            $('#register').attr('disabled', true);
            $('#login').attr('disabled', true);
            return;
        }
        else {
            $('#username').removeClass('is-invalid');
            $('#register').attr('disabled', false);
            $('#login').attr('disabled', false);
        }
    });

    $('#register').click(function() {
        $('form').submit(function (e) {
            e.preventDefault();
        });
        // let username = $('#username').val();
        // let password = $('#password').val();
        // if (password == '') {
        //     $('#passwordFeedback').html('Please enter a password.');
        //     $('#password').addClass('is-invalid');
        //     $("form").submit(function(e){
        //         e.preventDefault();
        //     });
        //     return;
        // }
        /* check username */
        $.ajax({
            url: '/auth/register',
            type: 'POST',
            data: {
                'username' : username,
                'password' : password
            },
            success: function(result, error) {
                console.log(result);
                if (error) {

                }
            }
        });
        $('form').submit(function (e) {
            e.preventDefault();
        });
        // if (password.length < 8) {
        //     $('#password').addClass('is-invalid');
        //     $('#passwordFeedback').html('Does not have enough characters.')
        //     $("form").submit(function(e){
        //         e.preventDefault();
        //     });
        // }
        // else {
        //     $('#password').removeClass('is-invalid');
        //     $("form").attr('action', '/auth/register');
        //     $('form').submit();
        //     console.log('submitted!');
        //     $.ajax({
        //         url: '/auth/logout',
        //         type: 'POST',

        //     })
        // }
    });

    $('#login').click(function() {
        $('form').submit();
    });

    // $('#logout').click(function() {
    //     $.ajax({
    //         url: '/auth/logout',
    //         type:'POST',
    //         success: function(response) {

    //         }
    //     });
        // $.ajax({
        //     url: 'register.php',
        //     type: 'post',
        //     data: {
        //         'email_check' : 1,
        //         'email' : email,
        //     },
        //     success: function(response){
        //         if (response == 'taken' ) {
        //         email_state = false;
        //         $('#email').parent().removeClass();
        //         $('#email').parent().addClass("form_error");
        //         $('#email').siblings("span").text('Sorry... Email already taken');
        //         }else if (response == 'not_taken') {
        //         email_state = true;
        //         $('#email').parent().removeClass();
        //         $('#email').parent().addClass("form_success");
        //         $('#email').siblings("span").text('Email available');
        //         }
        //     }
        // });
    });
});