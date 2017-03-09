if (window.AL === undefined) { window.AL = {}; }

(function() {
  var createAccount = document.querySelector(".create-account-form");
  var emailValidate = document.querySelector(".email-validate");
  var passwordValidate = document.querySelector(".password-validate");
  var createAccountButton = document.querySelector(".create-account-submit-button");


  var validationError = document.createElement('p');
  validationError.textContent = "Please enter a correctly formatted username and password";
  validationError.classList.add("incomplete-p");
  validationError.style.display = "none";
  createAccount.appendChild(validationError);

  createAccountButton.addEventListener('click', function(evt) {

    emailValidate.classList.remove('incomplete');
    passwordValidate.classList.remove('incomplete');

    if (emailValidate.value === '' && passwordValidate.value !== '') {
      emailValidate.classList.add("incomplete");
      validationError.style.display = 'block';
      evt.preventDefault();
    }
    else if (emailValidate.value !== "" && passwordValidate.value === '') {
      passwordValidate.classList.add('incomplete')
      validationError.style.display = 'block';
      evt.preventDefault();
    }
    else if (emailValidate.value === '' && passwordValidate.value === '') {
      passwordValidate.classList.add('incomplete')
      emailValidate.classList.add("incomplete");
      validationError.style.display = 'block';
      evt.preventDefault();
    }
  });



})();
