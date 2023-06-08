const urlModel = require("../models/urlModel");
const validUrl = require("valid-url");
const shortid = require("shortid");
const { SET_ASYNC, GET_ASYNC } = require("../utils/redisClient");

const createShortUrl = async function (req, res) {
  try {
    let longUrl = req.body.longUrl;

    if (!longUrl) {
      return res
        .status(400)
        .send({ status: false, message: "Must add Any Url" });
    }
    if (typeof longUrl !== "string") {
      return res.status(400).send({ status: false, message: "type of string" });
    }

    let protocol = req.protocol;

    let hostName = req.headers.host;

    if (!validUrl.isUri(longUrl)) {
      return res
        .status(400)
        .send({ status: false, message: "Not a valid Url" });
    }
    longUrl = longUrl.toLowerCase();

    //3. Start using the redis command

    let check = await urlModel
      .findOne({ longUrl: longUrl })
      .select({ urlCode: 1, shortUrl: 1, longUrl: 1, _id: 0 });
    if (check) {
      await SET_ASYNC(check.urlCode, check.longUrl, "EX", 3600 * 24);
      return res.status(201).send({ status: true, data: check });
    } else {
      let code = shortid.generate().toLowerCase();

      // console.log(code)
      let data = {
        longUrl: longUrl,
        urlCode: code,
        shortUrl: `${protocol}://${hostName}/${code}`,
      };
      // let data = {longUrl : longUrl, urlCode: code, shortUrl: "http://localhost:3000/"+code }
      let result = await urlModel.create(data);

      await SET_ASYNC(result.urlCode, result.longUrl, "EX", 3600 * 24);
      let my = {
        longUrl: result.longUrl,
        shortUrl: result.shortUrl,
        urlCode: result.urlCode,
      };
      return res.status(201).send({ status: true, data: my });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createShortUrl };
