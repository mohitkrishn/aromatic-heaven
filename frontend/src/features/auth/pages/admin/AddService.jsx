import { PlusCircle } from "lucide-react"
import { useState } from "react";
import { addService } from "../../services/admin.api";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const AddService = () => {

    //loading state
    const [loading, setLoading] = useState(false);

    //form data state
    const [formData, setFormData] = useState({
        name: "",
        subTitle: "",
        description: "",
        price: "",
    });

    //image file state
    const [image, setImage] = useState(null);

    //input change handler other than file/image
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    //input change handler for file/image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const navigate = useNavigate();

    // form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission

        // create form data
        const newFormData = new FormData();
        newFormData.append("name", formData.name);
        newFormData.append("subTitle", formData.subTitle);
        newFormData.append("description", formData.description);
        newFormData.append("price", formData.price);
        newFormData.append("image", image);    // append image file to form data

        try {
            setLoading(true);

            const response = await addService(newFormData); // send form data to backend

            if (response.success) {
                toast.success(response?.message || "Service added successfully!");

                setFormData({
                    name: "",
                    subTitle: "",
                    description: "",
                    price: "",
                });

                setImage(null);

                navigate("/admin/services");
            }

        } catch (error) {
            setLoading(false);
            // console.log(error);
            toast.error(error?.message || "Failed to add service. Please try again.");
        }

    }

    return (
        <main className="w-full h-screen">
            {/* header area */}
            <section className="w-full py-6 px-4">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                        <PlusCircle className="text-amber-500" size={24} />
                        Add Service
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Add new services here</p>
                </div>
            </section>

            {/* form area */}
            <section className="w-full h-[calc(100%-4.5rem)] flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm h-fit flex flex-col gap-4 mt-6 bg-zinc-900 p-4 rounded-3xl"
                >
                    <div className="relative w-20 h-20 mx-auto rounded-full border border-yellow-500 overflow-hidden">
                        <input
                            type="file"
                            className="w-full h-full opacity-0"
                            name="image"
                            accept="image/jpg, image/jpeg, image/png, image/webp, image/avif"
                            onChange={handleImageChange}
                            required
                        />

                        {image && <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                            className="absolute top-0 left-0 w-full h-full object-cover object-center"
                        />}

                    </div>

                    <input
                        type="text"
                        placeholder="Service Name *"
                        className="w-full pt-2 border-b border-b-yellow-600 focus:outline-none"
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Service Sub Title *"
                        className="w-full pt-2 border-b border-b-yellow-600 focus:outline-none"
                        value={formData.subTitle}
                        name="subTitle"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        placeholder="Service Description *"
                        className="w-full pt-2 px-1.5 border border-yellow-600 focus:outline-none"
                        value={formData.description}
                        name="description"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Price *"
                        className="w-full pt-2 border-b border-b-yellow-600 focus:outline-none"
                        value={formData.price}
                        name="price"
                        onChange={handleChange}
                        required
                    />

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full h-10 bg-yellow-600 text-white rounded-lg mt-2 cursor-pointer active:scale-95 transition-transform duration-200"
                    >
                        {loading ? <LoadingSpinner /> : "Add Service"}
                    </button>
                </form>
            </section>
        </main>
    )
}

export default AddService