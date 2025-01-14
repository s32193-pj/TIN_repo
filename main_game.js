const board = document.querySelector("#board")
const player = document.querySelector("#player")
const msg = document.querySelector("#messages")
const side = 8
let playerTurn = ["white", "black"]
let turn_counter = 0;
player.textContent = playerTurn[turn_counter];

const piece_set = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]


function set_board() {
    piece_set.forEach((element, k) => {

        const square = document.createElement("div")
        square.classList.add("square")
        square.setAttribute("square-id", 63 - k)
        square.innerHTML = element
        square.firstChild?.setAttribute("draggable", true)

        const row = Math.floor(k / 8)
        const col = k % 8

        if ((row + col) % 2 === 0) {
            square.classList.add("white_square");
        } else {
            square.classList.add("black_square");
        }

        if (k <= 15) {
            square.firstChild.firstChild.classList.add("black")
        }

        if (k >= 48) {
            square.firstChild.firstChild.classList.add("white")
        }

        board.append(square)


    })

}


set_board();

const all_divs = document.querySelectorAll("div")
all_divs.forEach((element) => {
    element.addEventListener("dragstart", dragstart)
    element.addEventListener("dragover", dragover)
    element.addEventListener("drop", dragdrop)
})

let draggedPiece = null

function dragstart(e) {
    if (e.target.classList.contains("piece")) {
        draggedPiece = e.target
    }
}

function dragover(e) {
    e.preventDefault()
}

function nextTurn() {
    if (turn_counter === 0) {
        turn_counter = 1
        black_board()
    } else {
        turn_counter = 0
        white_board()
    }
    player.textContent = playerTurn[turn_counter];
}

function white_board() {
    const all_divs = document.querySelectorAll("#board .square")
    all_divs.forEach((element, k) => {
        element.setAttribute("square-id", (63 - k))
    })
}

function black_board() {
    const all_divs = document.querySelectorAll("#board .square")
    all_divs.forEach((element, k) => {
        element.setAttribute("square-id", k)
    })
}

function dragdrop(e) {
    e.stopPropagation()
    e.preventDefault()

    const opponent_move = playerTurn[turn_counter] === "white" ? "black" : "white";
    const captured_piece = e.target.firstChild?.classList.contains(opponent_move)


    if (check_if_piece_move_valid(e.target)) {
        if (draggedPiece.firstChild.classList.contains(playerTurn[turn_counter])) {
            msg.textContent = ""
            if (e.target.classList.contains("piece")) {
                if (captured_piece === true && !draggedPiece.firstChild.classList.contains(e.target.firstChild.getAttribute("class"))) {
                    e.target.firstChild.remove()
                    e.target.append(draggedPiece)
                    msg.textContent = (playerTurn[turn_counter] + " has taken enemy opponent " + e.target.getAttribute("id"))

                    let dropTarget = e.target
                    if (!dropTarget.classList.contains("square")) {
                        dropTarget = dropTarget.closest(".square")
                    }

                    if (dropTarget && !dropTarget.firstChild && draggedPiece) {
                        dropTarget.append(draggedPiece)
                    }
                    nextTurn()
                }
            } else if (!e.target.classList.contains("piece")) {
                e.target.append(draggedPiece)
                nextTurn()
            }
        } else {
            msg.textContent = "Invalid move"
        }
    }
}


function check_if_piece_move_valid(target) {

    let targetSquare = target.closest(".square")
    const targetID = Number(targetSquare?.getAttribute("square-id"))
    const startSquare = draggedPiece.parentNode.closest(".square")
    const startID = Number(startSquare?.getAttribute("square-id"))


    if (draggedPiece.getAttribute("id") === "king") {
        console.log(startID, targetID, "you are here")
        if (king_move_validation(startID, targetID)) {
            console.log("correct move")
            return true
        } else {
            console.log("incorrect move")
            return false
        }
    }
    if (draggedPiece.getAttribute("id") === "queen") {
        console.log(startID, targetID, "you are here")
        if (queen_move_validation(startID, targetID)) {
            console.log("correct move")
            return true
        } else {
            console.log("incorrect move")
            return false
        }
    }
    if (draggedPiece.getAttribute("id") === "rook") {
        console.log(startID, targetID, "you are here")
        if (rook_move_validation(startID, targetID)) {
            console.log("correct move")
            return true
        } else {
            console.log("incorrect move")
            return false
        }
    }
    if (draggedPiece.getAttribute("id") === "bishop") {
        console.log(startID, targetID, "you are here")
        if (bishop_move_validation(startID, targetID)) {
            console.log("correct move")
            return true
        } else {
            console.log("incorrect move")
            return false
        }
    }
    if (draggedPiece.getAttribute("id") === "knight") {
        console.log(startID, targetID, "you are here")
        if (knight_move_validation(startID, targetID)) {
            console.log("correct move")
            return true
        } else {
            console.log("incorrect move")
            return false
        }
    }
    if (draggedPiece.getAttribute("id") === "pawn") {
        console.log(startID, targetID, "you are here")
        if (pawn_move_validation(startID, targetID)) {
            console.log("correct move")
            return true
        } else {
            console.log("incorrect move")
            return false
        }
    }


}




