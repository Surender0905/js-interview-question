// auto retry

let attemptCount = 0;
const fetchData = async (url, retries, delay) => {
    try {
        attemptCount++;
        if (attemptCount <= 2) {
            throw new Error("Failed to fetch data");
        }

        console.log("Fetching data...");

        const response = await fetch(url);

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(
            "Error fetching data:",
            error.message,
            "Attempt count:",
            attemptCount,
        );
        if (retries > 0) {
            console.log("Retrying...");
            retries--;
            //set delay
            await new Promise((resolve) => setTimeout(resolve, delay));
            fetchData(url, retries);
        } else {
            console.log("Max retries reached. Exiting...");
        }
    }
};

fetchData("https://jsonplaceholder.typicode.com/posts/1", 3, 1000);
