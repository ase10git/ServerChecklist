# ServerChecklist
## 기간
- 2024/09/11 ~ 2024/12/26
	- 9월 14일~19일(7일)동안 연휴 및 게임 서버 설정으로 인해 진행하지 못하여 원래 9월 25일까지 하기로 했던 프로젝트를 일주일 연장하기로 결정했다.
	- 프로젝트 후반에 다른 일들과 건강 상태가 겹쳐 많이 진행하지 못했다.
	- *미구현된 기능이 너무 많아 1차적으로 포트폴리오용으로 내용을 기록하고, 올해 안에 서비스를 직접 사용할 수 있을 정도로 더 수정할 예정이다.*
- 2024.12.26 : 권한 설정 일부까지만 마치고 프로젝트를 종료했다.

## 목표
게임 내 서버와 관련된 메모를 저장하고 확인할 수 있는 사이트를 제작
- 게임을 켰을 때만 서버 내부의 게임 상태(ex: 자원 저장 위치 등)를 확인할 수 있고, 게임 내에서 메모와 같은 기능이 있어도 게임을 실행해야만 확인할 수 있다.
- 따라서 친구들과 같이 사용하는 게임 서버와 관련된 내용을 메모하고, 저장하고, 공유할 수 있는 서비스가 필요하다 느껴 제작하게 되었다.

## 개인 소감
1. 2024/09/11 ~ 2024/10/02
	- 2주~3주 동안 진행했는데 예상보다 너무 완성도가 떨어져서 더 작업을 진행할 예정이다.
		- 직접 사용할 수 있는 상태로 만들기 위해 계속 작업할 예정이다.
	- 취업 준비와 건강 문제로 인해 계속해서 일정이 지연된 것이 아쉬웠다.
2. 2024/10/22 ~ 2024/11/11
	- 취업 활동과 자격증 시험이 겹쳐 약 2주 정도 진행을 못했다가 작업을 재개해서 많은 내용을 까먹었었다.
	- 서비스의 기본 기능인 CRUD 기능들을 거의 추가했고, 로그인 및 인증과 관련된 부분에서 시간이 많이 걸리고 있다.
	- 속도가 느리긴 하지만 점차 프로젝트에서 원하는 기능들의 완성도가 전보다 올라갔고, 기능 구현을 진행하면서 웹 이론의 모르는 부분도 찾으면서 공부하다 보니 프로젝트로 얻는 학습 경험이 중요하다고 느꼈다.
3. ~ 2024/12/26
	- 중간에 아르바이트 일도 겹치고 프로젝트에서 구현해야 하는 양은 많은데 계속 혼자 작업을 하다 보니 진행 속도가 너무 더뎌 점점 프로젝트에 손대기 힘들었다.
	- 올해 안에 직접 배포 설정이랑 간단하게 사용해보는 것까지 구현해보고 싶었으나, 길고 긴 로그인 설정을 넘어 이번엔 권한 설정에서 시간이 너무 걸렸다.
	- 1월부터 다른 공부와 작업을 시작할 예정이라 이후 일정에 집중하기 위해 프로젝트를 완성하지 못했지만 여기서 마무리 하기로 결정했다.


# 진행도

| 날짜         | 내용                                                               |
| ---------- | ---------------------------------------------------------------- |
| 2024.10.22 | 메모, 체크리스트, 맵 페이지 동작 추가. 클라이언트 API 통합 및 수정, 서버 메인 페이지 구조 및 디자인 수정 |
| 2024.10.25 | SpringBoot MongoDB 연동 방법 학습 및 적용을 위한 구조 수정                       |
| 2024.10.27 | 서버 정보에 파일 업로드 기능 추가                                              |
| 2024.10.29 | 지도 정보에 파일 업로드 기능 추가. 체크박스 체크 상태 변경 기능 추가                         |
| 2024.10.31 | 서버, 지도 수정에 파일 단일 제거 기능 추가                                        |
| 2024.11.08 | Spring Security 프로토타입 추가                                         |
| 2024.11.09 | 이메일 인증과 관련된 Controller 메소드 및 클래스 추가                              |
| 2024.11.10 | 로그인과 회원가입 Controller 및 서비스 수정                                    |
| 2024.11.11 | 로그인과 회원가입에 정규 표현식 검사 추가                                          |
| 2024.11.26 | JWT Token 관리와 로그인 유지 기능 추가                                         |
| 2024.11.28 | User DTO 분리, 비밀번호 수정 추가, 파일 요청 방법 변경                            |
| 2024.11.30 | 로그아웃 기능 추가                                         |
| 2024.12.16 | 로그인 상태 관리 수정. 보호된 라우트 설정 추가                                       |
| 2024.12.17 | 권한 클래스 추가. 사용자의 역할과 권한 수정 및 관련 Security 설정 변경                     |
| 2024.12.19 | 클라이언트와 서버의 API 권한 체크 추가            |
| 2024.12.20 | 권한 별 서버 아이템 접근 설정 추가            |


## 진행 혹은 예정된 작업(종료됨)
<details>
	<summary>1. Spring Security 기능 추가</summary>

	- [O] JWT Refresh Token 관리
	- [O] 로그인 유지
	- [-] 권한 별 접근 설정
	- [X] OAuth2를 사용한 구글 로그인 연동
</details>
<details>
	<summary>2. 로그인 페이지 기능 추가</summary>
	
	- [X] 구글 연동 로그인
</details>
<details>
	<summary>3. 회원가입 페이지 기능 추가</summary>
	
	- [X] 중복 이메일 확인 기능
	- [X] 회원가입 후 이메일 인증
</details>
<details>
	<summary>4. 사용자 페이지 기능 추가</summary>

	- [O] 회원 정보 수정
	- [X] 회원 탈퇴
</details>
<details>
	<summary>5. 즐겨찾기 페이지 기능 추가</summary>
	
	- [X] 각 서버 아이템 즐겨찾기 추가/제거
	- [X] 즐겨찾기 페이지에서 아이템 목록 확인/제거
	- [X] 회원 탈퇴 시 즐겨찾기 데이터 제거
</details>
<details>
	<summary>6. 서버 아이템들과 사용자 연결</summary>
	
	- [-] 아이템 작성자 혹은 권한 별 동작 추가
</details>
<details>
	<summary>7. 검색 기능 추가</summary>
	
	- [X] 서버, 서버 아이템 검색
	- [X] 권한 별 검색 결과 노출 제어
</details>

# 프레임워크 및 라이브러리
- ~~Google Cloud, Vercel (배포를 못한 채로 마무리)~~

| 환경        | 내용                                   |
| --------- | ------------------------------------ |
| OS        | Window 10                            |
| 언어        | Java v17                             |
|           | Javascript (Node v20.11.0)           |
| IDE       | IntelliJ Community Edition v2023.3.8 |
|           | Visual Studio Code v1.94.2           |
| DB        | MongoDB                              |
| Framework | Spring boot v3.3.5 (Server)          |
|           | Spring Security v6.3.5               |
|           | React v18.3.1 (Client)               |

| FrontEnd Libraries            |
| ----------------------------- |
| axios v1.7.7                  |
| bootstrap v5.3.3              |
| bootstrap-icons v1.11.3       |
| react-bootstrap v2.10.4       |
| react-bootstrap-icons v1.11.4 |
| http-proxy-middleware v3.0.2  |
| react-dom v18.3.1             |
| react-router-dom v6.26.2      |

| BackEnd Dependencies                                                      |
| ------------------------------------------------------------------------- |
| org.springframework.boot:spring-boot-starter-web:3.3.3                    |
| org.springframework.boot:spring-boot-starter-web-services:3.3.3           |
| org.springframework.boot:spring-boot-starter-data-mongodb-reactive:3.3.3  |
| org.springframework.boot:spring-boot-starter-data-mongodb:3.3.3           |
| org.springframework.boot:spring-boot-starter-thymeleaf:3.3.3              |
| org.springframework.boot:spring-boot-starter-auth                         |
| org.springframework.boot:spring-boot-starter-oauth2-resource-server:3.3.3 |
| org.springframework.boot:spring-boot-starter-security:3.3.3               |
| io.jsonwebtoken:jjwt-api:0.11.5                                           |
| io.jsonwebtoken:jjwt-impl:0.11.5                                          |
| io.jsonwebtoken:jjwt-jackson:0.11.5                                       |
| commons-io:commons-io:2.17.0                                              |


# 구조도
## 1. MongoDB 컬렉션/Entity 구조

![serverchecklist_entity](https://github.com/user-attachments/assets/259257d4-4127-4955-b5a2-b1779195a9ac)

## 2. 시스템 구조
- 배포를 못한 채로 마무리되어 Vercel과 GCP는 사용하지 않았다.

![serverchecklist_system_architecture](https://github.com/user-attachments/assets/9c8c1f43-c948-4fb1-9cba-21eb263a8e81)

## 3. 로그인 과정(Spring Security와 JWT)
- 로그인은 Spring Security에서 JWT를 사용하여 인증 및 인가 작업을 수행하도록 설정했다.
- 현재는 Authorization Server와 Resource Server가 같은 서버이다.

![spring_security_authentication_flow](https://github.com/user-attachments/assets/a93bfd25-c678-4696-a588-ef2c151d5fd1)
 
# 권한과 동작 제어

## 서버 API와 권한
<img width="6512" alt="ServerChecklist_actions" src="https://github.com/user-attachments/assets/1f8a9152-fc92-49a4-b68b-fdda9b2ad072">

## 클라이언트 페이지 접근 권한
<img width="6160" alt="ServerChecklist_actions_client" src="https://github.com/user-attachments/assets/7aa6873f-edf1-40c1-8ec6-73dd1b64ae6a">

