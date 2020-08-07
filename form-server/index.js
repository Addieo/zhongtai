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

// PUT /form/:id  保存 form 元数据
router.put('/api/form/:id', (ctx, next) => {
  const { id } = ctx.params;
  const data = ctx.request.body;
  dao.put(id, data);
  ctx.body = 'success';
});

// GET /form/:id  获取 form 元数据
router.get('/api/form/:id', (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = dao.get(id); 
});
 
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(2333, () => console.log('started'));

