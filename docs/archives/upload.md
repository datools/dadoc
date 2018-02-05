```ts
import * as multer from 'koa-multer';
const upload = multer({ dest: '.' }).any();

function uploadPromise(ctx) {
  return new Promise((resolve, reject) => {
    upload(ctx, () => {
      resolve(ctx);
    });
  });
}

in loop :

await uploadPromise(ctx);
(ctx as any).files = (ctx as any).req.file || (ctx as any).req.files;
```