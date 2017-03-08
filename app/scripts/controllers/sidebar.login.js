(function () {
'use strict';

angular.module('openSenseMapApp')
.controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
document.getElementById('profile').style.display='none'

  function loginCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      username : "",
      password : ""
    };

    vm.onSubmit = function () {
      authentication
        .login(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('/loginsuccess');
           document.getElementById('navlogin').style.display='none'
           document.getElementById('profile').style.display='block'

        });
    };

  }
})();
