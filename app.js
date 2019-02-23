var app = angular.module('myApp', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('grey')
  });

// Load in information from JSONs to display onto the page
app.controller('WindowController', ['$scope', '$sce',
  function($scope, $sce) {
    $.getJSON("resources/projects.json", function(json) {
      $scope.projects = json.projects;
      $scope.projects.forEach(function(project) {
        project.videoURL = $sce.trustAsResourceUrl(project.videoURL);
      })
    });

    $.getJSON("resources/about.json", function(json) {
      $scope.about = json;
    });
  }
]);

// Profile picture resizing. Assumes it is square and at least 922 pixels wide.
// super jank
var firstResize = true;
var interval = window.setInterval(resizeProfilePicture, 1);

function resizeProfilePicture() {
  var picture = document.getElementById("profilePicture");
  var pictureRect = picture.getBoundingClientRect();
  var parent = picture.parentElement.parentElement;
  var parentRect = parent.getBoundingClientRect();
  var defaultLength = Math.min(922, parent.scrollWidth * 0.95);

  var overflowSide = Math.min(document.body.scrollHeight - parentRect.y,
    document.body.scrollWidth - parentRect.width / 2);

  if (firstResize && defaultLength != 0) {
    firstResize = false;
    window.clearInterval(interval);
  }

  var diff = overflowSide - (defaultLength + 32);
  if (diff < 0 && document.body.scrollWidth >= 960) {
    picture.style.width = picture.style.height = defaultLength + diff + "px";
  } else {
    picture.style.width = picture.style.height = defaultLength + "px";
  }
}
$(window).resize(resizeProfilePicture);
