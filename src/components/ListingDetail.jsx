import React from "react";
import ContactSection from "./ContactSection";

export default function ListingDetail({ listing }) {
  if (!listing) {
    return (
      <div className="text-center text-gray-400 mt-10">
        No listing selected.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-indigo-900 text-white p-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={listing.image || "/placeholder.png"}
            alt={listing.title}
            className="w-full h-96 object-cover rounded-xl border border-indigo-700"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <p className="text-xl text-indigo-300 mb-4">${listing.price}</p>

            <p className="text-sm text-gray-300 mb-2">
              Condition: <span className="text-white">{listing.condition}</span>
            </p>
            <p className="text-sm text-gray-300 mb-2">
              Category: <span className="text-white">{listing.category}</span>
            </p>
            <p className="text-sm text-gray-300 mb-2">
              Color: <span className="text-white">{listing.color}</span>
            </p>

            <p className="text-gray-200 mt-4">{listing.description}</p>
          </div>

          <ContactSection
            sellerName={listing.sellerName || "Unknown Seller"}
            sellerEmail={listing.sellerEmail || "example@middlebury.edu"}
          />
        </div>
      </div>
    </div>
  );
}
