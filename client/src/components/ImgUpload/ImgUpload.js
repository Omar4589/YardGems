/* eslint-disable no-undef */
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";

function ImgUpload({ handleDataUrlChange }) {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null)
  const maxNumber = 5;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList[0], addUpdateIndex);
    setImages(imageList);
    if (imageList.length > 0) {
        const file = imageList[0].file;
        setSelectedFile(file);
    }
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
                type='button'
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
            >
                Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ImgUpload;