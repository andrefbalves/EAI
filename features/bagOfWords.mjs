import {exists, idf, numberOfOccurrences, tf, tfidf} from "../preprocessing/counting.mjs";

export function addUniqueTerms(array1, array2) {

    for (let i = 0; i < array2.length; i++) {
        let x = false;

        for (let j = 0; j < array1.length; j++) {
            if (exists(array2[i], array1[j])) x = true;
        }

        if (x === false) {
            array1.push(array2[i])
        }
    }
    return array1;
}

function binaryVector(bagOfWords, arrayOfTerms) {

    for (let i = 0; i < bagOfWords.length; i++) {
        for (let j = 0; j < arrayOfTerms.length; j++) {
            if (!exists(bagOfWords[i], arrayOfTerms[j])) {
                bagOfWords[i].binary = bagOfWords[i].binary === 1 ? 1 : 0;
            } else {
                bagOfWords[i].binary = 1;
            }
        }
    }
    return bagOfWords;
}

function numberOfOccurrencesVector(bagOfWords, arrayOfTerms) {

    for (let i = 0; i < bagOfWords.length; i++) {
        bagOfWords[i].occurrences = numberOfOccurrences(bagOfWords[i], arrayOfTerms);
    }
    return bagOfWords;
}

function tfVector(bagOfWords, arrayOfTerms) {

    for (let i = 0; i < bagOfWords.length; i++) {
        bagOfWords[i].tf = tf(bagOfWords[i],arrayOfTerms);
    }
    return bagOfWords;
}

function idfVector(bagOfWords, arrayOfTerms) {
    return 0;//TODO
}

function tfidfVector(bagOfWords, arrayOfTerms) {

    for (let i = 0; i < bagOfWords.length; i++) {
        bagOfWords[i].tfidf = tfidf(tf(bagOfWords[i],arrayOfTerms), idf(bagOfWords[i],arrayOfTerms));//TODO
    }
    return bagOfWords;
}

//console.log(numberOfOccurrencesVector([["room"], ["on"]], [["on"], ["nice"]]));
//console.log(numberOfOccurrencesVector([["room", "on"], ["on", "nice"]], [["on", "nice"], ["on", "nice"], ["nice", "clearli"]]));
//console.log(tfVector([["room"], ["on"]], [["on"], ["nice"]]));
//console.log(tfVector([["room", "on"], ["on", "nice"]], [["on", "nice"], ["on", "nice"], ["nice", "clearli"]]));