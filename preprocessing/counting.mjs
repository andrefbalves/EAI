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

function numberOfOccurrences(term, text) {
    let array = [];
    let count = 0;

    array = ngram(Array.isArray(term) ? term.length : 1, text.split(' '));

    for (let i = 0; i < array.length; i++) {
        if (exists(term, array[i])) count++;
    }

    return count;
}

function tf(term, text) {
    let array = Array.isArray(term) ? term : [term];

    return numberOfOccurrences(array, text);
}

function idf(N, dt) {
    return Math.log(N/dt);
}

function tfidf(tf, idf) {
    return tf * idf;
}

//console.log(numberOfOccurrences(['really', 'really'], 'a really really really Interesting string with some words'));
//console.log(tf( 'really','a really really really Interesting string with some words'));
//console.log(idf(2,11));
//console.log(tfidf(2,2));