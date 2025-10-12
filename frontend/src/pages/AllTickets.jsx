import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTickets, reset } from '../features/ticket/ticketSlice';
import SectionHeader from '../components/SectionHeader';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import Loader from '../components/Loader';
import TicketRow from '../components/TicketRow';

const breadcrumbs = [
  {
    label: 'home',
    url: '/'
  },
  {
    label: 'tickets',
    url: null
  }
]

export default function AllTickets() {
  const { tickets, isSuccess, isLoading } = useSelector(state => state.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tickets.length == 0) {
      // FETCH TICKETS
      dispatch(getTickets());
    }   
  }, [])

  return (
    <section className='px-4 sm:px-6 md:px-8'>
      <BreadCrumb items={breadcrumbs} />
      <div className='lg:px-10 py-16 md:py-24'>
        <SectionHeader title={'Your Tickets'} description={'View all your support tickets here'} isCentered={true} />
        {
          isLoading
            ? <Loader />
            : <div className="mt-6 w-full overflow-x-auto">
              <table className='w-full table-auto text-left text-sm'>
                <thead className=''>
                  <tr className='bg-gray-100'>
                    <th className='text-gray-600 roboto-semibold px-4 py-3 rounded-l-lg'>Ticket ID</th>
                    <th className='text-gray-600 roboto-semibold px-4 py-3'>Product</th>
                    <th className='text-gray-600 roboto-semibold px-4 py-3'>Status</th>
                    <th className='text-gray-600 roboto-semibold px-4 py-3'>Created At</th>
                    <th className='text-gray-600 roboto-semibold px-4 py-3 rounded-r-lg'>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.length == 0
                    ? <tr>
                      <td colSpan={5} className='text-center text-gray-600 py-10'>No tickets found. <Link to={'/new-ticket'} className='text-blue-600'>Get started</Link></td>
                    </tr>
                    : tickets.map(ticket => (
                      <TicketRow key={ticket._id} ticket={ticket} />
                    ))
                  }
                </tbody>
              </table>
            </div>
        }
      </div>
    </section>
  )
}
