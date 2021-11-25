import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from 'antd/lib/upload/interface';

import { getBase64 } from '../../../util/getBase64';
import Paragrapgh from '../paragrapgh/Paragrapgh';
import { IRootState } from '../../../store/rootReducer';
import { AuthState } from '../../../store/auth/auth.type';
import { addPhotoToAssessment } from '../../../store/farms/farms.actions';

import './styles.scss';

interface IOwnProps {
  fileList?: UploadFile<any>[];
  label: string;
  handleChangeImages: (files: UploadFile<any>[]) => void;
}

const PicturesWall: FC<IOwnProps> = ({
  fileList,
  label,
  handleChangeImages,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [isSpinner, setIsSpinner] = useState(false);

  const auth = useSelector<IRootState, AuthState['auth']>(
    state => state.auth.auth,
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnPhoto = async (file: any) => {
    setIsSpinner(true);
    const data = new FormData();
    data.append('image', file.url);
    data.append('user_id', auth.id as string);
    await dispatch(addPhotoToAssessment(data, history));
    setIsSpinner(false);
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    if (!file.url && !file.thumbUrl) {
      file.thumbUrl = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexof('/') + 1),
    );
  };

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { file } = info;
    if (file.status === 'removed') {
      handleChangeImages([
        ...new Set(fileList?.filter(image => image.uid !== file.uid)),
      ]);
    }
  };

  const handleBeforeUpload = (file: RcFile, imgList: RcFile[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const { uid, name, type, size } = file;

      const image = {
        uid,
        name,
        type,
        size,
        thumbUrl: e.target?.result,
      };

      handleChangeImages([...new Set(fileList), image as UploadFile]);
    };
    return false;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Photo</div>
    </div>
  );

  return (
    <>
      <Paragrapgh
        className='mb-4 d-block'
        size={2}
        color='black-2'
        align='default'
        fontWeight={400}
      >
        {label}
      </Paragrapgh>
      <Upload
        className='pictures-wall mb-24'
        listType='picture-card'
        fileList={fileList}
        accept='image/x-png,image/gif,image/jpeg'
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
      >
        {uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img src={previewImage} alt='Assessment' style={{ width: '100%' }} />
      </Modal>
    </>
  );
};

export default PicturesWall;
