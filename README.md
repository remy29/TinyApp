# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

!["screenshot description"](https://github.com/remy29/tinyapp/blob/master/docs/landing_page.png?raw=true)
!["screenshot description"](#)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm start` command.
- Access TinyApp from browser at http://localhost:8080/

## Notes

- When creating a new url, any of the following formats will work: "example.com", "www.example.com", "http(s)://example.com", "http(s)://www.example.com"

- If server is reset, delete cookies from browser manually through chrome devtools
  * Mac: hold option + command + i to access cookies
  * Windows/Linux:  CTRL + Shift + i

## Roadmap

- Implementing Method Override and analytics
- Creating seperate files for app.post and app.get routes

## Bugs

- No yet discovered **major** bugs
- Can cause errors when server is reset but cookies arent cleared

###### Version 1.0.0


