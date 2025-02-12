using FluentResults;

namespace EtsZemun.Errors;

public class InternalError(string message) : Error(message) { }
