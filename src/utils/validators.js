export function validatePan(pan) {
    let regPan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    if (regPan.test(pan)) {
        return true;
        // valid pan card number
    } else {
        return false;
        // invalid pan card number
    }
}

export function validateEmail(email) {
    let regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;;

    if (regEmail.test(email)) {
        return true;
    } else {
        return false;
    }
}


export function validateMobile(mobile) {
    let regMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/;


    if (regMobile.test(mobile)) {
        return true;
    } else {
        return false;
    }
}
