let spriteAnimationChar1 = [];

let spriteAnimationBack1 = {
    0: {x: 0, w: 768, h: 241},
    1: {x: 768, w: 768, h: 241},
    2: {x: 768*2, w: 768, h: 241},
    3: {x: 768*3, w: 768, h: 241},
    4: {x: 768*4, w: 768, h: 241},
    5: {x: 768*5, w: 768, h: 241},
    6: {x: 768*6, w: 768, h: 241},
    7: {x: 768*7, w: 768, h: 241},
};

let spriteAnimationBack2 = {
    0: {x: 0, w: 740, h: 224},
    1: {x: 740, w: 740, h: 224},
    2: {x: 740*2, w: 740, h: 224},
    3: {x: 740*3, w: 740, h: 224},
    4: {x: 740*4, w: 740, h: 224},
    5: {x: 740*5, w: 740, h: 224},
    6: {x: 740*6, w: 740, h: 224},
    7: {x: 740*7, w: 740, h: 224},
};

let spriteAnimationBack3 = {
    0: {x: 0, w: 800, h: 336},
    1: {x: 800, w: 800, h: 336},
    2: {x: 800*2, w: 800, h: 336},
    3: {x: 800*3, w: 800, h: 336},
    4: {x: 800*4, w: 800, h: 336},
    5: {x: 800*5, w: 800, h: 336},
    6: {x: 800*6, w: 800, h: 336},
    7: {x: 800*7, w: 800, h: 336},
};

spriteAnimationChar1["I"] = {
    0: {x: 0, w: 137},
    1: {x: 137, w: 137},
    2: {x: 274, w: 137},
    3: {x: 411, w: 137},
}

spriteAnimationChar1["B"] = {
    0: {x: 0, w: 129},
}
spriteAnimationChar1["A"] = {
    0: {x: 0, w: 138},
    1: {x: 138, w: 153},
    2: {x: 291, w: 189},
    3: {x: 480, w: 160},
    4: {x: 638, w: 156},
}
spriteAnimationChar1["J"] = {
    0: {x: 0, w: 137},
    1: {x: 137, w: 137},
}
spriteAnimationChar1["S"] = {
    0: {x: 0, w: 135},
    1: {x: 135, w: 135},
    2: {x: 270, w: 135},
    3: {x: 405, w: 135},
    4: {x: 540, w: 135},
}
spriteAnimationChar1["F"] = {
    0: {x: 0, w: 136},
}

let char1Idle = new Image();
let char1Run = new Image();
let char1Attack = new Image();
let char1Jump = new Image();
let char1Block = new Image();
char1Idle.src = "../../../images/Char1/Idle.png";
char1Run.src = "../../../images/Char1/Run.png";
char1Jump.src = "../../../images/Char1/Jump.png";
char1Attack.src = "../../../images/Char1/Attack.png";
char1Block.src = "../../../images/Char1/Block.png";

let imagesChar1 = {
    "I" : char1Idle,
    "S" : char1Run,
    "J" : char1Jump,
    "A" : char1Attack,
    "B" : char1Block,
}

let spriteAnimationChar2 = [];
spriteAnimationChar2["I"] = {
    3: {x: 0, w: 132},
    2: {x: 132, w: 132},
    1: {x: 264, w: 132},
    0: {x: 396, w: 132},
}
spriteAnimationChar2["B"] = {
    0: {x: 0, w: 146},
}
spriteAnimationChar2["A"] = {
    2: {x: 148, w: -148},
    1: {x: 342, w: -194},
    0: {x: 493, w: -151},
}
spriteAnimationChar2["J"] = {
    4: {x: 0, w: 114},
    3: {x: 114, w: 114},
    2: {x: 228, w: 114},
    1: {x: 342, w: 114},
    0: {x: 456, w: 114},
}
spriteAnimationChar2["S"] = {
    3: {x: 0, w: 135},
    2: {x: 135, w: 135},
    1: {x: 270, w: 135},
    0: {x: 405, w: 135},
}
spriteAnimationChar2["F"] = {
    0: {x: 0, w: 112},
}

let char2Idle = new Image();
let char2Run = new Image();
let char2Attack = new Image();
let char2Jump = new Image();
let char2Block = new Image();
char2Idle.src = "../../../images/Char2/Idle.png";
char2Run.src = "../../../images/Char2/Run.png";
char2Jump.src = "../../../images/Char2/Jump.png";
char2Attack.src = "../../../images/Char2/Attack.png";
char2Block.src = "../../../images/Char2/Block.png";
let imagesChar2 = {
    "I" : char2Idle,
    "S" : char2Run,
    "J" : char2Jump,
    "A" : char2Attack,
    "B" : char2Block,
}

export {spriteAnimationChar1, imagesChar1, spriteAnimationChar2, imagesChar2, spriteAnimationBack1, spriteAnimationBack2, spriteAnimationBack3};