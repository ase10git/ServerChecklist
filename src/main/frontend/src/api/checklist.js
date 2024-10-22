import axios from 'lib/axios';

// 에러처리 함수
async function errorHandling(targetFn) {
    try {
        return await targetFn();
    } catch (error) {
        //window.location.href = '/error';
    }
}

