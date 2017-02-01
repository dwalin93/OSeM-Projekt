(function () {
  'use strict';

  angular.module('openSenseMapApp')
    .controller('loginsuccessCtrl',loginsuccessCtrl);

  loginsuccessCtrl.$inject = ['$location', 'meanData'];

  function loginsuccessCtrl($location, meanData) {
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
    })
      .error(function (err) {
        alert(err);
      });
  }

})();
