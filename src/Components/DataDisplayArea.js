let DataDisplayArea = (props) => {
    let style = {
        border : "1px groove lightgrey",
        textAlign : "left",
        minHeight : "100px",
        paddingLeft : "10px",
        fontStyle : "italic"
    }
    return (
        <div className="col-lg-3 col-11 m-auto mt-2 text-white" style={style} >
            <h4>{ props.player }</h4>
            <section>
                <label>Collected: </label>
                { 
                    props.gain.map( (item, i) => {                        
                       return <span style = {{ color : "green", fontWeight : "bold", paddingLeft : "5px" }} key={i}>{ item } </span>
                    })
                    }
            </section>
        </div>
    )
}

export default DataDisplayArea