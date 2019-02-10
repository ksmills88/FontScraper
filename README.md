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
- Crawl the 100 most popular sites on [Webflow Discover](webflow.com/discover/popular) section.

### Submission details

- Submit a PR to this repo with your source code with README.md instructions

# Getting Started

## This is a Node.js application that take in a URL, downloads and parses the CSS files associated with that URL, and extracts all of the fonts being used on the page.

### Packages used:
- [cheerio](https://www.npmjs.com/package/cheerio)
- [request](https://www.npmjs.com/package/request)
- [minimalcss](https://www.npmjs.com/package/minimalcss)

## Instructions

1. CLONE repo locally

2. INSTALL dependencies (Node must be installed on your machine)

3. RUN the index.js file
    
    ### Options to run the File:
    1.  With a given URL as the 3rd argument
        ```node
        $ node index.js https://dijatek.com/
        ```

    2. Without a given URL 

        ```node
        $ node index.js
        ```
        *Default URL set to https://www.webflow.com*

    ### Terminal Output:
    ```node
    =======================================================================
    Gathering fonts from:

    https://www.webflow.com

    Responsive web design tool, CMS, and hosting platform | Webflow
    =======================================================================

    *** RESULTS ***

    sans-serif
    Graphik
    inherit
    Roboto Mono
    Syncopate
        
    ```

### Error Handling

- (User error) Logic is built in for incomplete or non-valid URL strings.
- If no results, output includes "no results found"
- If the minimize function does not successfully retrieve all CSS files, error is shown.

### Limitations

- Not all websites and CSS files were created equally.
- Some websites do not allow access to their CSS via this application.

