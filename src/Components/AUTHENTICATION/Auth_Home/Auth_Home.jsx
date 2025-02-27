import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Auth_Home = () => {
    // Slide Section Data/
    const slides = [
        { id: 'slide1', src: './image/demp.png', alt: 'slide-img-1', next: 'slide2', prev: 'slide3' },
        { id: 'slide2', src: './image/calimg11.png', alt: 'slide-img-2', next: 'slide3', prev: 'slide1' },
        { id: 'slide3', src: './image/calimg5.png', alt: 'slide-img-3', next: 'slide1', prev: 'slide2' },
    ];
    // Seasonal Flowers Data
    const seasonal_flowers = [
        { id: 1, src: "./image/spring_flower.jpg", title: "Spring Blooms", desc: "Explore vibrant flowers that flourish in spring." },
        { id: 2, src: "./image/summer_flower.jpg", title: "Summer Radiance", desc: "Enjoy the colors of summer with these beautiful flowers." },
        { id: 3, src: "./image/autumn_flower.jpg", title: "Autumn Hues", desc: "Discover the rich tones of autumn blooms." },
        { id: 4, src: "./image/winter_flower.jpg", title: "Winter Whites", desc: "Find the elegance of winter flowers.  " },
    ];
    // Floral Arrangement Ideas
    const floral_arrangement_ideas = [
        { id: 1, src: "./image/wedding_arrangement.jpg", title: "Wedding Centerpiece", desc: "Elegant floral arrangements for your special day." },
        { id: 2, src: "./image/home_decoration.jpg", title: "Home Decoration", desc: "Add beauty to your home with these ideas." },
        { id: 3, src: "./image/table_setting.jpg", title: "Table Settings", desc: "Beautiful centerpieces for your dining table." },
    ];
    // our flower api fetch
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        fetch("https://flower-seal-backend.vercel.app/api/v1/flower/flower_all/")
            .then((res) => res.json())
            .then((data) => {
                setFlowers(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);

            });
    }, []);
    // flower filter 
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [filteredFlowers, setFilteredFlowers] = useState([]);

    const filters = [
        "All", "Calla Lilies", "Carnations", "Daisies", "Gardenias",
        "Delphiniums", "Zinnias", "Alstroemeria", "Buttercups", "Queen Anne’s"
    ];

    // পেজ লোড হলে সব ফুল দেখাবে
    useEffect(() => {
        setFilteredFlowers(flowers);
    }, [flowers]);

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter.toLowerCase());
        if (filter === "All") {
            setFilteredFlowers(flowers);
        } else {
            setFilteredFlowers(flowers.filter(flower => flower.category.toLowerCase() === filter.toLowerCase()));
        }
    };
    // flower care tips
    const [careTips, setCareTips] = useState([]);

    useEffect(() => {
        fetch("https://flower-seal-backend.vercel.app/api/v1/flower/care_tips/")
            .then(res => res.json())
            .then(data => setCareTips(data))
            .catch(err => console.error("Error fetching care tips:", err));
    }, []);
    return (
        <>
            <Helmet><title>Flower Sell</title></Helmet>
            <div className="container mx-auto max-w-screen-xl px-6 py-3">
                {/* Slide Section */}
                <section>
                    <div className="carousel w-full rounded-lg shadow-xl overflow-hidden mt-24">
                        {slides.map((slide) => (
                            <div key={slide.id} id={slide.id} className="carousel-item relative w-full">
                                <img src={slide.src} alt={slide.alt} className="w-full h-[400px] mobile-device-slide-img" />
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                    <a href={`#${slide.prev}`} className="btn btn-circle">❮</a>
                                    <a href={`#${slide.next}`} className="btn btn-circle">❯</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Seasonal Flowers Section */}
                <section>
                    <h1 className="text-3xl mt-6 text-center font-bold">Seasonal Flowers</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
                        {seasonal_flowers.map((seasonal_flowers) => (
                            <div key={seasonal_flowers.id} className="card card-compact bg-base-100 shadow-xl rounded-md">
                                <figure>
                                    <img src={seasonal_flowers.src} alt={seasonal_flowers.title} className="w-full h-48 object-cover" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{seasonal_flowers.title}</h2>
                                    <p>{seasonal_flowers.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Floral Arrangement Ideas */}
                <section>
                    <h1 className="text-3xl mt-6 text-center font-bold">Floral Arrangement Ideas</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-8">
                        {floral_arrangement_ideas.map((floral_arrangement_ideas) => (
                            <div key={floral_arrangement_ideas.id} className="card card-compact bg-base-100 shadow-xl rounded-md">
                                <figure>
                                    <img src={floral_arrangement_ideas.src} alt={floral_arrangement_ideas.title} className="w-full h-48 object-cover" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{floral_arrangement_ideas.title}</h2>
                                    <p>{floral_arrangement_ideas.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Behind The Scenes */}
                <section>
                    <div className="bg-[#dbf7f9] rounded-lg">
                        <div className="max-w-5xl mx-auto text-center px-6 mt-9 p-5">
                            <h2 className="text-3xl font-bold text-gray-800">Behind The Scenes</h2>
                            <div className="flex gap-10 flex-col md:flex-row items-cente items-center mt-9">
                                <img
                                    src="./image/flower_preparation2.jpg"
                                    alt="Flower Preparation"
                                    className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                                />

                                <div className="md:w-1/2 text-gray-700">
                                    <p className="text-lg">
                                        See how our beautiful flowers are prepared and arranged before they reach you.
                                        We take great care in selecting the freshest blooms and creating stunning arrangements
                                        for every occasion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* flower care tips */}
                <section>
                    <div className="max-w-screen-xl mx-auto py-3">
                        <h2 className="text-center text-3xl font-bold">Flower Care Tips</h2>
                        <p className="text-center text-gray-700 mb-8">Learn how to take care of your flowers with expert tips.</p>

                        <div style={{ lineHeight: '30px' }}>
                            {careTips.map((tip) => (
                                <div key={tip.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                                    <h3 className="text-xl font-semibold text-primary">🌿 {tip.plant_name}</h3>
                                    <p><strong>Symptoms:</strong> {tip.symptoms}</p>
                                    <p><strong>Revival Steps:</strong> {tip.revival_steps}</p>
                                    <p><strong>Recommended Fertilizer:</strong> {tip.recommended_fertilizer}</p>
                                    <p><strong>Watering Caution:</strong> {tip.watering_caution}</p>
                                    <p><strong>Sunlight Adjustment:</strong> {tip.sunlight_adjustment}</p>
                                    <p><strong>Sunlight Needs:</strong> {tip.sunlight_needs}</p>
                                    <p><strong>Recommended Water Frequency:</strong> {tip.recommended_water_frequency}</p>
                                    <p><strong>Created At:</strong> {new Date(tip.created_at).toLocaleDateString()}</p>
                                    <p><strong>Updated At:</strong> {new Date(tip.updated_at).toLocaleDateString()}</p>
                                    <p className="text-gray-700 italic"><strong>Special Notes:</strong> {tip.special_notes || "No special notes"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* our flower */}
                <section>
                    <h1 className="text-3xl text-center font-bold">Our Flower</h1>
                    {/* flower category show */}
                    <div className="container pt-3">
                        <div className="bg-white text-black rounded-2xl shadow-lg p-6">
                            <h3 className="text-center text-xl font-bold mb-4">Flower Filter</h3>
                            <ul className="flex flex-wrap justify-center gap-2 md:gap-4 px-3 md:px-5 py-4">
                                {filters.map((filter) => (
                                    <li key={filter}
                                        className={`px-4 py-2 rounded-md font-bold cursor-pointer transition-all duration-300 ${selectedFilter === filter.toLowerCase() ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white' : 'bg-gray-200 text-black'}`}
                                        onClick={() => handleFilterClick(filter)}>
                                        {filter}
                                    </li>
                                ))}
                            </ul>
                            <div className="text-center mt-3">
                                <strong className="text-black">Total Flowers : {filteredFlowers.length}</strong>
                            </div>
                        </div>
                    </div>

                    {/* flower items show */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 lg:grid-cols-3 gap-8">
                        {filteredFlowers.map((flower) => (
                            <div key={flower.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <figure>
                                    <img src={flower.image} alt={flower.title} className="w-full h-52 object-cover" />
                                </figure>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{flower.title}</h3>
                                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{flower.description.slice(0, 40)}</p>
                                    <p className="text-lg font-semibold line-clamp-2 mt-2 text-primary"><b>৳</b>{flower.price}</p>
                                    <p className="text-lg font-semibold mt-2 btn w-40">{flower.category}</p>
                                    <div className="flex gap-5 mt-5">
                                        <div>
                                            <button className="btn btn-accent">Details</button>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary">Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Auth_Home;