//! callback

//promise section
const STATE = {
    PENDING: "PENDING",
    FULFILLED: "FULFILLED",
    REJECTED: "REJECTED",
};

class MyPromise {
    constructor(executor) {
        executor(this.#resolve, this.#reject);
    }

    #resolve() {}

    #reject() {}

    then() {}

    catch() {}

    finally() {}
}
const p = new MyPromise((resolve, reject) => {});

console.log(p);

///polyfill of promise.all

const promiseAll = (promises) => {
    return new Promise((resolve, reject) => {
        let count = 0;
        const result = [];
        for (let i = 0; i < promises.length; i++) {
            if (typeof promises[i] !== "object") {
                promises[i] = Promise.resolve(promises[i]);
            }
            promises[i].then(
                (data) => {
                    count++;
                    result[i] = data;
                    if (count === promises.length) {
                        resolve(result);
                    }
                },
                (err) => {
                    reject(err);
                },
            );
        }
    });
};

console.log(promiseAll([1, 2, 3]).then((data) => console.log(data)));

//promise.allsettled

const promiseAllSettled = (promises) => {
    return new Promise((resolve, reject) => {
        let count = 0;
        const result = [];
        for (let i = 0; i < promises.length; i++) {
            if (typeof promises[i] !== "object") {
                promises[i] = Promise.resolve(promises[i]);
            }
            promises[i].then(
                (data) => {
                    count++;
                    result[i] = { status: "fulfilled", value: data };
                    if (count === promises.length) {
                        resolve(result);
                    }
                },
                (err) => {
                    count++;
                    result[i] = { status: "rejected", reason: err };
                    if (count === promises.length) {
                        resolve(result);
                    }
                },
            );
        }
    });
};

console.log(promiseAllSettled([1, 2, 3]).then((data) => console.log(data)));

//now with one error

console.log(
    promiseAllSettled([1, 2, 3, Promise.reject("error")]).then((data) =>
        console.log(data),
    ),
);

//promise.race

const promiseRace = (promises) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            if (typeof promises[i] !== "object") {
                promises[i] = Promise.resolve(promises[i]);
            }
            promises[i].then(
                (data) => {
                    resolve(data);
                },
                (err) => {
                    reject(err);
                },
            );
        }
    });
};

console.log(promiseRace([1, 2, 3]).then((data) => console.log(data)));

//now with some race condition example with timeout

const promiseRaceWithTimeout = (promises, timeout) => {
    return new Promise((resolve, reject) => {
        let timeoutId = setTimeout(() => {
            reject(new Error("Timeout"));
        }, timeout);
        for (let i = 0; i < promises.length; i++) {
            if (typeof promises[i] !== "object") {
                promises[i] = Promise.resolve(promises[i]);
            }
            promises[i].then(
                (data) => {
                    clearTimeout(timeoutId);
                    resolve(data);
                },
                (err) => {
                    clearTimeout(timeoutId);
                    reject(err);
                },
            );
        }
    });
};

///promise retry

const promiseRetry = (fn, retries, delay) => {
    return new Promise((resolve, reject) => {
        let attempt = 0;
        const retry = () => {
            fn()
                .then(resolve)
                .catch((err) => {
                    attempt++; // Increment the attempt counter
                    if (attempt < retries) {
                        setTimeout(retry, delay); // Retry after a delay
                    } else {
                        reject(err); // Give up after max retries
                    }
                });
        };
        retry();
    });
};
