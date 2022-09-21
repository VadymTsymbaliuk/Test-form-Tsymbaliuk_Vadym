
$(".form").validate({
    rules: {
        email: {
            required: true,
            email: true,
        },
        password: {
            required: true,
            minlength: 8
        }
    }, messages: {
        email: {
            required: "We need your email address to contact you",
            email: "Your email address must be in the format of name@domain.com"
        },
        password: {
            required: "Please enter your password",
            minlength: "minimal length 8",
            maxlength: "max length 16"
        }
    },
    focusInvalid: true,
    errorClass: "input-error",
    submitHandler: function () {
        console.log(document.querySelector(".form-row__input-email").value)
        console.log(document.querySelector(".form-row__input-password").value)
        document.querySelector(".form-row__input-email").value = "";
        document.querySelector(".form-row__input-password").value = "";
    }
})