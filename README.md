# ServerChecklist
- 제목 : 서버 체크리스트
- 기간 : 2024/09/11 ~ 2024/10/02 +@
	- 9월 14일~19일(7일)동안 연휴 및 게임 서버 설정으로 인해 진행하지 못하여 원래 9월 25일까지 하기로 했던 프로젝트를 일주일 연장하기로 결정했다.
	- 프로젝트 후반에 다른 일들과 건강 상태가 겹쳐 많이 진행하지 못했다.
	- *미구현된 기능이 너무 많아 1차적으로 포트폴리오용으로 내용을 기록하고, 올해 안에 서비스를 직접 사용할 수 있을 정도로 더 수정할 예정이다.*
- 목표 : 게임 내 서버와 관련된 메모를 저장하고 확인할 수 있는 사이트를 제작
	- 게임을 켰을 때만 서버 내부의 게임 상태(ex: 자원 저장 위치 등)를 확인할 수 있고, 게임 내에서 메모와 같은 기능이 있어도 게임을 실행해야만 확인할 수 있다.
	- 따라서 친구들과 같이 사용하는 게임 서버와 관련된 내용을 메모하고, 저장하고, 공유할 수 있는 서비스가 필요하다 느껴 제작하게 되었다.

--------
## 추가 진행도
- 20241022 : 메모, 체크리스트, 맵 페이지 동작 추가. 클라이언트 API 통합 및 수정
- 서버 메인 페이지 구조 및 디자인 수정
- 20241025 : SpringBoot MongoDB 연동 방법 학습 및 적용을 위한 구조 수정
- 20241027 : 서버 정보에 파일 업로드 기능 추가
- 20241029 : 지도 정보에 파일 업로드 기능 추가. 체크박스 체크 상태 변경 기능 추가
- 20241031 : 서버, 지도 수정에 파일 단일 제거 기능 추가

------------

## 프레임워크 및 라이브러리
- 서버 : Spring boot
- 클라이언트 : React
- 배포 : ~~Google Cloud, Vercel (아직 배포하지 못함)~~
- 라이브러리

| 환경  | 내용                                             |
| --- | ---------------------------------------------- |
| OS  | Window 11                                      |
| 언어  | Java, Javascript                               |
| IDE | IntelliJ Community Edition, Visual Studio Code |
| DB  | MongoDB                                        |

```bash
# Front Libraries
dotenv # .env 파일 설정
nodemon # 개발 시 서버 자동 재실행으로 사용했으나 제거 예정
*uuid4 # 랜덤 uuid 생성 - 파일 업로드 시 이름 생성용(제거 예정)
axios  # fetch 대신 사용할 서버-클라이언트 통신
bootstrap bootstrap-icons react-bootstrap react-bootstrap-icons # bootstrap
date-fns date-fns-tz react-datepicker # 날짜 선택 기능 라이브러리이나 제거 예정
method-override # 클라이언트에서 form의 method 오버라이드에 사용하려 했으나 제거 예정
react-dom react-router-dom # react-router 설정 등
```

-------------
# 기능
1. 회원가입, 로그인, 회원탈퇴
2. 서버 탐색, 생성, 수정
3. 체크리스트 생성, 수정, 삭제
4. 게임 내 지도 정보 저장, 수정, 삭제
5. 메모 생성, 수정, 삭제

-----
# 구조도
- MongoDB 컬렉션/Entity 구조
 
![classes](https://github.com/user-attachments/assets/90a8cdb1-da20-4de8-a3fb-06a0457e6b96)

- 시스템 구조
  
![systemarchitecture](https://github.com/user-attachments/assets/9520cff7-8d6d-4b2d-b9b8-5b4162b5bffb)


