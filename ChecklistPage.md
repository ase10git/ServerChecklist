- 테스트에 사용한 이미지는 모두 구글에서 검색한 이미지들로, 테스트 이외의 목적으로 사용하지 않았습니다.
- 수정일 : 2024.11.13

# Checklist Page

1. 메인 화면에서 특정 서버의 "등록된 체크리스트" 부분을 클릭하거나, 서버 메인 화면에서 체크리스트 "더보기"를 누르면 해당 서버의 체크리스트 페이지로 이동한다.

![serverchecklist_server_checklist](https://github.com/user-attachments/assets/363140ac-5b63-48fb-a1cc-4df71815cc8a)

2. 우측 상단의 + 버튼이나 중앙 하단의 + 버튼을 누르면 체크리스트를 추가하는 form이 생성된다.

![serverchecklist_server_checklist 2](https://github.com/user-attachments/assets/d5bad2fa-d63c-4224-b780-57526f0d55cf)

![serverchecklist_server_checklist 3](https://github.com/user-attachments/assets/4cb6264f-14e0-4a2a-8b54-dc29f5b221f1)

3. 새 체크리스트를 추가할 때 가장 마지막 체크리스트의 아래에 새 체크리스트 추가 form이 생성된다.
- 체크리스트 추가 페이지를 따로 만들지 않고 체크리스트 목록 화면에서 댓글이나 방명록을 추가하는 방식으로 구현했다.
- 체크리스트 추가 페이지를 따로 제작하기엔 체크리스트 생성에 필요한 Component가 많이 필요하지 않고,
화면에서처럼 전체 목록에 바로 체크리스트를 이어서 추가하는 기능으로 구현하면 페이지 이동을 최소화 하면서 이용 가능할 것으로 생각했다.
- 메모 페이지와 동일한 방식으로 작동한다.

![serverchecklist_server_checklist 4](https://github.com/user-attachments/assets/c9e395e9-8b77-4a79-852d-bdfff45f791a)

![serverchecklist_server_checklist 5](https://github.com/user-attachments/assets/f3779cd9-07e0-435a-9507-7809e0a38ed5)

4. 체크리스트 수정은 수정하려는 체크리스트의 수정 버튼을 누르면 바로 체크리스트가 수정 form으로 변하여 체크리스트를 수정할 수 있다.
- 체크리스트 추가 페이지와 마찬가지 이유로 수정 역시 별도의 페이지 이동 없이 바로 수정할 수 있도록 구현하였다.

![serverchecklist_server_checklist 6](https://github.com/user-attachments/assets/486bca53-3da9-4021-ae20-53f53e5d41fc)

![serverchecklist_server_checklist 7](https://github.com/user-attachments/assets/65c389cc-9427-4d57-9661-d998939ab01d)

5. 체크리스트 삭제 버튼을 누르면 삭제를 재확인하는 confirm 창이 뜨며, 확인을 누르면 해당 체크리스트를 삭제한다.

![serverchecklist_server_checklist 8](https://github.com/user-attachments/assets/fb722853-6959-4293-9bc5-7ea5b11088aa)

- MongoDB에서도 해당 체크리스트가 삭제된 것을 확인할 수 있다.

![serverchecklist_server_checklist 9](https://github.com/user-attachments/assets/02faa5a9-8ce1-46d1-9538-193208c5a33f)

6. 체크리스트가 6개 이상일 때 서버 메인 화면에서 최신 등록 및 수정 순으로 6개만 표시하도록 설정할 예정이다.
- 코드 상의 문제로 인해 데이터가 원하는 개수만큼만 들어오지 않았다.

![serverchecklist_server_checklist 10](https://github.com/user-attachments/assets/47186e34-b662-4e20-8a9e-f568bcb59c1e)

7. 체크리스트 목록에서 체크 박스를 누르면 체크 표시를 바꾸고, 페이지를 새로 고침하거나 벗어났을 때만 체크리스트의 체크 여부를 수정하는 요청을 전송한다.

![serverchecklist_server_checklist 11](https://github.com/user-attachments/assets/e6e56432-2b6c-4274-97a0-3d74225fa182)

- 변경된 체크 박스 상태는 서버 메인 화면에서도 확인할 수 있다.
- 스타일은 이후에 수정할 예정이다.

![serverchecklist_server_checklist 12](https://github.com/user-attachments/assets/7438b314-77f0-4d5d-a1ca-5af107a90c01)

