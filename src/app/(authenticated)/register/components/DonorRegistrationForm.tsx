"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { bloodTypes, type Donor } from "@/types";
import { UserPlus, Save } from "lucide-react";

const availabilityOptions = [
  { id: "regular", label: "Available for regular donations" },
  { id: "emergency", label: "Available for emergency calls" },
] as const;

export default function DonorRegistrationForm() {
  const { user, loading: authLoading } = useAuth();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    location: "",
    availability: [] as string[],
  });

  React.useEffect(() => {
    if (user && !authLoading) {
      // Pre-fill form with AuthUser data if available
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user, authLoading]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (id: string) => {
    setFormData((prev) => {
      const newAvailability = prev.availability.includes(id)
        ? prev.availability.filter((item) => item !== id)
        : [...prev.availability, id];

      return { ...prev, availability: newAvailability };
    });

    // Clear error when field is edited
    if (formErrors.availability) {
      setFormErrors((prev) => ({ ...prev, availability: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address.";
    }

    if (
      formData.phone.length < 10 ||
      !/^\+?[0-9\s-()]*$/.test(formData.phone)
    ) {
      errors.phone = "Phone number must be at least 10 digits with valid format.";
    }

    if (!formData.bloodType) {
      errors.bloodType = "Please select a blood type.";
    }

    if (formData.location.length < 2) {
      errors.location = "Location must be at least 2 characters.";
    }

    if (formData.availability.length === 0) {
      errors.availability = "You have to select at least one availability option.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit the form data
      console.log("Form submitted:", formData);
      // Add API call here
    }
  };

  return (
    <>
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b">
        <h2 className="flex items-center gap-2 text-2xl text-blue-600 font-semibold">
          <UserPlus className="h-7 w-7" /> Donor Information
        </h2>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:outline-none ${formErrors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:outline-none ${formErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:outline-none ${formErrors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>

          {/* Blood Type Field */}
          <div className="space-y-2">
            <label htmlFor="bloodType" className="block text-sm font-medium">
              Blood Type
            </label>
            <select
              id="bloodType"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:outline-none appearance-none bg-white ${formErrors.bloodType
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
            >
              <option value="" disabled>
                Select your blood type
              </option>
              {bloodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {formErrors.bloodType && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.bloodType}
              </p>
            )}
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium">
              General Location (City / Area)
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g., Springfield"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:outline-none ${formErrors.location
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            <p className="text-sm text-gray-500">
              This helps us find donors in specific areas.
            </p>
            {formErrors.location && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.location}
              </p>
            )}
          </div>

          {/* Availability Field */}
          <div className="space-y-4">
            <div>
              <span className="block text-sm font-medium">Availability</span>
              <p className="text-sm text-gray-500">
                How would you like to contribute?
              </p>
            </div>

            <div className="space-y-3">
              {availabilityOptions.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <div className="flex items-center h-5">
                    <input
                      id={`availability-${item.id}`}
                      type="checkbox"
                      checked={formData.availability.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-sm">
                    <label
                      htmlFor={`availability-${item.id}`}
                      className="font-normal text-gray-700"
                    >
                      {item.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {formErrors.availability && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.availability}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-6 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow flex items-center justify-center"
          >
            <Save className="h-4 w-4 mr-2" /> Save Donor Profile
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
