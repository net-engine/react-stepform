'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

import StepForm from '../src/StepForm.js';

import TestPage from './components/test-page.js';

ReactDOM.render((
  <StepForm 
    pageOrder={ [4,2,0,1,3] }
    pageTitles={ ['four', 'two', 'zero', 'one', 'three'] }
    currentPage={ 2 } // first page = 0
  >
    <TestPage />
    <div>Page1</div>
    <div>Page2</div>
    <div>Page3</div>
    <div>Page4</div>
  </StepForm>
), document.getElementById('main'));
