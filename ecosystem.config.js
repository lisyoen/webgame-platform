const path = require('path');

module.exports = {
  apps: [
    {
      name: 'server',
      script: './dist/app.js',
      cwd: path.resolve(__dirname),
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'client',
      script: 'npm',
      args: 'run dev',
      cwd: path.resolve(__dirname, 'client'),
    },
  ],
};
