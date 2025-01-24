const block = document.querySelector("#container");

const tot = prompt("Enter the total number of buttons.");
// const tot = 100;
let max= tot/10;
let cnt=0;

const ans = [];

for(let i=0;i<tot;i++){
    const div = document.createElement("div");
    const btn = document.createElement('button');
    btn.innerText = `Button ${i+1}`;

    let x = Math.random();

    if(cnt<max && x < 0.1){

        btn.onmouseenter = function(){
            alert("You touched me ");
        }
        div.append(btn);
        cnt++;
        ans.push(i+1);

    }else{
        div.append(btn);
    }

    block.append(div);
}

// console.log(...ans);
// console.log("cnt",cnt);

const buttons = document.querySelectorAll("button");

const found = document.querySelector("#found");
const more = document.querySelector("#more");
const submit = document.querySelector("#submit");
const quit = document.querySelector("#quit");

found.onclick = function(){
    let num = parseInt(prompt("Enter the button you think wants to be touched."))
    let index   = ans.indexOf(num);
    console.log("num",num,"index",index);
    if(index !== -1){

        buttons[num-1].onmouseenter = null;

        alert("Congrats, you found a button wanting to be touched.")
        ans.splice(index,1);
    }else{
        alert("That button does not want to be touched.")
    }
}

more.onclick = function(){
    alert(`${ans.length} buttons are left!`)
}

submit.onclick = function(){

    if(ans.length == 0){
        alert("Congrats! You found out all the buttons!");
    }else{
        alert(`There are still ${ans.length} buttons left!`);
    }
}

quit.onclick = function(){

    if(ans.length === 0){
        alert("You already finished the game!");
    }else{
        alert("Okay. Quit Game.");
        for(let i=0;i<ans.length;i++){
            buttons[ans[i]-1].onmouseenter = null;
        }
        ans.splice(0,ans.length);

        //can also disable clicks for all buttons.
    }
}