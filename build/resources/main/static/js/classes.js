import {spriteAnimationChar1, imagesChar1, spriteAnimationChar2, imagesChar2} from "./utils.js";
import { ctx, gameFrame} from "./script.js";

const staggerFrames = 10;

class Character{
    constructor({pos, velocity, image, type, height, width, direction}){
        this.pos = pos;
        this.type = type;
        this.velocity = velocity;
        this.image = image;
        this.state = "I";
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.isJumping = false;
        this.isFalling = false;
        this.isAttacking = false;
        this.isReady = false;
        this.hp = 100;
        this.canAttack = true;
        this.backChoice = 1;
        this.isBlocking = false;
    }
    update(){
        let images;
        switch (this.type){
            case 0:
                images = imagesChar1;
                break;
            case 1:
                images = imagesChar2;
                break;
            default:
                break;
        }
        if(this.state === "J" && this.isAttacking === false){
            this.image = images.J;
        } else if(this.state === "S" && this.isAttacking === false){
            this.image = images.S;
        } else if(this.state === "F" && this.isAttacking === false){
            this.image = images.J;
        } else if(this.state === "I" && this.isAttacking === false){
            this.image = images.I;
        } else if(this.state === "A" && this.canAttack === true){
            this.image = images.A;
        } else if(this.state === "B"){
            this.image = images.B;
        }
        if(this.pos.x > 0 && this.velocity.x < 0){
            this.pos.x += this.velocity.x;
        } else if(this.pos.x < 980 && this.velocity.x > 0){
            this.pos.x += this.velocity.x;
        }
        if(this.isJumping && !this.isFalling){
            if(this.pos.y > 0){
                this.pos.y += this.velocity.y;
            } else{
                this.isFalling = true;
            }
        }
        if(this.isFalling){
            this.state = "F";
            if(this.pos.y !== 150){
                this.pos.y -= this.velocity.y;
            } else{
                this.isFalling = false;
                this.isJumping = false;
                if(this.velocity.x !== 0){
                    this.state = "S";
                } else{
                    this.state = "I";
                }
            }
        }
    }
    draw(){
        let position;
        if(this.type == 0){
            position = Math.floor(gameFrame/staggerFrames) % Object.keys(spriteAnimationChar1[this.state]).length;
            ctx.drawImage(this.image, spriteAnimationChar1[this.state][position].x, 0, spriteAnimationChar1[this.state][position].w, this.height, this.pos.x, this.pos.y, spriteAnimationChar1[this.state][position].w, this.height);
        } else if(this.type == 1){
            let adder = 0;
            if(this.state === "A"){
                adder = 150;
            }
            position = Math.floor(gameFrame/staggerFrames) % Object.keys(spriteAnimationChar2[this.state]).length;
            ctx.drawImage(this.image, spriteAnimationChar2[this.state][position].x, 0, spriteAnimationChar2[this.state][position].w, this.height, this.pos.x + adder, this.pos.y, spriteAnimationChar2[this.state][position].w, this.height);
        }
    }
}
export {Character};