import {ngram} from "./tokenization.mjs";
import {log} from "debug";

export function words(text) {
    return text.split(' ').length;
}

export function characters(text) {
    return text.replace(/\s/gm,'').length;
}

export function exists(term, text) {
    return JSON.stringify(term) === JSON.stringify(text);
}

export function numberOfOccurrences(term, text) {
    let count = 0;

    for (let i = 0; i < text.length; i++) {
        if (exists(term, text[i])) {
            count = count + 1;
        }
    }
    return count;
}

export function tf(term, text) {
    return numberOfOccurrences(term, text) / text.length;
}

export function idf(N, dt) {
    return Math.log(N/dt);
}

export function tfidf(tf, idf) {
    return tf * idf;
}

//console.log(numberOfOccurrences(["on"], [["on"], ["on"]]));
//console.log(numberOfOccurrences(["on", "nice"], [["on", "nice"], ["on", "nice"], ["nice", "clearli"]]));
//console.log(idf(2,11));
//console.log(tfidf(2,2));