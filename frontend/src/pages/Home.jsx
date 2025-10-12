import React from 'react'
import SectionHeader from '../components/SectionHeader'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import { LuTicketCheck } from "react-icons/lu";
import { LuTicketPlus } from "react-icons/lu";
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <>
      {/* hero */}
      <section className='py-16 md:py-24 xl:py-32'>
        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-2xl mx-auto min-h-[40vh] flex flex-col">
            <div className={`w-full flex flex-col gap-4 items-center`}>
              <h2 className={`text-4xl expletus-sans text-gray-800 capitalize text-center`}>How can we be of assistance to you ?</h2>
              <p className={`text-lg text-gray-600 roboto-semibold text-center`}>We are always delighted to speak with you so bring any concerns you have to us, we got you!</p>
            </div>
            <div className="mt-6 w-full max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to={'/new-ticket'} className="flex flex-col">
                <PrimaryButton>New ticket <LuTicketPlus size={20} /></PrimaryButton>
              </Link>
              <Link to={'/tickets'} className="flex flex-col">
                <SecondaryButton>View tickets <LuTicketCheck size={20} /></SecondaryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
