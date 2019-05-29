const Application = require('./application');
const app = new Application();
app.start().catch(e => {
  console.log(`Application Error: ${e.message}`);
  process.exit();
});