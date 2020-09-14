const assert = require('assert').strict

import * as urllib from 'urllib'

export class Meta {
  constructor(
    readonly serverUrl: string,
    readonly appId: string,
    readonly clusterName: string = 'default',
    readonly namespaceNames: string[] = ['application'],
    readonly releaseKey?: string,
    readonly clientIp?: string
  ) {}
}

export async function getConfig(meta: Meta): Promise<Object> {
  assert(meta, 'apollo meta is required')
  const options: urllib.RequestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    rejectUnauthorized: true,
    contentType: 'json',
    dataType: 'json'
  }

  const uris = constructUris(meta)
  const bundle = await Promise.all(uris.map(uri => urllib.request(uri, options)))

  for (let res of bundle) {
    console.log(res)
    // assert 作用，没有抛出异常
    assert(res.status === 200, 'request apollo config failed, http status: ' + res.status)
  }

  return mergeConfigs(bundle)
}

function mergeConfigs(configs: any[]): Object {
  const confs = configs.map(pl => pl.data)
  return Object.assign({}, ...confs)
}

function constructUris(meta: Meta): string[] {
  const { serverUrl, appId, clusterName, namespaceNames, releaseKey, clientIp } = { ...meta }

  return namespaceNames.map(n => url(n))

  function url(namespace: string): string {
    if (clientIp) {
      return `${serverUrl}/configfiles/json/${appId}/${clusterName}/${namespace}?releaseKey=${releaseKey}&ip=${clientIp}`
    } else {
      return `${serverUrl}/configfiles/json/${appId}/${clusterName}/${namespace}?releaseKey=${releaseKey}`
    }
  }
}
