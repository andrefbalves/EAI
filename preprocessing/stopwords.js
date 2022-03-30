import { removeStopwords, eng } from 'stopword';

function cleanStopwords(text) {
    return removeStopwords(text.split(' '));
}

module.exports = cleanStopwords;

//console.log(cleanStopwords('a really Interesting string with some words'))