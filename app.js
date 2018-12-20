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
