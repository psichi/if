IFFI
===

Usage:

var IF = require('iffi');

```javascript
var val = {
  default: true,
  required: false
};

var expr = "input.default !== input.required";

IF(expr, { 'input': val }); // true
```

The code is based on:

https://github.com/insin/DOMBuilder/blob/master/lib/dombuilder/template.js#L732-L775


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/psichi/iffi/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

