import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import { HomePageComponent } from './components/HomePage.Component';
import EventCreateComponent from './components/event/Event-Create.Component';
import MyEventsComponent from './components/event/My-Events.Component';

export const routes = <Layout>
    <Route exact path='/' component={HomePageComponent} />
    <Route exact path='/SampleHome' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/Events/Create' component={EventCreateComponent} />
    <Route path='/Events/My' component={MyEventsComponent} />
</Layout>;
