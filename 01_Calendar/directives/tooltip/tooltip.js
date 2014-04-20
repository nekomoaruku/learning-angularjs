'use strict';

angular.module('mgcrea.ngStrap.tooltip', ['mgcrea.ngStrap.helpers.dimensions'])

  .provider('$tooltip', function() {

    var defaults = this.defaults = {
      animation: 'am-fade',
      prefixClass: 'tooltip',
      prefixEvent: 'tooltip',
      container: false,
      placement: 'top',
      template: 'tooltip/tooltip.tpl.html',
      contentTemplate: false,
      trigger: 'hover focus',
      keyboard: false,
      html: false,
      show: false,
      title: '',
      type: '',
      delay: 0
    };

    this.$get = function($window, $rootScope, $compile, $q, $templateCache, $http, $animate, $timeout, demensions, $$rAF) {

      var trim = String.prototype.trim;
      var isTouch = 'createTouch' in $window.document;
      var htmlReplaceRegExp = /ng-bind="/ig;

      function TooltipFactory(element, config) {

        var $tooltip = {};

        // Common vars
        var options = $tooltip.$options = angular.extend({}, defaults, config);
        $tooltip.$promise = fetchTemplate(options.template);
        var scope = $tooltip.$scope = options.scope && options.scope.$new() || $rootScope.$new();
        if (options.delay && angular.isString(options.delay)) {
          options.delay = parseFloat(options.delay);
        }

        // Support scope as string options
        if (options.title) {
          $tooltip.$scope.title = options.title;
        }

        // Provide scope helpers
        scope.$hide = function() {
          scope.$$postDigest(function() {
            $tooltip.hide();
          });
        };
        scope.$show = function() {
          scope.$$postDigest(function() {
            $tooltip.show();
          });
        };
        scope.$toggle = function() {
          scope.$$postDigest(function() {
            $tooltip.toggle();
          });
        };
        $tooltip.$isShown = scope.$isShown = false;

        // Private vars
        var timeout, hoverState;

        // Support contentTemplate option
        if (options.contentTemplate) {
          $tooltip.$promise = $tooltip.$promise.then(function(template) {
            var templateEl = angular.element(template);
            return fetchTemplate(options.contentTemplate)
              .then(function(contentTemplate) {
                var contentEl = findElement('[ng-bind="content"]', templateEl[0]);
                if (!contentEl.length) contentEl = findElement('[ng-bind="content"]', templateEl[0]);
                contentEl.removeAttr('ng-bind').html(contentTemplate);
                return templateEl[0].outerHTML;
              });
          })
        }

        // Fetch, compile then initialize tooltip
        var tipLinker, tipElment, tipTemplate, tipContainer;
        $tooltip.$promise.then(function(template) {
          if (angular.isObject(template)) template = template.data;
          if (options.html) template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
          template = trim.apply(template);
          tipTemplate = template;
          tipLinker = $compile(template);
          $tooltip.init();

        });

        $tooltip.init = function() {

          // Options: delay
          if (options.delay && angular.isNumber(options.delay)) {
            options.delay = {
              show: options.delay,
              hide: options.delay
            };
          }

          // Options: container
          if (options.container === 'self') {
            tipContainer = element;
          } else if (options.container) {
            tipContainer = findElement(options.container);
          }

          // Options: trigger



        };


        function findElement(query, element) {
          return angular.element((element || document).querySelectorAll(query));
        }

        function fetchTemplate(template) {
          return $q.when($templateCache.get(template) || $http.get(template))
            .then(function(res) {
              if(angular.isObject(res)) {
                $templateCache.put(template, res.data);
                return res.data;
              }
              return res;
            });
        }
      }

    }

  });




















