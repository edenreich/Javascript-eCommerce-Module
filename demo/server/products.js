#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const rootDir = process.cwd() + '/demo';
const publicDir = rootDir + '/public';
const pages = ['/products'];

// Create simple server for demo.
http.createServer(function(request, response) {

  let parsedUrl = url.parse(request.url, true);
  let extname = path.extname(parsedUrl.pathname);
  let contentType = 'text/html;charset="utf-8"';

  // Serves different assets.
  switch (extname) {
    case '.js': contentType = 'text/javascript'; break;
    case '.css': contentType = 'text/css'; break;
    case '.json': contentType = 'application/json'; break;
    case '.png': contentType = 'image/png'; break;      
    case '.jpg': contentType = 'image/jpg'; break;
  }

	if (request.method != 'GET') {
		response.writeHead(404, {"Content-Type": "text/html"});
		response.end();
	}
  	
	response.writeHead(200, { "Content-Type": contentType });

  if (pages.indexOf(parsedUrl.pathname) != -1) {
    var productController = new ProductController;
    productController.index(parsedUrl, response);
    return;
  }

  var indexController = new IndexController;
  indexController.index(parsedUrl, response);

}).listen(3000);

// Create two simple controllers.
class IndexController
{
  /**
   * Serves the homepage.
   *
   * @param {Request}
   * @param {Response}
   * @return {Response}
   */
  index(request, response)
  {
    fs.readFile(publicDir + request.pathname, function(err, data) {
      if (err) {
        response.statusCode = 404;
        response.end('Page could not be found! <br><br>' + err);
      }

      response.end(data);
    });
  }
}

class ProductController
{
   /**
   * Serves a single page.
   *
   * @param {Request}
   * @param {Response}
   * @return {Response}
   */
  index(request, response) 
  {
    let file;

    if (request.query['page']) {
      var page = parseInt(request.query['page']);

      switch (page) {
        case 1: file = 'products_page_one.json'; break;
        case 2: file = 'products_page_two.json'; break;
        case 3: file = 'products_page_three.json'; break;
        default: file = 'products_all.json'; break;
      }
    } else {
      file = 'products_all.json';
    }

    fs.readFile(rootDir + '/data/' + file, function(err, data) {
      if (err) {
        response.statusCode = 500;
        response.end('Error: ' + err);
      }

      response.end(data);
    });
  }
}