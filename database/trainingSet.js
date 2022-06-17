var db = require('./config');

async function getTrainingSet(label) {

    let query = "SELECT * FROM eai_labs.trainingset";
    if (label !== undefined && label !== '') query += " WHERE label = '" + label + "'";
    let set = await db.execute(query);

    return set[0];
}
module.exports = {getTrainingSet};