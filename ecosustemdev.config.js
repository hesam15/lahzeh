module.exports = {
  apps: [
    {
      name: 'lahze', // نام برنامه
      script: 'npm', // اجرای npm
      args: 'run dev', // اجرای دستور npm run dev
      cwd: './', // دایرکتوری کاری پروژه
      watch: true, // فعال کردن watch برای توسعه
      env: {
        NODE_ENV: 'development', // محیط توسعه
        PORT: 3001, // پورت برنامه
      },
    },
  ],
};
