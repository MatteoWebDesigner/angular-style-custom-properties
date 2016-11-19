angular
.module('app', [
    'teoStyleCustomProperties'
])
.component('appComponent', {
    templateUrl: 'template.html',
    controller: class appComponent {
        constructor () {
            this.init();
        }
        
        init () {
            this.ratio = '50%';

            this.styleFallback = {
                width: this.ratio
            }

            this.style = {
                '--ciao': this.ratio,
                color: 'red'
            }
        }

        updateStyle () { // update reference
            this.ratio = '100%';

            this.styleFallback['width'] = this.ratio;
            this.styleFallback['color'] = 'blue';
            this.styleFallback['border'] = '1px solid black';

            this.style['--ciao'] = this.ratio;
            this.style['color'] = 'blue';
            this.style['border'] = '1px solid black';
        }

        replaceStyle () { // replace reference
            this.ratio = '80%';

            this.styleFallback = {
                'width': this.ratio,
                'color': 'blue',
                'border': '1px solid black'
            }

            this.style = {
                '--ciao': this.ratio,
                'color': 'blue',
                'border': '1px solid black'
            }
        }

    }
});