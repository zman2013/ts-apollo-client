# @zman2013/ts-apollo-client

[![Build Status](https://github.com/zman2013/ts-apollo-client/workflows/Build%20and%20Release/badge.svg)](https://github.com/zman2013/ts-apollo-client/workflows/Build%20and%20Release/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/zman2013/ts-apollo-client/badge.svg?branch=master)](https://coveralls.io/github/zman2013/ts-apollo-client?branch=master)
[![npm](https://img.shields.io/npm/v/@zman2013/ts-apollo-client.svg)](https://www.npmjs.com/package/@zman2013/ts-apollo-client/)

> A TypeScript implementation of a client for Apollo([https://github.com/ctripcorp/apollo](https://github.com/ctripcorp/apollo)), the reliable configuration management system.

## Usage

```bash
npm install ts-apollo-client
```

### example1
```typescript
import * as client from 'ts-apollo-client'

const meta = new client.Meta('http://xxx', 'appId')
client.getConfig(meta).then(json => console.log(json))
```
### example2 - multiple namespaces
```typescript
import * as client from '@zman2013/ts-apollo-client'

const meta = new client.Meta('http://xxx', 'appId', ['application', 'common'])
client.getConfig(meta).then(json => console.log(json))
```

## Github
[https://github.com/zman2013/ts-apollo-client](https://github.com/zman2013/ts-apollo-client)