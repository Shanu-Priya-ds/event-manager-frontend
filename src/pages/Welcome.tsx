import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Calendar, Users, Zap, ArrowRight, Check } from "lucide-react";
import { useEffect } from "react";

function Welcome() {
    const navigate = useNavigate();
    const { user, token } = useAuth();

  useEffect(() => {
    if (user && token) {
        navigate("/home");
    }
}, [user, token, navigate]);

    const features = [
        {
            icon: Calendar,
            title: "Create & Manage Events",
            description: "Easily create, edit, and manage your events with an intuitive interface"
        },
        {
            icon: Users,
            title: "Event Registration",
            description: "Streamline event registrations and manage attendees effortlessly"
        },
        {
            icon: Zap,
            title: "Real-time Updates",
            description: "Stay updated with real-time notifications for all event activities"
        }
    ];

    const steps = [
        { number: 1, title: "Create Account", description: "Sign up for free in seconds" },
        { number: 2, title: "Create Events", description: "Post your events and set details" },
        { number: 3, title: "Manage Registrations", description: "Track attendees and registrations" }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <Calendar size={22} className="text-white" />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Event Manager</h1>
                                <p className="text-xs text-gray-500 -mt-1">Manage with ease</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                                Manage Events
                                <span className="text-gray-700"> Effortlessly</span>
                            </h1>
                            <p className="mt-6 text-xl text-gray-600">
                                Create, organize, and manage events with ease. From planning to execution, handle everything in one powerful platform.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate("/register")}
                                className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
                            >
                                Get Started
                                <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="px-8 py-4 border-2 border-gray-800 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            >
                                Sign In
                            </button>
                        </div>

                        <div className="flex items-center gap-8 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Check size={20} className="text-green-600" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={20} className="text-green-600" />
                                <span>Free forever</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                                alt="Event Management"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Powerful Features for Event Management
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Everything you need to create and manage successful events
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-8 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-200 bg-white"
                                >
                                    <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                        <Icon size={28} className="text-gray-700" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900">
                            How It Works
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Get started in three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-gray-800 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {step.description}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-1 bg-gradient-to-r from-gray-800 to-transparent"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg text-gray-300 mb-8">
                        Join thousands of event organizers who trust our platform
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/register")}
                            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                        >
                            Create Free Account
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
                        >
                            Sign In to Your Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h3 className="text-white font-bold text-lg">Event Management System</h3>
                            <p className="text-sm mt-1">Making event management simple and effortless</p>
                        </div>
                        <div className="text-sm mt-6 md:mt-0">
                            <p>&copy; 2026 Event Management System. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Welcome;