
const CapturedList = ({ pieces }) => {
    return (
        <div className="flex justify-start flex-wrap">
            {
                pieces.map((piece, index) => (
                    <span className="w-[20px]" key={ index } >{ piece }</span>
                ))
            }
        </div>
    )
}

export default CapturedList