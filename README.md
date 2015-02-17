# Polymer Boilerplate

Polymer Boilerplate is template using Web Components and modern tools.

Fork this repo if you want to start your own application using Polymer.

Inspired by
[Web Starter Kit](https://github.com/google/web-starter-kit),
[HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate),
[Polymer generator](https://github.com/yeoman/generator-polymer) and
[Gulp generator](https://github.com/yeoman/generator-gulp-webapp).

## Features

- Using [Polymer Theme](https://github.com/StartPolymer/polymer-theme)
- [Custom Icons](https://github.com/StartPolymer/polymer-boilerplate/blob/master/app/elements/custom-icons/custom-icons.html) element
- [Sass](http://sass-lang.com) CSS preprocessor with [Ruby](https://www.ruby-lang.org)
- [Jade](http://jade-lang.com) HTML template engine
- [Markdown](https://help.github.com/articles/github-flavored-markdown/) support with [marked](https://github.com/chjj/marked)
- [Autoprefixer](https://github.com/postcss/autoprefixer) for CSS
- [Asset revisioning](https://github.com/smysnk/gulp-rev-all)
for CSS, HTML and JS by appending content hash to their filenames
- [Compress text files with Pako](https://github.com/jameswyse/gulp-pako)
for avoiding the overhead of on-the-fly compression on server
- [PageSpeed Insights](https://developers.google.com/speed/docs/insights/about) for performance tuning
- Built-in preview server with [BrowserSync](http://www.browsersync.io)
- Automagically wire-up dependencies installed with [Bower](http://bower.io)
- [web-component-tester](https://github.com/Polymer/web-component-tester) support
- Quick deploy to [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) Hosting
 - [GitHub Pages](https://pages.github.com) - [more info](https://github.com/blog/1715-faster-more-awesome-github-pages)

## Installation

### Tools on Ubuntu

```sh
# Add Ruby repository
sudo add-apt-repository -y ppa:brightbox/ruby-ng
# Script to install NodeSource repository
curl -sL https://deb.nodesource.com/setup | sudo bash -
# Install Git, Node.js and Ruby
sudo apt-get install -y git nodejs ruby2.2
# Install Bower, Gulp and NPM
sudo npm install -g bower gulp npm
# Install Sass
sudo gem install sass
```

For installation great [Atom](https://atom.io) editor with
[ungit](https://atom.io/packages/atom-ungit) is
[Atom on Ubuntu](https://gist.github.com/6d7386cb7011cc8f5d37) script.

For other OS, you can use [Ubuntu VM Image](http://www.osboxes.org/ubuntu/) :wink:

## Usage

### Clone fork of this repository

```sh
git clone <Fork of this repository>
```

### Install dependencies

```sh
bower install && npm install
```

### Check variables

- Gulp variables are in the file [gulp/config.js](https://github.com/StartPolymer/polymer-boilerplate/blob/master/gulp/config.js)
- Jade variables are in the file [app/includes/variables.jade](https://github.com/StartPolymer/polymer-boilerplate/blob/master/app/includes/variables.jade)
- Sass variables are in the file [app/styles/_variables.scss](https://github.com/StartPolymer/polymer-boilerplate/blob/master/app/styles/_variables.scss)

### Serve to local and external URL

`http://localhost:9000` and `http://<Your IP>:9000`

```sh
gulp serve
```

Build and serve the output from the dist build

```sh
gulp serve:dist
```

### Build

```sh
gulp
```

## Deploy

### Deploy to GitHub Pages

First you need to be sure you have a gh-pages branch. If you don't have one, you can do the following:

```sh
git checkout --orphan gh-pages
git rm -rf .
touch README.md
git add README.md
git commit -m "Init gh-pages"
git push --set-upstream origin gh-pages
git checkout master
```

```sh
gulp deploy:gh
```

## Tools

### PageSpeed Insights

```sh
gulp pagespeed
```

## Extending

Use a [recipes](https://github.com/yeoman/generator-gulp-webapp/blob/master/docs/recipes/README.md)
for integrating other popular technologies like CoffeeScript. Or this a
[recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes).

### [web-component-tester](https://github.com/Polymer/web-component-tester)

```sh
bower install web-component-tester --save-dev
npm install web-component-tester --save-dev
```

## [MIT License](https://github.com/StartPolymer/polymer-boilerplate/blob/master/LICENSE)

Copyright (c) 2015 Start Polymer ([https://startpolymer.org](https://startpolymer.org))
