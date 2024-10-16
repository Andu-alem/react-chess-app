import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon'
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon'
import { useState, useEffect } from 'react';


export default function SettingsBar (props) {
    const {
        isGameStarted,
        setupData,
        name,
        sidePreference,
        setSidePreference,
        setBackground,
        setMenuClicked } = props
    const [openAi, setOpenAi] = useState(false)
    const [openFriend, setOpenFriend] = useState(false)
    const [openRules, setOpenRules] = useState(false)
    const [level, setLevel] = useState(5)
    const [opponentName, setOpName] = useState('JDoe')
    const [whichSide, setWhichSide] = useState(sidePreference)

    useEffect(() => {
        setWhichSide(sidePreference)
    },[sidePreference])

    const onStartHandler = (e, isAi) => {
        const isWithAi = isAi
        const data = {
            isWithAi,
            level,
            name,
            sidePreference: whichSide,
            opponentName: isAi ? 'Ai':opponentName
        }
        setupData(data)
        setOpenAi(false)
        setOpenFriend(false)
        setMenuClicked(false)
    }
    const onLevelChange = (e) => {
        setLevel(e.target.value)
    }
    const onNameChange = (e) => {
        setOpName(e.target.name)
    }
    const handlePreference = () => {
        if (isGameStarted) return
        let preference = whichSide==='w' ? 'b' : 'w'
        setWhichSide(preference)
        setSidePreference(preference)
    }


    return (
        <div className="m-2 py-2 border-b border-zinc-700 text-white cursor-default">
            <a className="text-sky-400 text-sm font-medium mx-2 px-3 pb-2 border-b border-zinc-700 hover:bg-zinc-700" href="https://andu-alem.github.io" target="_blank">About/Who is the dev</a>
            <h3 className="text-amber-300 font-bold mx-5 mt-2">Board appearance</h3>
            <div className="border-t border-zinc-700 pl-10 m-2 text-sm">
                <p 
                    className="my-1 border-b border-zinc-900 hover:text-green-500 hover:bg-zinc-700 py-1 px-2"
                    onClick={() => setBackground({black:'#ad7b52', white: '#f4e3a4'})}
                    >Default</p>
                <p 
                    className="my-1 border-b border-zinc-900 hover:text-green-500 hover:bg-zinc-700 py-1 px-2"
                    onClick={() => setBackground({black:'#2d862d', white: '#b3cccc'})}
                >Grinish</p>
                <p 
                    className="my-1 border-b border-zinc-900 hover:text-green-500 hover:bg-zinc-700 py-1 px-2"
                    onClick={() => setBackground({black:'#206040', white: '#94b8b8'})}
                >Darker-G</p>
                <p 
                    className="my-1 border-b border-zinc-900 hover:text-green-500 hover:bg-zinc-700 py-1 px-2"
                    onClick={() => setBackground({black:'#595959', white: '#e0e0d1'})}
                >White-Black</p>
            </div>
            <h3 className="text-amber-400 font-bold mx-5">Play with</h3>
            <div className="border-t border-zinc-700 pl-10 m-2 text-sm">
                <div className={`my-1 border-b border-zinc-900 py-1 px-2`}>
                    <div className="flex justify-start py-1 border-b border-zinc-700 hover:text-green-500 hover:bg-zinc-700" onClick={() => setOpenAi(!openAi)}>
                        <ChevronRightIcon className={`${openAi ? 'hidden':'block'} w-[20px] h-[20px] mt-[3px]`} />
                        <ChevronDownIcon className={`${openAi ? 'block':'hidden'} w-[20px] h-[20px] mt-[3px]`} />
                        <p className="mx-2">AI/Computer</p>
                    </div>
                    <div className={`${openAi && !isGameStarted ? 'flex flex-col jusitfy-center':'hidden'} py-2 px-4`}>
                        <h2>Set difficulty level</h2>
                        <input className="w-[50px] rounded-md bg-zinc-300 pl-2 text-black font-bold my-2" type="number" name="difficulty" value={level} onChange={onLevelChange}/>
                        <button 
                            className="my-1 w-[55px] rounded-md border border-green-500 text-white hover:bg-green-500 font-medium py-[2px]"
                            onClick={ (e) => onStartHandler(e, true) }
                        >start</button>
                    </div>
                    <div className={`${openAi && isGameStarted ? 'flex flex-col jusitfy-center':'hidden'} p-2`}>
                        <h2 className="text-red-400 font-medium">You can't handle this the game is alreay started!!</h2>
                    </div>
                </div>
                <div className={`my-1 border-b border-zinc-900 py-1 px-2`}>
                    <div className="flex justify-start py-1 border-b border-zinc-700 hover:text-green-500 hover:bg-zinc-700" onClick={() => setOpenFriend(!openFriend)}>
                        <ChevronRightIcon className={`${openFriend ? 'hidden':'block'} w-[20px] h-[20px] mt-[3px]`} />
                        <ChevronDownIcon className={`${openFriend ? 'block':'hidden'} w-[20px] h-[20px] mt-[3px]`} />
                        <p className="mx-2">A Friend</p>
                    </div>
                    <div className={`${openFriend && !isGameStarted ? 'flex flex-col justify-center':'hidden'} py-2 px-4`}>
                        <h2>What's your friend name?</h2>
                        <input className="w-[57%] rounded-md bg-zinc-300 px-2 text-black font-bold my-2" type="text" name="difficulty" value={opponentName} onChange={onNameChange}/>
                        <button 
                            className="my-1 w-[55px] rounded-md border border-green-500 text-white hover:bg-green-500 font-medium py-[2px]"
                            onClick={ (e) => onStartHandler(e, false) }
                        >start</button>
                    </div>
                    <div className={`${openFriend && isGameStarted ? 'flex flex-col jusitfy-center':'hidden'} p-2`}>
                        <h2 className="text-red-400 font-medium">You can't handle this the game is alreay started!!</h2>
                    </div>
                </div>
            </div>
            <div className="flex justify-between font-bold mx-2 px-3 py-1 border-t border-b border-zinc-700 hover:bg-zinc-700" onClick={handlePreference}>
                <h3 className="text-amber-300">Change prference</h3>
                <span className={`${isGameStarted ? 'text-gray-700':'text-green-500'} text-sm mt-1`}>{ whichSide === 'w' ? 'White':'Black'}</span>
            </div>
            <div>
                <div className="flex justify-start py-1 hover:text-green-500 hover:bg-zinc-700 pl-2" onClick={() => setOpenRules(!openRules)}>
                    <ChevronRightIcon className={`${openRules ? 'hidden':'block'} w-[20px] h-[20px] mt-[3px]`} />
                    <ChevronDownIcon className={`${openRules ? 'block':'hidden'} w-[20px] h-[20px] mt-[3px]`} />
                    <h3 className="text-amber-400 font-bold mx-2">Game Rules</h3>
                </div>
                <div className={`${openRules ? 'flex':'hidden'} p-3 border-t border-zinc-700`}>
                    <p>The game rules will be added soon </p>
                </div>
            </div>
        </div>
    )
}