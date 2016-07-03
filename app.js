angular.module('myApp', ['ngMaterial'])
 .config(function($mdThemingProvider) {
   $mdThemingProvider.theme('default')
     .primaryPalette('blue-grey')
     .accentPalette('blue-grey');
 });

// app.controller('musicController' function() {
//   this.playlists = ;
// })
