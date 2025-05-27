using EtsZemun.Dtos.Request.EducationalProfile;
using EtsZemun.Dtos.Response.EducationalProfile;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;

namespace EtsZemun.Services.Model.EducationalProfileService;

public partial class EducationalProfileService(
    ICreateSingleService<EducationalProfile> createSingle,
    ICreateSingleService<EducationalProfileGeneralSubject> createGeneralSubjectService,
    ICreateSingleService<EducationalProfileVocationalSubject> createVocationalSubjectService,
    IReadRangeSelectedService<EducationalProfile> readRangeService,
    IReadSingleService<EducationalProfile> readSingleService,
    IExecuteUpdateService<EducationalProfileGeneralSubject> updateGeneralSubject,
    IExecuteUpdateService<EducationalProfileVocationalSubject> updateVocationalSubject,
    IUpdateSingleService<EducationalProfile> updateSingle,
    IExecuteUpdateService<EducationalProfile> updateService,
    IDeleteService<EducationalProfile> deleteService,
    IDeleteService<EducationalProfileGeneralSubject> deleteGeneralSubjectService,
    IDeleteService<EducationalProfileVocationalSubject> deleteVocationalSubjectService,
    IRequestMapper<UpdateEducationalProfileRequestDto, EducationalProfile> updateRequestMapper,
    IResponseMapper<EducationalProfile, EducationalProfileResponseDto> responseMapper
) : IEducationalProfileService;
