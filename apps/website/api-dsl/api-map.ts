export type ApiMap = {
  openapi: '3.0.1',
  info: { title: 'EtsZemun', version: '1.0' },
  paths: {
    '/admin/overview': {
      get: {
        tags: [ 'Admin' ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/AdminOverviewResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/AdminOverviewResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AdminOverviewResponseDto' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/awards': {
      post: {
        tags: [ 'Award' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateAwardRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateAwardRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateAwardRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Award' ],
        parameters: [ { name: 'languageCode', in: 'query', schema: { type: 'string' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/AwardResponseDtoLazyLoadResponse' } }, 'application/json': { schema: { '$ref': '#/components/schemas/AwardResponseDtoLazyLoadResponse' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AwardResponseDtoLazyLoadResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Award' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateAwardRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateAwardRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateAwardRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/awards/translation': {
      post: {
        tags: [ 'Award' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateAwardTranslationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateAwardTranslationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateAwardTranslationRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Award' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateAwardTranslationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateAwardTranslationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateAwardTranslationRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/awards/{id}': {
      delete: {
        tags: [ 'Award' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Award' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/AwardResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/AwardResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AwardResponseDto' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/awards/{awardId}/translation/{languageCode}': {
      delete: {
        tags: [ 'Award' ],
        parameters: [ { name: 'awardId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/awards/admin': {
      get: {
        tags: [ 'Award' ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminAwardResponseDto' } } },
              'application/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminAwardResponseDto' } } },
              'text/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminAwardResponseDto' } } }
            }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/awards/admin/{id}': {
      get: {
        tags: [ 'Award' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/AdminFullAwardResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/AdminFullAwardResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AdminFullAwardResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/profiles': {
      post: {
        tags: [ 'EducationalProfiles' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateEducationalProfileRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateEducationalProfileRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateEducationalProfileRequestDto' } } }
        },
        responses: {
          '201': {
            description: 'Created',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/SimpleEducationalProfileResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/SimpleEducationalProfileResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/SimpleEducationalProfileResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'EducationalProfiles' ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'array', items: { '$ref': '#/components/schemas/SimpleEducationalProfileResponseDto' } } },
              'application/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/SimpleEducationalProfileResponseDto' } } },
              'text/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/SimpleEducationalProfileResponseDto' } } }
            }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'EducationalProfiles' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateEducationalProfileRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateEducationalProfileRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateEducationalProfileRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/profiles/{id}': {
      delete: {
        tags: [ 'EducationalProfiles' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'EducationalProfiles' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/EducationalProfileResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/EducationalProfileResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/EducationalProfileResponseDto' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/profiles/add-subject': {
      patch: {
        tags: [ 'EducationalProfiles' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/AddSubjectRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AddSubjectRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/AddSubjectRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/profiles/remove-subject': {
      patch: {
        tags: [ 'EducationalProfiles' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/RemoveSubjectRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/RemoveSubjectRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/RemoveSubjectRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/profiles/update-subject': {
      patch: {
        tags: [ 'EducationalProfiles' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateProfileSubjectRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateProfileSubjectRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateProfileSubjectRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/profiles/update-name': {
      patch: {
        tags: [ 'EducationalProfiles' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateEducationalProfileNameRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateEducationalProfileNameRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateEducationalProfileNameRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/': {
      head: { tags: [ 'EtsZemun' ], responses: { '200': { description: 'OK' } } }
    },
    '/exams': {
      post: {
        tags: [ 'Exam' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateExamRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateExamRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateExamRequestDto' } } }
        },
        responses: {
          '201': {
            description: 'Created',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ExamResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ExamResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ExamResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Exam' ],
        parameters: [ { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'array', items: { '$ref': '#/components/schemas/ExamResponseDto' } } },
              'application/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/ExamResponseDto' } } },
              'text/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/ExamResponseDto' } } }
            }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Exam' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateExamRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateExamRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateExamRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/exams/{id}': {
      delete: {
        tags: [ 'Exam' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Exam' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ExamResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ExamResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ExamResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/languages': {
      post: {
        tags: [ 'Language' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateLanguageRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateLanguageRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateLanguageRequestDto' } } }
        },
        responses: {
          '201': {
            description: 'Created',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/LanguageResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/LanguageResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/LanguageResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Language' ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'array', items: { '$ref': '#/components/schemas/LanguageResponseDto' } } },
              'application/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/LanguageResponseDto' } } },
              'text/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/LanguageResponseDto' } } }
            }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Language' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateLanguageRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateLanguageRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateLanguageRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/languages/{code}': {
      delete: {
        tags: [ 'Language' ],
        parameters: [ { name: 'code', in: 'path', required: true, schema: { pattern: '^[A-Za-z]*$', type: 'string' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/news/admin': {
      get: {
        tags: [ 'News' ],
        parameters: [ { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminNewsPreviewResponseDto' } } },
              'application/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminNewsPreviewResponseDto' } } },
              'text/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminNewsPreviewResponseDto' } } }
            }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/news/admin/{id}': {
      get: {
        tags: [ 'News' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/AdminNewsResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/AdminNewsResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AdminNewsResponseDto' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/news/admin/{id}/preview': {
      get: {
        tags: [ 'News' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/NewsPreviewResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/NewsPreviewResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/NewsPreviewResponseDto' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/news': {
      post: {
        tags: [ 'News' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateNewsRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateNewsRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateNewsRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      get: {
        tags: [ 'News' ],
        parameters: [ { name: 'languageCode', in: 'query', schema: { type: 'string' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/NewsPreviewResponseDtoLazyLoadResponse' } }, 'application/json': { schema: { '$ref': '#/components/schemas/NewsPreviewResponseDtoLazyLoadResponse' } }, 'text/json': { schema: { '$ref': '#/components/schemas/NewsPreviewResponseDtoLazyLoadResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      put: {
        tags: [ 'News' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateNewsRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateNewsRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateNewsRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/news/translation': {
      post: {
        tags: [ 'News' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateNewsTranslationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateNewsTranslationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateNewsTranslationRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      put: {
        tags: [ 'News' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateNewsTranslationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateNewsTranslationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateNewsTranslationRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/news/{id}': {
      delete: {
        tags: [ 'News' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      get: {
        tags: [ 'News' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/NewsResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/NewsResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/NewsResponseDto' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/news/{newsId}/translation/{languageCode}': {
      delete: {
        tags: [ 'News' ],
        parameters: [ { name: 'newsId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/news/{id}/preview': {
      get: {
        tags: [ 'News' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/NewsPreviewResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/NewsPreviewResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/NewsPreviewResponseDto' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/news/approve/{id}': {
      put: {
        tags: [ 'News' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/news/disapprove/{id}': {
      put: {
        tags: [ 'News' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/qualifications': {
      post: {
        tags: [ 'Qualification' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateQualificationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateQualificationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateQualificationRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Qualification' ],
        parameters: [ { name: 'languageCode', in: 'query', schema: { type: 'string' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'teacherId', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/QualificationResponseDtoLazyLoadResponse' } }, 'application/json': { schema: { '$ref': '#/components/schemas/QualificationResponseDtoLazyLoadResponse' } }, 'text/json': { schema: { '$ref': '#/components/schemas/QualificationResponseDtoLazyLoadResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Qualification' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateQualificationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateQualificationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateQualificationRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/qualifications/translation': {
      post: {
        tags: [ 'Qualification' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateQualificationTranslationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateQualificationTranslationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateQualificationTranslationRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Qualification' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateQualificationTranslationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateQualificationTranslationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateQualificationTranslationRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/qualifications/{id}': {
      delete: {
        tags: [ 'Qualification' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Qualification' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/QualificationResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/QualificationResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/QualificationResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/qualifications/{qualificationId}/translation/{languageCode}': {
      delete: {
        tags: [ 'Qualification' ],
        parameters: [ { name: 'qualificationId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/subjects': {
      post: {
        tags: [ 'Subject' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateSubjectRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateSubjectRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateSubjectRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'languageCode', in: 'query', schema: { type: 'string' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/SimpleSubjectResponseDtoLazyLoadResponse' } }, 'application/json': { schema: { '$ref': '#/components/schemas/SimpleSubjectResponseDtoLazyLoadResponse' } }, 'text/json': { schema: { '$ref': '#/components/schemas/SimpleSubjectResponseDtoLazyLoadResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Subject' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateSubjectRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateSubjectRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateSubjectRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/subjects/translation': {
      post: {
        tags: [ 'Subject' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateSubjectTranslationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateSubjectTranslationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateSubjectTranslationRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Subject' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateSubjectTranslationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateSubjectTranslationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateSubjectTranslationRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/subjects/{id}': {
      delete: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/SubjectResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/SubjectResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/SubjectResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/subjects/{subjectId}/translation/{languageCode}': {
      delete: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'subjectId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/subjects/admin': {
      get: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminSubjectResponseDto' } } },
              'application/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminSubjectResponseDto' } } },
              'text/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminSubjectResponseDto' } } }
            }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/subjects/admin/{id}': {
      get: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/AdminFullSubjectResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/AdminFullSubjectResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AdminFullSubjectResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/teachers': {
      post: {
        tags: [ 'Teacher' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateTeacherRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateTeacherRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateTeacherRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'languageCode', in: 'query', schema: { type: 'string' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'q', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/TeacherResponseDtoLazyLoadResponse' } }, 'application/json': { schema: { '$ref': '#/components/schemas/TeacherResponseDtoLazyLoadResponse' } }, 'text/json': { schema: { '$ref': '#/components/schemas/TeacherResponseDtoLazyLoadResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Teacher' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateTeacherRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateTeacherRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateTeacherRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/teachers/translation': {
      post: {
        tags: [ 'Teacher' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateTeacherTranslationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateTeacherTranslationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateTeacherTranslationRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Teacher' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/UpdateTeacherTranslationRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UpdateTeacherTranslationRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/UpdateTeacherTranslationRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/teachers/{id}': {
      delete: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      get: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/TeacherResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/TeacherResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/TeacherResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/teachers/{teacherId}/translation/{languageCode}': {
      delete: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'teacherId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/teachers/simple': {
      get: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'languageCode', in: 'query', schema: { type: 'string' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'q', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/SimpleTeacherResponseDtoLazyLoadResponse' } }, 'application/json': { schema: { '$ref': '#/components/schemas/SimpleTeacherResponseDtoLazyLoadResponse' } }, 'text/json': { schema: { '$ref': '#/components/schemas/SimpleTeacherResponseDtoLazyLoadResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/teachers/simple/for-subject/{subjectId}': {
      get: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'subjectId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'query', schema: { type: 'string' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/SimpleTeacherResponseDtoLazyLoadResponse' } }, 'application/json': { schema: { '$ref': '#/components/schemas/SimpleTeacherResponseDtoLazyLoadResponse' } }, 'text/json': { schema: { '$ref': '#/components/schemas/SimpleTeacherResponseDtoLazyLoadResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/teachers/admin': {
      get: {
        tags: [ 'Teacher' ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminTeacherResponseDto' } } },
              'application/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminTeacherResponseDto' } } },
              'text/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminTeacherResponseDto' } } }
            }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/teachers/admin/{id}': {
      get: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/AdminFullTeacherResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/AdminFullTeacherResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AdminFullTeacherResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/teachers/subject': {
      post: {
        tags: [ 'Teacher' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/AddSubjectsToTeacherRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AddSubjectsToTeacherRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/AddSubjectsToTeacherRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      },
      put: {
        tags: [ 'Teacher' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/ReplaceTeacherSubjectsRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ReplaceTeacherSubjectsRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/ReplaceTeacherSubjectsRequestDto' } } }
        },
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/teachers/{teacherId}/subject/{subjectId}': {
      delete: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'teacherId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'subjectId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '503': { description: 'Service Unavailable' }
        }
      }
    },
    '/users/register': {
      post: {
        tags: [ 'User' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/RegisterRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/RegisterRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/RegisterRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/me/role': {
      get: {
        tags: [ 'User' ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/UserResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/UserResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UserResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/logout': {
      post: {
        tags: [ 'User' ],
        responses: {
          '200': { description: 'OK' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/login': {
      post: {
        tags: [ 'User' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/LoginRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/LoginRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/LoginRequestDto' } } }
        },
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/UserResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/UserResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/UserResponseDto' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/logged-in-only': {
      get: {
        tags: [ 'User' ],
        responses: {
          '200': { description: 'OK' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/perms-only': {
      get: {
        tags: [ 'User' ],
        responses: {
          '200': { description: 'OK' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/admin-only': {
      get: {
        tags: [ 'User' ],
        responses: {
          '200': { description: 'OK' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/{id}': {
      delete: {
        tags: [ 'User' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/confirm-email': {
      post: {
        tags: [ 'User' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/ConfirmEmailRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ConfirmEmailRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/ConfirmEmailRequestDto' } } }
        },
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/resend-confirmation-email': {
      post: {
        tags: [ 'User' ],
        parameters: [ { name: 'email', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/all': {
      get: {
        tags: [ 'User' ],
        parameters: [ { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'search', in: 'query', schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminUserResponseDto' } } },
              'application/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminUserResponseDto' } } },
              'text/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/AdminUserResponseDto' } } }
            }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/send-reset-password-email': {
      post: {
        tags: [ 'User' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/SendResetPasswordEmailRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/SendResetPasswordEmailRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/SendResetPasswordEmailRequestDto' } } }
        },
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/reset-password': {
      patch: {
        tags: [ 'User' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/ResetPasswordRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ResetPasswordRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/ResetPasswordRequestDto' } } }
        },
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/{id}/set-as-user': {
      patch: {
        tags: [ 'User' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/{id}/set-as-mod': {
      patch: {
        tags: [ 'User' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/users/{id}/set-as-admin': {
      patch: {
        tags: [ 'User' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      AddSubjectRequestDto: { type: 'object', properties: { profileId: { type: 'integer', format: 'int32' }, subjectId: { type: 'integer', format: 'int32' }, perWeek: { type: 'integer', format: 'int32' }, year: { type: 'integer', format: 'int32' }, type: { '$ref': '#/components/schemas/SubjectType' } }, additionalProperties: false },
      AddSubjectsToTeacherRequestDto: {
        type: 'object',
        properties: { teacherId: { type: 'integer', format: 'int32' }, subjectIds: { type: 'array', items: { type: 'integer', format: 'int32' } } },
        additionalProperties: false
      },
      AdminAwardResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, image: { type: 'string' }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, title: { type: 'string' }, description: { type: 'string', nullable: true }, competition: { type: 'string' }, student: { type: 'string' }, translations: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false
      },
      AdminAwardTranslationResponseDto: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string', nullable: true }, competition: { type: 'string' }, student: { type: 'string' } }, additionalProperties: false },
      AdminAwardTranslationResponseDtoTranslationWrapper: { type: 'object', properties: { languageCode: { type: 'string' }, value: { '$ref': '#/components/schemas/AdminAwardTranslationResponseDto' } }, additionalProperties: false },
      AdminFullAwardResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, image: { type: 'string' }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, translations: { type: 'array', items: { '$ref': '#/components/schemas/AdminAwardTranslationResponseDtoTranslationWrapper' } } },
        additionalProperties: false
      },
      AdminFullSubjectResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, translations: { type: 'array', items: { '$ref': '#/components/schemas/AdminFullSubjectTranslationDtoTranslationWrapper' } }, teachers: { type: 'array', items: { '$ref': '#/components/schemas/SimpleTeacherResponseDto' } } },
        additionalProperties: false
      },
      AdminFullSubjectTranslationDto: { type: 'object', properties: { name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      AdminFullSubjectTranslationDtoTranslationWrapper: { type: 'object', properties: { languageCode: { type: 'string' }, value: { '$ref': '#/components/schemas/AdminFullSubjectTranslationDto' } }, additionalProperties: false },
      AdminFullTeacherResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, translations: { type: 'array', items: { '$ref': '#/components/schemas/AdminFullTeacherTranslationResponseDtoTranslationWrapper' } }, email: { type: 'string' }, image: { type: 'string' }, qualifications: { type: 'array', items: { '$ref': '#/components/schemas/AdminQualificationResponseDto' } }, subjects: { type: 'array', items: { '$ref': '#/components/schemas/SimpleSubjectResponseDto' } } },
        additionalProperties: false
      },
      AdminFullTeacherTranslationResponseDto: { type: 'object', properties: { name: { type: 'string' }, title: { type: 'string' }, bio: { type: 'string' } }, additionalProperties: false },
      AdminFullTeacherTranslationResponseDtoTranslationWrapper: { type: 'object', properties: { languageCode: { type: 'string' }, value: { '$ref': '#/components/schemas/AdminFullTeacherTranslationResponseDto' } }, additionalProperties: false },
      AdminNewsPreviewResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, title: { type: 'string' }, description: { type: 'string' }, previewImage: { type: 'string' }, date: { type: 'string', format: 'date' }, isApproved: { type: 'boolean' }, translations: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false
      },
      AdminNewsResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, previewImage: { type: 'string' }, date: { type: 'string', format: 'date' }, isApproved: { type: 'boolean' }, translations: { type: 'array', items: { '$ref': '#/components/schemas/AdminNewsTranslationResponseDtoTranslationWrapper' } } },
        additionalProperties: false
      },
      AdminNewsTranslationResponseDto: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' }, markup: { type: 'string' } }, additionalProperties: false },
      AdminNewsTranslationResponseDtoTranslationWrapper: { type: 'object', properties: { languageCode: { type: 'string' }, value: { '$ref': '#/components/schemas/AdminNewsTranslationResponseDto' } }, additionalProperties: false },
      AdminOverviewResponseDto: {
        type: 'object',
        properties: { newsCount: { type: 'integer', format: 'int32' }, unapprovedNewsCount: { type: 'integer', format: 'int32' }, languagesCount: { type: 'integer', format: 'int32' }, languages: { type: 'array', items: { type: 'string' } }, subjectsCount: { type: 'integer', format: 'int32' }, profilesCount: { type: 'integer', format: 'int32' }, teachersCount: { type: 'integer', format: 'int32' }, awardsCount: { type: 'integer', format: 'int32' }, logins: { type: 'array', items: { '$ref': '#/components/schemas/AdminUserLoginOverviewResponseDto' } } },
        additionalProperties: false
      },
      AdminQualificationResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, teacherId: { type: 'integer', format: 'int32' }, dateObtained: { type: 'string', format: 'date-time' }, translations: { type: 'array', items: { '$ref': '#/components/schemas/AdminQualificationTranslationResponseDtoTranslationWrapper' } } },
        additionalProperties: false
      },
      AdminQualificationTranslationResponseDto: { type: 'object', properties: { name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      AdminQualificationTranslationResponseDtoTranslationWrapper: { type: 'object', properties: { languageCode: { type: 'string' }, value: { '$ref': '#/components/schemas/AdminQualificationTranslationResponseDto' } }, additionalProperties: false },
      AdminSubjectResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, description: { type: 'string' }, teachersCount: { type: 'integer', format: 'int32' }, translations: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false
      },
      AdminTeacherResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, title: { type: 'string' }, image: { type: 'string' }, email: { type: 'string' }, translations: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false
      },
      AdminUserLoginOverviewResponseDto: { type: 'object', properties: { name: { type: 'string' }, role: { type: 'string' }, loginTime: { type: 'string', format: 'date-time' } }, additionalProperties: false },
      AdminUserResponseDto: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, email: { type: 'string' }, role: { type: 'string' }, verified: { type: 'boolean' }, joinedAt: { type: 'string', format: 'date-time' } }, additionalProperties: false },
      AwardResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, image: { type: 'string' }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, title: { type: 'string' }, description: { type: 'string', nullable: true }, competition: { type: 'string' }, student: { type: 'string' } }, additionalProperties: false },
      AwardResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/AwardResponseDto' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      ConfirmEmailRequestDto: { type: 'object', properties: { email: { type: 'string' }, token: { type: 'string' } }, additionalProperties: false },
      CreateAwardRequestDto: {
        type: 'object',
        properties: { image: { type: 'string' }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, translations: { type: 'array', items: { '$ref': '#/components/schemas/CreateAwardTranslationRequestDto' } } },
        additionalProperties: false
      },
      CreateAwardTranslationRequestDto: { type: 'object', properties: { awardId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, title: { type: 'string' }, description: { type: 'string', nullable: true }, competition: { type: 'string' }, student: { type: 'string' } }, additionalProperties: false },
      CreateEducationalProfileRequestDto: { type: 'object', properties: { name: { type: 'string' } }, additionalProperties: false },
      CreateExamRequestDto: {
        type: 'object',
        properties: { startTime: { type: 'string', format: 'date-time' }, cabinet: { type: 'string' }, subjectId: { type: 'integer', format: 'int32' }, commission: { type: 'array', items: { type: 'integer', format: 'int32' } } },
        additionalProperties: false
      },
      CreateLanguageRequestDto: { type: 'object', properties: { code: { type: 'string' }, fullName: { type: 'string' } }, additionalProperties: false },
      CreateNewsRequestDto: {
        type: 'object',
        properties: { previewImage: { type: 'string' }, date: { type: 'string', format: 'date' }, translations: { type: 'array', items: { '$ref': '#/components/schemas/CreateNewsTranslationRequestDto' } } },
        additionalProperties: false
      },
      CreateNewsTranslationRequestDto: { type: 'object', properties: { newsId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' }, markup: { type: 'string' } }, additionalProperties: false },
      CreateProfileSubjectRequestDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, perWeek: { type: 'integer', format: 'int32' }, year: { type: 'integer', format: 'int32' } }, additionalProperties: false },
      CreateQualificationRequestDto: {
        type: 'object',
        properties: { teacherId: { type: 'integer', format: 'int32' }, dateObtained: { type: 'string', format: 'date-time' }, translations: { type: 'array', items: { '$ref': '#/components/schemas/CreateQualificationTranslationRequestDto' } } },
        additionalProperties: false
      },
      CreateQualificationTranslationRequestDto: { type: 'object', properties: { qualificationId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      CreateSubjectRequestDto: {
        type: 'object',
        properties: { translations: { type: 'array', items: { '$ref': '#/components/schemas/CreateSubjectTranslationRequestDto' } }, teachers: { type: 'array', items: { type: 'integer', format: 'int32' } } },
        additionalProperties: false
      },
      CreateSubjectTranslationRequestDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      CreateTeacherRequestDto: {
        type: 'object',
        properties: { email: { type: 'string' }, image: { type: 'string' }, translations: { type: 'array', items: { '$ref': '#/components/schemas/CreateTeacherTranslationRequestDto' } } },
        additionalProperties: false
      },
      CreateTeacherTranslationRequestDto: { type: 'object', properties: { teacherId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, title: { type: 'string' }, bio: { type: 'string' } }, additionalProperties: false },
      EducationalProfileResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, generalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/ProfileSubjectResponseDto' } }, vocationalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/ProfileSubjectResponseDto' } } },
        additionalProperties: false
      },
      ExamResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, startTime: { type: 'string', format: 'date-time' }, cabinet: { type: 'string' }, subject: { '$ref': '#/components/schemas/SimpleSubjectResponseDto' }, commission: { type: 'array', items: { '$ref': '#/components/schemas/SimpleTeacherResponseDto' } } },
        additionalProperties: false
      },
      LanguageResponseDto: { type: 'object', properties: { code: { type: 'string' }, fullName: { type: 'string' } }, additionalProperties: false },
      LoginRequestDto: { type: 'object', properties: { username: { type: 'string' }, password: { type: 'string' } }, additionalProperties: false },
      NewsPreviewResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, title: { type: 'string' }, description: { type: 'string' }, previewImage: { type: 'string' }, date: { type: 'string', format: 'date' }, isApproved: { type: 'boolean' } }, additionalProperties: false },
      NewsPreviewResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/NewsPreviewResponseDto' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      NewsResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, title: { type: 'string' }, markup: { type: 'string' }, isApproved: { type: 'boolean' } }, additionalProperties: false },
      ProblemDetails: { type: 'object', properties: { type: { type: 'string', nullable: true }, title: { type: 'string', nullable: true }, status: { type: 'integer', format: 'int32', nullable: true }, detail: { type: 'string', nullable: true }, instance: { type: 'string', nullable: true } }, additionalProperties: {} },
      ProfileSubjectResponseDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, subject: { '$ref': '#/components/schemas/SimpleSubjectResponseDto' }, perWeek: { type: 'integer', format: 'int32' }, year: { type: 'integer', format: 'int32' } }, additionalProperties: false },
      QualificationResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, teacherId: { type: 'integer', format: 'int32' }, dateObtained: { type: 'string', format: 'date-time' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      QualificationResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/QualificationResponseDto' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      RegisterRequestDto: { type: 'object', properties: { username: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' } }, additionalProperties: false },
      RemoveSubjectRequestDto: { type: 'object', properties: { profileId: { type: 'integer', format: 'int32' }, subjectId: { type: 'integer', format: 'int32' }, type: { '$ref': '#/components/schemas/SubjectType' } }, additionalProperties: false },
      ReplaceTeacherSubjectsRequestDto: {
        type: 'object',
        properties: { teacherId: { type: 'integer', format: 'int32' }, subjectIds: { type: 'array', items: { type: 'integer', format: 'int32' } } },
        additionalProperties: false
      },
      ResetPasswordRequestDto: { type: 'object', properties: { email: { type: 'string' }, token: { type: 'string' }, newPassword: { type: 'string' } }, additionalProperties: false },
      SendResetPasswordEmailRequestDto: { type: 'object', properties: { email: { type: 'string' } }, additionalProperties: false },
      SimpleEducationalProfileResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, yearsCount: { type: 'integer', format: 'int32' } }, additionalProperties: false },
      SimpleSubjectResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      SimpleSubjectResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/SimpleSubjectResponseDto' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      SimpleTeacherResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, title: { type: 'string' } }, additionalProperties: false },
      SimpleTeacherResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/SimpleTeacherResponseDto' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      SubjectResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, description: { type: 'string' }, teachers: { '$ref': '#/components/schemas/TeacherResponseDtoLazyLoadResponse' } }, additionalProperties: false },
      SubjectType: { enum: [ 'Vocational', 'General' ], type: 'string' },
      TeacherResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, title: { type: 'string' }, bio: { type: 'string' }, email: { type: 'string' }, image: { type: 'string' }, startOfOpenOfficeHoursFirstShift: { type: 'string', format: 'time', nullable: true }, startOfOpenOfficeHoursSecondShift: { type: 'string', format: 'time', nullable: true }, qualifications: { type: 'array', items: { '$ref': '#/components/schemas/QualificationResponseDto' } }, subjects: { type: 'array', items: { '$ref': '#/components/schemas/SimpleSubjectResponseDto' } } },
        additionalProperties: false
      },
      TeacherResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/TeacherResponseDto' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      UpdateAwardRequestDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, image: { type: 'string' }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, translations: { type: 'array', items: { '$ref': '#/components/schemas/UpdateAwardTranslationRequestDto' } } },
        additionalProperties: false
      },
      UpdateAwardTranslationRequestDto: { type: 'object', properties: { awardId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, title: { type: 'string' }, description: { type: 'string', nullable: true }, competition: { type: 'string' }, student: { type: 'string' } }, additionalProperties: false },
      UpdateEducationalProfileNameRequestDto: { type: 'object', properties: { profileId: { type: 'integer', format: 'int32' }, newName: { type: 'string' } }, additionalProperties: false },
      UpdateEducationalProfileRequestDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, generalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/CreateProfileSubjectRequestDto' } }, vocationalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/CreateProfileSubjectRequestDto' } } },
        additionalProperties: false
      },
      UpdateExamRequestDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, startTime: { type: 'string', format: 'date-time' }, cabinet: { type: 'string' }, subjectId: { type: 'integer', format: 'int32' }, commission: { type: 'array', items: { type: 'integer', format: 'int32' } } },
        additionalProperties: false
      },
      UpdateLanguageRequestDto: { type: 'object', properties: { oldCode: { type: 'string' }, newCode: { type: 'string' }, fullName: { type: 'string' } }, additionalProperties: false },
      UpdateNewsRequestDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, previewImage: { type: 'string' }, date: { type: 'string', format: 'date' }, translations: { type: 'array', items: { '$ref': '#/components/schemas/UpdateNewsTranslationRequestDto' } } },
        additionalProperties: false
      },
      UpdateNewsTranslationRequestDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' }, markup: { type: 'string' } }, additionalProperties: false },
      UpdateProfileSubjectRequestDto: { type: 'object', properties: { profileId: { type: 'integer', format: 'int32' }, subjectId: { type: 'integer', format: 'int32' }, currentType: { '$ref': '#/components/schemas/SubjectType' }, newPerWeek: { type: 'integer', format: 'int32' }, newYear: { type: 'integer', format: 'int32' }, newType: { '$ref': '#/components/schemas/SubjectType' } }, additionalProperties: false },
      UpdateQualificationRequestDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, dateObtained: { type: 'string', format: 'date-time' }, translations: { type: 'array', items: { '$ref': '#/components/schemas/UpdateQualificationTranslationRequestDto' } } },
        additionalProperties: false
      },
      UpdateQualificationTranslationRequestDto: { type: 'object', properties: { qualificationId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      UpdateSubjectRequestDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, translations: { type: 'array', items: { '$ref': '#/components/schemas/UpdateSubjectTranslationRequestDto' } }, teachers: { type: 'array', items: { type: 'integer', format: 'int32' } } },
        additionalProperties: false
      },
      UpdateSubjectTranslationRequestDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      UpdateTeacherRequestDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, email: { type: 'string' }, image: { type: 'string' }, startOfOpenOfficeHoursFirstShift: { type: 'string', format: 'time', nullable: true }, startOfOpenOfficeHoursSecondShift: { type: 'string', format: 'time', nullable: true } }, additionalProperties: false },
      UpdateTeacherTranslationRequestDto: { type: 'object', properties: { teacherId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, title: { type: 'string' }, bio: { type: 'string' } }, additionalProperties: false },
      UserResponseDto: { type: 'object', properties: { username: { type: 'string' }, email: { type: 'string' }, role: { type: 'string' }, emailConfirmed: { type: 'boolean' } }, additionalProperties: false }
    }
  }
}