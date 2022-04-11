import {preprocessing} from "./index.mjs";
import db from "../database/config.js";

export async function getTrainingSet(label) {
    let query = "SELECT * FROM trainingset INNER JOIN corpus ON trainingset.corpus_id = corpus.id " +
        " WHERE corpus.label = '" + label + "'";
    let set = await db.execute(query);
    return set[0];
}

function process() {
    let happySet = getTrainingSet('happy');
    let notHappySet = getTrainingSet('not happy');
    let happyTrainingSet = [];
    let notHappyTrainingSet = [];

    for (let i = 0; i < happySet.length; i++) {
        happyTrainingSet = preprocessing(happySet[i].description, 1);
        happyTrainingSet = preprocessing(happySet[i].description, 2);
    }

    for (let i = 0; i < notHappySet.length; i++) {
        notHappyTrainingSet = preprocessing(notHappySet[i].description, 1);
        notHappyTrainingSet = preprocessing(notHappySet[i].description, 2);
    }

    return happySet;

}