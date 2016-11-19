(function(){
    "use strict";
    
    angular
        .module('teoStyleCustomProperties', [])
        .directive('teoStyle', function() {

            function supportCSSCustomProperties() {
                return window.CSS && CSS.supports('color', 'var(--is-supported)');
            }

            function cssCustomProperties(elm, css) {
                _.forIn(css, function(value, prop) {
                    elm.style.setProperty(prop, value);
                });
            }

            return {
                restrict: 'A',
                scope: {
                    teoStyle: '=',
                    teoStyleCustomPropertiesFallback: '=',
                    teoStyleCustomProperties: '='
                },
                link: function(scope, element, attrs) {
                    function init (){
                        var CSSproperties = {};
                        var CSScustomProperties = {};

                        // process: scope.teoStyle
                        // push properties to CSSproperties or to CSScustomProperties
                        if (!_.isEmpty(scope.teoStyle)) {
                            _.forIn(scope.teoStyle, function(value, key) {
                                if (_.startsWith(key, '--')) {
                                    CSScustomProperties[key] = value;
                                } else {
                                    CSSproperties[key] = value;
                                }
                            });
                        }

                        // process: scope.teoStyleCustomPropertiesFallback
                        if (!_.isEmpty(scope.teoStyleCustomPropertiesFallback && !supportCSSCustomProperties())) {
                            _.merge(CSSproperties, scope.teoStyleCustomPropertiesFallback);
                        }

                        // process: scope.teoStyleCustomProperties
                        // merge into CSScustomProperties 
                        if (!_.isEmpty(scope.teoStyleCustomProperties)) {
                            _.merge(CSScustomProperties, scope.teoStyleCustomProperties);
                        }
                        
                        // DOM add inline css custom properties
                        if (supportCSSCustomProperties()) {
                            cssCustomProperties(element[0], CSScustomProperties);
                        }
                        
                        // DOM add inline style
                        element.css(CSSproperties);
                    }
                    
                    init();

                    // listen for changes
                    scope.$watch('teoStyle', function(newValue, oldValue) {
                        if (newValue) {
                            init();
                        }    
                    });
                    
                    scope.$watch('teoStyleCustomPropertiesFallback', function(newValue, oldValue) {
                        if (newValue) {
                            init();
                        }    
                    });
                    
                    scope.$watch('teoStyleCustomProperties', function(newValue, oldValue) {
                        if (newValue) {
                            init();
                        }    
                    });
                    
                }
            };
        });
})();