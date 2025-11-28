using CoreLayer.Utilities.DataResults.Abstracts;

namespace CoreLayer.Utilities.DataResults.Concretes;

public class ErrorDataResult<T> : DataResult<T>
{
  public ErrorDataResult(int statusCode, string errorMessage, T data)
    : base(false, statusCode, errorMessage, data) { }
  
  public ErrorDataResult(int statusCode, string errorMessage)
    : base(false, statusCode, errorMessage, default(T)) { }
  
  public ErrorDataResult(int statusCode)
    : base(false, statusCode, "Operation failed.", default(T)) { }
}