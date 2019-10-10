'use strict'

import rewiremock from 'rewiremock'
import FakeWebSocket = require('./fake-ws')
import FakeXHR2 = require('./fake-xhr2')

// Test utilities
const xhrUtility = new FakeXHR2()
const wsUtility = new FakeWebSocket('')
wsUtility.close()

rewiremock('xhr2').with(require('./fake-xhr2'))
rewiremock('isomorphic-ws').with(require('./fake-ws'))

rewiremock.enable()


// const Web3 = require('web3')
// import { repuify } from '../../src/src'
// const web3 = repuify(new Web3())

export {
    // web3,
    xhrUtility,
    wsUtility,
}
