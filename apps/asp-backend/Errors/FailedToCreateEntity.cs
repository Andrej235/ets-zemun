using FluentResults;

namespace EtsZemun.Errors;

public class FailedToCreateEntity(string message) : Error(message) { }
