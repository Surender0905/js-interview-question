//what is proxy and how it works?
//proxy is a wrapper object that allows you to intercept and modify the behavior of an object.

//how to use
// const proxy = new Proxy(obj, handler);
// proxy.method();

//example
const obj = {
    a: 1,
    b: 2,
    c: 3,
};

const handler = {
    get(target, key) {
        //target is the object that is being proxied, key is the property that is being accessed
        if (key in target) {
            console.log(target, key, " in target");
            return target[key];
        } else {
            return 0;
        }
    },
    set(target, key, value) {
        target[key] = value;
    },
};

const proxy = new Proxy(obj, handler);

console.log(proxy.a); // 1
console.log(proxy.d); // 0

//proxy is a new object that is created by the Proxy constructor. It is a wrapper object that allows you to intercept and modify the behavior of an object.
// The target array
let numbers = [1, 2, 3, 4, 5];

// The handler object with traps for operations
let handler1 = {
    // Intercepting get (reading an element)
    get: function (target, prop) {
        if (prop in target) {
            console.log(`Accessed element at index ${prop}: ${target[prop]}`);
            return target[prop];
        } else {
            console.log(`Index ${prop} is out of bounds`);
            return undefined; // Return undefined if index doesn't exist
        }
    },

    // Intercepting set (modifying an element)
    set: function (target, prop, value) {
        if (typeof prop === "string" && !isNaN(prop)) {
            // Only allow numeric indices
            console.log(`Setting element at index ${prop} to ${value}`);
            target[prop] = value;
            return true; // Indicates successful modification
        } else {
            console.log(`Invalid index or property: ${prop}`);
            return false; // Reject invalid property access
        }
    },

    // Intercepting delete (deleting an element)
    deleteProperty: function (target, prop) {
        if (prop in target) {
            console.log(`Deleting element at index ${prop}`);
            delete target[prop];
            return true;
        } else {
            console.log(`No element at index ${prop} to delete`);
            return false;
        }
    },
};

// Creating a Proxy for the array
let proxyArray = new Proxy(numbers, handler1);

// Testing the Proxy
//access length
console.log("proxyArray.length");

// Accessing an element
console.log(proxyArray[2]); // "Accessed element at index 2: 3" and outputs 3

// Modifying an element
proxyArray[1] = 10; // "Setting element at index 1 to 10"

// Trying to access an out-of-bounds index
console.log(proxyArray[10]); // "Index 10 is out of bounds" and outputs undefined

// Deleting an element
delete proxyArray[3]; // "Deleting element at index 3"

// Checking the modified array
console.log(proxyArray); // Output: [1, 10, 3, empty, 5]
