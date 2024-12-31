///deep equality for objects and arrays
const deepEquality = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!deepEquality(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (typeof a === "object" && typeof b === "object") {
        if (a === null && b === null) {
            // both are null or both are not null
            return true; // return true
        } else if (a === null || b === null) {
            // one is null and the other is not null
            return false; // return false
        } else {
            // both are not null
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length) {
                return false;
            }
            for (let key of keysA) {
                if (!deepEquality(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
    } else {
        return a === b;
    }
};

//

const object1 = {
    a: 1,
    b: 2,
    c: {
        d: 3,
    },
};

const object2 = {
    a: 1,
    b: 2,
    c: {
        d: 4,
    },
};

const deepEqualObj = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

const deepEqual = (a, b) => {
    if (typeof a === "object" && typeof b === "object") {
        if (a === null && b === null) {
            return true;
        } else if (a === null || b === null) {
            return false;
        } else {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length) {
                return false;
            }
            for (let key of keysA) {
                if (!deepEqual(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
    }
    return a === b;
};

const deepEqualArr = (a, b) => {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) {
            return false;
        }
    }
    return true;
};

console.log(deepEqualObj(object1, object2), typeof null);
console.log(deepEqual(object1, object2));
console.log(deepEqualArr([1, 2, 3], [1, 2, 3]), "array");
