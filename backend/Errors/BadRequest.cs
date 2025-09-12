using FluentResults;

namespace EtsZemun.Errors;

public class BadRequest(string message) : Error(message) { }
