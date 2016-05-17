var React     = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var expect    = require('expect');

import StepForm from '../src/StepForm';

describe('StepForm', function() {

  context('when no children present', function () {
    var main = TestUtils.renderIntoDocument(<StepForm />);
    
    it('renders without problems', function () {
      expect(main).toExist();
    });

  });

  context('when children are present:', function () {
    var currentPage = 0;
    var main = TestUtils.renderIntoDocument((
      <StepForm currentPage={ currentPage }>
        <div className="page page0"></div>
        <div className="page page1"></div>
        <div className="page page2"></div>
      </StepForm>
    ));

    describe('Rendering:', function () {

      it('renders without problems', function() {
        expect(main).toExist();
      });

      it('renders only 1 page', function() {
        var pages = TestUtils.scryRenderedDOMComponentsWithClass(main, 'page');
        expect(pages.length).toEqual(1);
      });

      it('renders page 0 if currentPage is null', function() {
        var currentPageNull = TestUtils.renderIntoDocument((
          <StepForm currentPage={ null }>
            <div className="page page0"></div>
            <div className="page page1"></div>
            <div className="page page2"></div>
          </StepForm>
        ));
        var page = TestUtils.findRenderedDOMComponentWithClass(currentPageNull, 'page0');
        expect(page).toExist();
      });

    });

    describe('Private Methods:', function () {

      describe('_changePage:', function () {

        it('sets current page to value', function() {
          const value = 1;
          main._changePage(value);
          expect(main.state.currentPage).toEqual(value);
        });

      });

      describe('_checkCurrentPage', function() {

        describe('when value is less than number of children and greater than 0:', function () {

          it('sets currentPage to value', function() {
            const value = 1;
            expect(main._checkCurrentPage(value)).toEqual(value);
          });

        });

        describe('when value is greater than number of children:', function () {

          it('sets currentPage to children.length - 1', function() {
            const value = 10;
            expect(main._checkCurrentPage(value)).toEqual(main.props.children.length-1);
          });

        });

        describe('when value is less than 0:', function () {

          it('sets currentPage to 0', function() {
            const value = -10;
            expect(main._checkCurrentPage(value)).toEqual(0);
          });

        });

      });

    });



    describe('Public Methods:', function () {

      describe('nextPage:', function () {

        it('changes page to next page', function() {
          const currentPage = main.state.currentPage;
          main.nextPage();
          expect(main.state.currentPage).toEqual(currentPage + 1);
        });

        it('does not change page if on last page', function() {
          main._changePage(100);
          const currentPage = main.state.currentPage;
          main.nextPage();
          expect(main.state.currentPage).toEqual(currentPage);
        });

      });

      describe('previousPage:', function () {

        it('changes page to previous page', function() {
          const currentPage = main.state.currentPage;
          main.previousPage();
          expect(main.state.currentPage).toEqual(currentPage - 1);
        });

        it('does not change page if on last page', function() {
          main._changePage(-100);
          const currentPage = main.state.currentPage;
          main.previousPage();
          expect(main.state.currentPage).toEqual(currentPage);
        });

      });

      describe('setPage:', function () {

        it('sets current page to value', function() {
          const value = 2;
          main.setPage(value);
          expect(main.state.currentPage).toEqual(value);
        });

        it('enables page visited', function() {
          main.setPage(0);
          main.state.pagesDisabled[2] = true;
          expect(main.state.pagesDisabled).toEqual([false, false, true]);
          const value = 2;
          main.setPage(value);
          expect(main.state.pagesDisabled[value]).toEqual(false);
        });

      });

      main.setPage(0); // return page back to first

    });

  });



  describe('Children Ordered Randomly:', function () {

    var currentPage = 0;
    var main = TestUtils.renderIntoDocument((
      <StepForm currentPage={ currentPage } pageOrder={ [2, 0, 1] }>
        <div className="page page0"></div>
        <div className="page page1"></div>
        <div className="page page2"></div>
      </StepForm>
    ));

    describe('Rendering:', function() {

      it('renders the correct page', function() {
        var page = TestUtils.findRenderedDOMComponentWithClass(main, 'page2');
        expect(page).toExist();
      });

    });

  });

});

describe('StepControl', function() {

  var currentPage = 0;
  var main = TestUtils.renderIntoDocument((
    <StepForm currentPage={ currentPage }>
      <div className="page page0"></div>
      <div className="page page1"></div>
      <div className="page page2"></div>
    </StepForm>
  ));

  describe('Rendering:', function() {

    it('renders correctly', function() {
      var formControl = TestUtils.findRenderedDOMComponentWithClass(main, 'StepControl');
      expect(formControl).toExist();
    });

    it('disables correct radio buttons', function() {
      var disabledButtons = TestUtils.scryRenderedDOMComponentsWithClass(main, 'StepControl--button--disabled');
      expect(disabledButtons.length).toEqual(2);
    });

  });

});
