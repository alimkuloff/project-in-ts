import { Form, Upload, FormProps } from "antd";
import { useEffect, useState } from "react";
import NextBack, { Props } from "../../../../components/next-back/NextBack";
import { useUploadMultipleFilesMutation, useUploadSingleFileMutation } from "../../../../redux/api/upload-api";

type FieldType = {
  name?: string;
}

const VisualInfo = ({current, handleNext, handleBack} : Props) => {
  const [uploadMultipleFiles, {data: multipleFiles}] = useUploadMultipleFilesMutation()
  const [uploadSingleFile, {data: singleFile}] = useUploadSingleFileMutation();

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    handleNext();
    console.log(values)
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleUploadFiles = ({file, fileList} : {file: any, fileList: any}) => {
    const formData = new FormData();

    for(let i = 0; i < fileList.length; i++){
      formData.append("files", fileList[i].originFileObj);
    }

    uploadMultipleFiles(formData)
  }

  const handleUploadFile = ({file} : {file: any}) => {
    const formData = new FormData();
    formData.append("file", file.originFileObj);

    uploadSingleFile(formData)
  }

  useEffect(() => {
    if(multipleFiles?.payload && multipleFiles?.payload?.length > 0){
      setImageUrls(multipleFiles?.payload)
    }
  }, [multipleFiles])



  useEffect(() => {
    if(singleFile?.payload){
      setThumbnailUrl(singleFile?.payload)
    }
  }, [singleFile])

  console.log(imageUrls, thumbnailUrl, singleFile)


  return (
    <Form
      name="layout-multiple-horizontal"
      layout="horizontal"
      className="flex-1 flex flex-col justify-between"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
    <Form.Item
      label="Images"
      className="flex-1"
      required
      rules={[{ required: true }]}
    >
    <Upload
        multiple
        listType="picture-card"
        fileList={imageUrls.length > 0 ? imageUrls.map(image => ({
          uid: image,
          name: image,
          url: image,
        })) : []}
        onChange={handleUploadFiles}
      >
        {imageUrls.length >= 8 ? null : "upload"}
      </Upload>
    </Form.Item>
       <Form.Item
      label="Thumbnail"
      className="flex-1"
      required
      rules={[{ required: true }]}
    >
    <Upload 
        listType="picture-card"
        fileList={thumbnailUrl ? [{
          uid: thumbnailUrl,
          name: thumbnailUrl,
          url: thumbnailUrl,
        }] : []}
        onChange={handleUploadFile}
      >
        {thumbnailUrl ? null : "Upload"}
      </Upload>
    </Form.Item>
      <NextBack current={current} handleNext={handleNext} handleBack={handleBack}/>
    </Form>
  );
};

export default VisualInfo;
