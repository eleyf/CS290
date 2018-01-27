/*
**  eleyf
**  1/21/18
**  cs290 w2018
**  Activity JS Objects
*/

function deepEqual (a,b) {
    //test if both parameters are NOT objects
    if (! ((typeof a == "object" && a != null) &&
          (typeof b == "object" && b != null))){
        //both not objects, test by identity
        if (a !== b){
            return false;
        }
    }

    // both are objects, compare with recursive call to deepEqual
    else{
        //count the properties in both objects and return false if the numbers of properties are different.
        var aCount = 0;
        var bCount = 0;

        for (var aProp in a){
            aCount++;
        }

        for (var bProp in b){
            bCount++;
        }

        if (aCount != bCount){
            return false;
        }

        // then go over the properties of one object,
        // and for each of them, verify that the other object also has the property.
        // The values of the properties are compared by a recursive call to deepEqual.
        for (var prop in a){
            if (!(prop in b)){
                return false;
            }
            else {
               return deepEqual(a[prop], b[prop]);
            }
        }
    }

    return true;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

console.log(deepEqual(2, "two"));

console.log(deepEqual(2,2));