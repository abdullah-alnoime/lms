import { CheckCircle, XCircle, AlertCircle, Play, Loader } from "lucide-react";

const TestCaseOutput = ({ output, error, status }) => {
    const getStatusClass = () => {
        switch (status) {
            case "passed":
                return "bg-green-100 dark:bg-neutral-700 border-green-500 dark:border-green-300 text-green-800 dark:text-green-300";
            case "failed":
                return "bg-red-100 dark:bg-neutral-700 border-red-500 dark:border-red-400 text-red-800 dark:text-red-400";
            case "running":
                return "bg-blue-100 dark:bg-neutral-700 border-blue-500  dark:border-blue-200 text-blue-800 dark:text-blue-200";
            default:
                return "bg-gray-100 dark:bg-neutral-700 border-neutral-500  dark:border-neutral-300 text-gray-800 dark:text-neutral-100";
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case "passed":
                return (
                    <CheckCircle className="h-5 w-5 ml-2 dark:text-green-300" />
                );
            case "failed":
                return <XCircle className="h-5 w-5 ml-2 dark:text-red-400" />;
            default:
                return (
                    <AlertCircle className="h-5 w-5 ml-2 dark:text-neutral-400" />
                );
        }
    };

    return (
        <div className={`border-r-4 ps-3 py-3 rounded ${getStatusClass()}`}>
            {status === "running" ? (
                <div className="flex items-center">
                    <Loader className="h-5 w-5 ml-2 animate-spin" />
                    <span>جارِ التنفيذ</span>
                </div>
            ) : (
                <>
                    {status && (
                        <div className="font-bold mb-2 flex items-center">
                            {getStatusIcon()}
                            {status === "passed"
                                ? "تم اجتياز الاختبار"
                                : "فشل الاختبار"}
                        </div>
                    )}
                    {output && (
                        <div className="mb-2">
                            <h4 className="text-green-800 dark:text-neutral-100 mb-2">
                                الخرج الفعلي:
                            </h4>
                            <pre
                                className="bg-neutral-900 text-sm text-white p-3 rounded shadow-md overflow-x-auto whitespace-pre-wrap my-2"
                                dir="ltr"
                            >
                                {output}
                            </pre>
                        </div>
                    )}
                    {error && (
                        <div>
                            <h4 className="mb-2 text-red-800 dark:text-neutral-100">الخطأ:</h4>
                            <pre
                                className="bg-red-50 dark:bg-neutral-800 text-sm text-red-800 dark:text-red-400 p-2 rounded overflow-x-auto whitespace-pre-wrap max-h-36"
                                dir="ltr"
                            >
                                {error}
                            </pre>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TestCaseOutput;
