$(document).ready(function() {
    var board = [0,1,2,3,4,5,6,7,8];
    var userLetter = 'X';
    var computerLetter = 'O';

    //Let player choose which letter they want to be -
    promptUserForLetter();

    $('.cell').click(function() {

        //when a tile is clicked, add an x to the tile. But only if it's blank
        var myId = this.id;
        if ($('#'+ myId).text() === ''){
            $('#'+ myId).text(userLetter);
        }

        //write user choice to board
        board[myId] = userLetter;
        console.log(board);

        //check for draw
        if (check_for_draw(board)){
            alert("You Draw!");
            boardReset();
            promptUserForLetter();
        }

        //computers turn
        moveComputer(computerMoveChoice(board));
        console.log(board);

        //check for draw
        if (check_for_draw(board)){
            alert("You Draw!");
            boardReset();
            promptUserForLetter();
        }

        //check if computer won
        if (checkForWin(board, computerLetter)){
            alert("You Lose!");
            boardReset();
            promptUserForLetter();
        }

    });


    function checkForWin(board_now, letter){
        if ((board_now[6] == letter && board_now[7] == letter && board_now[8] == letter) ||
        (board_now[3] == letter && board_now[4] == letter && board_now[5] == letter) ||
        (board_now[0] == letter && board_now[1] == letter && board_now[2] == letter) ||
        (board_now[6] == letter && board_now[3] == letter && board_now[0] == letter) ||
        (board_now[7] == letter && board_now[4] == letter && board_now[1] == letter) ||
        (board_now[8] == letter && board_now[5] == letter && board_now[2] == letter) ||
        (board_now[6] == letter && board_now[4] == letter && board_now[2] == letter) ||
        (board_now[8] == letter && board_now[4] == letter && board_now[0] == letter)){
            return true;
        } else {
            return false;
        }
    }

    function check_for_draw(current_board) {
        var boardFull = true;
        var blankBoard = [0,1,2,3,4,5,6,7,8];
        for (var i = 0;i < blankBoard.length;i++){
            if (current_board.indexOf(blankBoard[i]) !== -1){
                boardFull = false;
                break;
            }
        }
        return boardFull;
    }

    function boardReset() {
        board = [0,1,2,3,4,5,6,7,8];
        userLetter = 'X';
        computerLetter = 'O';
        $('.cell').text('');
    }

    function promptUserForLetter() {
        $( "#dialog-confirm" ).dialog({
            resizable: false,
            height:240,
            modal: true,
            buttons: {
                "O": function() {
                    userLetter = "O";
                    computerLetter = "X";
                    $( this ).dialog( "close" );
                },
                "X": function() {
                    $( this ).dialog( "close" );
                }
            }
        });
    }

    function copyBoard(copyBoard) {
        var outCopyBoard = [];

        for(var i = 0;i < copyBoard.length;i++){
            outCopyBoard.push(copyBoard[i]);
        }

        return outCopyBoard;
    }

    function checkIfEmpty(emptyBoard, compInput){
        return (emptyBoard[compInput] !== 'X' && emptyBoard[compInput] !== 'O')
    }

    function computerMoveChoice(computerBoard){
        //goes down the list of moves in optimal order
        if (win()){
            return win();
        }
        else if (block()){
            return block();
        }
        else if (middle()){
            return middle();
        }
        else if (cornerRunner() || cornerRunner() === 0){ //javascript thinks 0 is false. It's a move dammit!
            return cornerRunner();
        } else if (randomSpot()){
            return randomSpot();
        } else {
            alert("error!");
        }

        //if computer can win it will
        function win() {
            for (var num = 0;num < 9;num++) {
                var boardCopy = copyBoard(computerBoard);
                if (checkIfEmpty(boardCopy, num)){
                    boardCopy[num] = computerLetter;
                    if (checkForWin(boardCopy, computerLetter)){
                        return num
                    }
                }
            }
        }

        //if computer can, it will block the user
        function block(){
            for (var num = 0;num < 9;num++) {
                var boardCopy = copyBoard(computerBoard);
                if (checkIfEmpty(boardCopy, num)){
                    boardCopy[num] = userLetter;
                    if (checkForWin(boardCopy, userLetter)){
                        return num
                    }
                }
            }
        }

        //if middle is open take it
        function middle(){
            if (checkIfEmpty(computerBoard, 4)){
                return 4;
            }
        }
        //if a corner is open, computer moves there
        function cornerRunner(){
            var corners = [0, 2, 6, 8];
            for (var cor = 0; cor < corners.length; cor++) {
                if (checkIfEmpty(computerBoard, corners[cor])) {
                    return corners[cor];
                }
            }
        }
        //choose random free spot
        function randomSpot() {
            var random = [ 0, 2, 6, 8,1, 3, 5, 7];
            for (var ran = 0; ran < random.length; ran++) {
                if (checkIfEmpty(computerBoard, random[ran])) {
                    return random[ran];
                }
            }
        }
    }

    function moveComputer(move){
        board[move] = computerLetter;
        $('#'+ move).text(computerLetter);
    }

});