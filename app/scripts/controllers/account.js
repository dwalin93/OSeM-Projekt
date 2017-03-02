(function() {

  angular
    .module('openSenseMapApp')
    .controller('accountCtrl', accountCtrl);

  accountCtrl.$inject = ['$location', 'meanData', 'userService', '$scope', '$rootScope', '$document', '$http'];
  function accountCtrl($location, meanData, userService, $scope, $rootScope, $document, $http) {
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .success(function(data) {
        var a ='true'
        vm.user = data;
        vm.user.registrDate = meanData.renderDate(vm.user.registrDate)
        if (vm.user.birthday != ""){
          vm.user.birthday = meanData.renderDate(vm.user.birthday)
        }
      })
      .error(function (e) {
        console.log(e);
      });

    $scope.flowFileAdded = function (file) {
      if ((file.getExtension().toLowerCase() === 'jpg' || file.getExtension().toLowerCase() === 'png' || file.getExtension().toLowerCase() === 'jpeg') && file.size < 512000) {
        return true;
      } else {
        return false;
      }
    };
  }
})();
