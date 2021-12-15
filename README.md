# SiteCreateProject

독학으로 사이트 만들어보자

# heroku 배포서버 # http://aaaqwe.herokuapp.com/

2021.02.26 - Search 페이지에서 출력이 가능함. 검색바에서 엔터 기능이 안됨. 검색 클릭으로 검색 후 페이지 전환> Search 페이지에서 검색된 텍스트로 글을 가져오게 만들어야함

2021.03.22 - 쿠키세션을 이용해서 로그인 로그아웃 기능을 구현하였고, 페이지 메인 홈, 로그인, 회원가입, 검색을 임시 완료했으며 추가로 마이페이지 형태의 아이콘과 고객센터에서의 게시판 등을 제작할 예정.
메인 홈페이지 - 카테고리버튼을 누르면 사이드바가 나오는 틀 형식을 완성. 메뉴 배너, 검색창 특정 아이콘 구현 컨텐츠 상품 구간의 출력 형식 완료.
회원가입 - 회원가입 형식 틀을 완성하고, 필요한 정보들을 입력 후 id중복 등 각 규칙에 따라 입력하지 않았을 시 입력하고, 중복을 누르지않았을 시 요구하는 코드작성 완료, 가입시 db에 저장.
로그인 - 로그인 기본 형식 틀을 완성하고, 쿠키 세션을 추가하고 로그인시 db데이터를 검색하여 서버에서 입력한 id와 같으면 로그인을 완료하며 세션에 암호화하며 저장하는 것을 구현.
검색 - 검색시 엔터와 검색 버튼을 텍스트 입력 후 검색되도록 하였으며, 검색 시 state에 검색 문구 저장 후 서버로 전송하며 서버>DB로 정보를 검색 후 검색한 정보가 나오도록 하여 검색페이지로 이동하여 나오도록 함.

- 다음 구현 목표 \*

* 마이페이지를 아이콘 형태, 호버 시 메뉴가 출력, [주문/배송조회, 주문취소/반품/교환, 회원정보]가 나오고, 장바구니 아이콘 사용. <최근본상품 TOP버튼 상단에 표시 구현> (아이콘: 마이페이지, 장바구니).
* 메뉴 배너에 추가할 이동 텍스트를 만들고 메뉴는 카테고리로 이동, 우측에 로그인, 회원가입, 고객센터 나오도록하며 로그인 시 [유저이름 로그아웃 회원가입 고객센터] 출력. 유저이름 호버시 밑줄 표시. 클릭 시 정보.
* 카테고리 버튼 호버 시 메뉴가 소메뉴에서 관련 메뉴로 나오게한다.
* 마이페이지 관련 페이지 구성, 고객센터 구성

  2021.03.23 - 오늘은 사용자용 아이콘을 교체했고, 메뉴배너에 사용자 메뉴를 이동 후에 디자인 요소들을 수정했음.

  2021.03.24 - 아이콘 수정하다가 끔

  2021.03.25 - 아이콘 디자인 메뉴 수정(아이콘 이미지 or 전체 이미지 수정 필요), 메뉴배너 디자인 수정했음.

  2021.03.26 - 아이콘 디자인 수정. 디자인 호버시에 선부분만 색이 변해야함, 디자인과 개발 너무 어렵다. li 호버 시(액티브) 같은 디자인에 다른 색상 적용

  2021.03.27 - 아이콘 위치조정함. 디자인 호버시에 선부분만 색이 변해야함, 마이 메뉴 텍스트 조정해야함.(11번가 참조).

  2021.03.29 - 이미지 파일 복구 및 수정 중에 문제가 발생 top 버튼 아래 링크 참조.
  https://kutar37.tistory.com/entry/%EB%A7%A8-%EC%9C%84%EB%A1%9C-%EB%B2%84%ED%8A%BC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

  2021.03.30 - 메뉴배너 마이메뉴배너 수정

  2021.04.07 - top 버튼 수정완료. 메뉴 수정 중 사이드.

  2021.04.09 - 마이메뉴 if문 적용. 서버켜고 로그인 상태로 유지되는지 확인필요. 사이드 메뉴 수정.

  2021.04.17 - 작업했던 것들 확인했음. 품목별 메뉴(사이드메뉴배너/호버메뉴배너), 사용자[주문/배송조회, 취소/반품/교환, 회원정보, 장바구니], 고객센터 게시판, 상품 소개페이지/구매 절차 작업 필요.

  2021.04.20 - 코딩친구 코드 수정해주고, 사이드메뉴 수정하고 찾다가 끔

  2021.04.20 - 사이드메뉴 품목별 종류 수정 중. 호버시 액티브? 추가 div 활성화됨에 따라 서브메뉴 표시.

  2021.04.26 - 사이드메뉴 품목별 종류 디자인 80% 완료. 품목별 className 변수(제품)마다 각각 지정되도록 수정필요. [ html aria ] 검색해서 배워야함 사이드 버튼부터 사이드 창까지 활용

  2021.04.27 - 품목별 className 변수(제품)마다 각각 지정되도록 수정필요. [ html aria ] 검색해서 배워야함 11번가 벤치마킹해서 코드 수정 중

  2021.05.01 - 11번가, aria 관련해서 찾아보고있는데 지식이 미숙하여 코드를 쓰지못하는 중이다.

  2021.05.02 - 사이드바 외 화면 색변환과 클릭 시 사이드창 닫기 완료.

  2021.05.03 - 사이드바 메뉴와 서브창 호버 활성화가 안되어 확인 후 z-index 넣어서 수정.

  2021.05.04 - css 코드 수정. 사이트배포를 위해 헤로쿠 배포 중

  2021.05.06 - 사이트배포를 위해 헤로쿠 배포 중

  2021.05.07 - 사이트배포를 위해 헤로쿠 배포 중

  2021.05.08 - 사이트배포를 위해 헤로쿠 배포 중

  2021.05.09 - 헤로쿠 배포는 가능하도록 했지만 error가 나옴
  2021.05.11 - 헤로쿠 배포는 가능하도록 했지만 error가 나옴
  2021.05.12 - 헤로쿠 배포는 가능하도록 했지만 error가 나옴

  2021.05.14 - 배포 후 코드를 수정. 헤로쿠 사이트 앱 설정에서 환경 변수 PORT 5000 추가하여 503 에러 해결 R10 앱 출동 및 부트 타임 아웃은
  이와 관련 없는 문제임. 그리고 아마존AWS 가입 후 RDS 즉, DB 관리 프로그램에서 DB 생성해서 기존 MYSQL 정보 다시 만들고 노드JS 서버 코드 수정 후 재배포를 하였고, GITHUB용 폴더 생성 후 파일 복붙함.
  추후에, GITGUB에 다시 배포해서 내 정보가 업로드되지않도록 해야함. 또한 헤로쿠와 아마존 RDS가 연동되지않았을 시 다시 해야할 필요성이 있음. # 사진이 안나와 << 고침

           사이드바 aria data 등 11번가 벤치마킹해서 공부 필요. 상품페이지, 고객센터, 사용자정보, 사용자와 연동된 장바구니, 주문/배송조회, 반품/취소/교환 페이지 제작이 필요함.

  2021.05.16 - github에 14일 기준. 비밀정보 들어가지않도록 데이터 업데이트 완료. 오늘은 server.js sql문 코드와 회원가입css 수정했고,
  지금부터 진행 중인 것은 회원 정보를 만드는 것이다. 회원 정보를 누르면 만약, 로그인 상태가 아니라면 로그인페이지로, 로그인 상태라면 비밀번호를 입력 후 고객의 회원정보창으로 이동. css 구성 필요.
  회원정보에 대한 곳에 들어갈 때는 비밀번호 입력 필수. 회원정보창은 좌측 사이드에 새로 배너 형식으로 회원정보에 대한 것을 넣는다. 사이드바에 회원을 누르면 어떻게 할지 고민 중.
  아이콘 배너 회원정보 누르면 회원의 기본 정보 창으로 이동.

           - 회원정보 클릭 시 로그인하고 있을 경우 비밀번호 체크 페이지 제작 중에 있음.

  2021.05.18 - 비번 체크 페이지 디자인은 대충 카피해놓았는데 복붙으로 하니 좋지않다.디자인 컴펌만 하고 직접 코딩하는게 좋을 듯.

  2021.05.21 - 회원 정보페이지 이동 url 수정. 서버 쿠키 정보 가져와서 비번 체크하는 거 서버js 에서 수정하다가 멈춤. 여기서부터 db 안됨.

  2021.05.24 - 홈 화면 - 스크롤바 생기면 간격이 수정되서 불편. 크롬에서 사이드 표현할 시 떨림 발생. /pwcheck 로그인 후에 회원정보 누를 시 들어가는 비번 입력 페이지가 비로그인시 눌렀을 때 로그인 창으로
  이동하도록 하며 디자인 수정. 일단 게시판부터 만들기로 정함.

  2021.05.26 - 고객센터 페이지 제작 중이며, 미트리 벤치마킹. 문의는 공지 및 자주 묻는 글들로 구성이고 기타 문의사항은 회원 개인의 정보에서 문의에서 확인.

  2021.05.28 - 공지사항, 주요 질문/ 디폴트 공지사항로 되어 있으며(1) 색이 변해있다. 주요 질문(2)으로 호버 시 색이 변하며 1은 기본 색으로 변경, 클릭 시 클릭한 1 또는 2로만 표시. 이 기능은 focus로 하는가? 확인 중.
  일 끝내고나면 오후 6시다 힘들다.

  2021.05.31 - top menu의 sub menu li가 제대로 표시되지않아 수정, menu css 프로필 및 글씨 수정. 게시판 어케 하지

  2021.06.03 - 게시판 쓰기 페이지, 공지 및 질문 사항 페이지

  2021.06.04 - 게시판 쓰기 읽기 페이지코드 분류해놓음. 게시판 db 테이블이 필요. footer 공간 분류하기가 좋지않음. bootstrap(부트스트랩) 임포트 시 css 균열발생.

  2021.06.05 - 게시판 DB 작성. 게시판 목록, 클릭 시 읽기, 또는 쓰기 필요.

  2021.06.06 - 게시판 테이블 css 작성.

.
2021.06.07 - 게시판 테이블 css 작성. 생성날짜 함수생성.

2021.06.10 - 뭐지 크롬에서 sidebar 진동울리는거 고쳐짐. 어제 디자인 구성 ppt 대략적으로 완료. 테이블 수정하고 위에 쓰기게시판 버튼 달음. 게시판 페이지 추가.

2021.06.11 - 테이블에서 db 연동. 글쓰기페이지에 axios 사용해봄 추후 모두 교체, 아마존 AWS-RDS 사용해제해서 돈 안나가도록 서버폴더에 JSON으로 저장. 그리고 깃허브에 매번 코딩하고 푸시해두기 블로그 만들어서 코딩한거 작성해주기. 인프런, 리액트 자습서 등 공부하기.

2021.06.12 - CKEditor data 내용을 state에 저장해서 서버로 넘겨야함. JSON으로 변경하여도 데이터를 저장하는 것과 JSON파일을 불러와서 특정 정보를 가져오는 것도 문제요소로 검토가 필요. 깃허브에 푸싱.

2021.06.14 - rds 삭제했다가 다시 만들어서 변경했다. 로컬 mysql로 하려다가 JSON으로 변경하는 요소 때문이다. DB 테이블 구성하고 서버코드에서 테이블관련 코드 수정, 회원가입에서 아이디 생성날짜 기록을 위해서
STATE 변수 생성, 외부 함수 불러오기 위해서 스크립트 폴더에 TIME.JS 생성후 함수 작성. 시간함수를 편하게 보기 위한 코드작성.
회원가입 후 로그인하고 nickname이 제대로 표기안됨. db 다시 생성하고 회원가입 페이지와 서버 코드 수정해서 안되는 것으로 의심된다.

2021.06.15 - {authority.name}의 유저 닉네임 가져오는 것을 해결. 로그인할 때 토큰에 id와 토큰 내용에 nickname을 저장하는데 db을 재구축하면서 변수 이름이 변경되어서 안나왔음.
ppt 자료에 필요한 구성 계획을 만들었다. 일단 게시판테이블에 ckeditor에서 추출되는 타이틀과 컨텐츠 데이터를 저장하는 코드를 잘못써서 안되던 것을 해결.
추가로 쿠키에 저장되있는 id와 쿠키내용인 nickname을 state에 저장. subject, look_post를 설정할 수 있는 input를 추가하고 date_created(생성일)를 전송시 state에 저장.
hit는 게시판 리시트에서 클릭시 카운트. 게시판테이블도 수정했음. 추후에 게시판 수정 버튼을 만들어서 수정할 수 있도록 해야한다.

2021.06.16 - server db config에 dateString: 'date' 추가함으로서 db에 저장된 날짜를 원하는 형식으로 출력.
작성한 글은 문의내역에 표시한다. 제목을 클릭하면 제목에 해당하는 글들을 불러와서 출력. #글보기페이지# 글보기페이지에서 수정버튼을 누르면 에디터에서 글들을 파싱해서 에디터에 불러온다.
수정하는 것은 수정페이지를 만들어서 만든이의 id로 에디터에 title, content를 파싱해서 수정할 수 있도록 하는것과 말머리와 비공개체크도 설정한 그대로 가져와야한다.

2021.06.18 - 글쓰기 게시판의 정보 서버로 넘기기위한 규칙과 전송 코드 작성. 개발 친구와 필요한 것들이 무엇인가 의논. # 다음 필요 요구사항 : subject(말머리)를 디폴트되있는 라벨 비슷한거로 인풋만들고 정보추가,
look_post(비공개여부)를 체크박스 형식으로 인풋하고 디폴트 논체크로 되어있다면 0 공개, 1 비공개(운영자만 확인) 추가 필요. 또한 운영자가 로그인이라면 말머리에 공지 선택지 추가.
리스트게시판 페이지에서 해당 글을 클릭할 시 해당 페이지로 이동되고 이후 글읽기페이지도 제작필요하며 해당게시글을 클릭하여 들어갔다면 hit(조회수)가 카운트 +1 되도록 추가필요.
에디터의 커스터마이징이 필요하며, 글쓰기수정 페이지와 글쓰기읽기 페이지가 필요하다. gitignore 적용하려다가 굳이 지울 필요성은 없는 것 같아 하지않았다.

2021.06.19 - bootstrap 적용하니 css가 깨지는 문제로 css 수정에 돌입했다. 전체적인 css 수정으로 디자인을 복구하고 재수정함. 이후에 글쓰기게시판에 라디오 체크박스 그룹 만들어서 정보 받아보려고 했지만 안되어서 방법을 찾는 중이다. heroku 배포를 해보니 에러가 뜬다. 무슨 일인가

2021.06.21 - heroku pre-receive hook declined 문제로 찾는 중. 프로젝트 삭제 후 수정하면서 고쳐야할 듯.

2021.06.22 - git 폴더 삭제해서 고쳤다. 하지만 이런 방법으로 해결하면 안될 것 같다. 리액트 체크박스라디오버튼그룹 만들려고 했지만 펑션으로 만들어 클래스에 넣는 것이 안되어 클래스 안에 state로 만들어서 사용해야할 것 같다. 삭제한 이후에 푸싱해보려고하니 공개키가 없어 권한이 부여되지않은 사람은 할 수 없다고 해서 ssh 공개키를 생성해 깃허브 세팅에서 공개키를 하고 푸싱을 했다.

2021.06.23 - 라디오 버튼 클릭해서 설정후 저장되는 것과 게시판 제목 클릭 후 게시글번호에 따른 페이지 부여와 정보 출력까지 완료. 해당 페이지 접속 후 재접속하면 이미지가 사라지는 현상있음. 다음으로 비공개여부와 조회수 기능을 구현해야함.

2021.06.24 - db 끊김 현상 해결. 서버코드에서 alert가 작동은 안되는데 db를 끊어서 삭제했음. 장바구니 css 코드 가져왔음. 고치거나 다시 작성해야함. 글쓰기 페이지 비공개설정 체크박스 css 생성 기능넣어야함. 조회수 기능은 고민 중

2021.06.25 - 비공개체크버튼 생성 완료, 비공개시 운영자에게만 보이도록 하는 것은 아직 안만듬. 기능되는지 확인필요. 조회수 기능은 테스트할 생각이면 만들 것. 비공개버튼 onchange가 변하지않아서 문제가 있음. 값은 변해서 나온다. returnUrl 를 홈, 검색, 회원가입 등 다른 페이지에서도 적용해야함.

2021.06.27 - 아.. check state에 'false'는 그냥 문장으로 저장이 되므로 토글 버튼 안에 문장을 넣는 것이 아니라 false, state에 false와 true의 값을 넣어야된다. 혼자서 하려니 하기 어렵다. 지식이 부족하다. 로그인 코드에서 각각 리턴해야할 페이지(고객센터 상품페이지 등) 쿼리스트링값을 따로 줄것인지.
백콜? 뒤에 있던 페이지로 이동시키는 스크립트를 사용할 것인지 찾아야한다. 다음으로 글쓰기 페이지에서 비공개버튼 활성화일시 운영자만 보게하는것과 조회수 클릭시 카운트 기능과 게시판 페이징 작업이 필요하다. 토큰 유지시간 초과시 자동 토큰 삭제가 되며 alert로 알림을 주고 홈으로 이동시켜야함.

2021.06.28 - 비공개 기능은 subject에 비공개처리가 되어있고 운영자가 아니라면,게시글을 확인할 수가 없도록 만듬. react pagenation으로 페이징 작업할 것이다.

2021.06.29 - 게시글 작성자가 본인이라면 수정또는 삭제가 가능하도록 하는 것을 시도중인데 style를 정리하는 것에서부터 문제가 있다.

2021.06.30 - 서버에서 정보를 가져오는 것에서 문제있었다. 페이지마다 사용하는 checkAuthority 함수내에서 axios.get에서 post로 바꿔 사용하여 정보를 가져왔고, 제일 큰 문제는 조건식으로 style를 바꿔야하는데 문제를 해결못하고있다. 기본적으로 서버의 app /authority 토큰 권한 확인, 토큰 관련 코드에서 문제가 있어서 토큰 처리가 제대로 안되는 것과 직접적으로 문제가 터지고있음.

2021.07.01 - 셀럭터 또는 제이쿼리 쪽으로 찾아봐야하는건지 찾기 어렵다. 무엇이 CSS의 IF문으로 해결을 볼 수 있을까

2021.07.03 - 제이쿼리 docement.style.(id, value) 등 연결해서 css 변경하면될 듯하다.

2021.07.05 - id를 이용해서 js로 onView 함수 안에 로그인 정보와 게시글 정보를 비교한 조건문으로 삭제 버튼 활성화 css 기능을 구현해둠. 함수 안에서 정보를 받지않으면 정보가 나오지않음. 게시글을 삭제하면서 삭제 함수 안에 삭제 이후 삭제한 글을 확인 후 alert를 띄워야하는가 아니면 삭제했다고만 하는지 고민이 필요. 삭제는 이미 idx 값을 받아서 그 값의 게시글을 삭제했고, 삭제해서 제대로 삭제되었다면 그냥 띄워도 되고, 한번 더 확인 후에 띄우는 것도 확실한 구분법이다. 오늘은 삭제 기능에 css와 db삭제 기능을 넣음.
/ 다음으로 수정하는 기능의 페이지 구현을 하면서 에디터를 사용해야하는 것과 조회수 카운트 기능과 게시글 페이징이 필요하다. 그외에 것은 이것을 해결하고나서 생각하도록 하자.

2021.07.12 - 로그인 후에 전에 있던 페이지로 이동하는 코드가 안되어서 코딩다시함. read페이지 css 작성, fix페이지로 이동하는 버튼 생성. write페이지에서 로그인한 id가 admin이 아니라면 라디오토글에서 공지를 선택할 수 없도록 보이지않게 처리함. read페이지에서 fix >> 뒤로가기로 read페이지로 갈 때마다
db 정보가 그래도 나오는 문제로 axios 전달방식을 get에서 post로 변경해서 나오지않도록 처리함.

헤로쿠 프리 디클라인 훅 에러..

/ 다음목표. (에디터 수정필요)read페이지에서 읽어오는 컨텐츠 내용이 <p> 태그가 붙지않도록 저장할 때 또는 불러올 때 나오지않도록 수정하기. 게시글목록 페이징처리하기. 조회수 카운트 기능. 시간이 지나서 state가 로그아웃으로 변경되면 창하나 뜨고 로그아웃알림과 동시에 쿠키 삭제필요.

2021.07.13 - <P>태그를 없애거나 수정하려면 ckeditor config.js를 수정해서 코드를 넣어야하는데 어떻게하는지 알 수가 없다. 인터넷 글들이 html 태그 붙은거밖에 없는데 코드 한줄 넣으라고만 되어있다. 다른거 부터 해결하는게 더 효율적일 수도..

2021.07.14 - 페이징 처리를 위해서 페이지 요소를 작성과 css을 구성했다. 페이지 번호가 선택이되는데 새로고침하면 1로 변경되는 문제가 있음. 데이터를 받아와서 처리를 해야하고, const 형식 또는 함수형으로 변경할 것인지 생각 중이다.

2021.07.15 - 쿼리스트링을 사용해서 페이지 번호 선택 후 페이지 이동하면서 쿼리스트링 를 넣어주고 쿼리값을 페이지 수에 넣어주려고하는데 페이지 이동할 때 렌더링 되면서 값이 사라진다. 클래스형 말고 함수형으로 교체할까 고민.

2021.07.17 - page 변수에 정보가 들어가니까 page로 정보를 저장해서 저장한 정보를 가져와서 activePage에 값을 넣어서 현재 페이지를 액티브표시하고 목록 번호를 클릭하면 페이지가 이동되며 쿼리 스트링 값으로 페이지 리스트에 대한 출력 리스트를 만들어줘서 그 항목만 받아오는 것인데.
페이지가 이동되며 액티브가 사라지는 관계로 정보를 유동적으로 받아와야한다. 음.. 쿼리로 받으려했지만 유동적인 기능의 정보 전달이 필요. useState도 새로고침되면 정보가 사라지는 것이 아닌가? 그럼 클래스형 state랑 같은 것으로 생각됨.

2021.07.21 - 페이지 선택에서 onChange에 페이지 이동만 남기고 pageNumber 변수를 만들어 쿼리스트링 함수를 추가한 후 activeNumber에 pageNumber를 넣어서 페이지 클릭 후 선택한 화면 페이지 표시하도록 수정. 게시판에서 글쓰기 작성 저장시에 서버에서 content 값에서 <p></p>가 삭제되도록 slice 함수를
사용해 저장되었을 시 태그없이 저장되도록 수정. ServiceCenter.js에서 비공개 글일 때에 작성자 또는 운영자만 확인할 수 있도록 조건을 달았는데 map함수에서 item.subject에서 함수 배열에 저장된 모든 subject를 불러오는 문제로 조건문이 제대로 되지않음.

2021.07.25 - ServiceCenter의 비공개 규칙에서 write페이지의 작성시 subject에 변수에 저장되는 정보를 비공개로 하지않고 비공개의 별개 변수로 db에 저장해두었고, 이것을 db에서 정보를 가져와서 / 마운트할 때 look_post가 1이면 타이틀 옆에 이미지 표시를 하고 비공개이면 작성자, 운영자를 제외 시 확인할 수 없도록 만들어야한다. 조건을 다는 것에 문제가 있다. 함수내에서 map함수를 쓰고 조건문을 하려고하니까 if안에서 map 함수가 안된다. 코딩하는 문제인 거 같고, 이거보단 먼저 페이지의 리스트 항목를 표시해주는 것을 먼저 하는게 맞을 것 같다. 또한 페이지 선택하고 선택한 페이지 번호가 지정되는 것은 완료.
write페이지에서 작성한 컨텐츠 내용이 read 페이지에서 표시될 때 태그가 붙지않도록 server의 write 코드에서 변수를 slice함수를 사용해 처리함.
목표- 페이지 항목리스트 지정해서 나올 수 있도록할 것. 비공개 규칙적용. 게시글 수정을 위해 에디터에 정보 불러오고 다시 수정.

2021.07.26 - server에서 리스트목록을 불러올 때 쿼리스트링 값에 따라 정보단위를 끊어서 가져오도록 해보았다. 최종적으로는 페이지네이션이랑 연동해서 값을 나오게 하는게 맞다. 아직 더 해야할 듯

2021.07.28 - server에서 하는 것은 좋지않아서 ServiceCenter에 정보를 받아와서 값을 정리하고 페이지네이션에 정보를 연동하는 것으로 하고있는 중

2021.07.29 - state에 값을 넣고 사칙연산으로 값을 만들어 페이지네이션에 값을 넣어 연동시켰다. 페이지네이션의 구조를 이해할 필요가 있었음. 비공개 규칙에서 link 버튼을 클릭했을 시 정보가 여러개 나오는 문제로 규칙이 제대로 되지않음.

2021.07.30 - 서버에서 가져온 배열에서 비공개 값을 클릭한 것만 받아서 하려고했지만 모두 출력된다. 코드의 문제라고 생각을 했고, cs_board_info[number].look_post로 하면 지정한 값이 나온다. 하지만 내가 클릭해서 나오는 값이 아니기 때문에, 이것을 어떻게 할 지 고민이다.

2021.08.01 - 토의해본 정보로 db에서 쿼리 명령을 수정해서 id와 비공개 설정 값으로 해당하는 id만 출력하는 것이 있다 만약에 비공개 설정이면 '비공개 글입니다.'라는 문구로 if문으로 링크의 to 값을 넣지않는다. 규칙으로 만들 때 onchange로 해보려고 했으나 잘 안되지않아 더 해봐야할 듯함.
코드 수정을 통해 비공개 값을 가져와 조건문을 달아서 글을 들어가는 것을 조정함. title 앞에 em에서 설정 값에 따라 잠금 이미지를 표시해주려고 했는데 js html dom이 잘 안되서 찾아봐야하겠다.

2021.08.03 - 글쓰기페이지의 조건문에서 코드 오류로 저장이 되지않아 수정하고, 말머리가 비공개로 되는것은 서버에서 코드를 수정하여 변경. ServiceCenter의 함수 안의 link가 번호에 맞게 들어가지않아서 cs_board_info의 idx를 가져와서 수정함. fix 페이지를 구성했으나 input과 토글버튼에 지정한 값이 들어가지 않아서 구현을 못하고 있으며, 서비스센터의 잠금이미지가 각각의 항목에 표시되지않는 문제가 있다.

2021.08.04 - 수정페이지에서 수정할 수 있도록 db 오류를 고쳤음. 수정페이지에서 정보는 가져올 수 있으나 제목과 내용을 넣고나면 오류가 나옴. 제목을 넣으면 화면이 안나오고, 내용을 넣으면 나오지만 추가적으로 입력을.. 코드를 이해하지 못한 것으로 인한 문제.

다음목표. 잠금이미지 각각 출력. 로그인, 로그아웃 클릭 시 실행 후 이전 페이지로 이동, 장바구니, 상품페이지 제작, 정보 수정, 사용자정보 이동시 비번체크, 주문조회, 반품교환

2021.08.05 - 읽기페이지에서 수정페이지로 이동 후 title, content 정보를 불러서 출력를 완료함. 글수정 후 목록으로 이동되면 글이 안뜨는 현상. 홈으로 이동 후 다시 목록으로 이동시키는것으로 대체함.

2021.08.06 - em태그의 이미지를 비공개 값에 따라 이미지 출력를 시도했지만 가진 지식으로 부족해서 말머리만 비공개로 전환함. 로그아웃 클릭시 홈으로 가던 것을 새로고침하여 로그아웃하기 전 화면을 출력. home페이지에서 쿠키에서 status가 로그아웃이면 쿠키 삭제해야함.

2021.08.10 - 로그인 로그아웃 변경 중, 로그인 함수 수정과 쿼리 주소를 넣는 것으로 전역에서 로그인과 로그아웃 처리를 했을 때 이전 화면으로 돌아감.
다음 목표. 사용자 정보시 비번체크와 정보 수정 페이지 제작

2021.08.14 - 서비스센터에서 글쓰기 클릭 시 로그인안되었을 때 로그인페이지 가는 것 오류 수정. 사용자 비번체크페이지 서버코드 수정. 비번체크 함수가 입력한 생각대로 되지않았지만, 기존 코드의 오류와 조건문 변경으로 수정완.
다음 목표. 정보 수정 페이지 제작과 닉네임 및 비번 변경

2021.08.15 - 비번체크 함수를 다시 실행해본 결과 오류가 아직 있어서 수정함. 쿠키함수 마운트할 때 상태값 넣어줌.

2021.08.17 - 정보수정페이지에서 css를 살짝 수정했고, 로그인한 정보를 가져와서 출력. 변경버튼을 클릭 시 정보를 기존 정보를 업데이트하는 쿼리를 작성해야하고, 여기서 id를 제외한 정보를 모두 변경해주는 것이기 때문에 정보를 어느 것이 변경되어 변경한 것만 업뎃할건지 아니면 받은 정보를 그대로 넣고 변경한 값을 받아 그대로 업뎃할지 선택해야함.

2021.08.20 - 서버코드를 보다보니 쿠키세션에서 바로 id값을 가져오면 함수에서 id불러서 가져오는 것을 굳이 하지않아도된다. 고치도록하자. 데이터를 변경할 수는 있을텐데 placeholder로 값을 두고 입력을 안하고 변경하면 오류가 생김 이걸 어떤 규칙으로 마무리해야할까

2021.08.21 - axios에서 server로 정보 넘길때 this.state 값을 넣어주지 않아서 서버에서 정보를 제대로 전달받지않아 오류가 생긴 것을 수정. item페이지를 만들고 기능을 점검해야함.

2021.08.23 - item 페이지 서버에서 상품 정보 받아오는 것을 완료. 페이지 css 완성해야함. item페이지의 css를 넣었고 내것으로 다시 구상해서 수정할 필요성이 있으며 장바구니 페이지를 추가해서 장바구니 기능을 추가 설정해야함.

2021.08.24 - 장바구니 페이지 구성.

2021.08.26 - 장바구니 DB 생성. server 코드 수정.

2021.08.29 - 장바구니 DB 코드 수정하여 값이 저장됨.
다음목표 - cartbox페이지 값을 받아와서 간단하게 확인할 수 있도록 css 수정과 db 구성 수정, cart목록 삭제처리 구현.

2021.08.30 - cartbox css 수정. server에서 db 코드 수정 필요.

2021.08.31 - cartbox map함수 내 코드수정. server의 저장한 물품 삭제 db코드 수정. cartbox css 수정. 삭제 장바구니 담기는 것 구현확인. 장바구니 페이지 조건문 (비로그인이라면/상품을 담지않았다면)에서 조건이 겹쳐서 아래거가 나오는데 겹침
다음목표 - 주문조회/반품교환 페이지 만들기, 사용자주문페이지가 완성되면 자잘한 기능 구현.

2021.09.01 - 구매순서로써 1번 장바구니 2번 주문서 3번 주문완료 순으로 장바구니에서 주문시 주문서로 이동, 바로구매시 주문서로 이동해야함. 즉, 주문서 페이지를 추가로 만든다. 주문서 페이지는 배송지 주문상품 할인/포인트 결제 방법 등이 있지만 본인은 배송지, 주문상품 설명부분만 만들 것이다.
만약 item페이지에서 구매버튼으로 주문서로 이동시 state 값으로 정보를 이동시켜 출력, cartbox페이지에서 구매버튼으로 주문서로 이동시 state 값으로 이동시켜 출력.
item페이지에 구매함수 만드는 중이고, server에 db코드 생성 중이며, db 테이블을 어떻게 구성해야할지 고민하고있음.

2021.09.05 - 장바구니 테이블 재구성했고, 구매 함수 재정의하여 페이지 이동, 주문결제 페이지 레이아웃 작성 중.

2021.09.12 - 주문결제 페이지 오류 해결(link 라이브러리 작성안함)

2021.09.15 - 레이아웃 작성 중. 틀부터 만들다가 다시 제작 중이다.

2021.09.16 - 레이아웃 작성 중

2021.09.17 - 레이아웃 작성 중. 데이터를 전송에 관한 것들은 레이아웃을 작성하는 것에 비해 빨리 끝나는거 같다. 만드는데 오랜 시간이 소요되고있다. 공간 틀만 잡아두는 중.

2021.10.31 - 게시판 읽기에서 함수 오류로 버튼 표시가 되지않는 문제를 해결(버튼이 표시되기도하고 안되기도 하는 문제가 있음). 주문결제 페이지 레이아웃 작성중. 오랜만에 하려니 뭔가 할 엄두가 나지않는다.

2021.11.01 - 회원가입 데이터전송 문제로 코드를 확인할 결과로 axios에서 데이터를 넘겨주는 코드가 들어가있지 않았음으로 데이터 전송이 되지않던 부분을 확인. 라디오 체크 여부에 따른 레이아웃 보이기를 테스트 중이다.

2021.11.02 - 각 페이지의 로그인 상태가 아닐 시 로그인 alert가 뜨고 나서 로그인 페이지로 이동시켜주도록함. 결제창에서 라디오 상태라 따른 레이아웃을 변경할 때 체크된 value 값에 따라 레이아웃을 변경하는 것에서 조건을 달아줄 자바스크립트/제이쿼리가 필요함.

2021.11.03 - 제이쿼리 설치해서 사용하려다가 js로만 했음. 라디오버튼 체크의 따라 레이아웃이 변경되도록했으나 체크상태에서 다른 요소를 체크할 때 버튼을 두번눌러야 버튼이 체크로 되는 현상발생.

2021.11.05 - 라디오버튼이 두번 클릭해야 버튼이 바뀌는데 체크 여부는 바뀐거로 나온다. 이 프로젝트에서 라디오버튼을 만들면 모두 같은 현상이라서 프로젝트를 하나 더 만들어 테스트가 필요. 구글링하여도 같은 것을 찾을 수가 없다. checked true/false가 렌딩되면서 정해지지않아서 그런걸지도 모르겠음.
기능은 우선 제쳐두고 디자인만 빠르게 먼저 만들고 그 이후에 기능을 추가하는게 진행하는데 있어서 맞다.

2021.11.16 - 결제 페이지에서 기본배송지- 고객 주소를 표시해서 디자인하는 것까지 했음. 추가로 회원가입시 번호 입력할 때 자동하이폰를 추가하거나 결제페이지에서 번호 표기할 때 추가하거나 해야함.

2021.11.17 - 라디오버튼의 제이쿼리와 자바스크립트로 버튼 활성화를 해보고있는데 체크 활성화와 관계없이 인풋 오류 또는 설정으로 두번 눌러야 바뀌는 문제를 해결하지 못하고있음.

2021.11.18 - 라디오버튼 부분 , 배송지 CSS 수정하였고, 직접 입력 기능와 디자인은 추후에 완성예정. 주문상품 페이지 CSS 작성중.

2021.11.20 - css 수정 주문상품 구간 작성중. ul li 디자인 수정이 필요.

2021.11.24 - css 수정 주문상품 구간 작성중. 결제 구간 css 작성이 필요하고, 결제 후 db에 주문된 고객의 주문 정보 db에 저장해야하며 db 만들기.

2021.11.25 - 주문결제 페이지 css 임시완료했으며, 기능은 일시적 결제 후 홈화면으로 이동. item 페이지 장바구니 클릭 시 물품을 저장후 페이지 이동 여부 확인 추가. 장바구니 페이지 비로그인시 로그인 문구 뜨는 조건문 문제 해결안됨. 장바구니 물품 삭제 코드 수정 중.

2021.11.29 - 장바구니 코드에서 async await로 넣어주니 state에 저장하는 것에서 바로 저장출력을 할 수 있었고, db에서 index로 선언한 것은 delete문으로 삭제를 할 수 없어서 idx로 수정했음. 장바구니 페이지는 DB 구문에서 내림차순 정렬로 하여 게시물들을 내림차순으로 보이게했음.
게시물을 수정, 삭제하면 게시판 리스트가 표시 안되는 오류, db 리미트, 오프셋을 활용해서 게시판 정보를 모으는 방법도 있음.
게시판 read페이지에서 삭제, 수정 함수의 쿼리문구에 쿼리가 없음으로 페이지 출력을 못해 수정. fix페이지의 쿼리의 이동문구로 게시판 출력이 안되던 부분을 다중쿼리로 배열의 정보를 받아서 페이지 이동정보를 수정.
fix페이지에서 수정 후 read페이지의 출력에서 예) > =>> &gt 로 출력되는 문제가 있음.

2021.12.04 - 장바구니에서 생성된 물품마다 각각 생성 순서대로 번호가 부여되거나 지정되어있어야하며 체크 상태에 따라 삭제또는 결제 예정이 포함되어야함. 개별 삭제하는 것은 임시로 아이템 번호를 받아서 맞는 물품을 삭제하는 것.
체크박스는 상품마다 체크박스를 생성할 것이고, 물품 리스트 상단에 전체선택(개수)/선택삭제를 생성. 체크됨에 따라 선택한 개수와 선택된 물품들의 합을 표기.

2021.12.05 - 일단 전체선택 및 선택 삭제 버튼을 구간을 형성해야하나 map함수로 인해 수정해야한다. 체크박스마다 value 값을 각각 정해두고 내가 전체선택을 했을 시 모든 체크 인풋이 체크되고, 선택 삭제를 눌렀을 시 선택문구가 뜨고 삭제. 체크된 것들의 idx를 어떻게 가져오지

2021.12.06 - css를 완수하였고 체크박스 전체 선택 기능과 선택 삭제 선택한 체크들의 삭제 및 가격 합계와 개수합을 표시해야함. 페이지 구간마다 (장바구니 / 주문결제 / 주문완료) 페이지 액티브로 메소드 쿼리를 받아서 css 변환 필요.

2021.12.07 - 체크박스 전체선택과 전체 해제를 완성. 체크박스 true/false가 모두 되는 것을 확인. 체크된 개수기능 확인. 체크되는 것들을 고유 idx를 가져와야하는데 못함.

2021.12.08 - 단일 체크박스의 함수에서 체크 여부의 if문을 만들어서 체크판단에 따라 state에 배열로 저장하여 서버에 삭제요청하는 부분까지 완료. 2개 이상 삭제할 때 에러 발생. 추후 단일 삭제와 전체 선택에 따른 state 저장 문제까지 해결 필요. state에 저장된 값에 따른 각 가격의 합 필요.

2021.12.10 - 삭제할 때 에러 발생하는 부분을 수정 db 코드에 ';'를 추가하였지만 충돌 에러(서버 db코드에서 조건문 오류로 문제 발생/sql코드를 두번 삽입//or 대신 in으로 처리해볼 예정). each 함수의 다중 조회로 체크박스를 두번 클릭해야 기능함.

2021.12.11 - db 코드에서 in으로 수정한 후 충돌 에러 수정. 단일 삭제 함수 서버로 보낼 데이터 형식 수정. 전체선택을 하고 idx를 값을 받으려면 모두 받도록해야하는데 한번에 배열에 넣을 방법을 찾아야한다.

2021.12.12 - 단일 체크로 물품들의 합의 코드(state로 저장할 변수 생성 후 함수내에서 연산된 물품들의 값이 들어올 때마다 계산 후 state에 저장) 완료. 전체선택 함수에서 result 배열에서 for문으로 값을 특정하거나 map함수로 값을 가져와야하나 map에서는 값을 행으로 가져오기 때문에 고민.

2021.12.13 - 전체선택 함수의 idx, price 의 배열 함수를 만들고 배열에 push(), pop() 함수로 연속적으로 과다한 정보를 추가 또는 삭제해서 배열에 지정하고, 값의 합은 state에 저장. idx 배열을 담도록 수정. css의 float를 사용하면 position이 제대로 기능 하지않는 이유로 bottom 레이아웃과 맞지않아 삭제하여 겹쳐지는 현상 수정. 장바구니 결제페이지에 getMethod 쿼리를 달아서 페이지 상태에 따라서 결제 상태에 따라 구간 표시가 되도록 하고 링크를 추가해서 결제에서면 장바구니로만 이동할 수 있도록 수정필요.

2021.12.14 - 페이지 상태에 따른 css 변환 완료. 결제페이지에서 장바구니 페이지 링크 생성.

2021.12.15 - 헤로쿠 배포 문제는 fix js의 클래스명이 app 클래스명과 일치하지않았던 문제로 배포가 되지않았음.노드모듈을 삭제, 재설치하고 빌드를 재설치하면서 기존에 있던 모듈의 설치가 안됬던 건지 db 정보를 송신하지못했음 서버와 클라이언트가 연동이 안된 것 같다. 기존 파일을 덧씌워서 복구하기는 했으나 원인을 찾지못하고 해결한 것이 좋지않다. 예상되는 문제이나 좋지않은 현상이다.
