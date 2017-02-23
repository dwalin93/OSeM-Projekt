/**
 * Created by pglah on 19.12.2016.
 */
(function () {
  'use strict';

  angular.module('openSenseMapApp')
    .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$location', '$translate', 'authentication'];

  function logoutCtrl($location, authentication) {
    console.log('tata');
    var vm = this;

    vm.onSubmit = function () {
      authentication
        .logout(vm.credentials)
        .error(function (err) {
          alert(err);
        })
        .then(function () {
          $location.path('/logout');
        });
    };
  };
});

