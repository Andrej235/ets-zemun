using FluentResults;

namespace EtsZemun.Errors;

public class NotFound(string message) : Error(message) { }
