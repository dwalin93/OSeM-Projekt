(function() {

  angular
    .module('openSenseMapApp')
    .controller('publicProfileCtrl', publicProfileCtrl);

  publicProfileCtrl.$inject = ['$location', 'authentication','meanData', 'userService', '$scope', '$rootScope', '$document', '$http'];
  function publicProfileCtrl($location,authentication,meanData, userService, $scope, $rootScope, $document, $http) {
    var vm = this;
    vm.user = {};
    var today= Date();

    var uid = userService.getID();

    userService.getPublicProfile(uid)
      .success(function(data) {
        vm.user = data;
        if(vm.user.image !== ""){
          deliverImage();
        }
        vm.user.registrDate2 = vm.user.registrDate;
        vm.user.registrDate = meanData.renderDate(vm.user.registrDate);
        vm.today = meanData.renderDate(today);
        vm.user.points=vm.user.points;

        if (vm.user.birthday == undefined||vm.user.birthday == null){
          vm.user.birthday=0;
        }
        if (vm.user.info == undefined||vm.user.info == null){
          vm.user.info='';
        }


        if (vm.user.birthday != 0){
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
      .error(function(e){
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


      $scope.myFunction = function(bid){
        $location.path('/explore/'+bid);
      };


      function deliverImage(){
        userService.getImage()
          .success(function (image){
            $scope.fancy = image
          })
          .error(function(error){
            console.log(error)
          })
      };


  }
})();

