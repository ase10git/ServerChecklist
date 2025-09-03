import axios from 'lib/axios';

// 서버의 메모, 체크리스트, 지도 관련 REST API
// typenum
// 0 : memo
// 1 : checklist
// 2 : map
const typebox = ['memo', 'checklists', 'maps'];

// 서버의 전체 타겟항목 가져오기
export async function list(typenum, serverId) {
    try {
        const res = await axios.get(`/${typebox[typenum]}/list/${serverId}`);

        const body = res.data;
        return body;
    } catch (error) {
    }
}

// 가장 최근에 서버에 추가된 타겟항목 상위 6개만 가져오기
export async function recentList(typenum, serverId) {
    try {
        const res = await axios.get(`/${typebox[typenum]}/recentlist/${serverId}`);
        const body = res.data;
        return body;
    } catch (error) {
    }
}

// 특정 타겟항목 가져오기
export async function show(typenum, id) {
    try {
        const res = await axios.get(`/${typebox[typenum]}/${id}`);
        const body = res.data;
        return body;
    } catch (error) {
    }
}

// 새 타겟항목 추가하기
export async function create(typenum, formData) {
    try {
        const res = await axios.post(`/${typebox[typenum]}`, formData);
        const body = res.data;
        return body;
    } catch (error) {
        alert("추가에 실패했습니다");
    }
}

// 타겟항목 수정하기
export async function patch(typenum, id, formData) {
    try {
        const res = await axios.patch(`/${typebox[typenum]}/${id}`, formData);
        const body = res.data;
        return body;
    } catch (error) {
        alert("수정을 실패했습니다");
    }
}

// 타겟항목 삭제하기
export async function remove(typenum, id) {
    try {
        const res = await axios.delete(`/${typebox[typenum]}/${id}`);
        const body = res.data;
        return body;
    } catch (error) {
        alert("삭제를 실패했습니다");
    }
}
