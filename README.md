# Webflow Font Family Scraper

Given a URL input, scrape the webpage and its related files to find all fonts being used on the site.

### Technologies to use

- node.js

### Details

Construct a node.js/express server, or a lambda endpoint that will receive a URL as an input. Your service will then parse the URL, and find all fonts that are being used on that page. (no need to crawl the entire domain and traverse all the links).

- Inline style fonts
- CSS stylesheet defined fonts

The API response of your endpint should include a list of the font families used.

*Stretch goals*:

- Include how many times a characters of each font family appears
- Optional parameter to crawl relative links that exist on the page
- Optional parameter to limit the number of pages to crawl
- Optional parameter to perform depth or breadth first crawling
- Tests
- Crawl the 100 most popular sites on [Webflow Discover](https://webflow.com/discover/popular) section.

### Submission details

- Submit a PR to this repo with your source code with README.md instructions

# Getting Started

## This is a Node.js application that takes in a URL as a URL parameter, downloads and parses the CSS files associated with that URL, and extracts all of the associated fonts and sends them to an API endpoint.

### Packages used:
- [express](https://www.npmjs.com/package/express)
- [cheerio](https://www.npmjs.com/package/cheerio)
- [request](https://www.npmjs.com/package/request)
- [minimalcss](https://www.npmjs.com/package/minimalcss)

## Instructions

1. CLONE repo locally

2. INSTALL dependencies (Node must be installed on your machine)

3. RUN the server.js file


    ```node
    $ node server.js
    ```

4. Go to the API endpoint

    - navigate to http://localhost:8080/api/websites. You will see a default result that looks like this:
    ![Webflow](/images/APIEndpoint.png)

    - The application works by taking in a url as a parameter. 
        > ```/api/websites/:url```
    - When you hit the route, the code runs to scrape the font data and html title from the given website. This will take a few seconds.

    - Once the scrape is complete, you will see the updated results of that scrape (replacing the previous results).

    - If the application was unable to scrape the font data, your result will look something like this:

        ```js
        [
            {
                "url": "https://google.com",
                "title": "Google",
                "fonts": "Sorry, no fonts were found"
                
            }
        ]
        ```


    - A few error-proof sites that Successfully scrape font data:
        - https://webflow.com
        - https://dijatek.com
        - https://apple.com
        - https://reddit.com



### Limitations

- Not all websites and CSS files were created equally.
- Some websites do not allow access to their CSS via this application. The responses from those websites do not include the font data.

## Questions??

Email: ksmills82@gmail.com