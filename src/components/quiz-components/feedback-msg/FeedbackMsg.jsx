import { CircleCheck, CircleAlert } from "lucide-react";

const FeedbackMsg = ({ isCorrect }) => {
    return (
            <div
                className={`p-4 rounded-lg ${
                    isCorrect
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                } text-center font-bold`}
            >
                <div className="flex items-center justify-center">
                    {isCorrect ? (
                        <>
                            <CircleCheck className="w-5 h-5 ml-2" />
                            إجابة صحيحة
                        </>
                    ) : (
                        <>
                            <CircleAlert className="w-5 h-5 ml-2" />
                            إجابة خاطئة
                        </>
                    )}
                </div>
            </div>
    );
};

export default FeedbackMsg;