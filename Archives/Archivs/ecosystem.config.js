module.exports = {
  apps: [
    {
      name: 'sypot-metro',
      script: 'npx',
      args: 'metro start --port 8081',
      cwd: '/home/user/webapp/SypotApp',
      env: {
        NODE_ENV: 'development',
        PORT: 8081,
      },
      watch: false,
      ignore_watch: ['node_modules', 'android', 'ios'],
      restart_delay: 4000,
      max_restarts: 3,
    },
  ],
};
