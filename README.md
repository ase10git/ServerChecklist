# ServerChecklist
- 제목 : 서버 체크리스트
- 기간 : 2024/09/11 ~ 2024/10/02 +@
	- 9월 14일~19일(7일)동안 연휴 및 게임 서버 설정으로 인해 진행하지 못하여 원래 9월 25일까지 하기로 했던 프로젝트를 일주일 연장하기로 결정했다.
	- 프로젝트 후반에 다른 일들과 건강 상태가 겹쳐 많이 진행하지 못했다.
	- *미구현된 기능이 너무 많아 1차적으로 포트폴리오용으로 내용을 기록하고, 올해 안에 서비스를 직접 사용할 수 있을 정도로 더 수정할 예정이다.*
		- **2024.11.12 update** : 현재 로그인 기능을 추가하고 있다.
- 목표 : 게임 내 서버와 관련된 메모를 저장하고 확인할 수 있는 사이트를 제작
	- 게임을 켰을 때만 서버 내부의 게임 상태(ex: 자원 저장 위치 등)를 확인할 수 있고, 게임 내에서 메모와 같은 기능이 있어도 게임을 실행해야만 확인할 수 있다.
	- 따라서 친구들과 같이 사용하는 게임 서버와 관련된 내용을 메모하고, 저장하고, 공유할 수 있는 서비스가 필요하다 느껴 제작하게 되었다.
- source code : **master branch**

--------
## 추가 진행도
- 2024.10.22 : 메모, 체크리스트, 맵 페이지 동작 추가. 클라이언트 API 통합 및 수정, 서버 메인 페이지 구조 및 디자인 수정
- 2024.10.25 : SpringBoot MongoDB 연동 방법 학습 및 적용을 위한 구조 수정
- 2024.10.27 : 서버 정보에 파일 업로드 기능 추가
- 2024.10.29 : 지도 정보에 파일 업로드 기능 추가. 체크박스 체크 상태 변경 기능 추가
- 2024.10.31 : 서버, 지도 수정에 파일 단일 제거 기능 추가
- 2024.11.08 : Spring Security 프로토타입 추가
- 2024.11.09 : 이메일 인증과 관련된 Controller 메소드 및 클래스 추가
- 2024.11.10 : 로그인과 회원가입 Controller 및 서비스 수정
- 2024.11.11 : 로그인과 회원가입에 정규 표현식 검사 추가

## 진행 혹은 예정된 작업
1. Spring Security 기능 추가
	- JWT Refresh Token 관리
	- Session 관리
	- 로그인 유지
	- 권한 별 접근 설정
	- OAuth2를 사용한 구글 로그인 연동
2. 로그인 페이지 기능 추가
	- 구글 연동 로그인
3. 회원가입 페이지 기능 추가
	- 중복 이메일 확인 기능
	- 회원가입 후 이메일 인증
4. 사용자 페이지 기능 추가
	- 회원 정보 수정
	- 회원 탈퇴
5. 즐겨찾기 페이지 기능 추가
	- 각 서버 아이템 즐겨찾기 추가/제거
	- 즐겨찾기 페이지에서 아이템 목록 확인/제거
	- 회원 탈퇴 시 즐겨찾기 데이터 제거
6. 서버 아이템들과 사용자 연결
	- 아이템 작성자 혹은 권한 별 동작 추가
7. 검색 기능 추가
	- 서버, 서버 아이템 검색
	- 권한 별 검색 결과 노출 제어

------------

## 프레임워크 및 라이브러리
- 배포 : ~~Google Cloud, Vercel (아직 배포하지 못함)~~

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

---------
# 구조도
1. **MongoDB 컬렉션/Entity 구조**

![serverchecklist_entity](https://github.com/user-attachments/assets/259257d4-4127-4955-b5a2-b1779195a9ac)

2. **시스템 구조**

![serverchecklist_system_architecture](https://github.com/user-attachments/assets/9c8c1f43-c948-4fb1-9cba-21eb263a8e81)

3. **로그인 과정**(Spring Security와 JWT)
	- 로그인은 Spring Security에서 JWT를 사용하여 인증 및 인가 작업을 수행하도록 설정했다.
	- 현재는 Authorization Server와 Resource Server가 같은 서버이다.

![spring_security_authentication_flow](https://github.com/user-attachments/assets/a93bfd25-c678-4696-a588-ef2c151d5fd1)

--- 
## 권한과 동작 제어(예정)

![serverchecklist_authorization](https://github.com/user-attachments/assets/164b5032-a045-47b8-a659-05248d2668ad)
