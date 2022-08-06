/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/fields/repeater.js":
/*!***********************************!*\
  !*** ./src/js/fields/repeater.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FormieRepeater\": () => (/* binding */ FormieRepeater)\n/* harmony export */ });\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ \"./src/js/utils/utils.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\nvar FormieRepeater = /*#__PURE__*/function () {\n  function FormieRepeater() {\n    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    _classCallCheck(this, FormieRepeater);\n\n    this.$form = settings.$form;\n    this.form = this.$form.form;\n    this.$field = settings.$field;\n    this.disabledClass = 'fui-disabled';\n    this.rowCounter = 0;\n    this.initRepeater();\n  }\n\n  _createClass(FormieRepeater, [{\n    key: \"initRepeater\",\n    value: function initRepeater() {\n      var _this = this;\n\n      var $rows = this.getRows(); // Assign this instance to the field's DOM, so it can be accessed by third parties\n\n      this.$field.repeater = this; // Save a bunch of properties\n\n      this.$addButton = this.$field.querySelector('[data-add-repeater-row]');\n      this.minRows = parseInt(this.$addButton.getAttribute('data-min-rows'));\n      this.maxRows = parseInt(this.$addButton.getAttribute('data-max-rows')); // Bind the click event to the add button\n\n      if (this.$addButton) {\n        // Add the click event, but use a namespace so we can track these dynamically-added items\n        this.form.addEventListener(this.$addButton, (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.eventKey)('click'), function (e) {\n          _this.addRow(e);\n        });\n      } // Initialise any rendered rows\n\n\n      if ($rows && $rows.length) {\n        $rows.forEach(function ($row) {\n          _this.initRow($row);\n        });\n      } // Emit an \"init\" event\n\n\n      this.$field.dispatchEvent(new CustomEvent('init', {\n        bubbles: true,\n        detail: {\n          repeater: this\n        }\n      }));\n    }\n  }, {\n    key: \"initRow\",\n    value: function initRow($row) {\n      var _this2 = this;\n\n      var isNew = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n\n      if (!$row) {\n        console.error($row);\n        return;\n      }\n\n      var $removeButton = $row.querySelector('[data-remove-repeater-row]');\n\n      if ($removeButton) {\n        // Add the click event, but use a namespace so we can track these dynamically-added items\n        this.form.addEventListener($removeButton, (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.eventKey)('click'), function (e) {\n          _this2.removeRow(e);\n        });\n      } // Initialize any new nested fields with JS\n\n\n      if (isNew) {\n        var fieldConfigs = Formie.parseFieldConfig($row, this.$form);\n        Object.keys(fieldConfigs).forEach(function (module) {\n          fieldConfigs[module].forEach(function (fieldConfig) {\n            _this2.initFieldClass(module, fieldConfig);\n          });\n        });\n      } // Increment the number of rows \"in store\"\n\n\n      this.rowCounter++;\n    }\n  }, {\n    key: \"initFieldClass\",\n    value: function initFieldClass(className, params) {\n      var moduleClass = window[className];\n\n      if (moduleClass) {\n        new moduleClass(params);\n      }\n    }\n  }, {\n    key: \"addRow\",\n    value: function addRow(e) {\n      var _this3 = this;\n\n      var button = e.target;\n      var handle = this.$addButton.getAttribute('data-add-repeater-row');\n      var template = document.querySelector(\"[data-repeater-template=\\\"\".concat(handle, \"\\\"]\"));\n      var numRows = this.getNumRows();\n\n      if (template) {\n        if (numRows >= this.maxRows) {\n          return;\n        } // We don't want this real-time. We want to maintain a counter to ensure\n        // there's no collisions of new rows overwriting or jumbling up old rows\n        // when removing them (adding 2, remove 1st, add new - results in issues).\n\n\n        var id = \"new\".concat(this.rowCounter + 1);\n        var html = template.innerHTML.replace(/__ROW__/g, id);\n        var $newRow = document.createElement('div');\n        $newRow.innerHTML = html.trim();\n        $newRow = $newRow.querySelector('div:first-of-type');\n        this.$field.querySelector('[data-repeater-rows]').appendChild($newRow);\n        setTimeout(function () {\n          _this3.updateButton();\n\n          var event = new CustomEvent('append', {\n            bubbles: true,\n            detail: {\n              repeater: _this3,\n              row: $newRow,\n              form: _this3.$form\n            }\n          });\n\n          _this3.$field.dispatchEvent(event);\n\n          _this3.initRow(event.detail.row, true);\n        }, 50);\n      }\n    }\n  }, {\n    key: \"removeRow\",\n    value: function removeRow(e) {\n      var button = e.target;\n      var $row = button.closest('[data-repeater-row]');\n\n      if ($row) {\n        var numRows = this.getNumRows();\n\n        if (numRows <= this.minRows) {\n          return;\n        }\n\n        $row.parentNode.removeChild($row);\n        this.updateButton();\n      }\n    }\n  }, {\n    key: \"getRows\",\n    value: function getRows() {\n      return this.$field.querySelectorAll('[data-repeater-row]');\n    }\n  }, {\n    key: \"getNumRows\",\n    value: function getNumRows() {\n      return this.getRows().length;\n    }\n  }, {\n    key: \"updateButton\",\n    value: function updateButton() {\n      if (this.getNumRows() >= this.maxRows) {\n        this.$addButton.classList.add = this.disabledClass;\n        this.$addButton.setAttribute('disabled', 'disabled');\n      } else {\n        this.$addButton.classList.remove = this.disabledClass;\n        this.$addButton.removeAttribute('disabled');\n      }\n    }\n  }]);\n\n  return FormieRepeater;\n}();\nwindow.FormieRepeater = FormieRepeater;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWhKTDtJQUFBO0lBQUEsT0FrSkksc0JBQWE7TUFDVCxPQUFPLEtBQUsxRCxPQUFMLEdBQWVXLE1BQXRCO0lBQ0g7RUFwSkw7SUFBQTtJQUFBLE9Bc0pJLHdCQUFlO01BQ1gsSUFBSSxLQUFLK0IsVUFBTCxNQUFxQixLQUFLbkMsT0FBOUIsRUFBdUM7UUFDbkMsS0FBS0wsVUFBTCxDQUFnQnlELFNBQWhCLENBQTBCQyxHQUExQixHQUFnQyxLQUFLaEUsYUFBckM7UUFDQSxLQUFLTSxVQUFMLENBQWdCMkQsWUFBaEIsQ0FBNkIsVUFBN0IsRUFBeUMsVUFBekM7TUFDSCxDQUhELE1BR087UUFDSCxLQUFLM0QsVUFBTCxDQUFnQnlELFNBQWhCLENBQTBCRyxNQUExQixHQUFtQyxLQUFLbEUsYUFBeEM7UUFDQSxLQUFLTSxVQUFMLENBQWdCNkQsZUFBaEIsQ0FBZ0MsVUFBaEM7TUFDSDtJQUNKO0VBOUpMOztFQUFBO0FBQUE7QUFpS0E1QixNQUFNLENBQUM1QyxjQUFQLEdBQXdCQSxjQUF4QiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9maWVsZHMvcmVwZWF0ZXIuanM/YTBiNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBldmVudEtleSB9IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIEZvcm1pZVJlcGVhdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIHRoaXMuJGZvcm0gPSBzZXR0aW5ncy4kZm9ybTtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy4kZm9ybS5mb3JtO1xuICAgICAgICB0aGlzLiRmaWVsZCA9IHNldHRpbmdzLiRmaWVsZDtcbiAgICAgICAgdGhpcy5kaXNhYmxlZENsYXNzID0gJ2Z1aS1kaXNhYmxlZCc7XG4gICAgICAgIHRoaXMucm93Q291bnRlciA9IDA7XG5cbiAgICAgICAgdGhpcy5pbml0UmVwZWF0ZXIoKTtcbiAgICB9XG5cbiAgICBpbml0UmVwZWF0ZXIoKSB7XG4gICAgICAgIGNvbnN0ICRyb3dzID0gdGhpcy5nZXRSb3dzKCk7XG5cbiAgICAgICAgLy8gQXNzaWduIHRoaXMgaW5zdGFuY2UgdG8gdGhlIGZpZWxkJ3MgRE9NLCBzbyBpdCBjYW4gYmUgYWNjZXNzZWQgYnkgdGhpcmQgcGFydGllc1xuICAgICAgICB0aGlzLiRmaWVsZC5yZXBlYXRlciA9IHRoaXM7XG5cbiAgICAgICAgLy8gU2F2ZSBhIGJ1bmNoIG9mIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy4kYWRkQnV0dG9uID0gdGhpcy4kZmllbGQucXVlcnlTZWxlY3RvcignW2RhdGEtYWRkLXJlcGVhdGVyLXJvd10nKTtcbiAgICAgICAgdGhpcy5taW5Sb3dzID0gcGFyc2VJbnQodGhpcy4kYWRkQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1taW4tcm93cycpKTtcbiAgICAgICAgdGhpcy5tYXhSb3dzID0gcGFyc2VJbnQodGhpcy4kYWRkQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXgtcm93cycpKTtcblxuICAgICAgICAvLyBCaW5kIHRoZSBjbGljayBldmVudCB0byB0aGUgYWRkIGJ1dHRvblxuICAgICAgICBpZiAodGhpcy4kYWRkQnV0dG9uKSB7XG4gICAgICAgICAgICAvLyBBZGQgdGhlIGNsaWNrIGV2ZW50LCBidXQgdXNlIGEgbmFtZXNwYWNlIHNvIHdlIGNhbiB0cmFjayB0aGVzZSBkeW5hbWljYWxseS1hZGRlZCBpdGVtc1xuICAgICAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIodGhpcy4kYWRkQnV0dG9uLCBldmVudEtleSgnY2xpY2snKSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJvdyhlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5pdGlhbGlzZSBhbnkgcmVuZGVyZWQgcm93c1xuICAgICAgICBpZiAoJHJvd3MgJiYgJHJvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAkcm93cy5mb3JFYWNoKCgkcm93KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Um93KCRyb3cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbWl0IGFuIFwiaW5pdFwiIGV2ZW50XG4gICAgICAgIHRoaXMuJGZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdpbml0Jywge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIHJlcGVhdGVyOiB0aGlzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGluaXRSb3coJHJvdywgaXNOZXcgPSBmYWxzZSkge1xuICAgICAgICBpZiAoISRyb3cpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJHJvdyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCAkcmVtb3ZlQnV0dG9uID0gJHJvdy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZW1vdmUtcmVwZWF0ZXItcm93XScpO1xuXG4gICAgICAgIGlmICgkcmVtb3ZlQnV0dG9uKSB7XG4gICAgICAgICAgICAvLyBBZGQgdGhlIGNsaWNrIGV2ZW50LCBidXQgdXNlIGEgbmFtZXNwYWNlIHNvIHdlIGNhbiB0cmFjayB0aGVzZSBkeW5hbWljYWxseS1hZGRlZCBpdGVtc1xuICAgICAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJHJlbW92ZUJ1dHRvbiwgZXZlbnRLZXkoJ2NsaWNrJyksIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVSb3coZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXRpYWxpemUgYW55IG5ldyBuZXN0ZWQgZmllbGRzIHdpdGggSlNcbiAgICAgICAgaWYgKGlzTmV3KSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZENvbmZpZ3MgPSBGb3JtaWUucGFyc2VGaWVsZENvbmZpZygkcm93LCB0aGlzLiRmb3JtKTtcblxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZmllbGRDb25maWdzKS5mb3JFYWNoKChtb2R1bGUpID0+IHtcbiAgICAgICAgICAgICAgICBmaWVsZENvbmZpZ3NbbW9kdWxlXS5mb3JFYWNoKChmaWVsZENvbmZpZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRGaWVsZENsYXNzKG1vZHVsZSwgZmllbGRDb25maWcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbmNyZW1lbnQgdGhlIG51bWJlciBvZiByb3dzIFwiaW4gc3RvcmVcIlxuICAgICAgICB0aGlzLnJvd0NvdW50ZXIrKztcbiAgICB9XG5cbiAgICBpbml0RmllbGRDbGFzcyhjbGFzc05hbWUsIHBhcmFtcykge1xuICAgICAgICBjb25zdCBtb2R1bGVDbGFzcyA9IHdpbmRvd1tjbGFzc05hbWVdO1xuXG4gICAgICAgIGlmIChtb2R1bGVDbGFzcykge1xuICAgICAgICAgICAgbmV3IG1vZHVsZUNsYXNzKHBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRSb3coZSkge1xuICAgICAgICBjb25zdCBidXR0b24gPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3QgaGFuZGxlID0gdGhpcy4kYWRkQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1hZGQtcmVwZWF0ZXItcm93Jyk7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcmVwZWF0ZXItdGVtcGxhdGU9XCIke2hhbmRsZX1cIl1gKTtcbiAgICAgICAgY29uc3QgbnVtUm93cyA9IHRoaXMuZ2V0TnVtUm93cygpO1xuXG4gICAgICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgaWYgKG51bVJvd3MgPj0gdGhpcy5tYXhSb3dzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRoaXMgcmVhbC10aW1lLiBXZSB3YW50IHRvIG1haW50YWluIGEgY291bnRlciB0byBlbnN1cmVcbiAgICAgICAgICAgIC8vIHRoZXJlJ3Mgbm8gY29sbGlzaW9ucyBvZiBuZXcgcm93cyBvdmVyd3JpdGluZyBvciBqdW1ibGluZyB1cCBvbGQgcm93c1xuICAgICAgICAgICAgLy8gd2hlbiByZW1vdmluZyB0aGVtIChhZGRpbmcgMiwgcmVtb3ZlIDFzdCwgYWRkIG5ldyAtIHJlc3VsdHMgaW4gaXNzdWVzKS5cbiAgICAgICAgICAgIGNvbnN0IGlkID0gYG5ldyR7dGhpcy5yb3dDb3VudGVyICsgMX1gO1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IHRlbXBsYXRlLmlubmVySFRNTC5yZXBsYWNlKC9fX1JPV19fL2csIGlkKTtcblxuICAgICAgICAgICAgbGV0ICRuZXdSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICRuZXdSb3cuaW5uZXJIVE1MID0gaHRtbC50cmltKCk7XG4gICAgICAgICAgICAkbmV3Um93ID0gJG5ld1Jvdy5xdWVyeVNlbGVjdG9yKCdkaXY6Zmlyc3Qtb2YtdHlwZScpO1xuXG4gICAgICAgICAgICB0aGlzLiRmaWVsZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXBlYXRlci1yb3dzXScpLmFwcGVuZENoaWxkKCRuZXdSb3cpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvbigpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2FwcGVuZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBlYXRlcjogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogJG5ld1JvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IHRoaXMuJGZvcm0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZmllbGQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRSb3coZXZlbnQuZGV0YWlsLnJvdywgdHJ1ZSk7XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVSb3coZSkge1xuICAgICAgICBjb25zdCBidXR0b24gPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3QgJHJvdyA9IGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1yZXBlYXRlci1yb3ddJyk7XG5cbiAgICAgICAgaWYgKCRyb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IG51bVJvd3MgPSB0aGlzLmdldE51bVJvd3MoKTtcblxuICAgICAgICAgICAgaWYgKG51bVJvd3MgPD0gdGhpcy5taW5Sb3dzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkcm93LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJHJvdyk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRSb3dzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZmllbGQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmVwZWF0ZXItcm93XScpO1xuICAgIH1cblxuICAgIGdldE51bVJvd3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFJvd3MoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgdXBkYXRlQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5nZXROdW1Sb3dzKCkgPj0gdGhpcy5tYXhSb3dzKSB7XG4gICAgICAgICAgICB0aGlzLiRhZGRCdXR0b24uY2xhc3NMaXN0LmFkZCA9IHRoaXMuZGlzYWJsZWRDbGFzcztcbiAgICAgICAgICAgIHRoaXMuJGFkZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRhZGRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSA9IHRoaXMuZGlzYWJsZWRDbGFzcztcbiAgICAgICAgICAgIHRoaXMuJGFkZEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbndpbmRvdy5Gb3JtaWVSZXBlYXRlciA9IEZvcm1pZVJlcGVhdGVyO1xuIl0sIm5hbWVzIjpbImV2ZW50S2V5IiwiRm9ybWllUmVwZWF0ZXIiLCJzZXR0aW5ncyIsIiRmb3JtIiwiZm9ybSIsIiRmaWVsZCIsImRpc2FibGVkQ2xhc3MiLCJyb3dDb3VudGVyIiwiaW5pdFJlcGVhdGVyIiwiJHJvd3MiLCJnZXRSb3dzIiwicmVwZWF0ZXIiLCIkYWRkQnV0dG9uIiwicXVlcnlTZWxlY3RvciIsIm1pblJvd3MiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsIm1heFJvd3MiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImFkZFJvdyIsImxlbmd0aCIsImZvckVhY2giLCIkcm93IiwiaW5pdFJvdyIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJkZXRhaWwiLCJpc05ldyIsImNvbnNvbGUiLCJlcnJvciIsIiRyZW1vdmVCdXR0b24iLCJyZW1vdmVSb3ciLCJmaWVsZENvbmZpZ3MiLCJGb3JtaWUiLCJwYXJzZUZpZWxkQ29uZmlnIiwiT2JqZWN0Iiwia2V5cyIsIm1vZHVsZSIsImZpZWxkQ29uZmlnIiwiaW5pdEZpZWxkQ2xhc3MiLCJjbGFzc05hbWUiLCJwYXJhbXMiLCJtb2R1bGVDbGFzcyIsIndpbmRvdyIsImJ1dHRvbiIsInRhcmdldCIsImhhbmRsZSIsInRlbXBsYXRlIiwiZG9jdW1lbnQiLCJudW1Sb3dzIiwiZ2V0TnVtUm93cyIsImlkIiwiaHRtbCIsImlubmVySFRNTCIsInJlcGxhY2UiLCIkbmV3Um93IiwiY3JlYXRlRWxlbWVudCIsInRyaW0iLCJhcHBlbmRDaGlsZCIsInNldFRpbWVvdXQiLCJ1cGRhdGVCdXR0b24iLCJldmVudCIsInJvdyIsImNsb3Nlc3QiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlIiwicmVtb3ZlQXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/fields/repeater.js\n");

/***/ }),

/***/ "./src/js/utils/utils.js":
/*!*******************************!*\
  !*** ./src/js/utils/utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"eventKey\": () => (/* binding */ eventKey),\n/* harmony export */   \"isEmpty\": () => (/* binding */ isEmpty),\n/* harmony export */   \"toBoolean\": () => (/* binding */ toBoolean)\n/* harmony export */ });\nvar isEmpty = function isEmpty(obj) {\n  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;\n};\nvar toBoolean = function toBoolean(val) {\n  return !/^(?:f(?:alse)?|no?|0+)$/i.test(val) && !!val;\n};\nvar eventKey = function eventKey(eventName) {\n  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n  if (!namespace) {\n    namespace = Math.random().toString(36).substr(2, 5);\n  }\n\n  return \"\".concat(eventName, \".\").concat(namespace);\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvdXRpbHMvdXRpbHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sSUFBTUEsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBU0MsR0FBVCxFQUFjO0VBQ2pDLE9BQU9BLEdBQUcsSUFBSUMsTUFBTSxDQUFDQyxJQUFQLENBQVlGLEdBQVosRUFBaUJHLE1BQWpCLEtBQTRCLENBQW5DLElBQXdDSCxHQUFHLENBQUNJLFdBQUosS0FBb0JILE1BQW5FO0FBQ0gsQ0FGTTtBQUlBLElBQU1JLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQVNDLEdBQVQsRUFBYztFQUNuQyxPQUFPLENBQUMsMkJBQTJCQyxJQUEzQixDQUFnQ0QsR0FBaEMsQ0FBRCxJQUF5QyxDQUFDLENBQUNBLEdBQWxEO0FBQ0gsQ0FGTTtBQUlBLElBQU1FLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQVNDLFNBQVQsRUFBc0M7RUFBQSxJQUFsQkMsU0FBa0IsdUVBQU4sSUFBTTs7RUFDMUQsSUFBSSxDQUFDQSxTQUFMLEVBQWdCO0lBQ1pBLFNBQVMsR0FBR0MsSUFBSSxDQUFDQyxNQUFMLEdBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLE1BQTNCLENBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBQVo7RUFDSDs7RUFFRCxpQkFBVUwsU0FBVixjQUF1QkMsU0FBdkI7QUFDSCxDQU5NIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3V0aWxzLmpzP2Q5ZWUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGlzRW1wdHkgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IHRvQm9vbGVhbiA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiAhL14oPzpmKD86YWxzZSk/fG5vP3wwKykkL2kudGVzdCh2YWwpICYmICEhdmFsO1xufTtcblxuZXhwb3J0IGNvbnN0IGV2ZW50S2V5ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBuYW1lc3BhY2UgPSBudWxsKSB7XG4gICAgaWYgKCFuYW1lc3BhY2UpIHtcbiAgICAgICAgbmFtZXNwYWNlID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDUpO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtldmVudE5hbWV9LiR7bmFtZXNwYWNlfWA7XG59O1xuIl0sIm5hbWVzIjpbImlzRW1wdHkiLCJvYmoiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiY29uc3RydWN0b3IiLCJ0b0Jvb2xlYW4iLCJ2YWwiLCJ0ZXN0IiwiZXZlbnRLZXkiLCJldmVudE5hbWUiLCJuYW1lc3BhY2UiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/utils/utils.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/fields/repeater.js");
/******/ 	
/******/ })()
;