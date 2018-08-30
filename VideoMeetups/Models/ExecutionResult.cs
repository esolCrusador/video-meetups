using System.Collections.Generic;

namespace VideoMeetups.Models
{
    public class ExecutionResult
    {
        public ExecutionResult(Dictionary<string, IReadOnlyCollection<string>> validationErrors)
        {
            ValidationErrors = validationErrors;
        }
        public ExecutionResult()
        {
        }
        public bool IsValid => ValidationErrors == null;
        public Dictionary<string, IReadOnlyCollection<string>> ValidationErrors { get; set; }

        public static ExecutionResult From(Dictionary<string, IReadOnlyCollection<string>> validationErrors)
        {
            return new ExecutionResult(validationErrors);
        }
        public static ExecutionResult<TData> From<TData>(TData data)
        {
            return new ExecutionResult<TData>(data);
        }
    }
    public class ExecutionResult<TData> : ExecutionResult
    {
        public ExecutionResult(TData data)
        {
            Data = data;
        }
        public ExecutionResult(Dictionary<string, IReadOnlyCollection<string>> validationErrors, TData data = default(TData)) 
            : base(validationErrors)
        {
            Data = data;
        }

        public TData Data { get; private set; }
    }
}
