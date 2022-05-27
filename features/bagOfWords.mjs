import {exists, idf, numberOfOccurrences, tf, tfidf} from "../preprocessing/counting.mjs";

export function addUniqueTerms(array1, array2) {

    for (let i = 0; i < array2.length; i++) {
        let x = false;

        for (let j = 0; j < array1.length; j++) {
            if (exists(array2[i], array1[j])) {
                x = true;
            }
        }

        if (x === false) {
            array1.push(array2[i])
        }
    }
    return array1;
}

/*function binaryVector(bagOfWords, arrayOfTerms) {

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
    let n = arrayOfTerms.length;

    for (let i = 0; i < bagOfWords.length; i++) {
        let dt = numberOfOccurrences(bagOfWords[i], arrayOfTerms);

        bagOfWords[i].idf = idf(n, dt);
    }
    return bagOfWords;
}

function tfidfVector(bagOfWords, arrayOfTerms) {
    let n = arrayOfTerms.length;

    for (let i = 0; i < bagOfWords.length; i++) {
        let dt = numberOfOccurrences(bagOfWords[i], arrayOfTerms);

        bagOfWords[i].tfidf = tfidf(tf(bagOfWords[i],arrayOfTerms), idf(n, dt));
    }
    return bagOfWords;
}*/

export function buildVector(bagOfWords, arrayOfTerms) {
    let n = arrayOfTerms.length;
    let termArray = [];

    for (let i = 0; i < bagOfWords.length; i++) {
        let term = {};
        term.name = bagOfWords[i][1] !== undefined ? bagOfWords[i][0] + ' ' + bagOfWords[i][1] : bagOfWords[i][0];

        for (let j = 0; j < arrayOfTerms.length; j++) {
            if (!exists(bagOfWords[i], arrayOfTerms[j])) {
                term.binary = term.binary === 1 ? 1 : 0;
            } else {
                term.binary = 1;
            }
        }

        term.occurrences = numberOfOccurrences(bagOfWords[i], arrayOfTerms);
        term.tf = tf(bagOfWords[i],arrayOfTerms);
        term.idf = idf(n, term.occurrences);
        term.tfidf = tfidf(tf(bagOfWords[i], arrayOfTerms), term.idf);

        termArray.push(term);
    }
    return termArray;
}

export function sumVector(objectTermArray) {
    let objectTerm = [];
    objectTerm.name = objectTermArray[0].name;
    objectTerm.binary = 0;
    objectTerm.occurrences = 0;
    objectTerm.tf = 0;

    for (let i = 0; i < objectTermArray.length; i++) {
        objectTerm.binary = objectTerm.binary + objectTermArray[i].binary;
        objectTerm.occurrences = objectTerm.occurrences + objectTermArray[i].occurrences;
        objectTerm.tf = objectTerm.tf + objectTermArray[i].tf;
    }

    objectTerm.idf = objectTermArray[0].idf;
    objectTerm.tfidf = tfidf(objectTerm.tf, objectTerm.idf);

    return objectTerm;
}

export function avgVector(objectTermArray) {
    let objectTerm = [];
    objectTerm.name = objectTermArray[0].name;
    objectTerm.binary = 0;
    objectTerm.occurrences = 0;
    objectTerm.tf = 0;

    for (let i = 0; i < objectTermArray.length; i++) {
        objectTerm.binary = objectTerm.binary + objectTermArray[i].binary;
        objectTerm.occurrences = objectTerm.occurrences + objectTermArray[i].occurrences;
        objectTerm.tf = objectTerm.tf + objectTermArray[i].tf;
    }

    objectTerm.binary = objectTerm.binary / objectTermArray.length;
    objectTerm.occurrences = objectTerm.occurrences / objectTermArray.length;
    objectTerm.tf = objectTerm.tf / objectTermArray.length;
    objectTerm.idf = objectTermArray[0].idf;
    objectTerm.tfidf = tfidf(objectTerm.tf, objectTerm.idf);

    return objectTerm;
}

//console.log(numberOfOccurrencesVector([["room"], ["on"]], [["on"], ["nice"]]));
//console.log(numberOfOccurrencesVector([["room", "on"], ["on", "nice"]], [["on", "nice"], ["on", "nice"], ["nice", "clearli"]]));
//console.log(tfVector([["room"], ["on"]], [["on"], ["nice"]]));
//console.log(tfVector([["room", "on"], ["on", "nice"]], [["on", "nice"], ["on", "nice"], ["nice", "clearli"]]));
//console.log(sumVector([{name:"best",binary:1,occurrences:4,tf:0.1,idf:0.01,tfidf:0.001,docId:1},{name:"best",binary:0,occurrences:0,tf:0.0,idf:0.01,tfidf:0.0,docId:2},{name:"best",binary:1,occurrences:1,tf:0.05,idf:0.01,tfidf:0.0005,docId:3}]));
//console.log(avgVector([{name:"best",binary:1,occurrences:4,tf:0.1,idf:0.01,tfidf:0.001,docId:1},{name:"best",binary:0,occurrences:0,tf:0.0,idf:0.01,tfidf:0.0,docId:2},{name:"best",binary:1,occurrences:1,tf:0.05,idf:0.01,tfidf:0.0005,docId:3}]));
//console.log(idfVector([["room"], ["on"]], [["on"], ["nice"]]));