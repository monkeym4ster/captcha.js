'use strict';

const _ = require('lodash');
const debug = require('debug')('captchajs:core');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const config = require('./configuration');

class Captcha {
  constructor(opt) {
    this.opt = _.assign(config, opt);
  }

  randomColor(colorful) {
    const seed = colorful ? () => _.random(150) + 10 : () => _.random(50);
    const color = [];
    for (let i = 0; i < 3; i++) {
      color.push(seed());
    }
    colorful && (color[_.random(0, color.length)] = 0);
    return color;
  };

  randomChars() {
    const _chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let chars = _.sampleSize(_chars, this.opt.length).join('');
    chars = chars.replace(/[0ol1]/gi, _.random(7) + 2);
    return chars;
  };

  randomLineTop(textTop, fontSize) {
    return textTop + Math.floor(_.random(0, fontSize * 0.7));
  };

  create(callback) {
    const code = this.randomChars();

    this.code = code;


    const pngFilePath = `${path.join(this.opt.cache_dir, code)}.png`;

    this.filePath = pngFilePath;

    if (fs.existsSync(this.opt.cache_dir)) {
      // is limit
      const cacheFiles = fs.readdirSync(this.opt.cache_dir);
      if (cacheFiles.length > config.cache_limit) {
        this.isLimit = true;
        cacheFiles.forEach((filename) => {
          fs.unlink(path.join(this.opt.cache_dir, filename));
        });
      }
    } else {
      fs.mkdirSync(this.opt.cache_dir);
    }

    // is cache
    if (fs.existsSync(pngFilePath)) {
      this.isCache = true;
      return this;
    }

    const chars = code.split('');
    const allLeft = 20;
    const fontSize = this.opt.font_size;
    const fullHeight = fontSize;
    const fullWidth = fontSize * chars.length;
    const size = `${fullWidth}x${fullHeight}`;
    const halfWidth = fullWidth / 2;
    const textTop = 0;
    const textLeft = 0 - (fontSize * 0.28);
    const strokeWidth = (fontSize * 0.05) + 1;
    const textWidth = fontSize + textLeft;
    const textOpts = [];
    const lineOpts = [];

    chars.forEach((char, i) => {
      const rgb = this.randomColor(this.opt.colorful);
      const textColor = `rgba(${rgb.join(',')}, 1)`;
      const lineColor = `rgba(${rgb.join(',')}, 0.6)`;
      textOpts.push(`-fill '${textColor}' -draw 'text ${(textLeft + textWidth) * i + allLeft}, ${textTop} "${char}"'`);
      const leftY = this.randomLineTop(textTop, fontSize);
      const rightX = halfWidth + (halfWidth * 0.3);
      const rightY = this.randomLineTop(textTop, fontSize);
      this.opt.line && lineOpts.push(`-draw 'stroke ${lineColor} line ${_.random(0, 10)},${leftY} ${rightX}, ${rightY}'`);
    });


    let command = `\
      convert -size ${size} \
      -strokewidth ${strokeWidth} \
      ${lineOpts.join(' ')} \
      -pointsize ${fontSize} -weight 500 \
      ${textOpts.join(' ')} \
      -wave ${_.random(1, 2) + 3}x2 \
      -rotate ${_.random(0, 10) - 5} \
      -gravity NorthWest -sketch 1x10+${_.random(0, 2)} \
      -fill none \
      -implode ${this.opt.implode} -trim label:- png:- \
      > ${pngFilePath} \
    `;

    if (process.platform === 'win32') {
      command = `convert -size ${size} xc:White -gravity Center -weight 12 -pointsize 20 -annotate 0 "${code}" -trim ${pngFilePath}`
    }

    exec(command, (err) => {
      if (err) return callback(err);
      return callback(null, this);
    });
  };
}

module.exports = Captcha;
