import { createClient } from "@supabase/supabase-js";
import { env } from "process";
import { Database } from "./database.types";

export const uploadImages = async (files: File[]) => {
    const images = await storeFiles(files);
    return images;
  };

const cleanImageName = (name: string) => {
    return name.replace(/[^a-zA-Z0-9]/g, '');
  };

export const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "",
  );

  function generateRandomThreeDigitNumber() {
    // Option 1: Using Math.floor and modulo
    const randomNum = Math.floor(Math.random() * 900) + 100; // Generates a number between 100 and 999
  
    // Option 2: Using string manipulation
    // let randomNum = (Math.random() * 1000).toString().padStart(3, "0");
    // randomNum = parseInt(randomNum);
  
    return randomNum;
  }

export const storeFiles = async (files: File[]) => {
  console.log(files, 'files');
    const { data, error } = await supabase.storage
      .from('campaigns')
      .upload(
       `${generateRandomThreeDigitNumber()}${cleanImageName(files[0].name)}`,
        files[0],{
          upsert: false,
        }
      )
      .catch((error) => {
        console.error('Error uploading file:', error);
        throw error;
      });
    console.log(error, 'error');
    console.log(data, 'data');
  
    if (!files[0] || error) {
      return '';
    }
    console.log(data.path, 'image path');
    return `https://xpocwafkdpksspefsybx.supabase.co/storage/v1/object/public/campaigns/${data.path}`;
  };