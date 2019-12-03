import router from '../src/app/containers';
import Sitemap from 'react-router-sitemap';
const path = require('path');

const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());

require('dotenv').config({
  path: path.resolve(appDirectory, '.env'),
});

const sitemap = new Sitemap(router());

sitemap
  .build(process.env.APP_URL)
  .save(path.resolve(appDirectory, 'build/sitemap.xml'));
