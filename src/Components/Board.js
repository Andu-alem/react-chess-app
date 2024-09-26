import Box from './Box';

let Board = (props) => {
    let style = {
        width : "366px",
        border : "1px solid grey",
        transform : "rotateZ(-90deg)"
    }

    return (
        <div className="col-lg-4 col-11 mb-2">
            <div className="d-flex flex-wrap m-auto mt-4 p-2 ps-4" style={ style } >
                <h1 style = {{
                    position : "absolute",
                    top : "200px",
                    left : "130px",
                    zIndex : "1",
                    transform : "rotateZ(90deg)",
                    color : "red"
                }}> { props.checkMate ? "Check Mate!!!!" : "" } </h1>   
                {                    
                    Object.entries(props.board).map(item => {
                        //console.log("piece id",item)
                        let piece = item[1].pieceId !== null ? props.pieces[item[1].pieceId] : null;
                        let id = item[0];
                    return (
                            <Box
                                key={item[1].index}
                                style={item[1].style}
                                id={ id }
                                piece = { piece }
                                boxClickHandler = { () => props.boxClickHandler(id, piece, item[1].pieceId) } 
                                clickedBox = {props.clickedBox} 
                                isKOneInCheck = {props.isKOneInCheck} />)
                        })
                }
            </div>
            <button className="offset-7 offset-md-5 btn text-white w-50 mt-3" onClick={ props.undoLastTwoMoves }>Undo last move</button>
        </div>
    )
}

export default Board