# Documentation

## Scalable URL Shortener Project Requirement

### Phase I

#### Overview
The Scalable URL Shortener Project aims to create a URL shortening service that generates shortened aliases for long URLs. These shortened aliases, known as "short links," are used to redirect users to the original URL. URL shortening is beneficial for saving space, reducing errors when typing long URLs, and tracking individual links. This project will focus on implementing the backend functionality of the URL shortener service.

#### Key Points
- Create a dedicated group database named `groupXDatabase` to store the URL data.
- Each group should use a single Git branch following the naming convention `project/urlShortnerGroupX` for better coordination and version control.
- Adhere to the provided naming conventions to ensure successful integration with the front-end application.

#### Models
- Url Model:
  - `urlCode` (mandatory, unique, lowercase, trim): A unique code representing the shortened URL.
  - `longUrl` (mandatory, valid URL): The original long URL that needs to be shortened.
  - `shortUrl` (mandatory, unique): The generated shortened URL.

#### POST /url/shorten
Endpoint: `BASE_URL/url/shorten`  
Method: `POST`

This API allows the creation of a short URL for a given original URL. It accepts the following request body:

```json
{
  "originalUrl": "http://www.example.com/long-url",
  "baseUrl": "http://localhost:3000"
}
```

- The `originalUrl` field represents the original long URL that needs to be shortened.
- The `baseUrl` field represents the base URL of the application where the short URL will be generated.

Successful Response:
```json
{
  "status": true,
  "data": {
    "longUrl": "http://www.example.com/long-url",
    "shortUrl": "http://localhost:3000/abc123",
    "urlCode": "abc123"
  }
}
```

Error Response:
```json
{
  "status": false,
  "message": "Invalid request. Please provide a valid original URL."
}
```

#### GET /:urlCode
Endpoint: `BASE_URL/:urlCode`  
Method: `GET`

This API redirects users to the original URL associated with the provided `urlCode`. For example, if the shortened URL is `http://localhost:3000/abc123`, the `urlCode` would be `abc123`.

- If the `urlCode` is valid, the user will be redirected to the original URL.
- If the `urlCode` is invalid or not found, an appropriate error message will be returned.

### Testing
To test the APIs, create a Postman collection named "Project 2 Url Shortener" and include separate requests for each API. Ensure that each request in the collection is accurately named, such as "Url Shorten" and "Get Url." All team members should have their tests in a running state.

### Phase II

#### Caching Implementation
Considering scenarios where a famous person with a large following posts a link on Twitter that receives millions of clicks within a day, caching becomes crucial. To handle such high traffic, implement caching in the URL shortener service.

- Use caching mechanisms to store newly created short URLs for 24 hours.
- Retrieve the corresponding long URL from the cache when a short URL is accessed within the first 24 hours of its creation.
- Implement efficient caching techniques to minimize database calls and optimize performance during high traffic.

### Response Structures

#### Successful Response Structure
```yaml
{
  "status": true,
  "data": {
    // Response data
  }
}
  ```
### Error Response Structure
```yaml
{
  "status": false,
  "message": "Error message description"
}

  ```

This concludes the documentation for the Scalable URL Shortener Project.
