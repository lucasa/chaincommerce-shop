# SHOP

## Prerequisites

### Polymer CLI

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

    npm install -g polymer-cli

### Setup

    cd shop
    bower install

## Start the development server

    polymer serve

## Run web-component-tester tests

    polymer test

## Build

Build presets provide an easy way to define common build configurations in your `polymer.json` file. There are 3 build presets we put in `polymer.json` file in Shop:

**es5-bundled**

- js: {minify: true, compile: true}
- css: {minify: true}
- html: {minify: true}
- bundle: true
- addServiceWorker: true
- addPushManifest: true
- insertPrefetchLinks: true

**es6-unbundled**

- js: {minify: true, compile: false}
- css: {minify: true}
- html: {minify: true}
- bundle: false
- addServiceWorker: true
- addPushManifest: true
- insertPrefetchLinks: true

**es6-bundled**

- js: {minify: true, compile: false}
- css: {minify: true}
- html: {minify: true}
- bundle: true
- addServiceWorker: true
- addPushManifest: true
- insertPrefetchLinks: true

Run the command to build the presets:

    polymer build

## Test the build

Use `polymer serve` to serve a specific build preset of the app. For example:

    polymer serve build/es5-bundled

## Deploying

Our [production deployment of SHOP](https://shop.polymer-project.org/) is hosted on App Engine with Node.js. You can examine its configuration on the [app-engine-node branch](https://github.com/Polymer/shop/tree/app-engine-node) of this repository and [compare it with the master branch](https://github.com/Polymer/shop/pull/145).
