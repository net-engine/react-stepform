'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlowForm = function (_React$Component) {
  _inherits(FlowForm, _React$Component);

  _createClass(FlowForm, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        nextPage: this.nextPage.bind(this),
        previousPage: this.previousPage.bind(this),
        setPage: this.setPage.bind(this)
      };
    }

    // All state needs to track is current page


    // we need to give children access to these props so
    // the form pages can modify the page if necessary

  }]);

  function FlowForm(props) {
    _classCallCheck(this, FlowForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlowForm).call(this, props));

    var pagesDisabled = Array(props.children.length).fill(null).map(function (val, i) {
      return i > props.currentPage;
    });

    _this.state = {
      currentPage: _this._checkCurrentPage(props.currentPage || 0),
      pagesDisabled: pagesDisabled,
      formIdentifier: Math.random() // incase we have multiple forms, we need to be able to reference them effectively
    };
    return _this;
  }

  // if currentPage is updated externally, update it here too.


  _createClass(FlowForm, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        currentPage: this._checkCurrentPage(nextProps.currentPage || 0)
      });
    }

    // for external access if necessary

  }, {
    key: 'getPage',
    value: function getPage() {
      return this.state.currentPage;
    }

    // go to next page (available on context)

  }, {
    key: 'nextPage',
    value: function nextPage() {
      var page = this.state.currentPage + 1;

      if (page > this.props.children.length) {
        if (this.props.onFinish) this.props.onFinish();
        return;
      }

      this._changePage(page);
    }

    // go to previous page (available on context)

  }, {
    key: 'previousPage',
    value: function previousPage() {
      var page = this.state.currentPage - 1;

      if (page < 0) return;

      this._changePage(page);
    }

    // go to specific page (available on context)

  }, {
    key: 'setPage',
    value: function setPage(page) {
      var currentPage = this.state.currentPage;


      page = this._checkCurrentPage(page);
      if (page == currentPage) return;

      this._changePage(page);
    }

    // private page change function

  }, {
    key: '_changePage',
    value: function _changePage(page) {
      var _this2 = this;

      page = this._checkCurrentPage(page);
      var pagesDisabled = this.state.pagesDisabled;
      pagesDisabled[page] = false; // enable form control link to page

      this.setState({
        pagesDisabled: pagesDisabled,
        currentPage: page
      }, function () {
        if (_this2.props.onPageChange) _this2.props.onPageChange();
      });
    }

    // basic checking of current page to make sure its not
    // greater than the number of pages or below 0

  }, {
    key: '_checkCurrentPage',
    value: function _checkCurrentPage(page) {
      if (!this.props.children) return 0;
      if (page >= this.props.children.length) return this.props.children.length - 1;
      if (page < 0) return 0;
      return page;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var children = _props.children;
      var pageOrder = _props.pageOrder;
      var pageTitles = _props.pageTitles;
      var transitionName = _props.transitionName;
      var transitionTiming = _props.transitionTiming;
      var className = _props.className;
      var _state = this.state;
      var currentPage = _state.currentPage;
      var formIdentifier = _state.formIdentifier;
      var pagesDisabled = _state.pagesDisabled;

      // get actual page number according to pageOrder

      var pageNumber = pageOrder && pageOrder[currentPage] != undefined ? pageOrder[currentPage] : currentPage;

      // this will give the child access to the flowforms context
      var displayPage = null;
      if (children.length) {
        displayPage = _react2.default.cloneElement(children[pageNumber], {
          context: this.state.context,
          key: pageNumber
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'FlowForm ' + className },
        _react2.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            transitionName: transitionName,
            transitionEnterTimeout: transitionTiming[0],
            transitionLeaveTimeout: transitionTiming[1]
          },
          displayPage
        ),
        _react2.default.createElement(
          'div',
          { className: 'FlowControl' },
          Array(children.length).fill(null).map(function (val, i) {
            return _react2.default.createElement(
              'div',
              { className: 'FlowControl--button', key: formIdentifier + '-' + i },
              _react2.default.createElement('input', {
                id: 'FlowControl-' + formIdentifier + '-' + i,
                name: formIdentifier,
                type: 'radio',
                checked: i == currentPage,
                onChange: _this3._changePage.bind(_this3, i),
                disabled: pagesDisabled[i]
              }),
              _react2.default.createElement(
                'label',
                {
                  htmlFor: 'FlowControl-' + formIdentifier + '-' + i,
                  className: 'FlowControl--button--' + (i == currentPage ? 'active' : '') + (pagesDisabled[i] ? 'disabled' : '')
                },
                _react2.default.createElement('div', { className: 'FlowControl--button-icon' }),
                _react2.default.createElement(
                  'span',
                  { className: 'FlowControl--button-title' },
                  pageTitles && pageTitles[i]
                )
              )
            );
          })
        )
      );
    }
  }]);

  return FlowForm;
}(_react2.default.Component);

FlowForm.defaultProps = {
  currentPage: 0,
  children: [],
  transitionName: "step",
  transitionTiming: [500, 300]
};
FlowForm.propTypes = {
  currentPage: _react2.default.PropTypes.number,
  transitionName: _react2.default.PropTypes.string,
  transitionTiming: _react2.default.PropTypes.array,
  pageOrder: _react2.default.PropTypes.array,
  onPageChange: _react2.default.PropTypes.func,
  onFinish: _react2.default.PropTypes.func,
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string
};
FlowForm.childContextTypes = {
  nextPage: _react2.default.PropTypes.func,
  previousPage: _react2.default.PropTypes.func,
  setPage: _react2.default.PropTypes.func
};
exports.default = FlowForm;
module.exports = exports['default'];
//# sourceMappingURL=StepForm.js.map