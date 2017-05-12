# Web Playground Overview
*Written by Harry Mumford-Turner for the University of Bristol [Web Technologies unit](http://www.bristol.ac.uk/unit-programme-catalogue/UnitDetails.jsa?unitCode=COMS32500).*


## Introduction
The website serves as a place to set the best practices for the web, lets me demonstrates my ability in this area and this report provides an overview of the [website](http://www.github.com/harrymt/web_playground) functionality.

Note: for marking purposes, I worked alone and each section is of grade A quality.

![Screenshot](http://webtechnologies.herokuapp.com/images/screenshot.png "Website Homepage Screenshot")

<div style="page-break-after: always;"></div>

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
    - Performance
    - Security

<div style="page-break-after: always;"></div>

## HTML

The server serves *HTML5* ([Polyglot *HTML*](https://www.w3.org/TR/2011/WD-html-polyglot-20110405/#dfn-polyglot-markup)) content when it can with this content negotiation handled server-side. The *HTML* is [*HTML5* compliant](https://www.w3.org/TR/html5/) and is tested using the W3C [HTML5 validator](https://validator.w3.org/nu).

The *HTML*, *CSS* and *JavaScript* all follow a [coding guide](http://codeguide.co/) to aid readability and maintainability. For example, the *JavaScript* is located at the bottom of the *HTML*, before the `</body>` tag, to not block the rest of Document Object Model (DOM) rendering of the page. Finally the project is mainly written in an *HTML* templating language called *Pug*, but more on that later. Lets move onto the style of the website.

<div style="page-break-after: always;"></div>

## CSS

### Framework

The website style is based on a *CSS* framework that I built called [*SimpleStyle*](https://github.com/harrymt/simplestyle).

![SimpleStyle Screenshot](http://webtechnologies.herokuapp.com/images/simplestyle-screenshot.png "SimpleStyle Screenshot")

*SimpleStyle* is separated into another [repository](https://github.com/harrymt/simplestyle/tree/master/scss), but for the website release, it is included in the repo as a `.zip` file.

<div style="page-break-after: always;"></div>

### SASS

The framework uses [*SASS*](http://sass-lang.com) - *'SASS or SCSS is an extension of CSS, adding nested rules, variables, mixins, selector inheritance, and more.'* [\[1\]](http://sass-lang.com). *SASS* files are processed using *Ruby*, and in this project *SASS* files are compiled using a *JavaScript* task runner called *Grunt* (more on this later).

![SASS](http://webtechnologies.herokuapp.com/images/sass-logo.png "SASS Logo")


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

<div style="page-break-after: always;"></div>

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
  - (if the [`grunt-cli`](https://gruntjs.com/using-the-cli) is installed `npm install -g grunt-cli`)
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

- `npm install` to install all node dependencies
- `node_modules/grunt-cli/bin/grunt <task>`


## PNG

I manipulated Portable Network Graphics using two methods. First, using Gimp demonstrating different methods for image manipulation. Second, with JavaScript and HTML5 canvas to provide a PNG animation.


### GIMP

I experimented with the GNU Image Manipulation Program (GIMP) to create a header image for the web playground. I wanted to aim for an abstract art piece demonstrating different pieces of code coming together creating a whole.

I started by using the *gradient tool* to create gradient between two colours. This served as the background for the code blocks.

![Gimp gradient](http://webtechnologies.herokuapp.com/images/gimp-gradient.png "Gimp gradient")

Next I created squares to act as the code blocks using the rectangle tool. I added these on separate layers, to nicely separate each section of the image.

![Gimp layers](http://webtechnologies.herokuapp.com/images/gimp-layers.png "Gimp layers")

Using layers enabled me to quickly tweak different parts of the image.

![Gimp smudge tool](http://webtechnologies.herokuapp.com/images/gimp-smudge-tool.png "Gimp smudge tool")

Then I used the smudge tool to blend the blocks with the gradient image.

![Gimp different shapes](http://webtechnologies.herokuapp.com/images/gimp-diff-shapes.png "Gimp different shapes")

To finish I added a cartoon filter to the blocks, creating an abstract art effect.

![Gimp cartoon filter](http://webtechnologies.herokuapp.com/images/gimp-cartoon-filter.png "Gimp cartoon filter")

This worked well with the different smudged shapes and created a decent image to use as the banner.

![Gimp final product](http://webtechnologies.herokuapp.com/images/background.png "Gimp final product")


### Animation

Using HTML5 Canvas, shapes are programatically displayed and a simple animation shows raindrops over a city. See a [demo online](https://webtechnologies.herokuapp.com/front-end#png) with a source code snippet.

![PNG animation](http://webtechnologies.herokuapp.com/images/png-animation.png "PNG animation")


## SVG

Similarly to the PNG section, I tried two different methods for manipulating Scalable Vector Graphics. First, I experimented with drawing SVG animation using Inkscape, second I drew some SVG icons and animated these using CSS and SVG xml animations.


### Inkscape

I worked with the Open Source tool *Inkscape*, exploring different techniques. The next images are screen shots of my experimentation with vector design.


Drawing freehand regular paths with the Pencil tool was easy enough.

![Inkscape Pencil Tool](http://webtechnologies.herokuapp.com/images/inkscape-pencil-tool.png)

To get more regular shapes I used the Pen tool or Bezier tool.

![Inkscape Pen Tool](http://webtechnologies.herokuapp.com/images/inkscape-pen-tool.png)

I experimented with combing different paths to make new shapes, using the shortcuts `ctrl+k` and `ctrl+Shift+k`, to combine and break shapes.

![Inkscape Combing Paths](http://webtechnologies.herokuapp.com/images/inkscape-combining-paths.png)

Inkscape has a powerful feature called Simplify. If we add some colour to our previous text 'Web', and use Simplify (`ctrl+l`) we can generate creative effects to the text.

![Inkscape Simplify](http://webtechnologies.herokuapp.com/images/inkscape-simplify.png)


### Animation

I drew some basic shapes using Inkscape and copied their `.svg` file and added some basic animation to them.

For example, this is the [first spinner](https://webtechnologies.herokuapp.com/front-end#svg) code as demonstrated on the website.

![SVG animation](http://webtechnologies.herokuapp.com/images/svg-animation.png "SVG animation")

```xml
<!-- First SVG animation -->
<?xml version="1.0" encoding="utf-8"?>
<svg x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40"">

  <!-- Created in Inkscape -->
  <!-- Circle -->
  <path opacity="0.5" fill="#607d8b" d="M20.201,5.169c-8.254, ... ,31.749z"/>

  <!-- Rotating cube -->
  <path fill="#607d8b" d="M26.013,10.047l1.654-2. ... ,10.047z">

  <!-- Animated -->
    <!-- Rotate cube -->
    <animateTransform attributeType="xml" attributeName="transform"
      type="rotate"
      values="0 20 20; 360 20 20; 0 20 20"
      dur="3s"
      repeatCount="indefinite"
    />
  </path>
</svg>
```

CSS animation wasn't added to the website however, I experimented with different ways to animate icons, for example this is how to draw and animate a person icon.

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

## Server

The server is written in JavaScript and uses *NodeJS* with *ExpressJS* as the web server. Some [boilerplates](http://www.nodebootstrap.io) (a project template) were considered, along with different *JavaScript* frameworks, such as [AngularJS](https://angularjs.org/). But, these boilerplates were very bloated and I wanted to understand exactly how content was served. Therefore, this project does not use any *JavaScript* frameworks and instead the base code uses the nodejs server (*ExpressJS*) [application generator](https://expressjs.com/en/starter/generator.html) - a recommended tool for starting a new server.

The server uses content negotiation for old browsers, sending redirections to browsers, handling UTF-8 and uses HTTPS. GZIP compression is also used to reduce the time it takes to serve content.

The server is deployed to cloud hosting, provided by [Heroku](http://heroku.com) when the `grunt push` command is issued.

All server-side JavaScript is linted using JSLint.

The report is written in a Markdown file for easy editing, and a PUG Filter renders the markdown file in the `/report` section. A button was added to render the report to a PDF on demand, using a node module `markdown-to-pdf`.


## Database

A database is used to count the number of views on this website.

Database manipulation is done server-side and client-side in JavaScript via an API accessing a separate JavaScript module `database.js`.

An SQLite embedded database is used over a Key-Value-Store such as MongoDB, because KVS are only useful when you want to store arbitrary pieces of JSON.

The database is simple, however the JavaScript module isn't and performs the correct error checking.

The number of views a website has is accessed by JavaScript on a page load and passed to the footer using jQuery.

On a new page load, the number is accessed server-side, incremented and inserted back into the database.


## Dynamic Pages

The website is written in a *HTML* templating language called *[Pug](https://pugjs.org)*. *'Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.'* [\[2\]](https://github.com/pugjs/pug). *Pug* makes writing *HTML* code easier by using templates to split the document into tidy sections. For example below is a *Pug* snippet for the `/report` page - notice how we `extend layout.pug` which is the base *HTML* for this page.

```jade
// report.pug

extends layout.pug

block content
  h1= title
  p This was built as ... a full write up is found
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

Dynamically compiling each page enables less code reuse. Each `.pug` file is validated during the build process with a pug validator *Ruby* gem.

*Pug* uses a filter to extend *Pug* syntax by adding code highlighting provided by https://highlightjs.org.


## Performance

The website performance is improved by using: a [compression node module](https://www.npmjs.com/package/compression), code and image minification, and finally by thoroughly evaluating performance by using the following services.

- < 32% per load [Content served - Browser Calories](https://chrome.google.com/webstore/detail/browser-calories/pdkibgfjegigkoaleelbkdpkgceljfco)
- 99/100 [Mobile SEO](https://varvy.com/)
- 95/100 [Yellow Lab Tools](http://yellowlab.tools/result/epshsg8xmb)
- 90/100 desktop, 74/100 mobile [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F)
- 89/100 [Lets Validate](https://pro.letsvalidate.com/webtechnologies.herokuapp.com)
- 89/100 [Web Bloat score](http://www.webbloatscore.com?url=https://webtechnologies.herokuapp.com/)
- 87/100 [Coach Panel](https://chrome.google.com/webstore/detail/coach-panel/olecfjmnejnkjipoicfpneceppjeaemo)
- 86/100 [PageLocity](http://pagelocity.com/analyzer?url=https%3A%2F%2Fwebtechnologies.herokuapp.com)
- 85/100 [Progressive Web App LightHouse](https://developers.google.com/web/tools/lighthouse/)
- 74/100 [Mobile Speed](https://varvy.com/mobile/)
- 50/100 [Mozilla Observatory](https://observatory.mozilla.org/analyze.html?host=webtechnologies.herokuapp.com)


### Validators
- [Nu HTML Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F)
- [GZip Enabled](https://checkgzipcompression.com/?url=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F)
- [SEO Rich Preview](https://richpreview.com/?url=https://webtechnologies.herokuapp.com/)
- [Page Speed Optimization](https://varvy.com/pagespeed/)


## Security

The website considers several security issues looking at the server (ExpressJS) [best practices](http://expressjs.com/en/advanced/best-practice-security.html) and using the following tools:

- [Helmet](https://www.npmjs.com/package/helmet) to help protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately.
- [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) SSL configuration based on [Mozilla SSL config](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
- External links use `rel='noopener'` based on [Google's Lighthouse Audit](https://developers.google.com/web/tools/lighthouse/audits/noopener).
- Site runs on HTTPS to prevent attackers from exploting communications between this website and the users' browser, as recommended by Googles [Web Fundementals security section](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

Finally, these online services rate the security level of the web playground.

- 80/100 [SSL Security Check](https://www.ssllabs.com/ssltest/analyze.html?d=webtechnologies.herokuapp.com)
- 60/100 [CryptCheck](https://tls.imirhil.fr/https/webtechnologies.herokuapp.com)
- 40/100 [Security Headers](https://securityheaders.io/?q=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F&followRedirects=on)


## Bibliography

- [\[1\]](http://sass-lang.com) SASS Language
- [\[2\]](https://github.com/pugjs/pug) PUGJS Language

