using EtsZemun.Dtos.Request.Exam;
using EtsZemun.Dtos.Response.Exam;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;

namespace EtsZemun.Services.Model.ExamService;

public partial class ExamService(
    ICreateSingleService<Exam> createService,
    ICreateRangeService<Exam> createRangeService,
    IReadSingleService<Exam> readSingleService,
    IReadRangeService<Exam> readService,
    IUpdateSingleService<Exam> updateService,
    IDeleteService<Exam> deleteService,
    IRequestMapper<CreateExamRequestDto, Exam> createRequestMapper,
    IRequestMapper<UpdateExamRequestDto, Exam> updateRequestMapper,
    IResponseMapper<Exam, ExamResponseDto> responseMapper
) : IExamService;
