function Dashboard() {

  return (
    <div class="bg-gray-50 min-h-screen p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      
      {/* <!-- Dashboard Design Card (Low) --> */}
      <div class="bg-white rounded-xl shadow-sm p-5 flex flex-col transition-all duration-200 hover:shadow-md hover:scale-[1.01] hover:border-gray-300 border border-transparent">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-gray-800">Dashboard Design</h3>
          <button class="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Low</span>
          <span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">On Track</span>
        </div>
        
        <p class="text-gray-600 text-sm mb-6">Discussion for management dashboard UI design</p>
        
        <div class="mt-auto flex items-center text-sm text-gray-500">
          <div class="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            112
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            1.2k
          </div>
        </div>
      </div>
  
      
      {/* <!-- E-Shop Mobile App Card with Thumbnails --> */}
      <div class="bg-white rounded-xl shadow-sm p-5 flex flex-col transition-all duration-200 hover:shadow-md hover:scale-[1.01] hover:border-gray-300 border border-transparent">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center">
            <div class="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="font-bold text-gray-800">E-Shop Mobile App</h3>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Low</span>
          <span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">On Track</span>
        </div>
        
        <p class="text-gray-600 text-sm mb-4">Discussion for management dashboard UI design</p>
        
        {/* <!-- Preview Images - Two thumbnails side by side --> */}
        <div class="grid grid-cols-2 gap-2 mb-4">
          <img src="https://placehold.co/400" alt="Mobile App Preview 1" class="rounded-lg w-full h-auto" />
          <img src="https://placehold.co/400" alt="Mobile App Preview 2" class="rounded-lg w-full h-auto" />
        </div>
        
        <div class="mt-auto flex items-center text-sm text-gray-500">
          <div class="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            112
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            1.2k
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Dashboard;