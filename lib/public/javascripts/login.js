$('#register').click(function() {
    let password = $('#password').val();
    let passwordLength = password.length;
    console.log("Password: " + password);
    console.log("Length: " + passwordLength);
    if (passwordLength < 8) {
        $('#password').addClass("is-invalid");
        $("form").submit(function(e){
            e.preventDefault();
        });
    }
    else {
        $('#password').removeClass('is-invalid');
        $("form").attr('action', '/auth/register');
        $('form').submit();
    }
});

$('#login').click(function() {
    $('form').submit();
});