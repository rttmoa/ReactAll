# OData v4 Parser

OData v4 parser based on OASIS Standard OData v4 ABNF grammar

基于 OASIS 标准 OData v4 ABNF 语法的 OData v4 解析器

## How to build

Simply just use ``$ npm run build``

Run TDD tests using ``$ npm run tdd``

## How to use

Parser functions:

```javascript
var parser = require('odata-v4-parser');
parser.filter("Title eq 'Article1'");
```

Low-level functional:

```javascript
require('odata-v4-parser/lib/expressions').boolCommonExpr(new Uint8Array(new Buffer("contains(@word,Title)")), 0);
require('odata-v4-parser/lib/json').arrayOrObject(new Uint8Array(new Buffer('{"a":1}')), 0);
require('odata-v4-parser/lib/expressions').commonExpr(new Uint8Array(new Buffer('Items/all(d:d/Quantity gt 100)')), 0);
```

## TODO

* 更多单元测试
* 使用元数据进行正确的 OData 标识符类型检测（复杂类型、导航属性等）
