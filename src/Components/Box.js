function Box(props) {
    let style = {
        border : props.clickedBox === props.id ? "3px groove blue" : props.pieceId === "k1" && props.isKOneInCheck ? "3px groove red" : "",
        boxSizing: "border-box",
        width : "52px",
        height : "52px",
        cursor : "pointer",
        fontWeight : "bold",
        paddingLeft : "2%",
        paddingTop : "2%",
        transform : "rotateZ(90deg)",
        color: props.piece === null ? "" : props.piece.player === "player1" ? "red" : "green",
        ...props.style
    }
    
    return (
        <div style={style} onClick={ props.boxClickHandler }>
            {
                props.piece !== null ? props.piece.internalValue : "" 
            }
        </div>
    )
}

export default Box