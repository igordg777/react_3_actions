import React from 'react';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import Exel from './exportExel/Export'

function TableActions() {

    const [data, dataSet] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => dataSet(res))
    }, [])

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Почта',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
        }
    ]

    return (
        <div>
            <Table dataSource={data} columns={columns} />

            {data.length > 0 &&
                <Exel dataConfiguration={data} />
            }



        </div>
    )
}

export default TableActions;