const express = require('express')
const router = express.Router()
const {createShortUrl, getUrl} = require('../controller/urlController')

router.post('/url/shorten',createShortUrl)
router.get('/:urlCode',getUrl)




/* `router.all('*', async (req, res) => {...})` is a catch-all route that will be triggered for any
HTTP method and any URL path that has not been matched by the previous defined routes.*/

router.all('*', async (req, res) => {
  return res.status(404).send({status: false, message: "invalid url"})
})


module.exports = router