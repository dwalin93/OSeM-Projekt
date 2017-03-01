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
        vm.user = data;
        vm.user.registrDate = renderDate(vm.user.registrDate);
        if (vm.user.birthday != ""){
          vm.user.birthday = renderDate(vm.user.birthday);
        }
      })
      .error(function (e) {
        console.log(e);
      });

    function renderDate(date){
      var rightDate = new Date(date);
      var day = rightDate.getDate();
      var month = rightDate.getMonth()+1;
      var year = rightDate.getUTCFullYear();
      var correctDate = day +'.'+ month +'.'+ year;
      return correctDate;
    }

    $scope.flowFileAdded = function (file) {
      if ((file.getExtension().toLowerCase() === 'jpg' || file.getExtension().toLowerCase() === 'png' || file.getExtension().toLowerCase() === 'jpeg') && file.size < 512000) {
        return true;
      } else {
        return false;
      }
    };
  }
})();
