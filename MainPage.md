# Main Pages

- 서버의 메인 화면으로, 전체 서버 데이터 목록과 각 서버의 아이템(메모, 체크리스트, 지도)의 개수를 확인할 수 있다.
- 최근 업데이트 된 서버 항목에는 최신 등록 및 수정 순으로 5개 정도를 bootstrap의 carousel 기능으로 슬라이드 효과를 줄 예정이다.
  - 슬라이드는 추가되었으나 데이터를 가져오는 부분은 수정이 더 필요하다.
- 검색 기능은 아직 추가하지 못했다.

![serverchecklist_main](https://github.com/user-attachments/assets/d63bc21d-fb75-40ff-84f1-e876b5d746f9)

# Login Pages
- 로그인 후 동작은 JWT Access Token과 Refresh Token 관리로 인해 아직 수정중이다.
1. Header의 로그인 버튼을 누르면 로그인 화면으로 이동한다.

![serverchecklist_server_login](https://github.com/user-attachments/assets/dea7fb1c-95a0-4c5c-a820-4e2c8b9d12a3)

2. 로그인은 이메일과 비밀번호 유효성 검사를 통과해야만 로그인을 수행할 수 있다.

![serverchecklist_server_login 2](https://github.com/user-attachments/assets/942b636c-c1e3-4397-aaa0-df791fe66502)

![serverchecklist_server_login 3](https://github.com/user-attachments/assets/5d937a1f-7626-4e60-86f2-c8c36e29e0ca)

3. 눈 모양 아이콘을 클릭하여 비밀번호를 안보이게 하거나 보이게 만들 수 있다.

![serverchecklist_server_login 4](https://github.com/user-attachments/assets/7c918886-a7d5-4142-bd6b-222468bdaa28)

![serverchecklist_server_login 5](https://github.com/user-attachments/assets/0c6e8640-6dd3-4a75-b65f-565b779f0a50)

# Register Pages
- 회원가입의 이메일 중복 검사 기능과 이메일 인증 기능은 아직 추가하지 못했다.

1. 로그인 페이지에서 회원가입을 누르면 회원가입 페이지로 이동한다.

![serverchecklist_server_register](https://github.com/user-attachments/assets/76f4b050-fac7-46d8-b67a-04106ceb30c1)

2. 로그인과 마찬가지로 유효성 검사를 통과하지 못하면 회원가입을 진행할 수 없다.

![serverchecklist_server_register 2](https://github.com/user-attachments/assets/2132c945-a93c-4502-b840-4ab86c14c1fe)

4. 필요한 정보를 모두 입력한 뒤엔 로그인 페이지로 이동한다.

![serverchecklist_server_register 3](https://github.com/user-attachments/assets/1b1263cf-ad64-4934-b8f9-de2beb8f038b)
