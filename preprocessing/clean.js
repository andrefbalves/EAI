function lowerText(text) {
    return text.toLowerCase();
}

function removeSpaces(text) {
    return text.replace(/^\s|\s$|\s{2,}/gm, ' ').trim();
}

function removeSpecificChars(text) {
    return text.replace(/[^\w\s]|_|\d/g, '');
}

function cleanText(text) {
    return removeSpecificChars(removeSpaces(lowerText(text)));
}

module.exports = cleanText;

//console.log(cleanText('a re123all!y Int\'"ere32312sti%#"$&/ng st.rin3213g wi\\th so,;:me wo?rds'));