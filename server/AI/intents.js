const intents = {

  // ================= GREETING =================
  greeting: {

    keywords: [
      "chào",
      "hello",
      "hi",
      "alo",
      "hey",
      "xin chào",
      "yo",
      "good morning",
      "good evening"
    ],

    responses: [
      "Xin chào! Tôi có thể giúp gì?",
      "Chào bạn!",
      "👋 Rất vui được hỗ trợ bạn."
    ]
  },


  // ================= PRICE =================
  price: {

    keywords: [
      "giá",
      "bao nhiêu",
      "bao nhiêu tiền",
      "price",
      "cost",
      "chi phí",
      "đắt không",
      "rẻ không",
      "mắc không",
      "giá phòng",
      "1 đêm bao nhiêu",
      "ở bao nhiêu tiền"
    ],

    responses: [
      "💰 Giá từ 500k/đêm.",
      "💰 Khoảng 500k - 1tr.",
      "💰 Tùy loại phòng sẽ có giá khác nhau."
    ]
  },


  // ================= FACILITY =================
  facility: {

    keywords: [
      "wifi",
      "hồ bơi",
      "pool",
      "gym",
      "spa",
      "massage",
      "buffet",
      "ăn sáng",
      "breakfast",
      "nhà hàng",
      "restaurant",
      "bar",
      "coffee",
      "cafe"
    ],

    responses: [
      "🏊 Có wifi miễn phí, hồ bơi, gym và buffet sáng.",
      "🍽 Khách sạn có đầy đủ tiện nghi cao cấp."
    ]
  },


  // ================= LOCATION =================
  location: {

    keywords: [
      "ở đâu",
      "địa điểm",
      "địa chỉ",
      "khu vực",
      "location",
      "map",
      "google map",
      "gần biển",
      "gần trung tâm",
      "near beach",
      "near center",
      "vị trí",
      "nằm ở đâu"
    ],

    responses: [
      "📍 Khách sạn nằm ở trung tâm thành phố.",
      "📍 Chúng tôi có nhiều chi nhánh, bạn muốn ở đâu?",
      "📍 Khách sạn gần biển và khu vui chơi."
    ]
  },


  // ================= VIEW =================
  view: {

    keywords: [
      "view",
      "view biển",
      "sea view",
      "view đẹp",
      "hướng biển",
      "view thành phố",
      "city view",
      "ban công",
      "balcony",
      "view núi",
      "mountain view"
    ],

    responses: [
      "🌅 Có phòng view biển và view thành phố.",
      "🌄 Một số phòng có balcony riêng."
    ]
  },


  // ================= SMOKING =================
  smoking: {

    keywords: [
      "hút thuốc",
      "smoking",
      "smoke",
      "phòng hút thuốc",
      "được hút thuốc không",
      "có cho hút thuốc không",
      "smoking room",
      "no smoking"
    ],

    responses: [
      "🚭 Khách sạn có khu vực hút thuốc riêng.",
      "🚭 Một số phòng không cho hút thuốc."
    ]
  },


  // ================= ROOM =================
  room: {

    keywords: [
      "phòng",
      "room",
      "còn phòng không",
      "phòng vip",
      "deluxe",
      "suite",
      "standard",
      "vip room",
      "family room",
      "còn phòng",
      "phòng trống"
    ],

    responses: [
      "🏨 Hiện có Standard, Deluxe và VIP.",
      "🏨 Chúng tôi còn nhiều loại phòng."
    ]
  },


  // ================= CHECKIN =================
  checkin: {

    keywords: [
      "check in",
      "checkin",
      "nhận phòng",
      "giờ nhận phòng",
      "vào ở"
    ],

    responses: [
      "⏰ Check-in từ 14:00."
    ]
  },


  // ================= CHECKOUT =================
  checkout: {

    keywords: [
      "check out",
      "checkout",
      "trả phòng",
      "giờ trả phòng",
      "ra về"
    ],

    responses: [
      "⏰ Check-out trước 12:00."
    ]
  },


  // ================= PAYMENT =================
  payment: {

    keywords: [
      "thanh toán",
      "trả tiền",
      "payment",
      "visa",
      "mastercard",
      "momo",
      "banking",
      "chuyển khoản",
      "quét qr"
    ],

    responses: [
      "💳 Thanh toán bằng tiền mặt hoặc thẻ.",
      "💳 Chúng tôi hỗ trợ Momo và chuyển khoản."
    ]
  },


  // ================= BOOKING =================
  booking: {

    keywords: [
      "đặt phòng",
      "book",
      "booking",
      "reserve",
      "thuê phòng",
      "đặt hotel",
      "book room",
      "đặt chỗ"
    ],

    responses: [
      "📅 Bạn muốn check-in ngày nào?",
      "📅 Bạn muốn đặt phòng loại nào?"
    ]
  },


  // ================= PROMOTION =================
  promotion: {

    keywords: [
      "ưu đãi",
      "khuyến mãi",
      "sale",
      "discount",
      "voucher",
      "promo",
      "promotion",
      "deal",
      "coupon",
      "giảm giá"
    ],

    responses: [
      "🎁 Hiện đang giảm 20% cho khách đặt sớm.",
      "🎁 Có voucher cuối tuần."
    ]
  },


  // ================= TRANSPORT =================
  transport: {

    keywords: [
      "đưa đón sân bay",
      "airport shuttle",
      "shuttle",
      "taxi",
      "thuê xe",
      "car rental",
      "pickup airport"
    ],

    responses: [
      "🚗 Có dịch vụ đưa đón sân bay."
    ]
  },


  // ================= PARKING =================
  parking: {

    keywords: [
      "bãi đỗ xe",
      "parking",
      "garage",
      "đậu xe",
      "gửi xe",
      "free parking"
    ],

    responses: [
      "🅿 Có bãi đỗ xe miễn phí."
    ]
  },


  // ================= PET =================
  pet: {

    keywords: [
      "thú cưng",
      "pet",
      "pet friendly",
      "mang chó",
      "mang mèo",
      "cho phép thú cưng"
    ],

    responses: [
      "🐶 Khách sạn cho phép mang thú cưng."
    ]
  },


  // ================= FALLBACK =================
  fallback: {

    responses: [
      "Tôi chưa hiểu.",
      "Bạn có thể nói rõ hơn không?",
      "🤖 Tôi sẽ chuyển bạn sang nhân viên hỗ trợ."
    ]
  }

};

export default intents;