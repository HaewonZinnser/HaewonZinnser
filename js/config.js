/**
 * 청첩장 데이터 설정 파일
 * 이 파일만 수정하면 청첩장 내용이 바뀝니다.
 * 한국어/영어가 다른 항목은 { ko: "...", en: "..." } 형태로 적습니다.
 * (카카오톡 미리보기 문구/이미지는 index.html 상단 <meta> 태그도 함께 수정하세요)
 * TODO 표시가 있는 곳은 실제 정보로 바꿔 주세요.
 */
window.WEDDING = {
  // 배포 URL (공유 기능에 사용) — TODO: 배포 후 실제 주소로 변경
  siteUrl: "https://haewonzinnser.github.io/",

  groom: {
    name: { ko: "정해원", en: "Haewon Jeong" },
    firstName: { ko: "해원", en: "Haewon" },
    relation: { ko: "아들", en: "son" },
    phone: "01040161044", // TODO: 비워두면 연락하기 목록에서 빠집니다
    father: { name: { ko: "정창현", en: "ChangHyeon Jeong" }, phone: "", deceased: false }, // TODO
    mother: { name: { ko: "강경희", en: "KyungHee Kang" }, phone: "", deceased: false }, // TODO
  },
  bride: {
    name: { ko: "박진서", en: "Zinnser Park" },
    firstName: { ko: "진서", en: "Zinnser" },
    relation: { ko: "딸", en: "daughter" },
    phone: "01045010646",
    father: { name: { ko: "박장환", en: "JangHwan Park" }, phone: "", deceased: false }, // TODO
    mother: { name: { ko: "민승희", en: "SeungHee Min" }, phone: "", deceased: false }, // TODO
  },

  // 예식 일시 (24시간제, 한국 시간) — TODO: 예식 시간 확인
  date: "2027-02-13T17:00:00+09:00",

  venue: {
    name: { ko: "더 컨벤션 신사", en: "The Convention Sinsa" },
    hall: { ko: "", en: "" }, // TODO: 홀 이름 (예: "3층 그랜드볼룸")
    address: { ko: "서울 강남구 강남대로 652", en: "652 Gangnam-daero, Gangnam-gu, Seoul" },
    // 길찾기 앱에 넘기는 주소(한국 지도 앱은 한글 주소가 정확합니다)
    searchAddress: "서울 강남구 강남대로 652",
    tel: "",
    lat: 37.5197,
    lng: 127.0191,
    transport: [
      {
        title: { ko: "지하철", en: "Subway" },
        lines: [{ ko: "3호선 신사역 6번 출구 (도보 5분)", en: "Line 3, Sinsa Station Exit 6 (5 min walk)" }],
      },
      {
        title: { ko: "버스", en: "Bus" },
        lines: [
          "240, 4312, 9404, 6009, 145, 148, 441, 542, 4212, 3030",
          { ko: "강남 08, 서초 03", en: "Gangnam 08, Seocho 03" },
        ],
      },
      {
        title: { ko: "자가용", en: "Car" },
        lines: [
          { ko: "내비게이션 신주소: 서울 강남구 강남대로 652", en: "Navigation (road): 서울 강남구 강남대로 652" },
          { ko: "내비게이션 구주소: 서울 강남구 신사동 504-11", en: "Navigation (lot): 서울 강남구 신사동 504-11" },
        ],
      },
    ],
  },

  greeting: {
    title: { ko: "소중한 분들을 초대합니다", en: "You're Invited" },
    message: {
      ko: "서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며\n걸어갈 수 있는 큰 사랑으로 키우고자 합니다.\n\n저희 두 사람이 사랑의 이름으로\n지켜나갈 수 있게 앞날을\n축복해 주시면 감사하겠습니다.",
      en: "The love we have built facing each other\nwill now grow into a greater love\nas we walk side by side, looking the same way.\n\nWe would be honored\nto have you with us\nas we begin our life together.",
    },
  },

  // 대표 사진 & 갤러리 — images 폴더의 X 박스 이미지를 실제 사진(jpg)으로 바꾸고 경로를 맞추세요
  coverImage: "images/cover.svg",
  gallery: [
    "images/gallery/01.svg",
    "images/gallery/02.svg",
    "images/gallery/03.svg",
    "images/gallery/04.svg",
    "images/gallery/05.svg",
    "images/gallery/06.svg",
    "images/gallery/07.svg",
    "images/gallery/08.svg",
    "images/gallery/09.svg",
  ],
  galleryPreviewCount: 9,

  // 마음 전하실 곳 — TODO: 은행/계좌번호 입력, 필요 없는 줄은 삭제
  accounts: {
    groom: [
      { role: { ko: "신랑", en: "Groom" }, name: "정해원", bank: "우리은행", number: "1002-844-710619", kakaopay: "" },
      { role: { ko: "신랑 아버지", en: "Groom's father" }, name: "○○○", bank: "○○은행", number: "000-0000-0000" },
      { role: { ko: "신랑 어머니", en: "Groom's mother" }, name: "○○○", bank: "○○은행", number: "000-0000-0000" },
    ],
    bride: [
      { role: { ko: "신부", en: "Bride" }, name: "박진서", bank: "우리은행", number: "1002-948-442489", kakaopay: "" },
      { role: { ko: "신부 아버지", en: "Bride's father" }, name: "○○○", bank: "○○은행", number: "000-0000-0000" },
      { role: { ko: "신부 어머니", en: "Bride's mother" }, name: "○○○", bank: "○○은행", number: "000-0000-0000" },
    ],
  },

  // 카카오톡 공유: https://developers.kakao.com 에서 앱 생성 후 JavaScript 키 입력
  // (플랫폼 > Web 에 배포 도메인 등록 필요). 비워두면 버튼이 링크 공유로 동작합니다.
  kakao: {
    jsKey: "",
    shareImage: "images/og.jpg",
  },

  // 배경음악 (예: "audio/bgm.mp3"). 비워두면 버튼이 표시되지 않습니다.
  bgm: "",

  // 벚꽃잎 효과
  petals: true,
};
