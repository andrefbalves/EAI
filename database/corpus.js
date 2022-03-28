var db = require('./config');

async function getDocuments(label, limit) {
    let query = "SELECT * FROM corpus WHERE label = '" + label + "'";
    if (limit !== undefined && limit !== '') query += " LIMIT " + limit.toString();
    let docs = await db.execute(query);
    return docs[0];
}

async function getDocument(id) {
    let query = "SELECT * FROM corpus WHERE id = " + id;
    let doc = await db.execute(query);
    return doc[0][0];
}

module.exports = {getDocuments, getDocument};