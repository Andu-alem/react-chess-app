let board = [];
let black = "#86592d";
let white = "#8c8c8c";
for (let index = 0; index < 64; index++) {
    if (index < 8) {
        board[`a${index + 1}`] = {
            index : index,
            style : {
                backgroundColor : index % 2 === 0 ? black : white
            },
            pieceId : null
        }
    } else if (index < 16) {
        board[`b${index - 8 + 1}`] = {
            index : index,
            style : {
                backgroundColor : index % 2 !== 0 ? black : white
            },
            pieceId : null
        }
    } else if (index < 24) {
        board[`c${index - 16 + 1}`] = {
            index : index,
            style : {
                backgroundColor : index % 2 === 0 ? black : white
            },
            pieceId : null
        }
    } else if (index < 32) {
        board[`d${index - 24 + 1}`] = {
            index : index,
            style : {
                backgroundColor : index % 2 !== 0 ? black : white
            },
            pieceId : null
        }
    } else if (index < 40) {
        board[`e${index - 32 + 1}`] = {
            index : index,
            style : {
                backgroundColor : index % 2 === 0 ? black : white
            },
            pieceId : null
        }
    } else if (index < 48) {
        board[`f${index - 40 + 1}`] = {
            index : index,
            style : {
                backgroundColor : index % 2 !== 0 ? black : white
            },
            pieceId : null
        }
    } else if (index < 56) {
        board[`g${index - 48 + 1}`] = {
            index : index,
            style : {
                backgroundColor : index % 2 === 0 ? black : white
            },
            pieceId : null
        }
    } else {
        board[`h${index - 56 + 1}`] = {
            index : index,
            style : {
                backgroundColor : index % 2 !== 0 ? black : white
            },
            pieceId : null
        }
    }
}

export default board