using EtsZemun.Models;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Data
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        public DbSet<Award> Awards { get; set; }
        public DbSet<EducationalProfile> EducationalProfiles { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Teacher> Teachers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Award>(award =>
            {
                award.HasKey(a => a.Id);

                award
                    .HasMany(a => a.Translations)
                    .WithOne()
                    .HasForeignKey(a => a.AwardId)
                    .OnDelete(DeleteBehavior.Cascade);

                award
                    .HasOne(a => a.Teacher)
                    .WithMany()
                    .HasForeignKey(a => a.TeacherId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<AwardTranslation>(awardTranslation =>
            {
                awardTranslation.HasKey(a => a.AwardId);
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
                generalSubject.HasKey(g => new { g.EducationalProfileId, g.SubjectId });

                generalSubject
                    .HasOne(g => g.Subject)
                    .WithMany()
                    .HasForeignKey(g => g.SubjectId)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<EducationalProfileVocationalSubject>(vocationalSubject =>
            {
                vocationalSubject.HasKey(v => new { v.EducationalProfileId, v.SubjectId });

                vocationalSubject
                    .HasOne(v => v.Subject)
                    .WithMany()
                    .HasForeignKey(v => v.SubjectId)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Language>(language =>
            {
                language.HasKey(l => l.Id);

                language.HasIndex(l => l.Code).IsUnique();

                language
                    .HasMany<AwardTranslation>()
                    .WithOne()
                    .HasForeignKey(a => a.LanguageId)
                    .OnDelete(DeleteBehavior.Cascade);

                language
                    .HasMany<QualificationTranslation>()
                    .WithOne()
                    .HasForeignKey(q => q.LanguageId)
                    .OnDelete(DeleteBehavior.Cascade);

                language
                    .HasMany<SubjectTranslation>()
                    .WithOne()
                    .HasForeignKey(s => s.LanguageId)
                    .OnDelete(DeleteBehavior.Cascade);

                language
                    .HasMany<TeacherTranslation>()
                    .WithOne()
                    .HasForeignKey(t => t.LanguageId)
                    .OnDelete(DeleteBehavior.Cascade);
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
                qualificationTranslation.HasKey(q => q.QualificationId);
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
                subjectTranslation.HasKey(s => s.SubjectId);
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
            });

            modelBuilder.Entity<TeacherTranslation>(teacherTranslation =>
            {
                teacherTranslation.HasKey(t => t.TeacherId);
            });
        }
    }
}
