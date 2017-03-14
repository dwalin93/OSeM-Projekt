(function(){

  angular
    .module('openSenseMapApp')
    .service('userService', userService);

  userService.$inject = ['$http', 'authentication', 'OpenSenseBoxAPI'];
  function userService($http, authentication, OpenSenseBoxAPI) {
    //var userService = {};

    //userService.update = update;

    //return userService;


    function update(user) {
    //  console.log(user);
//              console.log("test");

    // console.log(authentication.getToken());
      return $http.post(OpenSenseBoxAPI.url+'/users/' + user._id, user, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()

        }
      })
    };

    function deleteUsers(user) {
      return $http.post(OpenSenseBoxAPI.url+'/users/delete/' + user._id, user, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }})
    };

    function savingImage(image) {
      return $http.put(OpenSenseBoxAPI.url+'/users/image', image, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }})
    };

    function getImage(){
      return $http.get(OpenSenseBoxAPI.url+ "/image",{
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }} )
    };
    var uid;
    function getID() {
      return uid;
    }

    function setID(value){
      uid = value;
    }

    function getPublicProfile(id){
      return $http.get(OpenSenseBoxAPI.url+'/publicProfile/'+id);
    }

	 return {
      update : update,
      deleteUsers : deleteUsers,
     savingImage: savingImage,
     getImage: getImage,
     getID: getID,
     setID: setID,
     getPublicProfile: getPublicProfile
    };

  }
})();
