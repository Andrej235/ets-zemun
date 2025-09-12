using EtsZemun.Dtos.Response.Teacher;

namespace EtsZemun.Dtos.Response.Subject;

public class SubjectResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;

    public LazyLoadResponse<TeacherResponseDto> Teachers { get; set; } = null!;
}
