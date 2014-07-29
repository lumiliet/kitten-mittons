var app = angular.module( 'app', [
	'ui.router',
	'ngAnimate',
	'ng-context-menu',
	'dialogs.main'
]);
app.controller('appController', function(model) {
	$scope.application = model.application;
});
app.config( function ( $stateProvider) {
	$stateProvider.state('base', {
		controller: "mainController",
		templateUrl: "app/views/main/main.tpl.html"
	}).state('standard', {
		parent: 'base',
		views: {
			"view1": {
				controller: "chatHistoryController",
				templateUrl: "app/views/chatHistory/chatHistory.tpl.html"
			},
			"view3": {
				controller: "friendsController",
				templateUrl: "app/views/friends/friends.tpl.html"
			},
		}
	}).state('chat', {
		parent: 'standard',
		views: {
			"view2@base": {
				controller: "chatController",
				templateUrl: "app/views/chat/chat.tpl.html"
			},
		}
	}).state('conference', {
		parent: 'standard',
		views: {

		}
	}).state('conference.fullscreen', {
		parent: 'standard',
		views: {

		}
	}).state('call', {
		parent: "base",
		views: {
			"view2@base": {
				controller: "videoActiveController",
				templateUrl: "app/views/video/videoActive.tpl.html"
			},
		}
	});
});

app.run( function (init) {
	init.init();
});
