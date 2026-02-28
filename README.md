# Scalability Choices

## Parameterized Query Keys
In order to enhance security and efficiency, we have introduced parameterized query keys. This allows for dynamic query construction where user inputs are safely handled to prevent SQL injection attacks.

## Server-Side Filtering
Server-side filtering has been implemented to reduce the amount of data sent to the client. This enables clients to request only the necessary subset of data, improving performance and reducing load times.

## Pagination Support
To manage large datasets effectively, pagination support has been incorporated. Clients can now specify the page number and size to retrieve data in manageable chunks, enhancing user experience and system performance.