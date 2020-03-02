import { useState, useEffect } from 'react';
const Api = 'https://console.firebase.google.com/u/0/project/usuarios-resumen-peliculas/database/usuarios-resumen-peliculas/data';

// React Hooks fetch(Url)

const useGetData = () => {
    const [DB, setData] = useState([]);

    useEffect(() => {
        fetch(Api)
            .then(response => response.json());
            .then(data => setData(data))   
    }, []);

    return DB
}

export default useGetData;