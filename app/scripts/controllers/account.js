(function() {

  angular
    .module('openSenseMapApp')
    .controller('accountCtrl', accountCtrl);

  accountCtrl.$inject = ['$location', 'meanData', 'userService', '$scope', '$rootScope', '$document', '$http'];
  function accountCtrl($location, meanData, userService, $scope, $rootScope, $document, $http) {
    var vm = this;

    vm.user = {};

    vm.saveImage = saveImage;

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

    var imgsrc = angular.element(document.getElementById('flowUploadImage')).attr('src');
    console.log(imgsrc);
    var imageData = {
      image: imgsrc
    };
    console.log(imageData);

    function saveImage() {
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
