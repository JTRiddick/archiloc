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

      _this.state = { editMode: false };

      AL.ControlObject.registerCallback(function () {
        _this.setState({
          lastAdded: AL.ControlObject.sendData
        });
      });

      console.log('added callbacks', AL.ControlObject.cbSuccess, AL.ControlObject.cbFail);

      return _this;
    }

    _createClass(AddEditComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        console.log('mounting with params, ', this.props.params);
        if (this.props.params.sId && !this.state.editMode) {
          this.setState({
            editMode: true
          });
          AL.ControlObject.getStructById(this.props.params.sId);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        console.log('unmount');
        AL.ControlObject.resetControl();
      }
    }, {
      key: 'sendToViewer',
      value: function sendToViewer() {
        ReactRouter.hashHistory.push('/test/all');
      }
    }, {
      key: 'validateStructure',
      value: function validateStructure(evt) {
        evt.preventDefault();
        console.log("state check", this.state);
        //validate conditions here

        // this.submitStructure(evt);

        // input to control object
        var inputs = {
          title: this.nameInput.value,
          type: this.typeInput.value,
          year: this.yearInput.value,
          arch: this.archInput.value,
          street: this.streetInput.value,
          city: this.cityInput.value,
          country: this.countryInput.value
        };

        //edit?
        console.log('inputs?', inputs);
        if (this.state.editMode) {
          AL.ControlObject.editItem(this.props.params.sId, inputs);
        } else {
          AL.ControlObject.addItem(inputs);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        console.log('@render, state set to ', this.state);
        var review;
        var fields;

        //field placeholders
        var name = "Name";
        var year = "Year of Construction/Completion";
        var arch = "Architect/Firm";
        var type = "Cultural";
        var street = "Street";
        var city = "City, State";
        var country = "Country";

        if (this.state) {
          console.log('last added/edit', this.state.lastAdded);
          if (this.state.lastAdded) {
            review = React.createElement(ReviewData, { info: this.state.lastAdded });
            if (this.state.editMode) {
              name = this.state.lastAdded.title;
              year = this.state.lastAdded.year || 'Add Year';
              arch = this.state.lastAdded.arch;
              type = this.state.lastAdded.type;
              street = this.state.lastAdded.street;
              city = this.state.lastAdded.city;
              country = this.state.lastAdded.country;
            }

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
                    _this2.sendToViewer();
                  } },
                ' Show All '
              )
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
              React.createElement('input', { placeholder: name, ref: function ref(input) {
                  _this2.nameInput = input;
                } }),
              React.createElement('input', { placeholder: year, ref: function ref(input) {
                  _this2.yearInput = input;
                } }),
              React.createElement('input', { placeholder: arch, ref: function ref(input) {
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
                { defaultValue: type, ref: function ref(input) {
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
              React.createElement('input', { placeholder: street, ref: function ref(input) {
                  _this2.streetInput = input;
                } }),
              React.createElement('input', { placeholder: city, ref: function ref(input) {
                  _this2.cityInput = input;
                } }),
              React.createElement('input', { placeholder: country, ref: function ref(input) {
                  _this2.countryInput = input;
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
          info
        );
      }
    }]);

    return ReviewData;
  }(React.Component);

  AL.ReviewData = ReviewData;
  AL.AddEditComponent = AddEditComponent;
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
          { className: 'app-component' },
          this.props.children
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

  window.AL.ControlObject = {
    mapMarkers: [],
    locationObjects: [],
    sendData: sendData,
    callbacks: [],
    registerCallback: function registerCallback(cb) {
      this.callbacks.push(cb);
    },
    callbacksEdit: function callbacksEdit() {
      var _this = this;

      this.callbacks.forEach(function (cb) {
        console.log("this.sendData", _this.sendData);
        cb();
        console.log('callback');
      });
    },
    resetControl: function resetControl() {
      this.callbacks = [];
      this.sendData = {};
    },

    getAll: function getAll() {
      var _this2 = this;

      console.log('gettin everything');
      //api get all
      $.ajax({
        url: '/api/sheds',
        method: 'GET',
        dataType: 'JSON'
      }).done(function (data) {
        console.log("done, recieved: \n ", data, "type of", typeof data === 'undefined' ? 'undefined' : _typeof(data));
        _this2.sendData = data;
        _this2.locationObjects = data;
        console.log('get done.');
        _this2.callbacksEdit();
        console.log('grabbd everything', data);
      }).fail(function () {
        console.log('cant get');
      });
    }, //end of get all

    getStructById: function getStructById(itemId) {
      var _this3 = this;

      $.ajax({
        url: '/api/sheds/' + itemId,
        method: 'GET',
        dataType: 'JSON'
      }).done(function (data) {
        console.log("found ", data);
        _this3.sendData = data;
        _this3.callbacksEdit();
        console.log('control callbacks test, callbacks are done ', _this3.callbacks);
      }).fail(function (req, stat, err) {
        console.log('failed to get req,', req);
        _this3.sendData = (req, stat, err);
        _this3.callbacksEdit();
        //??
      });
    },
    deleteItem: function deleteItem(itemId) {
      var _this4 = this;

      $.ajax({
        url: '/api/sheds/' + itemId + "/delete",
        method: 'DELETE',
        dataType: 'JSON'
      }).done(function (data) {
        console.log('callbacksEdit', _this4.callbacksEdit);
        console.log('deleted, ', data);
        _this4.sendData = data;
        _this4.callbacksEdit();
      }).fail(function (req, stat, err) {
        console.log('delete failure');
        _this4.sendData = (req, stat, err);
        _this4.callbacksEdit();
      });
    }, //end of delete
    addItem: function addItem(inputs) {
      var _this5 = this;

      //test
      console.log("sending...", inputs.name, inputs.type);

      //api POST NEW
      $.ajax({
        url: '/api/sheds',
        method: 'POST',
        dataType: 'JSON',
        data: {
          title: inputs.title,
          type: inputs.type,
          year: inputs.year,
          arch: inputs.arch,
          street: inputs.street,
          city: inputs.city,
          country: inputs.country
        }

      }).fail(function (req, stat, error) {
        // window.alert('no');
        console.log('request unsucessful');
        console.log("req", req);
        console.log("stat", stat);
        console.log("err", error);
        _this5.sendData = (req, stat, error);
        _this5.callbacksEdit();
      }).done(function (data) {
        console.log('request successful');
        console.log('data: ', data);
        _this5.sendData = data;
        _this5.callbacksEdit();
      });
    }, //end of addItem
    editItem: function editItem(itemId, inputs) {
      var _this6 = this;

      $.ajax({
        url: '/api/sheds/' + itemId + '/edit',
        method: 'PUT',
        dataType: 'JSON',
        data: {
          title: inputs.title,
          type: inputs.type,
          year: inputs.year,
          arch: inputs.arch,
          street: inputs.street,
          city: inputs.city,
          country: inputs.country
        }
      }).fail(function (req, stat, error) {
        // window.alert('no');
        console.log('request unsucessful');
        console.log("req", req);
        console.log("stat", stat);
        console.log("err", error);
        _this6.sendData = (req, stat, err);
        _this6.callbacksEdit();
      }).done(function (data) {
        console.log('request successful');
        console.log('data: ', data);
        _this6.sendData = data;
        _this6.callbacksEdit();
      });
    }, //end of editor
    mapOneItem: function mapOneItem(itemId) {
      var _this7 = this;

      // AL.ControlObject.registerCallback(()=>{
      //   console.log('geocoding');
      //   // this.geoCode(this.sendData);
      // });

      $.ajax({
        url: '/api/sheds/' + itemId + '/view-map',
        method: 'GET',
        dataType: 'JSON'
      }).done(function (data) {
        console.log("found ", data);
        ReactRouter.hashHistory.push('/map/view-one/' + itemId);
        // this.sendData = data;
        // this.callbacksEdit();
      }).fail(function (req, stat, err) {
        console.log('failed to get req,', req);
        _this7.sendData = (req, stat, err);
        _this7.callbacksEdit();
        //??
      });
    } };
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
    defaultView: { lat: 15, lng: -80 },
    mapZoom: 10
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
        findingOne: false
      };
      var locationToGeocoder;
      var geoCode;

      return _this;
    }

    _createClass(MapComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        if (this.props.params.sId) {
          console.log('only,', this.props.params.sId);
          this.setState({
            findingOne: true
          });
          AL.ControlObject.registerCallback(function () {
            AL.mapData.locations.push(AL.ControlObject.sendData);
          });
        } else {
          console.log('showing maximum stuff');
          console.log('fill mapdata locations list with', AL.ControlObject.sendData);
          AL.ControlObject.registerCallback(function () {
            return AL.ControlObject.sendData.sheds.forEach(function (item) {
              AL.mapData.locations.push(item);
            });
          });
        }

        //moves control data to list
        AL.ControlObject.registerCallback(function () {
          return _this2.locationToGeocoder(AL.mapData.locations);
        });
        //registers callback to geocode (then locate and mark) points of interest
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.googleMap = new google.maps.Map(this.map, {
          center: this.state.focus,
          zoom: this.state.zoom
        });

        this.marker = new google.maps.Marker({
          lat: 30,
          lng: 30
        });

        this.geocoder = new google.maps.Geocoder();

        if (!this.state.findingOne) {
          AL.ControlObject.getAll();
        } else {
          AL.ControlObject.getStructById(this.props.params.sId);
        }

        //sets mapdata locations and triggers callback to run geo+location
        console.log(this.map, this.geocoder);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        AL.ControlObject.resetControl();
      }

      //

    }, {
      key: 'geoCode',
      value: function geoCode(itemId, map) {
        var _this3 = this;

        var handleResults;
        //check for item id or obj
        console.log('GEOCODE', itemId);
        this.geocoder.geocode({ 'address': itemId.street }, handleResults = function handleResults(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            console.log('geo code this check', _this3.map);
            _this3.googleMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              title: itemId.title
            });

            _this3.markMap(_this3.googleMap, marker, itemId);
            return;
          }
          return;
        });
      }
    }, {
      key: 'locationToGeocoder',
      value: function locationToGeocoder(addresses) {
        var _this4 = this;

        console.log('locationToGeocoder says this is', addresses);
        addresses.forEach(function (address) {
          if (AL.mapData.markers.indexOf(address) < 0) {
            _this4.geoCode(address, _this4.map);
          }
        });
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

        marker.addListener('click', function () {
          infowindow.open(_this5.map, marker);
          _this5.setState({
            showSite: item,
            infoClass: 'aif',
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
            mapClass: 'center'
          });
          mapRef.setZoom(AL.mapData.mapZoom);
        });

        AL.mapData.markers.push(marker);

        if (this.state.findingOne === true) {
          console.log('and its..,', this.props.params.sId);

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
      key: 'selectFocus',
      value: function selectFocus(sId) {
        console.log(AL.mapData.markers);

        //test^
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
          info = React.createElement(InfoComponent, { showSite: this.state.showSite });
        }

        return React.createElement(
          'div',
          { id: 'map-component' },
          React.createElement(
            'div',
            { className: 'component-header' },
            React.createElement(
              'h1',
              null,
              'ArchiLocator \'97'
            ),
            React.createElement(
              'p',
              null,
              React.createElement(
                'i',
                null,
                'How Much does your Building Weigh?'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'component-inner' },
            React.createElement(
              'div',
              { className: infoClass },
              info
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

      return _possibleConstructorReturn(this, (InfoComponent.__proto__ || Object.getPrototypeOf(InfoComponent)).call(this));
    }

    _createClass(InfoComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setState({
          info: this.props.showSite
        });
      }
    }, {
      key: 'render',
      value: function render() {

        return React.createElement(
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
              this.state.info.city,
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
          )
        );
      }
    }]);

    return InfoComponent;
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
      value: function componentDidMount() {
        var _this2 = this;

        AL.ControlObject.registerCallback(function () {
          _this2.setState({
            sites: AL.ControlObject.sendData.sheds
          });
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        AL.ControlObject.resetControl();
      }
    }, {
      key: 'populateList',
      value: function populateList() {
        //reset

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
        console.log(this.state.sites);
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
        AL.ControlObject.resetControl();
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
                this.props.info.city
              ),
              React.createElement(
                'li',
                null,
                this.props.info.country
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
              'div',
              { className: 'button' },
              React.createElement(
                ReactRouter.Link,
                { className: 'link', to: "/test/asd/" + editLinkId + "/edit" },
                'edit'
              )
            ),
            React.createElement(
              'div',
              { className: 'button', onClick: function onClick() {
                  AL.ControlObject.mapOneItem(_this5.state.info.id);
                } },
              'view'
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
      React.createElement(Route, { path: "/test/all", component: AL.ShowAllComponent })
    )
  );

  ReactDOM.render(router, mountNode);
})();
//# sourceMappingURL=all.js.map
