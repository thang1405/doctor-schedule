import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const UploadAvatar = () => {
  const [file, setFile] = useState({});

  const onChange = ({ file: newFile }) => {
    setFile(newFile);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  console.log(file)

  return (
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        file={file}
        onChange={onChange}
        onPreview={onPreview}
      >
        {'+ Upload'}
      </Upload>
    </ImgCrop>
  );
};
export default UploadAvatar;