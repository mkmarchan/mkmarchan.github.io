SC.initialize({
  client_id: 'd9611ceddfd118f8d3c6890fa3b0a0f5'
});

var app = angular.module('myApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue-grey')
  .accentPalette('grey')
});

app.controller('WindowController', ['$scope',
  function($scope) {
  $(window).on('scroll', function() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('md-tabs-wrapper').addClass('stick');
        $('#sticky-anchor').height($('md-tabs-wrapper').outerHeight());
    } else {
        $('md-tabs-wrapper').removeClass('stick');
        $('#sticky-anchor').height(0);
    }
  });

  /*$scope.scrollTabContent = function() {
    $location.hash('sticky-anchor');
    $anchorScroll();
  }*/
}]);

/*app.controller('WindowController', ['$window', '$scope', function($window, $scope) {
  var getHeight = function() {
    console.log($window.document.getElementById('mainHeader').height());
    console.log("test");
    return $window.document.getElementById('mainHeader').height;
  };

  $scope.headerHeight = getHeight();
}]);*/

/*app.directive('setClassWhenAtTop', ['$window', function($window) {
  var $win = angular.element($window);

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
      offsetTop = 109; //element.position().top; // get element's offset top relative to document

      $win.on('scroll', function (e) {
        console.log(offsetTop);
        console.log($win.scrollTop());
        if ($win.scrollTop() >= offsetTop) {
          element.addClass(topClass);
          console.log("hit");
        } else {
          element.removeClass(topClass);
        }
      });
    }
  };
}]);*/

app.controller('MusicController', ['$scope', '$mdDialog', 'scService', function($scope, $mdDialog, scService) {

  var setMe = function(res) {
    console.log("test");
    $scope.me = res;
    console.log(me.username);
    console.log(me.avatar_url);
  }

  var paused = true;

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
    paused = false;
    currentTrackID = id;
    $scope.trackPlayer = res;
    $scope.trackPlayer.play();
  };

  var newTrackPlayer = function(id) {
    console.log(id);
    scService.getTrackPlayer(id, setTrackPlayer);
  };

  $scope.progress=0;

  $scope.trackPlayer = null;

  /*setInterval(function(){
    if(paused==false){
      $scope.progress = $scope.trackPlayer.currentTime() / $scope.trackPlayer.streamInfo.duration * 100;
      console.log($scope.progress);
    }
  }
    ,1000);*/

  var currentTrackID = null;

  var trackArtArray = [];

  $scope.me = scService.getMe(setMe);

  $scope.playTotal = null;

  $scope.myTracks = scService.getMyTracks(setTracks);

  $scope.artClick = function(trackId) {
    var artIndex = trackArtArray.indexOf(trackId);
    console.log(artIndex);
    if (artIndex < 0) {
      trackArtArray.push(trackId);
      console.log(trackArtArray);
    } else {
      trackArtArray.splice(artIndex, 1);
      console.log(trackArtArray);
    }
  }

  $scope.viewingArt = function(trackId) {
    return trackArtArray.indexOf(trackId) >= 0;
  }

  $scope.isPlaying = function(id) {
    return id == currentTrackID && !paused;
  }

  $scope.play = function(id) {
    if($scope.trackPlayer == null || currentTrackID != id) {
      newTrackPlayer(id);
    } else {
      paused = false;
      currentTrackID = id;
      $scope.trackPlayer.play();
    }
  };

  $scope.pause = function(id) {
    console.log("pausing" + id)
    if($scope.trackPlayer == null || currentTrackID == id) {
      paused = true;
      $scope.trackPlayer.pause();
      console.log("pause");
    }
  }

  $scope.getArtURL = function(url) {
    if (url != null) {
      return url.slice(0, -9) + 't500x500.jpg';
    }
    return null;
  };

  /*$(SC).on('buffering_start', function() {
    console.log("buffering");
    $('#trackProgress' + currentTrackID).attr("md-mode", "query");
  })
  $(SC).on('play-resume', function() {
    console.log("nowPlaying");
    $('#trackProgress' + currentTrackID).attr("md-mode", "determinate");
  })*/

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
          console.log(player);
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
