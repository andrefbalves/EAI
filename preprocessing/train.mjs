import {preprocessing} from "./index.mjs";
import db from "../database/config.js";
import fs from "fs";
import {addUniqueTerms, avgVector, buildVector, sumVector} from "../features/bagOfWords.mjs";

export async function getTrainingSet(label) {
    let query = "SELECT * FROM trainingset INNER JOIN corpus ON trainingset.corpus_id = corpus.id " +
        " WHERE corpus.label = '" + label + "' LIMIT 2";
    let set = await db.execute(query);
    return set[0];
}

function saveFile(happyTrainingSet, notHappy) {
    let obj = {
        trainingSet: {
            happy: happyTrainingSet,
            //happyVectors: happyTrainingSet.vectors,
            notHappy: notHappy,
            //notHappyVectors: notHappy.vectors
        }
    };

    let json = JSON.stringify(obj);

    try {
        fs.writeFileSync('../trainingSet.json', json);
    } catch (err) {
        console.error(err)
    }

    return json;
}

function buildTerms(docs, bagOfUnigrams, bagOfBigrams) {

    for (let i = 0; i < docs.length; i++) {
        docs[i].uniTerms = buildVector(bagOfUnigrams, docs[i].unigrams);
        docs[i].biTerms = buildVector(bagOfBigrams, docs[i].bigrams);
    }
    return docs;
}

function calculateTerms(docs, bagOfUnigrams) {
    let bagOfWords = [];

    for (let i = 0; i < bagOfUnigrams.length; i++) {
        let sameTerms = [];
        let obj = {};
        obj.name = bagOfUnigrams[i][0];

        for (let j = 0; j < docs.length; j++) {
            sameTerms.push(docs[j].uniTerms.filter(doc => doc.name === bagOfUnigrams[i][0]));
        }
        obj.sum = sumVector(sameTerms);
        obj.average = avgVector(sameTerms);

        bagOfWords.push(obj);
    }
    console.log(bagOfWords);

    return bagOfWords;
}

async function process() {
    let happySet = await getTrainingSet('happy');
    let notHappySet = await getTrainingSet('not happy');
    let happy = {docs: []};
    let notHappy = {docs: []};
    let bagOfUnigrams = [];
    let bagOfBigrams = [];

    for (let i = 0; i < happySet.length; i++) {
        happy.docs[i] = preprocessing(happySet[i].id, happySet[i].description, 1);
        bagOfUnigrams = addUniqueTerms(bagOfUnigrams, happy.docs[i].unigrams);
        happy.docs[i].bigrams = preprocessing(happySet[i].id, happySet[i].description, 2).unigrams;
        bagOfBigrams = addUniqueTerms(bagOfBigrams, happy.docs[i].bigrams);
    }
    happy.bagOfUnigrams = bagOfUnigrams;
    happy.bagOfBigrams = bagOfBigrams;
    bagOfUnigrams = [];
    bagOfBigrams = [];

    for (let i = 0; i < notHappySet.length; i++) {
        notHappy.docs[i] = preprocessing(happySet[i].id, notHappySet[i].description, 1);
        bagOfUnigrams = addUniqueTerms(bagOfUnigrams, notHappy.docs[i].unigrams);
        notHappy.docs[i].bigrams = preprocessing(happySet[i].id, notHappySet[i].description, 2).unigrams;
        bagOfBigrams = addUniqueTerms(bagOfBigrams, notHappy.docs[i].bigrams);
    }
    notHappy.bagOfUnigrams = bagOfUnigrams;
    notHappy.bagOfBigrams = bagOfBigrams;

    happy.docs = buildTerms(happy.docs, happy.bagOfUnigrams, happy.bagOfBigrams);
    happy.bagOfUnigrams = calculateTerms(happy.docs, happy.bagOfUnigrams);
    notHappy.docs = buildTerms(notHappy.docs, notHappy.bagOfUnigrams, notHappy.bagOfBigrams);

    console.log(saveFile(happy, notHappy));

}

console.log(process())