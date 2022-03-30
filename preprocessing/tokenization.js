import { nGram } from 'n-gram';

function ngram(n, text) {
    return nGram(n)(text);
}

module.exports = ngram;

//console.log(ngram(6,'a really Interesting string with some words'));