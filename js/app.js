var app = angular.module('contributions', []);

app.controller('ContributionController', function($scope, $http) {
  $scope.messages = {};
  $scope.options = {
    query: '',
    username: 'yannickoo',
  };

  $scope.user = {};

  $scope.updateUsername = function() {
    $http.get('https://api.github.com/users/' + $scope.options.username).success(function(user) {
      $scope.messages = {};
      $scope.user = user;
      $scope.user.name = typeof user.name !== 'undefined' ? user.name : user.login;

      $http.get(user.repos_url).success(function(repos) {
        if (!repos.length) {
          $scope.options.username = '';
          $scope.messages.error = $scope.user.name + ' has no repositories yet.';

          return;
        }

        $scope.user.repos = repos;
      });
    }).error(function(data, status) {
      $scope.messages.error = data.message + ' (' + status + ')';
      $scope.user = {};
      $scope.options.username = '';
    });
  };

});
