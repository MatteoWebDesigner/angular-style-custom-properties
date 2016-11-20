(function(){
    "use strict";
    
    angular
    .module('app', [
        'teoStyleCustomProperties'
    ])
    .config(function(){
        // agent check
        var IEversion = 0;
        try { IEversion = navigator.userAgent.match( /(MSIE |Trident.*rv[ :])([0-9]+)/ )[ 2 ]; }
        catch(e){}
        
        if (IEversion) {
            document.documentElement.classList.add('ie' + IEversion);
        }
    })
    .component('appComponent', {
        templateUrl: 'template.html',
        controller: function ($scope) {
            this.init = function () {
                this.ratio = '50%';

                this.styleFallback = {
                    width: this.ratio
                };
                
                this.style = {
                    '--size': this.ratio,
                    color: 'red'
                };
                
                this.styleCustomProperties = {
                    '--padding': '15px'
                };
                
                this.styleCustomPropertiesFallback = {
                    width: this.ratio,
                    padding: '15px'
                }
            };
            
            this.reset = function () {
                this.ratio = undefined;
                this.style = {};
                this.styleFallback = {};
                this.styleCustomProperties = {};
                this.styleCustomPropertiesFallback = {};
            };

            this.updateStyle = function () { // update reference
                this.ratio = '100%';
                
                this.style['--size'] = this.ratio;
                this.style['padding'] = '5px';

                this.styleFallback['width'] = this.ratio;
                this.styleFallback['padding'] = '5px';
                
                this.styleCustomPropertiesFallback['width'] = this.ratio;
                this.styleCustomPropertiesFallback['padding'] = '5px';
            };

            this.replaceStyle = function () { // replace reference
                this.ratio = '80%';

                this.style = {
                    '--size': this.ratio,
                    'color': 'blue',
                    'border': '1px solid black'
                }
                
                this.styleFallback = {
                    'width': this.ratio,
                    'color': 'blue',
                    'border': '1px solid black'
                }
                
                this.styleCustomPropertiesFallback = {
                    'width': this.ratio,
                    'color': 'blue',
                    'border': '1px solid black',
                    'padding': '15px'
                }
            };
            
            this.init();
        }
    });
})();