var fps = 1000 / 60;
var mouse = new Point();
var cow = new cow_tiger();
var click = false;

var w = $('.wrapper').width();
var h = $('.wrapper').height();
console.log(w, h);
$('#myCanvas').attr('width', w);
$('#myCanvas').attr('height', h);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener('mousemove', mouseMove, true);
canvas.addEventListener('mousedown', mouseDown, true);

randomizeCow(cow);

setInterval(draw, fps);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    drawtext();
    ctx.closePath();
}

function drawtext() {
    ctx.font = cow.scaletext[cow.scale];
    ctx.fillStyle = '#404040';
    ctx.textBaseline = 'center';
    ctx.textAlign = 'center';
    ctx.fillText(cow.text, cow.x, cow.y);
}

function mouseMove(event) {
    mouse.x = event.clientX - canvas.offsetLeft;
    mouse.y = event.clientY - canvas.offsetTop;
}

function mouseDown(event) {
    click = true;
}

function getRandom(scale) {
    return Math.random() * scale;
}

function randomizeCow(cows) {
    cows.x = getRandom(canvas.width);
    cows.y = getRandom(canvas.height);
    cows.vx = getRandom(1);
    cows.vy = Math.sqrt(1 - Math.pow(cows.vx, 2));
}