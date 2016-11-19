angular
.module('app', [
    'teoStyleCustomProperties'
])
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
        };
        
        this.reset = function () {
            this.ratio = undefined;
            this.styleFallback = {};
            this.styleCustomProperties = {};
            this.style = {};
        };

        this.updateStyle = function () { // update reference
            this.ratio = '100%';

            this.styleFallback['width'] = this.ratio;
            this.styleFallback['color'] = 'blue';
            this.styleFallback['border'] = '1px solid black';

            this.style['--size'] = this.ratio;
            this.style['color'] = 'blue';
            this.style['border'] = '1px solid black';
        };

        this.replaceStyle = function () { // replace reference
            this.ratio = '80%';

            this.styleFallback = {
                'width': this.ratio,
                'color': 'blue',
                'border': '1px solid black'
            }

            this.style = {
                '--size': this.ratio,
                'color': 'blue',
                'border': '1px solid black'
            }
        };
        
        this.init();
    }
});