const _ = require("lodash");
require('dotenv').config()
const objectval = JSON.parse(process.env.OBJECT_VAL);
const defaultConfig = objectval.config;
// const environment='development';
const environment = "production"

const environmentConfig = objectval[environment];
// console.log(environmentConfig);

const finalConfig = _.merge(defaultConfig, environmentConfig);
global.gConfig = finalConfig;