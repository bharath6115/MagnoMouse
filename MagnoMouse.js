const init = document.querySelector("#init");
const scnd = document.querySelector("#scnd");
const radio = document.querySelectorAll('input[name="difficulty"]');
const form = document.querySelector("form");
const inputButton = document.querySelector("#sbmt");
const block = document.querySelector("#container");
const navbar = document.querySelector("#navbar");
const more = document.querySelector("#more");
const screen = document.querySelector("#screen");
const timer = document.querySelector("#Timer");
const displayTime = document.querySelector("#displayTime")
const attempts = document.querySelector("#attempts");
const moveUp = document.querySelector(".textstyle");
const cover = document.querySelector("#cover");
const card = document.querySelector("#card");
const gameStatus = document.querySelector("#gameStatus");
const retry = document.querySelector("#retry");
const submit = document.querySelector("#submit");
const quit = document.querySelector("#quit");


let buttons;
let lives;
let tot = 0;
let mode = ""
let ID
const ans = [];

async function WaitForInput() {
    return new Promise((resolve, reject) => {

        sbmt.addEventListener("click", () => {
            if (!form[0].value || form[0].value <= 0) {
                form[0].setCustomValidity("Enter a number greater than 0");
                form[0].reportValidity();
            } else if (!(form.easy.checked || form.med.checked || form.hard.checked)) {

            } else
                resolve();
        });
    });
}

function Warn() {
    //if submit is clicked early on
    more.style.color = "red";
    setTimeout(() => {
        more.style.color = "black";
    }, 500);
}

function ScreenDisplay() {
    //to display the metallic nature of button
    screen.style.backgroundColor = "green";
    setTimeout(() => {
        screen.style.backgroundColor = "gray";
    }, 500);
}


function Timer(tot) {
    let time = tot * 2.1; //sec
    if (time < 10) time = 10;  //if only 1 button then 2 sec, not enough.
    ID = setInterval(() => {
        let hr = Math.floor(time / 3600);
        let min = Math.floor((time % 3600) / 60);
        let sec = Math.floor(time % 60);
        if (min < 10) min = `0${min}`;
        if (sec < 10) sec = `0${sec}`;
        timer.innerText = `Time left: ${hr}:${min}:${sec}`;
        time--;
        if (time <= 0) {
            clearInterval(ID);
            showCard("lose");
        }
    }, 1000);
}

function createLives(n) {
    for (let i = 0; i < n; i++) {
        let life = document.createElement("div");
        life.classList.add("Life");
        let img = document.createElement("img");
        img.src = "life.webp";
        img.style.width = "50px";
        life.append(img);
        attempts.append(life);
    }
}

function showCard(status) {
    cover.style.display = "flex";
    zaWarudo();

    if (status == "win") {
        gameStatus.innerHTML = 'Congrats! You <span style="color:green; font-weight:500;">found</span> all the magnetic buttons!';
    } else {
        gameStatus.innerHTML = 'You <span style="color:red; font-weight:500;">failed</span> to find all the magnetic buttons...';
    }

}

function newGame() {
    //reset the visuals
    init.style.display = "block";
    scnd.style.display = "none";
    navbar.style.display = "none";
    container.style.pointerEvents = "";
    displayTime.style.display = "none"; clearInterval(ID);
    cover.style.display = "none";
    moveUp.style.transform = `translateY(${0}vh)`; //reset the Y displacement to 0.

    //reset input
    form.easy.checked = false; form.med.checked = false; form.hard.checked = false;
    form.btncnt.value = 'none';

    //remove previously added buttons and lives
    const child = block.children;
    const len = child.length;
    for (let i = 0; i < len; i++) {
        child[0].remove();
    }
    const livestot = lives.length
    for (let i = 0; i < livestot; i++) {
        lives[0].remove();
    }
    ans.splice(0, ans.length);
    main();
}

function zaWarudo() {
    //Stop the execution of game i.e make buttons unclickable and stop timer
    container.style.pointerEvents = "none";
    clearInterval(ID);
}

async function main() {

    //REMOVE ACTION FOR BUTTON BEFORE HITTING SUBMIT, i.e AFTER LOADING SCRIPT
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    })
    await WaitForInput();
    init.style.display = "none";
    scnd.style.display = "block";
    navbar.style.display = "block";


    //Get input
    tot = parseInt(form.btncnt.value);
    if (form.easy.checked) mode = "easy";
    else if (form.med.checked) mode = "med";
    else mode = "hard";

    //Design for each difficulty:

    for (let i = 0; i < tot; i++) {
        const div = document.createElement("div");
        const btn = document.createElement('button');
        btn.innerText = `Button ${i + 1}`;

        let x = Math.random();

        if (x < 0.1) {

            btn.onmouseenter = function () {
                if (mode === "easy")
                    ScreenDisplay();
                else {
                    let tl = Math.floor((Math.random() + 1) * 1001);
                    setTimeout(() => {
                        ScreenDisplay();
                    }, tl);
                }
            }
            div.append(btn);
            ans.push(i + 1);

        } else {
            div.append(btn);
        }

        block.append(div);
    }
    if (mode !== "hard") createLives(5);
    if (mode === "hard") {
        createLives(3);
        displayTime.style.display = "flex";
        Timer(tot);
    }
    //buttons are created, get all the buttons in container.
    buttons = document.querySelectorAll("#container button");
    //If no magnetic buttons
    if (ans.length === 0) {
        let ind = (Math.floor(Math.random() * (tot)) + 1);

        ans.push(ind);
        buttons[ind - 1].onmouseenter = function () {
            if (mode === "easy")
                ScreenDisplay();
            else {
                let tl = Math.floor((Math.random() + 1) * 1001);
                setTimeout(() => {
                    ScreenDisplay();
                }, tl);
            }
        }
    }

    //Rendering visuals
    more.innerText = "Buttons Remaining: " + ans.length;
    setTimeout(() => {
        moveUp.style.transform = `translateY(${-7}vh)`;
    }, 1000);

    lives = attempts.children;

    for (let i = 1; i <= buttons.length; i++) {
        buttons[i - 1].addEventListener("click", () => {
            if (ans.indexOf(i) != -1) {
                buttons[i - 1].style.backgroundColor = "green";
                buttons[i - 1].onmouseenter = null;
                buttons[i - 1].disabled = "true";
                ans.splice(ans.indexOf(i), 1);
                more.innerText = "Buttons Remaining: " + ans.length;

                if (ans.length === 0) {
                    setTimeout(() => {
                        showCard("win");
                    }, 300);
                }
            } else {
                buttons[i - 1].style.backgroundColor = "red";
                // buttons[i-1].disabled = "true";  //if they click again then skill issue
                lives[0].remove();
                if (lives.length === 0) {
                    //GAME LOST.
                    setTimeout(() => {
                        showCard("lose");
                    }, 300);
                }
            }
        })
    }

    retry.addEventListener("click", () => newGame());
    quit.addEventListener("click", () => newGame());

    //if the cover is clicked, it will disappear but when the card is clicked the cover will not disappear. to do this use stopPropagation
    card.addEventListener("click",(e)=>{e.stopPropagation()});
    cover.addEventListener("click",()=>{cover.style.display="none"});


    submit.addEventListener("click", () => {
        if (ans.length == 0) {
            //add confetti type
            showCard("win");
        } else {
            //Warn twice to have better effect.
            Warn();
            setTimeout(() => Warn(), 700);
        }
    })

}

main();