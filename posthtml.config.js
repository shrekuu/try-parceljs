module.exports = {
    "plugins": {
        "posthtml-extend": {
            "root": "./src/layouts/"
        },
        "posthtml-expressions": {
            locals: {
                env: process.env.NODE_ENV
            }
        }
    }
}