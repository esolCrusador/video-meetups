using System.Collections.Generic;
using System.Text;

namespace VideoMeetups.Data
{
    public class NameFormatter
    {
        public string ToElasticName(string name)
        {
            return string.Join("_", SplitByUpperCase(name));
        }

        private IEnumerable<string> SplitByUpperCase(string name)
        {
            if(string.IsNullOrEmpty(name))
            {
                yield break;
            }

            var sb = new StringBuilder(name.Length);

            for (int i = 0; i < name.Length; i++)
            {
                var c = name[i];
                if (char.IsUpper(c))
                {
                    if (sb.Length != 0)
                    {
                        yield return sb.ToString();
                        sb.Clear();
                    }

                    sb.Append(char.ToLower(c));
                }
                else
                {
                    sb.Append(c);
                }
            }

            yield return sb.ToString();
            sb.Clear();
        }
    }
}
