export type APIMap = {
  openapi: '3.0.1',
  info: { title: 'EtsZemun', version: '1.0' },
  paths: {
    '/auth/logout': {
      delete: {
        tags: [ 'Auth' ],
        responses: {
          '204': { description: 'No Content' },
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/auth/change-role': {
      patch: {
        tags: [ 'Auth' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/ChangeRoleRequestDto' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ChangeRoleRequestDto' } }, 'application/*+json': { schema: { '$ref': '#/components/schemas/ChangeRoleRequestDto' } } }
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
          }
        }
      }
    },
    '/auth/admin': {
      get: {
        tags: [ 'Auth' ],
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/award/{awardId}/translation/{languageCode}': {
      delete: {
        tags: [ 'Award' ],
        parameters: [ { name: 'awardId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'path', required: true, schema: { type: 'integer' } } ],
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
        parameters: [ { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/auth/register': {
      post: {
        tags: [ 'EtsZemun' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/RegisterRequest' } } },
          required: true
        },
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'application/problem+json': { schema: { '$ref': '#/components/schemas/HttpValidationProblemDetails' } } }
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: [ 'EtsZemun' ],
        parameters: [ { name: 'useCookies', in: 'query', schema: { type: 'boolean' } }, { name: 'useSessionCookies', in: 'query', schema: { type: 'boolean' } } ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/LoginRequest' } } },
          required: true
        },
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { '$ref': '#/components/schemas/AccessTokenResponse' } } }
          }
        }
      }
    },
    '/auth/refresh': {
      post: {
        tags: [ 'EtsZemun' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/RefreshRequest' } } },
          required: true
        },
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { '$ref': '#/components/schemas/AccessTokenResponse' } } }
          }
        }
      }
    },
    '/auth/confirmEmail': {
      get: { tags: [ 'EtsZemun' ], operationId: 'MapIdentityApi-/auth/confirmEmail', parameters: [ { name: 'userId', in: 'query', required: true, schema: { type: 'string' } }, { name: 'code', in: 'query', required: true, schema: { type: 'string' } }, { name: 'changedEmail', in: 'query', schema: { type: 'string' } } ], responses: { '200': { description: 'OK' } } }
    },
    '/auth/resendConfirmationEmail': {
      post: {
        tags: [ 'EtsZemun' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/ResendConfirmationEmailRequest' } } },
          required: true
        },
        responses: { '200': { description: 'OK' } }
      }
    },
    '/auth/forgotPassword': {
      post: {
        tags: [ 'EtsZemun' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/ForgotPasswordRequest' } } },
          required: true
        },
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'application/problem+json': { schema: { '$ref': '#/components/schemas/HttpValidationProblemDetails' } } }
          }
        }
      }
    },
    '/auth/resetPassword': {
      post: {
        tags: [ 'EtsZemun' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/ResetPasswordRequest' } } },
          required: true
        },
        responses: {
          '200': { description: 'OK' },
          '400': {
            description: 'Bad Request',
            content: { 'application/problem+json': { schema: { '$ref': '#/components/schemas/HttpValidationProblemDetails' } } }
          }
        }
      }
    },
    '/auth/manage/2fa': {
      post: {
        tags: [ 'EtsZemun' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/TwoFactorRequest' } } },
          required: true
        },
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { '$ref': '#/components/schemas/TwoFactorResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'application/problem+json': { schema: { '$ref': '#/components/schemas/HttpValidationProblemDetails' } } }
          },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/auth/manage/info': {
      get: {
        tags: [ 'EtsZemun' ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { '$ref': '#/components/schemas/InfoResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'application/problem+json': { schema: { '$ref': '#/components/schemas/HttpValidationProblemDetails' } } }
          },
          '404': { description: 'Not Found' }
        }
      },
      post: {
        tags: [ 'EtsZemun' ],
        requestBody: {
          content: { 'application/json': { schema: { '$ref': '#/components/schemas/InfoRequest' } } },
          required: true
        },
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { '$ref': '#/components/schemas/InfoResponse' } } }
          },
          '400': {
            description: 'Bad Request',
            content: { 'application/problem+json': { schema: { '$ref': '#/components/schemas/HttpValidationProblemDetails' } } }
          },
          '404': { description: 'Not Found' }
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
    '/language/{code}': {
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
          '429': {
            description: 'Too Many Requests',
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
      },
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
      }
    },
    '/news/{newsId}/translation/{languageCode}': {
      delete: {
        tags: [ 'News' ],
        parameters: [ { name: 'newsId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'path', required: true, schema: { type: 'integer' } } ],
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/qualification/{qualificationId}/translation/{languageCode}': {
      delete: {
        tags: [ 'Qualification' ],
        parameters: [ { name: 'qualificationId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'path', required: true, schema: { type: 'integer' } } ],
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
        parameters: [ { name: 'languageCode', in: 'query', schema: { type: 'string' } } ],
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/subject/{subjectId}/translation/{languageCode}': {
      delete: {
        tags: [ 'Subject' ],
        parameters: [ { name: 'subjectId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'path', required: true, schema: { type: 'integer' } } ],
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
        parameters: [ { name: 'languageCode', in: 'query', schema: { type: 'string' } }, { name: 'offset', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'limit', in: 'query', schema: { type: 'integer', format: 'int32' } }, { name: 'subjectId', in: 'query', schema: { type: 'integer', format: 'int32' } } ],
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
          '429': {
            description: 'Too Many Requests',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          }
        }
      }
    },
    '/teacher/{teacherId}/translation/{languageCode}': {
      delete: {
        tags: [ 'Teacher' ],
        parameters: [ { name: 'teacherId', in: 'path', required: true, schema: { type: 'integer', format: 'int32' } }, { name: 'languageCode', in: 'path', required: true, schema: { type: 'integer' } } ],
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
          '401': {
            description: 'Unauthorized',
            content: { 'text/plain': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'application/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } }, 'text/json': { schema: { '$ref': '#/components/schemas/ProblemDetails' } } }
          },
          '403': {
            description: 'Forbidden',
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
      AccessTokenResponse: { required: [ 'accessToken', 'expiresIn', 'refreshToken' ], type: 'object', properties: { tokenType: { type: 'string', readOnly: true }, accessToken: { type: 'string' }, expiresIn: { type: 'integer', format: 'int64' }, refreshToken: { type: 'string' } }, additionalProperties: false },
      AddSubjectsToTeacherRequestDto: {
        type: 'object',
        properties: { teacherId: { type: 'integer', format: 'int32' }, subjectIds: { type: 'array', items: { type: 'integer', format: 'int32' } } },
        additionalProperties: false
      },
      AwardResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, image: { type: 'string' }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, title: { type: 'string' }, description: { type: 'string', nullable: true }, competition: { type: 'string' }, student: { type: 'string' }, teacher: { '$ref': '#/components/schemas/TeacherResponseDto' }, teacherId: { type: 'integer', format: 'int32', nullable: true } }, additionalProperties: false },
      AwardResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/AwardResponseDto' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      ChangeRoleRequestDto: { required: [ 'role', 'userId' ], type: 'object', properties: { userId: { minLength: 1, type: 'string' }, role: { minLength: 1, type: 'string' } }, additionalProperties: false },
      CreateAwardRequestDto: { type: 'object', properties: { image: { type: 'string' }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, teacherId: { type: 'integer', format: 'int32', nullable: true }, translation: { '$ref': '#/components/schemas/CreateAwardTranslationRequestDto' } }, additionalProperties: false },
      CreateAwardTranslationRequestDto: { type: 'object', properties: { awardId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, title: { type: 'string' }, description: { type: 'string', nullable: true }, competition: { type: 'string' }, student: { type: 'string' } }, additionalProperties: false },
      CreateEducationalProfileRequestDto: {
        type: 'object',
        properties: { generalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/CreateProfileSubjectRequestDto' } }, vocationalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/CreateProfileSubjectRequestDto' } } },
        additionalProperties: false
      },
      CreateLanguageRequestDto: { type: 'object', properties: { code: { type: 'string' }, fullName: { type: 'string' } }, additionalProperties: false },
      CreateNewsRequestDto: {
        type: 'object',
        properties: { previewImage: { type: 'string' }, date: { type: 'string', format: 'date-time' }, translation: { '$ref': '#/components/schemas/CreateNewsTranslationRequestDto' }, images: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false
      },
      CreateNewsTranslationRequestDto: { type: 'object', properties: { newsId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' }, markup: { type: 'string' } }, additionalProperties: false },
      CreateProfileSubjectRequestDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, perWeek: { type: 'integer', format: 'int32' }, year: { type: 'integer', format: 'int32' } }, additionalProperties: false },
      CreateQualificationRequestDto: { type: 'object', properties: { teacherId: { type: 'integer', format: 'int32' }, dateObtained: { type: 'string', format: 'date-time' }, translation: { '$ref': '#/components/schemas/CreateQualificationTranslationRequestDto' } }, additionalProperties: false },
      CreateQualificationTranslationRequestDto: { type: 'object', properties: { qualificationId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      CreateSubjectRequestDto: { type: 'object', properties: { languageCode: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      CreateSubjectTranslationRequestDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      CreateTeacherRequestDto: { type: 'object', properties: { email: { type: 'string' }, image: { type: 'string' }, translation: { '$ref': '#/components/schemas/CreateTeacherTranslationRequestDto' } }, additionalProperties: false },
      CreateTeacherTranslationRequestDto: { type: 'object', properties: { teacherId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, title: { type: 'string' }, bio: { type: 'string' } }, additionalProperties: false },
      EducationalProfileResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, generalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/ProfileSubjectResponseDto' } }, vocationalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/ProfileSubjectResponseDto' } } },
        additionalProperties: false
      },
      ForgotPasswordRequest: { required: [ 'email' ], type: 'object', properties: { email: { type: 'string' } }, additionalProperties: false },
      HttpValidationProblemDetails: {
        type: 'object',
        properties: {
          type: { type: 'string', nullable: true },
          title: { type: 'string', nullable: true },
          status: { type: 'integer', format: 'int32', nullable: true },
          detail: { type: 'string', nullable: true },
          instance: { type: 'string', nullable: true },
          errors: { type: 'object', additionalProperties: { type: 'array', items: { type: 'string' } } }
        },
        additionalProperties: {}
      },
      InfoRequest: { type: 'object', properties: { newEmail: { type: 'string', nullable: true }, newPassword: { type: 'string', nullable: true }, oldPassword: { type: 'string', nullable: true } }, additionalProperties: false },
      InfoResponse: { required: [ 'email', 'isEmailConfirmed' ], type: 'object', properties: { email: { type: 'string' }, isEmailConfirmed: { type: 'boolean' } }, additionalProperties: false },
      LanguageResponseDto: { type: 'object', properties: { code: { type: 'string' }, fullName: { type: 'string' } }, additionalProperties: false },
      LoginRequest: { required: [ 'email', 'password' ], type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' }, twoFactorCode: { type: 'string', nullable: true }, twoFactorRecoveryCode: { type: 'string', nullable: true } }, additionalProperties: false },
      NewsImage: { type: 'object', properties: { newsId: { type: 'integer', format: 'int32' }, imageId: { type: 'integer', format: 'int32' }, image: { type: 'string' } }, additionalProperties: false },
      NewsImageLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/NewsImage' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      NewsPreviewResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, title: { type: 'string' }, description: { type: 'string' }, previewImage: { type: 'string' }, date: { type: 'string', format: 'date-time' } }, additionalProperties: false },
      NewsPreviewResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/NewsPreviewResponseDto' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      NewsResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, markup: { type: 'string' }, images: { '$ref': '#/components/schemas/NewsImageLazyLoadResponse' } }, additionalProperties: false },
      ProblemDetails: { type: 'object', properties: { type: { type: 'string', nullable: true }, title: { type: 'string', nullable: true }, status: { type: 'integer', format: 'int32', nullable: true }, detail: { type: 'string', nullable: true }, instance: { type: 'string', nullable: true } }, additionalProperties: {} },
      ProfileSubjectResponseDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, subject: { '$ref': '#/components/schemas/SimpleSubjectResponseDto' }, perWeek: { type: 'integer', format: 'int32' }, year: { type: 'integer', format: 'int32' } }, additionalProperties: false },
      QualificationResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, teacherId: { type: 'integer', format: 'int32' }, dateObtained: { type: 'string', format: 'date-time' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      QualificationResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/QualificationResponseDto' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      RefreshRequest: { required: [ 'refreshToken' ], type: 'object', properties: { refreshToken: { type: 'string' } }, additionalProperties: false },
      RegisterRequest: { required: [ 'email', 'password' ], type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } }, additionalProperties: false },
      ResendConfirmationEmailRequest: { required: [ 'email' ], type: 'object', properties: { email: { type: 'string' } }, additionalProperties: false },
      ResetPasswordRequest: { required: [ 'email', 'newPassword', 'resetCode' ], type: 'object', properties: { email: { type: 'string' }, resetCode: { type: 'string' }, newPassword: { type: 'string' } }, additionalProperties: false },
      SimpleSubjectResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' } }, additionalProperties: false },
      SubjectResponseDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, description: { type: 'string' }, teachers: { '$ref': '#/components/schemas/TeacherResponseDtoLazyLoadResponse' } }, additionalProperties: false },
      TeacherResponseDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, name: { type: 'string' }, title: { type: 'string' }, bio: { type: 'string' }, email: { type: 'string' }, image: { type: 'string' }, startOfOpenOfficeHoursFirstShift: { type: 'string', format: 'time', nullable: true }, startOfOpenOfficeHoursSecondShift: { type: 'string', format: 'time', nullable: true }, qualifications: { type: 'array', items: { '$ref': '#/components/schemas/QualificationResponseDto' } }, subjects: { type: 'array', items: { '$ref': '#/components/schemas/SimpleSubjectResponseDto' } } },
        additionalProperties: false
      },
      TeacherResponseDtoLazyLoadResponse: { type: 'object', properties: { items: { type: 'array', items: { '$ref': '#/components/schemas/TeacherResponseDto' } }, loadedCount: { type: 'integer', format: 'int32' }, totalCount: { type: 'integer', format: 'int32' }, nextCursor: { type: 'string', nullable: true } }, additionalProperties: false },
      TwoFactorRequest: { type: 'object', properties: { enable: { type: 'boolean', nullable: true }, twoFactorCode: { type: 'string', nullable: true }, resetSharedKey: { type: 'boolean' }, resetRecoveryCodes: { type: 'boolean' }, forgetMachine: { type: 'boolean' } }, additionalProperties: false },
      TwoFactorResponse: { required: [ 'isMachineRemembered', 'isTwoFactorEnabled', 'recoveryCodesLeft', 'sharedKey' ], type: 'object', properties: { sharedKey: { type: 'string' }, recoveryCodesLeft: { type: 'integer', format: 'int32' }, recoveryCodes: { type: 'array', items: { type: 'string' }, nullable: true }, isTwoFactorEnabled: { type: 'boolean' }, isMachineRemembered: { type: 'boolean' } }, additionalProperties: false },
      UpdateAwardRequestDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, image: { type: 'string' }, dayOfAward: { type: 'string', format: 'date' }, externalLink: { type: 'string', nullable: true }, teacherId: { type: 'integer', format: 'int32', nullable: true } }, additionalProperties: false },
      UpdateAwardTranslationRequestDto: { type: 'object', properties: { awardId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, title: { type: 'string' }, description: { type: 'string', nullable: true }, competition: { type: 'string' }, student: { type: 'string' } }, additionalProperties: false },
      UpdateEducationalProfileRequestDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, generalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/CreateProfileSubjectRequestDto' } }, vocationalSubjects: { type: 'array', items: { '$ref': '#/components/schemas/CreateProfileSubjectRequestDto' } } },
        additionalProperties: false
      },
      UpdateNewsRequestDto: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int32' }, previewImage: { type: 'string' }, date: { type: 'string', format: 'date-time' }, images: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false
      },
      UpdateNewsTranslationRequestDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' }, markup: { type: 'string' } }, additionalProperties: false },
      UpdateQualificationTranslationRequestDto: { type: 'object', properties: { qualificationId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      UpdateSubjectTranslationRequestDto: { type: 'object', properties: { subjectId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' } }, additionalProperties: false },
      UpdateTeacherRequestDto: { type: 'object', properties: { id: { type: 'integer', format: 'int32' }, email: { type: 'string' }, image: { type: 'string' }, startOfOpenOfficeHoursFirstShift: { type: 'string', format: 'time', nullable: true }, startOfOpenOfficeHoursSecondShift: { type: 'string', format: 'time', nullable: true } }, additionalProperties: false },
      UpdateTeacherTranslationRequestDto: { type: 'object', properties: { teacherId: { type: 'integer', format: 'int32' }, languageCode: { type: 'string' }, name: { type: 'string' }, title: { type: 'string' }, bio: { type: 'string' } }, additionalProperties: false }
    }
  }
}