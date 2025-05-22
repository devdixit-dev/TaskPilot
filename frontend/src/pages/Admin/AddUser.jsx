const AddUser = () => {
  return (
    <div className="w-1/3 mx-10 my-10 py-8 px-8 rounded-md border-2 border-[#242424]">
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl">Add Employee</h3>
        <p>add your employees and managers</p>
      </div>
      <div>
        <form className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="employee-name">Name</label>
            <input type="text" name="emp-name" minLength={6} placeholder="Employee name" className="bg-black w-full py-2.5 px-4.5 rounded-md border-1 border-[#242424] outline-0" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="employee-name">Email</label>
            <input type="email" name="emp-email" minLength={8} placeholder="Employee email" className="bg-black w-full py-2.5 px-4.5 rounded-md border-1 border-[#242424] outline-0" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="employee-name">Password</label>
            <input type="text" name="emp-password" minLength={6} placeholder="Employee password" className="bg-black w-full py-2.5 px-4.5 rounded-md border-1 border-[#242424] outline-0" required />
          </div>

          <div className="flex flex-col gap-2">
            <div class="grid gap-2">
              <label for="area">Role</label>
              <select
                id="area"
                name="area"
                class="w-full rounded-md border border-gray-300 bg-black px-5 py-3 text-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          <div className="mt-2">
            <button type="submit" className={`py-2 px-4 rounded-md bg-white text-black cursor-pointer transition-all duration-300 hover:outline-1 hover:opacity-80`}>Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser