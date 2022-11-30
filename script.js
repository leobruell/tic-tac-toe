const gameBoard = (()=>{
    const theBoard = []
    for (let i = 0; i < 9; i++){
        let aTile = document.createElement('div')
        aTile.classList.add('tile')
        aTile.setAttribute('tile-number',i + 1)
        aTile.addEventListener('click', clickTile)
        theBoard.push(aTile)
    }
    return {theBoard}
})()

const gameFlow = (()=>{
    let turn = 'X'
    return {turn}
})()

const createPlayer = () =>{
    const tiles = []
    const name = ''
    return {name, tiles}
}


function showBoard(){
    let myBoard = document.querySelector('.board')
    for (let i in gameBoard.theBoard){
        myBoard.appendChild(gameBoard.theBoard[i])
    }
}

function clickTile(event){
    let theTile = event.target
    const tileNumber = theTile.getAttribute('tile-number')
    if (gameFlow.turn == 'X'){
        theTile.textContent = 'X'
        playerOne.tiles.push(tileNumber)
        gameFlow.turn = 'O'
        console.log(playerOne.tiles)
    }
    else if (gameFlow.turn == 'O'){
        theTile.textContent = 'O'
        playerTwo.tiles.push(tileNumber)
        gameFlow.turn = 'X'
        console.log(playerTwo.tiles)
    }
    theTile.removeEventListener('click', clickTile)
    checkEnd()
}

function checkEnd(){
    const endMessage = document.createElement('h2')
    const body = document.querySelector('body')
    const winningCombos = [['1','2','3'], ['4','5','6'], ['7','8','9'], ['1','4','7'], ['2','5','8'], ['3','6','9'],['1','5','9'],['3','5','7']]
    function isSubset(combo, playerTiles){
        return combo.every((element) => playerTiles.includes(element))
    }
    winningCombos.forEach(combo =>{
        if (isSubset(combo, playerOne.tiles)){
            endMessage.textContent = `${playerOne.name} wins!`
            console.log(endMessage)
            body.appendChild(endMessage)
        }
        else if (isSubset(combo, playerTwo.tiles)){
            endMessage.textContent = `${playerTwo.name} wins!`
            body.appendChild(endMessage) 
        }
    })
    if (playerOne.tiles.length == 5){
        endMessage.textContent = 'You tied!'
        body.appendChild(endMessage)
    }
}

function clickStart(event){
    event.preventDefault()
    const playerOneName = document.querySelector('.player-one input').value 
    const playerTwoName = document.querySelector('.player-two input').value
    playerOne.name = playerOneName
    playerTwo.name = playerTwoName
}

//Starting Set-up:
const playerOne = createPlayer()
const playerTwo = createPlayer()
const submitButton = document.querySelector('.submit-button')
submitButton.addEventListener('click', clickStart)
showBoard()

