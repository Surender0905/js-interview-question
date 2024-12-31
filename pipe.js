//pipe in js
// what is pipe? --> pipe is a function that takes a series of functions as arguments and returns a new function that applies the functions in the series to the input.

const getFirstName = (person) => {
    return person.firstName;
};

const getUpperCaseName = (name) => {
    return name.toUpperCase();
};

const obj = { firstName: "John", lastName: "Doe" };

// function pipe(welcome) {
//     return function (person) {
//         console.log(welcome, person);
//     };
// }

const pipe = (welcome) => (person) => console.log(welcome, person.firstName);
pipe("hello")(obj);

///implementation of pipe with reducer
const pipe1 =
    (...fns) =>
    (x) =>
        fns.reduce((v, f) => f(v), x);

pipe1(getFirstName, getUpperCaseName)(obj);
