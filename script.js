const gameBoard = (()=>{
    const theBoard = []
    for (let i = 0; i < 9; i++){
        let aTile = document.createElement('div')
        aTile.classList.add('tile')
        aTile.setAttribute('tile-number',i + 1)
        aTile.textContent = 'X'
        theBoard.push(aTile)
    }
    return {theBoard}
})()

const createPlayer = (name, letter) =>{
    const tiles = []
    return {name, tiles, letter}
}

let test = createPlayer('Leo')
console.log(test.tiles)

function showBoard(){
    let myBoard = document.querySelector('.board')
    for (let i in gameBoard.theBoard){
        myBoard.appendChild(gameBoard.theBoard[i])
    }
}



showBoard()