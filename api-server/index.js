const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dao = require('./fileDao');
 
const app = new Koa();
const router = new Router();

app.use(bodyParser());
 
app.use((ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8081');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  ctx.set('Access-Control-Allow-Credentials', true);
  if (ctx.method === 'OPTIONS') {
    ctx.status = 200;
    return;
  }
  next();
});

// GET /api/:db/:id        获取数据详情接口
router.get('/api/:db/:id', (ctx, next) => {
  const { db, id } = ctx.params;
  const data  = dao.get(db, id);
  if (data) {
      ctx.body = data;
  } else {
      ctx.body = '404 data not found';
  }
});
 
// PUT /api/:db/:id        更新数据接口
router.put('/api/:db/:id', (ctx, next) => {
  const { db, id } = ctx.params;
  const data = ctx.request.body;
  console.log('body', data);
  dao.put(db, id, data);
  ctx.body = 'success';
});

// DELETE /api/:db/:id     删除数据接口
// GET /api/:db/           table 的列表页

// POST /api/:db/          新增数据接口
router.post('/api/:db/', (ctx, next) => {
  const { db } = ctx.params;
  const data = ctx.request.body;
  dao.post(db, data);
  ctx.body = 'success';
});
 
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('started'));

