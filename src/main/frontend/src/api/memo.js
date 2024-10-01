import axios from 'lib/axios';

// 에러처리 함수
async function errorHandling(targetFn) {
    try {
        return await targetFn();
    } catch (error) {
        //window.location.href = '/error';
    }
}

// 서버의 전체 메모 가져오기
export async function list(serverId) {
    return errorHandling(async ()=>{
        const res = await axios.get(`/memo/list/${serverId}`);
    
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }
    
        const body = res.data;
        return body;
    })
}

// 특정 메모 가져오기
export async function show(id) {
    return errorHandling(async ()=>{
        const res = await axios.get(`/memo/${id}`);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 새 메모 추가하기
export async function create(formData) {
    return errorHandling(async ()=>{
        const res = await axios.post(`/memo`, formData);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 메모 수정하기
export async function patch(formData) {
    return errorHandling(async ()=>{
        const res = await axios.patch(`/memo/${formData.id}`, formData);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 메모 삭제하기
export async function remove(id) {
    return errorHandling(async ()=>{
        const res = await axios.delete(`/memo/${id}`);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}
