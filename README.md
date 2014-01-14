IF
===

Usage:

var IF = require('if');

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
