import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";

class AuthenticationComponent extends Component<any, any> {
    public render() {
        if (this.props.user) {
            return <img src={`https://graph.facebook.com/v3.1/${this.props.user.userId}/picture`} />
        }

        return <a href="/Account/ExternalLogin">Login</a>;
    }
}

export default connect(
    (state: ApplicationState) => state.server, // Selects which state properties are merged into the component's props
)(AuthenticationComponent) as typeof AuthenticationComponent;
