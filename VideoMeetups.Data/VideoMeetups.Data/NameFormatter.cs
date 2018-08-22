using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VideoMeetups.Data
{
    public class NameFormatter
    {
        private static readonly Dictionary<Type, string> _elasticEntityNames = new Dictionary<Type, string>();

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

        public string GetIndexPostfix(Type type)
        {
            string entityName;
            if(!_elasticEntityNames.TryGetValue(type, out entityName))
                lock(_elasticEntityNames)
                    if(!_elasticEntityNames.TryGetValue(type, out entityName))
                    {
                        entityName = type.GetCustomAttributes(typeof(ElasticsearchTypeAttribute), true)
                            .Cast<ElasticsearchTypeAttribute>().Select(attr => attr.Name)
                            .FirstOrDefault() ?? type.Name;

                        entityName = ToElasticName(entityName);
                        _elasticEntityNames.Add(type, entityName);
                    }

            return entityName;
        }
    }
}
