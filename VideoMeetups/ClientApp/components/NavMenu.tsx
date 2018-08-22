import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AuthenticationComponent from './Authentication.Component';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                    </div>
                    <div className='clearfix'></div>
                    <div className='navbar-collapse collapse'>
                        <ul className='nav navbar-nav'>
                            <li>
                                <NavLink exact to={'/'} activeClassName='active' className='navbar-brand'>
                                    Video Meetups
                                </NavLink>
                            </li>
                            <li>
                                <a href="#">Explore</a>
                            </li>
                            <li>
                                <a href="#">Calendar</a>
                            </li>
                            <li>
                                <NavLink to={'/counter'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-education'></span> Counter
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/Events/Create'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-add'></span> Create Event
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/fetchdata'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list'></span> Fetch data
                                </NavLink>
                            </li>
                        </ul>
                        <ul className='nav navbar-nav navbar-right'>
                            <AuthenticationComponent></AuthenticationComponent>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
