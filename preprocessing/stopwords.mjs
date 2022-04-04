import { removeStopwords, eng } from 'stopword';

export function cleanStopwords(text) {
    return removeStopwords(text.split(' '));
}

//console.log(cleanStopwords('a really Interesting string with some words'))