---
title: "Fetching Data"
---

# API
The API I used was CoinCap, and here is the code they provided on their website for integration with JavaScript:
```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("api.coincap.io/v2/assets", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

In my backend function, I implemented this logic using fetch to handle the data retrieval. Here's how I integrated it:

```javascript
export default async function retrieveCoins(retries = 3, delay = 1000) {
    try {
        const response = await fetch("https://api.coincap.io/v2/assets", {
            method: "GET",
            redirect: "follow",
        });
    
        if (!response.ok) {
            if (response.status === 429 && retries > 0) {
                console.warn("Rate limit exceeded. Retrying in", delay / 1000, "seconds...");
                await new Promise(resolve => setTimeout(resolve, delay));
                return retrieveCoins(retries - 1, delay * 2);
            } else {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
        }
    
        return await response.json();
    } catch (e) {
        console.error("The following error occurred when trying to fetch data: ", e);
    }
}
```
The function is quite similar to the original code, but the key differences lie in the error handling. My implementation specifically addresses the case where the API might receive requests too frequently. When the response returns a `429 - Rate Limit Exceeded` status, the function catches this error and waits for 2 seconds before recursively calling itself again, decrementing the retries parameter each time. This process ensures that the request is retried a few times before the function will fail and throw an error if the issue persists.

### Fetching
```javascript
const { data, error, isLoading, isFetching } = useQuery({
queryKey: ['coins'],
queryFn: retrieveCoins,
staleTime: 1000 * 60 * 5
});
```
This is the code I used for React Query to pull and cache the data. The staleTime is set to ensure that we have a functional refresh button and to prevent constant loading by allowing the data to be considered fresh for a set amount of time.
### Re-Fetching
```javascript
const fetchCoins = async () => {
queryClient.invalidateQueries(['coins']);
}
```
This works because invalidating the cache forces a re-fetch of the data.