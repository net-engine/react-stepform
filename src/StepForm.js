'use strict';

import React                   from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class StepForm extends React.Component {

  static defaultProps = {
    currentPage:    0,
    children:       [],
    transitionName: "step",
    transitionTiming: [500, 300]
  }

  static propTypes = {
    currentPage:    React.PropTypes.number,
    transitionName: React.PropTypes.string,
    transitionTiming: React.PropTypes.array,
    pageOrder:      React.PropTypes.array,
    onPageChange:   React.PropTypes.func,
    onFinish:       React.PropTypes.func,
    children:       React.PropTypes.any,
    className:      React.PropTypes.string
  }


  // we need to give children access to these props so
  // the form pages can modify the page if necessary
  static childContextTypes = {
    nextPage:     React.PropTypes.func,
    previousPage: React.PropTypes.func,
    setPage:      React.PropTypes.func
  }

  getChildContext() {
    return { 
      nextPage:     this.nextPage.bind(this),
      previousPage: this.previousPage.bind(this),
      setPage:      this.setPage.bind(this)
    };
  }


  // All state needs to track is current page
  constructor(props) {
    super(props);

    let pagesDisabled = Array(props.children.length).fill(null).map((val, i) => {
      return i > props.currentPage;
    });

    this.state = {
      currentPage: this._checkCurrentPage(props.currentPage || 0),
      pagesDisabled: pagesDisabled,
      formIdentifier: Math.random() // incase we have multiple forms, we need to be able to reference them effectively
    };
  }


  // if currentPage is updated externally, update it here too.
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPage: this._checkCurrentPage(nextProps.currentPage || 0)
    });
  }


  // for external access if necessary
  getPage() {
    return this.state.currentPage;
  }


  // go to next page (available on context)
  nextPage() {
    let page = this.state.currentPage + 1;

    if (page > this.props.children.length) {
      if (this.props.onFinish) this.props.onFinish();
      return;
    }
    
    this._changePage(page);
  }


  // go to previous page (available on context)
  previousPage() {
    let page = this.state.currentPage - 1;

    if (page < 0) return;

    this._changePage(page);
  }


  // go to specific page (available on context)
  setPage(page) {
    const { currentPage } = this.state;

    page = this._checkCurrentPage(page);
    if (page == currentPage) return;

    this._changePage(page);
  }


  // private page change function
  _changePage(page) {
    page = this._checkCurrentPage(page)
    let pagesDisabled       = this.state.pagesDisabled;
        pagesDisabled[page] = false; // enable form control link to page

    this.setState({
      pagesDisabled:  pagesDisabled,
      currentPage:    page
    }, () => {
      if (this.props.onPageChange) this.props.onPageChange();
    });
  }

  // basic checking of current page to make sure its not
  // greater than the number of pages or below 0
  _checkCurrentPage(page) {
    if (!this.props.children) return 0;
    if (page >= this.props.children.length) return this.props.children.length - 1;
    if (page < 0) return 0;
    return page;
  }


  render() {

    const { children, pageOrder, pageTitles, 
            transitionName, transitionTiming, className } = this.props;
    const { currentPage, formIdentifier, pagesDisabled }  = this.state;

    // get actual page number according to pageOrder
    const pageNumber  = (pageOrder && pageOrder[currentPage] != undefined) ? pageOrder[currentPage] : currentPage;

    // this will give the child access to the stepforms context
    let displayPage = null;
    if (children.length) {
      displayPage = React.cloneElement(children[pageNumber], {
        context: this.state.context,
        key: pageNumber
      });
    }

    return (
      <div className={ `StepForm ${ className }` }>
        {/* who doesnt love animations? */}
        <ReactCSSTransitionGroup
          transitionName={ transitionName }
          transitionEnterTimeout={ transitionTiming[0] }
          transitionLeaveTimeout={ transitionTiming[1] }
        >
          { displayPage }
        </ReactCSSTransitionGroup>

        <div className="StepControl">
          { Array(children.length).fill(null).map((val, i) => {
            return (
              <div className="StepControl--button" key={ `${ formIdentifier }-${ i }` }>
                <input 
                  id={ `StepControl-${ formIdentifier }-${ i }` }
                  name={ formIdentifier }
                  type="radio"
                  checked={ i == currentPage }
                  onChange={ this._changePage.bind(this, i) }
                  disabled={ pagesDisabled[i] }
                />
                <label 
                  htmlFor={ `StepControl-${ formIdentifier }-${ i }` }
                  className={ `StepControl--button--${ (i == currentPage) ? 'active' : '' }${ pagesDisabled[i] ? 'disabled' : '' }` }
                >
                  <div className="StepControl--button-icon"></div>
                  <span className="StepControl--button-title">{ (pageTitles && pageTitles[i]) }</span>
                </label>
              </div>
            )
          }) }
        </div>
      </div>
    );
  }
}
