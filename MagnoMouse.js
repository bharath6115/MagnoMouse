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
const attempts = document.querySelector("#attempts");
const moveUp = document.querySelector(".textstyle");

let buttons;
let lives;
let tot = 0;
let mode = ""
const ans = [];

async function WaitForInput() {
    return new Promise((resolve, reject) => {

        sbmt.addEventListener("click", () => {
            if (!form[0].value || form[0].value < 0) {
                // alert("Enter a positive number!");
            } else
                if (!(form.easy.checked || form.med.checked || form.hard.checked)) {
                    // alert("Choose a difficulty!");
                } else
                    resolve();
        });
    });
}

function Warn() {
    more.style.color = "red";
    setTimeout(() => {
        more.style.color = "black";
    }, 500);
}

function ScreenDisplay() {
    screen.style.backgroundColor = "green";
    setTimeout(() => {
        screen.style.backgroundColor = "gray";
    }, 500);
}


function Timer() {
    let time = 3602; //sec
    const ID = setInterval(()=>{
        let hr = Math.floor(time/3600);
        let min = Math.floor((time%3600)/60);
        let sec = time%60;
        if(min < 10) min = `0${min}`;
        if(sec < 10) sec = `0${sec}`;
        timer.innerText = `Time: ${hr}:${min}:${sec}`;
        time--;
        if(time===0){
            alert("You failed.!!");
            clearInterval(ID);
        }
    },1000);
}

function createLives(n){
    for(let i=0;i<n;i++){
        let life = document.createElement("div");
        life.classList.add("Life");
        let img = document.createElement("img");
        img.src = "life.webp";
        img.style.width = "50px";
        life.append(img);
        attempts.append(life);
    }
}

console.log("Script Loaded!");

function newGame() {
    init.style.display = "block";
    scnd.style.display = "none";
    navbar.style.display = "none";
    form.easy.checked = false; form.med.checked = false; form.hard.checked = false;
    form.btncnt.value = 'none';
    const child = block.children;
    const len = child.length
    for (let i = 0; i < len; i++) {
        child[0].remove();
    }
    const livestot = lives.length
    for (let i = 0; i < livestot; i++) {
        lives[0].remove();
    }
    main();
}

async function main() {

    //REMOVE ACTION FOR BUTTON BEFORE HITTING SUBMIT, i.e AFTER LOADING SCRIPT
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    })
    await WaitForInput();
    // console.log("Hello after await");
    init.style.display = "none";
    scnd.style.display = "block";
    navbar.style.display = "block";


    //GET INPUT
    tot = parseInt(form.btncnt.value);
    if (form.easy.checked) mode = "easy";
    else if (form.med.checked) mode = "med";
    else mode = "hard";

    //DESIGN FOR EACH MODE:

    if (mode !== "hard") {
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
        createLives(5);
    } else {
        //set timer display to block.
        // Timer();
    }

    more.innerText = "Buttons Remaining: " + ans.length;
    setTimeout(()=>{
        moveUp.style.transform = `translateY(${-7}vh)`;
    },400);


    //NAVI PART, keep in so that buttons will actually read all the newly generated buttons.
    buttons = document.querySelectorAll("#container button");
    const submit = document.querySelector("#submit");
    const quit = document.querySelector("#quit");
    lives = attempts.children;

    for(let i=1;i<=buttons.length;i++){
        buttons[i-1].addEventListener("click",()=>{
            if(ans.indexOf(i) != -1){
                buttons[i-1].style.backgroundColor = "green";
                buttons[i-1].onmouseenter = null;
                buttons[i-1].disabled = "true";
                ans.splice(ans.indexOf(i),1);
                more.innerText = "Buttons Remaining: " + ans.length;
            
                if(ans.length===0){
                    setTimeout(()=>{
                        //remove alert make a dark screen with their records and ask to start new game.
                        alert("You win!");
                        newGame();
                    },300);
                }
            }else{
                buttons[i-1].style.backgroundColor = "red";
                // buttons[i-1].disabled = "true";  //if they click again then skill issue
                lives[0].remove();
                if(lives.length === 0){
                    //GAME LOST.
                    setTimeout(()=>{
                        alert("You lose!");
                        newGame();
                    },300);
                }
            }
        })
    }

    submit.onclick = function () {

        if (ans.length == 0) {
            //add confetti type
            newGame();
        } else {
            Warn();
            setTimeout(() => Warn(), 700); //Warn twice to have better effect.
        }
    }
    
    quit.onclick = function () {
        ans.splice(0, ans.length);
        newGame();
    }
}

main();