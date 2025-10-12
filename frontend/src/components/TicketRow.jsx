import React from 'react'
import { Link } from 'react-router-dom';

export default function TicketRow({ ticket }) {
    const {_id, product, status, createdAt} = ticket;
    let statusClass;
    switch(status) {
        case 'open':
            statusClass = 'bg-green-100 text-green-800';
            break;
        case 'closed':
            statusClass = 'bg-red-100 text-red-800';
            break;
        default:
            statusClass = 'bg-gray-100 text-gray-800';
    }    
    return (
        <tr className='border-b border-gray-200 hover:bg-gray-50'>
            <td className='px-4 py-3 text-gray-700 roboto-regular'>{_id}</td>
            <td className='px-4 py-3 text-gray-700 roboto-regular'>{product}</td>
            <td className='px-4 py-3'>
                <span className={`px-3 py-1 rounded-full text-sm roboto-semibold ${statusClass}`}>{status}</span>
            </td>
            <td className='px-4 py-3 text-gray-700 roboto-regular'>{new Date(createdAt).toLocaleString()}</td>
            <td className='px-4 py-3'>
                <Link to={`/tickets/${_id}`} className='bg-gray-900 hover:bg-gray-700 transition-colors duration-300 ease-in-out px-3 py-2 rounded-xl text-xs roboto-semibold text-gray-50 text-nowrap'>View Details</Link>
            </td>
        </tr>
    )
}
