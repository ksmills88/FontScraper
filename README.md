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
