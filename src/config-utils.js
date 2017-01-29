import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import assign from 'lodash/assign';
import {smartBorders} from './utils';

const buildConf = (userConf = {}, defaultConf) => {
  let conf = {};
  forEach(defaultConf, (item, key) => {
    // if it's a leaf
    if (item.iteratee !== undefined) {
      if (!item.iteratee) {
        conf[key] = Object.keys(userConf).indexOf(key) > -1 ?
          userConf[key] : item.value;
      } else if (Object.keys(userConf).indexOf(key) > -1) {
        if (isFunction(userConf[key])) {
          conf[key] = userConf[key];
        } else {
          conf[key] = () => userConf[key];
        }
      } else {
        conf[key] = () => item.value;
      }
    // else we go deeper
    } else {
      conf[key] = buildConf(userConf[key], item);
    }
  });

  return conf;
};

const computeMinMax = (conf, meta) => {
  conf.cmin = conf.min === 'smart' ? meta.min : conf.min;
  conf.cmax = conf.max === 'smart' ? meta.max : conf.max;
  return;
};

const computeRadius = (conf, instance) => {
  if (conf.innerRadius === 0 && conf.outerRadius === 0) {
    const borders = smartBorders(conf, instance._layout, instance.tracks);
    conf.innerRadius = borders.in;
    conf.outerRadius = borders.out;
  }
  return;
};

const getConf = (userConf, defaultConf, meta, instance) => {
  let conf = buildConf(userConf, cloneDeep(defaultConf));
  console.log(userConf)
  console.log(conf)
  assign(conf, computeMinMax(conf, meta), computeRadius(conf, instance));
  return conf;
};

export {
  getConf,
};
