var app = angular.module('contributions', []);

app.directive('selectOnClick', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('click', function() {
        debugger;
        this.select();
      });
    }
  };
});

app.controller('ContributionController', function($scope, $http) {
  $scope.user = {};
  $scope.messages = {};
  $scope.options = {
    query: '',
    username: 'yannickoo',
  };

  $scope.github = new Github({
    token: 'e9e54d959a6a2dcb801f5ca0f58d33a32882b4cf',
  });

  $scope.githubUser = $scope.github.getUser();

  $scope.hideZero = function(number) {
    return number > 0 ? number : '';
  };

  $scope.updateUsername = function() {
    if (typeof $scope.user.name !== 'undefined' && $scope.user.name === $scope.options.username) {
      return;
    }

    $scope.githubUser.show($scope.options.username, function(err, res) {
      if (err) {
        $scope.messages.error = err.message + ' (' + err.status + ')';
        $scope.user = {};
        $scope.options.username = '';
      }
      else {
        $scope.user = res;
        $scope.user.name = typeof res.name !== 'undefined' ? res.name : res.login;

        $scope.githubUser.userRepos($scope.options.username, function(err, res) {
          if (err) {
            $scope.messages.error = data.message + ' (' + status + ')';
            $scope.options.username = '';
          }
          else {
            $scope.messages = {};
            $scope.user.repos = res;
          }
        });

        $scope.githubUser.userStarred($scope.options.username, function(err, res) {
          if (err) {
            $scope.messages.error = data.message + ' (' + status + ')';
            $scope.options.username = '';
          }
          else {
            $scope.messages = {};
            $scope.user.starred = res;
          }
        });
      }
    });
  };
});
