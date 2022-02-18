const mongoose = require('mongoose')

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
}

main().then(() => console.log("Conectado ao Mongo"))
    .catch((e) => console.log("Deu erro", e))

module.exports = mongoose