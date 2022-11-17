# espressojs
Messing around with server-side batching of api requests

Guide:

- client folder contains a test script that sends multiple requests, adding the token given to it by the api response to its body after making the first request, then sends some number of requests.
- The requests are resolved server-side and the results (in this case of a simple incrementer) are pushed to an array mapped to the requests token in the 'track' object.
- When the final request is made, signalled by the "end" attribute of the request body being set to true, the contents of the stack that's mapped to the request token is returned in a response body.

Use:

- On client side, initiate an instance of Espresso class

- On all calls except the last call, use ```instance.request(url, body, false) ```
- On final call set ```instance.request(url, body, false, true) ``` to a variable or return the function call as this returns the batched results.
