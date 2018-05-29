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
     * get all pull requests
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests
     */
    getAll(username, repoSlug, callback) {
      validateArgs('getAll', arguments, 2)
      const uri = buildUri(username, repoSlug, 'pullrequests')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * get a pull request
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests
     */
    get(username, repoSlug, pr_id, callback) {
      validateArgs('get', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * create new pull requests
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} pullRequest description
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests
     *
     * data object:
     *  _body:	The new pull request.
     */
    create(username, repoSlug, pullRequest, callback) {
      validateArgs('create', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests')
      const data = {
        _body: pullRequest
      }
      api.post(
        uri, data, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get paginated list of all PR activitiy
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests
     */
    allActivity(username, repoSlug, callback) {
      validateArgs('deleteSchedule', arguments, 2)
      const uri = buildUri(username, repoSlug, 'pullrequests/activity')
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get activitiy of a PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/activity
     */
    getActivity(username, repoSlug, pr_id, callback) {
      validateArgs('deleteSchedule', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'activity')
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Approve PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve
     */
    approve(username, repoSlug, pr_id, callback) {
      validateArgs('deleteSchedule', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'approve')
      api.post(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Disapprove PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    disApprove(username, repoSlug, pr_id, callback) {
      validateArgs('deleteSchedule', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'approve')
      api.delete(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get comments of a PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    getComments(username, repoSlug, pr_id, callback) {
      validateArgs('getComments', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'comments')
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get comments of a PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     * @param {String} comment id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    getComment(username, repoSlug, pr_id, comment_id, callback) {
      validateArgs('getComment', arguments, 4)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'comments', comment_id)
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },


    /**
     * Get paginated list of commits for PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    getCommits(username, repoSlug, pr_id, callback) {
      validateArgs('getCommits', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'commits')
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Decline PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    decline(username, repoSlug, pr_id, callback) {
      validateArgs('decline', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'decline')
      api.post(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get diff of PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    getDiff(username, repoSlug, pr_id, callback) {
      validateArgs('getDiff', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'diff')
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Merge PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    merge(username, repoSlug, pr_id, callback) {
      validateArgs('merge', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'merge')
      api.post(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Patch PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    patch(username, repoSlug, pr_id, callback) {
      validateArgs('patch', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'patch')
      api.post(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Statuses of PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    statuses(username, repoSlug, pr_id, callback) {
      validateArgs('statuses', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id, 'statuses')
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

     /**
     * Modify a PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     * @param {Object} PR edit object
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D
     */
    modify(username, repoSlug, pr_id, data, callback) {
      validateArgs('modify', arguments, 4)
      const uri = buildUri(username, repoSlug, 'pullrequests', pr_id)
      api.put(
        uri, data, null,
        result.$createListener(callback)
      )
    }
  }

  localApi.forProject = fluid(localApi, 2)
  localApi.forPR = fluid(localApi, 3)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'getAll',
    'get',
    'create',
    'allActivity',
    'getActivity',
    'approve',
    'disApprove',
    'getComments',
    'getComment',
    'getCommits',
    'decline',
    'getDiff',
    'merge',
    'patch',
    'statuses',
    'modify'
  ]
}
