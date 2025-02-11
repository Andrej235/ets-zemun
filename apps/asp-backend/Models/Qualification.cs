namespace EtsZemun.Models
{
    public class Qualification
    {
        public int Id { get; set; }
        public DateTime DateObtained { get; set; }
        public ICollection<QualificationTranslation> Translations { get; set; } = [];

        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; } = null!;
    }
}
