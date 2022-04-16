import {exists} from "../preprocessing/counting.mjs";
import {numberOfOccurrences} from "../preprocessing/counting.mjs";

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
        bagOfWords[i].occurrences = 0;

        for (let j = 0; j < arrayOfTerms.length; j++) {
            if (exists(bagOfWords[i], arrayOfTerms[j])) {
                bagOfWords[i].occurrences = bagOfWords[i].occurrences + 1;
            }
        }
    }
    return bagOfWords;
}

function tfVector(bagOfWords, arrayOfTerms) {

}

console.log(numberOfOccurrencesVector([["room"], ["on"]], [["on"], ["nice"]]));
console.log(numberOfOccurrencesVector([["room", "on"], ["on", "nice"]], [["on", "nice"], ["nice", "clearli"]]));