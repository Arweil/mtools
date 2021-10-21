app()
app.start()
app.router({ history, app } => RouterConfig) 
app.model()
app.unmodule(namespace)
app.use(hooks)


class MobxStore {}
app.model(new MobxStore);

const mobxStore = {
  namespace: '',
  state: {},
  computeds: {},
  actions: {}
}
app.model(mobxStore);

