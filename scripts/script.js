(function (window, angular) {

	angular.module('thinhelp', ['ngResource', 'ngSanitize', 'ngAnimate', 'ui.bootstrap']);

	angular.module('thinhelp').run(function () {
		console.log('Thin Help');
	});

	angular.module('thinhelp').controller('widgetController', ['$scope', '$log', '$uibModal', 'thinHelpContent', function ($scope, $log, $uibModal, thinHelpContent) {
		$scope.dataSet = [
			{"name": "Map", "lang": "es", "image": "images/maps.jpg"},
			{"name": "Chart", "lang": "fr", "image": "images/chart.gif"},
			{"name": "Grid", "lang": "hi", "image": "images/grid.png"}
		];

		$scope.items = [
			{"name": "Help" }
		]

		$scope.getData = function (dname, dlang) {
			$scope.showModal = true;
			thinHelpContent.getDataFromFile(dname, dlang);
		}

		$scope.status = {
			isopen: false
		};

		$scope.toggled = function(open) {
			$log.log('Dropdown is now: ', open);
		};

		$scope.toggleDropdown = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.status.isopen = !$scope.status.isopen;
		};

		$scope.open = function (page, lang, size) {

			

			 var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'modal-content.html',
				controller: 'ModalInstanceCtrl',
				size: size,
				resolve: {
					page: function () {
						return angular.lowercase(page);
					},
					lang: function () {
						return lang;
					}
				}
			});
		};


	}]);

	angular.module('thinhelp').controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'thinHelpContent', 'page', 'lang', function ($scope, $uibModalInstance, thinHelpContent, page, lang) {
		console.log(angular.lowercase(page));
			console.log(lang);

			thinHelpContent.getDataFromFile(angular.lowercase(page), lang);

			thinHelpContent.getDataFromFile(angular.lowercase(page), lang).then(function (data) {
				$scope.context = data;
			}, function (error) {
				console.log(error);
			});

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);

	// angular.module('thinhelp').directive('helpClient', [function () {
	// 	return {
	// 		restrict: 'A',
	// 		scope: {
	// 			title: '=modalTitle',
	// 			header: '=modalHeader',
	// 			body: '=modalBody',
	// 			footer: '=modalFooter'
	// 		},
	// 		template: '<div>' +
	// 					'  <div class="modal fade" id="loginModal" tabindex="-1" + role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true" > ' +
	// 					'    <div class = "modal-dialog" > ' +
	// 					'      <form name = "form" ng - submit = "submit()" > ' +
	// 					'        <div class = "modal-content" > ' +
	// 					'          <div class = "modal-header" > ' +
	// 					'            <button type="button" class = "close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()" > Cancel </button>' +
	// 					'              <h3> </h3 > ' +
	// 					'          </div>' +
	// 					'          <div class="modal-body">' +
	// 					'            Down' +
	// 					'          </div>' +
	// 					'        </div > ' +
	// 					'      </form>' +
	// 					'    </div > ' +
	// 					'  </div>' +
	// 					'</div > ',
	// 		controller: function () {
	// 			$scope.$watch('showModal', function() {
	//                 if ($scope.showModal) {
	// 		            $("#loginModal").modal('show');
	//                 };
	//            }); 
	// 		},
	// 		link: function (scope, iElement, iAttrs) {
				
	// 		}
	// 	};
	// }]);

	angular.module('thinhelp').factory('thinHelpContent', ['$http', '$q', function ($http, $q) {
		return {
			getDataFromFile: function (page, lang) {
				console.log(page + ' ----- ' + lang);

				return $http.get('tests/data/' + angular.lowercase(page) + '_' + lang + '.html').then(function (data) {
					console.log(data.data)
					return data.data;
				}, function (data) {
					return $q.reject(data.data);
				})
			}
		};
	}]);

})(window, angular);