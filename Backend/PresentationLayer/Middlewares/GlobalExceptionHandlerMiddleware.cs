using System.Text.Json;
using CoreLayer.Utilities.DataResults.Concretes;

namespace PresentationLayer.Middlewares;

public class GlobalExceptionHandlerMiddleware
{
  private readonly RequestDelegate _next;
  private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

  public GlobalExceptionHandlerMiddleware(RequestDelegate next , ILogger<GlobalExceptionHandlerMiddleware> logger)
  {
    _next = next;
    _logger = logger;
  }

  public async Task Invoke(HttpContext context)
  {
    try
    {
      await _next(context);
    }
    catch (Exception exception)
    {
      _logger.LogError(exception, "An unexpected error has occurred while handling the request.");

      context.Response.ContentType = "application/json";
      context.Response.StatusCode = StatusCodes.Status500InternalServerError;

      var response = new ErrorDataResult<object>(500, "An unexpected error has occured.");

      await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
  }
}