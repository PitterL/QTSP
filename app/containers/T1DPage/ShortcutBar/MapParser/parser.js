import _ from 'lodash';
import { isArray } from 'util';

export class MapfileParser {
  constructor() {
    this.TagEnum = {MEMCFG:1, VARS:2};
    this.tag = undefined;
    this.dataMemcfg = [];
    this.dataVars = {};
  }

  get(name) {
    switch (name) {
      case 'memcfg':
        return this.dataMemcfg;
      case 'vars':
        return this.dataVars;
      default:
        return undefined;
    }
  }

  detectTag(line) {
    const memTag = "Memory Configuration";
    
    if (this.tag)
      return;

    if (line.indexOf(memTag) >= 0) {
      this.tag = this.TagEnum.MEMCFG;
      return true;
    }
  }

  detectVarible(line) {
    const varTag = ".bss";
    if (this.tag)
      return;

    if (line.startsWith(varTag)) {
      this.tag = this.TagEnum.VARS;
      return true;
    }
  }

  parseMemcfg(line) {
    const re = /\s+/;
    const endWords = "*default*";

    const vals = line.split(re).filter((w)=>(!!w));
    if (!vals || !vals.length)
      return;

    if (this.dataMemcfg.hasOwnProperty("columnsName")) {
      if (vals[0] == endWords) {
        this.tag = undefined; //end
      }else {
        this.dataMemcfg.push(this.dataMemcfg.columnsName.map((v, i)=>{
          return {[this.dataMemcfg.columnsName[i]] : v};
        }));
      }
    }else {
      this.dataMemcfg.columnsName = vals;
    }
  }

  parseVars(line) {
    const re = /\s+/;
    const reName = /\w+/;

    if (line.startsWith('.')) {
      this.tag = undefined; //end
      return;
    }

    const vals = line.split(re).filter((w)=>(!!w));
    if (!vals || !vals.length)
      return;

    if (vals.length == 2) { //address name
      if (!isNaN(vals[0]) && vals[1].match(reName)) {
        this.dataVars[vals[1]] = Number(vals[0]);
      }
    }
  }

  parse(data) {
    const re = /\r?\n/;
    const lines = data.split(re);
    
    lines.forEach((line)=>{
      switch(this.tag) {
        case this.TagEnum.MEMCFG:
          this.parseMemcfg(line);
          break;
        case this.TagEnum.VARS:
          this.parseVars(line);
          break;
        default:
          this.detectTag(line) || this.detectVarible(line);
      }
    })

    return this.dataVars;
  }
}

export class HeaderFileParser {
  constructor() {
    this.data = {};
    this._stack = [];
  }

  store(name, value) {
    this.data[name] = value;
  }

  parseStandTag(line) {
    const re = /\s+/;
    let raw, value, end=false;

    //Check Macro is continued or a new start
    if (!this._stack.length) {
      const varTag = "#define";
      if (!line.startsWith(varTag)) {
        return;
      }
    }

    const tags = line.split(re).filter((w)=>(!!w));
    if (!tags)
      return;

    if (tags[tags.length - 1] == '\\') {
      tags.pop();
    }else {
      end = true;
    }
    this._stack.push(...tags);
    
    if (end) {
      name = this._stack[1];
      raw = this._stack.slice(2).join(' ');

      try {
        value = eval(raw);
      } catch(err) {
        value = raw;
      }
      this.store(name, value);
      this._stack=[];
    }
  }

  parseExtendTag(line) {
    //TBD
  }

  parse(data) {
    const re = /\r?\n/;
    const lines = data.split(re);
    
    lines.forEach((line)=>{
      this.parseStandTag(line);
    })

    return this.data;
  }
}

const defaultDataStructureJs={
  qtlib_key_data_set1: {
    structure: 'qtm_touch_key_data_t',
    children:[
      { 
        name: 'sensor_state',
        alias: 'state',
        size: 1,
      },
      {
        name: 'sensor_state_counter',
        alias: '',
        size: 1,
      },
      {
        name: 'node_data_struct_ptr',
        alias: '',
        size: 2,
      },
      {
        name: 'channel_reference',
        alias: 'reference',
        size: 2,
      }
    ],
    multi: 'DEF_NUM_SENSORS'
  },
  ptc_qtlib_node_stat1:{
    structure: "qtm_acq_node_data_t",
    children: [
      {
        name: 'node_acq_status',
        alias: '',
        size: 1,
      },
      {
        name: 'node_acq_signals',
        alias: 'signal',
        size: 2,
      },
      {
        name: 'node_comp_caps',
        alias: 'compcap',
        size: 2,
      }
    ],
    multi: 'DEF_NUM_SENSORS'
  }
}

export class DataStructureParser {
  constructor() {
    this.ds = _.cloneDeep(defaultDataStructureJs);
  }

  assign(data) {
    this.ds = Object.assign(this.ds, _.cloneDeep(data));
  }
}

/*
  get data format structure
*/
// Fixme: not optimized for single child, all grouped by chilren together
function ds_format_rs(regaddr, ds, cates) {
  let format = [];

  for (let stName in ds) {
    const children = ds[stName].children;
    children.some((child)=>{
      if (cates.includes(child.alias)) {
        const addr = regaddr[stName];
        const members = children.reduce((acc, curr) => { acc.push(curr.alias); return acc }, []);
        const size = children.reduce((acc, curr) => acc + curr.size, 0);
        format.push({addr, size, members, children});
        return true;
      }
    })
  }

  return format;
}

export const getRsdRawFormat = (regaddr, ds) => {
  let formats = {};
  const elems = ['state', 'reference', 'signal', 'compcap']
  elems.forEach((name) => {
    formats[name] = ds_format_rs(regaddr, ds, [name]);
  });

  formats['delta'] = ds_format_rs(regaddr, ds, ['reference', 'signal']);

  return formats;
}

function exact_rsd(rsdData) {
  let offset = 0;
  let data = {};
  
  //console.log("<MapParser> rsdData", rsdData);

  if (isArray(rsdData.children)) {
    rsdData.children.forEach((child) => {
      const buffer = rsdData.value;
      if(child.alias) {
        let value = 0;
        switch(child.size) { //assumed little endian
          case 4:
            value = buffer.readUInt32LE(offset);
            break;
          case 2:
            value = buffer.readUInt16LE(offset);
            break;
          case 1:
          default:
            value = buffer.readUInt8(offset);
        }
        data[child.alias] = value;
      }
      offset += child.size;
    });
  }
  //console.log("<MapParser> data", data);
  return data;
}

export const parseRsdRawData = (rsdRawDatas) => {
  let data = {};

  rsdRawDatas.forEach(rsdData=>{
    Object.assign(data, exact_rsd(rsdData));
  });
  
  if (data.hasOwnProperty('compcap')) {
    const val = data['compcap'];
    data['cc'] = (val & 0x0F)*0.00675 + ((val >> 4) & 0x0F)*0.0675 + ((val >> 8) & 0x0F)*0.675 + ((val >> 12) & 0x3) * 6.75;
  }

  if (data.hasOwnProperty('reference') && data.hasOwnProperty('signal')) {
    data['delta'] = data['signal'] - data['reference'];
  }

  console.log("<MapParser> parsed rsddata ", data);
  return data;
}