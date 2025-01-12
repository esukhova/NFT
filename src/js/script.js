$(document).ready(() => {
    let menu = $('#menu');
    let logo = $('#logo');
    let menu_links = $('.menu__link');
    let blur = $('.blur');
    let modal = $('#modal');
    let modal_close = $('#modal-close');
    let submit = $('#submit');
    let email = $('#email');
    let loader = $('.loader');
    let hasError = false;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

    $('#burger-container').click(function () {
        menu.toggleClass('menu_open');
        logo.toggleClass('logo_into_menu');
        blur.toggleClass('blurring');
    });
    for (let i = 0; i < menu_links.length; i++) {
        menu_links.eq(i).click(function () {
            menu.removeClass('menu_open');
            logo.removeClass('logo_into_menu');
            blur.removeClass('blurring');
        });
    }

    $('#main-btn, #account').click(function () {
        modal.addClass('visible');
        blur.addClass('blurring');
        menu.removeClass('menu_open');
    });
    $('#main-btn').click(function () {
        modal.addClass('visible');
        blur.addClass('blurring');
    });

    modal_close.click(function () {
        modal.removeClass('visible');
        blur.removeClass('blurring');
        modal_close.toggleClass('rotate');
    });



    if (!email.val()) {
        submit.attr('disabled', 'true');
    }

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }

   email.change(function () {
       if (isEmailValid(email.val())) {
           submit.removeAttr('disabled');
           email.css('border-color', 'transparent');
           hasError = false;
       }
   })

    submit.click(function () {
        if (isEmailValid(email.val())) {
            email.css('border-color', 'transparent  ');
            hasError = false;
        } else {
            hasError = true;
            submit.attr('disabled', 'true');
            email.css('border-color', 'red');
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: 'POST',
                url: '',
                data: {email: email.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        email.val('');
                    } else {
                        alert('Возникла ошибка при отправке запроса на сервер. Пожалуйста, попробуйте позже.')
                    }
                })
        }
    });
});