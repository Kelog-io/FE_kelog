
# Project "Kelog" :: VELOG CLONE CODING
## Introduction of Project
### What
- [velog](https://velog.io/) Clone Coding Project
- [배포 사이트](http://kelog-yoojinra.s3-website.ap-northeast-2.amazonaws.com/)

### When
- 2022.08.20 ~ 

### Who
- FE : 김주형, 나유진
- BE : 노우열, 김훈, 조원영

### How
- FE : ReactJS
- BE : Spring


### 주요 기능 구현
#### **FE**
- Infinite Scroll
- Login/SignUp
- Post CRUD
- Post Likes
- Comment CRUD
- Image Upload
- Image Resizing
- Dark&Light Modes
- Shared Url
- CloundFront & S3 배포

#### **BE**
- paging
- JWT-Token
- Git-Action
- POST CRUD
- COMMENT CRUD
- LIKE
- XSS Filter
- ExceptionHandler
- Spring Data JPA

-----

### 주요 기능 설명
#### **FE**
#### 1. Image Resizing
- `browser-image-compression` 패키지 사용한 이미지 용량 압축
  * 2021년 8월 패키지가 나온 이후로 (약 주 48,000회) 2022년 8월 현재(약 주 75,000회) : 사용량 계속적인 증가
  * 자바스크립트 기반으로 된 이미지 압축 라이브러리
  * 문서 간결, API 사용법 직관적
  * 계속적인 버전 릴리즈 업데이트
- 이미지 사이즈 줄임으로서 서버 부담 최소화 목적
- 네트워크 비용 효율화
- 데이터 로딩 속도 고려
- 실제 이미지 사이즈 줄인 사례
<img src="https://github.com/YooJinRa/FE_kelog/blob/posting/document/imageResizing.png" width="800" />

#### **BE**
#### 1. paging
- 사용 이유 : 프론트에서 요구하는 infinite scrolling 기능을 위해 사용함
- 기능 설명 : 설정한 한페이지에 들어갈 정보량과 원하는 페이지를 받을 수 있게 한다.
#### 2. JWT-Token
- 사용 이유 : 사용자의 인증과 인증상태 유지를 위해 사용하며, 토큰을 통해 사용자의 정보를 얻기위해 사용함
- 기능 설명 : 토큰을 통해 사용자의 인증상태를 확인하고, 토큰을 통해 현재 사용자의 정보를 확인한다.
#### 3. Git-Action
- 사용 이유 : 서버 실행 상태를 유지한 채, 서버의 변경사항을 적용하기 위해 사용한다.
- 기능 설명 : 깃허브에서 파일을 빌드하여, S3에 전송하고 그 파일을 CodeDeploy를 통하여 EC2 서버에 업로드하여 실행한다.

----

### Trouble Shooting
#### **FE**
- 문제 사항 - Redux 사용(댓글 수정, 추가, 삭제)하면서 filter, push 등의 함수를 사용하는데 NOT A Funciton 이라는 에러 발생(렌더링이 안일어남)
- 발생 이유 - 데이터를 전송받는 과정에서 데이터안에 데이터가 있어 경로 오류로 나타남
- 해결 방법 - 콘솔로그를 찍어보며 데이터 구조를 보고 경로를 다시 설정해서 해결

#### **BE** 
- 문제 사항 - 게시글을 삭제하는 과정에서 삭제가 안되는 오류가 나옴. 
- 발생 이유 - 게시글과 댓글의 연관관계가 댓글에서 게시글로 단방향 연관관계가 되있어서 발생한 문제
- 해결 방법 - 게시글에서 댓글에  @OneToMany와 mappedBy 어노테이션을 이용하여 연관관계를 맺어주어 해결함.

- 문제 사항 - @VALUE 어노테이션을 사용하는 도중 해당 변수에 NULL값이 들어오는 것을 확인함
- 발생 이유 - 다른 Bean이나 Component에서 TokenProvider를 new 로 생성하면서 Bean으로 관리되지않아 발생한 오류였다,
- 해결 방법 - 다른 부분에서 호출되는 부분에 @autowired를 선언하기에는 양이 많기에 TokenProvider 내에 Value 어노테이션을 사용하지않고 변수로 선언하여  new 생성자 부분에서 값을 받아오게함

- 문제 사항 - Gitaction 개발시  Error Gradle Script 오류가 발생.  
- 발생 이유 - Gradle 스크립트 /home/runner/work/*/gradlew 실행이 안되서 발생한 오류
- 해결 방법 - 권한 문제를 파악하여 파일 속성을 변경하여 실행가능한 권한을 부여하였습니다.

-----

### 프로젝트 진행하면서 느낀점
#### **FE**
##### 나유진
- 생각보다 배포가 늦어져서 백엔드와 서버 연결에 있어 에러 부분을 보완을 하는 것에 있어 급박하게 하느라 힘들었다.
- 실제 협업을 맞추면서 소통의 중요성을 느낄 수 있었다. 자주 자주 소통을 해서 기능 하나하나 완성하는 부분도 중요하다고 느낄 수 있었다.

##### 김주형
- 무한 스크롤 구현을 제한 시간 내에 완료하지 못해 아쉬웠다.
- 이번 주차에서 무한 스크롤을 구현하려고 시도했는데 2일을 허비했는데도 결과가 나오지 않았다.. 지금도 계속 구현 중인데 왜 안되는지 모르겠다. 이번 주차가 끝나더라도 계속해서 구현해 볼 생각이다.
- 유진님과 깃허브 머지를 하는 과정에서 수 많은 충돌이 났었다. 협업을 할때에는 작업을 하면 할수록 작업해야 할 양이 많을수록 머지를 자주자주 해줘야 한다는 것을 깨달았다.
- 로그인후 새로고침해도 데이터가 날아가는 문제가 있었는데 로컬 스토리지에 Access-token을 저장해두고 그 값을 읽어오는 것으로 해결했다.

#### **BE** 
- 테스트코드 작성을 한번 해보고 싶었으나 시간이 부족하여 작성하지 못하였다. 
- HTTPS도 연결해보고싶었으나 시간이 부족하여 하지 못했다.
- 이번에는 Access Token만 사용하였으나 다음 주에는 RefreshToken도 프론트와 협의하여 사용하여 보고싶다.


-----

### 기본 세팅
#### Style
- color
```
--bg-color: #F8F9FA;
--subBg-color: #ffffff;
--primary-color: #12B886;
--title-color: #212529;
--text-color: #495057;
--subText-color: #868E96;
--border-style: 1px solid #F1F3F5;
--subBorder-style: 1px solid #DEE2E6;
```

#### Packages
- 아이콘 적용 : yarn add react-icons
- 이미지 리사이징 : yarn add browser-image-compression
