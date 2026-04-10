import { useEffect, useState } from 'react';
import { CircleX, DeleteIcon, Edit3, IndianRupee, Search, Sparkles } from 'lucide-react';
import { useGetAllServices } from '../../../../stores/admin/allServices';
import LoadingSpinner from '../../../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EditServices = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    //edit service modal state
    const [selectedService, setSelectedService] = useState(null);
    const [editFormData, setEditFormData] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    // delete service modal state
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const getAllServices = useGetAllServices(state => state.getAllServices);
    const services = useGetAllServices(state => state.services);

    // update serive from store
    const editService = useGetAllServices(state => state.editService);
    const loading = useGetAllServices(state => state.loading);

    // message from store after edit or delete service
    const message = useGetAllServices(state => state.message);


    //delete service from store
    const deleteService = useGetAllServices(state => state.deleteService);


    // Call getAllServices only once on mount
    useEffect(() => {
        getAllServices();
        // eslint-disable-next-line
    }, []);

    // ✅ FIX: correctly set selected service + form data
    const handleEditClick = (service) => {
        setSelectedService(service);
        setEditFormData(service); // clone bhi kar sakte ho if needed
        setIsDirty(false);
    };

    // ✅ Dirty check
    useEffect(() => {
        if (!selectedService || !editFormData) return;

        const hasChanged =
            JSON.stringify(editFormData) !== JSON.stringify(selectedService);

        setIsDirty(hasChanged);
    }, [editFormData, selectedService]);

    const handleEditFormDataChange = (e) => {
        const { name, value } = e.target;

        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const handleModalSubmit = async (e) => {
        e.preventDefault();

        try {
            await editService(selectedService._id, editFormData);
            // Success toast will be handled by message effect
            setSelectedService(null);
            setEditFormData(null);
            setIsDirty(false);
            navigate("/admin/services");
        } catch (error) {
            console.log(error);
            // Error toast will be handled by message effect
        }
    };

    // handle delete service
    const handleDeleteService = (service) => {
        setServiceToDelete(service);
        setDeleteModalOpen(true);
    };

    // Show toast only when message changes and is not null
    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, [message]);

    //handle confirm delete
    const handleConfirmDelete = async () => {
        if (!serviceToDelete) return;

        setDeleteLoading(true);

        try {
            await deleteService(serviceToDelete._id);

            toast.success(message || "Service deleted successfully!");

            setDeleteModalOpen(false);
            setServiceToDelete(null);

        } catch (err) {
            console.error(err);
            toast.error(message || err?.message);
        } finally {
            setDeleteLoading(false);
        }
    };

    // debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const filteredServices = Array.isArray(services)
        ? services.filter((service) => {
            const searchLower = debouncedSearch.toLowerCase();

            return (
                service.name.toLowerCase().includes(searchLower) ||
                service.subTitle.toLowerCase().includes(searchLower)
            );
        })
        : [];

    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto w-full h-full bg-[#1e1e1e]">

            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full max-w-7xl mx-auto pl-12 md:pl-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                        <Sparkles className="text-amber-500" size={24} />
                        Edit Service Menu
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Edit Services</p>
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

                        {/* CTA button */}
                        <div
                            className='w-full px-8 pb-4 flex items-center justify-end gap-10'
                        >
                            <Edit3
                                className="text-blue-500 cursor-pointer"
                                size={18}
                                onClick={() => handleEditClick(service)}
                            />
                            <DeleteIcon
                                onClick={() => handleDeleteService(service)}
                                className="text-red-500 cursor-pointer" size={20}
                            />
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

            {/* update modal overlays */}
            {selectedService && editFormData && (
                <div
                    id='edit-modal'
                    className="fixed inset-0 bg-zinc-900/50 backdrop-blur-md flex items-center justify-center z-50"
                >
                    <div
                        className='bg-[#1e1e1e] border border-zinc-700 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200'
                    >
                        <div
                            className='relative w-full h-48 overflow-hidden'
                        >
                            <img
                                src={selectedService.image}
                                alt={selectedService.name}
                                className="w-full h-full object-cover object-center" />

                            <CircleX className="absolute right-0 top-0 m-4 text-white cursor-pointer" size={20} onClick={() => setSelectedService(null)} />

                        </div>

                        <form className='p-5 flex flex-col flex-1 gap-4' onSubmit={handleModalSubmit}>

                            <div className='w-full flex flex-col gap-1.5'>
                                <label htmlFor="service-name" className='text-sm text-white font-bold'>Service Name</label>
                                <input
                                    id='service-name'
                                    name="name"
                                    value={editFormData.name || ''}
                                    onChange={handleEditFormDataChange}
                                    className="w-full bg-zinc-800 text-white px-2.5 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 border border-white placeholder-gray-500 transition-all text-sm"
                                />
                            </div>

                            <div className='w-full flex flex-col gap-1.5'>
                                <label htmlFor="service-subTitle" className='text-sm text-white font-bold'>Service Subtitle</label>
                                <input
                                    id='service-subTitle'
                                    name="subTitle"
                                    value={editFormData.subTitle || ''}
                                    onChange={handleEditFormDataChange}
                                    className="w-full bg-zinc-800 text-white px-2.5 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 border border-white placeholder-gray-500 transition-all text-sm"
                                />
                            </div>

                            <div className='w-full flex flex-col gap-1.5'>
                                <label htmlFor="service-description" className='text-sm text-white font-bold'>Service Description</label>
                                <textarea
                                    name="description"
                                    value={editFormData.description || ''}
                                    onChange={handleEditFormDataChange}
                                    className="w-full bg-zinc-800 text-white px-2.5 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 border border-white placeholder-gray-500 transition-all text-sm"
                                />
                            </div>

                            <div className='w-full flex flex-col gap-1.5'>
                                <label htmlFor="price" className='text-sm text-white font-bold flex gap-1.5 items-center'>Service Price <IndianRupee size={12} /></label>
                                <input
                                    id='price'
                                    name="price"
                                    value={editFormData.price || ''}
                                    onChange={handleEditFormDataChange}
                                    className="w-full bg-zinc-800 text-white px-2.5 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 border border-white placeholder-gray-500 transition-all text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!isDirty}
                                className={`w-full py-1.5 bg-yellow-500 text-white font-semibold text-xl rounded-xl active:scale-95 transition-transform duration-100 ${!isDirty ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                            >
                                {loading ? <LoadingSpinner /> : 'Save'}
                            </button>

                        </form>

                    </div>

                </div>
            )}

            {/* delete modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-md flex items-center justify-center z-50">

                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm">

                        <h2 className="text-lg font-semibold text-white mb-3">
                            Delete Service
                        </h2>

                        <p className="text-sm text-gray-400 mb-6">
                            Are you sure you want to delete{" "}
                            <span className="text-yellow-500 italic font-semibold">
                                {serviceToDelete?.name}
                            </span>
                            &nbsp;? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="px-4 py-2 rounded-lg bg-zinc-700 text-white"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirmDelete}
                                disabled={deleteLoading}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white"
                            >
                                {deleteLoading ? "Deleting..." : "Delete"}
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
export default EditServices;
