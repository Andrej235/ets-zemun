namespace EtsZemun.Dtos.Response.Teacher;

public class AdminTeacherResponseDto : SimpleTeacherResponseDto
{
    public string Email { get; set; } = null!;
    public IEnumerable<string> Translations { get; set; } = [];
}
