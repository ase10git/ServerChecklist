import axios from "axios";

const fileApi = 'http://localhost:9000/api/file/';

export async function getImage(filename) {
    const fileUrl = fileApi + filename;

    try {
        const res = await axios.get(fileUrl, {
            responseType: 'blob',
            withCredentials: false // cookie 전송 막음
        });

        // 파일 미리보기 url로 반환
        return URL.createObjectURL(res.data);
    } catch (error) {
        return null;
    }
}