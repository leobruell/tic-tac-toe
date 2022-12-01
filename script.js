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
    }
    else if (gameFlow.turn == 'O'){
        theTile.textContent = 'O'
        playerTwo.tiles.push(tileNumber)
        gameFlow.turn = 'X'
    }
    theTile.removeEventListener('click', clickTile)
    checkEnd()

    if (document.querySelector('.end-message').textContent.includes('win')){
        let allTiles = document.querySelectorAll('.tile')
        Array.from(allTiles).forEach(tile =>{
            tile.removeEventListener('click', clickTile)
        })
    }
    if (playerTwo.name == 'Easy Computer' && !document.querySelector('.end-message').textContent.includes('win')) {
        easyComputerPlay()
        checkEnd()
    }
    else if (playerTwo.name == 'Hard Computer' && !document.querySelector('.end-message').textContent.includes('win')){
        hardComputerPlay()
        checkEnd()
    }
    else if (playerTwo.name == 'Impossible Computer' && !document.querySelector('.end-message').textContent.includes('win')){
        impossibleComputerPlay()
        checkEnd()
    }
}

function hardComputerPlay(){
    if (playerTwo.tiles.length == 0 && !playerOne.tiles.includes('5')){
        let computerPlacement = document.querySelector(`[tile-number='5']`)
        computerPlacement.textContent = 'O'
        playerTwo.tiles.push('5')
        gameFlow.turn = 'X'
        return
    }
    impossibleComputerPlay()
}


function impossibleComputerPlay(){
    let possiblePlays
    let computerPlacement
    let placementTile
    const winningCombos = [['1','2','3'], ['4','5','6'], ['7','8','9'], ['1','4','7'], ['2','5','8'], ['3','6','9'],['1','5','9'],['3','5','7']]
    for (let i in winningCombos){
        let playerOneCount = 0
        let playerTwoCount = 0
        winningCombos[i].forEach(val =>{
            if (playerOne.tiles.includes(val)){
                playerOneCount++
            }
            if (playerTwo.tiles.includes(val)){
                playerTwoCount++
            }
        })
        if (playerTwoCount == 2 && playerOneCount == 0){
            computerPlacement = winningCombos[i].filter(n => !playerTwo.tiles.includes(n))
            placementTile = document.querySelector(`[tile-number='${computerPlacement}']`)
            placementTile.textContent = 'O'
            playerTwo.tiles.push(`${computerPlacement}`)
            gameFlow.turn = 'X'
            return
        }
    }
    for (let i in winningCombos){
        let playerOneCount = 0
        let playerTwoCount = 0
        winningCombos[i].forEach(val =>{
            if (playerOne.tiles.includes(val)){
                playerOneCount++
            }
            if (playerTwo.tiles.includes(val)){
                playerTwoCount++
            }
        })
        if (playerOneCount == 2 && playerTwoCount == 0){
            computerPlacement = winningCombos[i].filter(n => !playerOne.tiles.includes(n))
            placementTile = document.querySelector(`[tile-number='${computerPlacement}']`)
            placementTile.textContent = 'O'
            playerTwo.tiles.push(`${computerPlacement}`)
            gameFlow.turn = 'X'
            return
        }
    }
    
    if (playerTwo.tiles.length < playerOne.tiles.length){
        possiblePlays = ['1', '3','7','9']
        possiblePlays = possiblePlays.filter(n => !playerOne.tiles.includes(n) && !playerTwo.tiles.includes(n))
        if (possiblePlays.length == 1 && !playerOne.tiles.includes('5') && !playerTwo.tiles.includes('5')){
            computerPlacement = document.querySelector(`[tile-number='5']`)
            computerPlacement.textContent = 'O'
            playerTwo.tiles.push('5')
            gameFlow.turn = 'X'
        }
        else{
            playRandom(possiblePlays)
        }
    }
}

function easyComputerPlay(){
    let totalPlays = ['1','2','3','4','5','6','7','8','9']
    let possiblePlays = totalPlays.filter(n => !playerOne.tiles.includes(n) && !playerTwo.tiles.includes(n))
    playRandom(possiblePlays)
}

function playRandom(possiblePlays){
    let randomVal = Math.random()
    let increment = 1 / possiblePlays.length
    let lowerBound = 0
    let upperBound = increment
    possiblePlays.forEach(tile =>{
        if (randomVal >= lowerBound && randomVal < upperBound){
            let placementTile = document.querySelector(`[tile-number='${tile}']`)
            placementTile.textContent = 'O'
            playerTwo.tiles.push(`${tile}`)
            possiblePlays = possiblePlays.filter(item => item !== tile.toString())
            gameFlow.turn = 'X'
            checkEnd()
        }
        lowerBound += increment
        upperBound += increment
    })
}

function checkEnd(){
    const body = document.querySelector('body')
    const endMessage = document.querySelector('.end-message')
    const winningCombos = [['1','2','3'], ['4','5','6'], ['7','8','9'], ['1','4','7'], ['2','5','8'], ['3','6','9'],['1','5','9'],['3','5','7']]
    function isSubset(combo, playerTiles){
        return combo.every((element) => playerTiles.includes(element))
    }
    winningCombos.forEach(combo =>{
        if (isSubset(combo, playerOne.tiles)){
            endMessage.textContent = `${playerOne.name} wins!`
        }
        else if (isSubset(combo, playerTwo.tiles)){
            endMessage.textContent = `${playerTwo.name} wins!`
        }
    })
    if (playerOne.tiles.length == 5 && !document.querySelector('.end-message').textContent.includes('win')){
        endMessage.textContent = 'You tied!'
    }
}

function clickNextOne(event){
    event.preventDefault()
    if (document.querySelector('.player-one input').value != ''){
        const playerOneName = document.querySelector('.player-one input').value 
        playerOne.name = playerOneName
        document.querySelector('.part-1').style.display = 'none'
        document.querySelector('.part-2').style.display = 'grid'
        document.querySelector('.next-2').addEventListener('click', clickNextTwo)
    }
    else{
        const nameWarning = document.createElement('p')
        nameWarning.classList.add('name-warning')
        nameWarning.textContent = 'Please enter your name!'
        const partOne = document.querySelector('.part-1')
        partOne.appendChild(nameWarning)
    }
}

function clickNextTwo(event){
    event.preventDefault()
    const opponentChoice = document.querySelector('input[name="question-2"]:checked').value
    document.querySelector('.part-2').style.display = 'none'
    if (opponentChoice == 'friend'){
        document.querySelector('.part-3a').style.display = 'grid'
        document.querySelector('.submit-button').addEventListener('click', clickStartA)
    }
    else{
        document.querySelector('.part-3b').style.display = 'grid'
        document.querySelector('.submit-button-b').addEventListener('click', clickStartB)
    }
}

function clickStartA(event){
    event.preventDefault()
    if (document.querySelector('.player-two input').value != ''){
        const playerTwoName = document.querySelector('.player-two input').value 
        playerTwo.name = playerTwoName
        document.querySelector('.options').style.display = 'none'
        document.querySelector('.board').style.display = 'grid'
        showBoard()
    }
    else{
        const nameWarning = document.createElement('p')
        nameWarning.classList.add('name-warning')
        nameWarning.textContent = 'Please enter your name!'
        const partThree = document.querySelector('.part-3a')
        partThree.appendChild(nameWarning)
    }
}

function clickStartB(event){
    event.preventDefault()
    const levelSelection = document.querySelector('input[name="difficulty"]:checked').value
    if (levelSelection == 'easy'){
        playerTwo.name = 'Easy Computer'
    }
    else if (levelSelection == 'hard'){
        playerTwo.name = 'Hard Computer'
    }
    else{
        playerTwo.name = 'Impossible Computer'
    }
    document.querySelector('.options').style.display = 'none'
    document.querySelector('.board').style.display = 'grid'
    showBoard()
}


//Starting Set-up:
const playerOne = createPlayer()
const playerTwo = createPlayer()
const nextOneButton = document.querySelector('.next-1')
nextOneButton.addEventListener('click', clickNextOne)

