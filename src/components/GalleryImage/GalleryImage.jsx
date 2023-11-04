import DragDropOverlay from "../DragDropOverlay/DragDropOverlay";
const GalleryImage = ({
  image,
  index,
  selectedImages,
  setSelectedImages,
  handleNewDragStart,
  handleNewDrop,
  dragging,
  draggedIndex,
}) => {
  return (
    <div
      key={index}
      className={
        "group relative before:content-[''] before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move" +
        (index === 0 ? " md:col-span-2 md:row-span-2" : " col-span-1") +
        (selectedImages.find((photo) => photo.id === image.id)
          ? " opacity-100"
          : " hover:before:bg-black/50")
      }
      draggable={true}
      onDragStart={() => handleNewDragStart(image)}
      onDrop={() => handleNewDrop(index)}
    >
      <img
        src={image.ImageLink}
        alt={image.id}
        height={index === 0 ? 390 : 184}
        width={index === 0 ? 390 : 184}
        className={
          "h-full w-full max-w-full rounded-lg object-contain border-2" +
          " " +
          (selectedImages.find((photo) => photo.id === image.id) &&
            "opacity-70")
        }
      />
      <input
        type="checkbox"
        name={image.id}
        id={image.id}
        className={
          "absolute top-4 left-4 h-5 w-5 accent-blue-500 group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear cursor-pointer" +
          " " +
          (selectedImages.find((photo) => photo.id === image.id)
            ? "opacity-100"
            : "opacity-0")
        }
        checked={
          selectedImages.find((photo) => photo.id === image.id) ? true : false
        }
        onChange={() => {
          if (selectedImages.find((photo) => photo.id === image.id))
            setSelectedImages(
              selectedImages.filter((photo) => photo.id !== image.id)
            );
          else setSelectedImages([...selectedImages, image]);
        }}
      />
      <DragDropOverlay
        imageDragging={dragging}
        imageDraggedIndex={draggedIndex}
        image={image}
      />
    </div>
  );
};

export default GalleryImage;
