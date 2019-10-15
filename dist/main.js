/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/sparetime.js/dist/spare.js":
/*!*************************************************!*\
  !*** ./node_modules/sparetime.js/dist/spare.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nfunction spare() {\r\n    (function (window) {\r\n        function defineSpare() {\r\n            //console.log('Touch framework is running')\r\n            var Spare = {};\r\n            //@ts-ignore\r\n            Spare.info = function () {\r\n                console.log('Touch framework is running');\r\n            };\r\n            //@ts-ignore\r\n            Spare.addEvent = function (selector, eventName, exec) {\r\n                var element = document.querySelector(selector);\r\n                element.addEventListener(eventName, function () {\r\n                    console.log(exec());\r\n                    exec();\r\n                });\r\n            };\r\n            //@ts-ignore\r\n            Spare.create = function (tagName) {\r\n                var Element = new Ele();\r\n                return Element.create(tagName);\r\n            };\r\n            //@ts-ignore\r\n            Spare.sel = function (selector) {\r\n                var element = new Ele();\r\n                return element.sel(selector);\r\n            };\r\n            return Spare;\r\n        }\r\n        if (typeof Spare === \"undefined\") {\r\n            window.Spare = defineSpare();\r\n        }\r\n        // defineTouch()\r\n    })(window); //hello\r\n}\r\n;\r\nvar Ele = /** @class */ (function () {\r\n    function Ele() {\r\n        var _this = this;\r\n        this.attr = function (attr, value) {\r\n            _this.element.setAttribute(attr, value);\r\n            return _this.methodList();\r\n        };\r\n        this.Class = function () {\r\n            var _a;\r\n            var className = [];\r\n            for (var _i = 0; _i < arguments.length; _i++) {\r\n                className[_i] = arguments[_i];\r\n            }\r\n            (_a = _this.element.classList).add.apply(_a, className);\r\n            return _this.methodList();\r\n        };\r\n        this.html = function (html) {\r\n            _this.element.innerHTML = \"\" + html;\r\n            return _this.methodList();\r\n        };\r\n        this.append = function () {\r\n            var _a;\r\n            var children = [];\r\n            for (var _i = 0; _i < arguments.length; _i++) {\r\n                children[_i] = arguments[_i];\r\n            }\r\n            (_a = _this.element).append.apply(_a, children);\r\n            return _this.methodList();\r\n        };\r\n    }\r\n    Object.defineProperty(Ele.prototype, \"element\", {\r\n        get: function () {\r\n            return this._element;\r\n        },\r\n        set: function (value) {\r\n            this._element = value;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Ele.prototype.methodList = function () {\r\n        var methods = this._methods =\r\n            { Class: this.Class,\r\n                attr: this.attr,\r\n                html: this.html,\r\n                element: this.element,\r\n                append: this.append\r\n            };\r\n        return __assign({}, methods);\r\n    };\r\n    Ele.prototype.create = function (tagName) {\r\n        this.element = document.createElement(tagName);\r\n        return this.methodList();\r\n    };\r\n    Ele.prototype.sel = function (selector) {\r\n        this.element = document.querySelector(selector);\r\n        return this.methodList();\r\n    };\r\n    // prototype\r\n    Ele.copy = function () {\r\n        return new Ele();\r\n    };\r\n    return Ele;\r\n}());\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (spare);\n\n//# sourceURL=webpack:///./node_modules/sparetime.js/dist/spare.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var sparetime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sparetime.js */ \"./node_modules/sparetime.js/dist/spare.js\");\n\n\nObject(sparetime_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\nclass ToDo {\n    constructor(title, description, priority, dueDate, notes, complete) {\n        this._title = title;\n        this._description = description;\n        this._priority = priority;\n        this._dueDate = dueDate;\n        this._notes = notes;\n        this._complete = complete;\n    }\n\n    get title() {\n        return this._title;\n    }\n\n    set title(value) {\n        this._title = value;\n    }\n\n    get description() {\n        return this._description;\n    }\n\n    set description(value) {\n        this._description = value;\n    }\n\n    get priority() {\n        return this._priority;\n    }\n\n    set priority(value) {\n        this._priority = value;\n    }\n\n    get dueDate() {\n        return this._dueDate;\n    }\n\n    set dueDate(value) {\n        this._dueDate = value;\n    }\n\n    get notes() {\n        return this._notes;\n    }\n\n    set notes(value) {\n        this._notes = value;\n    }\n\n    get complete() {\n        return this._complete;\n    }\n\n    set complete(value) {\n        this._complete = value;\n    }\n}\n\n\n\n// const list = new ToDo(\"New list\", \"A nice and awesome list\", \"High\", new Date(), \"Remember to finish Microverse\", false);\n// console.log(list.dueDate);\n\nlet item = Spare.create('li').html(`<h4>Title<span>Priority</span></h4>\n          <div>\n            <p>Description</p>\n            <p>Due <time datetime=\"2019-10-15\">Date</time></p>\n            <article>Notes</article>\n          </div>`).attr('class', 'list-details').element;\n\nSpare.sel('#todo-list').append(item);\n\nconsole.log();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });