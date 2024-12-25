import React from 'react';
import { Button } from '@/components/ui/button';

function CardComponent({ image, title, description, buttonText, onButtonClick }) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="p-4">
        <Button variant="primary" className="w-full" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default CardComponent;
