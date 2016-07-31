SC.initialize({
  client_id: 'd9611ceddfd118f8d3c6890fa3b0a0f5'
});

var app = angular.module('myApp', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('grey')
  });

  app.controller('MusicController', ['$scope', 'scService', function($scope, scService) {

    var setMe = function(res) {
      console.log("test");
      $scope.me = res;
      console.log(me.username);
      console.log(me.avatar_url);
    }

    var totalPlays = function(myTracks) {
      var total = 0;
      for(i = 0; i < myTracks.length; i++) {
        total += myTracks[i].playback_count;
      }
      return total;
    }
    var setTracks = function(res) {
      $scope.myTracks = res;
      $scope.playTotal = totalPlays(res);
    };

    var setTrackPlayer = function(res, id) {
      currentTrackID = id;
      trackPlayer = res;
      trackPlayer.play();
    };

    var newTrackPlayer = function(id) {
      console.log(id);
      scService.getTrackPlayer(id, setTrackPlayer);
    };

    var trackPlayer = null;

    var currentTrackID = null;

    $scope.me = scService.getMe(setMe);

    $scope.playTotal = null;

    $scope.myTracks = scService.getMyTracks(setTracks);

    $scope.play = function(id) {
      if(trackPlayer == null || currentTrackID != id) {
        newTrackPlayer(id);
      } else {
        trackPlayer.play();
      }
    };

    $scope.pause = function(id) {
      if(trackPlayer == null || currentTrackID == id) {
        trackPlayer.pause();
      }
    }

    $scope.getArtURL = function(url) {
      if (url != null) {
        return url.slice(0, -9) + 't500x500.jpg';
      }
      return null;
    };

  }]);

  app.factory('scService', ['$http', function($http) {
    var getMyTracks = function(setTracks) {
      SC.get('users/6425962/tracks').then(
        function(tracks) {
          console.log(tracks);
          setTracks(tracks);
      });
    };

    var getTrackPlayer = function(id, setTrackPlayer) {
      return SC.stream('/tracks/' + id).then(
        function(player) {
          setTrackPlayer(player, id);
      });
    };

    var getMe = function(setMe) {
      return SC.get('/users/6425962').then(
        function(me) {
          console.log(me);
          setMe(me);
      });
    };

    return {
      getMyTracks : getMyTracks,
      getTrackPlayer : getTrackPlayer,
      getMe : getMe
    }
  }]);

  app.filter('nl2br', function ($sce) {
    return function (text) {
        return text ? $sce.trustAsHtml(text.replace(/\n/g, '<br/>')) : '';
    };
})

/*function play(id) {
  alert("im in");
  SC.stream('/tracks/' + id, function(sound) {
    sound.start();
  });
}*/

/*
SC.get('/users/6425962/tracks', function(track) {
  $('#Titles').html(track.title);
  alert("test");
  alert(track.title);
});
*/
