# Overview
*Written by Harry Mumford-Turner for the University of Bristol [Web Technologies unit](http://www.bristol.ac.uk/unit-programme-catalogue/UnitDetails.jsa?unitCode=COMS32500).*

## Introduction
The website serves as a place to set the best practices for the web, lets me demonstrates my ability in this area and this report provides an overview of the [website](http://www.github.com/harrymt/web_playground) functionality. Note: for marking purposes, I worked alone and each section is of grade A quality.

![Screenshot](http://webtechnologies.herokuapp.com/images/screenshot.png "Website Homepage Screenshot")

### Contents

1. Front-End
    - HTML
    - CSS
    - JavaScript
    - PNG
    - SVG
2. Back-End
    - Server
    - Database
    - Dynamic Pages
    - Tests
    - Security



## HTML

The server serves *HTML5* ([Polyglot *HTML*](https://www.w3.org/TR/2011/WD-html-polyglot-20110405/#dfn-polyglot-markup)) content when it can with this content negotiation handled server-side. The *HTML* is [*HTML5* compliant](https://www.w3.org/TR/html5/) and is tested using the W3C [HTML5 validator](https://validator.w3.org/nu).

The *HTML*, *CSS* and *JavaScript* all follow a [coding guide](http://codeguide.co/) to aid readability and maintainability. For example, the *JavaScript* is located at the bottom of the *HTML*, before the `</body>` tag, to not block the rest of Document Object Model (DOM) rendering of the page. Finally the project is mainly written in an *HTML* templating language called *Pug*, but more on that later. Lets move onto the style of the website.


## CSS

### Framework

The website style is based on a *CSS* framework that I built called [*SimpleStyle*](https://github.com/harrymt/simplestyle).

![SimpleStyle Screenshot](http://webtechnologies.herokuapp.com/images/simplestyle-screenshot.png "SimpleStyle Screenshot")

*SimpleStyle* is separated into another [repository](https://github.com/harrymt/simplestyle/tree/master/scss), but for the website release, it is included in the repo as a `.zip` file.

### SASS

The framework uses [*SASS*](http://sass-lang.com) - *'SASS or SCSS is an extension of CSS, adding nested rules, variables, mixins, selector inheritance, and more.'* [\[1\]](http://sass-lang.com). *SASS* files are processed using *Ruby*, and in this project *SASS* files are compiled using a *JavaScript* task runner called *Grunt* (more on this later).

![SASS](http://webtechnologies.herokuapp.com/images/simplestyle-screenshot.png "SASS framework")


The framework is served to the website via a Content Delivery Network or *CDN* for quick content delivery. For example, this is how *SimpleStyle* is added in our *Pug* (*HTML*) file.

```jade
// head.pug

head
  // .. title and meta tags ..
  link( rel='stylesheet', href='//rawgit.com/harrymt/simplestyle/master/simplestyle.min.css' )
  link( rel='stylesheet', href='/css/style.css' )
```

Notice how the `simplestyle.min.css` contains `min`. This is a standard way of showing that your files are *minified*. Minifying files is a post-process that strips the non-essential parts of a file. In a `.css` file this would mean removing comments, whitespace and shortening various styles (e.g. `#ffffff` to `#fff`).

When we process a SASS `.scss` file into a `.css` file minification comes for free. This means when our files are served to a client, they take up less space as their filesize is lower.

### CSS Standards

Style standards are based on the previously mentioned [coding guide](http://codeguide.co/) and specific *SASS* standards are based on a single style guide from [AirBnB](https://github.com/airbnb/css). To enforce these styles a *linter* is used for validation in the build process. The [`scss-lint`]( https://www.npmjs.com/package/grunt-scss-lint) *Ruby* gem is used with *Grunt* during *SASS* compile time.

JavaScript plays a large part in this project: server-side, client-side and during the build process. First we will talk about Client-Side JavaScript.


## JavaScript

NodeJS server component uses server-side JavaScript, but this section talks about the client-side JavaScript.

The JavaScript code (both client-side and server-side) is based on [Google's JavaScript styleguide](https://google.github.io/styleguide/jsguide.html) also adhering to some of Douglas Crockford JavaScript best practices. For example, using 'strict' mode to enforce certain standards.

The main features for this project are the PNG animation in `/dev/js/png-animation.js`, database interaction in `/dev/js/main.js` and the build process using *Grunt* in `/Gruntfile.js`.

### PNG Animation

Using HTML5 Canvas, shapes are programatically displayed and a simple animation shows raindrops over a city. The animation is found on the [`/front-end`](https://webtechnologies.herokuapp.com/front-end#png) page.


### Database Interaction

I use *JQuery* to get a value in an embedded *SQLite* Database using a simple `GET` request to our *API*. This data is then set to a `hits` variable in the footer, which displays the number of hits the website has had. On a page load, a `POST` request to our *API* tracks a `hit` to the website.

```javascript
/**
 * Load the number of hits.
 */
var getHits = $.getJSON("/hits", function( data ) {
  $(".js-hits").text(data);
});

/**
 * Track a hit
 */
$.post("/hit", function( data ) {
  if(!data) {
    console.log("Error unable to count number of hits.");
  }
});
```


Other client-side JavaScript features include:
- if users have disabled JavaScript, a banner displays telling them to enable it.
- code syntax highlighting using [HighlightJS](https://highlightjs.org).


### Build Process

Grunt is a *JavaScript* Task Runner that handles all developer operations. The `Gruntfile.js` lists all the tasks and their actions.

![Grunt](http://webtechnologies.herokuapp.com/images/grunt-logo.png "Grunt Logo")

After installing the node modules with `npm install` simply run the grunt tasks with one of two ways:

1. `grunt <task>`
  - (if the `grunt-cli`](https://gruntjs.com/using-the-cli) is installed `npm install -g grunt-cli`)
2. `node_modules/grunt-cli/bin/grunt <task>`

`Gruntfile.js` defines the list of grunt tasks, detailed below.

```javascript
  // Gruntfile.js

  //
  // $ grunt server
  //
  // Runs the NodeJS server task, starting a dev server on localhost:3001
  //
  grunt.registerTask('server', ['exec:server']);

  //
  // $ grunt lint
  //
  // Validates PUG and SCSS files with following subtasks
  //    puglint: validates .pug files against rules
  //    scsslint: validates .scss files against rules
  //
  grunt.registerTask('lint', ['puglint', 'scsslint']);

  //
  // $ grunt build
  //
  // Builds all files with the following sub tasks:
  //    concat: concatenates js files to a single file
  //    uglify: minifies the single js file
  //    sass: turn .scss files into a single .css file, minifying in the process
  //    imagemin: minifies the images by reducing filesize
  //    svgmin: minifies svg files to reduce filezie
  //
  grunt.registerTask('build', ['concat', 'uglify', 'sass', 'imagemin', 'svgmin']);

  //
  // $ grunt 'commit-warn'
  //
  // Check that we have commmited before running another task, like deploying.
  //
  grunt.registerTask('commit-warn', function() {
    grunt.log.warn("Make sure you have commited changes!");
    var seconds = 2;
    grunt.log.warn("Sleeping for " + seconds + " seconds, just to be sure.");
    sleep(seconds);
    grunt.log.ok("Continuing...");
  });

  //
  // $ grunt screenshot
  //
  // Take a screenshot then commit it to the repo with following sub tasks:
  //    pageres: renders the DOM and takes a screenshot
  //    exec:git_commit_screenshot: runs a git shell command to commit screenshot
  //    exec:git_push: runs a git shell command to push to repo
  //
  grunt.registerTask('screenshot', ['pageres', 'exec:git_commit_screenshot', 'exec:git_push']);

  //
  // $ grunt push
  //
  // Runs various git commands to push to repo.
  //
  grunt.registerTask('push', ['exec:git_checkout_heroku', 'exec:git_pull', 'exec:git_checkout_master', 'exec:git_push_heroku']);

  //
  // $ grunt deploy
  //
  // Deploys to a heroku server, takes a screenshot then run page insight tests.
  // Requires Heroku CLI installed, a Heroku account and `heroku login`
  //
  grunt.registerTask('deploy', ['exec:gitstatus', 'commit-warn', 'lint', 'build', 'push', 'screenshot', 'pagespeed']);

  //
  // $ grunt
  //
  // Lints, builds then starts a local server.
  // What you expect the default task to do.
  //
  grunt.registerTask('default', ['lint', 'build', 'exec:server']);
```

This process saves time and makes it easy for new developers to get started. For example, to build the site making sure all code adheres to standards and to preview it, simply clone the repo, then type the following commands.

- `npm install` to install all node dependencies (and grunt)
- `node_modules/grunt-cli/bin/grunt <task>`


## PNG

I manipulated Portable Network Graphics using two methods. First, with JavaScript and HTML5 canvas to provide a PNG animation. Second, using Gimp demonstrating different methods for image manipulation.

### Animation

Using HTML5 Canvas, shapes are programatically displayed and a simple animation shows raindrops over a city. See a [demo online](https://webtechnologies.herokuapp.com/front-end#png) with a source code snippet.

![PNG animation](http://webtechnologies.herokuapp.com/images/png-animation.png "PNG animation")


### GIMP

- Working with bitmap graphics in Gimp or Krita
- Show how to convert images to PNG, cropping away unwanted edges, changing resolution
- Use basic tools such as using filters or changing colours or combining existing images or creating simple shapes or filling
- Gained experience with some more sophisticated tools such as handling layers and transparency, or airbrushing or creating original artwork


## SVG

- Icons are drawn using SVG rather than loading a font pack, such as FontAwesome icons from https://icomoon.io/app/#/select/image
- Look at inkscape, different technologies!!!
- Generate circles in SVG http://www.lugolabs.com/circles

Animate a person icon using svg.

```css

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
- gzip compression
- Uses [Mocha](https://github.com/mochajs/mocha) for unit tests
- QUnit for tests, JSlint for linting also client
-  Rendering the report from markdown to pdf
- pug html templating
- database interaction (different module)
- Heroku deployment!

## Database

Why not Mongo DB
http://www.sarahmei.com/blog/2013/11/11/why-you-should-never-use-mongodb/

http://cryto.net/~joepie91/blog/2015/07/19/why-you-should-never-ever-ever-use-mongodb/

- Embedded database using SQLite


## Dynamic Pages

### *HTML* Templates

The website is written in a *HTML* templating language called *[Pug](https://pugjs.org)*. *'Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.'* [\[2\]](https://github.com/pugjs/pug). *Pug* makes writing *HTML* code easier by using templates to split the document into tidy sections. For example below is a *Pug* snippet for the `/report` page - notice how we `extend layout.pug` which is the base *HTML* for this page.

```jade
// report.pug

extends layout.pug

block content
  h1= title
  p This was built as ... a full write up is found&#32;
    a( href='/report' ) here.
```

The base *HTML* template, `layout.pug` creates a `block` where  `report.pug` can place information specific to `/report`.

```jade
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

*Pug* uses XXXX to extend *Pug*. I am using https://highlightjs.org ..

### Page Views

Talk about dynamic page views


### Markdown Report to PDF




## Tests


Talk about mocha JavaScript tests

### Performance & General

Take from readme.

- Compression is used https://www.npmjs.com/package/compression
- Minification is used
- All images are crushed to reduce filesize

### General Testing
- Performance, tests CL production code hosted on heroku
- Use PhantomJs to automate things you do in the website



## Security

The website considers several security issues looking at the server (ExpressJS) [best practices](http://expressjs.com/en/advanced/best-practice-security.html), using the following:

- [Helmet](https://www.npmjs.com/package/helmet) to help protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately.
- [Transport Layer Security](TLS)(https://en.wikipedia.org/wiki/Transport_Layer_Security) SSL configuration based on [Mozilla SSL config](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
- External links use `rel='noopener'` based on [Google's Lighthouse Audit](https://developers.google.com/web/tools/lighthouse/audits/noopener).
- Site runs on HTTPS to prevent attackers from exploting communications between this website and the users' browser, as reccommended by Googles [Web Fundementals security section](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

Finally, these online services rates the secuirity of the web playgorundplayground.

- 80/100 [SSL Security Check](https://www.ssllabs.com/ssltest/analyze.html?d=webtechnologies.herokuapp.com)
- 60/100 [CryptCheck](https://tls.imirhil.fr/https/webtechnologies.herokuapp.com)
- 40/100 [Security Headers](https://securityheaders.io/?q=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F&followRedirects=on)


## Bibliography

- [\[1\]](http://sass-lang.com) SASS Language
- [\[2\]](https://github.com/pugjs/pug) PUGJS Language

