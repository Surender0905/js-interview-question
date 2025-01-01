//object assign method

const obj1 = { a: 1, b: 2, c: 3 };
const copy = obj1;

console.log(obj1 === copy);

const obj2 = { d: 4, e: 5 };

//one way
const obj3 = { ...obj1, ...obj2 };

//another way
const obj4 = Object.assign({}, obj1, obj2);

// Object.assign(); ///first parameter is target object eg={} and other parameters are source objects eg={a:1,b:2}

console.log(obj3);
console.log(obj4);
console.log(obj4 === obj1); //true-- both are pointing to same object

//create a custom object assign method

const customAssign = (target, ...sources) => {
    for (let i = 0; i < sources.length; i++) {
        for (let key in sources[i]) {
            target[key] = sources[i][key];
        }
    }
    return target;
};
