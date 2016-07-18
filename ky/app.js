var app = angular.module('myApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .dark();
});

app.controller('inputController', function($scope) {
  $scope.userText = '';
  $scope.wordList = ['You\'re going to fail.', 'Don\'t throw up.', 'Nobody believes in you.', 'Your life will be ruined.', 'You dissapoint everyone.', 'You\'re a mess.'];
  $scope.wordIndex = 0;
  $scope.typedWord = false;
  $scope.finalString = $scope.wordList[$scope.wordIndex];
  $scope.accepted = false;
  $scope.typeKY = function () {
    if ($scope.userText.length == $scope.finalString.length) {
      $scope.typedWord = true;
      if ($scope.userText === $scope.finalString) {
        $scope.accepted = true;
      }
    } else if ($scope.userText.length == 0 && $scope.typedWord){
      var randIndex = Math.floor(Math.random() * ($scope.wordList.length));
      while ($scope.wordIndex == randIndex) {
        randIndex = Math.floor(Math.random() * ($scope.wordList.length));
      }
      $scope.wordIndex = randIndex;
      $scope.finalString = $scope.wordList[$scope.wordIndex];
      $scope.typedWord = false;
    }
    console.log($scope.userText.length);
    return  $scope.finalString.substring(0, $scope.userText.length);
  }
  $scope.showAcceptance = function() {
    var style = {
      'opacity': 100,
      'background': 'white',
      'color': 'black',
      'font-size': '128px',
      'text-align': 'center',
      'width': '100%',
      'height': '100%'
    };
    return style;
  }
});
