const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center pt-28">
            <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-50"></div>
                <div className="absolute top-0 left-0 h-16 w-16 border-t-4 border-primary rounded-full animate-spin-slow"></div>
            </div>
            <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">Loading, please wait...</p>
        </div>
    );
};

export default Loader;