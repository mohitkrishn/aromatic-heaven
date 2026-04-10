import { useEffect, useState } from 'react';
import { IndianRupee, Search, Sparkles } from 'lucide-react';
import { useGetAllServices } from '../../../../stores/admin/allServices';

const ServiceList = () => {

    // search states
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // get all services
    const getAllServices = useGetAllServices(state => state.getAllServices);
    const services = useGetAllServices(state => state.services);

    useEffect(() => {
        getAllServices();
    }, [getAllServices]);

    // debouncing logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Filtering Logic
    const filteredServices = Array.isArray(services) ? services.filter((service) => {
        const searchLower = debouncedSearch.toLowerCase();

        return (
            service.name.toLowerCase().includes(searchLower) ||
            service.subTitle.toLowerCase().includes(searchLower)
        )
    }) : [];

    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto w-full h-full bg-[#1e1e1e]">

            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full max-w-7xl mx-auto pl-12 md:pl-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                        <Sparkles className="text-amber-500" size={24} />
                        Service Menu
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">All services are listed here</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-zinc-800 text-white pl-10 pr-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 border border-zinc-700 placeholder-gray-500 transition-all text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* --- RESPONSIVE GRID SYSTEM --- */}
            {/* Grid Rules:
        - Mobile (default): 1 column (grid-cols-1)
        - Tablet (md): 2 columns (md:grid-cols-2)
        - Laptop (lg): 3 columns (lg:grid-cols-3)
        - Desktop (xl): 4 columns (xl:grid-cols-4)
      */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">

                {filteredServices.map((service) => (
                    <div
                        key={service._id}
                        className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-amber-500/10 flex flex-col h-full"
                    >
                        {/* 1. Service Image (Fixed height, object-cover for consistency) */}
                        <div className="h-48 w-full relative overflow-hidden bg-zinc-800">
                            <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out opacity-90 group-hover:opacity-100"
                            />
                            {/* Optional overlay gradient for premium look */}
                            <div className="absolute inset-0 bg-linear-to-t from-zinc-900 to-transparent opacity-60"></div>
                        </div>

                        {/* Card Content Area */}
                        <div className="p-5 flex flex-col flex-1">

                            {/* 2 & 3. Name and Subtitle */}
                            <div className="mb-3">
                                <h3 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-amber-400 transition-colors">
                                    {service.name}
                                </h3>
                                <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                                    {service.subTitle}
                                </p>
                            </div>

                            {/* 4. Service Description */}
                            {/* line-clamp-3 ensures it only takes 3 lines, keeping card heights perfectly aligned */}
                            <p className="text-sm text-gray-400 line-clamp-3 mb-5 flex-1 leading-relaxed">
                                {service.description}
                            </p>

                            {/* 5. Price */}
                            <p className="text-sm font-semibold text-amber-500 flex items-center gap-1.5">
                                <IndianRupee size={15} /> {service.price}
                            </p>
                        </div>
                    </div>
                ))}

            </div>

            {/* Empty State when search fails */}
            {filteredServices.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <Sparkles size={48} className="text-zinc-700 mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-gray-400">No services found</h3>
                    <p className="text-sm">Try adjusting your search keywords.</p>
                </div>
            )}

        </div>
    );
};

export default ServiceList;