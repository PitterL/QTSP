import _ from 'lodash';

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
    member:[
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
    member: [
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
    this.ds = [_.cloneDeep(defaultDataStructureJs)];
  }

  parse(data) {
    this.ds.append(_.cloneDeep(data));
  }

  getBranch(name) {
    for (s in this.ds.reverse()) {
      data = s.get(name);
      if (data)
        break;
    }
  }
}