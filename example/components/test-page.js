'use strict';

import React from 'react';

export default class TestPage extends React.Component {

  // Step form provides a few form control functions via context
  static contextTypes = {
    nextPage: React.PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="TestPage">
        I am a test page! Weeee!
        <div onClick={ this.context.nextPage.bind(this) }>Button</div>
      </div>
    );
  }
}
