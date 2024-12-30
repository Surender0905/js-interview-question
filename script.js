// debounce function

///random function to know about this

const test = (...args) => {
    // console.log(this, "test", args);
    console.log("test");
};

const random = (fn) => {
    return (...args) => {
        fn.apply(this, args);
    };
};

// random(test)();

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function debounce1(func, delay) {
    let timer;
    return function (...args) {
        if (!timer) {
            func(...args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
            timer = null;
        }, delay);
    };
}

function throttle(func, delay) {
    let timer;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, delay);
        }
    };
}

function getData() {
    console.log("getData");
}

const keyPress = debounce(getData, 500);

const keyPress2 = throttle(getData, 500);

// const debounce = (func, delay) => {
//     let timeout;
//     return (...args) => {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(this, args), delay);
//     };
// };

////curring

const sum = (a, b, c) => a + b + c;

///basic curry function
const sum1 = (a, b) => {
    return a + b;
};

// function sum(a) {
//     return function (b) {
//         return function (c) {
//             return a + b + c;
//         };
//     };
// }

function currySum(fn) {
    return function (a) {
        return function (b) {
            return fn(a, b);
        };
    };
}

const cuuriedSum = currySum(sum1);
console.log(cuuriedSum(50)(50));

const currying1 = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) return fn(...args);
        return function (...args2) {
            return curried(...args, ...args2);
        };
    };
};
// const curriedSum1 = currying1(sum);
// console.log(curriedSum1(50, 50)(50));

const currying = (fn) => {
    let args = [];
    return function curried(...newArgs) {
        args = [...args, ...newArgs];
        if (args.length < fn.length) return curried;
        return fn(...args);
    };
};

const curriedSum1 = currying(sum);
console.log(curriedSum1(50, 50)(50));
