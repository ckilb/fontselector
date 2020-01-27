window["FontSelector"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/FontSelector.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://FontSelector/./src/scss/style.scss?");

/***/ }),

/***/ "./src/ts/FontSelector.ts":
/*!********************************!*\
  !*** ./src/ts/FontSelector.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\n__webpack_require__(/*! ../scss/style.scss */ \"./src/scss/style.scss\");\nvar CSS_CLASS_PREFIX = 'font-selector-';\nvar FontSelector = /** @class */ (function () {\n    function FontSelector(selector, options) {\n        this.options = FontSelector.mergeOptionsWithDefaults(options);\n        this.nativeSelectElement = document.querySelector(selector);\n        this.fonts = this.getFonts();\n        this.wrapperElement = this.wrapSelectElement();\n        this.selectedFontElement = this.createSelectedFontElement();\n        this.fontListListItemElements = this.createFontListListItemElements();\n        this.dropdownElement = this.createDropdownElement();\n        this.selectFont(this.getSelectedOption().value);\n        this.loadFonts();\n        this.wrapperElement.appendChild(this.dropdownElement);\n    }\n    FontSelector.prototype.selectFont = function (fontFamily) {\n        var font = this.getFontByFamily(fontFamily);\n        if (!font) {\n            return;\n        }\n        var selectedOption = this.getSelectedOption();\n        var previouslySelectedFontFamilyClassName = this.getFontFamilyClassName(selectedOption.value);\n        var newSelectedFontFamilyClassName = this.getFontFamilyClassName(font.family);\n        var selectedFontNameElement = document.createElement('span');\n        selectedFontNameElement.classList.add(this.options.dropdownSelectedFontNameClassName);\n        this.selectedFontElement.classList.add(this.options.dropdownSelectedFontClassName, newSelectedFontFamilyClassName);\n        this.collapseFontList();\n        this.selectedFontElement.classList.remove(previouslySelectedFontFamilyClassName);\n        this.selectedFontElement.classList.add(newSelectedFontFamilyClassName);\n        selectedFontNameElement.textContent = font.name;\n        this.selectedFontElement.innerHTML = '';\n        this.selectedFontElement.append(selectedFontNameElement);\n        this.nativeSelectElement.value = font.family;\n        this.selectedFont = font;\n        this.options.onSelected(font);\n    };\n    FontSelector.prototype.getSelectedFont = function () {\n        if (!this.selectedFont) {\n            return null;\n        }\n        return this.selectedFont;\n    };\n    FontSelector.mergeOptionsWithDefaults = function (options) {\n        options = Object.assign(FontSelector.getDefaultOptions(), options);\n        return options;\n    };\n    FontSelector.getDefaultOptions = function () {\n        return {\n            'wrapperClassName': CSS_CLASS_PREFIX + 'wrapper',\n            'dropdownClassName': CSS_CLASS_PREFIX + 'dropdown',\n            'dropdownSelectedFontClassName': CSS_CLASS_PREFIX + 'selected-font',\n            'dropdownSelectedFontNameClassName': CSS_CLASS_PREFIX + 'selected-font-name',\n            'dropdownFontListClassName': CSS_CLASS_PREFIX + 'font-list',\n            'isExpandedClassName': CSS_CLASS_PREFIX + 'is-expanded',\n            'onExpanded': function () { },\n            'onSelected': function () { },\n            'onCollapsed': function () { }\n        };\n    };\n    FontSelector.prototype.createDropdownElement = function () {\n        var dropdownElement = document.createElement('div');\n        var fontListElement = document.createElement('ul');\n        this.fontListListItemElements.forEach(function (listItemElement) {\n            fontListElement.appendChild(listItemElement);\n        });\n        dropdownElement.classList.add(this.options.dropdownClassName);\n        fontListElement.classList.add(this.options.dropdownFontListClassName);\n        dropdownElement.appendChild(this.selectedFontElement);\n        dropdownElement.appendChild(fontListElement);\n        return dropdownElement;\n    };\n    FontSelector.prototype.createSelectedFontElement = function () {\n        var _this = this;\n        var selectedFontElement = document.createElement('a');\n        var selectedFontNameElement = document.createElement('span');\n        selectedFontNameElement.classList.add(this.options.dropdownSelectedFontNameClassName);\n        selectedFontElement.append(selectedFontNameElement);\n        selectedFontElement.classList.add(this.options.dropdownSelectedFontClassName);\n        selectedFontElement.addEventListener('click', function () {\n            if (_this.isExpanded()) {\n                _this.collapseFontList();\n                return;\n            }\n            _this.expandFontList();\n        });\n        document.body.addEventListener('click', function (event) {\n            if (!event.target || event.target !== selectedFontElement) {\n                _this.collapseFontList();\n            }\n        });\n        return selectedFontElement;\n    };\n    FontSelector.prototype.isExpanded = function () {\n        return this.dropdownElement.classList.contains(this.options.isExpandedClassName);\n    };\n    FontSelector.prototype.expandFontList = function () {\n        this.dropdownElement.classList.add(this.options.isExpandedClassName);\n        this.options.onExpanded();\n    };\n    FontSelector.prototype.collapseFontList = function () {\n        this.dropdownElement.classList.remove(this.options.isExpandedClassName);\n        this.options.onCollapsed();\n    };\n    FontSelector.prototype.createFontListListItemElements = function () {\n        var _this = this;\n        var listItemElements = [];\n        this.fonts.forEach(function (font) {\n            var listItem = document.createElement('li');\n            var fontFamilyClassName = _this.getFontFamilyClassName(font.family);\n            listItem.classList.add(fontFamilyClassName);\n            listItem.textContent = font.name;\n            listItem.setAttribute('data-font', font.family);\n            listItem.addEventListener('click', function () {\n                _this.selectFont(listItem.getAttribute('data-font'));\n            });\n            listItemElements.push(listItem);\n        });\n        return listItemElements;\n    };\n    FontSelector.prototype.wrapSelectElement = function () {\n        var parentNode = this.nativeSelectElement.parentNode;\n        var wrapper = document.createElement('div');\n        wrapper.classList.add(this.options.wrapperClassName);\n        parentNode.insertBefore(wrapper, this.nativeSelectElement);\n        wrapper.appendChild(this.nativeSelectElement);\n        return wrapper;\n    };\n    FontSelector.prototype.getSelectedOption = function () {\n        return this.nativeSelectElement.options[this.nativeSelectElement.options.selectedIndex];\n    };\n    FontSelector.prototype.loadFonts = function () {\n        var _this = this;\n        this.fonts.forEach(function (font) {\n            _this.loadFont(font);\n        });\n    };\n    FontSelector.prototype.loadFont = function (font) {\n        var styleTag = document.createElement('style');\n        styleTag.setAttribute('type', 'text/css');\n        styleTag.innerHTML = \"\\n@font-face { font-family: '\" + font.family + \"'; src: url('\" + font.url + \"'); }\\n\";\n        styleTag.innerHTML += '.' + this.getFontFamilyClassName(font.family) + '{ font-family: \"' + font.family + '\"}';\n        document.head.append(styleTag);\n    };\n    FontSelector.prototype.getFontFamilyClassName = function (fontFamily) {\n        return 'font-' + fontFamily\n            .replace(/[^a-z0-9\\-]/gi, '-')\n            .toLowerCase();\n    };\n    FontSelector.prototype.getFontByFamily = function (fontFamily) {\n        for (var index = 0; index < this.fonts.length; index++) {\n            var font = this.fonts[index];\n            if (font.family === fontFamily) {\n                return font;\n            }\n        }\n        return null;\n    };\n    FontSelector.prototype.getFonts = function () {\n        var fonts = [];\n        for (var index = 0; index < this.nativeSelectElement.options.length; index++) {\n            var optionElement = this.nativeSelectElement.options[index];\n            var font = {\n                name: optionElement.textContent.trim(),\n                family: optionElement.value,\n                url: optionElement.getAttribute('data-font-url')\n            };\n            fonts.push(font);\n        }\n        return fonts;\n    };\n    return FontSelector;\n}());\nexports[\"default\"] = FontSelector;\n\n\n//# sourceURL=webpack://FontSelector/./src/ts/FontSelector.ts?");

/***/ })

/******/ })["default"];