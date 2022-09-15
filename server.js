const chalk = require('chalk');
const { app, Blog } = require('./app');

const PORT = process.env['PORT'] ?? 8080;

app.listen(PORT, async () => {
  console.log(
    chalk.blue('Server is listening on PORT:'),
    chalk.red(`${PORT}.`),
    chalk.blue('Welcome home, Tanner.')
  );
});