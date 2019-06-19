import electron from 'electron';
const { ipcMain } = electron;

import Nupdi from '.';
/*
export const load = ()=> {
  ipcMain.on("updi::open", (event, arg) => {
    const dev = new Nupdi();
    const {baudrate, device, port} = arg;
    let result = false;
    
    console.log("open:", arg);
    
    try {
      result = dev.open(port, baudrate, device);
    }catch (error){
      console.log("device open:", error);
    }
    
    console.log("open result:", result);
    event.sender.send('updi::open-return', result);
  })

  ipcMain.on("updi::close", (event, arg) => {
    const dev = new Nupdi();
    let result = false;

    console.log("close:");
    
    try {
      result = dev.close();
    }catch (error){
      console.log("device close:", error);
    }

    console.log("close result:", result);
    event.sender.send('updi::close-return', result);
  })
}
*/

export class NupdiWrapper {
  /*
    default priority value if not defined
  */
  static commandDefaultPrior = 10;  //small if higher priority

  /*
    store command by priority order, 
    the commands with same order store in a array as FIFO
  */
  static orderedCommandBuffer = {};

  /*
    Indicated the command in process, it use Promise
  */
  static commandProcPipe = null;

  constructor() {
    this.dev = new Nupdi();

    this.updiOpen = this.updiOpen.bind(this);
    this.updiClose = this.updiClose.bind(this);
    this.updiReadMem = this.updiReadMem.bind(this);
  }

  hasCommand() {
    return Object.keys(NupdiWrapper.orderedCommandBuffer).length;
  }

  popCommand() {  
    const prior = Object.keys(NupdiWrapper.orderedCommandBuffer).sort()[0];
    const cmd = NupdiWrapper.orderedCommandBuffer[prior].pop(); //ascending
    
    if (!NupdiWrapper.orderedCommandBuffer[prior].length)
      delete NupdiWrapper.orderedCommandBuffer[prior];

    return cmd;
  }

  pushCommand(cmd) {
    const prior = cmd['prior'] || NupdiWrapper.commandDefaultPrior;
    if (!NupdiWrapper.orderedCommandBuffer.hasOwnProperty(prior)) {
      NupdiWrapper.orderedCommandBuffer[prior] = [];
    }

    NupdiWrapper.orderedCommandBuffer[prior].unshift(cmd);
  }

  pipeIsRunning() {
    return NupdiWrapper.commandProcPipe != null;
  }

  pipeRun(thread) {
    NupdiWrapper.commandProcPipe = thread; 
    
    thread.then((success)=> {
      console.log("<nupdiWrapper> success:", success);
      NupdiWrapper.commandProcPipe = null;
    }).catch((reason)=> {
      console.log("<nupdiWrapper> failed:", reason);
      NupdiWrapper.commandProcPipe = null;
    });
  }

  load() {
    ipcMain.on("updi-cmd", (event, arg) => {
      this.pushCommand(arg)

      if (this.pipeIsRunning())
        return;

      const thread = new Promise((resolve, reject) => {
        while(this.hasCommand()) {
          const cmd = this.popCommand();
          let cmdFunc = undefined;
          switch(cmd['op']) {
            case 'open':
              cmdFunc = this.updiOpen;
            break;
            case 'close':
              comdFunc = this.updiClose;
            break;
            case 'read mem':
              cmdFunc = this.updiReadMem;
            break;
            default:
              ;
          }

          let result = undefined;
          if (cmdFunc)
            result = cmdFunc(cmd);

          //console.log("<nupdiWrapper> thread process result", result);
          event.sender.send('updi-cmd-return', cmd, result);
        }
      
        resolve("Clear");
      });

      this.pipeRun(thread); 
    });
  }

  updiOpen(args) {
    const {baudrate, device, port} = args;
    let result = false;
    
    console.log("<nupdiWrapper> open:", args);
    if (!this.dev)
      return result;

    try {
      result = this.dev.open(port, baudrate, device);
    }catch (error){
      console.log("<nupdiWrapper> open failed:", error);
    }
    
    console.log("open result:", result);
    return result;
  }


  updiClose(args) {
    let result = false;

    console.log("<nupdiWrapper> close");
    
    if (!this.dev)
      return result;

    try {
      result = this.dev.close();
    }catch (error){
      console.log("<nupdiWrapper> close failed:", error);
    }

    console.log("<nupdiWrapper> close", result);
    return result;   
  }

  updiReadMem(args) {
    let result = undefined;

    if (!this.dev)
      return result;

    //console.log("<nupdiWrapper> read mem:", this.dev.read_mem, args);

    try {
      result = this.dev.read_mem(args.addr, args.size);
    }catch (error) {
      console.log("<nupdiWrapper> read mem failed:", error);
    }

    console.log("<nupdiWrapper> read mem result:", result);
    return result;
  }
}

//export const updiinf = new NupdiWrapper();
//export default updiinf;