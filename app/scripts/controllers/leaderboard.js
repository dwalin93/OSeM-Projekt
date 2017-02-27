(function () {
  'use strict';

  angular.module('openSenseMapApp')
    .controller('leaderboardCtrl',leaderboardCtrl);

  leaderboardCtrl.$inject = ['$location', 'meanData', 'userService'];

  function leaderboardCtrl($location, meanData, userService) {
    var vm = this;

    vm.users = {};
    vm.user = {};

    meanData.getAllProfiles()
      .success(function (data) {
        vm.users = data;
        console.log(vm.users);
      })
      .error(function (e) {
        console.log(e);
      });

    meanData.getProfile()
      .success(function (data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });

  }
})();
