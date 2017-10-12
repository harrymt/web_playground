# Web Playground

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](http://gruntjs.com/)

A web playground, demonstrating variety of website development techniques using best practices and standards.

Built for the University of Bristol unit [Web Technologies](https://www.cs.bris.ac.uk/Teaching/Resources/COMSM0104/cw/assign5/).

## Setup


Install [dependencies](#dependencies) and read about [grunt](#grunt) first!

- `npm install`
- `sudo npm install -g grunt-cli` (to install `grunt` globally)
- `grunt server` - view at [http://localhost:3001/](http://localhost:3001/)


![Screenshot](screenshot.png "Screenshot")


#### Dependencies

- Clone project with [Git](https://git-scm.com/downloads). `git clone git@github.com:harrymt/web_playground.git`
- Navigate to that directory `cd web_playground`

- Install [NodeJS](https://nodejs.org/en/)
- Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/).
- (optional) Install global SCSS linting with:
	- `gem update --system && gem install scss_lint`
	- OR: `sudo apt-get install scss_lint`
- Install [sqlite3](https://www.sqlite.org/download.html) is setup and added to your PATH



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

These scores were for the hosted version of this site on heroku (currently offline).

### Score

- < 32% per load [Content served - Browser Calories](https://chrome.google.com/webstore/detail/browser-calories/pdkibgfjegigkoaleelbkdpkgceljfco)
- 99/100 [Mobile SEO](https://varvy.com/)
- 95/100 [Yellow Lab Tools](http://yellowlab.tools/result/epshsg8xmb)
- 90/100 desktop, 74/100 mobile [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F)
- 89/100 [Lets Validate](https://pro.letsvalidate.com/webtechnologies.herokuapp.com)
- 89/100 [Web Bloat score](http://www.webbloatscore.com?url=https://webtechnologies.herokuapp.com/)
- 87/100 [Coach Panel](https://chrome.google.com/webstore/detail/coach-panel/olecfjmnejnkjipoicfpneceppjeaemo)
- 86/100 [PageLocity](http://pagelocity.com/analyzer?url=https%3A%2F%2Fwebtechnologies.herokuapp.com)
- 85/100 [Progressive Web App LightHouse](https://developers.google.com/web/tools/lighthouse/)
- 80/100 [SSL Security Check](https://www.ssllabs.com/ssltest/analyze.html?d=webtechnologies.herokuapp.com)
- 74/100 [Mobile Speed](https://varvy.com/mobile/)
- 53/100 [CryptCheck](https://tls.imirhil.fr/https/webtechnologies.herokuapp.com)
- 50/100 [Mozilla Observatory](https://observatory.mozilla.org/analyze.html?host=webtechnologies.herokuapp.com)
- 40/100 [Security Headers](https://securityheaders.io/?q=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F&followRedirects=on)

### Validators
- [Nu HTML Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F)
- [GZip Enabled](https://checkgzipcompression.com/?url=https%3A%2F%2Fwebtechnologies.herokuapp.com%2F)
- [SEO Rich Preview](https://richpreview.com/?url=https://webtechnologies.herokuapp.com/)
- [Page Speed Optimization](https://varvy.com/pagespeed/)


### Possible Future Additions

- Run static analysis [tools](https://github.com/mre/awesome-static-analysis#css) on CSS, HTML and Javascript


## Technologies Used

- [Markdown to PDF](https://www.npmjs.com/package/markdown-pdf)
- [sqlite3](https://www.sqlite.org/download.html)
- [SCSS](http://sass-lang.com/)
- [PUG](https://pugjs.org)
