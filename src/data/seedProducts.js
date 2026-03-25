const seedProducts = [
  {
    id: "1",
    name: "Trâm cài hoa Anh Túc đỏ",
    category: "Phụ kiện tóc",
    price: 195000,
    description: `Giữa muôn vàn loài hoa, anh túc mang trong mình vẻ đẹp mong manh nhưng rực cháy — như một lời nhắn nhủ rằng hãy sống thật trọn vẹn, thật rực rỡ dù chỉ là khoảnh khắc.

Mỗi cánh hoa được tạo hình thủ công tỉ mỉ, từng đường nét mỏng manh như cánh hoa thật đang e ấp dưới nắng sớm. Sắc đỏ tươi hoà cùng nhị đen huyền bí, tựa một bức tranh nhỏ bạn có thể mang theo bên mình.

Cài lên tóc, gắn trên áo hay đặt trang trí góc bàn — đâu đâu cũng là một nét thơ.

• Chất liệu: Resin cao cấp, kẹp kim loại mạ vàng
• Kích thước mỗi bông: ~4-5cm
• Bảo quản: Tránh nước và va đập mạnh`,
    stock: 18,
    featured: true,
    images: [
      "/products/poppy.jpg"
    ]
  },
  {
    id: "2",
    name: "Khuyên tai hoa Đào hồng",
    category: "Trang sức",
    price: 165000,
    description: `Mỗi mùa xuân, hoa đào lại nở — nhẹ nhàng, dịu dàng, như lời chúc bình an gửi trao.

Đôi khuyên tai này được nặn tay từ đất sét polymer, từng cánh hoa mỏng tang, trong suốt với ánh hồng phấn lung linh dưới ánh sáng. Nhị hoa nhỏ xinh mạ vàng 18K, móc tai uốn cong thanh mảnh — vừa đủ nữ tính, vừa đủ sang trọng.

Mang trên tai, bạn không chỉ đeo một món trang sức — bạn mang theo cả một mùa xuân.

• Chất liệu: Đất sét polymer Nhật, móc tai mạ vàng 18K
• Kích thước bông hoa: ~2cm
• Trọng lượng: Siêu nhẹ, thoải mái đeo cả ngày
• Phù hợp: Dạo phố, hẹn hò, chụp ảnh`,
    stock: 24,
    featured: true,
    images: [
      "/products/sakura-earrings.jpg"
    ]
  },
  {
    id: "3",
    name: "Tiểu cảnh Lan Hồ Điệp trong lồng kính",
    category: "Quà tặng",
    price: 450000,
    description: `Có những vẻ đẹp không cần phô trương mà vẫn khiến người ta ngoái nhìn. Lan Hồ Điệp trắng tinh khôi trong lồng kính thuỷ tinh — thanh lịch, bình yên, như một khoảng lặng giữa cuộc sống xô bồ.

Mỗi bông lan được tạo hình thủ công, cánh hoa trắng muốt toả ra sự thuần khiết, đặt trên lớp rêu xanh tự nhiên trong chậu gỗ sồi nhỏ xinh. Lồng kính trong suốt bảo vệ vẻ đẹp ấy mãi không phai.

Đây không chỉ là một món quà — đây là một lời nhắn "Anh/em luôn trân trọng những điều đẹp đẽ, giống như trân trọng bạn."

• Chất liệu: Hoa đất sét polymer, rêu bảo quản, dome kính, đế gỗ sồi
• Kích thước: Cao ~18cm, đường kính ~10cm
• Không cần tưới nước, bền đẹp theo thời gian
• Phù hợp: Quà sinh nhật, quà tặng người yêu, trang trí bàn làm việc`,
    stock: 8,
    featured: true,
    images: [
      "/products/orchid-dome-1.jpg",
      "/products/orchid-dome-2.jpg"
    ]
  },
  {
    id: "4",
    name: "Hoa thép nghệ thuật — Bông Thược Dược",
    category: "Khác",
    price: 520000,
    description: `Nếu hoa tươi là vẻ đẹp của khoảnh khắc, thì hoa thép là vẻ đẹp của vĩnh cửu.

Bông Thược Dược được rèn và uốn thủ công từ thép không gỉ, mỗi cánh hoa mang dấu vân tay của người nghệ nhân. Ánh bạc lạnh lùng nhưng đường nét lại mềm mại, uyển chuyển — sự kết hợp bất ngờ giữa mạnh mẽ và dịu dàng, giữa công nghiệp và nghệ thuật.

Đặt trên kệ sách, bàn làm việc hay bệ cửa sổ, bông hoa thép sẽ là tâm điểm của mọi ánh nhìn, là câu chuyện mà khách đến chơi nhà sẽ hỏi.

• Chất liệu: Thép không gỉ, rèn và uốn thủ công
• Kích thước: ~20cm đường kính
• Bền vĩnh viễn, không phai màu
• Mỗi bông là duy nhất — không có hai bông giống hệt nhau`,
    stock: 5,
    featured: true,
    images: [
      "/products/metal-flower-1.jpg",
      "/products/metal-flower-2.jpg"
    ]
  },
  {
    id: "5",
    name: "Khuyên tai chùm hoa Linh Lan",
    category: "Trang sức",
    price: 185000,
    description: `Trong ngôn ngữ của hoa, Linh Lan tượng trưng cho sự trở lại của hạnh phúc. Nhỏ bé, khiêm nhường nhưng toả hương thơm dịu nhẹ — giống như những niềm vui bình dị ta thường bỏ quên.

Đôi khuyên tai chùm Linh Lan được nặn tay từng bông hoa nhỏ xinh, cánh trắng tinh khôi rủ xuống nhẹ nhàng bên chiếc lá xanh non. Giọt sương pha lê trong suốt lấp lánh ở đầu chùm hoa, như vừa mới hứng sương mai.

Đeo lên, bạn sẽ nghe thấy tiếng chuông nhỏ của mùa xuân đang reo.

• Chất liệu: Đất sét polymer, móc tai thép không gỉ, giọt pha lê
• Kích thước chùm hoa: ~3.5cm
• Trọng lượng: Rất nhẹ, không gây đau tai
• Phù hợp: Đi học, đi làm, dạo phố, chụp ảnh vintage`,
    stock: 20,
    featured: true,
    images: [
      "/products/lily-earrings.jpg"
    ]
  },
  {
    id: "6",
    name: "Khuyên tai hoa Diên Vĩ tím",
    category: "Trang sức",
    price: 175000,
    description: `Diên Vĩ (Iris) — loài hoa mang tên nữ thần cầu vồng trong thần thoại Hy Lạp, tượng trưng cho trí tuệ, niềm tin và sự ngưỡng mộ.

Đôi khuyên tai được tạo hình tỉ mỉ với cánh hoa gradient từ tím lavender sang vàng mật ong, mềm mại tựa cánh bướm đang dừng chân. Giọt pha lê aurora borealis lấp lánh ở cuối mỗi bông — đổi màu theo ánh sáng, mỗi góc nhìn mỗi khác, giống như chính bạn: luôn có điều thú vị chờ được khám phá.

• Chất liệu: Đất sét polymer cao cấp, móc tai mạ vàng 18K, đá pha lê AB
• Kích thước bông hoa: ~2.5cm
• Tone màu: Tím lavender — vàng mật ong
• Phù hợp: Sự kiện, tiệc tối, hẹn hò, làm quà tặng`,
    stock: 16,
    featured: true,
    images: [
      "/products/iris-earrings.jpg"
    ]
  },
  {
    id: "7",
    name: "Thiệp Cỏ Bốn Lá may mắn",
    category: "Quà tặng",
    price: 85000,
    description: `Người ta nói, tìm được một chiếc cỏ bốn lá giữa đồng cỏ rộng lớn là điều vô cùng hiếm hoi — cũng hiếm như gặp được đúng người, đúng thời điểm.

Mỗi chiếc thiệp nhỏ mang trên mình một bông cỏ bốn lá được làm từ resin xanh trong suốt, đặt trên nền giấy kraft với hoạ tiết hoa cỏ nhẹ nhàng. Dưới ánh nắng, cỏ bốn lá lấp lánh như đang giữ trọn một lời nguyện ước.

Gửi kèm một câu viết tay, đây sẽ là món quà nhỏ mà ai nhận được cũng phải mỉm cười — "Chúc bạn luôn may mắn, như tìm được cỏ bốn lá giữa ngày bình thường."

• Chất liệu: Giấy kraft 300gsm, cỏ bốn lá resin
• Kích thước thiệp: 8 x 10cm
• Đóng gói: Bọc cellophane trong suốt, sẵn sàng tặng
• Phù hợp: Kèm quà sinh nhật, lời cảm ơn, bookmark sách`,
    stock: 50,
    featured: false,
    images: [
      "/products/clover-cards.jpg"
    ]
  }
];

export default seedProducts;
