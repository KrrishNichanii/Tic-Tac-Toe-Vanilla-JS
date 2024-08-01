
let grid = document.querySelector('.grid') ; 
let btnx = document.querySelector('.choose-x') ; 
let btno = document.querySelector('.choose-o') ; 
let turnBtn = document.querySelector('.turn') ; 
let header = document.querySelector('.header') ; 
let celebModal = document.querySelector('.reset-modal') ; 
let resetBtn = document.querySelector('.reset') ; 
let confetti = document.querySelector('.celebration')

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
    if(isWin(board,i,j)) return ; 
    turn = turn == 'X' ? 'O' : 'X' ; 
    turnBtn.textContent = turn == 'X' ? '❌' : '⭕'  ; 
    if(isDraw(board))  declareDraw() ; 
}

function declareDraw(){
    celebModal.classList.remove('hidden-modal') ; 
    celebModal.classList.add('reset-modal') ; 
    let winSpan = document.querySelector('.winner') ; 
    winSpan.textContent = 'No one';
    confetti.textContent = " " ; 
    resetBtn.addEventListener("click", resetGame) ; 
}


function isDraw(board){
    let cnt = 0 ; 
    for(let i=0;i<board.length;i++) for(let j=0;j<board.length;j++) if(board[i][j]) cnt++ ; 
    if(cnt == 9) return true ; 
    else false ; 
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
        return true; 
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
        return true; 
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
            return true; 
          }

          isRight = true ; 

          for(let k = 2;k>=0;k--){
            if(board[2-k][k] != justMarked){
                isRight = false ; 
                break ; 
             } 
            }

        if(isRight){
            isPlayable = false ; 
            declareWinner(turn) ; 
            return true; 
          }
      }
}

function declareWinner(winner){
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
    confetti.textContent = '🎊' ; 
    header.innerHTML = 'Choose <span class="choose-x">❌</span> or <span class="choose-o">⭕</span> '
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
    header.innerHTML = 'Tic Tac Toe'

})

btno.addEventListener("click", () =>{
    turn = 'O' ; 
    turnBtn.textContent = '⭕'
    header.innerHTML = 'Tic Tac Toe'

})
