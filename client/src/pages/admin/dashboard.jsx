import { assessmentsImage, creatorsImage, usersImage } from '@/assets/images'
import CardComponent from '@/common/Card'
import React from 'react'

function AdminHome() {
  const handleCardButtonClick = () => {
    
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-6">
      <CardComponent
        image={creatorsImage}
        title="CREATORS"
        description="List of all creators."
        buttonText="View Creator"
        onButtonClick={() => handleCardButtonClick("creators")}
      />

      <CardComponent
        image={usersImage}
        title="USERS"
        description="List of all users."
        buttonText="View Users"
        onButtonClick={() => handleCardButtonClick("users")}
      />

      <CardComponent
        image={assessmentsImage}
        title="ASSESSMENTS"
        description="List of all assessments."
        buttonText="View Assessments" 
        onButtonClick={() => handleCardButtonClick("assessments")}
      />
    </div>
  )
}

export default AdminHome
