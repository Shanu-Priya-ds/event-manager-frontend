import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET,} from "./cloudinary";

 
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
 
  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });
 
  if (!response.ok) {
    throw new Error("Image upload failed");
  }
 
  const data = await response.json();
  return data.secure_url;
};