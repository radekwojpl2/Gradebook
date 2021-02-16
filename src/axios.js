"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var instance = axios_1["default"].create({
    baseURL: 'https://gradebook-395ff-default-rtdb.firebaseio.com/'
});
exports["default"] = instance;