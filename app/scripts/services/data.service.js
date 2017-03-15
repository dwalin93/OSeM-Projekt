(function() {

  angular
    .module('openSenseMapApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication', 'OpenSenseBoxAPI'];
  function meanData ($http, authentication, OpenSenseBoxAPI) {

    var getProfile = function () {
      return $http.get(OpenSenseBoxAPI.url+'/profile', {
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

    function renderDate2(date){
      var today = new Date();
      var rightDate = new Date(date);
      var day = rightDate.getDate();
      var month = rightDate.getMonth()+1;
      var year = today.getUTCFullYear();
      if (day < 10){
        day = "0" + day
      }
      if (month < 10){
        month = "0" + month
      }
      var correctDate = day +'.'+ month+'.'+ year;
      return correctDate;
    }



    function getRank(user,users){
      getAllProfiles();
      getProfile();
      for (var d = 0; d < users.length; d++) {
        if(user.username == users[d].username){
          return d;
        }
      }
    }


    var getAllProfiles = function () {
      return $http.get(OpenSenseBoxAPI.url+'/allProfiles');
    };

    var getAllProfilesBox = function () {
      return $http.get(OpenSenseBoxAPI.url+'/allProfilesBox');
    };

    countPoints = function(points) {
      return $http.get(OpenSenseBoxAPI.url+'/game/'+points, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }}
      );
    }

    countSbPoints = function(SbPoints) {
      return $http.get(OpenSenseBoxAPI.url+'/osem/'+SbPoints, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }}
      );
    };

    return {
      getProfile : getProfile,
      countPoints : countPoints,
      getAllProfiles : getAllProfiles,
      renderDate: renderDate,
      renderDate2: renderDate2,
      getRank: getRank,
      countSbPoints: countSbPoints,
      getAllProfilesBox : getAllProfilesBox
    };
  }

})();
