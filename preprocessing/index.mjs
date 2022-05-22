import {cleanText} from "./clean.mjs";
import {stemm} from "./stemming.mjs";
import {ngram} from "./tokenization.mjs";
import {cleanStopwords} from "./stopwords.mjs";


export function preprocessing(id, text, n) {

    let result = {};

    result.id  = id;
    result.originalText = text;
    result.cleanedText = cleanText(cleanStopwords(text).join(' '));
    result.stemmedText = stemm(result.cleanedText).join(' ');
    result.unigrams = ngram(n, result.stemmedText.split(' '));

    return result;
}

//console.log(preprocessing('a really Interesting string with some words', 2));