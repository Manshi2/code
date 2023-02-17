const express = require( 'express' );
const generateSitemap = require("../scripts/sitemap-builder.js")

const router = express.Router();
router.get("/update_sitemap", async (req, res) => {
    const xml = await generateSitemap();
    res.set({'Content-type': 'text/xml'});
    res.send(xml)
    res.end()
})

module.exports = router