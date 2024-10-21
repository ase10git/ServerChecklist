import axios from 'lib/axios';

// 에러처리 함수
async function errorHandling(targetFn) {
    try {
        return await targetFn();
    } catch (error) {
        //window.location.href = '/error';
    }
}

// 서버의 전체 체크리스트 가져오기
export async function list(serverId) {
    return errorHandling(async ()=>{
        const res = await axios.get(`/checklists/list/${serverId}`);
    
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }
    
        const body = res.data;
        return body;
    })
}

// 가장 최근에 서버에 추가된 체크리스트 상위 6개만 가져오기
export async function recentCheckList(serverId) {
    return errorHandling(async ()=>{
        const res = await axios.get(`/checklists/recentlist/${serverId}`);
    
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }
    
        const body = res.data;
        return body;
    })
}

// 특정 체크리스트 가져오기
export async function show(id) {
    return errorHandling(async ()=>{
        const res = await axios.get(`/checklists/${id}`);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 새 체크리스트 추가하기
export async function create(formData) {
    return errorHandling(async ()=>{
        const res = await axios.post(`/checklists`, formData);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 체크리스트 수정하기
export async function patch(formData) {
    return errorHandling(async ()=>{
        const res = await axios.patch(`/checklists/${formData.id}`, formData);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}

// 체크리스트 삭제하기
export async function remove(id) {
    return errorHandling(async ()=>{
        const res = await axios.delete(`/checklists/${id}`);
        
        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    });
}
