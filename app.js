'use strict'

const profile = require('./profile.js')

const users = process.argv.slice(2);
users.map(profile.get)
