using FluentResults;

namespace EtsZemun.Errors;

public class Forbidden(string message) : Error(message) { }
