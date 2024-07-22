import { useState, useEffect } from 'react';

export function useRequest(url: string) {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function fetchData(url: string) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
           (async () => {
            try {
                const movieList = await fetchData(url);
                setData(movieList);
            } catch (error) {
                console.error('Error fetching data: ', error);
           } finally {
                setLoading(false);
            }
              })();
    }, [url]);

    return { data, loading };
}