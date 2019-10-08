import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple'


const cancel = new MDCRipple(document.querySelector('.cancel'));
const next = new MDCRipple(document.querySelector('.next'));
const form = document.getElementsByName('shopalystLogin');

class ShopalystLogin {
    constructor() {

    }

    verifyCredentials() {
        const username = new MDCTextField(document.querySelector('.username'));
        const password = new MDCTextField(document.querySelector('.password'));
       /// if (username.value === "shopalyst01" && password.value === "shopalyst01") {
            console.log("Login Successful");
            window.location = "home.html";
           return false;
       // }
      //  else {
            alert("Incorrect credentials");
       // }

        //Redirect

    }

}

let shopalystLogin = new ShopalystLogin();
next.listen("click", shopalystLogin.verifyCredentials);
