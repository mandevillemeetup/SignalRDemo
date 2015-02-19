
namespace Core.Services
{
    public interface ICounterService
    {
        int GetCurrentCount();
        void SetValue(int val);
        int GetTotalRecords();
        void SetTotalRecords(int val);
    }

    public class CounterService : ICounterService
    {
        private int _currentCount;
        private int _totalRecords;

        public CounterService()
        {
            _currentCount = 0;
            _totalRecords = 0;
        }

        public int GetCurrentCount()
        {
            return _currentCount;
        }

        public void SetValue(int val)
        {
            _currentCount = val;
        }

        public int GetTotalRecords()
        {
            return _totalRecords;
        }

        public void SetTotalRecords(int val)
        {
            _totalRecords = val;
        }
    }
}
