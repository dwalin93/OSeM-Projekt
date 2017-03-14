'use strict';

angular
  .module('openSenseMapApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngDialog',
    'ui-leaflet',
    'ui.bootstrap',
    'ui.checkbox',
    'ui.bootstrap.datetimepicker',
    'osemFilters',
    'angular-underscore',
    'rcWizard',
    'rcForm',
    'flow',
    'pascalprecht.translate',
    'ui.router',
    'gridshore.c3js.chart',
    'angularMoment',
    'tmh.dynamicLocale'
  ])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', '$logProvider', 'tmhDynamicLocaleProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $logProvider, tmhDynamicLocaleProvider) {
  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  tmhDynamicLocaleProvider.localeLocationPattern('translations/angular/angular-locale_{{locale}}.js');






  $stateProvider
  .state('explore', {
    url: '/',
    abstract: true,
    templateUrl: 'views/explore2.html'
  })
  .state('explore.map', {
    url: '',
    controller: 'MapCtrl',
    templateUrl: 'views/explore2.map.html'
  })
  .state('explore.map.boxdetails', {
    url: 'explore/:id', // no leading / because it is a child of the 'explore' state
    views: {
      'sidebar': {
        controller: 'SidebarBoxDetailsCtrl',
        templateUrl: 'views/explore2.sidebar.box.html'
      }
    }
  })
  .state('explore.map.filter', {
    url: 'filter',
    views: {
      'sidebar': {
        controller: 'SidebarFilterCtrl',
        templateUrl: 'views/explore2.sidebar.filter.html'
      }
    }
  })
  .state('explore.map.download', {
    url: 'download',
    views: {
      'sidebar': {
        controller: 'SidebarDownloadCtrl',
        templateUrl: 'views/explore2.sidebar.download.html'
      }
    }
  })
  .state('explore.map.interpolation', {
    url: 'interpolation',
    views: {
      'sidebar': {
        controller: 'InterpolationCtrl',
        templateUrl: 'views/explore2.sidebar.interpolation.html'
      }
    }})

  .state('explore.map.login', {
    url: 'login',
    views: {
      'sidebar': {
        controller: 'loginCtrl',
        templateUrl: 'views/explore2.sidebar.login.html',
        controllerAs: 'vm'
      }
    }})

  .state('explore.map.loginsuccess', {
    url: 'loginsuccess',
    views: {
      'sidebar': {
        controller: 'loginsuccessCtrl',
        templateUrl: 'views/explore2.sidebar.loginsuccess.html',
        controllerAs: 'vm'
      }
    }
  })

    .state('explore.map.logout',{
      url:'logout',
      views: {
        'sidebar': {
          controller: 'logoutCtrl',
          templateUrl: 'views/explore2.sidebar.logout.html',
          controllerAs: 'vm'
        }
      }
    })

  .state('profile', {
    url: '/profile',
    templateUrl: 'views/profile.html',
    controller: 'profileCtrl',
    controllerAs: 'vm'
  })
    .state('game', {
      url: '/game',
      templateUrl: 'views/game.html',
      controller: 'gameCtrl',
      controllerAs: 'vm'
  })
    .state('leaderboard', {
      url: '/leaderboard',
      templateUrl: 'views/leaderboard.html',
      controller: 'leaderboardCtrl',
      controllerAs: 'vm'
    })
    .state('account', {
      url: '/account',
      templateUrl: 'views/account.html',
      controller: 'accountCtrl',
      controllerAs: 'vm'
    })
  .state('register', {
    url: '/register',
    templateUrl: 'views/register.html',
    controller: 'RegisterCtrl'
  })
  .state('userregister', {
    url: '/userregister',
    templateUrl: 'views/userregister.html',
    controller: 'userregisterCtrl',
    controllerAs: 'vm'
  })
    .state('publicProfile', {
      url: '/publicProfile',
      templateUrl: 'views/publicProfile.html',
      controller: 'publicProfileCtrl',
      controllerAs: 'vm'
    })
  .state('info', {
    url: '/info',
    templateUrl: 'views/info.html'
  });
  }])
.config(['$translateProvider', function ($translateProvider){
  $translateProvider.useStaticFilesLoader({
    prefix: '../translations/',
    suffix: '.json'
  });
  $translateProvider.use('de_DE');
  $translateProvider.fallbackLanguage('en_US');
  $translateProvider.preferredLanguage('de_DE');
  $translateProvider.determinePreferredLanguage();
  $translateProvider.useSanitizeValueStrategy('escaped');
}])

  .filter('unsafe', ['$sce', function($sce){
    return function (val) {
      return $sce.trustAsHtml(val);
    };
  }])

  .factory('FilterActiveService', function(){
    return { active: false };
  });


