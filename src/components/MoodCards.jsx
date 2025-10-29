import React from "react";

export default function MoodCards() {
  const moods = [
    {
      name: "Comfort",
      image:
        "https://i.pinimg.com/1200x/49/e8/53/49e853fc6eff54cac9471ced4712c5e7.jpg",
    },
    {
      name: "Spicy",
      image:
        "https://i.pinimg.com/736x/ad/c8/65/adc8657f7d5546c444488a870b2ad203.jpg",
    },
    {
      name: "Sweet",
      image:
        "https://i.pinimg.com/1200x/96/e1/fe/96e1feec96f345b59c922306747d18d9.jpg",
    },
    {
      name: "Healthy",
      image:
        "https://i.pinimg.com/736x/71/34/32/713432f14f6cbb70a232d3152d2eaeb8.jpg",
    },
    {
      name: "Quick Snacks",
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Breakfast",
      image:
        "https://i.pinimg.com/736x/9d/f6/20/9df620e8f57a51beb359aa0d7fd6d365.jpg",
    },
    {
      name: "Dinner",
      image:
        "https://i.pinimg.com/1200x/26/88/43/2688436cfa9c36d37b840b917e190943.jpg",
    },
    {
      name: "Desserts",
      image:
        "https://i.pinimg.com/736x/36/9b/09/369b095e679fa6ebb64b519b687109fd.jpg",
    },
  ];

  function handleMoodClick(moodName) {
    const params = new URLSearchParams();
    params.set("mood", moodName);
    window.location.hash = `/recipes?${params.toString()}`;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-12">
      {moods.map((mood) => (
        <div
          key={mood.name}
          onClick={() => handleMoodClick(mood.name)}
          className="relative cursor-pointer rounded-2xl overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {/* Background Image */}
          <img
            src={mood.image}
            alt={mood.name}
            className="w-full h-36 object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          {/* Mood Label */}
          <div className="absolute bottom-0 w-full text-center py-3 bg-black/20 backdrop-blur-sm">
            <p className="text-white text-lg font-semibold tracking-wide group-hover:text-yellow-300 transition-colors duration-300">
              {mood.name}
            </p>
          </div>

          {/* Subtle Glow on Hover */}
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-orange-400/60 transition-all duration-300"></div>
        </div>
      ))}
    </div>
  );
}
