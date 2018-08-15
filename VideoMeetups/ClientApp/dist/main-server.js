(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("./vendor");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(6);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(141);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(140);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(142);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    increment: function () { return ({ type: 'INCREMENT_COUNT' }); },
    decrement: function () { return ({ type: 'DECREMENT_COUNT' }); }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var reducer = function (state, action) {
    switch (action.type) {
        case 'INCREMENT_COUNT':
            return { count: state.count + 1 };
        case 'DECREMENT_COUNT':
            return { count: state.count - 1 };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { count: 0 };
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_domain_task__);

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    requestWeatherForecasts: function (startDateIndex) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        if (startDateIndex !== getState().weatherForecasts.startDateIndex) {
            var fetchTask = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["fetch"])("api/SampleData/WeatherForecasts?startDateIndex=" + startDateIndex)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
            });
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["addTask"])(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { forecasts: [], isLoading: false };
var reducer = function (state, incomingAction) {
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,
                isLoading: true
            };
        case 'RECEIVE_WEATHER_FORECASTS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,
                    isLoading: false
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(19);




function configureStore(history, initialState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    var windowIfDefined = typeof window === 'undefined' ? null : window;
    // If devTools is installed, connect to it
    var devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__;
    var createStoreWithMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerMiddleware"])(history)), devToolsExtension ? devToolsExtension() : function (next) { return next; })(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"]);
    // Combine all reducers and instantiate the app-wide store instance
    var allReducers = buildRootReducer(__WEBPACK_IMPORTED_MODULE_3__store__["a" /* reducers */]);
    var store = createStoreWithMiddleware(allReducers, initialState);
    // Enable Webpack hot module replacement for reducers
    if (false) {
        module.hot.accept('./store', function () {
            var nextRootReducer = require('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }
    return store;
}
function buildRootReducer(allReducers) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])(Object.assign({}, allReducers, { routing: __WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerReducer"] }));
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_FetchData__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Counter__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_HomePage_Component__ = __webpack_require__(16);







var routes = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* Layout */], null,
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_6__components_HomePage_Component__["a" /* HomePageComponent */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/SampleHome', component: __WEBPACK_IMPORTED_MODULE_3__components_Home__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: '/counter', component: __WEBPACK_IMPORTED_MODULE_5__components_Counter__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: '/fetchdata/:startDateIndex?', component: __WEBPACK_IMPORTED_MODULE_4__components_FetchData__["a" /* default */] }));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(132);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(137);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(139);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_history__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__configureStore__ = __webpack_require__(7);









/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__["createServerRenderer"])(function (params) {
    return new Promise(function (resolve, reject) {
        // Prepare Redux store with in-memory history, and dispatch a navigation event
        // corresponding to the incoming URL
        var basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
        var urlAfterBasename = params.url.substring(basename.length);
        var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__configureStore__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_history__["createMemoryHistory"])());
        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__["replace"])(urlAfterBasename));
        // Prepare an instance of the application and perform an inital render that will
        // cause any async tasks (e.g., data access) to begin
        var routerContext = {};
        var app = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_redux__["Provider"], { store: store },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["StaticRouter"], { basename: basename, context: routerContext, location: params.location.path, children: __WEBPACK_IMPORTED_MODULE_7__routes__["a" /* routes */] })));
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(app);
        // If there's a redirection, just send this information back to the host application
        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }
        // Once any async tasks are done, we can perform the final render
        // We also send the redux store state, so the client can continue execution where the server left off
        params.domainTasks.then(function () {
            resolve({
                html: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(app),
                globals: { initialReduxState: store.getState() }
            });
        }, reject); // Also propagate any errors back into the host application
    });
}));


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Counter__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Counter = (function (_super) {
    __extends(Counter, _super);
    function Counter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Counter.prototype.render = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Counter"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "This is a simple example of a React component."),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null,
                "Current count: ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, this.props.count)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onClick: function () { _this.props.increment(); } }, "Increment"));
    };
    return Counter;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) { return state.counter; }, // Selects which state properties are merged into the component's props
__WEBPACK_IMPORTED_MODULE_2__store_Counter__["a" /* actionCreators */] // Selects which action creators are merged into the component's props
)(Counter));


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_WeatherForecasts__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var FetchData = (function (_super) {
    __extends(FetchData, _super);
    function FetchData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FetchData.prototype.componentWillMount = function () {
        // This method runs when the component is first added to the page
        var startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        this.props.requestWeatherForecasts(startDateIndex);
    };
    FetchData.prototype.componentWillReceiveProps = function (nextProps) {
        // This method runs when incoming props (e.g., route params) change
        var startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;
        this.props.requestWeatherForecasts(startDateIndex);
    };
    FetchData.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Weather forecast"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "This component demonstrates fetching data from the server and working with URL parameters."),
            this.renderForecastsTable(),
            this.renderPagination());
    };
    FetchData.prototype.renderForecastsTable = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("table", { className: 'table' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("thead", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tr", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null, "Date"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null, "Temp. (C)"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null, "Temp. (F)"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null, "Summary"))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tbody", null, this.props.forecasts.map(function (forecast) {
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tr", { key: forecast.dateFormatted },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null, forecast.dateFormatted),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null, forecast.temperatureC),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null, forecast.temperatureF),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null, forecast.summary));
            })));
    };
    FetchData.prototype.renderPagination = function () {
        var prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        var nextStartDateIndex = (this.props.startDateIndex || 0) + 5;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", { className: 'clearfix text-center' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], { className: 'btn btn-default pull-left', to: "/fetchdata/" + prevStartDateIndex }, "Previous"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], { className: 'btn btn-default pull-right', to: "/fetchdata/" + nextStartDateIndex }, "Next"),
            this.props.isLoading ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "Loading...") : []);
    };
    return FetchData;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(function (state) { return state.weatherForecasts; }, // Selects which state properties are merged into the component's props
__WEBPACK_IMPORTED_MODULE_3__store_WeatherForecasts__["a" /* actionCreators */] // Selects which action creators are merged into the component's props
)(FetchData));


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Hello, world!"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "Welcome to your new single-page application, built with:"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://get.asp.net/' }, "ASP.NET Core"),
                    " and ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' }, "C#"),
                    " for cross-platform server-side code"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://facebook.github.io/react/' }, "React"),
                    ", ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'http://redux.js.org' }, "Redux"),
                    ", and ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'http://www.typescriptlang.org/' }, "TypeScript"),
                    " for client-side code"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://webpack.github.io/' }, "Webpack"),
                    " for building and bundling client-side resources"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'http://getbootstrap.com/' }, "Bootstrap"),
                    " for layout and styling")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "To help you get started, we've also set up:"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Client-side navigation"),
                    ". For example, click ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Counter"),
                    " then ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Back"),
                    " to return here."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Webpack dev middleware"),
                    ". In development mode, there's no need to run the ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "webpack"),
                    " build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Hot module replacement"),
                    ". In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, rebuilt React components will be injected directly into your running application, preserving its live state."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Efficient production builds"),
                    ". In production mode, development-time features are disabled, and the ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "webpack"),
                    " build tool produces minified static CSS and JavaScript files."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Server-side prerendering"),
                    ". To optimize startup time, your React application is first rendered on the server. The initial HTML and state is then transferred to the browser, where client-side code picks up where the server left off.")));
    };
    return Home;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (Home);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var HomePageComponent = (function (_super) {
    __extends(HomePageComponent, _super);
    function HomePageComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomePageComponent.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { style: { backgroundColor: 'gray', height: '300px' } });
    };
    return HomePageComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NavMenu__ = __webpack_require__(18);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'container-fluid' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__NavMenu__["a" /* NavMenu */], null)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row' }, this.props.children));
    };
    return Layout;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var NavMenu = (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavMenu.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'main-nav' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar navbar-inverse' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar-header' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: 'button', className: 'navbar-toggle', "data-toggle": 'collapse', "data-target": '.navbar-collapse' },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'sr-only' }, "Toggle navigation"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'icon-bar' }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'icon-bar' }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'icon-bar' }))),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'clearfix' }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar-collapse collapse' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", { className: 'nav navbar-nav' },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { exact: true, to: '/', activeClassName: 'active', className: 'navbar-brand' }, "Video Meetups")),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "Explore")),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "Calendar")),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { to: '/counter', activeClassName: 'active' },
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'glyphicon glyphicon-education' }),
                                " Counter")),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { to: '/fetchdata', activeClassName: 'active' },
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'glyphicon glyphicon-th-list' }),
                                " Fetch data"))),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", { className: 'nav navbar-nav navbar-right' },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "/Account/ExternalLogin" }, "Login")))))));
    };
    return NavMenu;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WeatherForecasts__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Counter__ = __webpack_require__(5);


// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
var reducers = {
    counter: __WEBPACK_IMPORTED_MODULE_1__Counter__["b" /* reducer */],
    weatherForecasts: __WEBPACK_IMPORTED_MODULE_0__WeatherForecasts__["b" /* reducer */]
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(135);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(143);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(70);

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmJmYjU4ZjZlZWYyMzA2YTAzNWEiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL0NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL1dlYXRoZXJGb3JlY2FzdHMudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9yb3V0ZXMudHN4Iiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQ291bnRlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRmV0Y2hEYXRhLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9Ib21lLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9Ib21lUGFnZS5Db21wb25lbnQudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL0xheW91dC50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTmF2TWVudS50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL2luZGV4LnRzIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvZG9tYWluLXRhc2svaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgtdGh1bmsvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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Qjt3QkFDdkM7NEJBQ0ksNERBQUcsSUFBSSxFQUFDLHdCQUF3QixZQUFVLENBQ3pDLENBQ0osQ0FDSCxDQUNKLENBQ0osQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLENBaEQ0QixnREFBZSxHQWdEM0M7Ozs7Ozs7Ozs7OztBQ25Ec0Q7QUFDbEI7QUFRckMsc0dBQXNHO0FBQ3RHLHdHQUF3RztBQUN4Ryw0REFBNEQ7QUFDckQsSUFBTSxRQUFRLEdBQUc7SUFDcEIsT0FBTyxFQUFFLHlEQUFlO0lBQ3hCLGdCQUFnQixFQUFFLGtFQUF3QjtDQUM3QyxDQUFDOzs7Ozs7O0FDZkYsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7QUNBQSw4QyIsImZpbGUiOiJtYWluLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNmJmYjU4ZjZlZWYyMzA2YTAzNWEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3ZlbmRvclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIi4vdmVuZG9yXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoNik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDEpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDApO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE0Mik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgQWN0aW9uLCBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gU1RBVEUgLSBUaGlzIGRlZmluZXMgdGhlIHR5cGUgb2YgZGF0YSBtYWludGFpbmVkIGluIHRoZSBSZWR1eCBzdG9yZS5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ291bnRlclN0YXRlIHtcclxuICAgIGNvdW50OiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEFDVElPTlMgLSBUaGVzZSBhcmUgc2VyaWFsaXphYmxlIChoZW5jZSByZXBsYXlhYmxlKSBkZXNjcmlwdGlvbnMgb2Ygc3RhdGUgdHJhbnNpdGlvbnMuXHJcbi8vIFRoZXkgZG8gbm90IHRoZW1zZWx2ZXMgaGF2ZSBhbnkgc2lkZS1lZmZlY3RzOyB0aGV5IGp1c3QgZGVzY3JpYmUgc29tZXRoaW5nIHRoYXQgaXMgZ29pbmcgdG8gaGFwcGVuLlxyXG4vLyBVc2UgQHR5cGVOYW1lIGFuZCBpc0FjdGlvblR5cGUgZm9yIHR5cGUgZGV0ZWN0aW9uIHRoYXQgd29ya3MgZXZlbiBhZnRlciBzZXJpYWxpemF0aW9uL2Rlc2VyaWFsaXphdGlvbi5cclxuXHJcbmludGVyZmFjZSBJbmNyZW1lbnRDb3VudEFjdGlvbiB7IHR5cGU6ICdJTkNSRU1FTlRfQ09VTlQnIH1cclxuaW50ZXJmYWNlIERlY3JlbWVudENvdW50QWN0aW9uIHsgdHlwZTogJ0RFQ1JFTUVOVF9DT1VOVCcgfVxyXG5cclxuLy8gRGVjbGFyZSBhICdkaXNjcmltaW5hdGVkIHVuaW9uJyB0eXBlLiBUaGlzIGd1YXJhbnRlZXMgdGhhdCBhbGwgcmVmZXJlbmNlcyB0byAndHlwZScgcHJvcGVydGllcyBjb250YWluIG9uZSBvZiB0aGVcclxuLy8gZGVjbGFyZWQgdHlwZSBzdHJpbmdzIChhbmQgbm90IGFueSBvdGhlciBhcmJpdHJhcnkgc3RyaW5nKS5cclxudHlwZSBLbm93bkFjdGlvbiA9IEluY3JlbWVudENvdW50QWN0aW9uIHwgRGVjcmVtZW50Q291bnRBY3Rpb247XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEFDVElPTiBDUkVBVE9SUyAtIFRoZXNlIGFyZSBmdW5jdGlvbnMgZXhwb3NlZCB0byBVSSBjb21wb25lbnRzIHRoYXQgd2lsbCB0cmlnZ2VyIGEgc3RhdGUgdHJhbnNpdGlvbi5cclxuLy8gVGhleSBkb24ndCBkaXJlY3RseSBtdXRhdGUgc3RhdGUsIGJ1dCB0aGV5IGNhbiBoYXZlIGV4dGVybmFsIHNpZGUtZWZmZWN0cyAoc3VjaCBhcyBsb2FkaW5nIGRhdGEpLlxyXG5cclxuZXhwb3J0IGNvbnN0IGFjdGlvbkNyZWF0b3JzID0ge1xyXG4gICAgaW5jcmVtZW50OiAoKSA9PiA8SW5jcmVtZW50Q291bnRBY3Rpb24+eyB0eXBlOiAnSU5DUkVNRU5UX0NPVU5UJyB9LFxyXG4gICAgZGVjcmVtZW50OiAoKSA9PiA8RGVjcmVtZW50Q291bnRBY3Rpb24+eyB0eXBlOiAnREVDUkVNRU5UX0NPVU5UJyB9XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFJFRFVDRVIgLSBGb3IgYSBnaXZlbiBzdGF0ZSBhbmQgYWN0aW9uLCByZXR1cm5zIHRoZSBuZXcgc3RhdGUuIFRvIHN1cHBvcnQgdGltZSB0cmF2ZWwsIHRoaXMgbXVzdCBub3QgbXV0YXRlIHRoZSBvbGQgc3RhdGUuXHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcjogUmVkdWNlcjxDb3VudGVyU3RhdGU+ID0gKHN0YXRlOiBDb3VudGVyU3RhdGUsIGFjdGlvbjogS25vd25BY3Rpb24pID0+IHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdJTkNSRU1FTlRfQ09VTlQnOlxyXG4gICAgICAgICAgICByZXR1cm4geyBjb3VudDogc3RhdGUuY291bnQgKyAxIH07XHJcbiAgICAgICAgY2FzZSAnREVDUkVNRU5UX0NPVU5UJzpcclxuICAgICAgICAgICAgcmV0dXJuIHsgY291bnQ6IHN0YXRlLmNvdW50IC0gMSB9O1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgbGluZSBndWFyYW50ZWVzIHRoYXQgZXZlcnkgYWN0aW9uIGluIHRoZSBLbm93bkFjdGlvbiB1bmlvbiBoYXMgYmVlbiBjb3ZlcmVkIGJ5IGEgY2FzZSBhYm92ZVxyXG4gICAgICAgICAgICBjb25zdCBleGhhdXN0aXZlQ2hlY2s6IG5ldmVyID0gYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvciB1bnJlY29nbml6ZWQgYWN0aW9ucyAob3IgaW4gY2FzZXMgd2hlcmUgYWN0aW9ucyBoYXZlIG5vIGVmZmVjdCksIG11c3QgcmV0dXJuIHRoZSBleGlzdGluZyBzdGF0ZVxyXG4gICAgLy8gIChvciBkZWZhdWx0IGluaXRpYWwgc3RhdGUgaWYgbm9uZSB3YXMgc3VwcGxpZWQpXHJcbiAgICByZXR1cm4gc3RhdGUgfHwgeyBjb3VudDogMCB9O1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvc3RvcmUvQ291bnRlci50cyIsImltcG9ydCB7IGZldGNoLCBhZGRUYXNrIH0gZnJvbSAnZG9tYWluLXRhc2snO1xyXG5pbXBvcnQgeyBBY3Rpb24sIFJlZHVjZXIsIEFjdGlvbkNyZWF0b3IgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7IEFwcFRodW5rQWN0aW9uIH0gZnJvbSAnLi8nO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gU1RBVEUgLSBUaGlzIGRlZmluZXMgdGhlIHR5cGUgb2YgZGF0YSBtYWludGFpbmVkIGluIHRoZSBSZWR1eCBzdG9yZS5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2VhdGhlckZvcmVjYXN0c1N0YXRlIHtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgIHN0YXJ0RGF0ZUluZGV4PzogbnVtYmVyO1xyXG4gICAgZm9yZWNhc3RzOiBXZWF0aGVyRm9yZWNhc3RbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWF0aGVyRm9yZWNhc3Qge1xyXG4gICAgZGF0ZUZvcm1hdHRlZDogc3RyaW5nO1xyXG4gICAgdGVtcGVyYXR1cmVDOiBudW1iZXI7XHJcbiAgICB0ZW1wZXJhdHVyZUY6IG51bWJlcjtcclxuICAgIHN1bW1hcnk6IHN0cmluZztcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQUNUSU9OUyAtIFRoZXNlIGFyZSBzZXJpYWxpemFibGUgKGhlbmNlIHJlcGxheWFibGUpIGRlc2NyaXB0aW9ucyBvZiBzdGF0ZSB0cmFuc2l0aW9ucy5cclxuLy8gVGhleSBkbyBub3QgdGhlbXNlbHZlcyBoYXZlIGFueSBzaWRlLWVmZmVjdHM7IHRoZXkganVzdCBkZXNjcmliZSBzb21ldGhpbmcgdGhhdCBpcyBnb2luZyB0byBoYXBwZW4uXHJcblxyXG5pbnRlcmZhY2UgUmVxdWVzdFdlYXRoZXJGb3JlY2FzdHNBY3Rpb24ge1xyXG4gICAgdHlwZTogJ1JFUVVFU1RfV0VBVEhFUl9GT1JFQ0FTVFMnO1xyXG4gICAgc3RhcnREYXRlSW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlY2VpdmVXZWF0aGVyRm9yZWNhc3RzQWN0aW9uIHtcclxuICAgIHR5cGU6ICdSRUNFSVZFX1dFQVRIRVJfRk9SRUNBU1RTJztcclxuICAgIHN0YXJ0RGF0ZUluZGV4OiBudW1iZXI7XHJcbiAgICBmb3JlY2FzdHM6IFdlYXRoZXJGb3JlY2FzdFtdO1xyXG59XHJcblxyXG4vLyBEZWNsYXJlIGEgJ2Rpc2NyaW1pbmF0ZWQgdW5pb24nIHR5cGUuIFRoaXMgZ3VhcmFudGVlcyB0aGF0IGFsbCByZWZlcmVuY2VzIHRvICd0eXBlJyBwcm9wZXJ0aWVzIGNvbnRhaW4gb25lIG9mIHRoZVxyXG4vLyBkZWNsYXJlZCB0eXBlIHN0cmluZ3MgKGFuZCBub3QgYW55IG90aGVyIGFyYml0cmFyeSBzdHJpbmcpLlxyXG50eXBlIEtub3duQWN0aW9uID0gUmVxdWVzdFdlYXRoZXJGb3JlY2FzdHNBY3Rpb24gfCBSZWNlaXZlV2VhdGhlckZvcmVjYXN0c0FjdGlvbjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQUNUSU9OIENSRUFUT1JTIC0gVGhlc2UgYXJlIGZ1bmN0aW9ucyBleHBvc2VkIHRvIFVJIGNvbXBvbmVudHMgdGhhdCB3aWxsIHRyaWdnZXIgYSBzdGF0ZSB0cmFuc2l0aW9uLlxyXG4vLyBUaGV5IGRvbid0IGRpcmVjdGx5IG11dGF0ZSBzdGF0ZSwgYnV0IHRoZXkgY2FuIGhhdmUgZXh0ZXJuYWwgc2lkZS1lZmZlY3RzIChzdWNoIGFzIGxvYWRpbmcgZGF0YSkuXHJcblxyXG5leHBvcnQgY29uc3QgYWN0aW9uQ3JlYXRvcnMgPSB7XHJcbiAgICByZXF1ZXN0V2VhdGhlckZvcmVjYXN0czogKHN0YXJ0RGF0ZUluZGV4OiBudW1iZXIpOiBBcHBUaHVua0FjdGlvbjxLbm93bkFjdGlvbj4gPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgICAgIC8vIE9ubHkgbG9hZCBkYXRhIGlmIGl0J3Mgc29tZXRoaW5nIHdlIGRvbid0IGFscmVhZHkgaGF2ZSAoYW5kIGFyZSBub3QgYWxyZWFkeSBsb2FkaW5nKVxyXG4gICAgICAgIGlmIChzdGFydERhdGVJbmRleCAhPT0gZ2V0U3RhdGUoKS53ZWF0aGVyRm9yZWNhc3RzLnN0YXJ0RGF0ZUluZGV4KSB7XHJcbiAgICAgICAgICAgIGxldCBmZXRjaFRhc2sgPSBmZXRjaChgYXBpL1NhbXBsZURhdGEvV2VhdGhlckZvcmVjYXN0cz9zdGFydERhdGVJbmRleD0keyBzdGFydERhdGVJbmRleCB9YClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPFdlYXRoZXJGb3JlY2FzdFtdPilcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1JFQ0VJVkVfV0VBVEhFUl9GT1JFQ0FTVFMnLCBzdGFydERhdGVJbmRleDogc3RhcnREYXRlSW5kZXgsIGZvcmVjYXN0czogZGF0YSB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYWRkVGFzayhmZXRjaFRhc2spOyAvLyBFbnN1cmUgc2VydmVyLXNpZGUgcHJlcmVuZGVyaW5nIHdhaXRzIGZvciB0aGlzIHRvIGNvbXBsZXRlXHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1JFUVVFU1RfV0VBVEhFUl9GT1JFQ0FTVFMnLCBzdGFydERhdGVJbmRleDogc3RhcnREYXRlSW5kZXggfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBSRURVQ0VSIC0gRm9yIGEgZ2l2ZW4gc3RhdGUgYW5kIGFjdGlvbiwgcmV0dXJucyB0aGUgbmV3IHN0YXRlLiBUbyBzdXBwb3J0IHRpbWUgdHJhdmVsLCB0aGlzIG11c3Qgbm90IG11dGF0ZSB0aGUgb2xkIHN0YXRlLlxyXG5cclxuY29uc3QgdW5sb2FkZWRTdGF0ZTogV2VhdGhlckZvcmVjYXN0c1N0YXRlID0geyBmb3JlY2FzdHM6IFtdLCBpc0xvYWRpbmc6IGZhbHNlIH07XHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcjogUmVkdWNlcjxXZWF0aGVyRm9yZWNhc3RzU3RhdGU+ID0gKHN0YXRlOiBXZWF0aGVyRm9yZWNhc3RzU3RhdGUsIGluY29taW5nQWN0aW9uOiBBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IGluY29taW5nQWN0aW9uIGFzIEtub3duQWN0aW9uO1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ1JFUVVFU1RfV0VBVEhFUl9GT1JFQ0FTVFMnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnREYXRlSW5kZXg6IGFjdGlvbi5zdGFydERhdGVJbmRleCxcclxuICAgICAgICAgICAgICAgIGZvcmVjYXN0czogc3RhdGUuZm9yZWNhc3RzLFxyXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSAnUkVDRUlWRV9XRUFUSEVSX0ZPUkVDQVNUUyc6XHJcbiAgICAgICAgICAgIC8vIE9ubHkgYWNjZXB0IHRoZSBpbmNvbWluZyBkYXRhIGlmIGl0IG1hdGNoZXMgdGhlIG1vc3QgcmVjZW50IHJlcXVlc3QuIFRoaXMgZW5zdXJlcyB3ZSBjb3JyZWN0bHlcclxuICAgICAgICAgICAgLy8gaGFuZGxlIG91dC1vZi1vcmRlciByZXNwb25zZXMuXHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24uc3RhcnREYXRlSW5kZXggPT09IHN0YXRlLnN0YXJ0RGF0ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZUluZGV4OiBhY3Rpb24uc3RhcnREYXRlSW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RzOiBhY3Rpb24uZm9yZWNhc3RzLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBsaW5lIGd1YXJhbnRlZXMgdGhhdCBldmVyeSBhY3Rpb24gaW4gdGhlIEtub3duQWN0aW9uIHVuaW9uIGhhcyBiZWVuIGNvdmVyZWQgYnkgYSBjYXNlIGFib3ZlXHJcbiAgICAgICAgICAgIGNvbnN0IGV4aGF1c3RpdmVDaGVjazogbmV2ZXIgPSBhY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0YXRlIHx8IHVubG9hZGVkU3RhdGU7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9zdG9yZS9XZWF0aGVyRm9yZWNhc3RzLnRzIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSwgY29tYmluZVJlZHVjZXJzLCBHZW5lcmljU3RvcmVFbmhhbmNlciwgU3RvcmUsIFN0b3JlRW5oYW5jZXJTdG9yZUNyZWF0b3IsIFJlZHVjZXJzTWFwT2JqZWN0IH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xyXG5pbXBvcnQgeyByb3V0ZXJSZWR1Y2VyLCByb3V0ZXJNaWRkbGV3YXJlIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4JztcclxuaW1wb3J0ICogYXMgU3RvcmVNb2R1bGUgZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uU3RhdGUsIHJlZHVjZXJzIH0gZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICdoaXN0b3J5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGhpc3Rvcnk6IEhpc3RvcnksIGluaXRpYWxTdGF0ZT86IEFwcGxpY2F0aW9uU3RhdGUpIHtcclxuICAgIC8vIEJ1aWxkIG1pZGRsZXdhcmUuIFRoZXNlIGFyZSBmdW5jdGlvbnMgdGhhdCBjYW4gcHJvY2VzcyB0aGUgYWN0aW9ucyBiZWZvcmUgdGhleSByZWFjaCB0aGUgc3RvcmUuXHJcbiAgICBjb25zdCB3aW5kb3dJZkRlZmluZWQgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB3aW5kb3cgYXMgYW55O1xyXG4gICAgLy8gSWYgZGV2VG9vbHMgaXMgaW5zdGFsbGVkLCBjb25uZWN0IHRvIGl0XHJcbiAgICBjb25zdCBkZXZUb29sc0V4dGVuc2lvbiA9IHdpbmRvd0lmRGVmaW5lZCAmJiB3aW5kb3dJZkRlZmluZWQuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyBhcyAoKSA9PiBHZW5lcmljU3RvcmVFbmhhbmNlcjtcclxuICAgIGNvbnN0IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUgPSBjb21wb3NlKFxyXG4gICAgICAgIGFwcGx5TWlkZGxld2FyZSh0aHVuaywgcm91dGVyTWlkZGxld2FyZShoaXN0b3J5KSksXHJcbiAgICAgICAgZGV2VG9vbHNFeHRlbnNpb24gPyBkZXZUb29sc0V4dGVuc2lvbigpIDogPFM+KG5leHQ6IFN0b3JlRW5oYW5jZXJTdG9yZUNyZWF0b3I8Uz4pID0+IG5leHRcclxuICAgICkoY3JlYXRlU3RvcmUpO1xyXG5cclxuICAgIC8vIENvbWJpbmUgYWxsIHJlZHVjZXJzIGFuZCBpbnN0YW50aWF0ZSB0aGUgYXBwLXdpZGUgc3RvcmUgaW5zdGFuY2VcclxuICAgIGNvbnN0IGFsbFJlZHVjZXJzID0gYnVpbGRSb290UmVkdWNlcihyZWR1Y2Vycyk7XHJcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUoYWxsUmVkdWNlcnMsIGluaXRpYWxTdGF0ZSkgYXMgU3RvcmU8QXBwbGljYXRpb25TdGF0ZT47XHJcblxyXG4gICAgLy8gRW5hYmxlIFdlYnBhY2sgaG90IG1vZHVsZSByZXBsYWNlbWVudCBmb3IgcmVkdWNlcnNcclxuICAgIGlmIChtb2R1bGUuaG90KSB7XHJcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vc3RvcmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSb290UmVkdWNlciA9IHJlcXVpcmU8dHlwZW9mIFN0b3JlTW9kdWxlPignLi9zdG9yZScpO1xyXG4gICAgICAgICAgICBzdG9yZS5yZXBsYWNlUmVkdWNlcihidWlsZFJvb3RSZWR1Y2VyKG5leHRSb290UmVkdWNlci5yZWR1Y2VycykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdG9yZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRSb290UmVkdWNlcihhbGxSZWR1Y2VyczogUmVkdWNlcnNNYXBPYmplY3QpIHtcclxuICAgIHJldHVybiBjb21iaW5lUmVkdWNlcnM8QXBwbGljYXRpb25TdGF0ZT4oT2JqZWN0LmFzc2lnbih7fSwgYWxsUmVkdWNlcnMsIHsgcm91dGluZzogcm91dGVyUmVkdWNlciB9KSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBMYXlvdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvTGF5b3V0JztcclxuaW1wb3J0IEhvbWUgZnJvbSAnLi9jb21wb25lbnRzL0hvbWUnO1xyXG5pbXBvcnQgRmV0Y2hEYXRhIGZyb20gJy4vY29tcG9uZW50cy9GZXRjaERhdGEnO1xyXG5pbXBvcnQgQ291bnRlciBmcm9tICcuL2NvbXBvbmVudHMvQ291bnRlcic7XHJcbmltcG9ydCB7IEhvbWVQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL0hvbWVQYWdlLkNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVzID0gPExheW91dD5cclxuICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9e0hvbWVQYWdlQ29tcG9uZW50fSAvPlxyXG4gICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9TYW1wbGVIb21lJyBjb21wb25lbnQ9eyBIb21lIH0gLz5cclxuICAgIDxSb3V0ZSBwYXRoPScvY291bnRlcicgY29tcG9uZW50PXsgQ291bnRlciB9IC8+XHJcbiAgICA8Um91dGUgcGF0aD0nL2ZldGNoZGF0YS86c3RhcnREYXRlSW5kZXg/JyBjb21wb25lbnQ9e0ZldGNoRGF0YX0gLz5cclxuPC9MYXlvdXQ+O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvcm91dGVzLnRzeCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDEzMik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2FzcG5ldC1wcmVyZW5kZXJpbmcvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDEzNyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxMzkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vc2VydmVyLmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcclxuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHJlcGxhY2UgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xyXG5pbXBvcnQgeyBjcmVhdGVNZW1vcnlIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XHJcbmltcG9ydCB7IGNyZWF0ZVNlcnZlclJlbmRlcmVyLCBSZW5kZXJSZXN1bHQgfSBmcm9tICdhc3BuZXQtcHJlcmVuZGVyaW5nJztcclxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xyXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAnLi9jb25maWd1cmVTdG9yZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTZXJ2ZXJSZW5kZXJlcihwYXJhbXMgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFJlbmRlclJlc3VsdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vIFByZXBhcmUgUmVkdXggc3RvcmUgd2l0aCBpbi1tZW1vcnkgaGlzdG9yeSwgYW5kIGRpc3BhdGNoIGEgbmF2aWdhdGlvbiBldmVudFxyXG4gICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGluY29taW5nIFVSTFxyXG4gICAgICAgIGNvbnN0IGJhc2VuYW1lID0gcGFyYW1zLmJhc2VVcmwuc3Vic3RyaW5nKDAsIHBhcmFtcy5iYXNlVXJsLmxlbmd0aCAtIDEpOyAvLyBSZW1vdmUgdHJhaWxpbmcgc2xhc2hcclxuICAgICAgICBjb25zdCB1cmxBZnRlckJhc2VuYW1lID0gcGFyYW1zLnVybC5zdWJzdHJpbmcoYmFzZW5hbWUubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKGNyZWF0ZU1lbW9yeUhpc3RvcnkoKSk7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVwbGFjZSh1cmxBZnRlckJhc2VuYW1lKSk7XHJcblxyXG4gICAgICAgIC8vIFByZXBhcmUgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcGxpY2F0aW9uIGFuZCBwZXJmb3JtIGFuIGluaXRhbCByZW5kZXIgdGhhdCB3aWxsXHJcbiAgICAgICAgLy8gY2F1c2UgYW55IGFzeW5jIHRhc2tzIChlLmcuLCBkYXRhIGFjY2VzcykgdG8gYmVnaW5cclxuICAgICAgICBjb25zdCByb3V0ZXJDb250ZXh0OiBhbnkgPSB7fTtcclxuICAgICAgICBjb25zdCBhcHAgPSAoXHJcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17IHN0b3JlIH0+XHJcbiAgICAgICAgICAgICAgICA8U3RhdGljUm91dGVyIGJhc2VuYW1lPXsgYmFzZW5hbWUgfSBjb250ZXh0PXsgcm91dGVyQ29udGV4dCB9IGxvY2F0aW9uPXsgcGFyYW1zLmxvY2F0aW9uLnBhdGggfSBjaGlsZHJlbj17IHJvdXRlcyB9IC8+XHJcbiAgICAgICAgICAgIDwvUHJvdmlkZXI+XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZW5kZXJUb1N0cmluZyhhcHApO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGVyZSdzIGEgcmVkaXJlY3Rpb24sIGp1c3Qgc2VuZCB0aGlzIGluZm9ybWF0aW9uIGJhY2sgdG8gdGhlIGhvc3QgYXBwbGljYXRpb25cclxuICAgICAgICBpZiAocm91dGVyQ29udGV4dC51cmwpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHJlZGlyZWN0VXJsOiByb3V0ZXJDb250ZXh0LnVybCB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBPbmNlIGFueSBhc3luYyB0YXNrcyBhcmUgZG9uZSwgd2UgY2FuIHBlcmZvcm0gdGhlIGZpbmFsIHJlbmRlclxyXG4gICAgICAgIC8vIFdlIGFsc28gc2VuZCB0aGUgcmVkdXggc3RvcmUgc3RhdGUsIHNvIHRoZSBjbGllbnQgY2FuIGNvbnRpbnVlIGV4ZWN1dGlvbiB3aGVyZSB0aGUgc2VydmVyIGxlZnQgb2ZmXHJcbiAgICAgICAgcGFyYW1zLmRvbWFpblRhc2tzLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgIGh0bWw6IHJlbmRlclRvU3RyaW5nKGFwcCksXHJcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB7IGluaXRpYWxSZWR1eFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSgpIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgcmVqZWN0KTsgLy8gQWxzbyBwcm9wYWdhdGUgYW55IGVycm9ycyBiYWNrIGludG8gdGhlIGhvc3QgYXBwbGljYXRpb25cclxuICAgIH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTGluaywgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlIH0gIGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0ICogYXMgQ291bnRlclN0b3JlIGZyb20gJy4uL3N0b3JlL0NvdW50ZXInO1xyXG5pbXBvcnQgKiBhcyBXZWF0aGVyRm9yZWNhc3RzIGZyb20gJy4uL3N0b3JlL1dlYXRoZXJGb3JlY2FzdHMnO1xyXG5cclxudHlwZSBDb3VudGVyUHJvcHMgPVxyXG4gICAgQ291bnRlclN0b3JlLkNvdW50ZXJTdGF0ZVxyXG4gICAgJiB0eXBlb2YgQ291bnRlclN0b3JlLmFjdGlvbkNyZWF0b3JzXHJcbiAgICAmIFJvdXRlQ29tcG9uZW50UHJvcHM8e30+O1xyXG5cclxuY2xhc3MgQ291bnRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxDb3VudGVyUHJvcHMsIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8aDE+Q291bnRlcjwvaDE+XHJcblxyXG4gICAgICAgICAgICA8cD5UaGlzIGlzIGEgc2ltcGxlIGV4YW1wbGUgb2YgYSBSZWFjdCBjb21wb25lbnQuPC9wPlxyXG5cclxuICAgICAgICAgICAgPHA+Q3VycmVudCBjb3VudDogPHN0cm9uZz57IHRoaXMucHJvcHMuY291bnQgfTwvc3Ryb25nPjwvcD5cclxuXHJcbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17ICgpID0+IHsgdGhpcy5wcm9wcy5pbmNyZW1lbnQoKSB9IH0+SW5jcmVtZW50PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBXaXJlIHVwIHRoZSBSZWFjdCBjb21wb25lbnQgdG8gdGhlIFJlZHV4IHN0b3JlXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICAoc3RhdGU6IEFwcGxpY2F0aW9uU3RhdGUpID0+IHN0YXRlLmNvdW50ZXIsIC8vIFNlbGVjdHMgd2hpY2ggc3RhdGUgcHJvcGVydGllcyBhcmUgbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCdzIHByb3BzXHJcbiAgICBDb3VudGVyU3RvcmUuYWN0aW9uQ3JlYXRvcnMgICAgICAgICAgICAgICAgIC8vIFNlbGVjdHMgd2hpY2ggYWN0aW9uIGNyZWF0b3JzIGFyZSBtZXJnZWQgaW50byB0aGUgY29tcG9uZW50J3MgcHJvcHNcclxuKShDb3VudGVyKSBhcyB0eXBlb2YgQ291bnRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9Db3VudGVyLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTGluaywgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlIH0gIGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0ICogYXMgV2VhdGhlckZvcmVjYXN0c1N0YXRlIGZyb20gJy4uL3N0b3JlL1dlYXRoZXJGb3JlY2FzdHMnO1xyXG5cclxuLy8gQXQgcnVudGltZSwgUmVkdXggd2lsbCBtZXJnZSB0b2dldGhlci4uLlxyXG50eXBlIFdlYXRoZXJGb3JlY2FzdFByb3BzID1cclxuICAgIFdlYXRoZXJGb3JlY2FzdHNTdGF0ZS5XZWF0aGVyRm9yZWNhc3RzU3RhdGUgICAgICAgIC8vIC4uLiBzdGF0ZSB3ZSd2ZSByZXF1ZXN0ZWQgZnJvbSB0aGUgUmVkdXggc3RvcmVcclxuICAgICYgdHlwZW9mIFdlYXRoZXJGb3JlY2FzdHNTdGF0ZS5hY3Rpb25DcmVhdG9ycyAgICAgIC8vIC4uLiBwbHVzIGFjdGlvbiBjcmVhdG9ycyB3ZSd2ZSByZXF1ZXN0ZWRcclxuICAgICYgUm91dGVDb21wb25lbnRQcm9wczx7IHN0YXJ0RGF0ZUluZGV4OiBzdHJpbmcgfT47IC8vIC4uLiBwbHVzIGluY29taW5nIHJvdXRpbmcgcGFyYW1ldGVyc1xyXG5cclxuY2xhc3MgRmV0Y2hEYXRhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFdlYXRoZXJGb3JlY2FzdFByb3BzLCB7fT4ge1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIHJ1bnMgd2hlbiB0aGUgY29tcG9uZW50IGlzIGZpcnN0IGFkZGVkIHRvIHRoZSBwYWdlXHJcbiAgICAgICAgbGV0IHN0YXJ0RGF0ZUluZGV4ID0gcGFyc2VJbnQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuc3RhcnREYXRlSW5kZXgpIHx8IDA7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5yZXF1ZXN0V2VhdGhlckZvcmVjYXN0cyhzdGFydERhdGVJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IFdlYXRoZXJGb3JlY2FzdFByb3BzKSB7XHJcbiAgICAgICAgLy8gVGhpcyBtZXRob2QgcnVucyB3aGVuIGluY29taW5nIHByb3BzIChlLmcuLCByb3V0ZSBwYXJhbXMpIGNoYW5nZVxyXG4gICAgICAgIGxldCBzdGFydERhdGVJbmRleCA9IHBhcnNlSW50KG5leHRQcm9wcy5tYXRjaC5wYXJhbXMuc3RhcnREYXRlSW5kZXgpIHx8IDA7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5yZXF1ZXN0V2VhdGhlckZvcmVjYXN0cyhzdGFydERhdGVJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGgxPldlYXRoZXIgZm9yZWNhc3Q8L2gxPlxyXG4gICAgICAgICAgICA8cD5UaGlzIGNvbXBvbmVudCBkZW1vbnN0cmF0ZXMgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIgYW5kIHdvcmtpbmcgd2l0aCBVUkwgcGFyYW1ldGVycy48L3A+XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJGb3JlY2FzdHNUYWJsZSgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhZ2luYXRpb24oKSB9XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyRm9yZWNhc3RzVGFibGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9J3RhYmxlJz5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aD5EYXRlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+VGVtcC4gKEMpPC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+VGVtcC4gKEYpPC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+U3VtbWFyeTwvdGg+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvcmVjYXN0cy5tYXAoZm9yZWNhc3QgPT5cclxuICAgICAgICAgICAgICAgIDx0ciBrZXk9eyBmb3JlY2FzdC5kYXRlRm9ybWF0dGVkIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPnsgZm9yZWNhc3QuZGF0ZUZvcm1hdHRlZCB9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+eyBmb3JlY2FzdC50ZW1wZXJhdHVyZUMgfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPnsgZm9yZWNhc3QudGVtcGVyYXR1cmVGIH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57IGZvcmVjYXN0LnN1bW1hcnkgfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgIDwvdGFibGU+O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyUGFnaW5hdGlvbigpIHtcclxuICAgICAgICBsZXQgcHJldlN0YXJ0RGF0ZUluZGV4ID0gKHRoaXMucHJvcHMuc3RhcnREYXRlSW5kZXggfHwgMCkgLSA1O1xyXG4gICAgICAgIGxldCBuZXh0U3RhcnREYXRlSW5kZXggPSAodGhpcy5wcm9wcy5zdGFydERhdGVJbmRleCB8fCAwKSArIDU7XHJcblxyXG4gICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9J2NsZWFyZml4IHRleHQtY2VudGVyJz5cclxuICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPSdidG4gYnRuLWRlZmF1bHQgcHVsbC1sZWZ0JyB0bz17IGAvZmV0Y2hkYXRhLyR7IHByZXZTdGFydERhdGVJbmRleCB9YCB9PlByZXZpb3VzPC9MaW5rPlxyXG4gICAgICAgICAgICA8TGluayBjbGFzc05hbWU9J2J0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0JyB0bz17IGAvZmV0Y2hkYXRhLyR7IG5leHRTdGFydERhdGVJbmRleCB9YCB9Pk5leHQ8L0xpbms+XHJcbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5pc0xvYWRpbmcgPyA8c3Bhbj5Mb2FkaW5nLi4uPC9zcGFuPiA6IFtdIH1cclxuICAgICAgICA8L3A+O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgKHN0YXRlOiBBcHBsaWNhdGlvblN0YXRlKSA9PiBzdGF0ZS53ZWF0aGVyRm9yZWNhc3RzLCAvLyBTZWxlY3RzIHdoaWNoIHN0YXRlIHByb3BlcnRpZXMgYXJlIG1lcmdlZCBpbnRvIHRoZSBjb21wb25lbnQncyBwcm9wc1xyXG4gICAgV2VhdGhlckZvcmVjYXN0c1N0YXRlLmFjdGlvbkNyZWF0b3JzICAgICAgICAgICAgICAgICAvLyBTZWxlY3RzIHdoaWNoIGFjdGlvbiBjcmVhdG9ycyBhcmUgbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCdzIHByb3BzXHJcbikoRmV0Y2hEYXRhKSBhcyB0eXBlb2YgRmV0Y2hEYXRhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9GZXRjaERhdGEudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJvdXRlQ29tcG9uZW50UHJvcHM8e30+LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGgxPkhlbGxvLCB3b3JsZCE8L2gxPlxyXG4gICAgICAgICAgICA8cD5XZWxjb21lIHRvIHlvdXIgbmV3IHNpbmdsZS1wYWdlIGFwcGxpY2F0aW9uLCBidWlsdCB3aXRoOjwvcD5cclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHBzOi8vZ2V0LmFzcC5uZXQvJz5BU1AuTkVUIENvcmU8L2E+IGFuZCA8YSBocmVmPSdodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5LzY3ZWY4c2JkLmFzcHgnPkMjPC9hPiBmb3IgY3Jvc3MtcGxhdGZvcm0gc2VydmVyLXNpZGUgY29kZTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj0naHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvJz5SZWFjdDwvYT4sIDxhIGhyZWY9J2h0dHA6Ly9yZWR1eC5qcy5vcmcnPlJlZHV4PC9hPiwgYW5kIDxhIGhyZWY9J2h0dHA6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnLyc+VHlwZVNjcmlwdDwvYT4gZm9yIGNsaWVudC1zaWRlIGNvZGU8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHBzOi8vd2VicGFjay5naXRodWIuaW8vJz5XZWJwYWNrPC9hPiBmb3IgYnVpbGRpbmcgYW5kIGJ1bmRsaW5nIGNsaWVudC1zaWRlIHJlc291cmNlczwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj0naHR0cDovL2dldGJvb3RzdHJhcC5jb20vJz5Cb290c3RyYXA8L2E+IGZvciBsYXlvdXQgYW5kIHN0eWxpbmc8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8cD5UbyBoZWxwIHlvdSBnZXQgc3RhcnRlZCwgd2UndmUgYWxzbyBzZXQgdXA6PC9wPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5DbGllbnQtc2lkZSBuYXZpZ2F0aW9uPC9zdHJvbmc+LiBGb3IgZXhhbXBsZSwgY2xpY2sgPGVtPkNvdW50ZXI8L2VtPiB0aGVuIDxlbT5CYWNrPC9lbT4gdG8gcmV0dXJuIGhlcmUuPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPldlYnBhY2sgZGV2IG1pZGRsZXdhcmU8L3N0cm9uZz4uIEluIGRldmVsb3BtZW50IG1vZGUsIHRoZXJlJ3Mgbm8gbmVlZCB0byBydW4gdGhlIDxjb2RlPndlYnBhY2s8L2NvZGU+IGJ1aWxkIHRvb2wuIFlvdXIgY2xpZW50LXNpZGUgcmVzb3VyY2VzIGFyZSBkeW5hbWljYWxseSBidWlsdCBvbiBkZW1hbmQuIFVwZGF0ZXMgYXJlIGF2YWlsYWJsZSBhcyBzb29uIGFzIHlvdSBtb2RpZnkgYW55IGZpbGUuPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPkhvdCBtb2R1bGUgcmVwbGFjZW1lbnQ8L3N0cm9uZz4uIEluIGRldmVsb3BtZW50IG1vZGUsIHlvdSBkb24ndCBldmVuIG5lZWQgdG8gcmVsb2FkIHRoZSBwYWdlIGFmdGVyIG1ha2luZyBtb3N0IGNoYW5nZXMuIFdpdGhpbiBzZWNvbmRzIG9mIHNhdmluZyBjaGFuZ2VzIHRvIGZpbGVzLCByZWJ1aWx0IFJlYWN0IGNvbXBvbmVudHMgd2lsbCBiZSBpbmplY3RlZCBkaXJlY3RseSBpbnRvIHlvdXIgcnVubmluZyBhcHBsaWNhdGlvbiwgcHJlc2VydmluZyBpdHMgbGl2ZSBzdGF0ZS48L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+RWZmaWNpZW50IHByb2R1Y3Rpb24gYnVpbGRzPC9zdHJvbmc+LiBJbiBwcm9kdWN0aW9uIG1vZGUsIGRldmVsb3BtZW50LXRpbWUgZmVhdHVyZXMgYXJlIGRpc2FibGVkLCBhbmQgdGhlIDxjb2RlPndlYnBhY2s8L2NvZGU+IGJ1aWxkIHRvb2wgcHJvZHVjZXMgbWluaWZpZWQgc3RhdGljIENTUyBhbmQgSmF2YVNjcmlwdCBmaWxlcy48L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+U2VydmVyLXNpZGUgcHJlcmVuZGVyaW5nPC9zdHJvbmc+LiBUbyBvcHRpbWl6ZSBzdGFydHVwIHRpbWUsIHlvdXIgUmVhY3QgYXBwbGljYXRpb24gaXMgZmlyc3QgcmVuZGVyZWQgb24gdGhlIHNlcnZlci4gVGhlIGluaXRpYWwgSFRNTCBhbmQgc3RhdGUgaXMgdGhlbiB0cmFuc2ZlcnJlZCB0byB0aGUgYnJvd3Nlciwgd2hlcmUgY2xpZW50LXNpZGUgY29kZSBwaWNrcyB1cCB3aGVyZSB0aGUgc2VydmVyIGxlZnQgb2ZmLjwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL0hvbWUudHN4IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDU1NQcm9wZXJ0aWVzIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvbWVQYWdlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50PGFueSwgYW55PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogJ2dyYXknLCBoZWlnaHQ6ICczMDBweCcgfX0+PC9kaXY+O1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZVBhZ2UuQ29tcG9uZW50LnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTmF2TWVudSB9IGZyb20gJy4vTmF2TWVudSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lci1mbHVpZCc+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cnPlxyXG4gICAgICAgICAgICAgICAgPE5hdk1lbnUgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cnPlxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9MYXlvdXQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZMaW5rLCBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2TWVudSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21haW4tbmF2Jz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXZiYXIgbmF2YmFyLWludmVyc2UnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXZiYXItaGVhZGVyJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzTmFtZT0nbmF2YmFyLXRvZ2dsZScgZGF0YS10b2dnbGU9J2NvbGxhcHNlJyBkYXRhLXRhcmdldD0nLm5hdmJhci1jb2xsYXBzZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3NyLW9ubHknPlRvZ2dsZSBuYXZpZ2F0aW9uPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpY29uLWJhcic+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpY29uLWJhcic+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpY29uLWJhcic+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXZiYXItY29sbGFwc2UgY29sbGFwc2UnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSduYXYgbmF2YmFyLW5hdic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgZXhhY3QgdG89eycvJ30gYWN0aXZlQ2xhc3NOYW1lPSdhY3RpdmUnIGNsYXNzTmFtZT0nbmF2YmFyLWJyYW5kJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmlkZW8gTWVldHVwc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2TGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5FeHBsb3JlPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPkNhbGVuZGFyPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayB0bz17Jy9jb3VudGVyJ30gYWN0aXZlQ2xhc3NOYW1lPSdhY3RpdmUnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2dseXBoaWNvbiBnbHlwaGljb24tZWR1Y2F0aW9uJz48L3NwYW4+IENvdW50ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIHRvPXsnL2ZldGNoZGF0YSd9IGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdnbHlwaGljb24gZ2x5cGhpY29uLXRoLWxpc3QnPjwvc3Bhbj4gRmV0Y2ggZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2TGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9J25hdiBuYXZiYXItbmF2IG5hdmJhci1yaWdodCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9BY2NvdW50L0V4dGVybmFsTG9naW5cIj5Mb2dpbjwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9OYXZNZW51LnRzeCIsImltcG9ydCAqIGFzIFdlYXRoZXJGb3JlY2FzdHMgZnJvbSAnLi9XZWF0aGVyRm9yZWNhc3RzJztcclxuaW1wb3J0ICogYXMgQ291bnRlciBmcm9tICcuL0NvdW50ZXInO1xyXG5cclxuLy8gVGhlIHRvcC1sZXZlbCBzdGF0ZSBvYmplY3RcclxuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGlvblN0YXRlIHtcclxuICAgIGNvdW50ZXI6IENvdW50ZXIuQ291bnRlclN0YXRlO1xyXG4gICAgd2VhdGhlckZvcmVjYXN0czogV2VhdGhlckZvcmVjYXN0cy5XZWF0aGVyRm9yZWNhc3RzU3RhdGU7XHJcbn1cclxuXHJcbi8vIFdoZW5ldmVyIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLCBSZWR1eCB3aWxsIHVwZGF0ZSBlYWNoIHRvcC1sZXZlbCBhcHBsaWNhdGlvbiBzdGF0ZSBwcm9wZXJ0eSB1c2luZ1xyXG4vLyB0aGUgcmVkdWNlciB3aXRoIHRoZSBtYXRjaGluZyBuYW1lLiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBuYW1lcyBtYXRjaCBleGFjdGx5LCBhbmQgdGhhdCB0aGUgcmVkdWNlclxyXG4vLyBhY3RzIG9uIHRoZSBjb3JyZXNwb25kaW5nIEFwcGxpY2F0aW9uU3RhdGUgcHJvcGVydHkgdHlwZS5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXJzID0ge1xyXG4gICAgY291bnRlcjogQ291bnRlci5yZWR1Y2VyLFxyXG4gICAgd2VhdGhlckZvcmVjYXN0czogV2VhdGhlckZvcmVjYXN0cy5yZWR1Y2VyXHJcbn07XHJcblxyXG4vLyBUaGlzIHR5cGUgY2FuIGJlIHVzZWQgYXMgYSBoaW50IG9uIGFjdGlvbiBjcmVhdG9ycyBzbyB0aGF0IGl0cyAnZGlzcGF0Y2gnIGFuZCAnZ2V0U3RhdGUnIHBhcmFtcyBhcmVcclxuLy8gY29ycmVjdGx5IHR5cGVkIHRvIG1hdGNoIHlvdXIgc3RvcmUuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXBwVGh1bmtBY3Rpb248VEFjdGlvbj4ge1xyXG4gICAgKGRpc3BhdGNoOiAoYWN0aW9uOiBUQWN0aW9uKSA9PiB2b2lkLCBnZXRTdGF0ZTogKCkgPT4gQXBwbGljYXRpb25TdGF0ZSk6IHZvaWQ7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTM1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvZG9tYWluLXRhc2svaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDMpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSg3MCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=