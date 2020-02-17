var app = angular.module('catsvsdogs', []);
var socket = io.connect({transports:['polling']});


app.controller('statsCtrl', function($scope){
  $scope.aPercent = 25;
  $scope.bPercent = 25;
  $scope.cPercent = 25;
  $scope.dPercent = 25;

  var updateScores = function(){
    socket.on('scores', function (json) {
       data = JSON.parse(json);
       var a = parseInt(data.a || 0);
       var b = parseInt(data.b || 0);
	   var c = parseInt(data.c || 0);
     var d = parseInt(data.d || 0);
       var percentages = getPercentages(a,b,c,d);

       $scope.$apply(function () {
         $scope.aPercent = percentages.a;
         $scope.bPercent = percentages.b;
		 $scope.cPercent = percentages.c;
     $scope.dPercent = percentages.d;
         $scope.total = a+ b+c+d;
       });
    });
  };

  var init = function(){
    document.body.style.opacity=1;
    updateScores();
  };
  socket.on('message',function(data){
    init();
  });
});

function getPercentages(a, b,c,d) {
  var result = {};

  if (a + b +c+d> 0) {
    result.a = Math.round(a / (a + b+c+d) * 97);
    result.b = Math.round(b / (a + b+c+d) * 97);
	result.c = Math.round(c / (a + b+c+d) * 97);
  result.d = Math.round(d / (a + b+c+d) * 97);
  } else {
    result.a = result.b = result.c = result.d = 25;
  }

  return result;
}