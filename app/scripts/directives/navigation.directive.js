(function () {

  angular
    .module('openSenseMapApp')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: 'views/navigation.template.html',
      controller: 'navigationCtrl as navvm'
    };
  }

})();
