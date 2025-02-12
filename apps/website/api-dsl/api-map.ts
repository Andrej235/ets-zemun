export type APIMap = {
  openapi: '3.0.1',
  info: { title: 'EtsZemun', version: '1.0' },
  paths: {
    '/auth/login': {
      get: { tags: [ 'Auth' ], responses: { '200': { description: 'OK' } } }
    },
    '/auth/redirect': {
      get: { tags: [ 'Auth' ], responses: { '200': { description: 'OK' } } }
    },
    '/auth/logout': {
      get: { tags: [ 'Auth' ], responses: { '200': { description: 'OK' } } }
    },
    '/auth': {
      get: { tags: [ 'Auth' ], responses: { '200': { description: 'OK' } } }
    },
    '/auth/admin': {
      get: { tags: [ 'Auth' ], responses: { '200': { description: 'OK' } } }
    }
  },
  components: {}
}