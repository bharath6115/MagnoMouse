const init = document.querySelector("#init");
const scnd = document.querySelector("#scnd");
const radio = document.querySelectorAll('input[name="difficulty"]');
const form = document.querySelector("form");
const inputButton = document.querySelector("#sbmt");
const block = document.querySelector("#container");
const navbar = document.querySelector("#navbar");
const more = document.querySelector("#more");

let buttons;
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

function Timer() {

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
                        alert("I am magnetic.");
                    else {
                        let tl = Math.floor((Math.random() + 1) * 1001);
                        setTimeout(() => {
                            alert("I am magnetic.");
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
    } else {
        
    }
    
    more.innerText = "Buttons Remaining: " + ans.length;

    //NAVI PART, keep in so that buttons will actually read all the newly generated buttons.
    buttons = document.querySelectorAll("button");
    const found = document.querySelector("#found");
    const submit = document.querySelector("#submit");
    const quit = document.querySelector("#quit");

    found.onclick = function () {
        let num = parseInt(prompt("Enter the button you think is metallic."))
        let index = ans.indexOf(num);
        console.log("num", num, "index", index);
        if (index !== -1) {

            buttons[num].onmouseenter = null;   //only num and not num-1 because of sbmt button at first.
            console.log("Nullified ability.");

            alert("Congrats, you found a metallic button.");
            ans.splice(index, 1);
            more.innerText = "Buttons Remaining: " + ans.length;
        } else {
            alert("That button is not metallic.")
        }
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