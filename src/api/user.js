const {
  _,
  uriBuilder,
  validateArgs,
  createPromisedApi,
  createAbstractApi
} = require('./_base')

/**
 * API docs: https://confluence.atlassian.com/bitbucket/user-endpoint-2-0-744527199.html
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts = {})
  const buildUri = uriBuilder('user')

  const localApi = {
    name: 'User',
    /**
     * Get the info for the authenticated user
     */
    get(callback) {
      api.get(
        'user',
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get all the registered emails for the authenticated user
     */
    getEmails(callback) {
      const uri = buildUri('emails')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get email details for email registered to authenticated user
     */
    getEmailDetails(emailAddr, callback) {
      validateArgs('get', arguments, 1)
      const uri = buildUri('emails', emailAddr)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    }
  }

  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'get',
    'getEmails',
    'getEmailDetails'
  ]
}
