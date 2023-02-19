let x = 0;
let y = 0;
let scale = 10;
let direction = "";
let speedx = 10;
let speedy = 10;
let fruitx = Math.floor(Math.random() * 50) * 10;
let fruity = Math.floor(Math.random() * 50) * 10;
let snake = [{}, { p1: 0, p2: 0 }];
let i = 1;
let eats = false;
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let gameover = false;
let formaldir = "";
let opdir = "";
let str = "";
let local_dir = "";
let score = 0;
let apple = Math.floor(Math.random() * 1) + 1;
let appletail = 0;
var level = 1;
var appleX = Math.floor(Math.random() * 50) * 10;
var appleY = Math.floor(Math.random() * 50) * 10;
let appleEaten = false;
let pass = false;
let head = new Image();
let interval;
let current_best_score = 0;
let pause = false;
let preffered = 0;
head.src = "icons/snake_w_r.ico";
head.style.width = "10px";
head.style.height = "10px";


let img = new Image();
img.src = "icons/apple.png";
img.style.width = "10px";
img.style.height = "10px";



let time = 1000;



canvas.setAttribute("width", "500");
canvas.setAttribute("height", "500");
canvas.style.background = "gray";
document.getElementsByTagName("body")[0].appendChild(canvas);


function initialize() {
    interval = setInterval(function () {
        gameOver();
        context.clearRect(0, 0, 500, 500);
        eat();
        direc();
        ourfruit();
        increment();
        draw();
        for (d = 1; d < snake.length; d++) {
            snake[snake.length - 1 - (d - 1)].p1 = snake[snake.length - 1 - (d - 1) - 1].p1;
            snake[snake.length - 1 - (d - 1)].p2 = snake[snake.length - 1 - (d - 1) - 1].p2;
        }
        document.getElementById("score").innerHTML = score;
        document.getElementById("lev").innerHTML = level;
        document.getElementById("score1").innerHTML = score;
        document.getElementById("lev1").innerHTML = level;
        check();
    }, 10);
}
initialize();

function check() {
    if (level === 1) {
        var time = 200 + new Date().getTime();
        while (new Date() < time) { }
    } else if (level === 2) {
        var time = 100 + new Date().getTime();
        while (new Date() < time) { }
    } else if (level === 3) {
        var time = 50 + new Date().getTime();
        while (new Date() < time) { }
    } else if (level === 4) {
        var time = 20 + new Date().getTime();
        while (new Date() < time) { }
    } else if (level === 4) { }
}

document.addEventListener("keydown", function changedir(key) {
    if(key.code == "Space"){

        stagner();

    } else if(key.key.slice(0, 5) == "Arrow"){
        local_dir = key.key.replace("Arrow", "");
        if (local_dir !== opdir) {
            direction = local_dir;
        } else {
            return;
        }
        opposite(local_dir);
    } else {
        return
    }
}
);


function direc() {
    switch (direction) {
        case "": x = x; y = 0; speedy = 0; speedx = 10;
            break;
        case "Up": speedx = 0; speedy = - scale;
                head.src = "icons/snake_w_u.ico";
            break;
        case "Down": speedx = 0; speedy = scale;
        head.src = "icons/snake_w_d.ico";
            break;
        case "Right": speedx = scale; speedy = 0;
        head.src = "icons/snake_w_r.ico";
            break;
        case "Left": speedx = - scale; speedy = 0;
        head.src = "icons/snake_w_l.ico";
            break;
    }
}


function opposite(fdir) {
    switch (fdir) {
        case fdir = "Right": opdir = "Left";
            break
        case fdir = "Left": opdir = "Right";
            break
        case fdir = "Up": opdir = "Down";
            break
        case fdir = "Down": opdir = "Up";
            break;
    }
}

function draw() {

    for (var s = 1; s < snake.length; s++) {
        if (snake[0].p1 === snake[s].p1 && snake[0].p2 === snake[s].p2) {
            gameover = true;
        }
    }

    if (apple == 1) {
        context.drawImage(img, appleX, appleY);
    }

    context.fillStyle = "lime";
    for (var k = 0; k < snake.length; k++) {
        if (k == 0) {
            context.drawImage(head, snake[k].p1 - 5, snake[k].p2 - 5, 20, 20);
        } else {
            context.fillRect(snake[k].p1, snake[k].p2, scale, scale);
        }
    }

}


function increment() {
    if(preffered != 0){
        level = preffered;
    } else if (score > 5 && score <= 20) {
        level = 2;
    } else if (score > 20 && score <= 40) {
        level = 3;
    } else if (score > 40) {
        level = 4;
    }

    x = x + speedx; y = y + speedy;
    if (level > 2) {
        canvas.style.border = "solid 5px red";
        if (x < 0 || y < 0 || y == canvas.height || x == canvas.width) {
            gameover = true;
        }
    } else {
        canvas.style.border = "solid 3px black";
        if (x == canvas.width) {
            x = 0;
        }
        if (x < 0) {
            x = canvas.width;
        }
        if (y == canvas.height) {
            y = 0
        }
        if (y < 0) {
            y = canvas.height;
        }
    }
    if (eats) {
        if (appletail == 1) {
            snake[i] = { p1: appleX, p2: appleY };
            appletail = 0;
        } else if (appletail == 2) {
            snake[i] = { p1: appleX + scale, p2: appleY };
            appletail = 0;
        } else if (appletail == 3) {
            snake[i] = { p1: appleX, p2: appleY + scale };
            appletail = 0;
        } else if (appletail == 4) {
            snake[i] = { p1: appleX + scale, p2: appleY + scale };
            appletail = 0;
        } else {
            snake[i] = { p1: fruitx, p2: fruity };
            fruitx = Math.floor(Math.random() * 50) * 10;
            fruity = Math.floor(Math.random() * 50) * 10;
            if (apple != 1) {
                apple = Math.floor(Math.random() * 5) + 1;
            }
        }
        if (appleEaten) {
            apple = Math.floor(Math.random() * 5) + 1;
            appleX = Math.floor(Math.random() * 50) * 10;
            appleY = Math.floor(Math.random() * 50) * 10;
            appleEaten = false;
        }
        eats = false;
    }

    snake[0] = { p1: x, p2: y };
}
function eat() {
    if (apple == 1) {
        if (x === appleX && y === appleY) {
            i++;
            appletail = 1;
            appleEaten = true;
            eats = true;
            score = score + 3;
        } else if (x === appleX + scale && y === appleY) {
            i++;
            appletail = 2;
            appleEaten = true;
            eats = true;
            score = score + 3;
        } else if (x === appleX && y === appleY + scale) {
            i++;
            appletail = 3;
            appleEaten = true;
            eats = true;
            score = score + 3;
        } else if (x === appleX + scale && y === appleY + scale) {
            i++;
            appletail = 4;
            appleEaten = true;
            eats = true;
            score = score + 3;
        } else if (x === fruitx && y === fruity) {
            score++;
            i++;
            eats = true;
        }
    } else if (x === fruitx && y === fruity) {
        switch (direction) {
            case "Up":
            head.src = "icons/snake_w_u.ico";
                break;
            case "Down":
            head.src = "icons/snake_w_d.ico";
                break;
            case "Right":
            head.src = "icons/snake_w_r.ico";
                break;
            case "Left":
            head.src = "icons/snake_w_l.ico";
                break;
        }
        score++;
        i++;
        eats = true;
    }
}

function ourfruit() {
    context.fillStyle = "red";
    context.fillRect(fruitx, fruity, scale, scale);
}

function gameOver() {
    if (gameover) {
        document.getElementById("Game_over").style.visibility = "visible";
        document.getElementById("Game_over").style.maxHeight = "100%";
        document.getElementById("holder").style.background = "rgba(0, 0, 0, 0.5)";
        clearInterval(interval);
        if (pass) {
            pass = false;
        }
    }
}

function rename() {
    document.getElementById("Game_over").style.maxHeight = "0%";
    document.getElementById("Game_over").style.visibility = "hidden";
    document.getElementById("holder").style.background = "rgba(0, 0, 0, 0)";
    x = 0;
    y = 0;
    fruitx = Math.floor(Math.random() * 50) * 10;
    fruity = Math.floor(Math.random() * 50) * 10;
    appleX = Math.floor(Math.random() * 50) * 10;
    appleY = Math.floor(Math.random() * 50) * 10;
    snake = [{}, { p1: 0, p2: 0 }];
    gameover = false;
    i = 1;
    eats = false;
    pause = false;
    head.src = "icons/snake_w_r.ico";
    level = 1;
    direction = "";
    preffered = 0;
    if (current_best_score < score) {
        current_best_score = score;
        score = 0;
        document.getElementById("best").innerHTML = current_best_score;
        document.getElementById("best1").innerHTML = current_best_score;
    } else {
        score = 0;
        document.getElementById("best").innerHTML = current_best_score;
        document.getElementById("best1").innerHTML = current_best_score;
    }
    initialize();
}
function stagner() {
    if (!pause) {
        clearInterval(interval);
        document.getElementById("pause").src = "icons/resume.png";
        pause = true;
    } else{
        document.getElementById("pause").src = "icons/pause.png";
        initialize();
        pause = false;
    }
}
function changelev(select){
   switch(select.options[select.selectedIndex].value){
       case "level1":  preffered = 1;
       break;
       case "level2" : preffered = 2;
       break;
       case "level3" : preffered = 3;
       break;
       case "level4"  : preffered = 4;
       break; 
       case "level5" : preffered = 5;
       break;
   }
}