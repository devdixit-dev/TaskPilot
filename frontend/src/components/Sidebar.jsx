const Sidebar = () => {
  return (
    <div class="flex w-1/6 mx-10 p-4 flex-col overflow-hidden border-2 border-[#242424] rounded-md">

      <div class="flex h-[52px] items-center justify-center px-2">
        <p class="w-full flex items-center justify-between rounded-md border-2 border-[#242424] px-3 py-2 text-sm shadow-sm">
          <span class="truncate text-[16px]">Welcome, Admin</span>
        </p>
      </div>


      <div class="h-px w-full bg-border"></div>


      <div class="py-2">
        <nav class="sidebar grid gap-1 px-2">
          <a href="#" class="h-9 flex items-center justify-between rounded-md bg-primary px-3 text-sm font-medium text-white">Total Tasks<span class="ml-auto text-xs">128</span></a>
          <a href="#" class="h-9 flex items-center justify-between rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-accent">Pending Tasks <span class="ml-auto text-xs">9</span></a>
          <a href="#" class="h-9 flex items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-accent">On hold tasks <span class="ml-auto text-xs">9</span></a>
          <a href="#" class="h-9 flex items-center justify-between rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-accent">Urgent tasks<span class="ml-auto text-xs">23</span></a>
          <a href="#" class="h-9 flex items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-accent">Task completed <span class="ml-auto text-xs">9</span></a>
        </nav>
      </div>

      <div class="h-px w-full border-[#242424] border-1"></div>

      <div class="py-2">
        <nav class="grid gap-1 px-2">
          <a href="#" class="h-9 flex items-center justify-between rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-accent">Total managers <span class="ml-auto text-xs">300</span></a>
          <a href="#" class="h-9 flex items-center justify-between rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-accent">Total employee <span class="ml-auto text-xs">900</span></a>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar