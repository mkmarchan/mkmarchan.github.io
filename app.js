var app = angular.module('myApp', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('grey')
  });

app.controller('WindowController', ['$scope', '$sce',
  function($scope, $sce) {
    $.getJSON("resources/projects.json", function(json) {
      $scope.projects = json.projects;
      $scope.projects.forEach(function(project) {
        project.videoURL = $sce.trustAsResourceUrl(project.videoURL);
      })
    });
  }
]);

// Profile picture resizing. Assumes it is square and at least 922 pixels wide.
// super hacky
// TODO initial size is off for some reason
var firstResize = true;
var interval = window.setInterval(resizeProfilePicture, 1);
function resizeProfilePicture() {
  var picture = document.getElementById("profilePicture");
  var pictureRect = picture.getBoundingClientRect();
  var defaultLength = Math.min(922, picture.parentElement.parentElement.scrollWidth * 0.95);
  if (firstResize && defaultLength != 0) {
    firstResize = false;
    window.clearInterval(interval);
  }

  var diff = document.body.scrollHeight - (pictureRect.y + defaultLength + 32);
  if (diff < 0 && document.body.scrollWidth >= 960) {
    picture.style.width = picture.style.height = defaultLength + diff + "px";
  } else {
    picture.style.width = picture.style.height = defaultLength + "px";
  }
}
$(window).resize(resizeProfilePicture);
