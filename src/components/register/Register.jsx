import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
    UserPlus,
    Send,
    Phone,
    ExternalLink,
    CheckCircle2,
    Loader2,
    AlertCircle,
    Star,
    Heart,
    MessageCircle,
    ArrowRight
} from "lucide-react";

// Custom Success Component
const SuccessComponent = ({ userDetails, onReset, whatsappLink }) => {
    const [showConfetti, setShowConfetti] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10 rounded-xl"></div>
            
            {/* Confetti Animation */}
            {showConfetti && (
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute animate-bounce`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 30}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        >
                            {i % 4 === 0 && <Star className="h-4 w-4 text-yellow-400" />}
                            {i % 4 === 1 && <Heart className="h-4 w-4 text-red-400" />}
                            {i % 4 === 2 && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                            {i % 4 === 3 && <MessageCircle className="h-4 w-4 text-blue-400" />}
                        </div>
                    ))}
                </div>
            )}

            <div className="relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-8 border border-green-200 dark:border-green-700 shadow-2xl">
                {/* Success Icon with Animation */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30"></div>
                        <div className="relative bg-green-500 dark:bg-green-600 rounded-full p-4">
                            <CheckCircle2 className="h-12 w-12 text-white animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Main Success Message */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        🎉 تم الإرسال بنجاح!
                    </h2>
                    <p className="text-lg text-green-700 dark:text-green-300 mb-2">
                        شكراً لك <span className="font-semibold text-blue-600 dark:text-blue-400">{userDetails.name}</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        تم استلام رسالتك وسيتم الرد عليك قريباً على رقم الواتساب
                    </p>
                </div>

                {/* User Details Summary */}
                <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <MessageCircle className="h-5 w-5 ml-2 text-blue-500" />
                        ملخص رسالتك
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">الاسم:</span>
                            <span className="text-sm text-gray-800 dark:text-gray-200">{userDetails.name}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">الهاتف:</span>
                            <span className="text-sm text-gray-800 dark:text-gray-200">{userDetails.phoneNumber}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">الرسالة:</span>
                            <span className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                                {userDetails.message.length > 100 
                                    ? `${userDetails.message.substring(0, 100)}...` 
                                    : userDetails.message
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    {/* WhatsApp Direct Button */}
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex justify-center items-center py-3 px-4 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                    >
                        <ExternalLink className="h-5 w-5 ml-2" />
                        انضم إلى مجموعة الواتساب الآن
                    </a>

                    {/* Send Another Message Button */}
                    <button
                        onClick={onReset}
                        className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
                    >
                        <Send className="h-5 w-5 ml-2" />
                        إرسال رسالة أخرى
                    </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <div className="bg-blue-500 rounded-full p-1">
                                <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="mr-3">
                            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                الخطوات التالية
                            </h4>
                            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>سيتم مراجعة رسالتك خلال 24 ساعة</li>
                                    <li>ستتلقى رداً على رقم الواتساب المُدخل</li>
                                    <li>يمكنك الانضمام لمجموعة الواتساب مباشرة</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Register = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    const whatsappGroupLink = "https://chat.whatsapp.com/CRF0BjA1t9q5HtCf9w747q";

    // Validation schema with Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, "الاسم يجب أن يحتوي على حرفين على الأقل")
            .max(50, "الاسم طويل جداً")
            .matches(/^[a-zA-Zأ-ي\s]+$/, "الاسم يجب أن يحتوي على أحرف فقط")
            .required("الاسم الكامل مطلوب"),
        
        phoneNumber: Yup.string()
            .matches(/^\+[1-9]\d{1,14}$/, "رقم الهاتف غير صحيح. يجب أن يبدأ بـ + متبوعاً برمز الدولة")
            .min(10, "رقم الهاتف قصير جداً")
            .max(17, "رقم الهاتف طويل جداً")
            .required("رقم الواتساب مطلوب"),
        
        message: Yup.string()
            .min(10, "الرسالة يجب أن تحتوي على 10 أحرف على الأقل")
            .max(500, "الرسالة طويلة جداً (الحد الأقصى 500 حرف)")
            .required("الرسالة مطلوبة")
    });

    // Formik hook
    const formik = useFormik({
        initialValues: {
            name: "",
            phoneNumber: "+963",
            message: ""
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
            try {
                setStatus({ type: "", message: "" });
                
                // Create form data for Netlify
                const formData = new URLSearchParams();
                formData.append("form-name", "registration");
                formData.append("name", values.name);
                formData.append("phoneNumber", values.phoneNumber);
                formData.append("message", values.message);

                // Submit to Netlify Forms
                const response = await axios.post("/", formData, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                });

                if (response.status === 200) {
                    // Store submitted data for success component
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

    // Helper function to check if field has error
    const hasError = (fieldName) => {
        return formik.touched[fieldName] && formik.errors[fieldName];
    };

    // Helper function to get error message
    const getErrorMessage = (fieldName) => {
        return hasError(fieldName) ? formik.errors[fieldName] : "";
    };

    // Handle success component reset
    const handleReset = () => {
        setShowSuccess(false);
        setSubmittedData(null);
        formik.resetForm();
        formik.setStatus({ type: "", message: "" });
    };

    // If success, show success component
    if (showSuccess && submittedData) {
        return (
            <div className="w-full max-w-4xl mx-auto flex flex-col justify-center gap-6 self-start">
                <SuccessComponent 
                    userDetails={submittedData}
                    onReset={handleReset}
                    whatsappLink={whatsappGroupLink}
                />
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col justify-center gap-6 self-start">
            {/* WhatsApp Group Section */}
            <div className="bg-neutral-50 dark:bg-neutral-700 rounded-md p-6">
                <div className="flex justify-center">
                    <UserPlus className="h-12 w-12 text-blue-600 dark:text-blue-500" />
                </div>
                <h2 className="my-6 text-center text-3xl font-bold text-gray-900 dark:text-neutral-100">
                    التسجيل على مجموعة الواتساب
                </h2>
                <a
                    href={whatsappGroupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-md mx-auto flex justify-center items-center py-3 px-2 border border-blue-600 dark:border-blue-200 dark:hover:border-blue-300 rounded-md shadow-sm font-medium text-blue-600 bg-white hover:bg-blue-50 outline-none dark:bg-blue-200 dark:text-black hover:bg-blue-700 dark:hover:bg-blue-300"
                >
                    <ExternalLink className="h-5 w-5 ml-2 dark:text-blue-500" />
                    انضم إلى المجموعة مباشرة
                </a>
            </div>

            {/* Form Section */}
            <div>
                <div className="sm:px-10">
                    {/* Success Message */}
                    {formik.status?.type === "success" && !showSuccess && (
                        <div className="rounded-md bg-green-50 dark:bg-neutral-600 p-4 mb-4">
                            <div className="grid gap-4 justify-center">
                                <div>
                                    <CheckCircle2 className="h-16 w-16 text-green-400 dark:text-green-300 mx-auto" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold dark:text-neutral-100">
                                        تم الإرسال بنجاح!
                                    </h3>
                                    <p className="text-gray-700 dark:text-neutral-200 mt-4">
                                        {formik.status.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {formik.status?.type === "error" && (
                        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 mb-4">
                            <div className="flex items-center">
                                <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-300 ml-2" />
                                <p className="text-red-800 dark:text-red-200">{formik.status.message}</p>
                            </div>
                        </div>
                    )}

                    {/* Hidden form for Netlify bot detection */}
                    <form name="registration" data-netlify="true" netlify-honeypot="bot-field" hidden>
                        <input type="text" name="name" />
                        <input type="tel" name="phoneNumber" />
                        <textarea name="message"></textarea>
                    </form>

                    {/* Main Form */}
                    <form 
                        className="space-y-6" 
                        onSubmit={formik.handleSubmit}
                        name="registration"
                        method="POST"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                    >
                        {/* Honeypot field */}
                        <input type="hidden" name="form-name" value="registration" />
                        <div style={{ display: "none" }}>
                            <label>
                                Don't fill this out if you're human: 
                                <input name="bot-field" />
                            </label>
                        </div>

                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-neutral-100"
                            >
                                الاسم الكامل <span className="text-red-500">*</span>
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
                                        <AlertCircle className="h-4 w-4 text-red-500 ml-1" />
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {getErrorMessage("name")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Phone Number Field */}
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700 dark:text-neutral-100"
                            >
                                رقم الواتساب <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400 dark:text-neutral-300" />
                                </div>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`block dark:text-neutral-300 dark:bg-neutral-700 w-full pl-10 pr-3 py-3 border rounded-md placeholder-gray-400 dark:placeholder-neutral-300 focus:outline-none sm:text-sm ${
                                        hasError("phoneNumber")
                                            ? "border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400"
                                            : "border-gray-300 dark:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-200"
                                    }`}
                                    placeholder="+963912345678"
                                />
                                {hasError("phoneNumber") && (
                                    <div className="flex items-center mt-2">
                                        <AlertCircle className="h-4 w-4 text-red-500 ml-1" />
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {getErrorMessage("phoneNumber")}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
                                يجب تضمين رمز الدولة (مثال: +963)
                            </p>
                        </div>

                        {/* Message Field */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 dark:text-neutral-100"
                            >
                                رسالة <span className="text-red-500">*</span>
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
                                    placeholder="أخبرني بما يجول في خاطرك.. (10-500 حرف)"
                                />
                                {hasError("message") && (
                                    <div className="flex items-center mt-2">
                                        <AlertCircle className="h-4 w-4 text-red-500 ml-1" />
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {getErrorMessage("message")}
                                        </p>
                                    </div>
                                )}
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-sm text-gray-500 dark:text-neutral-400">
                                        الحد الأدنى: 10 أحرف | الحد الأقصى: 500 حرف
                                    </p>
                                    <p className={`text-sm ${
                                        formik.values.message.length > 500 
                                            ? "text-red-500" 
                                            : formik.values.message.length >= 10 
                                                ? "text-green-500" 
                                                : "text-gray-400"
                                    }`}>
                                        {formik.values.message.length}/500
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={formik.isSubmitting || !formik.isValid}
                                className={`w-full flex justify-center items-center py-3 px-2 border border-none rounded-md shadow font-medium text-white dark:text-black bg-blue-600 dark:bg-blue-200 hover:bg-blue-700 dark:hover:bg-blue-300 focus:outline-none transition-all duration-200 ${
                                    formik.isSubmitting || !formik.isValid
                                        ? "cursor-not-allowed opacity-50"
                                        : "hover:shadow-lg"
                                }`}
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
                            
                            {/* Form validation status */}
                            {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
                                <div className="text-center">
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        يرجى تصحيح الأخطاء أعلاه قبل الإرسال
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;