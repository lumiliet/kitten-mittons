(function () {

	app.directive('baFileSelector', function () {

		function link(scope, element, attr) {
			element[0].onchange = function(event) {
				scope.$apply(function() {
					scope.file.file = event.target.files[0];
				});
			};
		}

		return {
			link: link,
			scope: {
				file: '='
			}
		};
	});
	app.directive('baProgressBar', function () {
		function link(scope, element, attr) {
			scope.$watch(function() {return scope.progress;}, function(newValue) {
				element.css({'width' : newValue + "%"});
			});
		}

		return {
			link: link,
			scope: {
				progress: '='
			}
		};
	});

	app.directive('baCenterVideo', function ($window, $timeout) {

		function link(scope, element, attr) {
			function calculatePosition() {
				return (element.height() - element.parent().height()) / 2;
			}

			function positionElement (value) {
				element.css({"position" : "absolute", "top" : -value});
			}

			scope.$watch(calculatePosition, function(newValue) {
				positionElement(newValue);
			});

			function waitForVideo() {
				if (element[0].readyState === 4) {
					positionElement(calculatePosition());
					element.css("visibility", "visible");
				}
				else {
					element.css("visibility", "hidden");
					$timeout(function() {
						waitForVideo();
					}, 50);
				}
			}
			waitForVideo();

			$window.onresize = function() {
				scope.$apply();
			};
		}

		return {
			link: link,
		};
	});
})();
