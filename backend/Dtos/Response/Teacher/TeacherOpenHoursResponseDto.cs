namespace EtsZemun.Dtos.Response.Teacher;

public class TeacherOpenHoursResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public string? StartOfOpenOfficeHoursFirstShift { get; set; }
    public string? StartOfOpenOfficeHoursSecondShift { get; set; }
}
