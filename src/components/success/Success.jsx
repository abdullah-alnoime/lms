import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const Success = ({ setShowSuccess }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const timerId = setTimeout(() => {
            setShowSuccess(false);
            navigate("/");
        }, 2000);
        return () => clearTimeout(timerId);
    }, [setShowSuccess, navigate]);
    return (
        <div
            className="bg-gray-50 dark:bg-neutral-700 rounded-xl p-6"
        >
            <div className="flex justify-center mb-6">
                <div
                    className="relative"
                >
                    <div className="absolute inset-0 bg-green-400 rounded-full" />
                    <div className="relative bg-green-500 rounded-full p-4 z-10">
                        <CheckCircle2 className="h-12 w-12 text-white" />
                    </div>
                </div>
            </div>

            <div
                className="text-center"
            >
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4">
                    تم الإرسال بنجاح!
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    تم استلام رسالتك وسيتم الرد عليك قريباً على رقم الواتساب
                </p>
            </div>
        </div>
    );
};

export default Success;