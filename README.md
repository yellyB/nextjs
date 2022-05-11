## next.js 공부용 프로젝트
(개발 중)
<br/><br/>


## 폴더구조
components  
 &nbsp;ㄴauth  
 &nbsp;ㄴcommon  
data  
hooks  
lib  
 &nbsp;ㄴapi  
 &nbsp;ㄴdata  
pages  
 &nbsp;ㄴapi  
  &nbsp;&nbsp;ㄴauth  
public  
 &nbsp;ㄴstatic  
  &nbsp;&nbsp;ㄴimage  
  &nbsp;&nbsp;ㄴsvg  
styles  
types  
  
## NOTE
[헤더]
우측에 버튼 - 로그인 여부에 따라 다른 컴포넌트 렌더링: 1. 회원가입/로그인   or   2. 유저메뉴버튼


회원가입&로그인 과정: 컴포넌트의 버튼 클릭 -> lib/api 경로에 있는 파일에서 http요청 보내기 -> pages/api 의 경로에서 요청 처리 후 응답 보냄


인풋, 셀렉터, 버튼 사용 시 공통된 디자인과 기능 사용하기 위해 공통 컴포넌트로 관리
모달 - 커스텀 훅으로 portal을 사용해 관리



스토어
auth: 회원가입/로그인 모달 둘 중 어떤 모달 띄워줄지
common: 유효성 검사가 통과/불통 여부
user: 유저 정보(로그인 비로그인 여부도)


최적화
- 인풋 등 공통 컴포넌트 memo사용
- 변하지 않는 값은 외부에서 관리하여 리렌더링 방지
- 컴포넌트 분리로 불필요하게 전체 리렌더링 방지

