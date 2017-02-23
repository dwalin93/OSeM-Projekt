(function() {
  'use strict';

  angular
    .module('openSenseMapApp')
    .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$location', '$translate', 'authentication', 'meanData', 'userService'];
  function logoutCtrl($location, authentication, meanData, $translate, userService) {
    console.log('tata');
    var vm = this;

    vm.user = {};                     // FUNKTIONIERT NICHT!!!!

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
        var xyz = authentication.getToken();
        authentication.deleteToken(xyz);
      })
      .error(function (e) {
        console.log(e);
      });

      authentication
        .logout(vm.user)
        .error(function (err) {
          alert(err);
        })
        .then(function () {
          $location.path('/logout');
        });
    };

})();

