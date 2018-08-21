import { Component } from "react";
import * as React from "react";

export class FacebookAvatarComponent extends Component<{ userId: number | null }, {}>{
    public render() {
        if (this.props.userId) {
            return <img src={`https://graph.facebook.com/v3.1/${this.props.userId}/picture`} className="avatar" />;
        }
        else {
            return <div className="avatar"><span className="glyphicon glyphicon-user" /></div>;
        }
    }
}