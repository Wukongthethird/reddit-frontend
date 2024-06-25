import React, { useState } from "react";

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>();

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    //js reads file method
    const reader = new FileReader();

    //event has file?
    if (event.target.files?.[0]) {
      // method to read data
      reader.readAsDataURL(event.target.files[0]);
    }
    //once loaded cb function set on event to set state of file
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };
  return {
    selectedFile,
    setSelectedFile,
    onSelectFile,
  };
};
export default useSelectFile;
