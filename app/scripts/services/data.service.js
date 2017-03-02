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
      
      function renderDate(date){
      var rightDate = new Date(date);
      var day = rightDate.getDate();
      var month = rightDate.getMonth()+1;
      var year = rightDate.getUTCFullYear();
          if (day < 10){
              day = "0" + day
          }
          if (month < 10){
              month = "0" + month
          }
            var correctDate = day +'.'+ month +'.'+ year;
      return correctDate;
        }

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
      getAllProfiles : getAllProfiles,
        renderDate: renderDate
    };
  }

})();
