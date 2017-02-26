(function() {
  'use strict';

  angular
    .module('openSenseMapApp')
    .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$location', '$translate', 'authentication', 'meanData', 'userService','$window'];
  function logoutCtrl($location, authentication, meanData, $translate, userService,$window) {
    console.log('tata');
   
 $window.localStorage.clear();
        document.getElementById('navlogin').style.display='block'
        document.getElementById('profile').style.display='none'
      
    };

})();

