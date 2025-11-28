namespace CoreLayer.Utilities.DataResults.Interfaces;

public interface IDataResult<T>
{
  public bool Success { get; }
  public int StatusCode { get; }
  public string Message { get; }
  public T Data { get; }
}