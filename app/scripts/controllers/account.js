(function() {

  angular
    .module('openSenseMapApp')
    .controller('accountCtrl', accountCtrl);

  accountCtrl.$inject = ['$location', 'authentication','meanData', 'userService', '$scope', '$rootScope', '$document', '$http'];
  function accountCtrl($location,authentication,meanData, userService, $scope, $rootScope, $document, $http) {
      var vm = this;
      vm.user = {};
      var today= Date();
      
      vm.isLoggedIn = authentication.isLoggedIn();
      
      meanData.getProfile()
      .success(function(data) {
        vm.user = data;
        vm.user.registrDate2 = vm.user.registrDate;
        vm.user.registrDate = meanData.renderDate(vm.user.registrDate);
        vm.today = meanData.renderDate(today);
        vm.user.points=vm.user.points;

        if (vm.user.birthday != ""){
          vm.birthday2 = meanData.renderDate2(vm.user.birthday)
          vm.user.birthday = meanData.renderDate(vm.user.birthday)

        }
          vm.AnzahlTage = Math.floor((new Date(today) - new Date(vm.user.registrDate2)) / 86400000);
          vm.AnzahlStunden = Math.floor((new Date(today) - new Date(vm.user.registrDate2)) / 3600000);
          vm.AnzahlJahre = (new Date(today).getFullYear() - new Date(vm.user.registrDate2).getFullYear());
          vm.user.registrDate2 = new Date(meanData.renderDate2(vm.user.registrDate2))
          if (vm.user.registrDate2 > new Date(today))
            vm.AnzahlJahre = vm.AnzahlJahre - 1 ;
      })
        .error(function (e) {
        console.log(e);
      });

      vm.users = {};
    
    meanData.getAllProfiles()
      .success(function (data) {
        vm.users = data;
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
