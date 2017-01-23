'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.AL === undefined) {
  window.AL = {};
}

(function () {
  var AppComponent = function (_React$Component) {
    _inherits(AppComponent, _React$Component);

    function AppComponent() {
      _classCallCheck(this, AppComponent);

      return _possibleConstructorReturn(this, (AppComponent.__proto__ || Object.getPrototypeOf(AppComponent)).apply(this, arguments));
    }

    _createClass(AppComponent, [{
      key: 'render',
      value: function render() {
        console.log('rendering app component');

        return React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            null,
            'This is the React AppComponent'
          ),
          this.props.children
        );
      }
    }]);

    return AppComponent;
  }(React.Component);

  AL.AppComponent = AppComponent;
})();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.AL === undefined) {
  window.AL = {};
}

(function () {
  var EditorComponent = function (_React$Component) {
    _inherits(EditorComponent, _React$Component);

    function EditorComponent() {
      _classCallCheck(this, EditorComponent);

      return _possibleConstructorReturn(this, (EditorComponent.__proto__ || Object.getPrototypeOf(EditorComponent)).call(this));
    }

    _createClass(EditorComponent, [{
      key: 'validateStructure',
      value: function validateStructure(evt) {
        evt.preventDefault();

        //validate conditions here

        this.submitStructure(evt);
      }
    }, {
      key: 'submitStructure',
      value: function submitStructure(evt) {
        //test
        console.log("sending...", this.nameInput.value, this.typeInput.value);
        var location = {};
        //api POST
        $.ajax({
          url: '/api/sheds',
          method: 'POST',
          dataType: 'JSON',
          data: {
            name: this.nameInput.value,
            type: this.typeInput.value,
            year: this.yearInput.value,
            arch: this.archInput.value,
            street: this.streetInput.value,
            city: this.cityInput.value,
            country: this.countryInput.value
          }

        }).fail(function (req, stat, error) {
          // window.alert('no');
          console.log('request unsucessful');
          console.log("req", req);
          console.log("stat", stat);
          console.log("err", error);
        }).done(function (data) {
          console.log('request successful');
          console.log('data: ', data);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var review;

        if (this.state) {
          if (this.state.data) {
            review = React.createElement(ReviewData, { info: this.state.data });
          }
        }

        return React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'add-structure' },
            React.createElement(
              'h3',
              null,
              'Add Structure'
            ),
            React.createElement('hr', null),
            React.createElement(
              'form',
              { onSubmit: function onSubmit(evt) {
                  _this2.validateStructure(evt);
                } },
              React.createElement(
                'h4',
                null,
                'Details'
              ),
              React.createElement('input', { placeholder: 'Name', ref: function ref(input) {
                  _this2.nameInput = input;
                } }),
              React.createElement('input', { placeholder: 'Year', ref: function ref(input) {
                  _this2.yearInput = input;
                } }),
              React.createElement('input', { placeholder: 'Architect/Firm', ref: function ref(input) {
                  _this2.archInput = input;
                } }),
              React.createElement('hr', null),
              React.createElement(
                'h4',
                null,
                'Categories'
              ),
              React.createElement(
                'select',
                { defaultValue: 'cultural', ref: function ref(input) {
                    _this2.typeInput = input;
                  } },
                React.createElement(
                  'option',
                  { value: 'cultural' },
                  'Cultural'
                ),
                React.createElement(
                  'option',
                  { value: 'residential' },
                  'Residential'
                ),
                React.createElement(
                  'option',
                  { value: 'industrial' },
                  'Industrial'
                ),
                React.createElement(
                  'option',
                  { value: 'commercial' },
                  'Commercial'
                ),
                React.createElement(
                  'option',
                  { value: 'infrastructural' },
                  'Infrastructural'
                )
              ),
              React.createElement('hr', null),
              React.createElement(
                'h4',
                null,
                'Location'
              ),
              React.createElement('input', { placeholder: 'Street', ref: function ref(input) {
                  _this2.streetInput = input;
                } }),
              React.createElement('input', { placeholder: 'City', ref: function ref(input) {
                  _this2.cityInput = input;
                } }),
              React.createElement('input', { placeholder: 'Country', ref: function ref(input) {
                  _this2.countryInput = input;
                } }),
              React.createElement(
                'button',
                null,
                'Add'
              )
            )
          ),
          ' ',
          this.review
        );
      }
      //Type and Style should be set to select/dropdown list

    }]);

    return EditorComponent;
  }(React.Component);
  //end of EditorComponent

  var ReviewData = function (_React$Component2) {
    _inherits(ReviewData, _React$Component2);

    function ReviewData() {
      _classCallCheck(this, ReviewData);

      return _possibleConstructorReturn(this, (ReviewData.__proto__ || Object.getPrototypeOf(ReviewData)).call(this));
    }

    _createClass(ReviewData, [{
      key: 'onComponentMount',
      value: function onComponentMount() {
        this.setState({
          name: this.props.name
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { className: 'review' },
          React.createElement(
            'ol',
            null,
            React.createElement(
              'li',
              null,
              'Name: ',
              this.state.name
            )
          )
        );
      }
    }]);

    return ReviewData;
  }(React.Component);

  AL.EditorComponent = EditorComponent;
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.AL === undefined) {
  window.AL = {};
}

(function () {
  var MapComponent = function (_React$Component) {
    _inherits(MapComponent, _React$Component);

    function MapComponent() {
      _classCallCheck(this, MapComponent);

      return _possibleConstructorReturn(this, (MapComponent.__proto__ || Object.getPrototypeOf(MapComponent)).apply(this, arguments));
    }

    _createClass(MapComponent, [{
      key: "render",
      value: function render() {

        return React.createElement(
          "div",
          null,
          "Map Component"
        );
      }
    }]);

    return MapComponent;
  }(React.Component);

  AL.MapComponent = MapComponent;
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.AL === undefined) {
  window.AL = {};
}

(function () {
  var TestComponent = function (_React$Component) {
    _inherits(TestComponent, _React$Component);

    function TestComponent() {
      _classCallCheck(this, TestComponent);

      return _possibleConstructorReturn(this, (TestComponent.__proto__ || Object.getPrototypeOf(TestComponent)).apply(this, arguments));
    }

    _createClass(TestComponent, [{
      key: "render",
      value: function render() {

        return React.createElement(
          "div",
          null,
          "Test Component"
        );
      }
    }]);

    return TestComponent;
  }(React.Component);

  AL.TestComponent = TestComponent;
})();
"use strict";

if (window.AL === undefined) {
  window.AL = {};
}

(function () {

  var mountNode = document.querySelector('#react-root');

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var router = React.createElement(
    Router,
    { history: ReactRouter.hashHistory },
    React.createElement(
      Route,
      { path: "/", component: AL.AppComponent },
      "ReactRouter.IndexRoute component=",
      AL.MapComponent,
      " />",
      React.createElement(Route, { path: "/map", component: AL.MapComponent }),
      React.createElement(Route, { path: "/test", component: AL.TestComponent }),
      React.createElement(Route, { path: "/test/asd", component: AL.EditorComponent })
    )
  );

  ReactDOM.render(router, mountNode);
})();
//# sourceMappingURL=all.js.map
