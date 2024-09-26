function Box(props) {
    let style = {
        border : props.clickedBox === props.id ? "3px groove blue" : props.pieceId === "k1" && props.isKOneInCheck ? "3px groove red" : "",
        boxSizing: "border-box",
        width : "39px",
        height : "39px",
        cursor : "pointer",
        fontWeight : "bold",
        paddingLeft : "2%",
        paddingTop : "2%",
        transform : "rotateZ(90deg)",
        color: props.piece === null ? "" : props.piece.player === "player1" ? "red" : "green",
        ...props.style
    }
    let imgStyle = {
        width : "60%",
        height : "80%",
        marginLeft : "5px"
    }
    
    return (
        <div style={style} onClick={ props.boxClickHandler }>
            {
                props.piece !== null ? 
                <img src={ props.piece.internalValue } style={ imgStyle } alt=''/>
                : ""  
            }
        </div>
    )
}

export default Box