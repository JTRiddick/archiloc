'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.AL === undefined) {
  window.AL = {};
}

(function () {
  var AddEditComponent = function (_React$Component) {
    _inherits(AddEditComponent, _React$Component);

    function AddEditComponent() {
      _classCallCheck(this, AddEditComponent);

      var _this = _possibleConstructorReturn(this, (AddEditComponent.__proto__ || Object.getPrototypeOf(AddEditComponent)).call(this));

      _this.state = { editMode: false, styles: [], tagMode: false };

      return _this;
    }

    _createClass(AddEditComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        AL.ControlObject.resetControl();
        console.log('mounting with props, ', this.props);
        this.editorCallback = function () {
          _this2.setState({
            lastAdded: AL.ControlObject.sendData
          });
        };

        AL.ControlObject.emitter.on('foundId', this.editorCallback);
        AL.ControlObject.emitter.on('saved', this.editorCallback);

        if (this.props.location.pathname.includes('tag')) {
          this.setState({
            tagMode: true
          });
          AL.ControlObject.getStructById(this.props.params.sId);
        } else if (this.props.params.sId && !this.state.editMode && !this.state.tagMode) {
          this.setState({
            editMode: true
          });
          AL.ControlObject.getStructById(this.props.params.sId);
        } else {
          console.log('standard add mode');
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        console.log('unmounting ASD/editor');
        AL.ControlObject.emitter.off('foundId', this.editorCallback);
        AL.ControlObject.emitter.off('saved', this.editorCallback);
      }
    }, {
      key: 'sendToViewer',
      value: function sendToViewer() {
        ReactRouter.hashHistory.push('/test/all');
      }
    }, {
      key: 'addStyleTag',
      value: function addStyleTag(tag) {
        console.log("tag is", tag.value, 'sId is ', this.props.params.sId);
        if (tag.value.length > 0) {
          AL.ControlObject.setStyleTags(this.props.params.sId, tag.value);
          console.log('tagged');
        } else {
          console.log('tag failed');
        }
      }
    }, {
      key: 'validateStructure',
      value: function validateStructure(evt) {
        evt.preventDefault();
        console.log("state check", this.state);
        //validate conditions here


        // input to control object
        var encodePic = encodeURIComponent(this.picInput.value);
        var inputs = {
          title: this.nameInput.value,
          type: this.typeInput.value,
          year: this.yearInput.value,
          arch: this.archInput.value,
          street: this.streetInput.value,
          cityState: this.cityInput.value,
          country: this.countryInput.value,
          pic: encodePic,
          styles: this.state.styles,
          description: this.descriptionInput.value
        };

        //edit?
        console.log('inputs?', inputs);
        if (this.state.editMode) {
          AL.ControlObject.editItem(this.props.params.sId, inputs);
        } else {
          console.log('adding', inputs);
          AL.ControlObject.addItem(inputs);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        console.log('@render, state set to ', this.state);
        var review;
        var fields;
        //field placeholders
        var name;
        var year;
        var arch;
        var type;
        var street;
        var city;
        var country;
        var styles;
        var description;
        var picUrl;

        if (this.state) {
          console.log('last added/edit', this.state.lastAdded);
          if (this.state.lastAdded) {
            review = React.createElement(ReviewData, { info: this.state.lastAdded });
            console.log('returned data in state', this.state.lastAdded);
          }
          if (this.state.error) {
            review = React.createElement(ReviewData, { warning: (this.state.error, this.state.stat) });
          }
        }

        //set placeholders and defaults if editing

        console.log('last added/edit', this.state.lastAdded);

        if (this.state.lastAdded && this.state.tagMode === "false") {
          console.log('default values \n', this.state);
          this.nameInput.value = this.state.lastAdded.title;
          this.yearInput.value = this.state.lastAdded.year;
          this.archInput.value = this.state.lastAdded.arch;
          this.typeInput.value = this.state.lastAdded.type;
          this.cityInput.value = this.state.lastAdded.cityState;
          this.streetInput.value = this.state.lastAdded.street;
          this.countryInput.value = this.state.lastAdded.country;
          this.picInput.value = decodeURIComponent(this.state.lastAdded.pic);
          this.descriptionInput.value = this.state.lastAdded.description;
        }
        if (this.state.error) {
          review = React.createElement(ReviewData, { warning: (this.state.error, this.state.stat) });
        }
        if (this.state.lastAdded) {
          review = React.createElement(ReviewData, { info: this.state.lastAdded });
          console.log('returned data in state', this.state.lastAdded);
        }

        if (this.state.tagMode) {
          fields = React.createElement(
            'div',
            null,
            React.createElement('hr', null),
            React.createElement(
              'h4',
              null,
              'Styles'
            ),
            React.createElement(
              'div',
              { className: 'styletags' },
              'Adding StyleTags ',
              this.state.styles
            ),
            React.createElement('input', { ref: function ref(input) {
                _this3.styleInput = input;
              } }),
            React.createElement(
              'div',
              { className: 'nav-button', onClick: function onClick() {
                  _this3.addStyleTag(_this3.styleInput);
                } },
              'Add'
            )
          );
        } else {

          fields = React.createElement(
            'form',
            { onSubmit: function onSubmit(evt) {
                _this3.validateStructure(evt);
              } },
            React.createElement(
              'h4',
              null,
              'Details'
            ),
            React.createElement('input', { defaultValue: name, placeholder: 'Name', ref: function ref(input) {
                _this3.nameInput = input;
              } }),
            React.createElement('input', { defaultValue: year, placeholder: 'Year', ref: function ref(input) {
                _this3.yearInput = input;
              } }),
            React.createElement('input', { defaultValue: arch, placeholder: 'Architect/Firm', ref: function ref(input) {
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
              { defaultValue: type, ref: function ref(input) {
                  _this3.typeInput = input;
                } },
              React.createElement(
                'option',
                { value: 'cultural' },
                'Cultural'
              ),
              React.createElement(
                'option',
                { value: 'civic' },
                'Civic'
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
            React.createElement('input', { defaultValue: street, placeholder: 'Street', ref: function ref(input) {
                _this3.streetInput = input;
              } }),
            React.createElement('input', { defaultValue: city, placeholder: 'City', ref: function ref(input) {
                _this3.cityInput = input;
              } }),
            React.createElement('input', { defaultValue: country, placeholder: 'Country', ref: function ref(input) {
                _this3.countryInput = input;
              } }),
            React.createElement('hr', null),
            React.createElement(
              'h4',
              null,
              'Description'
            ),
            React.createElement('textarea', { rows: 5, cols: 120, placeholder: description, defaultValue: description, ref: function ref(input) {
                _this3.descriptionInput = input;
              } }),
            React.createElement('hr', null),
            React.createElement(
              'h4',
              null,
              'Image'
            ),
            React.createElement('input', { defaultValue: 'add a URL', ref: function ref(input) {
                _this3.picInput = input;
              } }),
            React.createElement(
              'button',
              null,
              'Add'
            )
          );
        }

        //set placeholders and defaults if editing


        return React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'add-structure' },
            React.createElement(
              'div',
              { className: 'panel-header' },
              React.createElement(
                'h3',
                { className: 'left' },
                'Add Structure'
              ),
              React.createElement(
                'div',
                { className: 'nav-button view right', onClick: function onClick() {
                    _this3.sendToViewer();
                  } },
                ' Show All '
              )
            ),
            fields
          ),
          review
        );
      }
      //Type and Style should be set to select/dropdown list

    }]);

    return AddEditComponent;
  }(React.Component);
  //end of EditorComponent

  var ReviewData = function (_React$Component2) {
    _inherits(ReviewData, _React$Component2);

    function ReviewData() {
      _classCallCheck(this, ReviewData);

      return _possibleConstructorReturn(this, (ReviewData.__proto__ || Object.getPrototypeOf(ReviewData)).call(this));
    }

    _createClass(ReviewData, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        console.log('review props', this.props);
      }
    }, {
      key: 'render',
      value: function render() {

        var info;

        if (this.props.warning) {
          console.log(this.props.warning);
          info = "Error ", this.props.warning;
        }

        if (this.props.info && !this.props.warning) {
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
              this.props.info.cityState,
              ' '
            ),
            React.createElement(
              'li',
              null,
              'Country: ',
              this.props.info.country,
              ' '
            ),
            React.createElement(
              'li',
              null,
              'Styles: ',
              JSON.stringify(this.props.info.styles),
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
          info
        );
      }
    }]);

    return ReviewData;
  }(React.Component);

  AL.ReviewData = ReviewData;
  AL.AddEditComponent = AddEditComponent;
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
  var AppComponent = function (_React$Component) {
    _inherits(AppComponent, _React$Component);

    function AppComponent() {
      _classCallCheck(this, AppComponent);

      return _possibleConstructorReturn(this, (AppComponent.__proto__ || Object.getPrototypeOf(AppComponent)).apply(this, arguments));
    }

    _createClass(AppComponent, [{
      key: "render",
      value: function render() {
        console.log('rendering app component');
        var blankContent = React.createElement(
          "div",
          { className: "app-content blank" },
          React.createElement(
            "h4",
            null,
            "Use the Navigation Buttons"
          )
        );
        var testBar = React.createElement(
          "div",
          { className: "top-bar nav" },
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              { className: "link", onClick: function onClick() {
                  ReactRouter.hashHistory.push('/map');
                } },
              "Map"
            ),
            React.createElement(
              "li",
              { className: "link", onClick: function onClick() {
                  ReactRouter.hashHistory.push('/test/all');
                } },
              "Admin/Testing"
            ),
            React.createElement(
              "li",
              { className: "link" },
              React.createElement(
                "a",
                { href: "/logout" },
                "LogOut"
              )
            )
          )
        );

        return React.createElement(
          "div",
          { className: "app-component" },
          React.createElement(
            "div",
            { className: "component-header" },
            React.createElement(
              "div",
              { className: "title" },
              React.createElement(
                "h1",
                null,
                "ArchiType '97"
              ),
              React.createElement(
                "p",
                null,
                React.createElement(
                  "i",
                  null,
                  "How Much does your Building Weigh?"
                )
              )
            ),
            testBar
          ),
          console.log('props.children\n', this.props.children),
          this.props.children || ReactRouter.hashHistory.push('/map')
        );
      }
    }]);

    return AppComponent;
  }(React.Component);

  AL.AppComponent = AppComponent;
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (window.AL === undefined) {
  window.AL = {};
}

(function () {
  var ControlObject;
  var sendData;
  var emitter = new Emitter();

  window.AL.ControlObject = {
    mapMarkers: [],
    locationObjects: [],
    sendData: sendData,
    callbacks: [],
    emitter: emitter,
    resetControl: function resetControl() {

      this.callbacks = [];
      this.sendData = {};
      console.log('control data and callbacks cleared');
    },

    getAll: function getAll() {
      var _this = this;

      // if (this.sendData !== undefined) {
      //   this.locationObjects = this.sendData.sites;
      //   emitter.emit('loaded');
      //   return;
      // }

      // console.log('gettin everything');
      //api get all
      $.ajax({
        url: '/api/sites',
        method: 'GET',
        dataType: 'JSON'
      }).done(function (data) {
        console.log("ajax get all done, recieved: \n ", data, "type of", typeof data === 'undefined' ? 'undefined' : _typeof(data));
        _this.sendData = data;
        _this.locationObjects = _this.sendData.sites;
        emitter.emit('loaded');
        // console.log('grabbd everything',data);
      }).fail(function () {
        console.log('cant get');
      });
    }, //end of get all

    getStructById: function getStructById(itemId) {
      var _this2 = this;

      $.ajax({
        url: '/api/sites/' + itemId,
        method: 'GET',
        dataType: 'JSON'
      }).done(function (data) {
        console.log("found ", data);
        _this2.sendData = data;
        emitter.emit('foundId');
        console.log('control callbacks test, callbacks are done ', _this2.callbacks);
      }).fail(function (req, stat, err) {
        console.log('failed to get req,', req);
        _this2.sendData = (req, stat, err);
        emitter.emit('foundId');
        //??
      });
    },
    deleteItem: function deleteItem(itemId) {
      var _this3 = this;

      $.ajax({
        url: '/api/sites/' + itemId + "/delete",
        method: 'DELETE',
        dataType: 'JSON'
      }).done(function (data) {
        console.log('callbacksEdit', _this3.callbacksEdit);
        console.log('deleted, ', data);
        _this3.sendData = data;
        console.log('when deleted, sendData is...', _this3.sendData);
        emitter.emit('deleted');
      }).fail(function (req, stat, err) {
        console.log('delete failure');
        _this3.sendData = (req, stat, err);
        emitter.emit('deleted');
      });
    }, //end of delete
    addItem: function addItem(inputs) {
      var _this4 = this;

      //test
      console.log("sending...", inputs);

      //api POST NEW
      $.ajax({
        url: '/api/sites',
        method: 'POST',
        dataType: 'JSON',
        data: {
          title: inputs.title,
          type: inputs.type,
          year: inputs.year,
          arch: inputs.arch,
          street: inputs.street,
          cityState: inputs.cityState,
          country: inputs.country,
          pic: inputs.pic,
          description: inputs.description
        }

      }).fail(function (req, stat, error) {
        // window.alert('no');
        console.log('request unsucessful');
        console.log("req", req);
        console.log("stat", stat);
        console.log("err", error);
        _this4.sendData = (req, stat, error);
        emitter.emit('saved');
      }).done(function (data) {
        console.log('request successful');
        console.log('data: ', data);
        _this4.sendData = data;
        emitter.emit('saved');
      });
    }, //end of addItem
    editItem: function editItem(itemId, inputs) {
      var _this5 = this;

      $.ajax({
        url: '/api/sites/' + itemId + '/edit',
        method: 'PUT',
        dataType: 'JSON',
        data: {
          title: inputs.title,
          type: inputs.type,
          year: inputs.year,
          arch: inputs.arch,
          street: inputs.street,
          cityState: inputs.cityState,
          country: inputs.country,
          pic: inputs.pic,
          description: inputs.description
        }
      }).fail(function (req, stat, error) {
        // window.alert('no');
        console.log('request unsucessful');
        console.log("req", req);
        console.log("stat", stat);
        console.log("err", error);
        _this5.sendData = (req, stat, err);
        emitter.emit('saved');
      }).done(function (data) {
        console.log('request successful');
        console.log('data: ', data);
        _this5.sendData = data;
        emitter.emit('saved');
      });
    }, //end of editor
    setStyleTags: function setStyleTags(itemId, tags) {
      var _this6 = this;

      console.log('set tags of ', itemId, ' to ', tags);
      $.ajax({
        url: '/api/sites/' + itemId + '/tag',
        method: 'PUT',
        dataType: 'JSON',
        data: {
          styles: tags
        }
      }).fail(function (req, stat, error) {
        // window.alert('no');
        console.log('request unsucessful');
        console.log("req", req);
        console.log("stat", stat);
        console.log("err", error);
        _this6.sendData = (req, stat, err);
        emitter.emit('saved');
      }).done(function (data) {
        console.log('request successful');
        console.log('data: ', data);
        _this6.sendData = data;
        emitter.emit('saved');
      });
    },

    mapOneItem: function mapOneItem(itemId) {
      var _this7 = this;

      $.ajax({
        url: '/api/sites/' + itemId + '/view-map',
        method: 'GET',
        dataType: 'JSON'
      }).done(function (data) {
        console.log("found ", data);
        ReactRouter.hashHistory.push('/map/view-one/' + itemId);
        emitter.emit('mapOne');
      }).fail(function (req, stat, err) {
        console.log('failed to get req,', req);
        _this7.sendData = (req, stat, err);
        emitter.emit('mapOne');
        //??
      });
    }, //end of map one view

    siteGeocode: function siteGeocode(itemRef) {
      var _this8 = this;

      var address = itemRef.street + ' ' + itemRef.cityState + ' ' + itemRef.country;
      var latlng = [0, 0];
      console.log('sending ', address, 'to geocode');
      $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyA5B1QULYYb2uGrGReGKSqsuwxCgXL6pOQ',
        method: 'GET',
        dataType: 'JSON'
      }).done(function (results) {
        console.log('geocoded to', results);
        if (results.status === 'OK') {
          console.log('coordinates are', results.results[0].geometry.location);
          latlng = [results.results[0].geometry.location.lat, results.results[0].geometry.location.lng];
          console.log('coordinates are', latlng);
          console.log('for', itemRef);
          $.ajax({
            url: '/api/sites/' + itemRef.id + '/coordinates',
            method: 'PUT',
            dataType: 'JSON',
            data: {
              coordinate: latlng
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
            _this8.sendData = data;
            emitter.emit('saved');
          });

          emitter.emit('geocoded');
        } else {
          console.log('geocoder failure');
        }
      });
    }

  }; //end of control object
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
  var mapData;
  window.AL.mapData = {
    locations: [],
    markers: [],
    filter: 'none',
    defaultView: { lat: 32.776782, lng: -96.7973409 },
    mapZoom: 14
  };
})();

(function () {
  var MapComponent = function (_React$Component) {
    _inherits(MapComponent, _React$Component);

    function MapComponent() {
      _classCallCheck(this, MapComponent);

      var _this = _possibleConstructorReturn(this, (MapComponent.__proto__ || Object.getPrototypeOf(MapComponent)).call(this));

      _this.state = {
        focus: AL.mapData.defaultView,
        zoom: AL.mapData.mapZoom,
        infoClass: 'oof',
        controlClass: 'low inactive',
        mapClass: 'center',
        showSite: null,
        findingOne: false,
        tag: 'none'
      };

      return _this;
    }

    _createClass(MapComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        console.log('map will mount');

        console.log('map mounted with props', this.props);
        if (this.props.params.sId) {
          //console.log('only,', this.props.params.sId);
          this.setState({
            findingOne: true
          });
          this.mapOneCallback = function () {
            AL.mapData.locations.push(AL.ControlObject.sendData);
            _this2.locationToMapper(AL.mapData.locations);
          };
          AL.ControlObject.emitter.once('foundId', this.mapOneCallback);
        } else {

          console.log('fill mapdata locations list with', AL.ControlObject.sendData);
          this.buildMapCallback = function () {
            AL.ControlObject.locationObjects.forEach(function (item) {
              AL.mapData.locations.push(item);
            });
            _this2.locationToMapper(AL.mapData.locations);
          };
        }
        //^ second block is primary show all

        AL.ControlObject.emitter.on('loaded', this.buildMapCallback);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        console.log('map did mount');
        //reset filter
        this.googleMap = new google.maps.Map(this.map, {
          center: this.state.focus,
          zoom: this.state.zoom
        });

        this.geocoder = new google.maps.Geocoder();

        if (!this.state.findingOne) {
          AL.ControlObject.getAll();
        } else {
          AL.ControlObject.getStructById(this.props.params.sId);
        }

        //sets mapdata locations and triggers callback to run geo+location
        //console.log(this.map,this.geocoder);
        // this.centerOnDevice(this.googleMap);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        console.log('main page unmounted');
        AL.ControlObject.emitter.off('loaded', this.buildMapCallback);
      }

      //defaults

    }, {
      key: 'centerOnDevice',
      value: function centerOnDevice(map) {
        var infoWindow = new google.maps.InfoWindow({ map: map });

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
        }
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
    }, {
      key: 'deselectSite',
      value: function deselectSite(evt, ele) {

        this.setState({
          showSite: null,
          infoClass: 'oof',
          controlClass: 'low inactive',
          mapClass: 'center'
        });
        this.googleMap.setZoom(AL.mapData.mapZoom);
      }
      //master close

    }, {
      key: 'locationToMapper',
      value: function locationToMapper(locations) {
        var _this3 = this;

        console.log('location to geocoder', locations, 'state', this.state.tag);
        var addresses;
        if (AL.mapData.filter == 'none') {
          addresses = locations;
          console.log('locationToMapper says this is', addresses);
          addresses.forEach(function (address) {
            _this3.mapPopulator(address, _this3.map);
          });
        } else {
          var _addresses = locations;
          _addresses.forEach(function (address) {
            console.log('address', address, 'includes', address.styles);
            if (address.styles.includes(AL.mapData.filter)) {
              console.log('filter including', address);
              _this3.mapPopulator(address, _this3.map);
            }
          });
        }
      }
    }, {
      key: 'mapPopulator',
      value: function mapPopulator(itemId, map) {
        var _this4 = this;

        var handleResults;
        //check for item id or obj
        //console.log('GEOCODE',itemId);
        var address = itemId.street + " " + itemId.cityState + " " + itemId.country;
        if (itemId.coordinate[0] === 0 && itemId.coordinate[1] === 0) {
          //are we geocoded?
          this.geocoder.geocode({ 'address': address }, handleResults = function handleResults(results, status) {
            console.log('hi, im geocoding in your mapcomponent', 'geocoder status', status);
            if (status === google.maps.GeocoderStatus.OK) {
              console.log('geo code this check', _this4.map);
              // this.googleMap.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                title: itemId.title
              });

              _this4.markMap(_this4.googleMap, marker, itemId);
              return;
            }
            return;
          });
        } else {
          var siteLatLng = { lat: itemId.coordinate[0], lng: itemId.coordinate[1] };
          var marker = new google.maps.Marker({
            position: siteLatLng,
            title: itemId.title
          });

          this.markMap(this.googleMap, marker, itemId);
          return;
        }
      }

      //^^ Test Geocode

    }, {
      key: 'markMap',
      value: function markMap(mapRef, marker, item) {
        var _this5 = this;

        marker.setMap(mapRef);

        var contentString = '<div id="content">' + '<div class="infobox-title">' + item.title + '</div>' + '<div class="infobox-arch">' + item.arch + '</div>' + '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        //console.log(infowindow, "infowindow");
        //make infowindow


        //Check for service

        marker.addListener('click', function (evt, ele) {
          if (_this5.state.showSite !== null) {
            deselectSite(evt, ele);
          }
          infowindow.open(_this5.map, marker);
          _this5.setState({
            showSite: item,
            infoClass: 'aif',
            controlClass: 'low',
            mapClass: 'two-thirds-map'
          });
          mapRef.setZoom(18);
          mapRef.setCenter(marker.getPosition());
        });
        mapRef.addListener('click', function () {
          infowindow.close(_this5.map, marker);
          _this5.setState({
            showSite: null,
            infoClass: 'oof',
            controlClass: 'low inactive',
            mapClass: 'center'
          });
          mapRef.setZoom(AL.mapData.mapZoom);
        });

        AL.mapData.markers.push(marker);

        if (this.state.findingOne === true) {
          //console.log('and its..,', this.props.params.sId);

          mapRef.setCenter(marker.getPosition());
          infowindow.open(this.map, marker);
          this.setState({
            showSite: item,
            infoClass: 'aif',
            mapClass: 'two-thirds-map'
          });
        }
        return;
      }
    }, {
      key: 'selectFilter',
      value: function selectFilter(filter) {

        this.deselectSite();
        AL.mapData.filter = filter;
        console.log('FILTER SET TO ', AL.mapData.filter);
        AL.mapData.markers.forEach(function (marker) {
          marker.setMap(null);
        });
        AL.mapData.markers = [];
        this.setState({
          tag: filter
        });
        console.log('resending to mapPopulator with filter', filter, 'these', AL.mapData.markers, AL.mapData.locations);
        this.locationToMapper(AL.mapData.locations);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this6 = this;

        console.log('render state', this.state);
        var mapClass = "map-pane " + this.state.mapClass;
        var infoClass = "info-pane " + this.state.infoClass;
        var controlClass = "control-pane-" + this.state.controlClass;

        var info = '';
        var controls = '';

        if (this.state.showSite !== null) {
          info = React.createElement(InfoComponent, { showSite: this.state.showSite, infoboxFilter: function infoboxFilter(filter) {
              _this6.selectFilter(filter);
            } });
          controls = React.createElement(MapControlComponent, { showSite: this.state.showSite });
        }

        return React.createElement(
          'div',
          { id: 'map-component' },
          React.createElement(
            'div',
            { className: 'component-inner' },
            React.createElement(
              'div',
              { className: infoClass },
              React.createElement(
                'div',
                { className: 'close', onClick: function onClick(evt) {
                    _this6.deselectSite(evt);
                  } },
                'X'
              ),
              info,
              React.createElement(
                'div',
                { className: 'filter-controls' },
                React.createElement(
                  'div',
                  { className: 'filter-button reset', onClick: function onClick() {
                      _this6.selectFilter('none');
                    } },
                  React.createElement(
                    'p',
                    null,
                    'Reset Filter'
                  )
                )
              )
            ),
            React.createElement('div', { className: mapClass, ref: function ref(map) {
                _this6.map = map;
              }, style: { height: '440px' } }),
            React.createElement(
              'div',
              { className: controlClass },
              controls
            )
          )
        );
      }
    }]);

    return MapComponent;
  }(React.Component);

  var InfoComponent = function (_React$Component2) {
    _inherits(InfoComponent, _React$Component2);

    function InfoComponent() {
      _classCallCheck(this, InfoComponent);

      var _this7 = _possibleConstructorReturn(this, (InfoComponent.__proto__ || Object.getPrototypeOf(InfoComponent)).call(this));

      var generateTags;

      return _this7;
    }

    _createClass(InfoComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setState({
          info: this.props.showSite,
          tags: this.props.showSite.styles
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this8 = this;

        //console.log("InfoComponent showing ", this.state.info,this.state.tags);

        return React.createElement(
          'div',
          { className: 'info-box' },
          React.createElement(
            'div',
            { className: 'info-box-text' },
            React.createElement(
              'ol',
              null,
              React.createElement(
                'li',
                null,
                React.createElement(
                  'h4',
                  null,
                  this.state.info.title
                ),
                ' '
              ),
              React.createElement(
                'li',
                null,
                this.state.info.street,
                ', ',
                this.state.info.cityState,
                ',',
                this.state.info.country,
                ', '
              ),
              React.createElement(
                'li',
                { className: 'info-type' },
                this.state.info.type,
                ' '
              ),
              React.createElement(
                'li',
                null,
                this.state.info.year,
                ' '
              ),
              React.createElement(
                'li',
                null,
                this.state.info.arch,
                ' '
              )
            ),
            React.createElement(
              'div',
              { className: 'info-box-tags' },
              React.createElement(
                'ul',
                null,
                this.state.tags.map(function (tag, i) {
                  return React.createElement(
                    'li',
                    { key: i, onClick: function onClick(evt) {
                        _this8.props.infoboxFilter(tag);
                      } },
                    tag
                  );
                })
              )
            )
          )
        );
      }
    }]);

    return InfoComponent;
  }(React.Component);

  var MapControlComponent = function (_React$Component3) {
    _inherits(MapControlComponent, _React$Component3);

    function MapControlComponent() {
      _classCallCheck(this, MapControlComponent);

      return _possibleConstructorReturn(this, (MapControlComponent.__proto__ || Object.getPrototypeOf(MapControlComponent)).apply(this, arguments));
    }

    _createClass(MapControlComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (this.props.showSite) {
          this.setState({
            info: this.props.showSite
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        //console.log('controlbox state: ',this.state,' img ',this.state.info.pic);
        return React.createElement(
          'div',
          { className: 'controlbox-content' },
          React.createElement(
            'div',
            { className: 'mapview-image' },
            React.createElement('img', { src: decodeURIComponent(this.state.info.pic) })
          ),
          React.createElement(
            'div',
            { className: 'mapview-desc' },
            React.createElement(
              'p',
              null,
              this.state.info.description || "Stuff here"
            )
          )
        );
      }
    }]);

    return MapControlComponent;
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
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        console.log('show all will mount');

        this.loadedCallback = function () {
          console.log('viewer, loaded callback fired');
          _this2.setState({
            sites: AL.ControlObject.locationObjects
          });
        };

        this.deletedCallback = function () {
          AL.ControlObject.getAll();
        };
        //reload list after a delete to reflect changes


        AL.ControlObject.emitter.on('loaded', this.loadedCallback);
        AL.ControlObject.emitter.on('deleted', this.deletedCallback);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        console.log('show all did mount');
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        console.log('unmounting show all');
        AL.ControlObject.emitter.off('loaded', this.loadedCallback);
        AL.ControlObject.emitter.off('deleted', this.deletedCallback);
      }
    }, {
      key: 'populateList',
      value: function populateList() {
        //reset
        console.log('populate button clicked');
        AL.ControlObject.getAll();
      }
    }, {
      key: 'sendToNewEditor',
      value: function sendToNewEditor() {
        ReactRouter.hashHistory.push('/test/asd');
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var sitesList;
        console.log('state sites', this.state.sites);
        if (this.state.sites && this.state.sites.length > 0) {

          sitesList = this.state.sites.map(function (site, index) {
            return React.createElement(
              'div',
              { className: 'site-info-box', key: index },
              React.createElement(SiteViewComponent, { key: site._id, info: site, del: _this3.deleteItem })
            );
          });
        }

        return React.createElement(
          'div',
          { className: 'sites-view' },
          React.createElement(
            'div',
            { className: 'button load', onClick: function onClick() {
                _this3.populateList();
              } },
            ' LOAD '
          ),
          React.createElement(
            'div',
            { className: 'button load new', onClick: function onClick() {
                _this3.sendToNewEditor();
              } },
            ' ADD '
          ),
          React.createElement(
            'div',
            { className: 'info-boxes-container' },
            React.createElement(
              'ol',
              null,
              sitesList
            )
          )
        );
      }
    }]);

    return ShowAllComponent;
  }(React.Component);

  ;

  var SiteViewComponent = function (_React$Component2) {
    _inherits(SiteViewComponent, _React$Component2);

    function SiteViewComponent() {
      _classCallCheck(this, SiteViewComponent);

      return _possibleConstructorReturn(this, (SiteViewComponent.__proto__ || Object.getPrototypeOf(SiteViewComponent)).call(this));
    }

    _createClass(SiteViewComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        console.log(this, 'viewbox mounted');

        this.setState({
          info: this.props.info
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        console.log(this, 'viewbox unmount');
      }
    }, {
      key: 'tagOneItem',
      value: function tagOneItem(tagSite) {
        console.log('sending to editor to tag ', tagSite);
        ReactRouter.hashHistory.push('/test/asd/' + tagSite + '/tag');
      }
    }, {
      key: 'render',
      value: function render() {
        var _this5 = this;

        var editLinkId;

        if (this.state && this.state.info.id) {
          editLinkId = this.state.info.id;
        }

        return React.createElement(
          'div',
          { className: 'site-inner-box' },
          React.createElement(
            'div',
            { className: 'site-info' },
            React.createElement(
              'ol',
              null,
              React.createElement(
                'li',
                null,
                this.props.info.id
              ),
              React.createElement(
                'li',
                null,
                this.props.info.title
              ),
              React.createElement(
                'li',
                null,
                this.props.info.year
              ),
              React.createElement(
                'li',
                null,
                this.props.info.arch
              ),
              React.createElement(
                'li',
                null,
                this.props.info.type
              ),
              React.createElement(
                'li',
                null,
                this.props.info.street
              ),
              React.createElement(
                'li',
                null,
                this.props.info.cityState
              ),
              React.createElement(
                'li',
                null,
                this.props.info.country
              ),
              React.createElement(
                'li',
                null,
                JSON.stringify(this.props.info.styles)
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'site-controls' },
            React.createElement(
              'div',
              { className: 'button', onClick: function onClick() {
                  AL.ControlObject.deleteItem(_this5.state.info.id);
                } },
              'delete'
            ),
            React.createElement(
              ReactRouter.Link,
              { className: 'link', to: "/test/asd/" + editLinkId + "/edit" },
              React.createElement(
                'div',
                { className: 'button' },
                'edit'
              )
            ),
            React.createElement(
              'div',
              { className: 'button', onClick: function onClick() {
                  _this5.tagOneItem(_this5.state.info.id);
                } },
              'tag'
            ),
            React.createElement(
              'div',
              { className: 'button', onClick: function onClick() {
                  AL.ControlObject.mapOneItem(_this5.state.info.id);
                } },
              'view'
            ),
            React.createElement(
              'div',
              { className: 'button btn-gc', onClick: function onClick() {
                  AL.ControlObject.siteGeocode(_this5.props.info);
                } },
              'GC'
            )
          )
        );
      }
    }]);

    return SiteViewComponent;
  }(React.Component);

  AL.SiteViewComponent = SiteViewComponent;
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

      return _possibleConstructorReturn(this, (TestComponent.__proto__ || Object.getPrototypeOf(TestComponent)).call(this));
    }

    _createClass(TestComponent, [{
      key: "onComponentMount",
      value: function onComponentMount() {}
    }, {
      key: "render",
      value: function render() {
        var links = React.createElement(
          "ol",
          null,
          React.createElement(
            "li",
            null,
            React.createElement(
              ReactRouter.Link,
              { className: "link", to: "/test/asd" },
              "Add"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              ReactRouter.Link,
              { className: "link", to: '/test/all' },
              "Show Collection"
            )
          )
        );
        return React.createElement(
          "div",
          { className: "admin-test" },
          React.createElement(
            "h3",
            null,
            "This is the place where you can break everything"
          ),
          links
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
  var Link = Router.Link;

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
      React.createElement(Route, { path: "/map/view-one/:sId", component: AL.MapComponent }),
      React.createElement(Route, { path: "/test", component: AL.TestComponent }),
      React.createElement(Route, { path: "/test/asd", component: AL.AddEditComponent }),
      React.createElement(Route, { path: "/test/asd/:sId/edit", component: AL.AddEditComponent }),
      React.createElement(Route, { path: "/test/asd/:sId/tag", component: AL.AddEditComponent }),
      React.createElement(Route, { path: "/test/all", component: AL.ShowAllComponent })
    )
  );

  ReactDOM.render(router, mountNode);
})();
//# sourceMappingURL=all.js.map
