커스텀 소품 쇼핑몰 시스템
===

##### 서비스 소개

<img src="readme_Img/메인화면.PNG" width="330px"></img>  <img src="readme_Img/상품카테고리.PNG" width="400px"></img>

본 프로젝트는 판매자가 기본적인 소품(의류,가방등)을 등록하면    
구매자가 해당 상품을 자신이 원하는 이미지나 그림을 그려 의류를 커스텀하는 쇼핑몰 서비스 입니다.

해당 서비스를 통해 구매자는 자신만의 유니크한 소품등을 쉽게 얻을 수 있다는 장점이 있습니다. 

##### 팀 소개
프론트엔드 - 2명
백엔드 - 1명

---

### 1. 시스템 구성도
* 프론트엔드의 경우 HTML, CSS, JS, jQuery를 사용
* 백엔드 서버의 경우 Node.js의 Express를 사용하여 개발
* 데이터베이스의 경우 AWS의 RDS를 사용

### 2.데이터베이스 설계


### 3. 기능 소개
* 회원
-구매자 회원가입   
-판매업체 회원가입  --> 회원가입 시 SHA512 함수와 salt를 사용해 암호화 후 저장   
-로그인, 로그아웃 

* 상품구매
-**fabric canvas**를 통한 의류 커스텀 기능(사진, 그림 추가 삭제 수정)   
-추가옵션 선택을 통한 커스텀 구매 기능   

* 구매자 마이페이지
-주문목록 확인   
-리뷰작성   
-개인정보 추가, 수정, 삭제 기능   

* 판매자 관리페이지
-주문정보 확인 및 변경 가능   
-제품 등록, 조회, 수정, 삭제 가능
