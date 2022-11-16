# espressojs
Messing around with server-side batching of api requests

Guide:

- client folder contains a test script that sends multiple requests, adding the token given to it by the api response to its body after making the first request, then sending some number of requests.
- The requests are resolved server-side and the results (in this case of a simple incrementer) are pushed to an array mapped to the requests token in the 'track' object.
- When the final request is made, signalled by the "end" attribute of the request body being set to true, the contents of the stack that's mapped to the request token is returned in a response body.
