import * as queryString from './query-string'

export default function parseHash(hash) {
  const [ path, query ] = hash.replace(/^#/, '').split('?')
  const params = queryString.parse(query)
  return { path, params }
}
