/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
//import DjeknaNav from "./js/DjeknaView";
import Navigation from "./js/Navigation";
import { Provider } from 'react-redux'
import Store from './js/store/ConfigureStore'

class ViroSample extends Component {
  constructor() {
    super();
  }
  render() {
    console.disableYellowBox = true;
    return(
      <Provider store = {Store}>
        <Navigation />
      </Provider>
    )
  }
}

export default ViroSample
//module.exports = ViroSample
