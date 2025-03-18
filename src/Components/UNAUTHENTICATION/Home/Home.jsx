import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { baseUrl } from "../../../constants/env.constants";

const Home = () => {
    // Slide Section Data
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
        { id: 4, src: "./image/winter_flower.jpg", title: "Winter Whites", desc: "Find the elegance of winter flowers." },
    ];
    // Floral Arrangement Ideas
    const floral_arrangement_ideas = [
        { id: 1, src: "./image/wedding_arrangement.jpg", title: "Wedding Centerpiece", desc: "Elegant floral arrangements for your special day." },
        { id: 2, src: "./image/home_decoration.jpg", title: "Home Decoration", desc: "Add beauty to your home with these ideas." },
        { id: 3, src: "./image/table_setting.jpg", title: "Table Settings", desc: "Beautiful centerpieces for your dining table." },
    ];
    // our flower api fetch
    const [flowers, setFlowers] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetch(`${baseUrl}/flower/flower_all`)
            .then((res) => res.json())
            .then((data) => {
                setFlowers(data);
                setLoading(false); 
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false); 
            });
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
                            <div className="flex gap-10 flex-col md:flex-row items-center mt-9">
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
                {/* our flower */}
                <section>
                    <h1 className="text-3xl mt-6 text-center font-bold">Our Flower</h1>
                    {loading ? (
                        <div className="flex flex-col justify-center items-center pt-10">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                            <p className="mt-4 text-lg text-gray-700">Loading...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 lg:grid-cols-3 gap-8">
                            {flowers.map((flower) => (
                                <div key={flower.id} className="card bg-white shadow-md rounded-lg overflow-hidden">
                                    <figure>
                                        <img src={flower.image} alt={flower.title} className="w-full h-52 object-cover" />
                                    </figure>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{flower.title}</h3>
                                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{flower.description.slice(0, 40)}.....</p>
                                        <p className="text-lg font-semibold line-clamp-2 mt-2 text-primary"><b>৳</b>{flower.price}</p>
                                        <p className="text-lg font-semibold mt-2 btn w-40 whitespace-nowrap">{flower.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default Home;