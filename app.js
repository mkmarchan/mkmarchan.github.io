var app = angular.module('myApp', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('grey');
  });

  app.controller('MusicController', function() {
    function reqListener () {
      this.trax = JSON.parse(this.responseText);
    }
    this.oReq = new XMLHttpRequest();
    this.oReq.addEventListener("load", reqListener);
    this.oReq.open("GET", "https://api.soundcloud.com/users/6425962/tracks?format=json&client_id=d9611ceddfd118f8d3c6890fa3b0a0f5");
    this.oReq.send();

    /*if (this.oReq.responseText != "undefined") {
      console.log("hey");
      this.oReq.trax = JSON.parse(this.responseText);
    }*/
  });

SC.initialize({
  client_id: 'd9611ceddfd118f8d3c6890fa3b0a0f5'
});

function play(id) {
  alert("im in");
  SC.stream('/tracks/' + id, function(sound) {
    sound.start();
  });
}

/*
SC.get('/users/6425962/tracks', function(track) {
  $('#Titles').html(track.title);
  alert("test");
  alert(track.title);
});
*/
