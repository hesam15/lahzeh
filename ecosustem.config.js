module.exports = {
  apps: [
    {
      name: 'lahze', // نامی برای برنامه
      script: './node_modules/next/dist/bin/next', // اسکریپت اصلی Next.js
      args: 'start -p 3001', // آرگومان‌های اجرا (پورت 3000)
      cwd: './', // دایرکتوری کاری پروژه
      exec_mode: 'cluster', // اجرای چند نمونه برای استفاده از چند هسته CPU
      instances: 'max', // تعداد نمونه‌ها (max برای استفاده از تمام هسته‌ها)
      watch: false, // برای تولید غیرفعال باشه
      env: {
        NODE_ENV: 'production', // محیط تولید
        PORT: 3001, // پورت برنامه
      },
    },
  ],
};
