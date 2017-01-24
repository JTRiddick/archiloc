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
        var _this2 = this;

        //test
        console.log("sending...", this.nameInput.value, this.typeInput.value);

        //api POST
        $.ajax({
          url: '/api/sheds',
          method: 'POST',
          dataType: 'JSON',
          data: {
            title: this.nameInput.value,
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
          _this2.setState({ error: stat });
        }).done(function (data) {
          console.log('request successful');
          console.log('data: ', data);
          _this2.setState({ lastAdded: data, error: false });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var review;

        if (this.state) {
          if (this.state.lastAdded) {
            review = React.createElement(ReviewData, { info: this.state.lastAdded });

            console.log('returned data in state', this.state.lastAdded);
          }
          if (this.state.error) {
            review = React.createElement(ReviewData, { warning: this.state.error });
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
                  _this3.validateStructure(evt);
                } },
              React.createElement(
                'h4',
                null,
                'Details'
              ),
              React.createElement('input', { placeholder: 'Name', ref: function ref(input) {
                  _this3.nameInput = input;
                } }),
              React.createElement('input', { placeholder: 'Year', ref: function ref(input) {
                  _this3.yearInput = input;
                } }),
              React.createElement('input', { placeholder: 'Architect/Firm', ref: function ref(input) {
                  _this3.archInput = input;
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
                    _this3.typeInput = input;
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
                  _this3.streetInput = input;
                } }),
              React.createElement('input', { placeholder: 'City', ref: function ref(input) {
                  _this3.cityInput = input;
                } }),
              React.createElement('input', { placeholder: 'Country', ref: function ref(input) {
                  _this3.countryInput = input;
                } }),
              React.createElement(
                'button',
                null,
                'Add'
              )
            )
          ),
          review
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
      key: 'render',
      value: function render() {

        var info;

        if (this.props.warning) {

          info = "Error " + JSON.stringify(this.props.warning);
        }

        if (this.props.info) {
          info = React.createElement(
            'ol',
            null,
            React.createElement(
              'li',
              null,
              'Name: ',
              this.props.info.title,
              ' '
            ),
            React.createElement(
              'li',
              null,
              'Year: ',
              this.props.info.year,
              ' '
            ),
            React.createElement(
              'li',
              null,
              'Arch: ',
              this.props.info.arch,
              ' '
            ),
            React.createElement(
              'li',
              null,
              'Type: ',
              this.props.info.type,
              ' '
            ),
            React.createElement(
              'li',
              null,
              'Street: ',
              this.props.info.street,
              ' '
            ),
            React.createElement(
              'li',
              null,
              'City: ',
              this.props.info.city,
              ' '
            ),
            React.createElement(
              'li',
              null,
              'Country: ',
              this.props.info.country,
              ' '
            )
          );
        }

        return React.createElement(
          'div',
          { className: 'review add-structure' },
          React.createElement(
            'h4',
            null,
            ' Saved... '
          ),
          this.info
        );
      }
    }]);

    return ReviewData;
  }(React.Component);

  AL.ReviewData = ReviewData;
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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.AL === undefined) {
  window.AL = {};
}

(function () {
  var ShowAllComponent = function (_React$Component) {
    _inherits(ShowAllComponent, _React$Component);

    function ShowAllComponent() {
      _classCallCheck(this, ShowAllComponent);

      var _this = _possibleConstructorReturn(this, (ShowAllComponent.__proto__ || Object.getPrototypeOf(ShowAllComponent)).call(this));

      _this.state = {
        sites: []
      };
      return _this;
    }

    _createClass(ShowAllComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'populateList',
      value: function populateList(evt) {
        var _this2 = this;

        evt.preventDefault();

        //api get all
        $.ajax({
          url: '/api/sheds',
          method: 'GET',
          dataType: 'JSON'
        }).done(function (data) {
          console.log(data);
          _this2.setState({
            sites: data.sheds
          });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var sitesList = "";

        if (this.state.sites !== []) {
          sitesList = JSON.stringify(this.state.sites);
          // ^ test

        }

        return React.createElement(
          'div',
          { className: 'sites-view' },
          React.createElement(
            'form',
            { onSubmit: function onSubmit(evt) {
                _this3.populateList(evt);
              } },
            React.createElement(
              'button',
              null,
              'Populate'
            )
          ),
          React.createElement(
            'div',
            null,
            sitesList
          )
        );
      }
    }]);

    return ShowAllComponent;
  }(React.Component);

  ;

  var siteViewComponent = function (_React$Component2) {
    _inherits(siteViewComponent, _React$Component2);

    function siteViewComponent() {
      _classCallCheck(this, siteViewComponent);

      return _possibleConstructorReturn(this, (siteViewComponent.__proto__ || Object.getPrototypeOf(siteViewComponent)).call(this));
    }

    _createClass(siteViewComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }]);

    return siteViewComponent;
  }(React.Component);

  AL.ShowAllComponent = ShowAllComponent;
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
      React.createElement(Route, { path: "/test/asd", component: AL.EditorComponent }),
      React.createElement(Route, { path: "/test/all", component: AL.ShowAllComponent })
    )
  );

  ReactDOM.render(router, mountNode);
})();
//# sourceMappingURL=all.js.map
