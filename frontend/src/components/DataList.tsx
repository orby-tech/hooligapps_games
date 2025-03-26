import React from 'react';

export interface DataItem {
    date: string;
    name: string;
}

interface DataListProps {
    data: DataItem[];
}

const DataList: React.FC<DataListProps> = ({ data }) => {
    return (
        <div>
            {data.map((item, index) => (
                <div key={index}>
                    {item.date}: {item.name}
                </div>
            ))}
        </div>
    );
};

export default DataList;