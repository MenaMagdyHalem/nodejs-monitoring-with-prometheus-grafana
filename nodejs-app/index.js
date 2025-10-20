const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;
const register = new client.Registry();

register.setDefaultLabels({ app: 'nodejs_dolfined_app' });
client.collectDefaultMetrics({ register });

const rootHttpRequestCounter = new client.Counter({
  name: 'http_requests_root_total',
  help: 'Total number of HTTP requests to the root path',
});
register.registerMetric(rootHttpRequestCounter);

app.use((req, res, next) => {
  if (req.path === '/') rootHttpRequestCounter.inc();
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/', (req, res) => res.send('Hello From DolfinED'));
app.listen(port, () => console.log(`App listening on port ${port}`));
