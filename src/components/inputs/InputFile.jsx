/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { apiUploadImage } from '~/apis/beyond';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { IoMdClose } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa6';
import Modal from '~/components/commons/Model';

const InputFile = ({
  containerClassName,
  label,
  id,
  validate,
  getImages,
  path,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState(path);
  const imageLink = [];
  const rawImage = watch(id);

  const handleUpload = async (files) => {
    const formData = new FormData();

    setLoading(true);
    for (let file of files) {
      formData.append('file', file);
      formData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      const response = await apiUploadImage(formData);
      if (response.status == 200) imageLink.push(response.data.secure_url);
    }
    setLoading(false);
    setImages(imageLink);
  };

  useEffect(() => {
    if (path && !images.includes(path) && images.length == 0) {
      setImages((prevImages) => [...prevImages, path]);
    }
  }, [path]);

  useEffect(() => {
    getImages(images);
  }, [images]);

  useEffect(() => {
    if (rawImage && rawImage instanceof FileList && rawImage.length > 0) {
      handleUpload(rawImage);
    }
  }, [rawImage]);

  const handlePreviewImage = () => {
    setIsOpen(true);
  };

  const handleDeleteImage = () => {
    setImages([]);
  };

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
      )}
      <input
        type="file"
        id={id}
        accept=".jpg,.jpeg,.png"
        className="hidden"
        {...register(id, validate)}
      />
      <div className=" bg-main-gray w-full min-h-[200px] flex flex-col gap-y-2 items-center justify-center rounded-md">
        {loading ? (
          <span className="animate-spin text-main ">
            <CgSpinner size={25} />
          </span>
        ) : images?.length > 0 ? (
          <div className="p-6 ">
            <span className="relative">
              <span
                className="absolute right-3 top-3 z-10 "
                onClick={handleDeleteImage}
              >
                <IoMdClose
                  size={30}
                  className="text-main-gray  cursor-pointer"
                />
              </span>
              <img
                src={images[0]}
                alt=""
                className="vehicle-image transition-all rounded-md"
              />
              <div
                className="group absolute inset-0 flex items-center justify-center bg-black bg-opacity-0  hover:bg-opacity-50 transition-all cursor-pointer "
                onClick={handlePreviewImage}
              >
                <FaRegEye
                  size={40}
                  className="text-main-gray opacity-0 group-hover:opacity-100"
                />
              </div>
            </span>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="p-10 flex flex-col gap-y-2 items-center justify-center cursor-pointer"
          >
            <span className="text-4xl text-gray-300">
              <FaCloudUploadAlt />
            </span>
            <small className="text-gray-500 italic">
              Chỉ chấp nhận ảnh có định dạng JPEG, PNG, JPG.
            </small>
          </label>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} img={images[0]} />
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputFile;
