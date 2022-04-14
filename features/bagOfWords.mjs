import {exists} from "../preprocessing/counting.mjs";

export function addUniqueTerms(array1, array2) {

    for (let i = 0; i < array2.length; i++) {
        let x = false;

        for (let j = 0; j < array1.length; j++) {
            if (exists(array2[i], array1[j])) x = true;
        }

        if ( x === false){
            array1.push(array2[i])
        }
    }
    return array1;
}

//console.log(addUniqueTerms(["Banana", "Orange", "Apple", "Mango"],["Kiwi", "Lemon", "Apple", "Mango"]));
//console.log(addUniqueTerms([["room"], ["on"]], [["on"], ["nice"]]));
//console.log(addUniqueTerms([["room", "on"], ["on", "nice"]], [["on", "nice"], ["nice", "clearli"]]));