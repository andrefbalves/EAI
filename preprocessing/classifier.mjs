import {preprocessing} from "./index.mjs";
import {selectKBest} from "../database/terms.js";
import {tf, tfidf} from "./counting.mjs";

function organizeClasses(arrayOfTerms) {
    let bagOfWords = [];

    for (let i = 0; i < arrayOfTerms.length; i++) {
        let obj = {};

        obj.name = arrayOfTerms[i].name.replace('`','');
        obj.tfidf = arrayOfTerms[i].tfidf;
        obj.idf = arrayOfTerms[i].idf;

        bagOfWords.push(obj);
    }
    return bagOfWords;
}

export async function classVectors() {
    let classes = [];
    let obj = {label: '', bagOfWords: []};

    let happyTerms = await selectKBest('happy', '', '', 'average', '');
    obj.label = happyTerms[0].label;
    obj.bagOfWords = organizeClasses(happyTerms);
    classes.push(obj);

    obj = {};
    let notHappyTerms = await selectKBest('not happy', '', '', 'average', '');
    obj.label = notHappyTerms[0].label;
    obj.bagOfWords = organizeClasses(notHappyTerms);
    classes.push(obj);

    return classes;
}

function calculateCosineSimilarity(vectorA, vectorB) {
    let axb= 0;
    let aSquare = 0;
    let bSquare = 0;

    for (let i = 0; i < vectorA.length; i++) {
        axb += vectorA[i].tfidf *  vectorB[i].tfidf;
        aSquare += vectorA[i].tfidf *  vectorA[i].tfidf;
        bSquare += vectorB[i].tfidf *  vectorB[i].tfidf;
    }
    aSquare = Math.sqrt(aSquare);
    bSquare = Math.sqrt(bSquare);

    return axb / (aSquare * bSquare);
}

export async function cosineSimilarity(text) {
    let classes = await classVectors();
    let doc;
    let arrayOfTerms = [];
    let happy = [];
    let notHappy = [];


    doc = preprocessing(0, text, 1);
    arrayOfTerms = doc.unigrams;
    doc.bigrams = preprocessing(0, text, 2).unigrams;
    arrayOfTerms = arrayOfTerms.concat(doc.bigrams);

    for (let i = 0; i < classes.length; i++) {
        for (let j = 0; j < classes[i].bagOfWords.length; j++) {
            let term = {};

            term.name = classes[i].bagOfWords[j].name;
            term.tfidf = tfidf(tf(classes[i].bagOfWords[j].name.split(' '),arrayOfTerms), classes[i].bagOfWords[j].idf);

            if(classes[i].label === 'happy')
                happy.push(term);
            else
                notHappy.push(term);
        }
    }

    let happySimilarity = calculateCosineSimilarity(classes[0].bagOfWords, happy);
    let notHappySimilarity = calculateCosineSimilarity(classes[1].bagOfWords, notHappy);

    if (Number.isNaN(happySimilarity))
        happySimilarity = 0;
    if (Number.isNaN(notHappySimilarity))
        notHappySimilarity=0;

    return console.log(happySimilarity > notHappySimilarity ? {label: 'happy', similarity: happySimilarity} : {label: 'not happy', similarity: notHappySimilarity});
}
//todo testar melhor
console.log(cosineSimilarity("this is a text husband"));