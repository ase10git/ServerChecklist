import axios from 'lib/axios';

// 전체 서버 목록 가져오기
export async function index() {
    try {
        const res = await axios.get('/servers/list');
        const body = res.data;
        return body;
    } catch (error) {
    }
}

// 특정 서버 가져오기
export async function show(id) {
    try {
        const res = await axios.get(`/servers/${id}`);
        const body = res.data;
        return body;
    } catch (error) {
    }
}

// 새 서버 추가하기
export async function create(formData) {
    try {
        const res = await axios.post(`/servers`, formData);
        const body = res.data;
        return body;
    } catch (error) {
        alert("새 서버 추가에 실패했습니다");
    }
}

// 서버 수정하기
export async function patch(id, formData) {
    try {
        const res = await axios.patch(`/servers/${id}`, formData);

        const body = res.data;
        return body;
    } catch (error) {
        alert("서버 수정에 실패했습니다");
    }
}

// 서버 삭제하기
export async function remove(id) {
    try {
        const res = await axios.delete(`/servers/${id}`);

        const body = res.data;
        return body;    
    } catch (error) {
        alert("서버 삭제에 실패했습니다");
    }
}
