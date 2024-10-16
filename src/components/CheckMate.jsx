import { useState, useEffect } from 'react';


export default function CheckMate ({ whoWins, playerName, gameOver, reset }) {

    return (
        
        <div className={`${gameOver ? 'fixed':'hidden'} w-[70vw] h-[40vh] bg-zinc-950 top-[25vh] left-[15vw] opacity-[.92] rounded-md p-3`}>
            <div className="text-center">
                <h2 className={`font-bold text-3xl ${whoWins === 'one' ? 'text-green-500': whoWins === 'draw' ? 'text-yellow-700':'text-red-500'}`}>
                    { whoWins === 'one' ? 'Congrats!!!': whoWins === 'draw' ? 'In draw':'Oops!!!' }
                </h2>
                <h2 className="font-bold font-serif text-xl text-amber-300">{ playerName }</h2>
                <p className="text-white text-sm font-medium">You { whoWins === 'one' ? 'naild it!': whoWins === 'draw' ? '= opponent':'lost!' }</p>
                <button 
                    className="border border-green-500 font-medium rounded-md hover:bg-green-500 p-1 my-3"
                    onClick={reset}
                >Play again</button>
            </div>
        </div>
    )
}