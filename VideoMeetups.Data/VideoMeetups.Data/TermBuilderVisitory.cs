using Nest;
using System;
using System.Linq.Expressions;
using System.Reflection;

namespace VideoMeetups.Data
{
    public class TermBuilderVisitory<TEntity>: ExpressionVisitor
        where TEntity: class
    {
        private readonly QueryContainerDescriptor<TEntity> _queryContainerDescriptor;

        public TermBuilderVisitory(QueryContainerDescriptor<TEntity> queryContainerDescriptor)
        {
            _queryContainerDescriptor = queryContainerDescriptor;
        }

        protected override Expression VisitBinary(BinaryExpression node)
        {
            MemberExpression memberExpression;
            Expression valueExpression;

            if(node.Left.NodeType == ExpressionType.MemberAccess)
            {
                memberExpression = (MemberExpression)node.Left;
                valueExpression = node.Right;
            }
            else
            {
                memberExpression = (MemberExpression)node.Right;
                valueExpression = node.Left;
            }

            object value = Expression.Lambda(valueExpression).Compile().DynamicInvoke();

            _queryContainerDescriptor.Term(tqd => tqd.Field(memberExpression).Strict().Value(value));

            return base.VisitBinary(node);
        }

        public static Func<QueryContainerDescriptor<TEntity>, QueryContainer> BuildQueryFromExpression(Expression<Func<TEntity, bool>> predicate)
        {
            return qcd => { new TermBuilderVisitory<TEntity>(qcd).Visit(predicate); return qcd; };
        }
    }
}
