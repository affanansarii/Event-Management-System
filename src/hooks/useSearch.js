import { useMemo } from "react";

export const useSearch = (data, query) => {

    return useMemo(() => {

        if (!query) return data;

        return data.filter(emp =>
            `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(query.toLowerCase())
        );

    }, [data, query]);

}