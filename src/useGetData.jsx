import { useState, useEffect } from 'react';
const Api = 'https://console.firebase.google.com/project//database/data/data';

// React Hooks fetch(Url)

const useGetData = () => {
    const [db, setData] = useState([]);

    useEffect(() => {
        fetch(Api)
            .then(response => response.json());
            .then(data => setData(data))   
    }, []);

    return db
}

export default useGetData;