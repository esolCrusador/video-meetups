using System.Linq.Expressions;

namespace VideoMeetups.Logic.ExpressionVisitors
{
    public class ParameterReplacementExpressionVisitor: ExpressionVisitor
    {
        private readonly ParameterExpression _targetParameter;
        private readonly Expression _replacement;

        public ParameterReplacementExpressionVisitor(ParameterExpression targetParameter, Expression replacement)
        {
            _targetParameter = targetParameter;
            _replacement = replacement;
        }

        protected override Expression VisitParameter(ParameterExpression node)
        {
            if(node == _targetParameter)
            {
                return _replacement;
            }

            return base.VisitParameter(node);
        }
    }
}
