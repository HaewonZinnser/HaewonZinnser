window.WEDDING = {
  siteUrl: "https://haewonzinnser.github.io/",

  groom: {
    name: { ko: "정해원", en: "Haewon Jeong" },
    firstName: { ko: "해원", en: "Haewon" },
    relation: { ko: "아들", en: "son" },
    phone: "01040161044",
    father: { name: { ko: "정창현", en: "ChangHyeon Jeong" }, phone: "", deceased: false },
    mother: { name: { ko: "강경희", en: "KyungHee Kang" }, phone: "", deceased: false },
  },
  bride: {
    name: { ko: "박진서", en: "Zinnser Park" },
    firstName: { ko: "진서", en: "Zinnser" },
    relation: { ko: "딸", en: "daughter" },
    phone: "01045010646",
    father: { name: { ko: "박장환", en: "ChangHwan Park" }, phone: "", deceased: false },
    mother: { name: { ko: "민승희", en: "SeungHee Min" }, phone: "", deceased: false },
  },

  date: "2027-02-13T17:00:00+09:00",

  venue: {
    name: { ko: "더 컨벤션 신사", en: "The Convention Sinsa" },
    hall: { ko: "4층 그랜드볼룸", en: "4F Grand Ballroom" },
    address: { ko: "서울 강남구 강남대로 652", en: "652 Gangnam-daero, Gangnam-gu, Seoul" },
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

  coverImage: "images/cover.jpg",
  gallery: [
    "images/gallery/01.jpg",
    "images/gallery/02.jpg",
    "images/gallery/03.jpg",
    "images/gallery/04.jpg",
    "images/gallery/05.jpg",
    "images/gallery/06.jpg",
    "images/gallery/07.jpg",
    "images/gallery/08.jpg",
    "images/gallery/09.jpg",
    "images/gallery/10.jpg",
    "images/gallery/11.jpg",
    "images/gallery/12.jpg",
    "images/gallery/13.jpg",
    "images/gallery/14.jpg",
    "images/gallery/15.jpg",
    "images/gallery/16.jpg",
    "images/gallery/17.jpg",
    "images/gallery/18.jpg",
    "images/gallery/19.jpg",
    "images/gallery/20.jpg",
    "images/gallery/21.jpg",
  ],
  galleryPreviewCount: 9,

  metDate: "2014-06-30",

  accounts: {
    groom: [
      { role: { ko: "신랑", en: "Groom" }, name: "정해원", bank: "우리은행", number: "1002-844-710619", kakaopay: "" },
      { role: { ko: "신랑 아버지", en: "Groom's father" }, name: "정창현", bank: "하나은행", number: "278-811015-62307" },
      { role: { ko: "신랑 어머니", en: "Groom's mother" }, name: "강경희", bank: "국민은행", number: "440201-01-256272" },
    ],
    bride: [
      { role: { ko: "신부", en: "Bride" }, name: "박진서", bank: "우리은행", number: "1002-656-509284", kakaopay: "" },
      { role: { ko: "신부 아버지", en: "Bride's father" }, name: "박장환", bank: "신한은행", number: "110-408-827493" },
      { role: { ko: "신부 어머니", en: "Bride's mother" }, name: "민승희", bank: "우리은행", number: "121-08-027584" },
    ],
  },

  kakao: {
    jsKey: "7fa149a8783852aae3facb9934806705",
    shareImage: { src: "images/share.jpg", width: 940, height: 1253 },
  },

  bgm: "audio/bgm.mp3?v=202610252254",

  petals: true,
};
