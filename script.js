let grid_square=document.querySelectorAll('.grid-square');
let gameboard = (function(){
    let win = 1;
    let sign = 'O';
    let winstatus="";
    let arr=['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    let check = ['u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u'];
    let availablespots=[];
    function minimax(current_board, player){
        find_spots();
        winstatus = win_check();
        if(win){
            if(winstatus=="X")
            return 1;
            if(winstatus=="O")
            return -1;
        }
        if(availablespots.length==0)
            return 0;
            
                if(player=="X"){
                     let maxEval= -Infinity;
                     for(let i=0; i<9; i++){
                        if(current_board[i]!=="X" && current_board[i]!=="O"){
                    current_board[i] = "X";
                    let score = minimax(current_board, "O");
                    current_board[i] = i;
                    maxEval = Math.max(maxEval, score);
                }
            }
                  return maxEval;
            }
         
                else{
                     let minEval= Infinity;
                     for(let i=0; i<9; i++){
                        if(current_board[i]!=="X" && current_board[i]!=="O"){
                    current_board[i] = "O";
                    let evalua = minimax(current_board, "X");
                    current_board[i] = i;
                    minEval = Math.min(minEval, evalua);   
             }
            }
             return minEval;   
        }
            
    }
    function reset_game(){
        arr=['0', '1', '2', '3', '4', '5', '6', '7', '8'];
         check = ['u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u'];
         grid_square.forEach(square => {
             square.firstChild.textContent ="";             
         });
         sign="O";
    }
    document.getElementById('reset').addEventListener('click', reset_game)
    function find_spots(){
        availablespots = [];
        for(i=0; i<9; i++){
            if(arr[i]!=="X" && arr[i]!=="O")
            availablespots.push(i);
        }
    }
    function switchsign(){
        if(sign=='O')
        sign = 'X';
        else sign = 'O';
    }
    function ai_turn(){
        let best_score=-Infinity;
        let best_move;
       for(let i=0; i<9; i++){
           if(arr[i]!=="X" && arr[i]!=="O"){
            arr[i] = "X";
            let score= minimax(arr, "O");
            arr[i]=i;
            if(score>best_score){
                best_score = score;
                best_move = i;
            }
        }
        }
        setTimeout(function() {
            document.getElementById(`${best_move}`).firstChild.classList.add('animation');
            document.getElementById(`${best_move}`).firstChild.textContent = "X";
          }, 600);
          
          document.getElementById(`${best_move}`).firstChild.classList.remove('animation');
        check[best_move] = "checked";
        arr[best_move] = "X";
        
    }
    
    function win_check(){
        let count=0;
        for(let i=0; i<3; i++){
            win = 1;
            for(let j=0; j<2; j++){
                if(typeof arr[count] === 'undefined'){
                    win=0;
                }
                else if(arr[count] !== arr[count+1]){
                    win=0;
                }
                winstatus = arr[count];
                count++;
            }
            count++;
            if(win){
            win=true;
             return winstatus;
            }
        }
        for(let i=0; i<3; i++){
            win = 1;
            count = i;
            for(let j=0; j<2; j++){
                if(typeof arr[count] === 'undefined'){
                    win=0;
                }
                else if(arr[count] !== arr[count+3]){
                    win=0;
                }
                winstatus = arr[count];
                count=count+3;
            }
            
            if(win){
                win=true;
            return winstatus;
            }
        }

        if( (typeof arr[0]!== 'undefined' && arr[0] == arr[4] && arr[4] == arr[8])){
            win=true;
            return arr[0];
        }
        if((typeof arr[2]!=='undefined' && arr[2] == arr[4] && arr[4] == arr[6])){
            win=true;
            return arr[2];
        }
        
    }
    function markbox(box){
        if(check[box.id]!=="checked"){
        box.firstChild.textContent = sign;
        check[box.id] = "checked";
        arr[box.id] = sign;
        if(p2.type=="ai")
        ai_turn();
        else
        switchsign();
         winstatus = win_check();
         if(win){
             p1.update_score(winstatus);
             p2.update_score(winstatus);
             check = ["checked", "checked", "checked", "checked", "checked", "checked", "checked", "checked", "checked"];
         }
  
        }
}
    return {
        markbox,
        winstatus,
        win,
        minimax,
        arr,
        reset_game,

    };

})();
const player = (type, sign, score) =>{
 

grid_square.forEach(box => {
    box.addEventListener('click', ()=>{
        box.firstChild.classList.add('animation');
        gameboard.markbox(box);
        setTimeout(function() {
        box.firstChild.classList.remove('animation');
        }, 800)
    }); 
});

function update_score(winningsign){
    if(this.sign == winningsign){
        this.score++;
        if(winningsign=="X")
        document.getElementById('pXscore').textContent = `Player X : ${this.score}`;
        if(winningsign=="O")
        document.getElementById('pOscore').textContent = `Player O : ${this.score}`;
    }
}
    return {sign, score, update_score, type};
};
let p1 = player("human", 'O',0);
let p2 = player("human", 'X', 0); 
document.getElementById('ai').addEventListener('click', ()=>{  
   gameboard.reset_game();
    p2.type = "ai";
   
})
document.getElementById('2player').addEventListener('click', ()=>{  
    gameboard.reset_game();
    p2.type = "human";
})
