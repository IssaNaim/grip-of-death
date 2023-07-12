 let botBtn = document.getElementById("bot");
    let friendBtn = document.getElementById("friend");
    let choices = document.getElementById("display");
    let choiceBtnHero = document.querySelectorAll(".hero");
    let choiceBtnVillain = document.querySelectorAll(".villain");
    let linkInfo = document.querySelector(".link-container");
    let timer = document.getElementById("timer");
    let cpy = document.getElementById("cpy");
    let back = document.getElementById("back");
    let username = document.getElementById("username").innerText;
    linkInfo.style.display = "none";
    let link;
    let random_uuid;
    let choice;

    back.onclick = () =>{
        botBtn.style.visibility = "visible";
        friendBtn.style.visibility = "visible";
        choices.style.display = "none";
        back.style.visibility = "hidden";
    }

    cpy.onclick =  () => {
        let copyText = document.getElementById("link");
        navigator.clipboard.writeText(copyText.innerText);
        cpy.innerText = "Copied!";
    }

    if(botBtn != null && friendBtn != null){
        botBtn.onclick =  () => {
            window.location.replace("http://localhost:8082/offline");
        };

        friendBtn.onclick = () => {
            botBtn.style.visibility = "hidden";
            friendBtn.style.visibility = "hidden";
            back.style.visibility = "visible";
            choices.style.display = "grid";
            function uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                    .replace(/[xy]/g, function (c) {
                        const r = Math.random() * 16 | 0,
                            v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
            }
            random_uuid = "/" + uuidv4();
            link = document.getElementById("link");
            link.innerText = "localhost:8082/game" + random_uuid + "/";
        };

        choiceBtnHero.forEach((element) => {
            element.onclick = () => {
                choice = "Hero";
                back.style.visibility = "hidden";
                link.innerText += "Villain/Guest";
                choices.style.display = "none";
                linkInfo.style.display = "block";
                timer.style.color = "white";
                let seconds = 10;
                timer.innerText = "10";
                let tmp = 10;
                while(seconds > 0){
                    setTimeout(() => {
                        timer.innerText = tmp;
                        tmp --;
                    }, seconds*1000);
                    seconds--;
                }
                setTimeout(() => {
                    window.location.replace("http://localhost:8082/game" + random_uuid + "/Hero/" + username);
                }, 10000);
            }
        });
        choiceBtnVillain.forEach((element) => {
            element.onclick = () =>{
                choice = "Villain";
                back.style.visibility = "hidden";
                link.innerText += "Hero/Guest";
                choices.style.display = "none";
                linkInfo.style.display = "block";
                timer.style.color = "white";
                let seconds = 10;
                timer.innerText = "10";
                let tmp = 10;
                while(seconds > 0){
                    setTimeout(() => {
                        timer.innerText = tmp;
                        tmp --;
                    }, seconds*1000);
                    seconds--;
                }
                setTimeout(() => {
                    window.location.replace("http://localhost:8082/game" + random_uuid + "/Villain/" + username);
                }, 10000);
            }
        });
}