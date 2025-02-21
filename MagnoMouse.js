const form = document.querySelector("form");
const radio = document.querySelectorAll('input[name="difficulty"]');
const init = document.querySelector("#init");
const scnd = document.querySelector("#scnd");
let tot = 0;
let mode = ""
form.addEventListener("submit", (e) => {
    e.preventDefault();
    tot = parseInt(form[0].value);
    for (let btn of radio) {
        if (btn.checked) {
            mode = btn.value;
            break;
        }
    }
    form[0].value = '';
    init.setAttribute("style", "display:none");
    scnd.setAttribute("style", "display:block");


    const block = document.querySelector("#container");
    let max = tot / 10;
    let cnt = 0;

    const ans = [];

    //  FOR EASY MODE
    if (mode === "easy") {
        for (let i = 0; i < tot; i++) {
            const div = document.createElement("div");
            const btn = document.createElement('button');
            btn.innerText = `Button ${i + 1}`;

            let x = Math.random();

            if (cnt < max && x < 0.1) {

                btn.onmouseenter = function () {
                    alert("I am metallic.");
                }
                div.append(btn);
                cnt++;
                ans.push(i + 1);

            } else {
                div.append(btn);
            }

            block.append(div);
        }
    }

    //  FOR MEDIUM MODE
    if(mode==="med"){

    }

    //  FOR HARD MODE
    if(mode==="hard"){
        
    }
    // console.log(...ans);
    // console.log("cnt",cnt);

    //FOOTER PART
    const buttons = document.querySelectorAll("button");
    const found = document.querySelector("#found");
    const more = document.querySelector("#more");
    const submit = document.querySelector("#submit");
    const quit = document.querySelector("#quit");

    found.onclick = function () {
        let num = parseInt(prompt("Enter the button you think is metallic."))
        let index = ans.indexOf(num);
        console.log("num", num, "index", index);
        if (index !== -1) {

            buttons[num - 1].onmouseenter = null;

            alert("Congrats, you found a metallic button.")
            ans.splice(index, 1);
        } else {
            alert("That button is not metallic.")
        }
    }

    more.onclick = function () {
        alert(`${ans.length} buttons are left!`)
    }

    submit.onclick = function () {
        
        if (ans.length == 0) {
            //add homepage function
            alert("Congrats! You found out all the buttons!");
        } else {
            alert(`There are still ${ans.length} buttons left!`);
        }
    }
    
    //add homepage function
    quit.onclick = function () {

        if (ans.length === 0) {
            alert("You already finished the game!");
        } else {
            alert("Okay. Quit Game.");
            for (let i = 0; i < ans.length; i++) {
                buttons[ans[i] - 1].onmouseenter = null;
            }
            ans.splice(0, ans.length);

            //can also disable clicks for all buttons.
        }
    }
});