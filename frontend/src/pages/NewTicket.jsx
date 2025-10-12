import React from 'react'
import SectionHeader from '../components/SectionHeader';
import Label from '../components/Label';
import { toast } from 'react-toastify';
import PrimaryButton from '../components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket, reset } from '../features/ticket/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { isEmptyInput } from '../utilities/validation';
import BreadCrumb from '../components/BreadCrumb';

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
    label: 'new ticket',
    url: null
  }
]

export default function NewTicket() {
    const [product, setProduct] = React.useState(products[0]);
    const [description, setDescription] = React.useState('');
    const dispatch = useDispatch();
    const { isLoading, isSuccess, isError, message, ticket } = useSelector((state) => state.tickets);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess && ticket) {
            toast.success('Ticket created successfully');
            setDescription('');
            setProduct(products[0]);
            dispatch(reset());
            navigate(`/tickets`);
        }

    }, [isError, isSuccess, message, dispatch, reset, navigate,])

    const handleChange = (evt) => {
        setProduct(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // validate form
        const { isInvalid, message } = validateForm({ product, description });
        if (isInvalid) {
            toast.error(message);
            return;
        }
        // submit the form
        dispatch(createTicket({ product, description }));
    }
    return (
        <section className='px-4 sm:px-6 md:px-8 lg:px-10'>
            <BreadCrumb items={breadcrumbs} />
            <div className='min-h-screen'>
                <div className="h-full w-full flex justify-center py-10 md:py-24">
                    <div className="w-full max-w-xl">
                        <SectionHeader title={'Create a new ticket'} description={'Please fill out the form below'} isCentered={true} />
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
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={5}
                                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-500'
                                    placeholder='Please describe the issue you are facing'
                                ></textarea>
                            </div>
                            <div className="mt-6 flex flex-col w-full max-w-lg mx-auto">
                                <PrimaryButton type="submit" disabled={isLoading} >Submit ticket</PrimaryButton>
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
