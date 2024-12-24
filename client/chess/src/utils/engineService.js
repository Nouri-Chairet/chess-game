class StockfishService {
  constructor() {
    this.worker = new Worker(new URL('./stockfishWorker.js', import.meta.url));
    this.worker.onmessage = this.onMessage.bind(this);
    this.init();
  }

  init() {
    this.sendCommand('uci');
    this.sendCommand('isready');
  }

  sendCommand(command) {
    this.worker.postMessage(command);
  }

  onMessage(event) {
    console.log('Stockfish:', event.data);
  }

  setSkillLevel(skillLevel) {
    this.sendCommand(`setoption name Skill Level value ${skillLevel}`);
  }

  evaluatePosition(fen) {
    this.sendCommand(`position fen ${fen}`);
    this.sendCommand('go depth 15');
  }

  getBestMove(fen) {
    return new Promise((resolve) => {
      this.worker.onmessage = (event) => {
        if (event.data.includes('bestmove')) {
          const move = event.data.split(' ')[1];
          resolve(move);
        }
      };
      this.evaluatePosition(fen);
    });
  }
}

export default StockfishService;
