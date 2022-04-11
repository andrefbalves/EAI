import {ngram} from "./tokenization.mjs";

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

console.log(numberOfOccurrences(['really', 'really'], 'a really really really Interesting string with some words'));
console.log(numberOfOccurrences( ['really'],'a really really really Interesting string with some words'));