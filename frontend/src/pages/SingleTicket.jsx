import React from 'react'
import { closeTicket, getTicket, reset } from '../features/ticket/ticketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import BreadCrumb from '../components/BreadCrumb';
import SectionHeader from '../components/SectionHeader';
import { toast } from 'react-toastify';

export default function SingleTicket() {
    const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets)
    const { authUser } = useSelector((state) => state.auth);
    const { _id, product, description, status, createdAt, updatedAt } = ticket || {};
    const dispatch = useDispatch();
    const { id } = useParams();
    let statusClass;
    switch (status) {
        case 'open':
            statusClass = 'bg-green-100 text-green-800';
            break;
        case 'closed':
            statusClass = 'bg-red-100 text-red-800';
            break;
        default:
            statusClass = 'bg-gray-100 text-gray-800';
    }

    React.useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(id));

        return () => {
            // cleanup function           
            if (ticket) {
                // reset ticket
                dispatch(reset());
            }
        }
    }, []);

    // handle close ticket
    const handleCloseTicket = () => {
        console.log('close ticket');
        // dispatch close ticket action
        dispatch(closeTicket(id));
    }

    if (isLoading) {
        return <Loader />;
    }

    return !ticket ? null : (
        <section className='px-4 sm:px-6 md:px-8 lg:px-10 text-gray-700 roboto-regular'>
            <BreadCrumb items={[
                { label: 'home', url: '/' },
                { label: 'tickets', url: '/tickets' },
                { label: 'ticket details', url: null }
            ]} />
            <div className="py-16 lg:py-24">
                <SectionHeader title={`Ticket Details`} isCentered={false} />
                <p className='text-gray-600 mb-6 mt-4'>Ticket ID: <span className='roboto-semibold text-gray-800'>{_id}</span></p>
                <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
                    <div className="space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                            <span className='text-gray-600 roboto-semibold w-32'>Customer:</span>
                            <span className='text-gray-800'>{authUser?.name} ({authUser?.email})</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                            <span className='text-gray-600 roboto-semibold w-32'>Product:</span>
                            <span className='text-gray-800'>{product}</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                            <span className='text-gray-600 roboto-semibold w-32'>Status:</span>
                            <div><span className={`px-3 py-1 rounded-full text-xs roboto-semibold ${statusClass}`}>{status}</span></div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                            <span className='text-gray-600 roboto-semibold w-32'>Created At:</span>
                            <span className='text-gray-800'>{new Date(createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                            <span className='text-gray-600 roboto-semibold w-32'>Last Updated:</span>
                            <span className='text-gray-800'>{new Date(updatedAt).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className='text-lg roboto-semibold text-gray-800'>Description</h3>
                        <p className='text-gray-700 leading-relaxed'>{description}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        {status !== 'closed' && <button onClick={handleCloseTicket} type='button' className="px-5 py-2 rounded-md text-xs roboto-bold text-gray-50 capitalize bg-gray-900 hover:bg-gray-700 transition-colors duration-300 ease-in-out">close ticket</button>}
                        <button type='button' className="px-5 py-2 rounded-md text-xs roboto-bold text-gray-50 capitalize bg-blue-600 hover:bg-blue-700 transition-colors duration-300 ease-in-out">edit ticket</button>
                        <button type='button' className="px-5 py-2 rounded-md text-xs roboto-bold text-gray-50 capitalize bg-red-600 hover:bg-red-700 transition-colors duration-300 ease-in-out">delete ticket</button>
                    </div>
                    {/* comments section can go here in future */}
                    <div className="pt-4 border-t border-gray-200">
                        <h3 className='text-lg roboto-semibold text-gray-800 mb-4'>Comments</h3>
                        <p className='text-gray-600'>No comments yet.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
