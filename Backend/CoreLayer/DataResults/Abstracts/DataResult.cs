using CoreLayer.Utilities.DataResults.Interfaces;

namespace CoreLayer.Utilities.DataResults.Abstracts;

public abstract class DataResult<T> : IDataResult<T>
{
  public bool Success { get; }
  public int StatusCode { get; }
  public string Message { get; }
  public T Data { get; }

  protected DataResult(
    bool success = true,
    int statusCode = 200,
    string message = "" ,
    T data = default(T)
  )
  {
    Success = success;
    StatusCode = statusCode;
    Message = message;
    Data = data;
  }
}