var myApp = angular.module('Erp', ['ngRoute', 'ngAnimate', 'ngMaterial', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ngAria', 'ui.grid.moveColumns']);

myApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/Can-I-Reach-Challenger/public/login', {
        templateUrl: '/Can-I-Reach-Challenger/templates/login.html',
        controller: 'loginCtrl',
        controllerAs: 'loginCtrl'
      })
    $routeProvider
      .when('/Can-I-Reach-Challenger/public/dashboard', {
        templateUrl: '/Can-I-Reach-Challenger/templates/dashboard.html',
        controller: 'dashboardCtrl',
        controllerAs: 'dashboardCtrl'
      })
    $routeProvider
      .when('/Can-I-Reach-Challenger/public/contact', {
        templateUrl: '/Can-I-Reach-Challenger/templates/contact.html',
        controller: 'mainCtrl',
        controllerAs: 'mainCtrl'
      })
    $routeProvider
      .when('/Can-I-Reach-Challenger/public/admin', {
        templateUrl: '/Can-I-Reach-Challenger/templates/admin.html',
        controller: 'adminCtrl',
        controllerAs: 'adminCtrl'
      })
    $routeProvider
      .when('/Can-I-Reach-Challenger/public/:region/:name/details', {
        templateUrl: '/Can-I-Reach-Challenger/templates/details.html',
        controller: 'detailsCtrl',
        controllerAs: 'detailsCtrl'
      });

    $locationProvider.html5Mode(true);
  }
])
myApp.controller('mainCtrl', ['$scope', '$http', '$rootScope', '$location', '$route', '$routeParams', function($scope, $http, $rootScope, $location, $route, $routeParams) {

}]);
myApp.controller('adminCtrl', ['$scope', '$http', '$rootScope', '$location', '$route', '$routeParams', function($scope, $http, $rootScope, $location, $route, $routeParams) {
 
  $scope.gridOptions =  {enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: {
          fontSize: 9
        },
        exporterPdfTableStyle: {
          margin: [30, 30, 30, 30]
        },
        exporterPdfTableHeaderStyle: {
          fontSize: 10,
          bold: true,
          italics: true,
          color: 'red'
        },
        exporterPdfHeader: {
          text: "My Header",
          style: 'headerStyle'
        },
        exporterPdfFooter: function(currentPage, pageCount) {
          return {
            text: currentPage.toString() + ' of ' + pageCount.toString(),
            style: 'footerStyle'
          };
        },
        exporterPdfCustomFormatter: function(docDefinition) {
          docDefinition.styles.headerStyle = {
            fontSize: 22,
            bold: true
          };
          docDefinition.styles.footerStyle = {
            fontSize: 10,
            bold: true
          };
          return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function(gridApi) {
          $scope.gridApi = gridApi;
        }};
  $scope.renewTable = function () {
  $urlC = "/Can-I-Reach-Challenger/public/alls/cols";
  $http({
    method: "GET",
    url: $urlC,
  }).
  then(function(response) {
    $scope.status = response.status;

    $scope.columnDefs = [];
    for ($i = 0; $i < response.data.length; $i++) {
      $resp = JSON.stringify({
        "field": response.data[$i].Field,
        "name" : response.data[$i].Field,
        "type" : "string"
      })
      $resp = JSON.parse($resp);
      $scope.columnDefs.push($resp);

    }
    $url = "/Can-I-Reach-Challenger/public/all/movies";
    $http({
      method: "GET",
      url: $url,
    }).
    then(function(response_data) {
      $scope.status = response.status;
      $scope.gridOptions = {

        columnDefs: $scope.columnDefs,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: {
          fontSize: 9
        },
        exporterPdfTableStyle: {
          margin: [30, 30, 30, 30]
        },
        exporterPdfTableHeaderStyle: {
          fontSize: 10,
          bold: true,
          italics: true,
          color: 'red'
        },
        exporterPdfHeader: {
          text: "My Header",
          style: 'headerStyle'
        },
        exporterPdfFooter: function(currentPage, pageCount) {
          return {
            text: currentPage.toString() + ' of ' + pageCount.toString(),
            style: 'footerStyle'
          };
        },
        exporterPdfCustomFormatter: function(docDefinition) {
          docDefinition.styles.headerStyle = {
            fontSize: 22,
            bold: true
          };
          docDefinition.styles.footerStyle = {
            fontSize: 10,
            bold: true
          };
          return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function(gridApi) {
          $scope.gridApi = gridApi;
        }
      };
      $scope.data_grid = response_data.data;
        $scope.gridOptions.data = $scope.data_grid;
      //$rootScope.data = $scope.data;

      //  alert($rootScope.details);


    }, function(response_data) {
      $scope.data = response.data || "Request failed";
      $scope.status = response.status;
    });
    //  alert($rootScope.details);
  }, function(response) {
    $scope.data = response.data || "Request failed";
    $scope.status = response.status;
  });
}
  $scope.renewTable();
  if ($rootScope.data === undefined || $rootScope.data.role_id != 1) {
    $location.path("/Can-I-Reach-Challenger/public/dashboard");
  }
  $scope.renewSelect = function (){
  $urlServices = "/Can-I-Reach-Challenger/public/all/getQuerys/" + $rootScope.data.logon;
  $http({
    method: "GET",
    url: $urlServices,
  }).
  then(function(response_querys) {
    $scope.querys = [];
    for ($i = 0; $i < response_querys.data.length; $i++) {
      $resp = JSON.stringify({
        "field": response_querys.data[$i]
      })
      $resp = JSON.parse($resp);
      $scope.querys.push($resp);
    }
    console.log($scope.querys);

    $scope.$apply();
  }, function(response_querys) {
    $scope.data = response_query.data || "Request failed";
    $scope.status = response_query.status;
  });
}
$scope.renewSelect();

  $scope.sqlFunction = function() {
    $url = "/Can-I-Reach-Challenger/public/all/admin/services/" + $scope.query;
    $http({
      method: "GET",
      url: $url,
    }).
    then(function(response_query) {
        $scope.gridOptions.data = response_query.data;
    
    }, function(response_query) {
      $scope.data = response_query.data || "Request failed";
      $scope.status = response_query.status;
    });


$urls = "/Can-I-Reach-Challenger/public/all/"+$scope.query+"/"+$rootScope.data.logon;
    $http({
      method: "GET",
      url: $urls,
    }).
    then(function(response_queryss) {
      $scope.renewSelect();
        $scope.$apply();
    
    console.log($scope,queryss)
    }, function(response_queryss) {
      $scope.data = response_query.data || "Request failed";
      $scope.status = response_query.status;
    });

  }


}]);

myApp.controller('loginCtrl', ['$scope', '$http', '$rootScope', '$location', '$route', '$routeParams', function($scope, $http, $rootScope, $location, $route, $routeParams) {
  $scope.logon = "";
  $scope.password = "";

  $scope.login = function() {
    $url = "/Can-I-Reach-Challenger/public/login/" + $scope.logon + "/" + $scope.password;
    $http({
      method: "GET",
      url: $url,
    }).
    then(function(response) {
      $scope.status = response.status;
      $scope.data = response.data;
      $rootScope.data = $scope.data;

      if ($rootScope.data.logon == $scope.logon) {
        $location.path("/Can-I-Reach-Challenger/public/dashboard");
        $rootScope.data = $scope.data;
      }
      //  alert($rootScope.details);
    }, function(response) {
      $scope.data = response.data || "Request failed";
      $scope.status = response.status;
    });
  };
}]);

myApp.controller('dashboardCtrl', ['$scope', '$http', '$rootScope', '$location', '$route', '$routeParams', function($scope, $http, $rootScope, $location, $route, $routeParams) {
  if ($rootScope.data === undefined ) {
    $location.path("/Can-I-Reach-Challenger/public/login");
  }

  $scope.query = "";
  $scope.role = $rootScope.data.role_id;
  $url = "/Can-I-Reach-Challenger/public/all/movies";
  $http({
    method: "GET",
    url: $url,
  }).
  then(function(response) {
    $scope.status = response.status;
    $scope.data = response.data;

    //  alert($rootScope.details);
  }, function(response) {
    $scope.data = response.data || "Request failed";
    $scope.status = response.status;
  });

  $scope.adminButton = function() {
    $location.path("/Can-I-Reach-Challenger/public/admin");
  }



  //$scope.teste = 



  $scope.expand = function() {
    document.getElementById("mdcard_1").setAttribute("style", "height:500px");
    // document.getElementById("mdcard_1").setAttribute("style","height:144px");
    //document.getElementById("div_1").style.heigth = "600px";

  }


  $scope.sqlFunction = function() {
    $url = "/Can-I-Reach-Challenger/public/all/" + $scope.query;
    $http({
      method: "GET",
      url: $url,
    }).
    then(function(response_query) {
      if (response_query.data == "true") {
        alert("Please, don't try delete, update or truncate, Just use select");
        return;
      }

      $scope.data = response_query.data;
      $scope.$apply();
    }, function(response) {
      $scope.data = response_query.data || "Request failed";
      $scope.status = response_query.status;
    });
  }
}]);