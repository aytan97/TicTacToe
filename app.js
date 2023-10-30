let gameBlocks = document.querySelectorAll(".game-block")
let activePlayer = document.getElementById("active-player")
let gameMessages = document.querySelector(".messages")
let players = document.getElementById("players")
const propertiesToRemove = ["width", "height", "display", "flexDirection", "justifyContent", "alignItems", "backgroundColor", "position", "zIndex", "fontSize", "color"];
let nextPlayer = "";
let possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let scoreX = document.querySelector(".score-x")
let scoreO = document.querySelector(".score-o")
let scoreTie = document.querySelector(".score-tie")
scoreX.innerHTML = 0
scoreO.innerHTML = 0
scoreTie.innerHTML = 0
document.addEventListener('DOMContentLoaded', function () {
    players.innerHTML = `<p>Select the Player</p>
    <form id="selectPlayer">

        <label > <input type="radio" id="xplay" name="player" > X </label>
     
         <label><input type="radio" id="oplay" name="player" > O </label>
    
        </form>`
    Object.assign(players.style, {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.555)",
        position: "absolute",
        zIndex: "99999",
        fontSize: "40px",
        color: "white"
    });
    let xplayElement = document.getElementById("xplay");
    let oplayElement = document.getElementById("oplay");

    [xplayElement, oplayElement].forEach(element => {
        element.style.width = "25px";
        element.style.height = "25px";
    });


    let startBtn = document.querySelector(".start-game")
    startBtn.addEventListener('click', function () {
        window.location.reload();
        selectPlayer.reset();
    })

    let selectPlayer = document.getElementById("selectPlayer")
    selectPlayer.addEventListener('click', () => selectFirstPlayer())

    function selectFirstPlayer() {
        if (xplayElement.checked) {
            gameBlocks.forEach(gameBlock => gameBlock.style.removeProperty("pointer-events"))
            nextPlayer = "X"
            activePlayer.textContent = `${nextPlayer}'s Turn`;
            oplayElement.style.setProperty("checked", true)
            if (players) {
                players.remove();
            }
        }
        else if (oplayElement.checked) {
            gameBlocks.forEach(gameBlock => gameBlock.style.removeProperty("pointer-events"))
            nextPlayer = "O"
            activePlayer.textContent = `${nextPlayer}'s Turn`;
            oplayElement.style.setProperty("checked", true)
            propertiesToRemove.forEach(property => {
                players.style.removeProperty(property);
            });
            if (players) {
                players.remove();
            }
        }
        startGame()
    }
    selectFirstPlayer()

    function startGame() {
        gameBlocks.forEach(gameBlock => gameBlock.addEventListener('click', () => clickArea(gameBlock)))
    }

    function clickArea(gameBlock) {
        if (!xplayElement.checked && !oplayElement.checked) {
            gameBlocks.forEach(gameBlock => gameBlock.style.setProperty("pointer-events", "none"))
            setTimeout(() => { gameMessages.textContent = "Please select who plays first!" })
        }

        if (gameBlock.textContent === "") {
            // selectPlayer.childNodes.forEach(player => player.style.setAttribute("disabled", ture))
            gameBlock.textContent = nextPlayer
            setTimeout(() => { gameMessages.textContent = "" })
            changePlayer()

            if (findWinner() === true) {
                scoreX.innerHTML++;
                console.log(gameMessages.textContent)
                gameBlocks.forEach(gameBlock => gameBlock.style.pointerEvents = "none")
                activePlayer.textContent = "Game is over!!!";
            }
           else if (findWinner() === false) {
                scoreO.innerHTML++;
                console.log(gameMessages.textContent)
                gameBlocks.forEach(gameBlock => gameBlock.style.pointerEvents = "none")
                activePlayer.textContent = "Game is over!!!";
            }
            else if (checkTie() === true) {
                gameBlocks.forEach(gameBlock => gameBlock.style.pointerEvents = "none")
                activePlayer.textContent = "Game is over!!!"
                scoreTie.innerHTML++;
            }
            clearBlocks()

        }

        else if (gameBlock.textContent !== "") { gameMessages.textContent = "Please click on the empty block"; }
    }

    function changePlayer() {
        if (nextPlayer === "X") {
            nextPlayer = "O"
            activePlayer.textContent = `${nextPlayer}'s Turn`;
        }
        else if (nextPlayer === "O") {
            nextPlayer = "X"
            activePlayer.textContent = `${nextPlayer}'s Turn`;
        }
    }



    function bot(){
        let array=[]
    }


    /* 
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
    */

    let clickedChildIndex
    const parent = document.querySelector('.game-blocks');
    const children = Array.from(parent.querySelectorAll('.game-block'));
    children.forEach((child, index) => {
        child.addEventListener('click', () => {
            clickedChildIndex = index;
            console.log(clickedChildIndex);
        });
    });

    function findWinner() {
        for (let i = 0; i < possibleWins.length; i++) {
            for (let j = 0; j < possibleWins[i].length; j++) {
                if (possibleWins[j].includes(clickedChildIndex)) {
                    if ([...possibleWins[i]].every(innerArr => gameBlocks[innerArr].textContent !== "")) {
                        if ([...possibleWins[i]].every(innerArr => gameBlocks[innerArr].textContent === 'X')) {
                            setTimeout(() => { gameMessages.textContent = `X is winner` })
                            console.log("hello")
                            return true
                        }
                        if ([...possibleWins[i]].every(innerArr => gameBlocks[innerArr].textContent === 'O')) {
                            setTimeout(() => { gameMessages.textContent = `O is winner` })
                            console.log("hello")
                            return false
                        }
                    }
                }
            }
        }
    }

    function checkTie() {
        //if there is not any winner
        if ([...gameBlocks].every(block => block.textContent !== "") && !(findWinner()===true || findWinner()===false)) {
            setTimeout(() => { gameMessages.textContent = "Nobody is winner" })
            return true
        }
    }

    function clearBlocks() {
        if (checkTie() || findWinner()===true || findWinner()===false) {
            gameBlocks.forEach(gameBlock => {
                setTimeout(() => { gameBlock.textContent = ''; gameMessages.textContent = ''; gameBlock.style.pointerEvents = "auto" }, 1500,);
            })
        }
    }

})
