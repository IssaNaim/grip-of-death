let time = 60;

function startTimer(){
    setTimeout(() => {
        time --;
        startTimer();
    }, 1000);
}
startTimer();

export {time};
