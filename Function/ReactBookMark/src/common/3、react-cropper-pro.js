import CropperPro from 'react-cropper-pro';



// eslint-disable-next-line import/no-anonymous-default-export
export default () => 
  <CropperPro 
    defaultImg="" 
    onChange={(file) => console.log(file)} 
    onDel={(image) => console.log('remove', image)} 
  />;