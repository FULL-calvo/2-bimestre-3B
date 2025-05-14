import React from "react";

function Main() {
  return (
    <div class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-8 mx-auto">
        <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">planos</h1>

        <div class="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700">
                <p class="font-medium text-gray-500 uppercase dark:text-gray-300">gratis</p>

                <h2 class="text-4xl font-semibold text-gray-800 uppercase dark:text-gray-100">
                    $1000
                </h2>

                <p class="font-medium text-gray-500 dark:text-gray-300">mês</p>

                         <a href="https://www.youtube.com/premium?ybp=Sg0IBhIJdW5saW1pdGVk4AEB" target="_blank">
             <button class="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                 assinar
             </button>
             </a>
            </div>

            <div class="w-full p-8 space-y-8 text-center bg-blue-600 rounded-lg">
                <p class="font-medium text-gray-200 uppercase">pro</p>

                <h2 class="text-5xl font-bold text-green-500 uppercase dark:text-green-400">
                    $400
                </h2>

                <p class="font-medium text-gray-200"> mês</p>

                                <a href="https://www.youtube.com/premium?ybp=Sg0IBhIJdW5saW1pdGVk4AEB" target="_blank">
                    <button class="w-full px-4 py-2 mt-10 tracking-wide text-blue-500 capitalize transition-colors duration-300 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring focus:ring-gray-200 focus:ring-opacity-80">
                        assinar
                    </button>
                </a>

            </div>

            <div class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700">
                <p class="font-medium text-gray-500 uppercase dark:text-gray-300">empresarial</p>

                <h2 class="text-4xl font-semibold text-gray-800 uppercase dark:text-gray-100">
                    $100
                </h2>

                <p class="font-medium text-gray-500 dark:text-gray-300">mês</p>
            
                           <a href="https://www.youtube.com/premium?ybp=Sg0IBhIJdW5saW1pdGVk4AEB" target="_blank">
               <button class="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                   assinar
               </button>
           </a>

            </div>
        </div>
    </div>
</div>
  );
}
export default Main;