import React from "react";

const GalleryHeader = ({ selectedImages, setSelectedImages, handleNewDeleteClick }) => {
  return (
    <nav className="py-4 px-6">
      <article className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">
          {selectedImages.length === 0 ? (
            "Gallery"
          ) : (
            <label
              htmlFor="select"
              className="flex flex-row justify-between gap-x-4 marker:items-center ">
              <input
                type="checkbox"
                name="select"
                id="select"
                checked={selectedImages.length > 0}
                className="h-5 w-5 accent-blue-500 cursor-pointer"
                onChange={() => setSelectedImages([])}
              />
              {selectedImages.length} Files Selected
            </label>
          )}
        </h1>
        {
          selectedImages.length > 0 && (
            <button
              className="text-red-500 font-medium"
              onClick={handleNewDeleteClick}
            >
              Delete files
            </button>
          )
        }
      </article>
    </nav>
  );
};

export default GalleryHeader;
