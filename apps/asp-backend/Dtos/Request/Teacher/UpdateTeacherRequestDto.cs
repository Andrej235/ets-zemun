namespace EtsZemun.Dtos.Request.Teacher;

public class UpdateTeacherRequestDto
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string Image { get; set; } = null!;

    public TimeOnly? StartOfOpenOfficeHoursFirstShift { get; set; }
    public TimeOnly? StartOfOpenOfficeHoursSecondShift { get; set; }
}
