import axios from "axios";
import { toast } from "react-toastify";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  const cloudName = import.meta.env.VITE_CLOUDINARY;

  if (!cloudName && !file) {
    console.error(
      "Cloudinary cloud name is not defined in environment variables"
    );
    return;
  }
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      formData
    );
    if (response.status === 200) {
      // toast.success('Upload successful')
      return response.data;
    } else {
      toast.error("Upload not successful, try again!");
    }
  } catch (error) {
    toast.error("Upload not successful, try again!");
    console.error("Upload error:", error);
  }
};
