import React from 'react'

function Collection({productList}) {
  return (
    <section>
        {/*  <div className="max-w-7xl mx-auto mb-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8"> */}
    <div className="max-w-7xl mx-auto mb-auto py-8 sm:py-12 ">
        <h2 className='text-primary text-2xl font-bold text-center my-8'>
            Recommendation
        </h2>
        <p className='mx-auto max-w-md text-gray-500 text-center mb-5'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
            dicta incidunt est ipsam.
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch mt-10">
        <div className="grid place-content-center rounded bg-[url('https://images.pexels.com/photos/7552737/pexels-photo-7552737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] p-6 sm:p-8">
            <div className="mx-auto max-w-md text-center lg:text-left">
            <header>
                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Favorite</h2>

                <p className="mt-4 text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas rerum quam amet
                provident nulla error!
                </p>
            </header>

            </div>
        </div>

        <div className="lg:col-span-2 ">
            <ul className="grid grid-cols-2 gap-4">
            <li>
                <a href="#" className="group block">
                <img
                    src="https://images.pexels.com/photos/7296682/pexels-photo-7296682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                    className="aspect-square w-full rounded object-cover"
                />

                <div className="mt-3">
                    <h3
                    className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4"
                    >
                    Macaron C Set
                    </h3>

                    <p className="mt-1 text-sm text-gray-700">13000won</p>
                </div>
                </a>
            </li>

            <li>
                <a href="#" className="group block">
                <img
                    src="https://images.pexels.com/photos/461431/pexels-photo-461431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                    className="aspect-square w-full rounded object-cover"
                />

                <div className="mt-3">
                    <h3
                    className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4"
                    >
                    Tart
                    </h3>

                    <p className="mt-1 text-sm text-gray-700">30000won</p>
                </div>
                </a>
            </li>
            </ul>
        </div>
        </div>
    </div>
    </section>
  )
}

export default Collection
