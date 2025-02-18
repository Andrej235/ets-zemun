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
    },
    '/award': {
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      get: {
        tags: [ 'Award' ],
        parameters: [ { name: 'languageId', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/AwardResponseDtoLazyLoadResponse' } }, 'application/json': { schema: { '$ref': '#/components/schemas/AwardResponseDtoLazyLoadResponse' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AwardResponseDtoLazyLoadResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/award/translation': {
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/award/{id}': {
      get: {
        tags: [ 'Award' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageId', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/AwardResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/AwardResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/AwardResponseDto' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      delete: {
        tags: [ 'Award' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/award/{awardId}/translation/{languageId}': {
      delete: {
        tags: [ 'Award' ],
        parameters: [ { name: 'awardId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/profile': {
      post: {
        tags: [ 'EducationalProfiles' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/CreateEducationalProfileRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/CreateEducationalProfileRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/CreateEducationalProfileRequestDto' } } }
        },
        responses: {
          '201': { description: 'Created' },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      get: {
        tags: [ 'EducationalProfiles' ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'array', items: { '$ref': '#/components/schemas/EducationalProfileResponseDto' } } },
              'application/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/EducationalProfileResponseDto' } } },
              'text/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/EducationalProfileResponseDto' } } }
            }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/profile/{id}': {
      get: {
        tags: [ 'EducationalProfiles' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/EducationalProfileResponseDto' } }, 'application/json': { schema: { '$ref': '#/components/schemas/EducationalProfileResponseDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/EducationalProfileResponseDto' } } }
          },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      delete: {
        tags: [ 'EducationalProfiles' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/language': {
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/language/{id}': {
      delete: {
        tags: [ 'Language' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/qualification': {
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      get: {
        tags: [ 'Qualification' ],
        parameters: [ { name: 'languageId', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'teacherId', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/QualificationResponseDtoLazyLoadResponse' } }, 'application/json': { schema: { '$ref': '#/components/schemas/QualificationResponseDtoLazyLoadResponse' } }, 'text/json': { schema: { '$ref': '#/components/schemas/QualificationResponseDtoLazyLoadResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/qualification/translation': {
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/qualification/{id}': {
      get: {
        tags: [ 'Qualification' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageId', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      delete: {
        tags: [ 'Qualification' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/qualification/{qualificationId}/translation/{languageId}': {
      delete: {
        tags: [ 'Qualification' ],
        parameters: [ { name: 'qualificationId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/subject': {
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      get: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'languageId', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'array', items: { '$ref': '#/components/schemas/SubjectResponseDto' } } },
              'application/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/SubjectResponseDto' } } },
              'text/json': { schema: { type: 'array', items: { '$ref': '#/components/schemas/SubjectResponseDto' } } }
            }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/subject/translation': {
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/subject/{id}': {
      get: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageId', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      delete: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/subject/{subjectId}/translation/{languageId}': {
      delete: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'subjectId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/teacher': {
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      get: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'languageId', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'subjectId', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/TeacherResponseDtoLazyLoadResponse' } }, 'application/json': { schema: { '$ref': '#/components/schemas/TeacherResponseDtoLazyLoadResponse' } }, 'text/json': { schema: { '$ref': '#/components/schemas/TeacherResponseDtoLazyLoadResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
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
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/teacher/translation': {
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/teacher/{id}': {
      get: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageId', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      },
      delete: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/teacher/{teacherId}/translation/{languageId}': {
      delete: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'teacherId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/teacher/subject': {
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/teacher/{teacherId}/subject/{subjectId}': {
      delete: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'teacherId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'subjectId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } } ],
        responses: {
          '204': { description: 'No Content' },
          '404': {
            description: 'Not Found',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      AddSubjectsToTeacherRequestDto: {
        type: 'object',
        properties: { teacherId: { type: 'integer', format: 'int32' }, subjectIds: { type: 'array', items: { type: 'integer', format: 'int32' }, nullable: true } },
        additionalProperties: false
      },
      AwardResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, image: { type: 'string', nullable: true }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, title: { type: 'string', nullable: true }, description: { type: 'string', nullable: true }, competition: { type: 'string', nullable: true }, student: { type: 'string', nullable: true }, teacher: { '$ref': '#/components/schemas/TeacherResponseDto' }, teacherId: { type: 'integer', format: 'int32', nullable: true } }, additionalProperties: false },
      AwardResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/AwardResponseDto' }, nullable: true }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      CreateAwardRequestDto: { type: 'object', properties: { image: { type: 'string', nullable: true }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, teacherId: { type: 'integer', format: 'int32', nullable: true }, translation: { '$ref': '#/components/schemas/CreateAwardTranslationRequestDto' } }, additionalProperties: false },
      CreateAwardTranslationRequestDto: { type: 'object', properties: { awardId: { type: 'integer', format: 'int32' }, languageId: { type: 'integer', format: 'int32' }, title: { type: 'string', nullable: true }, description: { type: 'string', nullable: true }, competition: { type: 'string', nullable: true }, student: { type: 'string', nullable: true } }, additionalProperties: false },
      CreateEducationalProfileRequestDto: {
        type: 'object',
        properties: { generalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/CreateProfileSubjectRequestDto' }, nullable: true }, vocationalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/CreateProfileSubjectRequestDto' }, nullable: true } },
        additionalProperties: false
      },
      CreateLanguageRequestDto: { type: 'object', properties: { code: { type: 'string', nullable: true }, fullName: { type: 'string', nullable: true } }, additionalProperties: false },
      CreateProfileSubjectRequestDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, perWeek: { type: 'integer', format: 'int32' } }, additionalProperties: false },
      CreateQualificationRequestDto: { type: 'object', properties: { teacherId: { type: 'integer', format: 'int32' }, dateObtained: { type: 'string', format: 'date-time' }, translation: { '$ref': '#/components/schemas/CreateQualificationTranslationRequestDto' } }, additionalProperties: false },
      CreateQualificationTranslationRequestDto: { type: 'object', properties: { qualificationId: { type: 'integer', format: 'int32' }, languageId: { type: 'integer', format: 'int32' }, name: { type: 'string', nullable: true }, description: { type: 'string', nullable: true } }, additionalProperties: false },
      CreateSubjectRequestDto: { type: 'object', properties: { languageId: { type: 'integer', format: 'int32' }, name: { type: 'string', nullable: true }, description: { type: 'string', nullable: true } }, additionalProperties: false },
      CreateSubjectTranslationRequestDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, languageId: { type: 'integer', format: 'int32' }, name: { type: 'string', nullable: true }, description: { type: 'string', nullable: true } }, additionalProperties: false },
      CreateTeacherRequestDto: { type: 'object', properties: { email: { type: 'string', nullable: true }, image: { type: 'string', nullable: true }, translation: { '$ref': '#/components/schemas/CreateTeacherTranslationRequestDto' } }, additionalProperties: false },
      CreateTeacherTranslationRequestDto: { type: 'object', properties: { teacherId: { type: 'integer', format: 'int32' }, languageId: { type: 'integer', format: 'int32' }, name: { type: 'string', nullable: true }, title: { type: 'string', nullable: true }, bio: { type: 'string', nullable: true } }, additionalProperties: false },
      EducationalProfileResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, generalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/ProfileSubjectResponseDto' }, nullable: true }, vocationalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/ProfileSubjectResponseDto' }, nullable: true } },
        additionalProperties: false
      },
      LanguageResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, code: { type: 'string', nullable: true }, fullName: { type: 'string', nullable: true } }, additionalProperties: false },
      ProblemDetails: { type: 'object', properties: { type: { type: 'string', nullable: true }, title: { type: 'string', nullable: true }, status: { type: 'integer', format: 'int32', nullable: true }, detail: { type: 'string', nullable: true }, instance: { type: 'string', nullable: true } }, additionalProperties: {} },
      ProfileSubjectResponseDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, subject: { '$ref': '#/components/schemas/SimpleSubjectResponseDto' }, perWeek: { type: 'integer', format: 'int32' } }, additionalProperties: false },
      QualificationResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, teacherId: { type: 'integer', format: 'int32' }, dateObtained: { type: 'string', format: 'date-time' }, name: { type: 'string', nullable: true }, description: { type: 'string', nullable: true } }, additionalProperties: false },
      QualificationResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/QualificationResponseDto' }, nullable: true }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      SimpleSubjectResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string', nullable: true } }, additionalProperties: false },
      SubjectResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string', nullable: true }, description: { type: 'string', nullable: true }, teachers: { '$ref': '#/components/schemas/TeacherResponseDtoLazyLoadResponse' } }, additionalProperties: false },
      TeacherResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string', nullable: true }, title: { type: 'string', nullable: true }, bio: { type: 'string', nullable: true }, email: { type: 'string', nullable: true }, image: { type: 'string', nullable: true }, startOfOpenOfficeHoursFirstShift: { type: 'string', format: 'time', nullable: true }, startOfOpenOfficeHoursSecondShift: { type: 'string', format: 'time', nullable: true }, qualifications: { type: 'array', items: { '$ref': '#/components/schemas/QualificationResponseDto' }, nullable: true }, subjects: { type: 'array', items: { '$ref': '#/components/schemas/SimpleSubjectResponseDto' }, nullable: true } },
        additionalProperties: false
      },
      TeacherResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/TeacherResponseDto' }, nullable: true }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      UpdateAwardRequestDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, image: { type: 'string', nullable: true }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, teacherId: { type: 'integer', format: 'int32', nullable: true } }, additionalProperties: false },
      UpdateAwardTranslationRequestDto: { type: 'object', properties: { awardId: { type: 'integer', format: 'int32' }, languageId: { type: 'integer', format: 'int32' }, title: { type: 'string', nullable: true }, description: { type: 'string', nullable: true }, competition: { type: 'string', nullable: true }, student: { type: 'string', nullable: true } }, additionalProperties: false },
      UpdateEducationalProfileRequestDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, generalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/CreateProfileSubjectRequestDto' }, nullable: true }, vocationalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/CreateProfileSubjectRequestDto' }, nullable: true } },
        additionalProperties: false
      },
      UpdateQualificationTranslationRequestDto: { type: 'object', properties: { qualificationId: { type: 'integer', format: 'int32' }, languageId: { type: 'integer', format: 'int32' }, name: { type: 'string', nullable: true }, description: { type: 'string', nullable: true } }, additionalProperties: false },
      UpdateSubjectTranslationRequestDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, languageId: { type: 'integer', format: 'int32' }, name: { type: 'string', nullable: true }, description: { type: 'string', nullable: true } }, additionalProperties: false },
      UpdateTeacherRequestDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, email: { type: 'string', nullable: true }, image: { type: 'string', nullable: true }, startOfOpenOfficeHoursFirstShift: { type: 'string', format: 'time', nullable: true }, startOfOpenOfficeHoursSecondShift: { type: 'string', format: 'time', nullable: true } }, additionalProperties: false },
      UpdateTeacherTranslationRequestDto: { type: 'object', properties: { teacherId: { type: 'integer', format: 'int32' }, languageId: { type: 'integer', format: 'int32' }, name: { type: 'string', nullable: true }, title: { type: 'string', nullable: true }, bio: { type: 'string', nullable: true } }, additionalProperties: false }
    }
  }
}