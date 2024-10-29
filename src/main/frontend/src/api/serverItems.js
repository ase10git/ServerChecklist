import axios from 'lib/axios';

// 에러처리 함수
async function errorHandling(targetFn) {
    try {
        return await targetFn();
    } catch (error) {
        //window.location.href = '/error';
    }
}

// 서버의 메모, 체크리스트, 지도 관련 REST API
// typenum
// 0 : memo
// 1 : checklist
// 2 : map
const typebox = ['memo', 'checklists', 'maps'];

// 서버의 전체 타겟항목 가져오기
export async function list(typenum, serverId) {
    return errorHandling(async ()=>{
        const res = await axios.get(`/${typebox[typenum]}/list/${serverId}`);
    
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }
    
        const body = res.data;
        return body;
    })
}

// 가장 최근에 서버에 추가된 타겟항목 상위 6개만 가져오기
export async function recentList(typenum, serverId) {
    return errorHandling(async ()=>{
        const res = await axios.get(`/${typebox[typenum]}/recentlist/${serverId}`);
    
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }
    
        const body = res.data;
        return body;
    })
}

// 특정 타겟항목 가져오기
export async function show(typenum, id) {
    return errorHandling(async ()=>{
        const res = await axios.get(`/${typebox[typenum]}/${id}`);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 새 타겟항목 추가하기
export async function create(typenum, formData) {
    return errorHandling(async ()=>{
        const res = await axios.post(`/${typebox[typenum]}`, formData);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 타겟항목 수정하기
export async function patch(typenum, id, formData) {
    return errorHandling(async ()=>{
        const res = await axios.patch(`/${typebox[typenum]}/${id}`, formData);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 타겟항목 삭제하기
export async function remove(typenum, id) {
    return errorHandling(async ()=>{
        const res = await axios.delete(`/${typebox[typenum]}/${id}`);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}
