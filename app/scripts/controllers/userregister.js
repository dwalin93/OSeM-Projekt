(function () {
'use strict';

angular.module('openSenseMapApp')
  .controller('userregisterCtrl',userregisterCtrl);

  userregisterCtrl.$inject = ['$location', 'authentication'];

  function userregisterCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      firstname : "",
      lastname : "",
      email : "",
      username : "",
      password : "",
      password2: ""
    };

    vm.onSubmit = function () {
      if (vm.credentials.password !== vm.credentials.password2) {
        alert("Passwörter stimmen nicht überein! bitte erneut eingeben");
      } else {
        console.log('Submitting registration');
        authentication
          .register(vm.credentials)
          .error(function (err) {
            alert(err);
          })
          .then(function () {
            $location.path('/loginsuccess');
            document.getElementById('navlogin').style.display = 'none'
            document.getElementById('profile').style.display = 'block'
          });
      }
      ;
    }
  }
})();
