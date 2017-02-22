(function() {

  angular
    .module('openSenseMapApp')
    .controller('accountCtrl', accountCtrl);

  accountCtrl.$inject = ['$location', 'meanData', 'userService', '$scope', '$rootScope', '$document'];
  function accountCtrl($location, meanData, userService, $scope, $rootScope, $document) {
    var vm = this;

    vm.user = {};

    vm.saveImage = saveImage;

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });

    var imgsrc = angular.element(document.getElementById('flowUploadImage')).attr('src');
    var imageData = {
      image: imgsrc
    };
    console.log(imageData);

    function saveImage() {
      userService.savingImage(imageData)
        .then(function () {
          $location.path('/profile');
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
