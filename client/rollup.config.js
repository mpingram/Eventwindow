'use strict';

const path = require('path');

import nodeResolve from 'rollup-plugin-node-resolve';

class RollupNG2 {
  constructor(options){
    this.options = options;
  }
  resolveId(id, from){
    if (id.startsWith('rxjs/')){
      return path.join( __dirname, `../server/dist/node_modules/rxjs-es/${id.replace('rxjs/', '')}.js` );
    }
  }
}

const rollupNG2 = (config) => new RollupNG2(config);

export default {
  entry: path.join(__dirname,'app','main.js'),
  sourceMap: true,
  moduleName: 'main',
  plugins: [
    rollupNG2(),
    nodeResolve({
      jsnext: true, main: true
    })
  ]
};