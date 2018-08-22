using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace VideoMeetups.Helpers
{
    public static class ControllerHelpers
    {
        public static Dictionary<string, IReadOnlyCollection<string>> GetValidationResult(this ModelStateDictionary modelState)
        {
            return modelState.Where(kvp => kvp.Value.Errors.Count > 0)
                .ToDictionary(
                kvp => kvp.Key,
                kvp => (IReadOnlyCollection<string>)kvp.Value.Errors.Select(e => e.ErrorMessage).ToList()
                );
        }
    }
}
