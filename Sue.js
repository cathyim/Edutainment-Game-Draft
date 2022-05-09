// namespace our game
var Sue = {

    // set up some initial values
    WIDTH: 320,
    HEIGHT:  480,
    // we'll set the rest of these
    // in the init function
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,

    init: function() {

        // the proportion of width to height
        Sue.RATIO = Sue.WIDTH / Sue.HEIGHT;
        // these will change when the screen is resized
        Sue.currentWidth = Sue.WIDTH;
        Sue.currentHeight = Sue.HEIGHT;
        // this is our canvas element
        Sue.canvas = document.getElementsByTagName('canvas')[0];
        // setting this is important
        // otherwise the browser will
        // default to 320 x 200
        Sue.canvas.width = Sue.WIDTH;
        Sue.canvas.height = Sue.HEIGHT;
        // the canvas context enables us to
        // interact with the canvas api
        Sue.ctx = Sue.canvas.getContext('2d');

        Sue.ua = navigator.userAgent.toLowerCase();
        Sue.android = Sue.ua.indexOf('android') > -1 ? true : false;
        Sue.ios = ( Sue.ua.indexOf('iphone') > -1 || Sue.ua.indexOf('ipad') > -1  ) ?
        true : false;




        // we're ready to resize
        Sue.resize();
        Sue.Draw.clear();
        Sue.Draw.rect(120,120,150,150, 'green');
        Sue.Draw.circle(100, 100, 50, 'rgba(255,0,0,0.5)');
        Sue.Draw.text('Hello World', 100, 100, 10, '#000');


        window.addEventListener('click', function(e) {
            e.preventDefault();
            Sue.Input.set(e);
        }, false);
        
        // listen for touches
        window.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // the event object has an array
            // named touches; we just want
            // the first touch
            Sue.Input.set(e.touches[0]);
        }, false);
        window.addEventListener('touchmove', function(e) {
            // we're not interested in this,
            // but prevent default behaviour
            // so the screen doesn't scroll
            // or zoom
            e.preventDefault();
        }, false);
        window.addEventListener('touchend', function(e) {
            // as above
            e.preventDefault();
        }, false);



        this.x = (data.pageX - Sue.offset.left) / Sue.scale;
        this.y = (data.pageY - Sue.offset.top) / Sue.scale;
        




    },

    resize: function() {

        Sue.currentHeight = window.innerHeight;
        // resize the width in proportion
        // to the new height
        Sue.currentWidth = Sue.currentHeight * Sue.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll past
        // the address bar, thus hiding it.
        if (Sue.android || Sue.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width and height
        // note: our canvas is still 320 x 480, but
        // we're essentially scaling it with CSS
        Sue.canvas.style.width = Sue.currentWidth + 'px';
        Sue.canvas.style.height = Sue.currentHeight + 'px';

        // we use a timeout here because some mobile
        // browsers don't fire if there is not
        // a short delay
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);



        if (Sue.android || Sue.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }



        Sue.scale = Sue.currentWidth / Sue.WIDTH;
        Sue.offset.top = Sue.canvas.offsetTop;
        Sue.offset.left = Sue.canvas.offsetLeft;
    }

};


var offsetTop = Sue.canvas.offsetTop,
    offsetLeft = Sue.canvas.offsetLeft;
    scale = Sue.currentWidth / Sue.WIDTH;

this.x = ( data.pageX - offsetLeft ) / scale;
this.y = ( data.pageY - offsetTop ) / scale;
scale:  1,
offset = {top: 0, left: 0},





Sue.Draw = {

    clear: function() {
        Sue.ctx.clearRect(0, 0, Sue.WIDTH, Sue.HEIGHT);
    },

    rect: function(x, y, w, h, col) {
        Sue.ctx.fillStyle = col;
        Sue.ctx.fillRect(x, y, w, h);
    },

    circle: function(x, y, r, col) {
        Sue.ctx.fillStyle = col;
        Sue.ctx.beginPath();
        Sue.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        Sue.ctx.closePath();
        Sue.ctx.fill();
    },

    text: function(string, x, y, size, col) {
        Sue.ctx.font = 'bold '+size+'px Monospace';
        Sue.ctx.fillStyle = col;
        Sue.ctx.fillText(string, x, y);
    }

};



Sue.Input = {

    x: 0,
    y: 0,
    tapped :false,

    set: function(data) {
        this.x = data.pageX;
        this.y = data.pageY;
        this.tapped = true;

        Sue.Draw.circle(this.x, this.y, 10, 'red');
    }

};




// https://paulirish.com/2011/requestanimationframe-for-smart-animating
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();














SUe.Touch = function(x, y) {

    this.type = 'tap';    
    this.x = x;         
    this.y = y;             
    this.r = 5;            
    this.opacity = 1;       
    this.fade = 0.05;       
    this.remove = false;    

    this.update = function() {
        // reduce the opacity accordingly
        this.opacity -= this.fade;
        // if opacity if 0 or less, flag for removal
        this.remove = (this.opacity < 0) ? true : false;
    };

    this.render = function() {
        Sue.Draw.circle(this.x, this.y, this.r, 'rgba(255,0,0,'+this.opacity+')');
    };

};








window.addEventListener('load', Sue.init, false);
window.addEventListener('resize', Sue.resize, false);

