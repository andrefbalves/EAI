const { removeStopwords, eng } = require('stopword');

function cleanStopwords(text) {
    return removeStopwords(text);
}

//console.log(removeSpecificChars('a re123all!y Int\' "ere32312sti%#"$&/ng st.rin3213gwi\\thso,;:me wo?rds'))