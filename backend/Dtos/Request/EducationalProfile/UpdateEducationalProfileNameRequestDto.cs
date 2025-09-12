namespace EtsZemun.Dtos.Request.EducationalProfile;

public class UpdateEducationalProfileNameRequestDto
{
    public int ProfileId { get; set; }
    public string NewName { get; set; } = null!;
}
