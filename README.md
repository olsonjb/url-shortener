# Implementation Details
<!-- Provide a short description of your implementation (technologies used, brief overview of project architecture, etc.) -->
The URL shortener is implemented in Next.js (React) and TypeScript. The project was initialized as suggested by the Next.js team using the following command: `npx create-next-app@latest --use-yarn`.

The project is comprised of 3 basic building blocks:
1. Page UI
2. URL Shortening API
3. Routing Middleware

## Page UI
This is the part you see. It's a simple form, which when submitted sends a POST request to the URL shortening API in order to generate a slug and store it alongside the URL in a map in server memory. The UI then displays the URL with the slug received from the POST response. URL validation is also handled by the input element.

## URL Shortening API
Creates an endpoint (`/api`) for 2 request types:
- POST Request Handler: When the API receives a POST request it creates a unique ID (slug) for the URL provided in the request body. It inserts the URL into a map with the slug as it's key, and returns the slug to the user.
- GET Request Handler: When the API receives a GET request it returns the map of slugs-to-urls as a JSON object.

## Routing Middleware
Handles the redirection of shortened URL's to the corresponding full-length URL. Parses the slug from the end of the url and performs a GET request to the URL shortening API to retrieve the map of slugs-to-urls from server memory. It then redirects the user to the URL corresponding to the slug. If slug provided is not valid, the user is redirected to the home page.

# How to Run
<!--
- Include instructions on how to run your implementation locally. Be sure to include any necessary setup steps, such as installing dependencies, as well as the commands to start the application.
-->
1. Clone the repository
2. Run `yarn install` in the project root
3. Run `yarn build` in the project root
4. Run `yarn start` in the project root
5. Visit the URL output in the terminal, which should be [https://localhost:3000]()

# Testing
<!-- Describe how you tested your solution (automated testing, manual testing process, screenshots, etc.) -->
In the time provided I did not create any automated tests, although each of the 3 components described above is independently testable. I manually tested the entire system. A couple cases I made sure to consider and handle in the solution:
- The user attempts to shorten an invalid URL. This is not permitted by the client.
- The user attempts to navigate to a "shortened" url that does not exist (i.e. the slug is invalid). The user will be gracefully redirected to the home page.

### Additional Considerations
Given more time, I may have made a few adjustments to improve the solution:
- When redirecting a user to the home page due to an invalid slug, I think it would be beneficial to display a message indicating that the shortened URL was not valid.
- I would also adjust the GET endpoint for the URL Shortening API to return only a single full-length URL for a given slug, rather than the entire map. While there may be no expectation of privacy for shortened URL's, implementing the API this way would follow a more secure pattern as it would prevent users from viewing all shortened URL's. In addition, it would allow the Middleware to be agnostic to the API implementation and allow for easier scaling.

# Tools Used
<!--
- Describe any tools you used in developing your solution (e.g. ChatGPT for generating ideas and styles)
- Note: The use of AI tools is not discouraged, but they should be used judiciously.
-->
I have the Github Copilot extension installed in my IDE. I used some autocomplete features and no chat features. I prompted Meta's Llama 3 with some questions around Next.js middlewares and API routes, but generally found the official Next.js [docs](https://nextjs.org/docs/app) more helpful.

---
