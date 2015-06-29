var app = angular.module('myApp', ['ngRoute','ArtistController']);

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
	when('/list',{
		templateUrl :'partials/list.html',
		controller : 'ListController'
	}).
	when('/details/:itemId',{
		templateUrl : 'partials/detail.html',
		controller : 'DetailController'
	}).
	otherwise({
		redirectTo : '/list'
	});
	
}]);

var ArtistController = angular.module('ArtistController',['ngAnimate']);

ArtistController.controller('ListController',function($scope, $http){
	 $http.get('js/data.json').success(function(data) {
      $scope.artists = data;

      /* Used For filters, to initialise select options*/
      $scope.artistOrder= 'name';
   });
  
});

ArtistController.controller('DetailController',function($scope, $http, $routeParams){
	 $http.get('js/data.json').success(function(data) {
      $scope.artists = data;

      /* Used For filters, to initialise select options*/
      $scope.whichItem = $routeParams.itemId;

      /* for Previous Id*/
      if($routeParams.itemId>0){
      	$scope.prevItem = Number($routeParams.itemId)-1;
      	console.log($routeParams.itemId)
      }
      else{
      	$scope.prevItem = $scope.artists.length-1;
      }

      /* For Next Value
      if ($routeParams.itemId < $scope.artists.length-1) {
      	$scope.nextItem = Number($routeParams.itemId)+1;
      }
      else{
      	$scope.nextItem = 0;
      }
      */

      if($scope.artists.length-1 == $routeParams.itemId){
      	$scope.nextItem=0;
      }
      else{
      	$scope.nextItem = Number($routeParams.itemId)+1;	
      }


   });
  
});