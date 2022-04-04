import {stemmer} from 'stemmer';
import {ngram} from './tokenization.mjs';

export function stemm(n, text) {
    var words = ngram(n, text.split(" "));

    for (var i = 0; i < words.length; i++) {
        words[i] = stemmer(words[i]);
    }

    return words;
}

//console.log(stemm(6,'a really Interesting string with some words'));