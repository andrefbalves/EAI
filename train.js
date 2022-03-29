var db = require('./database/config');

async function getTrainingSet() {
    let query = "SELECT corpus.* FROM trainingset INNER JOIN corpus on trainingset.corpus_id = corpus.id";
    let docs = await db.execute(query);
    return docs[0];
}

module.exports = {getTrainingSet};