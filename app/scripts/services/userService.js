(function(){

  angular
    .module('openSenseMapApp')
    .service('userService', userService);

  userService.$inject = ['$http', 'authentication'];
  function userService($http, authentication) {
    //var userService = {};

    //userService.update = update;

    //return userService;


    function update(user) {
      console.log(user);
              console.log("test");

     console.log(authentication.getToken());
      return $http.post('/api/users/' + user._id, user, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()

        }
      })
    };

    function deleteUsers(user) {
      return $http.post('/api/users/delete/' + user._id, user, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }})
    };

    function savingImage(image) {
      return $http.put('api/users/image', image, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }})
    };

	 return {
      update : update,
      deleteUsers : deleteUsers,
     savingImage: savingImage
    };

  }
})();
