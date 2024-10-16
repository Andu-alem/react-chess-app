import { useState } from "react";
import ChevronDoubleRightIcon from '@heroicons/react/24/solid/ChevronDoubleRightIcon'
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon'
import MinusIcon from '@heroicons/react/24/solid/MinusIcon'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'


const Wellcome = (props) => {
    const [name, setName] = useState('')
    const [opName, setOpName] = useState('JD')
    const [sidePreference, setSidePreference] = useState('w')
    const [isNameSet, setIsNameSet] = useState(false)
    const [withAi, setWithAi] = useState(false)
    const [withFriend, setFriend] = useState(false)
    const [level, setLevel] = useState(5)

    const checkNameSet = () => {
        if (name !== '') setIsNameSet(true)
    }
    const changeHandler = (event) => {
        const value = event.target.value 
        setName(value)
    }
    const increment = () =>{
        let newLevel = level + 1
        setLevel(newLevel > 20 ? 20 : newLevel)
    }
    const decrement = () => {
        let newLevel = level-1
        setLevel(newLevel > 1 ? newLevel : 1)
    }
    const levelChange = (event) => {
        let newLevel = event.target.value
        setLevel(newLevel < 1 || newLevel > 20 ? 10 : newLevel)
    }
    const startGame = () => {
        let data = {
            isWithAi: withAi,
            level: level,
            name: name,
            opponentName: withAi ? 'Ai' : opName,
            sidePreference: sidePreference
        }
        props.setupData(data)
    }

    return (
        <div className="w-[90%] ms:w-[70%] mx-auto p-3 ms:px-[10%] sm:px-[15%] lg:px-[23%] mt-[20vh] bg-black shadow-lg shadow-zinc-700 tracking-wider">
            <div className="w-[100%] min-h-[50vh] text-center text-white pt-[10%]">
                <div className={`${isNameSet ? 'hidden':'block'}`}>
                    <h3 className="font-bold text-lg bg-gradient-to-r from-amber-700 via-amber-400 to-white inline-block text-transparent bg-clip-text">Wellcome To ChessZone</h3>
                    <div className="mt-3">
                        <label className="font-medium text-lg" htmlFor="name">Your name</label>
                        <input 
                            className="text-black border-3 w-[70%] my-2 border-sky-900 rounded-lg px-2 font-medium bg-zinc-100" 
                            type="text" 
                            name="username"
                            onChange={ changeHandler } />
                    </div>
                    <button 
                        className="flex border border-green-500 rounded-lg px-2 py-1 mt-10 mx-[30%] font-bold hover:bg-green-500"
                        onClick={ checkNameSet }
                    >
                        Next <ChevronDoubleRightIcon className="w-[30px] h-[25px] mt-1 text-green-500 hover:text-sky-300" />
                    </button>
                </div>
                <div className={`${isNameSet && !withAi && !withFriend ? 'block':'hidden'} `}>
                    <h3 className="font-bold text-xl capitalize bg-gradient-to-r from-zinc-700 to-white inline-block text-transparent bg-clip-text">Okay { name }</h3>
                    <div className="mt-3 border border-zinc-700 py-4">
                        <h4 className="text-sm my-2">With who do you want to play?</h4>
                        <p className="flex cursor-pointer mx-[20%] bg-zinc-900 my-1 text-sm font-medium p-1 rounded-md hover:bg-zinc-700" onClick={ () => setWithAi(true) }>
                            <ChevronRightIcon className="w-[25px] h-[25px] text-green-500 pt-1" /> with AI
                        </p>
                        <p className="flex cursor-pointer mx-[20%] bg-zinc-900 my-1 text-sm font-medium p-1 rounded-md hover:bg-zinc-700" onClick={ () => setFriend(true) }>
                            <ChevronRightIcon className="w-[25px] h-[25px] text-green-500 pt-1" /> with Friend
                        </p>
                    </div>
                </div>

                <div className={`${withAi || withFriend ? 'block':'hidden'} text-white`}>
                    <p className="font-medium text-sm">Okay {name} you're going to play with { withAi ? 'AI oponent':'your friend'}</p>
                    <div className="border border-zinc-700 py-5 mt-3 text-sm my-1">
                        <div className={`${withAi ? 'block':'hidden'}`}>Challenge level(1-20)
                            <div className="flex ml-[30%] mt-3">
                                <MinusIcon 
                                    className="w-[25px] h-[25px] bg-zinc-900 mt-[3px] text-green-500 hover:bg-zinc-700 hover:text-white rounded-md" 
                                    onClick={decrement} />
                                <input 
                                    className="w-[50px] rounded-md mx-2 text-zinc-900 font-bold text-sm pl-2 bg-zinc-200" 
                                    type="number" 
                                    name="level" 
                                    value={ level } 
                                    onChange={levelChange}/>
                                <PlusIcon 
                                    className="w-[25px] h-[25px] bg-zinc-900 mt-[3px] rounded-md text-green-500 hover:bg-zinc-700 hover:text-white" 
                                    onClick={increment}/>
                            </div> 
                        </div>
                        <div className={`${withAi ? 'hidden':'block'}`}>
                            <label className="font-mono" htmlFor="oponnent-name">Your opponet name</label>
                            <input 
                                className="w-[50%] rounded-md px-2 py-1 my-2 text-zinc-900 font-bold text-sm px-1 bg-zinc-200" 
                                type="text" 
                                name="level" 
                                value={ opName } 
                                onChange={ (e) => setOpName(e.target.value) }/>
                        </div>
                        <div className="mt-3 tracking-wider">
                            <h3>Which side you prefer?</h3>
                            <div className="mt-2">
                                <button 
                                    className={`${sidePreference === 'w'? 'text-green-500':'text-white'} font-medium border border-zinc-700 rounded-lg px-1`}
                                    onClick={() => setSidePreference('w')}
                                    >White</button>
                                <button 
                                    className={`${sidePreference === 'b'? 'text-green-500':'text-white'} mx-2 font-medium border border-zinc-700 rounded-lg px-1`}
                                    onClick={() => setSidePreference('b')}
                                    >Black</button>
                            </div>
                        </div>
                    </div>
                    <button 
                        className="border border-green-500 px-2 rounded-lg mt-7 hover:bg-green-500 hover:text-white"
                        onClick={ startGame }
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Wellcome