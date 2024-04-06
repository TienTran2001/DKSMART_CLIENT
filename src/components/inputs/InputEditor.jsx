/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Editor } from '@tinymce/tinymce-react';

const InputEditor = ({
  containerClassName,
  label,
  id,
  register,
  errors = {},
  validate,
  setValue,
  initialValue,
}) => {
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
      <Editor
        apiKey={import.meta.env.VITE_TINYCME_API_KEY}
        onEditorChange={(content) => setValue(id, content)}
        {...register(id, validate)}
        initialValue={initialValue}
        init={{
          height: 550,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputEditor;
