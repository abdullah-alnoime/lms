import { CircleCheck, CircleAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FeedbackMsg = ({ isCorrect }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isCorrect ? "correct" : "incorrect"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
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
            </motion.div>
        </AnimatePresence>
    );
};

export default FeedbackMsg;