- 테스트에 사용한 이미지는 모두 구글에서 검색한 이미지들로, 테스트 이외의 목적으로 사용하지 않았습니다.
- 수정일 : 2024.11.13

# Memo Pages

1. 메인 화면에서 특정 서버의 "등록된 메모" 부분을 클릭하거나, 서버 메인 화면에서 메모 "더보기"를 누르면 해당 서버의 메모 페이지로 이동한다.

![serverchecklist_server_memo](https://github.com/user-attachments/assets/10988501-2e6c-44c3-a271-20ca324ff8da)

2. 우측 상단의 + 버튼이나 중앙 하단의 + 버튼을 누르면 메모를 추가하는 form이 생성된다.

![serverchecklist_server_memo 2](https://github.com/user-attachments/assets/defbab91-186c-45ab-87d1-7bc1bd28c808)

![serverchecklist_server_memo 3](https://github.com/user-attachments/assets/5a60ed4c-6775-4303-ae6f-65bc4259a392)

3. 새 메모를 추가할 때 가장 마지막 메모의 아래에 새 메모 추가 form이 생성된다.
- 메모 추가 페이지를 따로 만들지 않고 메모 목록 화면에서 댓글이나 방명록을 추가하는 방식으로 구현했다.
- 메모 추가 페이지를 따로 제작하기엔 메모 생성에 필요한 Component가 많이 필요하지 않고,
화면에서처럼 전체 목록에 바로 간략한 메모를 이어서 추가하는 기능으로 구현하면 페이지 이동을 최소화 하면서 이용 가능할 것으로 생각했다.

![serverchecklist_server_memo 4](https://github.com/user-attachments/assets/ab4d6ad2-5980-4d19-ba3e-b501022a50c1)

4. 메모 수정은 수정하려는 메모의 수정 버튼을 누르면 바로 메모가 수정 form으로 변하여 메모를 수정할 수 있다.
- 메모 추가 페이지와 마찬가지 이유로 수정 역시 별도의 페이지 이동 없이 바로 수정할 수 있도록 구현하였다.

![serverchecklist_server_memo 5](https://github.com/user-attachments/assets/eeb785c8-98ba-497b-9b0e-cdb0ffb8b3ee)

5. 메모 삭제 버튼을 누르면 삭제를 재확인하는 confirm 창이 뜨며, 확인을 누르면 해당 메모를 삭제한다.

![serverchecklist_server_memo 6](https://github.com/user-attachments/assets/a0220d7a-d0bb-460c-81f2-2aeb3be7ef04)

- MongoDB에서도 해당 메모가 삭제된 것을 확인할 수 있다.

![serverchecklist_server_memo 7](https://github.com/user-attachments/assets/399d7d0f-bcc1-475a-8449-6cfe931c8dfd)

6. 메모가 6개 이상일 때 서버 메인 화면에서 최신 등록 및 수정 순으로 6개만 표시하도록 설정할 예정이다.
- 코드 상의 문제로 인해 데이터가 원하는 개수만큼만 들어오지 않았다.

![serverchecklist_server_memo 8](https://github.com/user-attachments/assets/4f345bef-0671-4825-8caf-dc3c9b19f970)

![serverchecklist_server_memo 9](https://github.com/user-attachments/assets/22589473-247e-46ec-88d9-97a0f73b4c95)
