// 비밀번호 : 영문 대소문자, 숫자, 특수문자 포함 8자리 이상
const PASSWORD_REG = /^\S+(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&()_~\[\]\+]).{8,20}\S+$/;

const NAME_REG = /^[가-힣\w\d]{2,}$/;

const CHAR_REG = /^[\w]*$/;

// String
const STR_PASSWORD_REG = "^\\S+(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&\\(\\)_~\\[\\]\\+]).{8,20}\\S+$";

const STR_NAME_REG = "^[가-힣\\w\\d]{2,13}$";


function formRegexValidation(type, target) {
    let result = null;
    let regType = new String(type).toLowerCase();
    
    if (regType.match("password") || regType.match("pwd")) {
        result = PASSWORD_REG.test(target);
    } else if (regType.match("name")) {
        result = NAME_REG.test(target);
    }
    return result;
}

const REGEX = {
    PASSWORD_REG, NAME_REG, CHAR_REG, 
    STR_PASSWORD_REG, STR_NAME_REG,
    formRegexValidation
};

export default REGEX;