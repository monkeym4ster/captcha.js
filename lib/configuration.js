'use strict';

const path = require('path');
const pkg = require('../package');

module.exports = {
  // 生成多少个字符
  length: 4,
  // 字体大小
  font_size: 45,
  // 文字扭曲度
  implode: 0.4,
  // 是否为彩色
  colorful: true,
  // 是否添加干绕线
  line: true,
  // 缓存文件数，设置 0 关闭缓存
  cache_limit: 100,
  // 缓存目录
  cache_dir: path.join((process.platform != 'win32' ? `/tmp` : `C:/Windows/temp`), pkg.name)
};
