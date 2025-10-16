import React from 'react'
import SectionHeader from '../components/SectionHeader';
import Label from '../components/Label';
import { toast } from 'react-toastify';
import PrimaryButton from '../components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { reset, updateTicket } from '../features/ticket/ticketSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmptyInput } from '../utilities/validation';
import BreadCrumb from '../components/BreadCrumb';
import api from '../utilities/api';

const products = ['Iphone 17', 'Galaxy Fold', 'Macbook Pro', 'Dell XPS', 'Surface Pro'];
const breadcrumbs = [
    {
        label: 'home',
        url: '/'
    },
    {
        label: 'tickets',
        url: '/tickets'
    },
    {
        label: 'edit ticket',
        url: null
    }
]

export default function EditTicket() {
    const { id } = useParams();
    const { isLoading, isSuccess, isError, message, ticket } = useSelector((state) => state.tickets);    
    const [ticketToUpdate, setTicketToUpdate] = React.useState({
        product: products[0],
        description: ''
    })
    const { product, description } = ticketToUpdate;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // side effect to fetch current ticket on initial page load
    React.useEffect(() => {
        const controller = new AbortController()
        // async fetch from server manually
        const fetchCurrentTicket = async () => {
            try {
                const result = await api.get('/tickets/' + id, { signal: controller.signal });
                if (result.data) {
                    setTicketToUpdate({
                        product: result.data.product,
                        description: result.data.description
                    })
                }
            } catch (error) {
                if (error.name !== 'CanceledError') { // ignore aborts
                    console.error(error);
                    const errMsg = error?.response?.data?.message || error.message || "Unknown error";
                    toast.error(errMsg);
                }
            }
        }

        // call async fetch from server
        fetchCurrentTicket();

        return () => {
            controller.abort();
        }
    }, [])


    // edit  ticket side effect
    /* React.useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!isSuccess) {
            toast.success('Ticket updated successfully');
            dispatch(reset());
            navigate(`/tickets/${id}`);
        }

        return () => {
            if(ticket){
                dispatch(reset());
            }
        }

    }, [isError, isSuccess, message, dispatch, reset, navigate,]) */

    // input change handler
    const handleChange = (evt) => {
        setTicketToUpdate(prev => ({ ...prev, [evt.target.name]: evt.target.value }));
    }

    // form submission
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // validate form
        const { isInvalid, message } = validateForm({ product, description });
        if (isInvalid) {
            toast.error(message);
            return;
        }
        // submit the form
        dispatch(updateTicket({ id, product, description }));
        navigate(`/tickets/${id}`);
    }

    return (
        <section className='px-4 sm:px-6 md:px-8 lg:px-10'>
            <BreadCrumb items={breadcrumbs} />
            <div className='min-h-screen'>
                <div className="h-full w-full flex justify-center py-10 md:py-24">
                    <div className="w-full max-w-xl">
                        <SectionHeader title={'Edit ticket'} description={'No field should be empty'} isCentered={true} />
                        <form className='mt-6' onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="product">Product</Label>
                                <select
                                    name="product"
                                    id="product"
                                    value={product}
                                    onChange={handleChange}
                                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-500'
                                >
                                    {products.map((prod, index) => (
                                        <option key={index} value={prod}>{prod}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                                <Label htmlFor="description" className='text-gray-700 roboto-semibold'>Description of the issue</Label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={description}
                                    onChange={handleChange}
                                    rows={5}
                                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-500'
                                    placeholder='Please describe the issue you are facing'
                                ></textarea>
                            </div>
                            <div className="mt-6 flex flex-col w-full max-w-lg mx-auto">
                                <PrimaryButton type="submit" disabled={isLoading} >update ticket</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

const validateForm = (form) => {
    const { product, description } = form;

    if (isEmptyInput(product, description)) return {
        isInvalid: true,
        message: "Please fill out all fields"
    }

    if (!products.includes(product)) return {
        isInvalid: true,
        message: "Please select a valid product"
    }

    return { isInvalid: false, message: '' };
}
