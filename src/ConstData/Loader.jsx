const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-28 bg-gray-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-opacity-50"></div>
        <div className="absolute top-2 left-2 h-16 w-16 border-t-4 border-blue-500 rounded-full animate-spin-reverse"></div>
        <div className="absolute top-5 left-5 h-10 w-10 bg-blue-500 rounded-full opacity-80"></div>
      </div>
      <p className="mt-6 text-lg font-semibold text-gray-600 animate-pulse">
        Please Wait, Loading...
      </p>
    </div>
  );
};

export default Loader;
