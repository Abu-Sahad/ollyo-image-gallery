import { useState } from "react";
import GalleryHeader from "../GalleryHeader/GalleryHeader";
import ImageUploader from "../ImageUploader/ImageUploader";
import GalleryImage from "../GalleryImage/GalleryImage";

const images = [
    { id: 1, ImageLink: "assets/image-1.webp" },
    { id: 2, ImageLink: "assets/image-2.webp" },
    { id: 3, ImageLink: "assets/image-3.webp" },
    { id: 4, ImageLink: "assets/image-4.webp" },
    { id: 5, ImageLink: "assets/image-5.webp" },
    { id: 6, ImageLink: "assets/image-6.webp" },
    { id: 7, ImageLink: "assets/image-7.webp" },
    { id: 8, ImageLink: "assets/image-8.webp" },
    { id: 9, ImageLink: "assets/image-9.webp" },
    { id: 10, ImageLink: "assets/image-10.jpeg" },
    { id: 11, ImageLink: "assets/image-11.jpeg" },
];

const Gallery = () => {

    const [selectThumbnails, setSelectThumbnails] = useState([]);
    const [thumbnails, setThumbnails] = useState(images);
    const [dragging, setDragging] = useState(false);
    const [draggedImage, setDraggedImage] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleNewFileChange = (e) => {
        const newImages = Array.from(e.target.files).map((file, index) => {
            const id = thumbnails.length + index + 1;
            const thumbnail = URL.createObjectURL(file);
            return { id, thumbnail };
        });
        setThumbnails([...thumbnails, ...newImages]);
    };

    const handleNewDeleteClick = () => {
        const updatedImages = thumbnails.filter(
            (image) => !selectThumbnails.some((selected) => selected.id === image.id)
        );
        setThumbnails(updatedImages);
        setSelectThumbnails([]);
    };

    const handleNewDragStart = (image) => {
        setDragging(true);
        setDraggedImage(image);
    };

    const handleNewDragOver = (e) => {
        e.preventDefault();
        e?.target?.children[0]?.alt && setDraggedIndex(e?.target?.children[0]?.alt);
    };

    const handleNewDrop = (targetIndex) => {
        setDragging(false);

        if (draggedImage) {
            const updatedImages = thumbnails.filter(
                (image) => image.id !== draggedImage.id
            );
            updatedImages.splice(targetIndex, 0, draggedImage);
            setThumbnails(updatedImages);
            setDraggedImage(null);
        }
    };

    return (
        <main className={`min-h-screen w-screen flex flex-row items-center justify-center md:p-0 p-4`}>
            <section className="lg:w-1/2 md:w-3/4 w-full bg-white rounded-lg shadow">
                <div className="flex flex-col gap-y-2">
                    <GalleryHeader
                        selectedImages={selectThumbnails}
                        setSelectedImages={setSelectThumbnails}
                        handleNewDeleteClick={handleNewDeleteClick}
                    />
                    <hr />
                    <section className="h-full w-full p-6">
                        <div
                            className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-6"
                            onDragOver={handleNewDragOver}
                        >
                            {thumbnails.map((image, index) => (
                                <GalleryImage
                                    key={index}
                                    image={image}
                                    index={index}
                                    selectedImages={selectThumbnails}
                                    setSelectedImages={setSelectThumbnails}
                                    handleNewDragStart={handleNewDragStart}
                                    handleNewDrop={handleNewDrop}
                                    dragging={dragging}
                                    draggedIndex={draggedIndex}
                                />
                            ))}
                            <ImageUploader handleNewFileChange={handleNewFileChange} />
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
};

export default Gallery;
