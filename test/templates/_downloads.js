import {
  method,
  prjConcat,
  projMethod
} from './_base'

const file = 'hello world'

module.exports = {
  apiName: 'components',
  methods: {
    'getAll': method,
    'upload': projMethod(file)
  },
  fluids: [
    'forProject'
  ]
}