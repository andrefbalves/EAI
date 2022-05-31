import db from "../database/config.js";

export async function selectKBest(k, metric, operation) {

    let query = "SELECT * FROM eai_labs.terms WHERE operation = '" + operation + "' ORDER BY " + metric + " DESC LIMIT " + k + "";
    let terms = await db.execute(query);

    return terms[0];
}
//selectKBest(10, 'occurrences','sum');