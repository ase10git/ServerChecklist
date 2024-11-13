- 테스트에 사용한 이미지는 모두 구글에서 검색한 이미지들로, 테스트 이외의 목적으로 사용하지 않았습니다.
- 지도 이미지는 [Once human Map GENIE](https://mapgenie.io/once-human)의 Interactive map 이미지를 사용하였습니다.
- 수정일 : 2024.11.13

# Map Page

- 메인 화면에서 특정 서버의 "등록된 지도" 부분을 클릭하거나, 서버 메인 화면에서 지도 "더보기"를 누르면 해당 서버의 지도 페이지로 이동한다.
- 우측 상단의 제거 버튼은 이후에 여러 개의 지도를 한 번에 제거하는 기능 추가를 위해 생성하였다.
- ~~그러나 권한 별 삭제 및 수정 기능 추가 시 필요 없다고 느껴지면 구현하지 않을 수 있다.~~

![serverchecklist_server_map](https://github.com/user-attachments/assets/50853d7c-1e70-413a-b506-40fe8d63ad54)

# MapAdd Page

1. 서버의 지도 메인 페이지에서 우측 상단의 + 버튼이나 중앙 하단의 + 버튼을 누르면 지도 추가 페이지로 이동한다.

![serverchecklist_server_map 2](https://github.com/user-attachments/assets/a66e66e8-1ecf-4be3-9ce3-4478b6991191)

2. 지도 추가 페이지에서 지도의 이미지와 정보를 입력할 수 있다.

![serverchecklist_server_map 3](https://github.com/user-attachments/assets/78d847c3-cdd6-4f94-a985-6cb62042ea07)

3. 추가된 지도는 지도 메인 페이지에서 지도 이미지와 이름으로 확인할 수 있다.

![serverchecklist_server_map 4](https://github.com/user-attachments/assets/269b6f0c-7453-4f88-a5ae-96065b54d4a3)

# MapDetail Page

1. 지도 메인 화면에서 특정 지도를 클릭하면 그 지도의 정보를 볼 수 있는 지도 상세 페이지로 이동한다.

![serverchecklist_server_map 5](https://github.com/user-attachments/assets/a99775e7-be61-4b5f-bdcf-ee7879efbc0c)

2. 우측 상단의 수정 버튼을 누르면 지도의 정보를 수정할 수 있다.
- 수정 페이지가 따로 존재하지 않으며, 상세 보기 페이지에서 즉시 수정하는 form을 표시하도록 설정했다.
  - 이는 메모와 체크리스트 페이지들처럼 페이지 이동을 줄이기 위해 설정하였다.
- 현재 권한 별 제어가 설정되어 있지 않아 이후에 추가할 예정이다.
- 입력하지 않은 필드는 기존 데이터를 그대로 사용하도록 설정했다.
- 지도 이미지는 MongoDB의 GridFS를 사용하여 Document 형식으로 저장되어 있다.

![serverchecklist_server_map 6](https://github.com/user-attachments/assets/b50d1054-86c4-47d3-8d31-6b22c77a8420)

![serverchecklist_server_map 7](https://github.com/user-attachments/assets/35196330-8f03-42a8-b035-6a0c1b0b00fb)

3. 추가된 지도들은 서버 메인 페이지에서 6개 이상일 때 최신 등록 및 수정 순으로 6개만 표시하도록 설정할 예정이다.
- 코드 상의 문제로 인해 데이터가 원하는 개수만큼만 들어오지 않는 상태라 수정할 예정이다.
- 서버 메인 페이지에서 지도들을 클릭하면 해당 지도들의 상세 보기 페이지로 이동한다.

![serverchecklist_server_map 8](https://github.com/user-attachments/assets/cbd1a9d1-c9eb-41ba-acc7-21934d3de9a9)

4. 지도 상세 보기 페이지에서 우측 상단의 삭제 버튼을 누르면 삭제를 재확인하는 confirm 창이 뜨며, 확인을 누르면 해당 지도를 삭제한다.

![serverchecklist_server_map 9](https://github.com/user-attachments/assets/3d5240e9-6f9d-4c00-ae39-1d23561f1649)

![serverchecklist_server_map 10](https://github.com/user-attachments/assets/52be844a-255e-414c-8566-96cca2808b35)

- MongoDB에서도 해당 지도가 삭제된 것을 확인할 수 있다. 

![serverchecklist_server_map 11](https://github.com/user-attachments/assets/c8342c03-6547-406f-9223-686a482dffdb)

