# Overview
*Written by Harry Mumford-Turner for the University of Bristol [Web Technologies unit](http://www.bristol.ac.uk/unit-programme-catalogue/UnitDetails.jsa?unitCode=COMS32500).*

## Introduction
The website serves as a place to set the best practices for the web, lets me demonstrates my ability in this area and this report provides an overview of the [website](http://www.github.com/harrymt/web_playground) functionality. Note: for marking purposes, each section is considered to be of A grade.

### Contents

1. [HTML](#html)
2. [CSS](#css)
3. [JavaScript](#client-side-javascript)
4. [PNG](#png)
5. [SVG](#svg)
6. [Server](#server)
7. [Database](#database)
8. [Dynamic Pages](#dynamic_pages)
9. [Tests](#tests)
10. [Security](#security)



## HTML

The server serves *HTML5* ([Polyglot *HTML*](https://www.w3.org/TR/2011/WD-html-polyglot-20110405/#dfn-polyglot-markup)) content when it can with this content negotiation handled server-side.

The *HTML* is [*HTML5* compliant](https://www.w3.org/TR/html5/), tested using the W3C [HTML5 validator](https://validator.w3.org/nu).

The *HTML*, *CSS* and *JavaScript* all follow a [coding guide](http://codeguide.co/) to aid readability and maintainability. For example, the *JavaScript* is located at the bottom of the *HTML*, before the `</body>` tag, to not block the rest of Document Object Model (DOM) rendering of the page.

Project is mainly written in *Pug* an *HTML* templating language, but more on that [later checkurl](#dynamic_pages). Lets move onto the style of the website.


## CSS

### Framework

The website style is based on a *CSS* framework that I built called [*SimpleStyle*](https://github.com/harrymt/simplestyle). *SimpleStyle* is separated into another [repository](https://github.com/harrymt/simplestyle/tree/master/scss), but for the website release, it is included in the repo as a `.zip` file.

### SCSS

The framework uses [*SCSS*](http://sass-lang.com) - *'SCSS or SASS is an extension of CSS, adding nested rules, variables, mixins, selector inheritance, and more.'*[\[x\]](http://sass-lang.com). *SCSS* files are processed using *Ruby*, and in this project *SCSS* files are compiled using a *JavaScript* task runner called *Grunt* (more on this [later checkurl](#JavaScriptTaskRunner)).

The framework is served to the website via a Content Delivery Network or *CDN* for quick content delivery. For example, this is how *SimpleStyle* is added in our *Pug* (*HTML*) file.

```pug
// head.pug

head
  // .. title and meta tags ..
  link( rel='stylesheet', href='//rawgit.com/harrymt/simplestyle/master/simplestyle.min.css' )
  link( rel='stylesheet', href='/css/style.css' )
```

Notice how the `simplestyle.min.css` contains `min`. This is a standard way of showing that your files are *minified*. Minifying files is a post-process that strips the non-essential parts of a file. In a `.css` file this would mean removing comments, whitespace and shortening various styles (e.g. `#ffffff` to `#fff`).

When we process a `.scss` file into a `.css` file minification comes for free. This means when our files are served to a client, they take up less space as their filesize is lower.

### Standards

Style standards are based on the previously mentioned [coding guide](http://codeguide.co/) and specific *SCSS* standards are based on a single style guide from [AirBnB](https://github.com/airbnb/css). To enforce these styles a *linter* is used for validation in the build process. The [`scss-lint`]( https://www.npmjs.com/package/grunt-scss-lint) *Ruby* gem is used with *Grunt* during *SCSS* compile time.

JavaScript plays a large part in this project: server-side, client-side and during the build process. First we will talk about Client-Side JavaScript.


## JavaScript

CLIENT SIDE ONLY

- StyleGuide https://google.github.io/styleguide/jsguide.html
- Douglas Crockford JS best practices
  - Use Strict mode
  - Make field and methods private
  - Avoid using this keyword
  - Use Power constructors to avoid the new keyword
  - Inheritance is different
  - New ES6 features (not necessarily well supported cross browser )

- If js is disabled a banner message is displayed
- Add async to js files
- svg-animation, png animation
- database interaction


### Build Process
Grunt *JavaScript* Task Runner



## PNG
- PNG:
  - Working with bitmap graphics in Gimp or Krita
  - Show how to convert images to PNG, cropping away unwanted edges, changing resolution
  - Use basic tools such as using filters or changing colours or combining existing images or creating simple shapes or filling
  - Gained experience with some more sophisticated tools such as handling layers and transparency, or airbrushing or creating original artwork



## SVG

- Icons are drawn using SVG rather than loading a font pack, such as FontAwesome icons from https://icomoon.io/app/#/select/image
- Look at inkscape, different technologies!!!
- Generate circles in SVG http://www.lugolabs.com/circles

Animate a person icon using svg.

```scss

.svg-icon {
  height: 100px;
  overflow: visible;
  width: 100px;
}

.svg-icon path {
  animation: animatePath 5s 1s forwards infinite;
  fill: none;
  stroke: rgba(255, 255, 255, .9);
  stroke-width: 0.45;
}

```

- SVG:
  - this is working with vector graphics in Inkscape
  - Created a basic drawing in Inkscape, probably by copying something else
  - Gained experience with some of Inkscape's features such as shape tools, freehand drawing, simplification
  - Gained a higher level of experience, e.g. with path editing, grouping, transformations, gradients, patterns, etc., or put a lot of effort into vector artwork
  -

## Server

Bolierplates are like starting project templates. Some [boilerplates](http://www.nodebootstrap.io) were considered, along with different *JavaScript* frameworks, such as [AngularJS](https://angularjs.org/). But, these are very bloated and I wanted to understand exactly how content was served. Therefore, this project does not use any *JavaScript* frameworks and instead the base code uses *ExpressJS* [application generator](https://expressjs.com/en/starter/generator.html) - a recommended tool for starting a new server.

- port numbers, URL validation, content negotiation for old browsers, sending redirections to browsers, handling UTF-8
- https and certificates, or web sockets, or cloud hosting, or security issues beyond URL validation, or auto-testing, or cookies, or running under reduced privilege

- Uses [Mocha](https://github.com/mochajs/mocha) for unit tests
- QUnit for tests, JSlint for linting also client
-  Rendering the report from markdown to pdf
- pug html templating
- database interaction (different module)
-

## Database

Why not Mongo DB
http://www.sarahmei.com/blog/2013/11/11/why-you-should-never-use-mongodb/

http://cryto.net/~joepie91/blog/2015/07/19/why-you-should-never-ever-ever-use-mongodb/

- SQLite


## Dynamic Pages

### *HTML* Templates

The website is written in a *HTML* templating language called *[Pug](https://pugjs.org)*. *'Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.'* [\[x\]](https://github.com/pugjs/pug). *Pug* makes writing *HTML* code easier by using templates to split the document into tidy sections. For example below is a *Pug* snippet for the `/report` page - notice how we `extend layout.pug` which is the base *HTML* for this page.

```pug
// report.pug

extends layout.pug

block content
  h1= title
  p This was built as ... a full write up is found&#32;
    a( href='/report' ) here.
```

The base *HTML* template, `layout.pug` creates a `block` where  `report.pug` can place information specific to `/report`.

```pug
// layout.pug

doctype html lang="en-GB"
html
  include includes/head.pug
  body
  block content
  include includes/footer.pug
  include includes/foot.pug
```

Dynamically compiling each page enables less code reuse. Each `.pug` file is validated during the build process with a pug validated *Ruby* gem.


### Page Views

Talk about dynamic page views


### Markdown Report to PDF




## Tests


Talk about mocha JavaScript tests

### Performance & General
- Install the Chrome extension [Lighthouse](https://developers.google.com/web/tools/lighthouse/)
- TODO: add screenshot from lighthouse report @ end
- Used Browser Calories: https://chrome.google.com/webstore/detail/browser-calories/pdkibgfjegigkoaleelbkdpkgceljfco TODO add screenshot at end
- TODO https://developers.google.com/speed/pagespeed/
- TODO:
  - https://varvy.com/pagespeed/
  - http://www.webbloatscore.com/
  - http://pagelocity.com/
  - http://perfaudit.com/
  - http://yellowlab.tools/
  - https://www.sitespeed.io/documentation/

- Compression is used https://www.npmjs.com/package/compression
- Minification is used

### General Testing
- Performance, tests CL production code hosted on heroku
- Use PhantomJs to automate things you do in the website



## Security

- Based on: http://expressjs.com/en/advanced/best-practice-security.html
- Uses [Helmet](https://www.npmjs.com/package/helmet) to help protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately.
- Uses [Transport Layer Security](TLS)(https://en.wikipedia.org/wiki/Transport_Layer_Security) SSL configuration based on [Mozilla SSL config](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
- Uses the tag for external links `rel='noopener'` https://developers.google.com/web/tools/lighthouse/audits/noopener
- Site runs on HTTPS: https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https




===================== SPEC ===================


# Requirements
- Use standard HTML, CSS, JavaScript, PNG, SVG and other integrated client-side technologies, following the advice from the lectures.
- Node-based server
- DB embedded, preferably SQLite
- Design can be desktop-first or mobile-first, and you can use client-side or server-side techniques for creating dynamic pages.
- You can write everything yourself, or use any existing JavaScript-based frameworks or libraries or modules or scripts that you like.
- You should use open source tools as much as possible.

# Resources
- When reusing stuff.
- Check any restrictions (b) acknowledge them in your report (c) adapt them to follow the standards and advice in the lectures where necessary and (d) explain your added value (e.g. "I just copied it and learnt how to use it" or "I changed it a little" or "I understood it fully and re-wrote it").



## How marking will work

- install node modules needed
- ZIP file should contain everything, e.g. downloaded images, dont include node_modules or git repo

- Submit report as a webpage and PDF
- No marks for report.
- In PNG heading, describe how you created it!! (maybe make it online in a section?)

- Report should give estimated grades under each heading and list things ive done + JUSTIFY ESTIMATE

- Write something longer to explain overall aim and design
- Highlight things that I am proud of
- Anything that took a long time, but didn't make it into the site


