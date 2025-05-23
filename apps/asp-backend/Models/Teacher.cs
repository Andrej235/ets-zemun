namespace EtsZemun.Models;

public class Teacher
{
    public int Id { get; set; }
    public ICollection<TeacherTranslation> Translations { get; set; } = [];

    public string Email { get; set; } = null!;
    public string Image { get; set; } = null!;

    public TimeOnly? StartOfOpenOfficeHoursFirstShift { get; set; }
    public TimeOnly? StartOfOpenOfficeHoursSecondShift { get; set; }

    public ICollection<Qualification> Qualifications { get; set; } = [];
    public ICollection<Subject> Subjects { get; set; } = [];
}
