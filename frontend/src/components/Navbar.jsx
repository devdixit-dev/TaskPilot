import setting from '../assets/settings.png'

const Navbar = () => {
  return (
    <div className="mx-10 my-6 px-4 py-4 rounded-md border-2 border-[#242424]">
      <div className='flex justify-between items-center'>
        <div>
          <h2 className="text-2xl">Dashboard</h2>
        </div>
        <div className='flex justify-center items-center gap-10'>
          <button className='cursor-pointer'><img src={setting} width={26} /></button>
          <button type="submit" className="py-2 px-6 rounded-md bg-red-500 cursor-pointer hover:outline-2">Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar