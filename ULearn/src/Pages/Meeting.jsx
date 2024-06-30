import {React} from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

const Meeting = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Meeting {id}</h1>
        </div>
    );
};

export default Meeting;