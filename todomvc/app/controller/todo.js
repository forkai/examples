'use strict';

const { Controller } = require('egg');

class TodoController extends Controller {
  // 查询列表，支持过滤 `/api/todo?completed=true`
  async index() {
    const { ctx, service } = this;

    // query 参数均为字符串，需转换
    let { completed } = ctx.query;
    if (ctx.query.completed !== undefined) completed = completed === 'true';

    ctx.status = 200;
    ctx.body = await service.todo.list({ completed });
  }

  // 创建任务
  async create() {
    const { ctx, service } = this;

    // 数据校验
    ctx.validate({ title: { type: 'string' } });

    ctx.status = 201;
    ctx.body = await service.todo.create(ctx.request.body);
  }

  // 修改任务
  async update() {
    const { ctx, service } = this;

    // 数据校验
    ctx.validate({ title: { type: 'string' } });

    ctx.status = 204;
    ctx.type = 'json';
    ctx.body = await service.todo.update(ctx.params.id, ctx.request.body);
  }

  // 删除操作
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    ctx.status = 204;
    ctx.type = 'json';
    await service.todo.destroy(id);
  }
}

module.exports = TodoController;
