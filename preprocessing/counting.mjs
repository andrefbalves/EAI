import {ngram} from "./tokenization.mjs";

function words(text) {
    return text.split(' ').length;
}

function characters(text) {
    return text.replace(/\s/gm,'').length;
}

function numberOfOccurrences(term, text) {
    let array = [];
    let count = 0;

    if (Array.isArray(term)) {
        array = ngram(term.length, text.split(' '));

        for (let i = 0; i < array.length; i++) {
            if (array[i] === term) count++;
        }
    }else {
        array = ngram(1, text.split(' '));
    }



    //array.filter((v) => (v == term)).length

    //return array.filter((v) => (v == term)).length;
    return count;
}

console.log(numberOfOccurrences(['really', 'Interesting'],'a really really really Interesting string with some words'));