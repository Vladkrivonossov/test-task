import React, {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getFetchRequests, setSelectedRoute } from '../../store/reducers/requestsReducer'
import tableClasses from './requestsTable.module.css'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IRequest } from '../../types';

const columns: ColumnsType<IRequest> = [
    {
        title: 'Номер заявки',
        dataIndex: 'reqNumber',
        key: 'reqNumber',
    },
    {
        title: 'Координаты От lat',
        dataIndex: ['from', 'lat'],
    },
    {
        title: 'Координаты От lng',
        dataIndex: ['from', 'lng'],
    },
    {
        title: 'Координаты До lat',
        dataIndex: ['to', 'lat'],
    },
    {
        title: 'Координаты До lng',
        dataIndex: ['to', 'lng'],
    },
];


export const RequestsTable = () => {
    const {requests,} = useAppSelector(state => state.requestsReducer.transportationRequests)
    const {selectedRoute, isLoading} = useAppSelector(state => state.requestsReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFetchRequests())
    }, [dispatch])

    return (
        <>
            <Table 
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                dispatch(setSelectedRoute(record))
                            }
                        }
                    }} 
                    className={tableClasses['custom-row-hover']} 
                    rowClassName={(record => record.reqNumber === selectedRoute?.reqNumber ? tableClasses['selected-cell'] : '')} 
                    pagination={false} 
                    columns={columns} 
                    dataSource={requests}  
                    rowKey={() => Math.random()}
                    loading={isLoading}
                />
        </>
    )
}