import * as client from '../src/index'

describe('Basic Test', () => {
  it('one namesapce', done => {
    const apolloMeta = new client.Meta('http://one', 'mock-appId')

    client
      .getConfig(apolloMeta)
      .then(json => {
        const expected = { a: 0, b: 1 }
        expect(json).toEqual(expected)
        done()
      })
      .catch(e => console.log(e))
  })

  it('two namespaces', done => {
    const apolloMeta = new client.Meta(
      'http://two',
      'mock-appId',
      ['application', 'common'],
      'default'
    )

    client
      .getConfig(apolloMeta)
      .then(json => {
        const expected = { a: -1, b: 2, c: 3 }
        expect(json).toEqual(expected)
        done()
      })
      .catch(e => console.log(e))
  })

  it('http response 404', done => {
    const meta = new client.Meta('bad url', 'mock appId')
    client.getConfig(meta).catch(e => {
      expect(e.message).toBe('request apollo config failed, http status: 404')
      done()
    })
  })

  it('meta containing clientIp', done => {
    const apolloMeta = new client.Meta(
      'http://xxx',
      'mock-appId',
      ['application'],
      '',
      '',
      'mock-clientIp'
    )

    client
      .getConfig(apolloMeta)
      .then(json => {
        const expected = { a: -1, c: 3 }
        expect(json).toEqual(expected)
        done()
      })
      .catch(e => console.log(e))
  })
})
