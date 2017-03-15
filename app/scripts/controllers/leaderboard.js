(function () {
  'use strict';

  angular.module('openSenseMapApp')
    .controller('leaderboardCtrl',leaderboardCtrl);

  leaderboardCtrl.$inject = ['$location', 'meanData', 'userService', '$scope'];

  function leaderboardCtrl($location, meanData, userService, $scope) {
    var vm = this;

    vm.users = {};
    vm.user = {};
    vm.boxes = {};

    meanData.getAllProfiles()
      .success(function (data) {
        vm.users = data;
        console.log(vm.users);
      })
      .error(function (e) {
        console.log(e);
      });

    meanData.getAllProfilesBox()
      .success(function (data) {
        vm.boxes = data;
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
    $scope.myFunction = function(uid){
      userService.setID(uid);
      $location.path('/publicProfile');
    }

  }
})();
