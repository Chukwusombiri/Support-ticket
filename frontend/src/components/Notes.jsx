import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader';
import { createNote, getNotes, reset } from '../features/note/noteSlice';
import { toast } from 'react-toastify';
import SecondaryButton from './SecondaryButton';
import AddNote from './AddNote';

function Notes({ ticket }) {
    const { notes, isError, message, isLoading } = useSelector(state => state.notes);
    const dispatch = useDispatch();

    // SIDE EFFECT FOR NOTES FETCHING ON MOUNT
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getNotes(ticket._id));

        return () => {
            if (notes) {
                dispatch(reset());
            }
        }
    }, [isError]);

    // NOT LOADING STATE
    return (
        <div className="pt-4 border-t border-gray-200">
            <h3 className='text-lg roboto-semibold text-gray-800 mb-4'>Comments</h3>
            {
                isLoading
                    ? <p className='text-gray-600 animate-pulse'>Loading comments...</p>
                    : (
                        !notes || notes.length == 0
                            ? <p className='text-gray-600'>No comments yet.</p>
                            : <ul className='w-full space-y-2'>
                                {notes.map(item => <li key={item._id} className={`flex ${!item.isStaff ? 'justify-end' : 'justify-start'}`}>
                                    <div className="flex flex-col w-1/2">
                                        <span className="bg-gray-200 shadow-sm rounded-md p-1.5 text-sm">
                                            {item.text}
                                        </span>
                                        <div className="flex justify-between italic text-xs text-gray-600">
                                            <p className="">{item.isStaff ? 'Staff' : 'You'}</p>
                                            <span className="">{new Date(item.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </li>)}
                            </ul>
                    )
            }

            {/* Add comment */}
            {
                ticket.status !== 'closed' && <div className="mt-6">
                    <h2 className="text-md capitalize mb-2">Add comment</h2>
                    <AddNote ticketId={ticket._id}/>
                </div>
            }
        </div>
    )
}

export default Notes
