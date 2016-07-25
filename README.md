# captcha.js
This is a Captcha for Node.js Applications.

## Requirements

- ImageMagick 6.9+

#### Ubuntu

```
sudo apt-get install imagemagick
```

#### Mac OS X

```bash
brew install imagemagick ghostscript
```


## Usage

### Quick Example

```js
const captcha = require('captcha.js');
const length = 4;
captcha(length).create((err, result) => {
  if(err) throw err;
  console.log(result);
});
```


### [Example](https://github.com/monkeym4ster/captcha.js/tree/master/example)

## API

### Captcha.create(length, opt)

### Captcha.randomColor(colorful)

### Captcha.randomChars()

### Captcha.randomLineTop()

### Captcha.randomLineTop()

## Options

```js
{
  length: 4,
  font_size: 45,
  implode: 0.4,
  colorful: true,
  line: true,
  cache_limit: 5,
  cache_dir: `/tmp/${pkg.name}`
}

```