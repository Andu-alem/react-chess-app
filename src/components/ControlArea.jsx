
export default function ControlArea ({ difficulty, isAIPlaying, undoHandler=() => fn, resetHandler=()=>fn}) {
    
    return (
        <div className="flex justify-between">
            <div className={isAIPlaying ? 'block':'hidden'}>
                <p className="text-sm m-1 text-white tracking-wide font-medium">Difficulty level <span className="bg-zinc-700 px-2 rounded-md font-bold text-amber-500">{ difficulty }</span></p>
              </div>
              
              <button className="text-sm font-medium border-2 h-[35px] border-green-500 rounded-lg px-1 hover:bg-green-500" onClick={ undoHandler } > Undo </button>
              <button className="text-sm font-medium border-2 h-[35px] border-green-500 rounded-lg px-1 hover:bg-green-500" onClick={ resetHandler } > Reset </button>
        </div>
    )
}