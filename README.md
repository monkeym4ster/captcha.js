# captcha.js
This is a Captcha for Node.js Applications.

## Example

[中文介绍和使用说明](https://cnodejs.org/topic/57964f34f0d4b46026ba54c6)

Just write an example of Express, others have time to come up.

* [Express](https://github.com/monkeym4ster/captcha.js/tree/master/example/express)

![1](https://raw.githubusercontent.com/monkeym4ster/captcha.js/master/example/assets/4g63.png)
![2](https://raw.githubusercontent.com/monkeym4ster/captcha.js/master/example/assets/9Y5P.png)
![3](https://raw.githubusercontent.com/monkeym4ster/captcha.js/master/example/assets/W8yu.png)
![4](https://raw.githubusercontent.com/monkeym4ster/captcha.js/master/example/assets/nIvW.png)
![5](https://raw.githubusercontent.com/monkeym4ster/captcha.js/master/example/assets/REVN.png)
![6](https://raw.githubusercontent.com/monkeym4ster/captcha.js/master/example/assets/uX3A.png)
![7](https://raw.githubusercontent.com/monkeym4ster/captcha.js/master/example/assets/7u5s.png)

## Requirements

- ImageMagick 6.9+
- Ghostscript 8+

#### Ubuntu

```
sudo apt-get install imagemagick ghostscript
```

#### Mac OS X

```bash
brew install imagemagick ghostscript
```

## Usage

### Quick Example

```js
const Captcha = require('captcha.js');
const captcha = new Captcha({length: 5});

captcha.create((err, result) => {
  if(err) throw err;
  console.log(JSON.stringify(result, null, 2));
});
```


### Optional parameter

```js
new Captcha({
  Length: 4, // number of characters generated
  Font_size: 45, // font size
  Implode: 0.4, // text distortion
  Colorful: true, // whether to colorful
  Line: true, // whether to add dry winding
  Cache_limit: 50, // number of caches
  Cache_dir: '/tmp/' // cache folder
});
```

