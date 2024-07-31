
let grid = document.querySelector('.grid') ; 
let btnx = document.querySelector('.choose-x') ; 
let btno = document.querySelector('.choose-o') ; 
let turnBtn = document.querySelector('.turn') ; 
let header = document.querySelector('.header') ; 
let celebModal = document.querySelector('.reset-modal') ; 
let resetBtn = document.querySelector('.reset') ; 

let board = [
    ['' ,'' ,''],
    ['' ,'' ,''],
    ['' ,'' ,''],
]

let turn = '' ;
let isPlayable = true ; 


function markCard(i,j){
    if(!isPlayable) return  ; 
    if(!turn) return  ; // if turn is selected then only mark 
    if(!board[i][j]) board[i][j] = turn == 'X' ? 'X' : 'O' ; 
    else return ; 
    createGrid(board) ;
    isWin(board,i,j) ; 
    turn = turn == 'X' ? 'O' : 'X' ; 
    turnBtn.textContent = turn == 'X' ? '❌' : '⭕'  ; 
}

function isWin(board , i , j){

      const justMarked = board[i][j] ; 
      let isRight = true ; 
      for(let k=0;k<3;k++){ // check ith row
         if(board[i][k] != justMarked){
            isRight = false ; 
            break ; 
         }  
      }

      if(isRight){
        isPlayable = false ; 
        declareWinner(turn) ; 
        return ; 
      }
      isRight = true ; 
      for(let k=0;k<3;k++){ // check jth row
        if(board[k][j] != justMarked){
           isRight = false ; 
           break ; 
        }  
     }

     if(isRight){
        isPlayable = false ; 
        declareWinner(turn) ; 
        return ; 
      }

      isRight = true ; 

      if(i == j || i+j == 2){   // check diagonals
        for(let k =0;k<3;k++){
            if(board[k][k] != justMarked){
                isRight = false ; 
                break ; 
             } 
        }
        if(isRight){
            isPlayable = false ; 
            declareWinner(turn) ; 
            return ; 
          }
      }
}

function declareWinner(winner){
    console.log(celebModal.classList);
   celebModal.classList.remove('hidden-modal') ; 
   celebModal.classList.add('reset-modal') ; 
   let winSpan = document.querySelector('.winner') ; 
   winSpan.textContent = winner == 'X' ? '❌' : '⭕' ;
   resetBtn.addEventListener("click", resetGame) ; 
}

function resetGame() {
    turn = '' ; 
    board = [
        ['' ,'' ,''],
        ['' ,'' ,''],
        ['' ,'' ,''],
    ] ; 
    createGrid(board) ; 
    celebModal.classList.add('hidden-modal') ;
    celebModal.classList.remove('reset-modal') ;
    isPlayable = true ; 
    turnBtn.textContent = '' ; 
    header.classList.remove('hidden') ;
}

function createGrid(board){
    while (grid.firstChild) { // before creating ensure deleting all the previous cards 
        grid.removeChild(grid.firstChild);
    }

   for(let i=0;i<board.length;i++){
    for(let j=0;j<board.length;j++){
        let card = document.createElement('div') ; 
        card.classList.add('grid-card') ; 
        if(board[i][j] == 'X') card.textContent = '❌' ; 
        else if(board[i][j] == 'O') card.textContent = '⭕' ; 
        card.addEventListener('click' ,() => markCard(i,j)) ; 
        grid.appendChild(card) ; 
    }
   }
}

document.addEventListener("DOMContentLoaded" , () => {
      createGrid(board) ; 
})

btnx.addEventListener("click", () =>{
    turn = 'X' ; 
    turnBtn.textContent = '❌' ; 
    header.classList.add('hidden') ;  
})

btno.addEventListener("click", () =>{
    turn = 'O' ; 
    turnBtn.textContent = '⭕'
    header.classList.add('hidden') ; 
})