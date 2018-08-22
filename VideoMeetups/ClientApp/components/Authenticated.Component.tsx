import { connect, DispatchProp } from "react-redux";
import { ApplicationState } from "../store";
import { Component } from "react";
import { IServerInfoModel } from "../models/IServerInfo.Model";

class AuthenticatedComponent extends Component<IServerInfoModel & DispatchProp<any>, {}>
{
    public render() {
        if (this.props.user) {
            return this.props.children as React.ReactElement<any>;
        }

        return null;
    }
}

export default connect(
    (state: ApplicationState, ownProps) => Object.assign({}, state.server, ownProps), // Selects which state properties are merged into the component's props
)(AuthenticatedComponent) as typeof Component;