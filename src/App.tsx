import React from 'react';
import {Provider} from "react-redux";
import {store} from "./store/store";
import { CssBaseline } from '@mui/material';
import DashboardPage from "./pages/DashboardPage";

const App = () => {
    return (
        <Provider store={store}>
            <CssBaseline/>
            <DashboardPage/>
        </Provider>
    );
};

export default App;