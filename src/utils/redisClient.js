const redis = require("redis");
const { promisify } = require("util");
require('dotenv').config()
const {Host, RedisPort, RedisPassword} = process.env
//1. Connect to the redis server

const redisClient = redis.createClient({
    host: Host,
    port: RedisPort,
    password: RedisPassword,
  });
  
redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

  
  
//2. Prepare the functions for each command

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);



module.exports = {SET_ASYNC,GET_ASYNC}



