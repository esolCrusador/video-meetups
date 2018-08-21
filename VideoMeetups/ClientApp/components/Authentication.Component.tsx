import { Component } from "react";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { ApplicationState } from "../store";
import { FacebookAvatarComponent } from "./Facebook-Avatar.Component";
import { IServerInfoModel } from "../models/IServerInfo.Model";

declare type ComponentModel = DispatchProp<any> & IServerInfoModel;

class AuthenticationComponent extends Component<ComponentModel, {}> {
    public render() {
        if (this.props.user) {
            return (
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                        <FacebookAvatarComponent userId={this.props.user.userId} />
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu navbar-inverse account-dropdown">
                        <li>
                            <form action="/Account/Logout" method="POST">
                                <button type="submit" className="btn btn-link">Logout</button>
                            </form>
                        </li>
                    </ul>
                </li>
            );
        }

        return <li><a href="/Account/ExternalLogin">Login</a></li>;
    }
}

export default connect(
    (state: ApplicationState) => state.server, // Selects which state properties are merged into the component's props
)(AuthenticationComponent) as typeof Component;
