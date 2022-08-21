# babel-plugin-module-imports

Generate code based on comments

```js
// @hubble:pv
// @param itemId courseId
// @param itemName courseName

↓ ↓ ↓

import { log as _hubbleLog } from "log-sdk";

_hubbleLog({
  "type": "pv",
  "itemId": "courseId",
  "itemName": "courseName"
});
```

## Get Started

```bash
$ yarn install
$ yarn compile
```
