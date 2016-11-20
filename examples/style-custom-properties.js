(function(){
    "use strict";
    
    var supportCSSCustomProperties = window.CSS && CSS.supports('color', 'var(--is-supported)');
    
    function forIn (obj, fn) {
        for (var prop in obj) {
            fn(obj[prop],prop);
        }
    }
    
    function cssCustomProperties(elm, css) {
        forIn(css, function(value, prop) {
            if (value !== undefined) {
                elm.style.setProperty(prop, value);
            } else {
                elm.style.removeProperty(prop);
            }
        });
    }
    
    angular
        .module('teoStyleCustomProperties', [])
        .directive('teoStyle', function() {
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
                        
                        // reset style
                        element.attr('style','');

                        // process: scope.teoStyle
                        // push properties to CSSproperties or to CSScustomProperties
                        if ( scope.teoStyle ) {
                            forIn(scope.teoStyle, function(value, key) {
                                if ( key.substring(0,2) == '--' ) {
                                    CSScustomProperties[key] = value;
                                } else {
                                    CSSproperties[key] = value;
                                }
                            });
                        }

                        // process: scope.teoStyleCustomPropertiesFallback
                        if ( scope.teoStyleCustomPropertiesFallback && !supportCSSCustomProperties ) {
                            Object.assign(CSSproperties,scope.teoStyleCustomPropertiesFallback)
                        }

                        // process: scope.teoStyleCustomProperties
                        // merge into CSScustomProperties 
                        if ( scope.teoStyleCustomProperties && supportCSSCustomProperties ) {
                            Object.assign(CSScustomProperties,scope.teoStyleCustomProperties)
                        }
                        
                        // DOM add inline css custom properties
                        if ( supportCSSCustomProperties ) {
                            cssCustomProperties(element[0], CSScustomProperties);
                        }
                        
                        // DOM add inline style
                        element.css(CSSproperties);
                    }
                    
                    init();

                    // listen for changes
                    scope.$watch('teoStyle', function(newStyles, oldStyles) {
                        if (newStyles !== oldStyles) {
                            init();
                        }
                    },true);
                    
                    scope.$watch('teoStyleCustomPropertiesFallback', function(newStyles, oldStyles) {
                        if (newStyles !== oldStyles) {
                            init();
                        }   
                    },true);
                    
                    scope.$watch('teoStyleCustomProperties', function(newStyles, oldStyles) {
                        if (newStyles !== oldStyles) {
                            init();
                        }
                    }, true);
                    
                }
            };
        });
})();