const ref = require('ref');
//var ArrayType = require('ref-array')
const ffi = require('ffi');

function defaultLibLoc()
{
  const platform = process.platform;
  let libLoc = null;

  if (platform === 'win32'){
    libLoc = __dirname + './cupdilib_x64';
  }else if(platform === 'linux'){
    libLoc = __dirname + './cupdilib.so';
  }else if(platform === 'darwin'){
    libLoc = __dirname + './cupdilib.dylib'
  }else{
      throw new Error('unsupported plateform for cupdilib Location')
  }

  return libLoc;
}

function loadlib(path) {
  if (!path) {
    path = defaultLibLoc();
  }

  const u8PtrType = ref.refType('uint8');
  return ffi.Library(path, {
    "dev_open": ['int', ['string', 'int', 'string']],
    "dev_close": ['void', []],
    "dev_get_device_info": ['int', []],
    "dev_enter_progmode": ['int', []],
    "dev_leave_progmode": ['int', []],
    "dev_unlock_device": ['int', []],
    "dev_chip_erase": ['int', []],
    "dev_read_flash": ['int', ['ushort', u8PtrType, 'int']],
    "dev_write_flash": ['int', ['ushort', u8PtrType, 'int']],
    "dev_write_fuse": ['int', ['int', 'int']],
    "dev_read_mem": ['int', ['ushort', u8PtrType, 'int']],
    "dev_write_mem": ['int', ['ushort', u8PtrType, 'int']],
    "dev_get_flash_info": ['int', ['pointer']],
    "dev_set_verbose_level": ['int', ['int']],
  });
}

class Nupdi {
  static library = loadlib();

  constructor() {
    this.intf = Nupdi.library;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.get_device_info = this.get_device_info.bind(this);
    this.read_mem = this.read_mem.bind(this);
  }

  debug() {
    console.log("<nupdi> UPDI interface:", this.intf);
  }
  
  open(port, baudrate, device) {
    if (!this.intf)
      throw new Error('Not inlitialized nupdilib');

    if (!port || !Number.isInteger(baudrate) || !device)
      throw new Error(`Invalid paraments for port ${port}, baudrate ${baudrate}, device ${device}`);

    const result = this.intf.dev_open(port, baudrate, device);
    if (result)
      throw new Error(`Call dev_open returen failed code ${result}`);

    return true;
  }

  close() {
    if (!this.intf)
      throw new Error('Not inlitialized cupdilib');

    this.intf.dev_close();

    return true;
  }

  get_device_info() {
    if (!this.intf)
      throw new Error('Not inlitialized cupdilib');

    const result = this.intf.dev_get_device_info();
    if (result) {
      console.log("<nupdi> dev_open failed", result)
      return false;
    }

    return true;
  }

  read_mem(addr, size) {
    if (!this.intf)
      throw new Error('Not inlitialized cupdilib');
    
    const addr16 = addr & 0xffff;
    console.log(`<nupdi> read_mem addr: ${addr16.toString(16)}h, size: ${size}`);
    /*
    const U8Array = ArrayType(ref.refType('uint8'));
    let buf = new U8Array(size);
    */
    const buf = new Buffer(size);

    let result = this.intf.dev_read_mem(addr16, buf, size);
    if (result)
      throw new Error(`Call read_mem returen failed code ${result}`);

    return buf;
  }
}

module.exports = Nupdi;