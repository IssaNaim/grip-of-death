import {Character} from "./classesoffline.js";
import {time} from "./timeroffline.js";
import {spriteAnimationBack1, spriteAnimationBack2, spriteAnimationBack3} from "./utils.js";
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
const cWidth = canvas.width = 1125;
const cHeight = canvas.height = 400;
const staggerFrames = 10;
let gameFrame = 0;
let backgroundImage = new Image();
let back1 = new Image();
back1.src = "/images/stages/stage1.png";
let back2 = new Image();
back2.src = "/images/stages/stage2.png";
let back3 = new Image();
back3.src = "/images/stages/stage3.png";
const char1Image = new Image();
char1Image.src = "/images/Char1/Idle.png";
const char2Image = new Image();
char2Image.src = "/images/Char2/Idle.png";
let fatality = document.getElementById("fatality");
let fight = document.getElementById("fight");
let isBeginning = false;
let replay = document.getElementById("replay");
let punch = document.getElementById("punch");
let ko = document.getElementById("ko");
let music1 = document.getElementById("music1");
let music2 = document.getElementById("music2");
let music3 = document.getElementById("music3");
replay.style.visibility = "hidden";
let backChoice = (Math.floor(10*Math.random()) % 3) + 1;
let backHandler = spriteAnimationBack1;

replay.onclick = (e) => {
    location.reload();
}

let player = new Character({
    pos:{
        x: 100,
        y: 150,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    image: char1Image,
    type: 0,
    width: 547/4,
    height: 250,
    direction: "R",
});

let enemy = new Character({
    pos:{
        x: 800,
        y: 150,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    image: char2Image,
    type: 1,
    width: 529/4,
    height: 250,
    direction: "R",
});
function addListeners(){
    document.addEventListener("keydown", (event) =>{
        switch (event.key){
            case "d":
                player.isBlocking = false;
                player.velocity.x = 5;
                player.direction = "R";
                if(player.isJumping === false && player.isFalling === false && player.isAttacking === false){
                    player.state = "S";
                }
                break;
            case "a":
                player.isBlocking = false;
                player.velocity.x = -5;
                player.direction = "L";
                if(player.isJumping === false && player.isFalling === false && player.isAttacking === false){
                    player.state = "S";
                }
                break;
            case "s":
                player.isBlocking = false;
                player.velocity.y = -5;
                if(player.isFalling === false){
                    if(player.isAttacking === false){
                        player.state = "J";
                        player.isJumping = true;
                    }
                }
                break;
            case "f":
                player.isBlocking = false;
                if(player.isJumping === false){
                    player.isAttacking = true;
                    player.state = "A"
                }
                break;
            case "v":
                if(player.isJumping == false){
                    player.isAttacking = false;
                    player.velocity.x = 0;
                    player.velocity.y = 0;
                    player.state = "B";
                    player.isBlocking = true;
                }
                setTimeout(() => {
                    player.isBlocking = false;
                    player.state = "I";
                }, 2000);
                break;

            case "l":
                enemy.isBlocking = false;
                enemy.velocity.x = 5;
                enemy.direction = "R";
                if(enemy.isJumping === false && enemy.isFalling === false && enemy.isAttacking === false){
                    enemy.state = "S";
                }
                break;
            case "j":
                enemy.isBlocking = false;
                enemy.velocity.x = -5;
                enemy.direction = "L";
                if(enemy.isJumping === false && enemy.isFalling === false && enemy.isAttacking === false){
                    enemy.state = "S";
                }
                break;
            case "k":
                enemy.isBlocking = false;
                enemy.velocity.y = -5;
                if(enemy.isFalling === false){
                    if(enemy.isAttacking === false){
                        enemy.state = "J";
                        enemy.isJumping = true;
                    }
                }
                break;
            case "h":
                enemy.isBlocking = false;
                if(enemy.isJumping === false){
                    enemy.isAttacking = true;
                    enemy.state = "A"
                }
                break;
            case "b":
                if(enemy.isJumping == false){
                    enemy.isAttacking = false;
                    enemy.velocity.x = 0;
                    enemy.velocity.y = 0;
                    enemy.state = "B";
                    enemy.isBlocking = true;
                }
                setTimeout(() => {
                    enemy.isBlocking = false;
                    enemy.state = "I";
                }, 2000);
                break;
            default:
                break;
        }
    }, true);

    document.addEventListener("keyup", (event) =>{
        switch (event.key){
            case "d":
                if(player.direction === "R"){
                    if(player.isAttacking === false && player.isJumping === false){
                        player.state = "I";
                    }
                    player.velocity.x = 0;
                }
                break;
            case "a":
                if(player.direction === "L"){
                    if(player.isAttacking === false && player.isJumping === false){
                        player.state = "I";
                    }
                    player.velocity.x = 0;
                }
                break;
            case "f":
                setTimeout(() => {
                    player.isAttacking = false;
                }, 400);
                break;

            case "l":
                if(enemy.direction === "R"){
                    if(enemy.isAttacking === false && enemy.isJumping === false){
                        enemy.state = "I";
                    }
                    enemy.velocity.x = 0;
                }
                break;
            case "j":
                if(enemy.direction === "L"){
                    if(enemy.isAttacking === false && enemy.isJumping === false){
                        enemy.state = "I";
                    }
                    enemy.velocity.x = 0;
                }
                break;
            case "h":
                setTimeout(() => {
                    enemy.isAttacking = false;
                }, 400);
                break;
            default:
                break;
        }
    }, true);
}

player.backChoice = backChoice;
function animate(){
    ctx.clearRect(0, 0, cWidth, cHeight);
    if(time <= 0){
        replay.style.visibility = "visible";
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, cWidth, cHeight);
        ctx.font = "64px Font1";
        ctx.fillStyle = "white";
        ctx.fillText("Time's up!", 430, cHeight/2);
    }
    else if(player.hp <= 0){
        if(enemy.hp >= 70){
            fatality.play();
        } else{
            ko.play();
        }
        replay.style.visibility = "visible";
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cWidth, cHeight);
        ctx.font = "64px Font1";
        ctx.fillStyle = "white";
        ctx.fillText("Villain Wins!", 400, cHeight/2);
    }else if(enemy.hp <= 0){
        if(player.hp >= 70){
            fatality.play();
        } else{
            ko.play();
        }
        replay.style.visibility = "visible";
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cWidth, cHeight);
        ctx.font = "64px Font1";
        ctx.fillStyle = "white";
        ctx.fillText("Hero Wins!", 400, cHeight/2);
    } else{
            switch (backChoice) {
                case 1:
                    backgroundImage = back1;
                    backHandler = spriteAnimationBack1;
                    music1.play();
                    player.backChoice = 1;
                    break;
                case 2:
                    backgroundImage = back2;
                    music2.play();
                    backHandler = spriteAnimationBack2;
                    player.backChoice = 2;
                    break;
                case 3:
                    backgroundImage = back3;
                    music3.play();
                    backHandler = spriteAnimationBack3;
                    player.backChoice = 3;
                    break;
                default:
                    break;
            }
        let position = Math.floor(gameFrame/staggerFrames) % Object.keys(spriteAnimationBack1).length;
        ctx.drawImage(backgroundImage, backHandler[position].x, 0, backHandler[position].w, backHandler[position].h, 0, 0, cWidth, cHeight);
        ctx.fillStyle = "blue";
        ctx.fillRect(10, 10, 410, 20);
        ctx.fillRect(705, 10, 410, 20);
        ctx.fillStyle = "red";
        ctx.fillRect(15, 12.5, player.hp*4, 15);
        ctx.fillRect(710, 12.5, enemy.hp*4, 15);
        ctx.fillStyle = "black";
        ctx.fillRect(510, 10, 100, 50);
        ctx.font = "30px Font1";
        if(time >= 10){
            ctx.fillStyle = "white";
            ctx.fillText(time, 545, 45);
        } else{
            ctx.fillStyle = "red";
            ctx.fillText(time, 553, 45);
        }
        if(!isBeginning){
                fight.play();
                isBeginning = true;
            }
            player.update();
            enemy.update();
            enemy.draw();
            player.draw();
            if(player.state === "A" && Math.abs(player.pos.x - enemy.pos.x) < 140 && player.pos.x - enemy.pos.x < 0 && player.canAttack === true && enemy.pos.y >= 100){
                punch.play();
                if(enemy.isBlocking){
                    enemy.hp -=2;
                } else{
                    enemy.hp -=5;
                }
                player.canAttack = false;
                setTimeout(() => {
                    player.state = "I";
                    player.isAttacking = false;
                    player.canAttack = true;
                }, 400);
            }
            if(enemy.state === "A" && Math.abs(enemy.pos.x - player.pos.x) < 140 && enemy.pos.x - player.pos.x > 0 && enemy.canAttack === true && player.pos.y >= 100){
                punch.play();
                if(player.isBlocking){
                    player.hp -=2;
                } else{
                    player.hp -=5;
                }
                enemy.canAttack = false;
                setTimeout(() => {
                    enemy.state = "I";
                    enemy.isAttacking = false;
                    enemy.canAttack = true;
                }, 400);
            }

        setTimeout(()=>{
            requestAnimationFrame(animate);
            gameFrame ++;
        }, 8);
    }
}
addListeners();
animate();
export {ctx, gameFrame, backgroundImage};