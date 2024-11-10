import axios from 'lib/axios';

// 에러처리 함수
async function errorHandling(targetFn) {
    try {
        return await targetFn();
    } catch (error) {
        //window.location.href = '/error';
    }
}

// 전체 서버 목록 가져오기
export async function index() {
    return errorHandling(async ()=>{
        const res = await axios.get('/servers/list');
    
        if (res.status !== "OK") {
            //window.location.href = '/error';
        }
    
        const body = res.data;
        return body;
    })
}

// 특정 서버 가져오기
export async function show(id) {
    return errorHandling(async ()=>{
        const res = await axios.get(`/servers/${id}`);
        
        if (res.status !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 새 서버 추가하기
export async function create(formData) {
    return errorHandling(async ()=>{
        const res = await axios.post(`/servers`, formData);
        
        if (res.status !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 서버 수정하기
export async function patch(id, formData) {
    return errorHandling(async ()=>{
        const res = await axios.patch(`/servers/${id}`, formData);
        
        if (res.status !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 서버 삭제하기
export async function remove(id) {
    return errorHandling(async ()=>{
        const res = await axios.delete(`/servers/${id}`);
        
        if (res.status !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}
