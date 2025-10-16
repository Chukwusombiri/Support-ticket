import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNote } from '../features/note/noteSlice';
import SecondaryButton from './SecondaryButton';
import { toast } from 'react-toastify';

export default function AddNote({ticketId}) {
    const { note, isLoading, isSuccess } = useSelector(state => state.notes);    
    const dispatch = useDispatch();
    const [text, setText] = useState('')

    // add note handler
    const handleCreateNote = async (evt) => {
        evt.preventDefault();

        // check for empty input
        if ((typeof text == 'string' && text.trim().length == 0) || text === undefined || text === null) {
            toast.error("Please enter a valid text");
            return;
        }

        // submit to server
        dispatch(createNote({
            text,
            ticketId
        }))

        setText('');
    }

    // add note side effect
    useEffect(() => {
        if (isSuccess && note) {
            toast.success("comment added");
        }       

    }, [isSuccess, dispatch, note]);

    return (
        <div>
            <form onSubmit={handleCreateNote}>
                <div className="flex flex-col gap-3">
                    <textarea
                        name="text"
                        id="text"
                        placeholder='type something...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={4}
                        className='w-full max-w-lg rounded-lg p-2 border border-gray-300 focus:border-gray-500 focus:ring-0 bg-transparent text-md text-gray-800 placeholder:text-gray-500'></textarea>
                    <div>
                        <SecondaryButton type="submit" disabled={text.trim().length === 0 || isLoading} >submit</SecondaryButton>
                    </div>
                </div>
            </form>
        </div>
    )
}
