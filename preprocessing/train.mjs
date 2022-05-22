import {preprocessing} from "./index.mjs";
import db from "../database/config.js";
import fs from "fs";
import {addUniqueTerms} from "../features/bagOfWords.mjs";

export async function getTrainingSet(label) {
    let query = "SELECT * FROM trainingset INNER JOIN corpus ON trainingset.corpus_id = corpus.id " +
        " WHERE corpus.label = '" + label + "'";
    let set = await db.execute(query);
    return set[0];
}

function saveFile(happyTrainingSet, notHappyTrainingSet) {
    let obj = {trainingSet: []};

    obj.trainingSet.push({happy: happyTrainingSet, happyVectors: happyTrainingSet.vectors, notHappy:notHappyTrainingSet, notHappyVectors: notHappyTrainingSet.vectors});

    let json = JSON.stringify(obj);

    try {
        fs.writeFileSync('../trainingSet.json', json);
    } catch (err) {
        console.error(err)
    }

    return json;
}

async function process() {
    let happySet = await getTrainingSet('happy');
    let notHappySet = await getTrainingSet('not happy');
    let happyTrainingSet = [];
    let vectors = [];
    let notHappyTrainingSet = [];

    for (let i = 0; i < happySet.length; i++) {
        happyTrainingSet[i] = preprocessing(happySet[i].description, 1);
        vectors = addUniqueTerms(vectors, happyTrainingSet[i].textTokens);
        happyTrainingSet[i].textTokens2 = preprocessing(happySet[i].description, 2).textTokens;
        vectors = addUniqueTerms(vectors, happyTrainingSet[i].textTokens2);
    }
    happyTrainingSet.vectors = vectors;
    vectors = [];

    for (let i = 0; i < notHappySet.length; i++) {
        notHappyTrainingSet[i] = preprocessing(notHappySet[i].description, 1);
        vectors = addUniqueTerms(vectors, notHappyTrainingSet[i].textTokens);
        notHappyTrainingSet[i].textTokens2 = preprocessing(notHappySet[i].description, 2).textTokens;
        vectors = addUniqueTerms(vectors, notHappyTrainingSet[i].textTokens2);
    }
    notHappyTrainingSet.vectors = vectors;

    console.log(saveFile(happyTrainingSet, notHappyTrainingSet));

}

console.log(process())