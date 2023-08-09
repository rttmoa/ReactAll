import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { IProp } from '../type';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import './index.less';

const aspectRatioMap: number[] = [
  0, 1, 2, 4 / 3, 16 / 9
];
const aspectRatioLabel: string[] = [
  '自由裁切', '1 : 1', '2 : 1', '4 / 3', '16 / 9'
];
/** #### 图片质量：低、中、高、不压缩  */
const imgLevelMap: Object = {
  1: '低',
  2: '中',
  3: '高',
  4: '不压缩'
};
const imgLevelValueMap: Object = {
  1: 'low',
  2: 'medium',
  3: 'high',
  4: 'high'
}

// http://localhost:8000/react-cropper-pro/
let imgURL = "https://img1.baidu.com/it/u=3485269656,617316610&fm=253&fmt=auto&app=138&f=JPEG?w=660&h=440"


const CropperPro: React.FC<IProp> = ({ defaultImg = "", imgData = imgURL, defaultLevel = 4, onChange, onDel }) => {
  const [image, setImage] = useState(defaultImg);                   // <Cropper /> 组件src属性
  const [cropData, setCropData] = useState(imgData || defaultImg);  // 裁剪图片
  const [cropper, setCropper] = useState<any>();                    //
  const [visable, setVisable] = useState(0);                        // Modal是否显示
  const [imgLevel, setImgLevel] = useState(defaultLevel);           // 图片质量：低、中、高、不压缩
  const fileRef = useRef<any>(null);


  const getCropData = () => {
    if(+imgLevel === 4) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropData(reader.result as any);
      };
      reader.readAsDataURL(fileRef.current.file);

      onChange && onChange(fileRef.current.file)
    }
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const rate = 1 / (4 - imgLevel);
      const { width, height } = cropper.getCropBoxData();
      cropper.getCroppedCanvas({
        width: width * rate,
        height: height * rate,
        imageSmoothingQuality: imgLevelValueMap[imgLevel],
        fillColor: 'transparent',
      }).toBlob((blob: Blob) => {
        if(blob) {
          const time = Date.now();
          let croppedFile:any = new File([blob], fileRef.current.name, {
            type: fileRef.current.type,
            lastModified: Date.now(),
          });
          croppedFile.uid = time;
          onChange && onChange(croppedFile)
        }else {
          new Error('图片裁切失败');
        }

      }, fileRef.current.type, rate)
    }
  };
  // Modal：旋转 rotate
  const handleRotate = (type: number) => {
    cropper.rotate(type ? 90 : -90);
  }
  // Modal：自由裁切：比率
  const handleAspectRatio = (v: number) => {
    cropper.setAspectRatio(v);
  }
  // Modal：图片质量 是否压缩
  const handleLevelChange = (e: any) => {
    setImgLevel(e.target.value)
  }
  // Modal：右上角 ×
  const handleClose = () => {
    setVisable(1);
  }
  // Modal：确定
  const handleOk = () => {
    getCropData();
    setVisable(1);
  }
  // Modal：取消
  const handleCancel = () => {
    setVisable(1);
  }


  // 上传图片：<input type="file" onChange={handleChange} />
  const handleChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    const file = files[0];
    file.uid = Date.now();
    reader.readAsDataURL(file);
    setVisable(2);
    e.target.value = '';
    fileRef.current = {
      type: file.type,
      name: file.name,
      file: file
    }
  };

  // 删除图片
  const handleDel = () => {
    setCropData('');
    onDel && onDel(cropData)
  }

  useEffect(() => {
    imgData && setCropData(imgData);
  }, [imgData])

  const cropModal = useMemo(() => {
    return visable !== 0 && (
      <div className="xi-cropper-modal" style={{display: visable !== 1 ? 'flex' : 'none'}}>
        <div className="cropper-modal-content">
          <div className="cropper-modal-header">
            裁切设置 <span className="cropper-modal-close-btn" onClick={handleClose}>✕</span>
          </div>
          <Cropper
            style={{ height: 400, width: "100%" }}
            dragMode="move"
            zoomTo={0}
            initialAspectRatio={0}
            preview=".img-preview"
            src={image}
            viewMode={2}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              console.log("Cropper -> instance", instance);
              setCropper(instance);
            }}
            guides={true}
          />
          <div className="crop-controlWrap">
            <div className="crop-control">
              {aspectRatioMap.map((v,i) => {
                // 自由裁切
                return (
                  <span key={i} className="crop-control-item" onClick={() => handleAspectRatio(v)}>
                    { aspectRatioLabel[i] }
                  </span>
                )
              })}
            </div>
            <div className="crop-control">
              <span className="crop-control-item" onClick={() => handleRotate(1)}>⟳</span>
              <span className="crop-control-item" onClick={() => handleRotate(0)}>⟲</span>
            </div>
            <div className="crop-control">
              图片质量:
              <span className="crop-control-item">
                <input type="range" min="1" max="4" step="1" value={imgLevel} onChange={handleLevelChange}  />
              </span>
              { imgLevelMap[imgLevel] }
            </div>
          </div>
          <div className="cropper-modal-footer">
            <div className='modal-cancel' onClick={handleCancel}>取消</div>
            <div className='modal-ok' onClick={handleOk}>确定</div>
          </div>
        </div>
        <div className="xi-cropper-modalMask"></div>
      </div>
    )
  }, [visable, image, imgLevel])

  // console.log(cropData);




  return (
    <div className="xi-cropper-wrap">
        {/* 盒子的 +上传 和 x删除 */}
        <div className="xi-cropper-upload">
          <input type="file" onChange={handleChange} accept="image/gif,image/jpeg,image/jpg,image/png" />
          <div className="xi-cropper-file">
            { cropData ? <img src={cropData} /> : "+" }
            { cropData && (<span className="xi-cropper-del" onClick={handleDel}>✕</span>) }
          </div>
        </div>
        { createPortal(cropModal, document.body) }
    </div>
  );
};

export default CropperPro;
