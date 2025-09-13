using EtsZemun.Models;
using Microsoft.AspNetCore.Identity;
using Resend;
using Task = System.Threading.Tasks.Task;

namespace EtsZemun.Services.EmailSender;

public class EmailSender(IResend resend) : IEmailSender<User>
{
    public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
    {
        var subject = "Confirm Your Email";
        var htmlContent =
            $@"<html>
                <body>
                    <h2>Confirm Your Email Address</h2>
                    <p>Please click the link below to confirm your email address:</p>
                    <a href='{confirmationLink}'>Confirm Email</a>
                </body>
            </html>";

        await SendEmailAsync(email, subject, htmlContent);
    }

    public async Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
    {
        var subject = "Password Reset Code";
        var htmlContent =
            $@"<html>
                <body>
                    <h2>Reset Your Password</h2>
                    <p>Your password reset code is: <strong>{resetCode}</strong></p>
                    <p>Use this code to reset your password. This code will expire soon.</p>
                </body>
            </html>";

        await SendEmailAsync(email, subject, htmlContent);
    }

    public async Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
    {
        var subject = "Reset Your Password";
        var htmlContent =
            $@"<html>
                <body>
                    <h2>Reset Your Password</h2>
                    <p>Please click the link below to reset your password:</p>
                    <a href='{resetLink}'>Reset Password</a>
                </body>
            </html>";

        await SendEmailAsync(email, subject, htmlContent);
    }

    private async Task SendEmailAsync(string toEmail, string subject, string htmlContent)
    {
        var message = new EmailMessage
        {
            From = "Ets Zemun <ets@nenadic.dev>",
            Subject = subject,
            HtmlBody = htmlContent,
            To = [toEmail],
        };

        await resend.EmailSendAsync(message);
    }
}
