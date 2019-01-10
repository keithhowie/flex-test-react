import axios from 'axios';

export class S3UploadService {

  static async uploadDocument(file) {
    const response = await axios.get(`https://urlsigner-uiczqjvmcp.now.sh/?objectName=${file.name}`);
    const signedUrlInfo = response.data;
    await axios.put(signedUrlInfo.signedUrl, file);
    return signedUrlInfo.publicUrl;
  }
}