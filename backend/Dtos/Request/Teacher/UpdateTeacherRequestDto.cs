namespace EtsZemun.Dtos.Request.Teacher;

public class UpdateTeacherRequestDto
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string Image { get; set; } = null!;

    public string? StartOfOpenOfficeHoursFirstShift { get; set; }
    public string? StartOfOpenOfficeHoursSecondShift { get; set; }
}
