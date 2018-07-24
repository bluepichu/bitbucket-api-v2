const {
  _,
  log,
  handleError,
  buildUri,
  fluid,
  createPromisedApi,
  createAbstractApi,
  validateArgs
} = require('./_base')

/**
 * API doc: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts)

  const localApi = {

    /**
     * get all repo commits
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    getAll(username, repoSlug, callback) {
      validateArgs('getAll', arguments, 2)
      const uri = buildUri(username, repoSlug)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

  /**
     * get a single repo commit
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} node (SHA-1) of the commit
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D
     */
    get(username, repoSlug, node, callback) {
      validateArgs('get', arguments, 3)
      const uri = buildUri(username, repoSlug, "node", node)
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
    'getAll'
  ]
}
