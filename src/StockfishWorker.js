const wasmSupported = typeof WebAssembly === 'object' && WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00))
let stockfish = new Worker(wasmSupported ? './stockfish/stockfish.wasm.js' : './stockfish/stockfish.js')

export const getBestMove = (fen, difficulty, callback) => {    
    stockfish.postMessage('uci')
    stockfish.postMessage(`position fen ${fen}`)
    stockfish.postMessage(`go depth ${difficulty}`)

    stockfish.onmessage = (event) => {
        if (event.data.includes('bestmove')) {
            const bestMove = event.data.split(' ')[1]
            callback(bestMove)
        }
    }
}
