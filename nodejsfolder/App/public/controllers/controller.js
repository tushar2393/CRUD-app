var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.factory('commonService', function () {
	console.log('I loaded');
        var myValue;
        return {
            set: function (o) {
                this.myValue = o;
            },
            get: function () {
                return this.myValue;
            }
        };
});

myApp.controller('AppCtrl', ['$scope', '$http','$rootScope','$modal','commonService', function($scope,$http,$rootScope,$modal,commonService) {
console.log("Hello World from controller");

var refresh = function(){
$http({
      method: 'GET',
      url: '/Facility_DB'
    })
    .then(function(response) {
    	console.log(response)
    console.log('I got the requested data');
      $rootScope.Facility =  response.data;
    });

}

refresh();

$scope.addContact = function(){
	console.log($scope.contact);
	$http({
      method: 'POST',
      url: '/Facility_DB',
      data: $scope.contact
    })
    .then(function(response) {
    	$scope.contact = {} //To clear the input boxes
    console.log('I got the requested data');
    refresh();
      
    });


};
$scope.remove = function(id){
	console.log(id );
	$http({
      method: 'DELETE',
      url: '/Facility_DB/' + id, id
    })
    .then(function(response){
    	refresh();
    })
    
}
$scope.edit = function(contact){
console.log("Edit ID");
$scope.contact = contact;

}
$scope.update = function(id){
	console.log(id);
	$http({
      method: 'PUT',
      url: '/Facility_DB/'+id, 
      data: $scope.contact
    })
    .then(function(response){
    	refresh();
    	$scope.contact ={}
    })

}


 $scope.removeProducts = function(value) {
        //$scope.items = ['item1', 'item2', 'item3'];
        console.log('Inside remove Products' + value )
        commonService.set(value)
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl'

        });

        
        modalInstance.result.then(function (selectedItems) {
            //products = selectedItems;
        }, function () {
          //  $log.info('Modal dismissed at: ' + new Date());
        });
        refresh();
    };
refresh();

}]);

myApp.controller('ModalInstanceCtrl', function ($scope,$rootScope,$http, $modalInstance, commonService) {

var refresh = function(){
	console.log('referes called');
$http({
      method: 'GET',
      url: '/Facility_DB'
    })
    .then(function(response) {
    	console.log(response)
    console.log('I got the requested data');
      $rootScope.Facility =  response.data;
    });
}

$scope.value = commonService.get();  


$scope.remove = function(){
	var id = $scope.value;
	console.log('userID inside ModalInstanceCtrl = ' + id );
	$http({
      method: 'DELETE',
      url: '/Facility_DB/' + id, id
    })
    .then(function(response){
    	refresh();
    })
    refresh();
    $modalInstance.close();
    refresh();
    
}

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
