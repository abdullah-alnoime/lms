import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Success } from "../success";
import * as Yup from "yup";
import axios from "axios";
import {
    UserPlus,
    Send,
    ExternalLink,
    Loader2,
    AlertCircle,
} from "lucide-react";

const Register = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, "الاسم يجب أن يحتوي على حرفين على الأقل")
            .max(50, "الاسم طويل جداً")
            .matches(/^[a-zA-Zأ-ي\s]+$/, "الاسم يجب أن يحتوي على أحرف فقط")
            .required("الاسم مطلوب"),
        phoneNumber: Yup.string()
            .matches(/^09\d{8}$/, "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 09 متبوعا بثمانية أرقام")
            .required("رقم الواتساب مطلوب"),
        message: Yup.string()
            .min(10, "الرسالة يجب أن تحتوي على 10 أحرف على الأقل")
            .max(500, "الرسالة طويلة جداً (الحد الأقصى 500 حرف)")
            .required("الرسالة مطلوبة")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            phoneNumber: "",
            message: ""
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                setStatus({ type: "", message: "" });
                const formData = new URLSearchParams();
                formData.append("form-name", "registration");
                formData.append("name", values.name);
                formData.append("phoneNumber", values.phoneNumber);
                formData.append("message", values.message);
                const response = await axios.post("/", formData, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                });
                if (response.status === 200) {
                    setSubmittedData({
                        name: values.name,
                        phoneNumber: values.phoneNumber,
                        message: values.message
                    });
                    setShowSuccess(true);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error("Form submission error:", error);
                setStatus({
                    type: "error",
                    message: "حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى."
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    const hasError = (fieldName) => formik.touched[fieldName] && formik.errors[fieldName];
    const getErrorMessage = (fieldName) => hasError(fieldName) ? formik.errors[fieldName] : "";

    if (showSuccess && submittedData) {
        return (
            <div
                className="w-full max-w-4xl mx-auto flex flex-col justify-center"
            >
                <Success setShowSuccess={setShowSuccess} />
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col justify-center gap-6">
            <div
                className="bg-neutral-50 dark:bg-neutral-700 rounded-md p-6"
            >
                <div className="flex justify-center">
                    <UserPlus className="h-12 w-12 text-blue-600 dark:text-blue-300" />
                </div>
                <h2 className="my-6 text-center text-3xl font-bold text-gray-900 dark:text-neutral-100">
                  للتسجيل أو الاستفسار املئ البيانات أدناه.
                </h2>
            </div>

            <div
                className="sm:px-10"
            >
                {formik.status?.type === "error" && (
                    <div
                        className="rounded-md bg-red-50 dark:bg-neutral-700 p-4 mb-4"
                    >
                        <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 ml-2" />
                            <p className="text-red-800 dark:text-red-300">{formik.status.message}</p>
                        </div>
                    </div>
                )}

                <form
                    className="space-y-6"
                    onSubmit={formik.handleSubmit}
                    name="registration"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                >
                    <input type="hidden" name="form-name" value="registration" />
                    <div style={{ display: "none" }}>
                        <label>
                            Don't fill this out if you're human:
                            <input name="bot-field" />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-neutral-100">
                            الاسم الكامل <span className="text-red-500 dark:text-red-300">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`appearance-none dark:bg-neutral-700 dark:text-neutral-300 dark:caret-neutral-200 block w-full px-3 py-3 border rounded-md placeholder-gray-400 dark:placeholder-neutral-300 focus:outline-none sm:text-sm ${
                                    hasError("name")
                                        ? "border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400"
                                        : "border-gray-300 dark:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-200"
                                }`}
                                placeholder="ادخل اسمك الكامل"
                            />
                            {hasError("name") && (
                                <div className="flex items-center mt-2">
                                    <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-300 ml-1" />
                                    <p className="text-sm text-red-600 dark:text-red-300">
                                        {getErrorMessage("name")}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-neutral-100">
                            رقم الواتساب <span className="text-red-500 dark:text-red-300">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`block dark:text-neutral-300 dark:bg-neutral-700 w-full p-3 border rounded-md placeholder-gray-400 dark:placeholder-neutral-300 focus:outline-none sm:text-sm ${
                                    hasError("phoneNumber")
                                        ? "border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400"
                                        : "border-gray-300 dark:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-200"
                                }`}
                                placeholder="0912345678"
                            />
                            {hasError("phoneNumber") && (
                                <div className="flex items-center mt-2">
                                    <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-300 ml-1" />
                                    <p className="text-sm text-red-600 dark:text-red-300">
                                        {getErrorMessage("phoneNumber")}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-neutral-100">
                            رسالة <span className="text-red-500 dark:text-red-300">*</span>
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`p-3 resize-none focus:outline-none block dark:text-neutral-300 dark:bg-neutral-700 w-full sm:text-sm dark:placeholder-neutral-300 border rounded-md ${
                                    hasError("message")
                                        ? "border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400"
                                        : "border-gray-300 dark:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-200"
                                }`}
                                placeholder="اكتب رسالتك هنا.."
                            />
                            {hasError("message") && (
                                <div className="flex items-center mt-2">
                                    <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-300 ml-1" />
                                    <p className="text-sm text-red-600 dark:text-red-300">
                                        {getErrorMessage("message")}
                                    </p>
                                </div>
                            )}
                            <div className="flex justify-between items-center mt-2">
                                <p className={`text-sm self-end ${
                                    formik.values.message.length > 500 
                                        ? "text-red-500 dark:text-red-300" 
                                        : formik.values.message.length >= 10 
                                            ? "text-green-500 dark:text-green-300" 
                                            : "text-gray-400 dark:text-neutral-300"
                                }`}>
                                    {formik.values.message.length}/500
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
                            <p className="text-sm text-red-600 dark:text-red-300">
                                يرجى تصحيح الأخطاء أعلاه قبل الإرسال
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={formik.isSubmitting || !formik.isValid}
                            className="w-full max-w-md mx-auto flex justify-center items-center py-3 px-2 border border-none rounded-md shadow font-medium text-white dark:text-black bg-blue-600 dark:bg-blue-200 hover:bg-blue-700 dark:hover:bg-blue-300 focus:outline-none transition-all duration-200 disabled:pointer-events-none disabled:bg-gray-200 disabled:text-gray-500 dark:disabled:bg-neutral-900 dark:disabled:text-neutral-500 "
                        >
                            {formik.isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin ml-3 h-5 w-5 text-white dark:text-black" />
                                    يتم المعالجة...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4 ml-2" />
                                    تسجيل
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;