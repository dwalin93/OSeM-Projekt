(function () {
  'use strict';

  angular.module('openSenseMapApp')
    .controller('profileCtrl',profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData', 'userService', '$scope'];

  function profileCtrl($location, meanData, userService, $scope) {
    var vm = this;

    vm.user = {};

    vm.saveUser = saveUser;
    vm.deleteUser = deleteUser;
    vm.saveImage = saveImage;

    meanData.getProfile()
      .success(function (data) {
        vm.user = data;
         if (vm.user.birthday != ""){
          vm.user.birthday = meanData.renderDate(vm.user.birthday)
        }
      })
      .error(function (e) {
        console.log(e);
      });

    function saveUser() {
       if(document.getElementById("password").value.length == 0 || document.getElementById("password2").value.length == 0){
           alert('Zum ändern MUSST Du dein Passwort eintragen');
          //alert("Zum ändern MUSST Du dein Passwort eintragen");
      }
      else  if (vm.user.password !== vm.user.password2) {
        alert("Passwörter stimmen nicht überein!");
      }
          else {
             var st = vm.user.birthday;
             var stSplit = st.split(".");
             var dt = new Date( parseInt(stSplit[2],10), parseInt(stSplit[1]-1,10), parseInt(stSplit[0],10));
             vm.user.birthday=dt

             userService.update(vm.user)
                 .then(function () {
                 $location.path('/account');
                 })
             .catch(function (e) {
                 console.log(e);
                 });
              }
        }

    function deleteUser() {
      userService.deleteUsers(vm.user)
        .then(function(){
          $location.path('/login');
            document.getElementById('navlogin').style.display='block'
            document.getElementById('profile').style.display='none'
        })
        .catch(function (e) {
          console.log(e);
        });
    }

    function saveImage() {

      var imgsrc = angular.element(document.getElementById('flowUploadImage')).attr('src');
      console.log(imgsrc);
      var imageData = {
        image: imgsrc
      };

      userService.savingImage(imageData)
        .then(function () {
          $location.path('/account');
        })
        .catch(function (e) {
          console.log(e);
        });
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
