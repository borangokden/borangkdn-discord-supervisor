module.exports = async function(RateLimitData) {
    console.log("Rate Limit Warn!", RateLimitData)
}

module.exports.conf = {
    name: "rateLimit"
}