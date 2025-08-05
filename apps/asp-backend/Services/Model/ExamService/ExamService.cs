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
    IReadSingleService<Exam> readSingleService,
    IReadRangeService<Exam> readService,
    IExecuteUpdateService<Exam> updateService,
    IDeleteService<Exam> deleteService,
    IRequestMapper<CreateExamRequestDto, Exam> createRequestMapper,
    IResponseMapper<Exam, ExamResponseDto> responseMapper
) : IExamService;
