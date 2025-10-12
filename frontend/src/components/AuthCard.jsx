

export default function AuthCard({ children }) {  
  return (
    <div className='min-h-screen'>
      <div className="h-full w-full flex justify-center px-6 py-10 md:py-24">
        <div className="w-full max-w-xl">
          {children}
        </div>
      </div>
    </div>
  )
}
