namespace EtsZemun.Models
{
    public class Qualification
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime DateObtained { get; set; }

        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; } = null!;
    }
}
