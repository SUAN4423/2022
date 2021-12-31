var fps = 1000 / 60;
var mouse = new Point();
var cow = new Array(new cow_tiger());
var click = false;
var clicked = false;
var ed = false;
var used = false;
var size = 300;
var cowSay = new Array(new Audio("say1.ogg"), new Audio("say2.ogg"), new Audio("say3.ogg"), new Audio("say4.ogg"));

var w = $('.wrapper').width();
var h = $('.wrapper').height();
console.log(w, h);
$('#myCanvas').attr('width', w);
$('#myCanvas').attr('height', h);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener('mousemove', mouseMove, true);
canvas.addEventListener('mousedown', mouseDown, true);
canvas.addEventListener('mouseup', mouseUp, true);
canvas.addEventListener('touchstart', touchStart, true);
canvas.addEventListener('touchend', touchEnd, true);

while (true) {
    ctx.font = size + 'px serif';
    ctx.fillStyle = '#404040';
    ctx.textBaseline = 'center';
    ctx.textAlign = 'center';
    var swidth = strWidth("HAPPY NEW YEAR R4");
    if (swidth <= canvas.width) {
        break;
    }
    size = size - 1;
}

randomizeCow(cow[0], true);

setInterval(draw, fps);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    drawtext();
    drawNewYear();
    ctx.closePath();
}

function strWidth(str) {
    var metrics = ctx.measureText(str);
    return metrics.width;
}

function drawNewYear() {
    ctx.arc(mouse.x, mouse.y, 10, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    ctx.fillStyle = "rgba(255,0,0,0.8)";
    ctx.fill();
    ctx.stroke();

    if (cow.length == 32) {
        ctx.font = size + 'px serif';
        ctx.fillStyle = '#404040';
        ctx.textBaseline = 'center';
        ctx.textAlign = 'center';

        ctx.fillText("HAPPY NEW YEAR R4", canvas.width / 2, canvas.height / 2);
    }
}

function drawtext() {
    console.log(click, clicked, ed);
    cow.forEach(function(c) {
        ctx.font = c.scaletext[c.scale];
        ctx.fillStyle = '#404040';
        ctx.textBaseline = 'center';
        ctx.textAlign = 'center';
        ctx.fillText(c.text, c.x, c.y);
        moveCow(c);
        if (click && !clicked && !ed) {
            if (checkClick(c)) {
                ed = true;
                c.scale = c.scale - 1;
                randomizeCow(c, false);
                if (c.scale == 0) {
                    c.text = c.tiger;
                }
                if (c.scale < 0) {
                    c.scale = 0;
                } else {
                    var ctemp = new cow_tiger();
                    ctemp.scale = c.scale;
                    ctemp.text = c.text;
                    ctemp.x = c.x;
                    ctemp.y = c.y;
                    randomizeCow(ctemp, false);
                    cow.push(ctemp);
                    sayCow();
                }
            }
        }
    });
    clicked = click;
    if (used) {
        click = false;
        ed = false;
        used = false;
    }
    used = true;
}

function sayCow() {
    var sayNo = Math.floor(getRandom(4));
    cowSay[sayNo].currentTime = 0;
    cowSay[sayNo].play();
}

function checkClick(cows) {
    return calcDistance(cows) < (30 + 30 * cows.scale);
}

function calcDistance(cows) {
    return Math.sqrt(Math.pow(cows.x - mouse.x, 2) + Math.pow(cows.y - mouse.y, 2));
}

function mouseMove(event) {
    mouse.x = event.clientX - canvas.offsetLeft;
    mouse.y = event.clientY - canvas.offsetTop;
}

function touchStart(event) {
    mouse.x = event.changedTouches[0].pageX - canvas.offsetLeft;
    mouse.y = event.changedTouches[0].pageY - canvas.offsetTop;
    click = true;
    used = false;
}

function touchEnd(event) {
    if (used) {
        click = false;
        ed = false;
    }
    used = false;
}

function mouseDown(event) {
    click = true;
    used = true;
}

function mouseUp(event) {
    click = false;
    ed = false;
    used = false;
}

function getRandom(scale) {
    return Math.random() * scale;
}

function randomizeCow(cows, locate) {
    if (locate) {
        cows.x = getRandom(canvas.width);
        cows.y = getRandom(canvas.height);
    }
    cows.vx = getRandom(1);
    cows.vy = Math.sqrt(1 - Math.pow(cows.vx, 2));
    if (getRandom(1) < 0.5) {
        cows.vx = -cows.vx;
    }
    if (getRandom(1) < 0.5) {
        cows.vy = -cows.vy;
    }
}

function moveCow(cows) {
    cows.x += cows.vx * (cows.scale + 1);
    cows.y += cows.vy * (cows.scale + 1);
    if (cows.x < 0) {
        cows.vx = Math.abs(cows.vx);
    }
    if (cows.x > canvas.width) {
        cows.vx = -Math.abs(cows.vx);
    }
    if (cows.y < 0) {
        cows.vy = Math.abs(cows.vy);
    }
    if (cows.y > canvas.height) {
        cows.vy = -Math.abs(cows.vy);
    }
}