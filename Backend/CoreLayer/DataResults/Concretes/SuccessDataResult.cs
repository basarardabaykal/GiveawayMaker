using CoreLayer.Utilities.DataResults.Abstracts;

namespace CoreLayer.Utilities.DataResults.Concretes;

public class SuccessDataResult<T> : DataResult<T>
{
  public SuccessDataResult(string message, T? data)
  : base(true, 200, message, data) { }
  
  public SuccessDataResult(string message)
    : base(true, 200, message, default(T)) { }
  public SuccessDataResult()
    : base(true, 200, "İşlem başarıyla tamamlandı.", default(T)) { }
  
}