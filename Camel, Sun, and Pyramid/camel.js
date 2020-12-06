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
    ctx.fillText("전체화면 후 새로고침 하십시오.", 50, tp);
    }
    if (x < 150) {
        ctx.fillText("방향키 →를 눌러 앞으로 가십시오.", 50, tp+50);
    }

    ctx.fillStyle = "black";
    if (x > 160 && x < 1100) {
        ctx.fillText("낙타는 사막을 걷고 있습니다.", 50, tp);
    }

    if (x > 350 && x < 1100) {
        ctx.fillText("황금빛 피라미드와 붉은 태양이 보이는군요.", 50, tp+50);
    }

    if (x > 600 && x < 1100) {
        ctx.fillText("낙타는 피라미드 안에서 무엇을 발견하게 될까요?", 50, tp+100);
    }
    ctx.fillStyle = "white";
    if (x > 1255) {
        ctx.fillText("!!!", 50, tp);
    }

    ctx.font = "50px Arial";
    if (x > 1255 && x < 1770) {
        ctx.fillText("!!!", 1400, 650);
    }

    ctx.font = "30px Arial";
    if (x > 1500) {
        ctx.fillText("피라미드는 사실 삼각형일 뿐이었고, 태양은 그저 원일 뿐이었습니다.", 50, tp+50);
    }
    if (x > 1770) {
        ctx.fillText("그리고 낙타 자신도 모니터에 갇힌 평면도형이었음을 깨닫고 미쳐 날뜁니다.", 50, tp+100);
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

