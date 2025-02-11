namespace EtsZemun.Models;

public class Teacher
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Bio { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Image { get; set; } = null!;

    public DateTime StartOfOpenOfficeHoursFirstShift { get; set; }
    public DateTime StartOfOpenOfficeHoursSecondShift { get; set; }

    public ICollection<Qualification> Qualifications { get; set; } = [];
    public ICollection<Subject> Subjects { get; set; } = [];
}
