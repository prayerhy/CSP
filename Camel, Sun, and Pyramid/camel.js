// Define my canvas
var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var img = document.getElementById("sprite");
var img2 = document.getElementById("inverted");
c.width = window.innerWidth;
c.height = window.innerHeight;

window.addEventListener('resize', function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
})


// Walking Camel Variables
// Define the number of columns and rows in the sprite
var numColumns = 3;
var numRows = 2;
// Define the size of a frame
var frameWidth = 2835 / numColumns;
var frameHeight = 1617 / numRows;
// The sprite image frame starts from 0;
var currentFrame = 0;
var x=0;
var y=720;
var dx=10;
var dy=10;
var z=0;

window.onload = function() {
    document.addEventListener('keydown', function(event) {
        if (event.keyCode == '39') {
            if ((x < c.width) && (x + 400 < 1500)) {
                x = x + 1.5;
            } else {
                if (x <= c.width -150) {
                x = x + 1.5;
                }
            }
        }
    })
}

class Aftermove {
    constructor() {
        this.x = x;
        this.y = y;
        this.z = z;
        this.dx = dx;
        this.dy = dy;
    }

    go() {
        this.x = x;

        if (this.x+this.z > 1770 || this.x+this.z < 0) {
            this.dx = -this.dx;
        }
        if (this.y>(c.height-150) || this.y < 0) {
            this.dy = -this.dy;
        }

        if (this.x > 1770) {
            this.z += this.dx;
            this.y += this.dy;
        }
        if(this.x>1770){
            ctx.drawImage(inverted,this.x+this.z,this.y,150,150);
        }
        console.log(this.z);
        console.log(this.x);
    }
}
var rect = new Aftermove;

// Pyramid Variables
var tp = 885 - (600*Math.cos(Math.PI/6));


// Class Camel
class Camel {
    constructor(x) {
        this.x = x;
        this.y = y;
        this.dx = 10;
        this.dy = 10;
        this.z = 0;
        this.currentFrame = currentFrame;
    }

    //Make movements
    move() {
        this.currentFrame++;
        this.x = x;
        this.y = 720;
        this.dx = 10;
        this.dy = 10;
        this.z = 0;
        console.log(this.x);

        var maxFrame = numColumns * numRows - 1;
        if (this.currentFrame > maxFrame) {
            this.currentFrame = 0;
        }
        var column = currentFrame % numColumns;
        var row = Math.floor(currentFrame / numColumns);

        ctx.clearRect(0, 0, innerWidth, innerHeight);
        if (this.x + 250 < 1500) {
            ctx.drawImage(img, column * frameWidth, row * frameHeight, frameWidth, frameHeight, this.x+this.z, this.y, frameWidth / 5, frameHeight / 5);
        } else {
            document.getElementById('canvas').style.backgroundImage="none";
            document.getElementById('body').style.backgroundImage="none";
            document.getElementById('canvas').style.backgroundColor="black";
            if (this.x <1770){
            ctx.drawImage(inverted,this.x+this.z,this.y,150,150);
            }
        }
    }
}
var sheep = new Camel;

// Pyramid
class Pyramid {
    constructor(x, y) {
        this.x = 1600;
        this.y = y;
    }

    loc() {
        ctx.beginPath();
        ctx.moveTo(900, 885);
        ctx.lineTo(1500, 885);
        ctx.lineTo(1200, tp);
        ctx.lineTo(900, 885);
        ctx.closePath();
        ctx.fillStyle = "gold";
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(1200, tp);
        ctx.lineTo(900, 885);
        ctx.lineTo(1100, 885);
        if (x+250<1500) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        } else {
            if (x+250>1500) {
                ctx.fillStyle = 'gold';
            }
        }
        ctx.fill();
    }
}
var pyramid = new Pyramid;


class Sun {
    constructor() {
        this.x = c.width - 200;
        this.y = 150;
        this.radius = 100;
    }

    loc() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
}
var sun = new Sun;

// Text
function text() {
    ctx.font = "30px Arial";

    if (x < 150) {
    ctx.fillText("Full screen, and press F5", 50, tp);
    }
    if (x < 150) {
        ctx.fillText("Press your arrow key to go ahead", 50, tp+50);
    }

    ctx.font = "30px Vernada";
    ctx.fillStyle = "black";
    if (x > 160 && x < 1100) {
        ctx.fillText("A camel is walking on a desert.", 50, tp);
    }

    if (x > 350 && x < 1100) {
        ctx.fillText("There is a golden pyramid, and the red Sun.", 50, tp+50);
    }

    if (x > 600 && x < 1100) {
        ctx.fillText("What would the camel find inside the pyramid?", 50, tp+100);
    }
    ctx.fillStyle = "white";
    ctx.font = "50px Vernada";
    if (x > 1255 && x < 1770) {
        ctx.fillText("!!!", 1400, 650);
    }

    ctx.font = "30px Vernada";
    if (x > 1500) {
        ctx.fillText("Actually, the pyramid was just a triangle, and the Sun a circle.", 50, tp);
    }
    if (x > 1770) {
        ctx.fillText("Finally the camel have realized that he is also just a photo on a screen.", 50, tp+50);
    }
}


// Animation
setInterval(sheep.move,250);

function animate() {
requestAnimationFrame(animate);
pyramid.loc();
sun.loc();
rect.go();
text();
}
animate();

