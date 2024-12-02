import { useState, useEffect, useRef } from 'react';

const UploadWidget = ({setImage}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "docowudhc",
            uploadPreset: "movie_data_upload",
        }, function(error, result) {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
                setImage(result.info.secure_url)
                console.log(result)
            }
        });
    }, []);

    return (
        <div>
            <button onClick={() => widgetRef.current.open()}>
                Upload Image
            </button>
        </div>
    );
};
export default UploadWidget;