import {Character} from "./classes.js";
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
let user = document.getElementById("username").innerText;
let gameFrame = 0;
let stompClient = null;
let stompClient2 = null;
let time = 60;
let backgroundImage = new Image();
let back1 = new Image();
back1.src = "../../../images/stages/stage1.png";
let back2 = new Image();
back2.src = "../../../images/stages/stage2.png";
let back3 = new Image();
back3.src = "../../../images/stages/stage3.png";
const char1Image = new Image();
char1Image.src = "../../../images/Char1/Idle.png";
const char2Image = new Image();
char2Image.src = "../../../images/Char2/Idle.png";
let gameId = "/" + document.getElementById("gameId").innerText;
let choice = document.getElementById("choice").innerText;
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
const Http = new XMLHttpRequest();
const url="http://localhost:8082/win/" + user;

replay.onclick = (e) => {
    location.reload();
}

function startTimer(){
    setTimeout(() => {
        time --;
        startTimer();
    }, 1000);
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
        let handler;
        if(choice == "Hero"){
            handler = player;
        } else{
            handler = enemy;
        }
        handler.isReady = true;
        switch (event.key){
            case "d":
                handler.isBlocking = false;
                handler.velocity.x = 5;
                handler.direction = "R";
                if(handler.isJumping === false && handler.isFalling === false && handler.isAttacking === false){
                    handler.state = "S";
                }
                break;
            case "a":
                handler.isBlocking = false;
                handler.velocity.x = -5;
                handler.direction = "L";
                if(handler.isJumping === false && handler.isFalling === false && handler.isAttacking === false){
                    handler.state = "S";
                }
                break;
            case " ":
                handler.isBlocking = false;
                handler.velocity.y = -5;
                if(handler.isFalling === false){
                    if(handler.isAttacking === false){
                        handler.state = "J";
                        handler.isJumping = true;
                    }
                }
                break;
            case "l":
                handler.isBlocking = false;
                if(handler.isJumping === false){
                    handler.isAttacking = true;
                    handler.state = "A"
                }
                break;
            case "k":
                if(handler.isJumping == false){
                    handler.isAttacking = false;
                    handler.velocity.x = 0;
                    handler.velocity.y = 0;
                    handler.state = "B";
                    handler.isBlocking = true;
                }
                setTimeout(() => {
                    handler.isBlocking = false;
                    handler.state = "I";
                }, 2000);
                break;
            default:
                break;
        }
    }, true);

    document.addEventListener("keyup", (event) =>{
        let handler;
        if(choice == "Hero"){
            handler = player;
        } else{
            handler = enemy;
        }
        switch (event.key){
            case "d":
                if(handler.direction === "R"){
                    if(handler.isAttacking === false && handler.isJumping === false){
                        handler.state = "I";
                    }
                    handler.velocity.x = 0;
                }
                break;
            case "a":
                if(handler.direction === "L"){
                    if(handler.isAttacking === false && handler.isJumping === false){
                        handler.state = "I";
                    }
                    handler.velocity.x = 0;
                }
                break;
            case "l":
                setTimeout(() => {
                    handler.isAttacking = false;
                }, 400);
                break;
            default:
                break;
        }
    }, true);
}

function connect(){
    let socket = new SockJS('/stomp-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        let link = "/game" + gameId + "/player";
        stompClient.subscribe(link, (Info) =>{
            let tmp = JSON.stringify(Info);
            tmp = JSON.parse(tmp);
            tmp = JSON.parse(tmp.body);
            player.pos.x = tmp.pos.x;
            player.pos.y = tmp.pos.y;
            player.state = tmp.state;
            player.isAttacking = tmp.isAttacking;
            player.isJumping = tmp.isJumping;
            player.isFalling = tmp.isFalling;
            player.isReady = tmp.isReady;
            player.hp = tmp.hp;
            player.isBlocking = tmp.isBlocking;
            enemy.backChoice = tmp.backChoice;
        });
    });

    let socket2 = new SockJS('/stomp-endpoint');
    stompClient2 = Stomp.over(socket2);
    stompClient2.connect({}, () => {
        let link = "/game" + gameId + "/enemy";
        stompClient2.subscribe(link, (Info) =>{
            let tmp2 = JSON.stringify(Info);
            tmp2 = JSON.parse(tmp2);
            tmp2 = JSON.parse(tmp2.body);
            enemy.pos.x = tmp2.pos.x;
            enemy.pos.y = tmp2.pos.y;
            enemy.state = tmp2.state;
            enemy.isAttacking = tmp2.isAttacking;
            enemy.isJumping = tmp2.isJumping;
            enemy.isFalling = tmp2.isFalling;
            enemy.isBlocking = tmp2.isBlocking;
            enemy.isReady = tmp2.isReady;
        });
    });
}
connect();
function sendInfo() {
    setTimeout(() => {
        if(choice == "Hero"){
            stompClient.send("/game" + gameId + "/player", {}, JSON.stringify(player));
        } else{
            stompClient2.send("/game" + gameId + "/enemy", {}, JSON.stringify(enemy));
        }
        sendInfo();
    }, 10);
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
        if(choice != "Hero"){
            Http.open("GET", url);
            Http.send();
        }
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
        if(choice == "Hero"){
            Http.open("GET", url);
            Http.send();
        }
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
        if(choice === "Hero") {
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
        } else {
            switch(enemy.backChoice){
                case 1:
                    backgroundImage = back1;
                    music1.play();
                    backHandler = spriteAnimationBack1;
                    break;
                case 2:
                    backgroundImage = back2;
                    music2.play();
                    backHandler = spriteAnimationBack2;
                    break;
                case 3:
                    backgroundImage = back3;
                    music3.play();
                    backHandler = spriteAnimationBack3;
                    break;
                default:
                    break;
            }
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
        if(player.isReady == true && enemy.isReady == true){
            if(!isBeginning){
                fight.play();
                startTimer();
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
        } else{
            ctx.font = "64px Font1";
            ctx.fillStyle = "white";
            ctx.fillText("Press any key and wait your friend", 20, cHeight/2);
        }
        setTimeout(()=>{
            requestAnimationFrame(animate);
            gameFrame ++;
        }, 8);
    }
}
setTimeout(() => {
    sendInfo();
}, 1000);
addListeners();
animate();
export {ctx, gameFrame, backgroundImage};