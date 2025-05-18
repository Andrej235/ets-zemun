using EtsZemun.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Data
{
    public class DataContext(DbContextOptions<DataContext> options)
        : IdentityDbContext<User, IdentityRole, string>(options)
    {
        public DbSet<Award> Awards { get; set; }
        public DbSet<AwardTranslation> AwardTranslations { get; set; }
        public DbSet<EducationalProfile> EducationalProfiles { get; set; }
        public DbSet<EducationalProfileGeneralSubject> EducationalProfileGeneralSubjects { get; set; }
        public DbSet<EducationalProfileVocationalSubject> EducationalProfileVocationalSubjects { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<NewsImage> NewsImages { get; set; }
        public DbSet<NewsTranslation> NewsTranslations { get; set; }
        public DbSet<Qualification> Qualifications { get; set; }
        public DbSet<QualificationTranslation> QualificationTranslations { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<SubjectTranslation> SubjectTranslations { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<TeacherSubject> TeacherSubjects { get; set; }
        public DbSet<TeacherTranslation> TeacherTranslations { get; set; }
        public DbSet<UserLoginEvent> UserLoginEvent { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserLoginEvent>(loginEvent =>
            {
                loginEvent.HasKey(le => le.Id);

                loginEvent
                    .HasOne(le => le.User)
                    .WithMany()
                    .HasForeignKey(le => le.UserId)
                    .OnDelete(DeleteBehavior.NoAction);

                loginEvent.HasIndex(le => le.LoginTime);
                loginEvent.HasIndex(le => le.UserId);
            });

            modelBuilder.Entity<Award>(award =>
            {
                award.HasKey(a => a.Id);

                award
                    .HasMany(a => a.Translations)
                    .WithOne()
                    .HasForeignKey(a => a.AwardId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<AwardTranslation>(awardTranslation =>
            {
                awardTranslation.HasKey(a => new { a.LanguageCode, a.AwardId });
            });

            modelBuilder.Entity<EducationalProfile>(educationalProfile =>
            {
                educationalProfile.HasKey(ep => ep.Id);

                educationalProfile
                    .HasMany(ep => ep.GeneralSubjects)
                    .WithOne(s => s.Profile)
                    .HasForeignKey(s => s.EducationalProfileId)
                    .OnDelete(DeleteBehavior.Cascade);

                educationalProfile
                    .HasMany(ep => ep.VocationalSubjects)
                    .WithOne(s => s.Profile)
                    .HasForeignKey(s => s.EducationalProfileId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<EducationalProfileGeneralSubject>(generalSubject =>
            {
                generalSubject.HasKey(g => new
                {
                    g.EducationalProfileId,
                    g.SubjectId,
                    g.Year,
                });

                generalSubject
                    .HasOne(g => g.Subject)
                    .WithMany()
                    .HasForeignKey(g => g.SubjectId)
                    .OnDelete(DeleteBehavior.NoAction);

                generalSubject.HasIndex(g => new { g.Year, g.EducationalProfileId });

                generalSubject.HasIndex(g => g.Year);
            });

            modelBuilder.Entity<EducationalProfileVocationalSubject>(vocationalSubject =>
            {
                vocationalSubject.HasKey(v => new
                {
                    v.EducationalProfileId,
                    v.SubjectId,
                    v.Year,
                });

                vocationalSubject
                    .HasOne(v => v.Subject)
                    .WithMany()
                    .HasForeignKey(v => v.SubjectId)
                    .OnDelete(DeleteBehavior.NoAction);

                vocationalSubject.HasIndex(g => new { g.Year, g.EducationalProfileId });

                vocationalSubject.HasIndex(g => g.Year);
            });

            modelBuilder.Entity<Language>(language =>
            {
                language.HasKey(l => l.Code);

                language
                    .HasMany<AwardTranslation>()
                    .WithOne()
                    .HasForeignKey(a => a.LanguageCode)
                    .OnDelete(DeleteBehavior.Cascade);

                language
                    .HasMany<QualificationTranslation>()
                    .WithOne()
                    .HasForeignKey(q => q.LanguageCode)
                    .OnDelete(DeleteBehavior.Cascade);

                language
                    .HasMany<SubjectTranslation>()
                    .WithOne()
                    .HasForeignKey(s => s.LanguageCode)
                    .OnDelete(DeleteBehavior.Cascade);

                language
                    .HasMany<TeacherTranslation>()
                    .WithOne()
                    .HasForeignKey(t => t.LanguageCode)
                    .OnDelete(DeleteBehavior.Cascade);

                language
                    .HasMany<NewsTranslation>()
                    .WithOne()
                    .HasForeignKey(n => n.LanguageCode)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<News>(news =>
            {
                news.HasKey(n => n.Id);

                news.HasMany(n => n.Translations)
                    .WithOne()
                    .HasForeignKey(n => n.NewsId)
                    .OnDelete(DeleteBehavior.Cascade);

                news.HasMany(n => n.Images)
                    .WithOne()
                    .HasForeignKey(n => n.NewsId)
                    .OnDelete(DeleteBehavior.Cascade);

                news.HasIndex(n => n.Date);
            });

            modelBuilder.Entity<NewsImage>(newsImage =>
            {
                newsImage.HasKey(n => new { n.NewsId, n.ImageId });

                newsImage.HasIndex(n => n.NewsId);
            });

            modelBuilder.Entity<NewsTranslation>(newsTranslation =>
            {
                newsTranslation.HasKey(n => new { n.LanguageCode, n.NewsId });
            });

            modelBuilder.Entity<Qualification>(qualification =>
            {
                qualification.HasKey(q => q.Id);

                qualification
                    .HasMany(q => q.Translations)
                    .WithOne()
                    .HasForeignKey(q => q.QualificationId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<QualificationTranslation>(qualificationTranslation =>
            {
                qualificationTranslation.HasKey(q => new { q.LanguageCode, q.QualificationId });
            });

            modelBuilder.Entity<Subject>(subject =>
            {
                subject.HasKey(s => s.Id);

                subject
                    .HasMany(s => s.Translations)
                    .WithOne()
                    .HasForeignKey(s => s.SubjectId)
                    .OnDelete(DeleteBehavior.Cascade);

                subject
                    .HasMany(s => s.Teachers)
                    .WithMany(t => t.Subjects)
                    .UsingEntity<TeacherSubject>();
            });

            modelBuilder.Entity<SubjectTranslation>(subjectTranslation =>
            {
                subjectTranslation.HasKey(s => new { s.SubjectId, s.LanguageCode });
            });

            modelBuilder.Entity<Teacher>(teacher =>
            {
                teacher.HasKey(t => t.Id);

                teacher
                    .HasMany(t => t.Translations)
                    .WithOne()
                    .HasForeignKey(t => t.TeacherId)
                    .OnDelete(DeleteBehavior.Cascade);

                teacher
                    .HasMany(t => t.Qualifications)
                    .WithOne(q => q.Teacher)
                    .HasForeignKey(q => q.TeacherId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<TeacherSubject>(teacherSubject =>
            {
                teacherSubject.HasKey(t => new { t.TeacherId, t.SubjectId });

                teacherSubject
                    .HasOne<Teacher>()
                    .WithMany()
                    .HasForeignKey(t => t.TeacherId)
                    .OnDelete(DeleteBehavior.NoAction);

                teacherSubject
                    .HasOne<Subject>()
                    .WithMany()
                    .HasForeignKey(t => t.SubjectId)
                    .OnDelete(DeleteBehavior.NoAction);

                teacherSubject.HasIndex(t => t.TeacherId);

                teacherSubject.HasIndex(t => t.SubjectId);
            });

            modelBuilder.Entity<TeacherTranslation>(teacherTranslation =>
            {
                teacherTranslation.HasKey(t => new { t.LanguageCode, t.TeacherId });
            });
        }
    }
}
