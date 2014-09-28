/*jslint node: true */
'use strict';
var express = require('express'),
    app = express(),
    path = require('path');

app.use(express.favicon());
app.use(express.logger('dev'));
// 可以解析ajax、form 提交的请求
app.use(express.bodyParser());
// 可以接受put delete 提交的请求
app.use(express.methodOverride());
// 开启session
app.use(express.cookieParser('my secret here'));
app.use(express.session());
// 开启路由功能
app.use(app.router);
// 捕捉错误
app.use(express.errorHandler());

app.use(express.static(path.join(__dirname, '../app')));
app.use(express.static(path.join(__dirname, '../.tmp')));

// 注册路由
require("./controller/router")(app);


app.use(function (req, res) {
    res.send('404');
});

module.exports = app;