(function() {

  angular
    .module('openSenseMapApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var getAllProfiles = function () {
      return $http.get('/api/allProfiles');
    };

    countPoints = function(points) {
      return $http.get('/api/game/'+points, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }}
       );
    };

    return {
      getProfile : getProfile,
      countPoints : countPoints,
      getAllProfiles : getAllProfiles
    };
  }

})();
