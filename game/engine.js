function initialize() {

    playground = document.getElementById("playground");
    playground.height = 500;
    playground.width = 500;
    playground.style.border = "10px white solid";
    context = playground.getContext("2d");
    
    head.src = "../icons/snake_w_r.ico";
    head.style.width = "10px";
    head.style.height = "10px";
    
    img.src = "../icons/apple.png";
    img.style.width = "10px";
    img.style.height = "10px";

    fct();

}

const delay = ms => new Promise(res => setTimeout(res, ms));

const fct = async () => {
    while (true) {
        periodicWork();
        await delay(duration());
    }
};

function periodicWork() {
    displayGameOver();
    context.clearRect(0, 0, 500, 500);
    eat();
    direc();
    ourfruit();
    increment();
    draw();
    for (d = 1; d < snake.length; d++) {
        let pos = snake.length - d;
        snake[pos] = {
            p1 : snake[pos - 1].p1, 
            p2 : snake[pos - 1].p2
        };
    }
    document.getElementById("score").innerHTML = score;
    document.getElementById("level").innerHTML = level;
}

function duration() {
    if (level === 1) {
        return 100;
    } else if (level === 2) {
        return 75;
    } else if (level === 3) {
        return 50;
    } else if (level === 4) {
        return 25
    }
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
});

function direc() {
    switch (direction) {
        case "": x = x; y = 0; speedy = 0; speedx = 10;
            break;
        case "Up": speedx = 0; speedy = - scale;
            head.src = "../icons/snake_w_u.ico";
            break;
        case "Down": speedx = 0; speedy = scale;
            head.src = "../icons/snake_w_d.ico";
            break;
        case "Right": speedx = scale; speedy = 0;
            head.src = "../icons/snake_w_r.ico";
            break;
        case "Left": speedx = - scale; speedy = 0;
            head.src = "../icons/snake_w_l.ico";
            break;
    }
}


function opposite(dir) {
    switch (dir) {
        case dir = "Right": opdir = "Left";
            break
        case dir = "Left": opdir = "Right";
            break
        case dir = "Up": opdir = "Down";
            break
        case dir = "Down": opdir = "Up";
            break;
    }
}

function draw() {

    for (var s = 1; s < snake.length; s++) {
        if (snake[0].p1 === snake[s].p1 && snake[0].p2 === snake[s].p2) {
            game_over = true;
        }
    }

    if (apple == 1) {
        context.drawImage(img, appleX, appleY, 20, 20);
    }

    context.fillStyle = "lime";
    for (var k = 0; k < snake.length; k++) {
        if (k == 0) {
            context.drawImage(head, snake[k].p1 - 5, snake[k].p2 - 5,
                2 * scale,2 * scale);
        } else {
            context.fillRect(snake[k].p1, snake[k].p2, scale, scale);
        }
    }

}


function increment() {

    if(preffered != 0){
        level = preffered;
    } else if (score > 5 && score <= 10) {
        level = 2;
    } else if (score > 10 && score <= 15) {
        level = 3;
    } else if (score > 20) {
        level = 4;
    }

    x = x + speedx; y = y + speedy;
    if (level > 2) {
        playground.style.border = "solid 10px red";
        if (x < 0 || y < 0 || y == playground.height || x == playground.width) {
            game_over = true;
        }
    } else {
        playground.style.border = "solid 10px white";
        if (x == playground.width) {
            x = 0;
        }
        if (x < 0) {
            x = playground.width;
        }
        if (y == playground.height) {
            y = 0
        }
        if (y < 0) {
            y = playground.height;
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
            head.src = "../icons/snake_w_u.ico";
                break;
            case "Down":
            head.src = "../icons/snake_w_d.ico";
                break;
            case "Right":
            head.src = "../icons/snake_w_r.ico";
                break;
            case "Left":
            head.src = "../icons/snake_w_l.ico";
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

function displayGameOver() {
    if (game_over) {
        console.log("Game Over!");
        refrech()
        clearInterval(interval);
    }
}

function refrech() {
    x = 0;
    y = 0;
    fruitx = Math.floor(Math.random() * 50) * 10;
    fruity = Math.floor(Math.random() * 50) * 10;
    appleX = Math.floor(Math.random() * 50) * 10;
    appleY = Math.floor(Math.random() * 50) * 10;
    snake = [{}, { p1: 0, p2: 0 }];
    game_over = false;
    i = 1;
    eats = false;
    pause = false;
    head.src = "../icons/snake_w_r.ico";
    level = 1;
    direction = "";
    preffered = 0;
    if (current_best_score < score) {
        current_best_score = score;
        score = 0;
    } else {
        score = 0;
    }
    initialize();
}

function stagner() {
    if (!pause) {
        clearInterval(interval);
        document.getElementById("pause").src = "../icons/resume.png";
        pause = true;
    } else{
        document.getElementById("pause").src = "../icons/pause.png";
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
       case "level4" : preffered = 4;
       break;
       case "level5" : preffered = 5;
       break;
   }
}


