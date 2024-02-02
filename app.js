let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let gameZone=document.querySelector(".gameZone");
let turnO = true;
let count=0;
let player=document.querySelector("h4");
player.innerText="Turn for Player 1 : O";
player.style.color="#513B56";
let winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        if(turnO){
            player.innerText="Turn for Player 2 : X";
            player.style.color="#780000";
            box.innerText="O";
            turnO=false;
            box.style.color="#513B56";
        }
        else{
            player.innerText="Turn for Player 1 : O";
            player.style.color="#513B56";
            box.innerText="X";
            turnO=true;
            box.style.color="#780000";
        }
        box.disabled="true";
        let isWinner=checkWinner();
        count++;
        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1= boxes[pattern[0]].innerText;
        let pos2= boxes[pattern[1]].innerText;
        let pos3= boxes[pattern[2]].innerText;

        if(pos1!=="" && pos2!=="" && pos3!==""){
            if(pos1===pos2 && pos2===pos3){
                showWinner(pos1);
            }
        }
    }
}

const showWinner = (winner) =>{
    if(turnO){
        msg.innerText=`Congratulations, Winner is Player 1`;
    }
    else{
        msg.innerText=`Congratulations, Winner is Player 2`;
    }
    
    msgContainer.classList.remove("hide");
    gameZone.classList.add("hide");

    disableBoxes();
}

const disableBoxes=() =>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=() =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        count=0;
        gameZone.classList.remove("hide");
        player.innerText="Turn for Player 1 : O";
        player.style.color="#513B56";
    }
}

const resetGame=() =>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    gameZone.classList.remove("hide");
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

const gameDraw=() =>{
    msg.innerText=`Match Draw`;
    msgContainer.classList.remove("hide");
    count=0;
    disableBoxes();
    gameZone.classList.add("hide");
}

