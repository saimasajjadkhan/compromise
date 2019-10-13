const makeId = require('./_id')
const parseTerm = require('./parse')
const methods = require('./methods')
const tagMethods = require('./tag')

class Term {
  constructor(text = '') {
    text = String(text)
    let obj = parseTerm(text)
    // the various forms of our text
    this.text = obj.text || ''
    this.clean = obj.clean
    this.reduced = obj.reduced
    this.root = obj.root
    this.implicit = obj.implicit || null

    this.pre = obj.pre || ''
    this.post = obj.post || ''
    this.raw = text.trim()
    this.tags = {}
    this.prev = null
    this.next = null
    this.id = makeId(obj.clean)
    this.isA = 'Term' // easier than .constructor...
    // support alternative matches
    if (obj.alias) {
      this.alias = obj.alias
    }
  }
  /** set the text of the Term to something else*/
  set(str) {
    let obj = parseTerm(str)
    this.text = obj.text
    this.clean = obj.clean
    return this
  }
}

/** create a deep-copy of this term */
Term.prototype.clone = function() {
  let term = new Term(this.text)
  term.pre = this.pre
  term.post = this.post
  term.tags = Object.assign({}, term.tags)
  return term
}

Object.assign(Term.prototype, methods)
Object.assign(Term.prototype, tagMethods)

module.exports = Term
