import {cleanText} from "./clean.mjs";
import {stemm} from "./stemming.mjs";
import {ngram} from "./tokenization.mjs";
import {cleanStopwords} from "./stopwords.mjs";


export function preprocessing(text, n) {

    var result = {};

    result.originalText = text;
    result.n = n;
    result.cleanedText = cleanText(cleanStopwords(text).join(' '));
    result.stemmedText = stemm(result.cleanedText).join(' ');
    result.textTokens = ngram(n, result.stemmedText.split(' '));

    return result;
}

//console.log(preprocessing('a really Interesting string with some words', 2));