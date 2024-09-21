let DataDisplayArea = ({ player, gain, pieces }) => {
    let style = {
        border : "1px groove lightgrey",
        textAlign : "left",
        minHeight : "100px",
        paddingLeft : "10px",
        fontStyle : "italic",
        overflowWrap : "all"
    }
    return (
        <div className="col-lg-3 col-11 m-auto mt-2 text-white" style={style} >
            <h4>{ player }</h4>
            <section>
                <label>Collected: </label>
                { 
                    gain.map( (item, i) => {
                        return <img alt='' style = {{ width: "20px", height: "20px" }} key={i} src={ pieces[item].internalValue } />
                    })
                }
            </section>
        </div>
    )
}

export default DataDisplayArea