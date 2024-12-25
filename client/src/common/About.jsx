import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">About Us</h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Welcome to our platform! We are committed to providing an exceptional experience for everyone, 
        fostering innovation, learning, and collaboration.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Our Vision */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Vision</h2>
          <p className="text-gray-700">
            We aim to build a space where individuals can explore, learn, and achieve their goals with ease. 
            Our platform is designed to inspire creativity and empower you to reach new heights.
          </p>
        </div>

        {/* Our Values */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Our Values</h2>
          <p className="text-gray-700">
            Integrity, innovation, and inclusivity drive everything we do. We believe in creating meaningful 
            experiences that resonate with our community and contribute to positive growth.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* What We Offer */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li className="mb-2">A user-friendly platform for seamless interaction.</li>
            <li className="mb-2">Tools and resources to help you grow and succeed.</li>
            <li className="mb-2">Supportive features tailored to your needs.</li>
          </ul>
        </div>

        {/* Why Choose Us */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Why Choose Us</h2>
          <p className="text-gray-700">
            Our commitment to excellence ensures you get the best experience possible. By combining advanced 
            technology with a human-centric approach, we make your journey enjoyable and rewarding.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg">
          To empower individuals and communities by providing a platform that inspires growth, fosters creativity, 
          and cultivates success.
        </p>
      </div>
    </div>
  );
};

export default About;
