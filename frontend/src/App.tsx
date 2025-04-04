export default App;
function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <p className="font-bold text-xl">Boilerplate - semi TS</p>
          </div>
        </header>

        <main className="flex-grow">
          <div className="flex flex-col items-center justify-center h-screen px-4">
            <h1 className="text-4xl font-bold mb-6 text-center text-white">
              Welcome to the Boilerplate!
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
              <div className="bg-gray-700 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-3 text-blue-300">React + Vite</h2>
                <p className="text-gray-300">Modern frontend setup with React and Vite.</p>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Tailwind CSS</h2>
                <p className="text-gray-300">Utility-first CSS framework for custom designs.</p>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-3 text-blue-300">
                  Express Backend (Javascript)
                </h2>
                <p className="text-gray-300">Robust Node.js backend with Express.</p>
              </div>
            </div>

            <p className="text-lg mb-4 text-center text-gray-300">
              You can start building your application from here.
            </p>
            <p className="text-lg font-medium text-center text-white">Happy coding!</p>
          </div>
        </main>
      </div>
    </>
  );
}
