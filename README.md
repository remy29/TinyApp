# TinyApp Project

TinyApp is a student developed full stack web application built with Node and Express that allows users to shorten long URLs. Works similarly to Bit.ly, TinyURL etcetera.

## Final Product

#### Landing Page
!["Landing Page"](https://github.com/remy29/tinyapp/blob/analytics/docs/landing-page.png?raw=true)

#### URLs Page Populated with a Variety of URL Styles
!["URLs Page Populated with a Variety of URL Styles"](https://github.com/remy29/tinyapp/blob/analytics/docs/urls-page.png?raw=true)

#### URL Edit Page
!["URL Edit Page"](https://github.com/remy29/tinyapp/blob/analytics/docs/urls-edit-page.png?raw=true)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session
- method-override

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm start` command.
- Access TinyApp from browser at http://localhost:8080/

## Notes

- When creating a new url, any of the following formats will work: "example.com", "www.example.com", "http(s)://example.com", "http(s)://www.example.com"

- If server is reset, delete cookies from browser manually through chrome devtools
  * Mac: hold option + command + i to access cookies
  * Windows/Linux:  CTRL + Shift + i

- For updated analytics to show please refresh page

## Roadmap

- Creating seperate files for app.post and app.get routes

## Bugs

- No yet discovered **major** bugs
- Can cause errors when server is reset but cookies arent cleared (this can mostly be side stepped either by clearing to cookies and/or logging out after reset)

###### Version 1.6.0


