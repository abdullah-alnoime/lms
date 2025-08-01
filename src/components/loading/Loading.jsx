const Loading = () => {
    return (
        <div className="w-full h-64 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-lg">جارٍ التحميل...</p>
            </div>
        </div>
    );
};

export default Loading;