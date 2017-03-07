(function() {
  'use strict';

  angular
    .module('openSenseMapApp')
    .controller('gameCtrl', gameCtrl);

  gameCtrl.$inject = ['authentication','$location', 'meanData', '$translate', 'userService', '$scope', '$http','ngDialog'];
  function gameCtrl(authentication,$location,meanData,  $translate, userService, $scope, $http,ngDialog) {


   var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
      if(vm.isLoggedIn == false){

            var r = confirm("Hallo!\nDu bist nicht eingeloggt! \nDu kannst zwar spielen, deine erreichten Punkte werden aber NICHT gespeichert!\nWillst Du dennoch spielen?");
            if (r !== true) {
               location.href = "/"
            }
      }
      
   // document.getElementById('profile').style.display='block'
   // document.getElementById('navlogin').style.display='none'

//leaderboard + Punkte Auszeichnungen
       var vm = this;

    vm.users = {};
    vm.user = {};
    var point_badge=[100, 200, 500, 1000, 2500, 5000, 10000, 15000 , 20000, 50000];
    var badge = ["images/score-100.png","images/score-200.png","images/score-500.png","images/score-1000.png","images/score-2500.png","images/score-5000.png","images/score-10000.png","images/score-15000.png","images/score-20000.png","images/score-50000.png"];
      var i = 0;
      
          meanData.getProfile()
              .success(function (data) {
              vm.user = data;
              vm.user.points=vm.user.points;
            while(vm.user.points > point_badge[i]){
                i++;
                //console.log(i);
            };
          })
              .error(function (e) {
              console.log(e);
          });
      
      function alleProfile(){
      meanData.getAllProfiles()
                  .success(function (data) {
                  vm.users = data;
              })
                  .error(function (e) {
                  console.log(e);
              });
      
      }
      
      alleProfile();
      
      $(document).ready(function(){
          $("#myBtn").click(function(){
              alleProfile();
              $("#myModal2").modal();
          });
      });
      
      
      //ende Leaderboard 
      
      
    var firstpolyline;
      var ok;
      var repeat;
    var popupergebnis;
    var latbox;
    var punkte = 0;
    vm.pkt = 0;
    var punkteGesamt = 0;
    var longbox;
    var marker = null;
    var ergebnis = null;
    var popup = L.popup();
    var counter = 0;
    var boxDistance;
    var oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    var isoOneHourAgo = oneHourAgo.toISOString();
    var boxId = [];
    var position;
    var pointB = [];
    $scope.box = [];
    $scope.distance = [];
    var gameBoxId = [];
    

    var greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

//aufrufen der karte
    var mymap = L.map('mapid').setView([51.4, 9], 2);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'hoelsch.e2b0812b',
      accessToken: 'pk.eyJ1IjoiaG9lbHNjaCIsImEiOiJxblpwakZrIn0.JTTnLszkIJB11k8YEe7raQ'
    }).addTo(mymap);

    $scope.map = mymap;

      $http({
        method: "GET",
        url: "https://api.opensensemap.org/boxes?"

      }).then(function mySucces(response) {
        $scope.myData = response.data;
        for (var i in response.data) {
          boxId.push(response.data[i]._id);
        }
        randomize(boxId, $http);
      }, function myError(response) {
        $scope.myData = response.statusText;
      });




      function score() {
        //console.log("Die Entfernung zur Sensebox beträgt: " +
        //  (position.distanceTo([latbox, longbox]) / 1000).toFixed(2) + "Km");
        $scope.distance = (position.distanceTo([latbox, longbox]) / 1000).toFixed(2)
        //console.log("l33337 Test  " + $scope.distance);
        // punkte einteilung
        if (((position.distanceTo([latbox, longbox]) / 1000).toFixed(2)) < 50) {
          punkte = Number(100);
          punkteGesamt =  punkteGesamt + punkte;
        }
        if (((position.distanceTo([latbox, longbox]) / 1000).toFixed(2)) <= 150 && ((position.distanceTo([latbox, longbox]) / 1000).toFixed(2)) >= 50) {
          punkte = Number(50);
          punkteGesamt =  punkteGesamt  + punkte;
        }
        if (((position.distanceTo([latbox, longbox]) / 1000).toFixed(2)) < 250 && ((position.distanceTo([latbox, longbox]) / 1000).toFixed(2)) >= 150) {
          punkte = Number(10);
          punkteGesamt =  punkteGesamt  + punkte;
        }
        if (((position.distanceTo([latbox, longbox]) / 1000).toFixed(2)) >= 250) {
          punkte = Number(1);
          punkteGesamt = punkteGesamt  + punkte;
        }
      };


      function onMapClick(e) {
        if (marker == null) {

         ok.addTo(mymap);
          marker = new L.marker(e.latlng, {
            draggable: false
          });
          mymap.addLayer(marker);
          position = marker.getLatLng();
          pointB = [position.lat, position.lng];
        } else {
            ok.addTo(mymap);
          mymap.removeLayer(marker);
          marker = null;
          marker = new L.marker(e.latlng, {
            draggable: false
          });
          position = marker.getLatLng();
          pointB = [position.lat, position.lng];
          mymap.addLayer(marker);
        }
      };
      mymap.on('click', onMapClick);

      $scope.distance = boxDistance;
      //console.log("heiiiide " + boxDistance);
      //boxDistance ist undefined


      //TO-DO
     ok = new L.easyButton('glyphicon-ok', function() {
        if (ergebnis == null) {
          ergebnis = L.marker([latbox, longbox], {
            icon: greenIcon
          }).addTo(mymap);
            
          ok.remove();
          repeat.addTo(mymap);
            
          counter++;
          score();
          //ergebnis.bindPopup("Du hast jetzt "+ counter +" Runden gespielt. Du hast " + punkte + " Punkt(e) in dieser Runde erzielt, <br> deine Gesamtpunktzahl ist " + punkteGesamt).openPopup();
          var pointA = [latbox, longbox];
          var pointList = [pointA, pointB];
     //     console.log(pointA, pointB);
          firstpolyline = new L.Polyline(pointList, {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
          });
          firstpolyline.addTo(mymap);
          savePoints(punkte);
          mymap.fitBounds(firstpolyline.getBounds());
            
        var poplatlon = [(pointA[0]+pointB[0])/2,(pointA[1]+pointB[1])/2]
      //      console.log(poplatlon)
        popupergebnis = L.popup()
            .setLatLng(poplatlon)
            .setContent("Du hast jetzt "+ counter +" Runden gespielt. Du hast " + punkte + " Punkt(e) in dieser Runde erzielt, <br> deine Gesamtpunktzahl ist " + punkteGesamt)
            .addTo(mymap);  
            
            
        } else {
          mymap.removeLayer(ergebnis);
          mymap.removeLayer(firstpolyline);
          ergebnis = L.marker([latbox, longbox], {
            icon: greenIcon
          }).addTo(mymap);       
          //ergebnis.bindPopup("Du hast jetzt "+ counter +" Runden gespielt. Du hast " + punkte + " Punkt(e) in dieser Runde erzielt, deine Gesamtpunktzahl ist " + punkteGesamt).openPopup();
          var pointA = [latbox, longbox];
          var pointList = [pointA, pointB];
          //console.log(pointA, pointB);


          firstpolyline = new L.Polyline(pointList, {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
          });
          firstpolyline.addTo(mymap);
          mymap.fitBounds(firstpolyline.getBounds());
        }

      });

      //TO-DO neue Daten geladen Nachricht  + addieren der Punkte + speichern der Punkte
    repeat = new L.easyButton('fa-repeat', function() {
        mymap.setView([51.4, 9], 2);
        mymap.removeLayer(marker);
        mymap.removeLayer(popupergebnis);
        mymap.removeLayer(ergebnis);
        mymap.removeLayer(firstpolyline);
        repeat.remove();
        ok.remove();
        
        ergebnis= null;
        randomize(boxId, $http)

      });
      
      
      mymap.on('click', onMapClick);
      
      //sucht eine Randombox aus und übergibt das dann der funktion gameBox
      //übergebene boxId
      
      function randomize(boxId, http) {
        var gameBoxId = boxId[Math.floor(Math.random() * boxId.length)];
        console.log('RandomBoxId: ' + gameBoxId);
        gameBox(gameBoxId, http);
        mymap.removeLayer(marker);
        mymap.removeLayer(popupergebnis);
        mymap.removeLayer(ergebnis);
        mymap.removeLayer(repeat);
        mymap.removeLayer(firstpolyline);
      };
            vm.test=true;

      function gameBox(gameBoxId, $http) {
        $http({
          method: "GET",
          url: "https://api.opensensemap.org/boxes/" + gameBoxId
        }).then(function mySucces(response) {

          /*if abfrage wenn das datum "kleiner" als 11.11.16 ist dann soll er nochmal eine box
           suchen, oder beim fall eines undefined,
           TO-DO indoor boxen auschließen
           */
          if (response.data.sensors === undefined ||
            response.data.sensors[0].hasOwnProperty("lastMeasurement") == false ||
            response.data.sensors[0].lastMeasurement == null ||
            response.data.sensors[0].lastMeasurement.createdAt <= isoOneHourAgo ||
            response.data.exposure =="indoor"||
            response.data.sensors.length<3
          ) {
            randomize(boxId, $http);              
          } else {
              vm.test=false;
            console.log("sucess");


            //übergebene Koordinaten für clickevent zur Berechnung
            latbox = response.data.loc[0].geometry.coordinates[1];
            longbox = response.data.loc[0].geometry.coordinates[0];
            var sensors = [];
            var sensors1 = [];
            var sensors2 = [];
              
              
              console.log(sensors)

              var d = 3;
              var p = 0;
              
              for (var ii = 0 ; ii < response.data.sensors.length; ii++){
                  if (response.data.sensors[ii].title == "Temperatur" ){
                      sensors1[0]=response.data.sensors[ii];
                  }else if(response.data.sensors[ii].title == "rel. Luftfeuchte" || response.data.sensors[ii].title == "Luftfeuchtigkeit"){
                      sensors1[1]=response.data.sensors[ii];
                  }else if(response.data.sensors[ii].title == "Luftdruck" ){
                      sensors1[2]=response.data.sensors[ii];
                  }else{
                      sensors1[d]=response.data.sensors[ii];
                        d++;
                  }
              }
              
              if(sensors1.length !== response.data.sensors.length){
              for (var iii = 0; iii<sensors1.length; iii++){
                  if (sensors1[iii]==undefined){
                      console.log("NEU GEORDNET!!!S");
                  }else{
                      sensors2[p] = sensors1[iii];
                      p++                      
                  }
              }
              }else{
                  sensors2=sensors1;
              }
              
                                
              for (var i = 0; i < sensors2.length; i++) {
              var sensor = {};                
              sensor.title = sensors2[i].title;
              sensor.value = sensors2[i].lastMeasurement.value;
              sensor.unit = sensors2[i].unit;
              var x = sensors2[i].lastMeasurement.createdAt;
              var measurementDate = new Date(x);
              var day = measurementDate.getDate();
              var month = measurementDate.getMonth()+1;
              var year = measurementDate.getUTCFullYear();
              var hours = measurementDate.getUTCHours();
              var minutes = measurementDate.getUTCMinutes();
                if (minutes < 10){
                    minutes = "0" + minutes; 
                }
                if (hours < 10){
                    hours = "0" + hours; 
                }
              var fullDate = day +'.'+ month +'.'+ year + ' um: ' + hours + ':' + minutes + ' (UTC)';
              sensor.lastMeasurement = fullDate;
              sensors.push(sensor);
            }
            $scope.box = sensors;

          }

          function onMapClick(e, latbox, longbox) {

          }

        }, function myError(response) {
          //console.log(response);
        });
      }

      
          
      

      function savePoints(points){
            
          meanData.countPoints(points)
          .success(function () {
            if(punkteGesamt >= (point_badge[i] - vm.user.points)){
                document.getElementById("new_badge").src = badge[i];
                document.getElementById("new_points").innerHTML = "Sehr gut, Du hast mehr als " + point_badge[i] + " Punkte erreicht!!!";
                i=i+1
                $("#myModal3").modal();
            }
            //$location.path('/account');
          })
          .catch(function (e) {
            console.log(e);
          });
      };
  };
    
    
    
})();
