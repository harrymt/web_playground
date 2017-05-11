# Web Playground

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](http://gruntjs.com/)
[![NodeJS dependencies](https://david-dm.org/harrymt/web_playground.svg)](https://david-dm.org)

Harry's web playground, demonstrating variety of website development techniques using best practices and standards.

Built for the University of Bristol unit [Web Technologies](https://www.cs.bris.ac.uk/Teaching/Resources/COMSM0104/cw/assign5/).

- TODO: Check webfonts open sans based on [Yellow Lab Tools](http://yellowlab.tools/result/epnxv11dfg) report
- TODO: Add information about how I edited images in report, use gimp, show some screenshots
- TODO: Say I worked alone for this project.
- TODO: Fix svg spinners on edge
- TODO: To stop using some weird node_modules/grunt command, add grunt to npm script, so you do npm run grunt ... https://gruntjs.com/blog/2016-02-11-grunt-1.0.0-rc1-released#npm-scripts
- TODO: Run static analysis tools on CSS, HTML and Javascript https://github.com/mre/awesome-static-analysis#css
- TODO: Check website using these services: https://github.com/Brunty/checker-services
- TODO: - Check if pug can be syntaxed highlighted - In report see if we can syntax highlight stuff
- TODO: Add [HTML5 linting](https://github.com/mozilla/html5-lint) & [validation](https://www.npmjs.com/package/html-validator) - Write about it in the [HTML](#html) section, https://validator.w3.org/nu/?doc=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F validated
- TODO: Place a .zip copy of SimpleStyle in release


## Setup


Install [dependencies](#dependencies) and read about [grunt](#grunt) first!

- `npm install`
- `grunt server` - view at [http://localhost:3001/](http://localhost:3001/)


![Screenshot](screenshot.png "Screenshot")


#### Dependencies

- Clone project with [Git](https://git-scm.com/downloads). `git clone git@github.com:harrymt/web_playground.git`
- Navigate to that directory `cd web_playground`

- Install [NodeJS](https://nodejs.org/en/)
- Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/).
- Install global SCSS linting with:
	- `gem update --system && gem install scss_lint`
	- OR: `sudo apt-get install scss_lint`
- Not needed? Install [sqlite3](https://www.sqlite.org/download.html) is setup and added to your PATH



#### Grunt

The whole project uses `GruntJS` to handle everything from running to deployment.

- Run `node_modules/grunt-cli/bin/grunt` to run grunt, or
- Install grunt globally, with `sudo npm install -g grunt-cli`

Each one of the following tasks should be run using `grunt <task>`
e.g. `grunt build`.


**[Gruntfile.js](Gruntfile.js)**
```javascript

/**
 * Start Server.
 *
 * Start a Node server - view at localhost:3001.
 *
 * $ grunt server
 */
grunt.registerTask('server', ['exec:server']);

/**
 * Build.
 *
 * Minify and create CSS files
 *
 * $ grunt build
 */
grunt.registerTask('build', ['uglify', 'sass']);

/**
 * Deploy.
 *
 * Deploy to heroku server then run page insight tests
 *
 * $ grunt deploy
 */
grunt.registerTask('deploy', ['lint', 'build', 'exec:deploy', 'pagespeed']);
```

#### (Optional)

- To deploy download [Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
- Login to heroku by typing `heroku login`

## Online Testing

### Score

(Last checked 1pm 08/05/17)

- < 20% per load [Content served - Browser Calories](https://chrome.google.com/webstore/detail/browser-calories/pdkibgfjegigkoaleelbkdpkgceljfco)
- 99/100 [Mobile SEO](https://varvy.com/)
- 90/100 desktop, 74/100 mobile [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F)
- 89/100 [Lets Validate](https://pro.letsvalidate.com/webtechnologies.herokuapp.com)
- 88/100 [Coach Panel](https://chrome.google.com/webstore/detail/coach-panel/olecfjmnejnkjipoicfpneceppjeaemo)
- 86/100 [PageLocity](http://pagelocity.com/analyzer?url=https%3A%2F%2Fwebtechnologies.herokuapp.com)
- 85/100 [Progressive Web App LightHouse](https://developers.google.com/web/tools/lighthouse/)
- 83/100 [Yellow Lab Tools](http://yellowlab.tools/result/epnxv11dfg)
- 80/100 [SSL Security Check](https://www.ssllabs.com/ssltest/analyze.html?d=webtechnologies.herokuapp.com)
- 79/100 [Web Bloat score](http://www.webbloatscore.com?url=https://webtechnologies.herokuapp.com//)
- 71/100 [Mobile Speed](https://varvy.com/mobile/)
- 60/100 [CryptCheck](https://tls.imirhil.fr/https/webtechnologies.herokuapp.com)
- 50/100 [Mozilla Observatory](https://observatory.mozilla.org/analyze.html?host=webtechnologies.herokuapp.com)
- 40/100 [Security Headers](https://securityheaders.io/?q=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F&followRedirects=on)

### Validators
- [Nu HTML Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F)
- [GZip Enabled](https://checkgzipcompression.com/?url=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F)
- [SEO Rich Preview](https://richpreview.com/?url=https://webtechnologies.herokuapp.com/)
- [Page Speed Optimization](https://varvy.com/pagespeed/)



## Technologies Used

- [Markdown to PDF](https://www.npmjs.com/package/markdown-pdf)
- [sqlite3](https://www.sqlite.org/download.html)
- [SCSS](http://sass-lang.com/)
- [PUG](https://pugjs.org)
