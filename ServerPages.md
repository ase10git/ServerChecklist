- 테스트에 사용한 이미지는 모두 구글에서 검색한 이미지들로, 테스트 이외의 목적으로 사용하지 않았습니다.
- 수정일 : 2024.11.13

# ServerAdd Page

1. 메인 페이지에서 서버 추가 버튼을 누르면 서버 추가 페이지로 이동한다.
- 현재 권한 별 동작 제어가 없어 이후에 사이트 회원만 서버를 추가할 수 있도록 수정할 예정이다.

![serverchecklist_main](https://github.com/user-attachments/assets/4dc71cef-0a58-469d-ba6c-cdea2e941106)

2. 서버 추가 페이지에선 서버의 이미지와 정보를 입력할 수 있다.

![serverchecklist_server_add](https://github.com/user-attachments/assets/3530643b-a75b-4588-bc4c-04eae09ca25a)

![serverchecklist_server_add 2](https://github.com/user-attachments/assets/5fe135b9-9ea8-4d33-b31c-8a42e0602e3d)

3. 서버를 추가하면 메인 페이지에서 새로 추가된 서버를 확인할 수 있다.

![serverchecklist_server_add 3](https://github.com/user-attachments/assets/16235019-b581-47ab-850b-127094abc3c5)

# ServerMain Page
- 메인 페이지에서 서버를 선택하면 이동하는 페이지로, 서버에 대한 설명과 서버에 등록된 아이템(메모, 체크리스트, 지도)를 간단하게 확인할 수 있다.
  - 최신 등록 및 수정 순으로 6개를 가져오도록 수정할 예정이다.

![serverchecklist_server_main](https://github.com/user-attachments/assets/8756cd1f-d294-4cf8-abd6-211b1692b868)

![serverchecklist_server_memo 9](https://github.com/user-attachments/assets/59611559-697f-42a8-b7f0-6b9ad7a82be1)

![serverchecklist_server_checklist 10](https://github.com/user-attachments/assets/a9695531-6c53-48bb-9226-feea4822aa56)

![serverchecklist_server_map 8](https://github.com/user-attachments/assets/4cb4671f-08db-4970-b68b-028258922b8a)

# ServerEdit Page

1. 서버 메인 페이지의 수정 버튼을 누르면 이동하는 페이지로, 서버의 정보를 수정할 수 있다.
- 권한 설정이 되어 있지 않은 상태로, 권한 설정 뒤엔 서버의 매니저만 접근할 수 있도록 설정할 예정이다.

![serverchecklist_server_edit](https://github.com/user-attachments/assets/a9657c19-a910-44c0-abf7-cb8d311449ff)

2. 서버의 이미지 및 수정 내용을 입력하면 수정 내용이 반영된다.
- 입력하지 않은 필드는 기존 데이터를 그대로 사용하도록 설정했다.
- 서버 이미지는 MongoDB의 GridFS를 사용하여 Document 형식으로 저장되어 있다.

![serverchecklist_server_edit 2](https://github.com/user-attachments/assets/137cf02c-1568-4e57-82aa-d1af0c93f5b7)

![serverchecklist_server_edit 3](https://github.com/user-attachments/assets/b72e163b-8782-4573-9334-3dd658016d1b)

