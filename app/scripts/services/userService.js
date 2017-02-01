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
      
//      User.findOne({id: _id}, function(err, user){
//    if (err){
//      console.log("error");
//    }
//  if (user.username !== newUser.username) {
//    User.findOne({username: newUser.username}, function (err, user){
//      if (err){
//        console.log("error");
//      }
//      if(user) {
//        console.log("Username" + newUser.username + " ist schon vergeben");
//      }
//      else {
//        updateUser3();
//      }
//    });
//  } else {
//    updateUser3();
//  }

    function deleteUsers(user) {
      return $http.post('/api/users/delete/' + user._id, user, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }})
    };

	 return {
      update : update,
      deleteUsers : deleteUsers
    };

  }
})();
