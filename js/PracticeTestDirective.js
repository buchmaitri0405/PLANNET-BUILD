var examapp = angular.module('examApp', ['firebase']);


examapp.directive('exam', function($firebaseArray,$firebaseObject) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'PracticeTestTemplate.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
                scope.length=0;
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
                scope.Math=window.Math;
               	scope.ref = new Firebase("https://resplendent-torch-7771.firebaseio.com/CADPTest");
                var db1=$firebaseArray(scope.ref);

                db1.$loaded().then(function(db1) {
                    angular.forEach(db1, function(value, key)
                    {
                        scope.length++;
				    });
                });

                scope.getQuestion();
			

			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			};

			scope.getQuestion = function() {

                var rand=getRandomInt(0,scope.length-1);
                var q11 = $firebaseObject(scope.ref.child(rand));
               
				if(scope.id<10) {

                    q11.$loaded().then(function (q11) {
                        scope.question = q11.Question;
                        scope.options = (q11.Options).split(",");
                        scope.answer = q11.Answer;
                        scope.answerMode = true
						

                    });
				} else {
					scope.quizOver = true;
				
					}
			};

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

			scope.checkAnswer = function() {
			
				
				var ans = $('input[name=answer]:checked').val();
				
				if(ans == scope.answer) {
					scope.score++;
					scope.correctAns = true;
						scope.id++;
				scope.getQuestion();
                  scope.resetForm();
		
				} else
			
				 {
					scope.correctAns = false;
						scope.id++;
				scope.getQuestion();
					scope.resetForm();

				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
                scope.resetForm();
			}
			
			scope.resetForm= function()
			{
				document.getElementById("myForm").reset();
			}

			scope.reset();
		}
	}
});
/*
examapp.factory('examFactory', function() {
	var questions = [{"ID":1,"Question":"Random demand components can be controlled by using advanced statistical forecasting models. ","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":2,"Question":"For growth items it is recommended to apply increasing trend for 12 – 15 months.","Options":"TRUE,FALSE,CANT SAY","Answer":"FALSE"},
{"ID":3,"Question":"The terms seasonality and cyclicality can be used interchangeably.","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":4,"Question":"No forecast adjustment is required to older products if a new product is added to company’s portfolio. ","Options":"TRUE,FALSE,CANT SAY","Answer":"FALSE"},
{"ID":5,"Question":"Even for a new product you should ship in bulk in the launching month to meet expected demand. ","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":6,"Question":"Additive seasonality is positive seasonality of a product ","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":7,"Question":"New packaging of old product is easier to forecast than new line extension product.","Options":"TRUE,FALSE,CANT SAY","Answer":"FALSE"},
{"ID":8,"Question":"New product launch decreases the sales of a related product already present in the market.","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":9,"Question":"Increase the growth rate for next few months if demand for a newly launched product shows increasing historical trend. ","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":10,"Question":"Year-over-year patterns give cyclicality index. ","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":11,"Question":"In a demand consensus meeting the parties involved can disagree on a forecast. (","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":12,"Question":"Sales and Marketing are Demand side players in a demand chain (or an organization). ","Options":"TRUE,FALSE,CANT SAY","Answer":"FALSE"},
{"ID":13,"Question":" Forecast passed to the supply chain is in dollar numbers at agreed level of detail. ","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":14,"Question":"Statistical modeling is done at the forecasting level agreed on in forecast agreement. ","Options":"TRUE,FALSE,CANT SAY","Answer":"FALSE"},
{"ID":15,"Question":"MTS and MTO may have different requirements for forecasting levels. ","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":16,"Question":" Supply Chain is an important participant of Demand Consensus meeting.","Options":"TRUE,FALSE,CANT SAY","Answer":"FALSE"},
{"ID":18,"Question":" Forecast delta helps to understand how the forecast have changed over time.","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":19,"Question":"Demand consensus is based on Supply Chain ability to fulfil the demand. ","Options":"TRUE,FALSE,CANT SAY","Answer":"FALSE"},
{"ID":20,"Question":"The role of a demand planner is limited to generating statistical forecast and making adjustments to the forecast based on the information provided to him. ","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"},
{"ID":21,"Question":" Value chain and Demand chain are different terms with different meanings.","Options":"TRUE,FALSE,CANT SAY","Answer":"TRUE"}]

	return {
		getQuestion: function(id) {
			if(id < questions.length && id<5) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});// JavaScript Document */