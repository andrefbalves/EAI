var db = require('./config');

async function selectKBest(label, k, metric, operation, typeOfGram) {

    let query = "SELECT * FROM eai_labs.terms WHERE operation = '" + operation + "' AND label = '" + label + "' AND typeOfGram = '" + typeOfGram + "'";
    if (metric !== undefined && metric !== '') query += " ORDER BY " + metric.toString() + " DESC";
    if (k !== undefined && k !== '') query += " LIMIT " + k;
    let terms = await db.execute(query);

    return terms[0];
}
module.exports = {selectKBest};

//selectKBest(10, 'occurrences','sum');