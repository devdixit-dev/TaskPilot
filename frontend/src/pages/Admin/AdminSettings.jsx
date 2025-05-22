import Navbar from "../../components/Navbar"

const AdminSettings = () => {
  return (
    <div class="hidden space-y-6 px-10 py-10 pb-16 md:block">

      <div class="space-y-0.5">
        <h2 class="text-2xl tracking-tight">Settings</h2>
        <p class="text-muted-foreground">
          Manage your account settings
        </p>
      </div>

      <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">

        <div class="flex-1 lg:max-w-2xl">
          <div class="space-y-6">
            <form class="space-y-8 flex flex-col gap-2">
              <div class="space-y-2 flex flex-col gap-2">
                <label for="orgName" class="text-md font-medium leading-none">Organization Name</label>
                <input
                  name="orgName"
                  type="text"
                  placeholder="Name"
                  class="w-full px-3 py-3 border rounded-md shadow-sm bg-transparent text-base placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div class="space-y-2 flex flex-col gap-2">
                <label for="email" class="text-md font-medium leading-none">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  class="w-full px-3 py-3 border rounded-md shadow-sm bg-transparent text-base placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div class="space-y-2 flex flex-col gap-2">
                <label for="url-0" class="text-md font-medium leading-none">URLs</label>
                <p class="text-sm text-muted-foreground">Add links to your website, blog, or social media profiles.</p>
                <input
                  id="url-0"
                  name="urls.0.value"
                  type="text"
                  placeholder="url 1"
                  class="w-full px-3 py-2 border rounded-md shadow-sm bg-transparent text-base placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div class="space-y-2">
                <input
                  id="url-1"
                  name="urls.1.value"
                  type="text"
                  placeholder="url 2"
                  class="w-full px-3 py-2 border rounded-md shadow-sm bg-transparent text-base placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <button type="submit" className={`py-2 px-4 rounded-md text-sm bg-white text-black cursor-pointer transition-all duration-300 hover:outline-1 hover:opacity-70`}>Update profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdminSettings