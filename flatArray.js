//flat array
const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];

console.log(arr.flat(Infinity));
const result = [];
///deep flatten 1 (iterative-recursion)
function deepFlatten(arr) {
    for (item of arr) {
        if (Array.isArray(item)) {
            deepFlatten(item);
        } else {
            result.push(item);
        }
    }

    return result;
}

console.log(deepFlatten(arr));

///deep flatten 2 ( reducers)
const deepFlatten2 = (arr) =>
    arr.reduce(
        (acc, item) =>
            acc.concat(Array.isArray(item) ? deepFlatten2(item) : item),
        [],
    );

///  deep flatten 3 stack
const deepFlatten3 = (arr) => {
    const stack = [...arr];

    const result = [];
    while (stack.length > 0) {
        console.log(stack, "stack");
        const item = stack.pop();
        console.log(item, "item");
        if (Array.isArray(item)) {
            stack.push(...item);
        } else {
            result.push(item);
        }
    }
    return result;
};

console.log(deepFlatten3(arr));
