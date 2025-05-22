const TaskOptions = () => {
  return (
    <div className="border-2 rounded-md border-[#242424] px-8 py-10 mt-8">
      <h3 className="text-2xl">Task options</h3>
      <div className="flex gap-16 mt-6">
        <button className="py-2 px-6 rounded-md bg-blue-500 cursor-pointer transition-all duration-300 hover:opacity-80">Add Task</button>
        <button className="py-2 px-6 rounded-md bg-orange-500 cursor-pointer transition-all duration-300 hover:opacity-80">Update Task</button>
        <button className="py-2 px-6 rounded-md bg-red-500 cursor-pointer transition-all duration-300 hover:opacity-80">Remove Task</button>
        <button className="py-2 px-6 rounded-md bg-green-800 cursor-pointer transition-all duration-300 hover:opacity-80">Completed Tasks</button>
        <button className="py-2 px-6 rounded-md bg-purple-500 cursor-pointer transition-all duration-300 hover:opacity-80">All Tasks</button>
      </div>
    </div>
  )
}

export default TaskOptions