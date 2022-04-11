import {stemmer} from 'stemmer';

export function stemm(text) {
    var words = text.split(" ");

    for (var i = 0; i < words.length; i++) {
        words[i] = stemmer(words[i]);
    }

    return words;
}

//console.log(stemm(6,'a really Interesting string with some words'));