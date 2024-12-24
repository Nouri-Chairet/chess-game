self.importScripts('/stockfish/src/stockfish.js');

const engine = self;

engine.onmessage = (event) => {
  const command = event.data;
  if (typeof onmessage === 'function') {
    postMessage({ type: 'log', message: `Command received: ${command}` });
  }
  // Send the command to the Stockfish engine
  engine.postMessage(command);
};
