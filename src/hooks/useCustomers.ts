// Updated useCustomers.ts for parameterized query support

import { useEffect, useState } from 'react';
import axios from 'axios';

const useCustomers = (role: string, limit: number, offset: number) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`/api/customers?role=${role}&limit=${limit}&offset=${offset}`);
                setCustomers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching customers:', error);
                setLoading(false);
            }
        };

        fetchCustomers();
    }, [role, limit, offset]);

    return { customers, loading };
};

export default useCustomers;