var express     = require('express')
  , morgan      = require('morgan')
  , compression = require('compression')
  , app         = express()
  , port        = process.env.PORT || 3000;

app.use(morgan('short'));
app.use(compression());

app.use(express.static('client'));
app.use('/data', express.static('server/data'));

app.listen(port, function() {
  console.log('kanban-chart server listening on port ' + port);
});