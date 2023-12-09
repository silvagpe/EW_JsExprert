const {readFile} = require('fs/promises')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
    maxLines : 3,
    fields : ['id','name','profession','age']
}