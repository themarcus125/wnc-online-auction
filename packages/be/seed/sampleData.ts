import { CategorySeed, ProductSeed, UserSeed, BidSeed } from '@/db/seed.t';
import { UserRole } from '@/user/user.schema';
import { getHashedPassword } from '@/utils/password';

const password = '123456';
const hashedPassword = getHashedPassword(password);

export const userSeeds: UserSeed[] = [
  {
    email: 'super@admin.com',
    name: 'superadmin',
    address: 'superadmin',
    password: hashedPassword,
    role: UserRole.SUPPER_ADMIN,
    isVerified: true,
  },
  {
    email: 'seller1@sample.com',
    name: 'seller1',
    address: '123 nguyễn văn cừ p4 q5',
    password: hashedPassword,
    role: UserRole.SELLER,
    isVerified: true,
  },
  {
    email: 'seller2@sample.com',
    name: 'seller2',
    address: '234 nguyễn văn cừ p4 q5',
    password: hashedPassword,
    role: UserRole.SELLER,
    isVerified: true,
  },
  {
    email: 'seller3@sample.com',
    name: 'seller3',
    address: '123 nguyễn văn cừ p4 q5',
    password: hashedPassword,
    role: UserRole.SELLER,
    isVerified: true,
  },
  {
    email: 'bidder1@sample.com',
    name: 'bidder1',
    address: '235 nguyễn văn cừ p4 q5',
    password: hashedPassword,
    role: UserRole.BIDDER,
    isVerified: true,
  },
  {
    email: 'bidder2@sample.com',
    name: 'bidder2',
    address: '246 nguyễn văn cừ p4 q5',
    password: hashedPassword,
    role: UserRole.BIDDER,
    isVerified: false,
  },
  {
    email: 'bidder3@sample.com',
    name: 'bidder3',
    address: '246 nguyễn văn cừ p4 q5',
    password: hashedPassword,
    role: UserRole.BIDDER,
    isVerified: false,
  },
  {
    email: 'bidder4@sample.com',
    name: 'bidder4',
    address: '246 nguyễn văn cừ p4 q5',
    password: hashedPassword,
    role: UserRole.BIDDER,
    isVerified: false,
  },
];

export const parentCategorySeeds: CategorySeed[] = [
  {
    name: 'Đồ điện tử',
  },
  {
    name: 'Thời trang',
  },
  {
    name: 'Thể thao',
  },
  {
    name: 'Đồ chơi trẻ em',
  },
  {
    name: 'Nhạc cụ',
  },
];

export const childCategorySeeds: CategorySeed[] = [
  {
    name: 'Máy tính & Máy tính bảng',
    index: 0,
  },
  {
    name: 'Máy ảnh',
    index: 0,
  },
  {
    name: 'TV, âm thanh',
    index: 0,
  },
  {
    name: 'Điện thoại & phụ kiện',
    index: 0,
  },
  {
    name: 'Nam',
    index: 1,
  },
  {
    name: 'Nữ',
    index: 1,
  },
  {
    name: 'Giày',
    index: 1,
  },
  {
    name: 'Fitness',
    index: 2,
  },
  {
    name: 'Golf',
    index: 2,
  },
  {
    name: 'Thú nhồi bông',
    index: 3,
  },
  {
    name: 'Nhân vật hành động',
    index: 3,
  },
  {
    name: 'Guitar',
    index: 4,
  },
  {
    name: 'Dây đàn',
    index: 4,
  },
  {
    name: 'Dụng cụ âm thanh',
    index: 4,
  },
];

export const expiredProductSeeds: ProductSeed[] = [
  {
    name: 'Asus Strix Geforce GTX 1080 oc 8GB Gaming Nvidia GPU',
    descriptions: ['<div><p>Asus Strix Geforce GTX 1080 oc 8GB Gaming Nvidia GPU.</p><br /><p>Selling my GPU as I&rsquo;ve upgraded, the gpu is in full working order and has only been used for gaming ( No mining). The card has been cleaned and has lived in a well ventilated case.</p></div>'],
    category: 0,
    images: [
      'public/images/uploads/asus_1080_1.jpg',
      'public/images/uploads/asus_1080_2.jpg',
      'public/images/uploads/asus_1080_3.jpg',
      'public/images/uploads/asus_1080_4.jpg',
    ],
    seller: 1,
    startPrice: 5000000,
    currentPrice: 5000000,
    stepPrice: 200000,
    expiredAt: new Date(Date.now() + 1000),
  },
]

export const productSeeds: ProductSeed[] = [
  // Category 0
  // Product 0
  {
    name: 'SSD ADATA Ultimate Series: SU630 240GB SATA III',
    descriptions: [
      "<p>With the SU630, we introduce a new level of speed and reliability for internal drives in both Laptop's and Desktop PC's. Integrating 3D Flash NAND Memory into a 2.5-inch drive which rids the need for pesky mechanical moving parts, allowing for silent but lightning-quick performance. Depending on your storage needs, the SU630 can contain up to 960GB worth of information and has an endurance of over 200TBW, this means you can write over 200TB worth of information on this drive before experiencing issues.</p><p>To provide the speed and endurance this drive provides, ADATA has packed this drive with:</p><ul><li>3D QLC NAND for performance and durability</li><li>Dynamic SLC Caching for single cell operations and producing quicker boot times and significantly faster file transfers</li><li>200TBW Endurance, giving you the ability to write and delete up to 200 Terabytes worth of information on the drive.</li><li>SSD Toolbox allowing you to monitor your drives status and also keep tabs on our drives lifespan.</li><li>Migration Utility to move over your data from your old drive to the SU650.</li><li>3 Year Limited Warranty</li></ul>",
    ],
    category: 0,
    images: [
      'public/images/uploads/su630_1.jpg',
      'public/images/uploads/su630_2.jpg',
      'public/images/uploads/su630_3.jpg',
      'public/images/uploads/su630_4.jpg',
      'public/images/uploads/su630_5.jpg',
    ],
    seller: 1,
    startPrice: 100000,
    currentPrice: 100000,
    stepPrice: 30000,
    expiredAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
  },
  // Product 1
  {
    name: 'MSI B250M G1 GAMER For Intel 6th/7th Core i7/i5/i3 Pentium/Celeron LGA-1151',
    descriptions: [
      `<div id="pastingspan1">Motherboard details:</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">Processor:</div><div>&nbsp;</div><div>&bull; Supports 6th Gen/ 7th Gen Intel&reg; Core&trade; i3/i5/i7 processors, and Intel&reg; Pentium&reg; and Celeron&reg; processors with pin LGA1151</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">Chipset:</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">&bull; Intel&reg; B250 chipset</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">RAM:</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">&bull; 2 DDR4 memory slots, up to 32GB total capacity</div><div id="pastingspan1">-7th generation processors support DDR4 2400/ 2133 MHz*</div><div id="pastingspan1">-6th generation processors support DDR4 2133 MHz*</div><div id="pastingspan1">&bull; Dual channel memory architecture</div><div id="pastingspan1">&bull; Support non-ECC, un-buffered memory</div><div id="pastingspan1">&bull; Support Intel&reg; Extreme Memory Profile (XMP)</div><div id="pastingspan1">* For memory update information, please visit http://www.msi.com</div><div id="pastingspan1">** In XMP mode, DDR4 memory modules can only run up to 2400 MHz on 7th generation processors, and can only run up to 2133MHz on 6th generation processors</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">Expansion slot:</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">&bull; 1 PCIe 3.0 x16 slot</div><div id="pastingspan1">&bull; 2 PCIe 3.0 x1 slots</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">Onboard graphics card:</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">&bull; 1 DVI-D interface, supporting the highest resolution 1920x1200@60Hz</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">storage:</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">&bull; Intel&reg; B250 chipset</div><div id="pastingspan1">&bull; 6 SATA 6Gb/s ports</div><div id="pastingspan1">&bull; 1 M.2 slot (M key)*</div><div id="pastingspan1">-Supports up to PCIe 3.0 x4 and SATA 6Gb/s</div><div id="pastingspan1">-Slot supports 2242/ 2260/ 2280 storage devices</div><div id="pastingspan1">-Intel&reg; Optane&trade; Memory Ready</div><div id="pastingspan1">-Support PCIe 3.0 x4 NVMe U.2 SSD through Turbo U.2 main control card**</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">* When an M.2 SATA SSD module is installed in the M.2 slot, the SATA2 interface will be invalid</div><div id="pastingspan1">** The Turbo U.2 main control card is not included in the product package and needs to be purchased separately</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">USB:</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">&bull; Intel&reg; B250 chipset</div><div id="pastingspan1">-6 USB 3.0 Gen1 (SuperSpeed USB) ports (4 ports are located on the back panel, 2 ports are provided via onboard USB ports)</div><div id="pastingspan1">-6 USB 2.0 (High-speed USB) ports (2 ports are located on the back panel, 4 ports are provided through the onboard USB ports)</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">Sound effects:</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">&bull; Realtek&reg; ALC887 decoder chip</div><div id="pastingspan1">-7.1 channel high-quality sound</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">The internet :</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">&bull; 1 x Realtek&reg; RTL8111H Gigabit network card</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">Built-in output/input interface:</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">-1 x 24-pin ATX main power connector</div><div id="pastingspan1">-1 8-pin ATX 12V power connector</div><div id="pastingspan1">-6 SATA 6Gb/s ports</div><div id="pastingspan1">-2 USB 2.0 ports (support additional 4 USB 2.0 ports)</div><div id="pastingspan1">-1 USB 3.1 Gen1 port (supports additional 2 USB 3.1 Gen1 ports)</div><div id="pastingspan1">-1 x 4-pin CPU fan connector</div><div id="pastingspan1">-1 x 4-pin system fan connector</div><div id="pastingspan1">-1 panel audio interface</div><div id="pastingspan1">-2 system panel interfaces</div><div id="pastingspan1">-1 chassis opening interface</div><div id="pastingspan1">-1 serial interface</div><div id="pastingspan1">-1 jumper for clearing CMOS function</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">Rear output/input interface on the back panel:</div><div id="pastingspan1">&nbsp;</div><div id="pastingspan1">-1 PS/2 mouse/keyboard port</div><div id="pastingspan1">-2 USB 2.0 ports</div><div id="pastingspan1">-1 DVI-D port</div><div id="pastingspan1">-1 LAN (RJ45) port</div><div id="pastingspan1">-4 USB 3.1 Gen1 ports</div><div id="pastingspan1">-3 audio ports</div>`,
    ],
    category: 0,
    images: [
      'public/images/uploads/msi_b250m_1.jpg',
      'public/images/uploads/msi_b250m_2.jpg',
      'public/images/uploads/msi_b250m_3.jpg',
      'public/images/uploads/msi_b250m_4.jpg',
    ],
    seller: 2,
    startPrice: 1500000,
    currentPrice: 1500000,
    stepPrice: 20000,
    expiredAt: new Date(Date.now() + 60 * 24 * 3600 * 1000),
  },
  // Product 2
  {
    name: 'Dell Ultrasharp U2412M 24 inch Widescreen IPS LED Monitor FHD 1920x1200 USB HUB',
    descriptions: [
      `<p><strong>Dell UltraSharp U2412M Black IPS Panel 24" 1920 X 1200 Resolution LED Backlight Widescreen LCD Monitor with USB Hubs</strong></p><p>Enjoy widescreen performance, any way you want it. With a 24" 16:10 panel, IPS technology and LED backlight, the U2412M provides a brilliant view plus amazing adjustability to suit any style.</p><ul class="decimal_type">&nbsp; &nbsp;<li><strong>Resolution:</strong>&nbsp;1920 x 1200</li>&nbsp; &nbsp;<li><strong>Display Type:</strong>&nbsp;LED Backlit</li>&nbsp; &nbsp;<li><strong>Maximum Refresh Rate:</strong>&nbsp;60 Hz</li>&nbsp; &nbsp;<li><strong>Built-in Devices:</strong>&nbsp;USB 2.0 Hub</li>&nbsp; &nbsp;<li><strong>Display Position Adjustments:</strong>&nbsp;Height, Pivot, Swivel, Tilt</li>&nbsp; &nbsp;<li><strong>HD Format:</strong>&nbsp;1080p</li>&nbsp; &nbsp;<li><strong>Panel Type:</strong>&nbsp;IPS</li>&nbsp; &nbsp;<li><strong>Ports:</strong>&nbsp;1x DVI-D port, 1x Display port, 1x VGA port, 1x USB 2.0 upstream port, 4x USB downstream ports</li></ul>`,
    ],
    category: 0,
    images: [
      'public/images/uploads/dell_u2412m_1.jpg',
      'public/images/uploads/dell_u2412m_2.jpg',
      'public/images/uploads/dell_u2412m_3.jpg',
      'public/images/uploads/dell_u2412m_4.jpg',
      'public/images/uploads/dell_u2412m_5.jpg',
    ],
    seller: 1,
    startPrice: 2000000,
    currentPrice: 2000000,
    stepPrice: 100000,
    onlyRatedBidder: true,
    expiredAt: new Date(Date.now() + 20 * 24 * 3600 * 1000),
  },
  // Product 3
  {
    name: 'BenQ XL 24" eSports Computer Monitor - 144hz - XL2411K-B 1920x1080',
    descriptions: [
      `<p dir="ltr">BenQ XL 24" Computer Monitor - 144hz - XL2411K-B 1920x1080 - Ships ASAP.</p><p dir="ltr">I received this item as an open box.</p><p dir="ltr">I turned on to check the quality of screen. Everything is perfect: no scratches and no dead pixels. The box is in poor condition with labels cut out and tape around the edges, as shown in photos.</p><p dir="ltr">What's in the box:</p><p dir="ltr">BenQ XL2411K-B Monitor for eSports</p><p dir="ltr">Monitor Stand</p><p dir="ltr">Display Port cable</p><p dir="ltr">Power Cable</p><p dir="ltr">I will ship within one day of receiving payment; usually same day if before UPS closing.</p>`,
    ],
    category: 0,
    images: [
      'public/images/uploads/benq_xl2411k_1.jpg',
      'public/images/uploads/benq_xl2411k_2.jpg',
      'public/images/uploads/benq_xl2411k_3.jpg',
      'public/images/uploads/benq_xl2411k_4.jpg',
      'public/images/uploads/benq_xl2411k_5.jpg',
    ],
    seller: 1,
    startPrice: 1500000,
    currentPrice: 1500000,
    buyPrice: 3000000,
    stepPrice: 200000,
    isAutoRenew: true,
    expiredAt: new Date(Date.now() + 5 * 60 * 1000),
  },
  // Product 4
  {
    name: 'Tecware Vega L, Dual Tempered Glass ATX Gaming PC Computer Case w/ 4 RGB Fans',
    descriptions: [
      `<div><strong>Dual Tempered Glass Display</strong></div><div>Clear tempered glass panels on the front and side for that premium look.</div><div></div><div><strong>RGB Illumination</strong></div><div>4 x Orbis F1 Fans and Hub included, with ARGB and PWM Sync compatibility with ASUS/ASRock/GIGABYTE/MSI motherboards</div><div></div><div><strong>Slide-in Glass Panel</strong><br />Side Glass panel slides in seamlessly , secured by thumbscrews at the back. No more bothersome thumbscrews on the corners of the glass<div></div><div><div><strong>Dust Prevention</strong></div><div>Includes top and bottom dust filters to keep your system dust-free throughout.</div></div><div><strong>Motherboard Support&nbsp;</strong></div><div>ATX, Micro-ATX, and Mini-ITX</div></div><table role="presentation"><tbody><tr><th>Brand Name</th><td>TECWARE</td></tr><tr><th>I/O</th><td>USB 3.0 x 1, USB 2.0 x 2<br />HD Audio 3.5mm</td></tr><tr><th>BAYS</th><td>1 x 3.5&rdquo; + 1 x 3.5&rdquo;/2.5&rdquo; (Tool-free Removable HDD Cage)<br />7 x PCIe Expansion slots</td></tr><tr><th>FANS</th><td>Front: 3 x 120mm (Included)<br />Top: 2 x 120mm<br />Rear: 1 x 120mm fan (Included)</td></tr><tr><th>SUPPORT AND CLEARANCE</th><td>Supports ATX / mATX / ITX motherboards<br />300mm Maximum GPU card length<br />160mm Maximum CPU cooler height<br />150/250mm* PSU Clearance (*w/o HDD Cage)</td></tr><tr><th>OTHERS</th><td>Front &amp; Side Tempered Glass<br />Slide-in Tempered Glass Left Side Panel<br />Top Panel Magnetic Filter &amp; Bottom PSU Filter</td></tr><tr><th>SIZE</th><td>Dimensions : L 330 W 210 H 440mm, 4.9Kg</td></tr><tr></tr></tbody></table>`,
    ],
    category: 0,
    images: [
      'public/images/uploads/tecware_vega_1.jpg',
      'public/images/uploads/tecware_vega_2.jpg',
      'public/images/uploads/tecware_vega_3.jpg',
      'public/images/uploads/tecware_vega_4.jpg',
      'public/images/uploads/tecware_vega_5.jpg',
    ],
    seller: 2,
    startPrice: 1000000,
    currentPrice: 1000000,
    buyPrice: 2000000,
    stepPrice: 50000,
    isAutoRenew: true,
    expiredAt: new Date(Date.now() + 2 * 60 * 1000),
  },
  // Product 5
  {
    name: 'PNY GeForce RTX 3060 12GB XLR8 Gaming REVEL EPIC-X RGB GPU',
    descriptions: [
      `<div><h3>About this product</h3></div><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td colspan="2">Product Identifiers</td></tr><tr><td width="35%">Brand</td><td width="65%">PNY</td></tr><tr><td width="35%">MPN</td><td width="65%">VCG306012DFXPPB</td></tr><tr><td width="35%">UPC</td><td width="65%">0751492643113</td></tr><tr><td width="35%">Model</td><td width="65%">PNY GeForce RTX 3060 XLR8 Gaming REVEL EPIC-X RGB Dual Fan</td></tr><tr><td width="35%">eBay Product ID (ePID)</td><td width="65%">2315654907</td></tr><tr></tr><tr><td colspan="2">Product Key Features</td></tr><tr><td width="35%">Memory Type</td><td width="65%">GDDR6</td></tr><tr><td width="35%">APIs</td><td width="65%">DirectX 12 Ultimate, OpenGL 4.6, Vulkan</td></tr><tr><td width="35%">Memory Size</td><td width="65%">12 GB</td></tr><tr><td width="35%">Chipset/GPU Model</td><td width="65%">NVIDIA GeForce RTX 3060</td></tr><tr><td width="35%">Chipset Manufacturer</td><td width="65%">NVIDIA</td></tr><tr><td width="35%">Features</td><td width="65%">RGB Lighting, G-SYNC/FreeSync Compatible, VR Ready</td></tr><tr><td width="35%">Power Cable Requirement</td><td width="65%">8-Pin PCI-E</td></tr><tr><td width="35%">Connectors</td><td width="65%">DisplayPort, HDMI</td></tr><tr><td width="35%">Compatible Slot</td><td width="65%">PCI Express 4.0 x16</td></tr></tbody></table>`,
    ],
    category: 0,
    images: [
      'public/images/uploads/gpu_pny_1.png',
      'public/images/uploads/gpu_pny_2.png',
      'public/images/uploads/gpu_pny_3.png',
      'public/images/uploads/gpu_pny_4.png',
    ],
    seller: 2,
    startPrice: 15000000,
    currentPrice: 15000000,
    buyPrice: 18000000,
    stepPrice: 100000,
    isAutoRenew: true,
    expiredAt: new Date(Date.now() + 23 * 60 * 1000),
  },
  // Product 6
  {
    name: 'EVGA GeForce RTX 3060 XC 12GB GDDR6 Gaming Graphics Card GPU (12G-P5-3657-KR)',
    descriptions: [
      `<div><h3>About this product</h3></div><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td colspan="2">Product Identifiers</td></tr><tr><td width="35%">Brand</td><td width="65%">EVGA</td></tr><tr><td width="35%">MPN</td><td width="65%">12G-P5-3657-KR</td></tr><tr><td width="35%">UPC</td><td width="65%">0843368069865</td></tr><tr><td width="35%">eBay Product ID (ePID)</td><td width="65%">2315640392</td></tr><tr></tr><tr><td colspan="2">Product Key Features</td></tr><tr><td width="35%">Memory Type</td><td width="65%">GDDR6</td></tr><tr><td width="35%">APIs</td><td width="65%">DirectX 12 Ultimate, CUDA, OpenGL 4.6, Vulkan</td></tr><tr><td width="35%">Memory Size</td><td width="65%">12 GB</td></tr><tr><td width="35%">Chipset/GPU Model</td><td width="65%">NVIDIA GeForce RTX 3060</td></tr><tr><td width="35%">Chipset Manufacturer</td><td width="65%">NVIDIA</td></tr><tr><td width="35%">Features</td><td width="65%">Multiple Monitor Support, LED Lighting, G-SYNC/FreeSync Compatible, VR Ready</td></tr><tr><td width="35%">Cooling Component Included</td><td width="65%">Fan with Heatsink</td></tr><tr><td width="35%">Power Cable Requirement</td><td width="65%">8-Pin PCI-E</td></tr><tr><td width="35%">Connectors</td><td width="65%">DisplayPort, HDMI</td></tr><tr><td width="35%">Compatible Slot</td><td width="65%">PCI Express 4.0 x16</td></tr><tr></tr><tr><td colspan="2">Dimensions</td></tr><tr><td width="35%">Item Length</td><td width="65%">7.94in.</td></tr><tr><td width="35%">Item Height</td><td width="65%">4.33in.</td></tr></tbody></table>`,
    ],
    category: 0,
    images: [
      'public/images/uploads/gpu_evga_1.jpg',
      'public/images/uploads/gpu_evga_2.jpg',
      'public/images/uploads/gpu_evga_3.jpg',
      'public/images/uploads/gpu_evga_4.jpg',
    ],
    seller: 1,
    startPrice: 16000000,
    currentPrice: 16000000,
    stepPrice: 100000,
    isAutoRenew: true,
    expiredAt: new Date(Date.now() + 20 * 60 * 1000),
  },
  // Product 7
  {
    name: 'EVGA Nvidia GeForce GTX 1050 Ti 4GB GPU VRAM Graphics Card PC Gaming Used',
    descriptions: [
      `<h3><strong><u>Item:</u></strong></h3><ul><li>4GB VRAM</li><li>GTX 1050 Ti</li><li>Serial number recorded</li><li>Benchmarked</li></ul><h3><strong><u>Condition:</u></strong></h3><ul><li>Used</li><li>Excellent condition</li><li>Works great</li></ul><h3><br /><strong><u>Other:</u></strong></h3><ul><li>Always online!</li><li>Multiple shipping methods available</li></ul><ul><li>Ships in 1 business day or sooner!</li></ul><h3><br /><br /></h3>`,
    ],
    category: 0,
    images: [
      'public/images/uploads/gpu_1050_1.jpg',
      'public/images/uploads/gpu_1050_2.jpg',
      'public/images/uploads/gpu_1050_3.jpg',
      'public/images/uploads/gpu_1050_4.jpg',
    ],
    seller: 1,
    startPrice: 3000000,
    currentPrice: 3000000,
    stepPrice: 50000,
    expiredAt: new Date(Date.now() + 20 * 60 * 1000),
  },
  // Category 1
  // Product 8
  {
    name: 'Sony Alpha A7R II 42.4 MP Mirrorless Digital Camera - Black (Body Only)',
    descriptions: [
      `<div><h3>About this product</h3></div><table style="height: 690px; width: 100%;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr style="height: 17px;"><td style="height: 17px;" colspan="2">Product Identifiers</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Brand</td><td style="height: 17px;" width="65%">Sony</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">MPN</td><td style="height: 17px;" width="65%">ILCE7RM2</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">GTIN</td><td style="height: 17px;" width="65%">0663701849578, 4548736017689</td></tr><tr style="height: 35px;"><td style="height: 35px;" width="35%">UPC</td><td style="height: 35px;" width="65%">0663701849578, 4548736017702, 4548736017689</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Model</td><td style="height: 17px;" width="65%">Alpha A7R II</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">eBay Product ID (ePID)</td><td style="height: 17px;" width="65%">15026053030</td></tr><tr style="height: 17px;"><td style="height: 17px;" colspan="2">Product Key Features</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Digital Zoom</td><td style="height: 17px;" width="65%">4x</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Color</td><td style="height: 17px;" width="65%">Black</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Battery Type</td><td style="height: 17px;" width="65%">Lithium-Ion, Lithium</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Connectivity</td><td style="height: 17px;" width="65%">USB, Micro USB, HDMI</td></tr><tr style="height: 264px;"><td style="height: 264px;" width="35%">Features</td><td style="height: 264px;" width="65%">Face Detection, Bluetooth, Histogram Display, Built-in GPS, Tripod Thread, Audio Recording, Viewfinder, Eye-Fi Card Ready, Exposure Compensation, Time Lapse, Sharpness Control, CMOS Sensor, High Dynamic Range (HDR), 4K Video Recording, Auto Focus, 1080p HD Video Recording, Noise Reduction, Interval Shooting Mode, 1080i HD Video Recording, Image Stabilization, Interchangeable Lenses, 2160p UHD Video Recording, Auto Contrast Balance (ACB), GPS Ready, Wi-Fi, Built-in Wi-Fi, 720p HD Video Recording, AE/FE Lock, AF Lock, DPOF Support, Touch Screen, PictBridge Support, Wi-Fi Ready, Built-in Help Guide, Built-in Speaker, Body Only, Dioptric Adjustment</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Screen Size</td><td style="height: 17px;" width="65%">3 in</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Series</td><td style="height: 17px;" width="65%">Sony Alpha</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Type</td><td style="height: 17px;" width="65%">Mirrorless Interchangeable Lens</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Maximum Resolution</td><td style="height: 17px;" width="65%">42.4 MP</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Optical Zoom</td><td style="height: 17px;" width="65%">1x</td></tr><tr style="height: 17px;"><td style="height: 17px;" colspan="2">Dimensions</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Item Height</td><td style="height: 17px;" width="65%">3.8in.</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Item Width</td><td style="height: 17px;" width="65%">4.9in.</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Width</td><td style="height: 17px;" width="65%">4.9in.</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Item Weight</td><td style="height: 17px;" width="65%">1.27lbs.</td></tr><tr style="height: 17px;"><td style="height: 17px;" colspan="2">Additional Product Features</td></tr><tr style="height: 17px;"><td style="height: 17px;" width="35%">Manufacturer Color</td><td style="height: 17px;" width="65%">Black</td></tr></tbody></table><p><br /><br /></p>`,
    ],
    category: 1,
    images: [
      'public/images/uploads/sony_a7r_1.jpg',
      'public/images/uploads/sony_a7r_2.jpg',
      'public/images/uploads/sony_a7r_3.jpg',
      'public/images/uploads/sony_a7r_4.jpg',
    ],
    seller: 1,
    startPrice: 15000000,
    currentPrice: 15000000,
    buyPrice: 20000000,
    stepPrice: 300000,
    isAutoRenew: true,
    expiredAt: new Date(Date.now() + 20 * 60 * 1000),
  },
  // Product 9
  {
    name: 'Canon EOS 4000D 18 MP Digital Camera with EF-S 18-55mm III Lens, Bag and SD Card',
    descriptions: [
      `<div><div><h3>About this product</h3></div><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td colspan="2">Product Identifiers</td></tr><tr><td width="35%">Brand</td><td width="65%">Canon</td></tr><tr><td width="35%">MPN</td><td width="65%">3011C014</td></tr><tr><td width="35%">EAN</td><td width="65%">8714574657363</td></tr><tr><td width="35%">GTIN</td><td width="65%">8714574657363</td></tr><tr><td width="35%">Model</td><td width="65%">EOS 4000D</td></tr><tr><td width="35%">eBay Product ID (ePID)</td><td width="65%">23034419174</td></tr><tr><td colspan="2">Product Key Features</td></tr><tr><td width="35%">Digital Zoom</td><td width="65%">4x</td></tr><tr><td width="35%">Battery Type</td><td width="65%">Lithium-Ion</td></tr><tr><td width="35%">Connectivity</td><td width="65%">USB</td></tr><tr><td width="35%">Colour</td><td width="65%">Black</td></tr><tr><td width="35%">Features</td><td width="65%">Wi-Fi, Wi-Fi Ready</td></tr><tr><td width="35%">Series</td><td width="65%">Canon EOS</td></tr><tr><td width="35%">Type</td><td width="65%">Compact</td></tr><tr><td width="35%">Optical Zoom</td><td width="65%">3x</td></tr><tr><td colspan="2">Dimensions</td></tr><tr><td width="35%">Item Weight</td><td width="65%">436g</td></tr><tr><td colspan="2">Additional Product Features</td></tr><tr><td width="35%">Brand Colour</td><td width="65%">Black</td></tr><tr><td width="35%">Screen Size</td><td width="65%">2.7"</td></tr><tr><td width="35%">Maximum Resolution</td><td width="65%">18.0MP</td></tr></tbody></table><p dir="ltr">Canon EOS 4000D 18 MP Digital Camera with EF-S 18-55mm III Lens, Camera Bag and SD Card.</p><p dir="ltr">Incredible bargain: brand new Canon camera. Highly desirable current model. Sold out on Canon website.</p><p dir="ltr">I understand from a local camera shop this is the ideal model for A' level or undergraduate photography students.</p><p dir="ltr">It is still in the original packaging box with unbroken security seal. The sale also includes the camera case in sealed sellophane bag and a 64 GB SanDisk memory card.</p><p dir="ltr">Genuine reason for sale. Smoke and pet free home. The camera and accessories are all brand new and look like new. Would make an ideal Christmas gift.</p><p dir="ltr">Please note, I will post this item by Hermes signed for and insured parcel delivery service. I am happy for the postage cost reimbursement to be &pound;3.85 towards the postage cost, but I can't work out how to update it that I will post by courier service nor by Royal Mail post Returns will not be accepted and signature will be confirmation of safe delivery. UK bids only please. Will only post to UK address.</p></div>`,
    ],
    category: 1,
    images: [
      'public/images/uploads/canon_4000D_1.jpg',
      'public/images/uploads/canon_4000D_2.jpg',
      'public/images/uploads/canon_4000D_3.jpg',
      'public/images/uploads/canon_4000D_4.jpg',
      'public/images/uploads/canon_4000D_5.jpg',
    ],
    seller: 1,
    startPrice: 8000000,
    currentPrice: 8000000,
    stepPrice: 200000,
    isAutoRenew: true,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 10
  {
    name: 'Canon EOS 80D 24.2MP Digital SLR Camera with EF-S 18-55mm IS STM Lens - Black',
    descriptions: [
      `<div><h3>About this product</h3></div><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td colspan="2">Product Identifiers</td></tr><tr><td width="35%">Brand</td><td width="65%">Canon</td></tr><tr><td width="35%">MPN</td><td width="65%">1263C044AA</td></tr><tr><td width="35%">EAN</td><td width="65%">5055189024793</td></tr><tr><td width="35%">Model</td><td width="65%">EOS 80D</td></tr><tr><td width="35%">eBay Product ID (ePID)</td><td width="65%">10032786113</td></tr><tr></tr><tr><td colspan="2">Product Key Features</td></tr><tr><td width="35%">Battery Type</td><td width="65%">AA</td></tr><tr><td width="35%">Connectivity</td><td width="65%">Composite, USB, Remote Control, HDMI, mini-HDMI</td></tr><tr><td width="35%">Colour</td><td width="65%">Black</td></tr><tr><td width="35%">Features</td><td width="65%">Built-in Flash, 1080p HD Video Recording, AE/FE Lock, AF Lock, Auto Power Save, Eye-Fi Card Ready</td></tr><tr><td width="35%">Series</td><td width="65%">Canon EOS</td></tr><tr><td width="35%">Type</td><td width="65%">Digital SLR</td></tr><tr><td width="35%">Optical Zoom</td><td width="65%">3x</td></tr><tr></tr><tr><td colspan="2">Dimensions</td></tr><tr><td width="35%">Item Weight</td><td width="65%">730g</td></tr><tr></tr><tr><td colspan="2">Additional Product Features</td></tr><tr><td width="35%">Brand Colour</td><td width="65%">Black</td></tr><tr><td width="35%">Screen Size</td><td width="65%">3.0"</td></tr><tr><td width="35%">Maximum Resolution</td><td width="65%">24.2MP</td></tr><tr></tr></tbody></table>`,
    ],
    category: 1,
    images: [
      'public/images/uploads/canon_80D_1.jpg',
      'public/images/uploads/canon_80D_2.jpg',
      'public/images/uploads/canon_80D_3.jpg',
      'public/images/uploads/canon_80D_4.jpg',
    ],
    seller: 1,
    startPrice: 10000000,
    currentPrice: 10000000,
    stepPrice: 200000,
    onlyRatedBidder: true,
    expiredAt: new Date(Date.now() + 40 * 60 * 1000),
  },
  // Product 11
  {
    name: 'Sony Alpha NEX-5 Digital Camera - Black with both 2.8-16mm and 18-55mm Lens',
    descriptions: [
      `<p>Sony NEX-5 Camera - used but in reasonable condition.</p><div>Comes with SD card, charger, and 2 lenses, fish cover and lens cover.</div><div><div><h3>About this product</h3></div><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td colspan="2">Product Information</td></tr><tr><td colspan="2">The Sony ? (alpha) NEX-5D is a compact digital camera, with a CMOS image sensor, that allows you to capture vast landscapes clearly and vividly. Compose, capture and view your photographs and videos on the 3-inch LCD display of this Sony 14.2 MP camera. You can record HD videos at a resolution of 1080i with the Sony ? (alpha) NEX-5D to deliver a true-to-life footage. The anti-motion blur feature in this compact digital camera counters handshakes to rule out blurs. Moreover, the red-eye reduction function in this Sony 14.2 MP camera automatically corrects the red-eye effect caused due to flash. With a high ISO sensitivity (up to 12800), this Sony 14.2 MP camera captures clear photos even in low-light conditions.</td></tr><tr></tr><tr><td colspan="2">Product Identifiers</td></tr><tr><td width="35%">Brand</td><td width="65%">Sony</td></tr><tr><td width="35%">MPN</td><td width="65%">NEX5DB</td></tr><tr><td width="35%">Model</td><td width="65%">NEX-5D</td></tr><tr><td width="35%">eBay Product ID (ePID)</td><td width="65%">102717187</td></tr><tr></tr><tr><td colspan="2">Product Key Features</td></tr><tr><td width="35%">Optical Zoom</td><td width="65%">3x</td></tr><tr><td width="35%">Digital Zoom</td><td width="65%">10x</td></tr><tr><td width="35%">Battery Type</td><td width="65%">Lithium-Ion</td></tr><tr><td width="35%">Features</td><td width="65%">Automatic Flash, Built-in Flash, Red-Eye Reduction, USB 2.0, Hdmi</td></tr><tr><td width="35%">Series</td><td width="65%">Sony Alpha</td></tr><tr><td width="35%">Connectivity</td><td width="65%">USB</td></tr><tr><td width="35%">Colour</td><td width="65%">Black</td></tr><tr></tr><tr><td colspan="2">Dimensions</td></tr><tr><td width="35%">Item Weight</td><td width="65%">287GR</td></tr><tr></tr><tr><td colspan="2">Additional Product Features</td></tr><tr><td width="35%">Sensor Resolution</td><td width="65%">14.2MP</td></tr><tr><td width="35%">Camera Type</td><td width="65%">Mirrorless System</td></tr><tr><td width="35%">Screen Size</td><td width="65%">3"</td></tr><tr><td width="35%">Type</td><td width="65%">Mirrorless System</td></tr><tr><td width="35%">Lens for Sd</td><td width="65%">16mm and 18-55mm</td></tr><tr><td width="35%">Display Size</td><td width="65%">3"</td></tr><tr><td width="35%">Maximum Resolution</td><td width="65%">14.2MP</td></tr></tbody></table></div>`,
    ],
    category: 1,
    images: [
      'public/images/uploads/sony_nex_1.jpg',
      'public/images/uploads/sony_nex_2.jpg',
      'public/images/uploads/sony_nex_3.jpg',
      'public/images/uploads/sony_nex_4.jpg',
    ],
    seller: 1,
    startPrice: 2500000,
    currentPrice: 2500000,
    stepPrice: 100000,
    expiredAt: new Date(Date.now() + 40 * 60 * 1000),
  },
  // Category 2
  // Product 12
  {
    name: 'LG 32” Smart HD Ready HDR TV with HD Freeview & Bluetooth',
    descriptions: [
      `<p><strong>For Sale</strong></p><p><strong>LG 32&rdquo; Smart HD Ready HDR TV with HD Freeview &amp; Bluetooth &ndash; 2021 Model</strong></p><p><strong>Model Number -&nbsp;32LM637BPLA</strong></p><p><strong>Active HDR10</strong></p><p><strong>Quad Core Processor</strong></p><p><strong>Refresh Rate &ndash; 50 Hz</strong></p><p><strong>Built in Bluetooth 5.0</strong></p><p><strong>Screen Mirroring &ndash; Mira Cast</strong></p><p><strong>Freesat/Freeview Play</strong></p><p><strong>Works with Amazon Alexa &amp; Google Assistant</strong></p><p><strong>HDMI x 3 (e-ARC compatible x 1)</strong></p><p><strong>USB x 2</strong></p><p><strong>Comes with cable, remote and Box (No Manual Book)</strong></p><p><strong>Cash on collection or Can be delivered at extra cost</strong></p><p><strong>Item Location &ndash;&nbsp;West London</strong></p><p><strong>For further information please contact me on&nbsp;07904680408</strong></p>`,
    ],
    category: 2,
    images: [
      'public/images/uploads/lg_32LM63_1.jpg',
      'public/images/uploads/lg_32LM63_2.jpg',
      'public/images/uploads/lg_32LM63_3.jpg',
      'public/images/uploads/lg_32LM63_4.jpg',
    ],
    seller: 2,
    startPrice: 4000000,
    currentPrice: 4000000,
    stepPrice: 100000,
    onlyRatedBidder: true,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 13
  {
    name: 'SAMSUNG 75-inch Class QLED Q60T Series - 4K UHD Dual LED Quantum HDR Smart TV',
    descriptions: [
      `<div align="center"><span style="color: #202020;"><span style="color: #00429a;"><em>SAMSUNG 75-inch Class QLED Q60T Series - 4K UHD Dual LED Quantum HDR Smart TV,&nbsp; Apple, Google, Android, Alexa&nbsp; QN75Q60TAFXZA</em></span><br /></span></div><p>&nbsp;</p><div align="left">&nbsp;&nbsp;&nbsp;&nbsp;<em>100% COLOR VOLUME WITH QUANTUM DOT</em>: Quantum dots produce over a billion shades of color that stay true-to-life even in bright scenes</div><div align="left">&nbsp;</div><div align="left">-&nbsp;<em>DUAL LED</em>: A system of dedicated warm and cool LED backlights enhance contrast details</div><div align="left">&nbsp;</div><div align="left">&nbsp;-<em>QUANTUM HDR</em>: Expands the range of color and detail beyond what's possible on HDTVs</div><div align="left">&nbsp;</div><div align="left">-&nbsp;<em>SMART TV POWERED BY TIZEN</em>: Go beyond Smart TV with next-gen apps, super easy control, and a host of enhancements that elevate the TV watching experience</div><div align="left">&nbsp;</div><div align="left">&nbsp;-<em>QUANTUM PROCESSOR 4K LITE</em>: This ultra-fast processor optimizes content for QLED and transforms everything you watch into stunning 4K</div><div align="left">&nbsp;</div><p>&nbsp;-<em>ALEXA BUILT-IN</em>: Ask more from your TV. Just ask Alexa to open apps, change the channel, search for movies and shows, play music, control your smart home devices and more. To talk to Alexa, press and hold the mic button on your remote<br />&nbsp;&nbsp;&nbsp; Limited Time Offer<br /><br />Style: TV Only&nbsp; |&nbsp; Size: 75-Inch<br /><br />Enter a world saturated with color and sharpened to refreshing clarity, all of it made possible through the power of Quantum Dot technology. An intuitive Smart TV interface learns what you like and suggests exciting new content. And if you&rsquo;re into gaming, Game Enhancer automatically neutralizes annoyances like tearing and stuttering. DISCLAIMERS: QLED televisions can produce 100% Color Volume in the DCI-P3 color space, the format for most cinema screens and HDR movies for television.</p>`,
    ],
    category: 2,
    images: [
      'public/images/uploads/samsung_Q60T_1.png',
      'public/images/uploads/samsung_Q60T_2.png',
      'public/images/uploads/samsung_Q60T_3.png',
      'public/images/uploads/samsung_Q60T_4.png',
    ],
    seller: 2,
    startPrice: 18000000,
    currentPrice: 18000000,
    stepPrice: 100000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 14
  {
    name: 'Sony LED 32" inch (80cm) TV KDL32 WE613 TV Television with X-Reality Pro',
    descriptions: [
      `<div align="center"><div style="text-align: left;"><strong>Reason For Selling</strong></div><div style="text-align: left;">I've just purchased another larger TV and no longer a need for this one. &nbsp;I used it for connecting the Nintendo Switch from time to time or watching TV in a bedroom.</div><div style="text-align: left;">&nbsp;</div><div style="text-align: left;">&nbsp;</div><div style="text-align: left;"><strong>Product Overview</strong></div><div style="text-align: left;"><big>With a full host of smart features and HDR compatibility the Sony KDL32WE613 is the small TV that thinks big.</big><br /><br />HDR compatibility for enhanced gaming<br />Although the Sony KDL32WE613 isn't a 4K UHD TV it is compatible with HDR signals. HDR (High Dynamic Range) preserves the detail in the brightest and darkest scenes, giving greatly enhanced realism. Compatible with all HDR PS4 Game titles, this makes this Sony 32" TV a great value combined gaming monitor and TV.<br /><br />X-Reality PRO for a top quality picture<br />The Sony KDL32WE613 comes with their exclusive X-Reality PRO picture engine. This is designed to improve detail and reduce noise and is especially effective with Standard Definition TV. With X-Reality PRO everything you watch is crisper and more detailed than ever.<br /><br />Motionflow XR400 for smooth motion<br />This Sony LED TV set gives 'reach in' depth, rich colours and, thanks to Motionflow XR400, smooth motion. The high quality Motionflow system works especially well with fast moving action, such as sports events, without the blur you can see with standard 50Hz TVs. From a Hollywood blockbuster to a Formula One race, XR400 makes a significant difference.<br /><br />Connect up to your home network and enjoy YouTube and more<br />Featuring built-in Wi-Fi as well as an Ethernet connection, it's easy to connect the KDL32WE613 to your home network. Once connected you can enjoy a range of 'smart' functions, including accessing web apps such as YouTube.<br /><br />Web browser<br />With a built-in web browser it's easy to find your favourite sites. Surf the web on the TV with the Sony's simple interface and enjoy.<br /><br />Record digital TV with USB HDD REC<br />This flexible Sony TV comes with a very handy USB interface. The USB socket not only playbacks media but also lets you connect up a USB device to use as a PVR (Personal Video Recorder). USB HDD REC allows one-touch and timer recording of a digital broadcast onto any USB HDD device up to 2TB in capacity. While viewing the show, simply press REC to start recording, which will automatically stop at the end of the programme.<br /><br />Slim, streamlined design with cable management<br />The TV unit's design is every bit as stylish and subtle as you'd expect from Sony, with long-lasting appeal. The Sony features a minimal bezel and silver hairline finish stand with built-in cable management. With the cables neatly tucked out of sight you can appreciate the Sony's sleek design all the more.</div><div style="text-align: left;">&nbsp;</div><div style="text-align: left;"><strong>Detailed Specs</strong></div><div style="text-align: left;">&nbsp;</div><div><section id="search-container"><div data-reactroot=""><div id="search-compact" class="search js-search search-compact search-compact--tech-specs search-tech-specs with-context-filter">&nbsp;</div></div></section><section id="special_message-container"></section><section id="specifications-container"><ul class="container tech-specs" data-reactroot=""><li class="grid no-grid-at-567 spec-section js-spec-section" style="text-align: left;"><div class="span3"><h2 class="t6-light spec-section-label js-spec-section-label">Model year</h2></div><ul class="spec-section-list js-spec-section-list span9"><li class="span5 "><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">MODEL YEAR</h3><p class="p3 spec-section-item-body js-spec-section-item-body">2017</p></li></ul></li></ul></li><li class="grid no-grid-at-567 spec-section js-spec-section" style="text-align: left;"><div class="span3"><h2 class="t6-light spec-section-label js-spec-section-label">Dimensions and Weight</h2></div><ul class="spec-section-list js-spec-section-list span9"><li class="span5 "><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">STAND WIDTH</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Approx. 32.9 cm</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">DIMENSION OF TV WITH FLOOR STAND (W X H X D)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">-</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">SCREEN SIZE (INCH, MEASURED DIAGONALLY)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">32" (31.5")</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">WEIGHT OF TV WITH FLOOR STAND</h3><p class="p3 spec-section-item-body js-spec-section-item-body">-</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">SCREEN SIZE (CM, MEASURED DIAGONALLY)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">80.0 cm</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">WEIGHT OF PACKAGE CARTON (GROSS)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Approx. 9 kg</p></li></ul></li><li class="span5 offset2"><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">WEIGHT OF TV WITHOUT STAND</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Approx. 5.8 kg</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">VESA&reg; HOLE PITCH(W X H)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">10.0x20.0 cm</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">DIMENSION OF TV WITHOUT STAND (W X H X D)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Approx. 73.1x44.2x7.0 cm</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">WEIGHT OF TV WITH STAND</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Approx. 6.2 kg</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">DIMENSION OF PACKAGE CARTON (W X H X D)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Approx. 82.6 x 54.3 x 15.6 cm</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">DIMENSION OF TV WITH STAND (W X H X D)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Approx. 73.1x49.0x18.7 cm</p></li></ul></li></ul></li><li class="grid no-grid-at-567 spec-section js-spec-section" style="text-align: left;"><div class="span3"><h2 class="t6-light spec-section-label js-spec-section-label">Connectivity</h2></div><ul class="spec-section-list js-spec-section-list span9"><li class="span5 "><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">HDCP</h3><p class="p3 spec-section-item-body js-spec-section-item-body">HDCP1.4</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">USB DRIVE FORMAT SUPPORT</h3><p class="p3 spec-section-item-body js-spec-section-item-body">FAT16/FAT32/NTFS</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">COMPONENT VIDEO (Y/PB/PR) INPUT(S)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">No</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">HDMI INPUTS TOTAL</h3><p class="p3 spec-section-item-body js-spec-section-item-body">2 (2Side)</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">SCART</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Without Smartlink :1 (Rear)</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">COMPOSITE VIDEO INPUT(S)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">No</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">RS-232C INPUT(S)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">No</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">DIGITAL AUDIO OUTPUT(S)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">1 (Side Hybrid with HP Out, Audio Out and Subwoofer Out with Digital Audio Out)</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">AUDIO/HEADPHONE OUTPUT(S)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">1 (Side Hybrid with Headphone Out, Audio Out and Subwoofer Out)</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">IF (SATELLITE) CONNECTION INPUT(S)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">No</p></li></ul></li><li class="span5 offset2"><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">USB HDD RECORDING</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Yes (Except Italy)</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">MHL</h3><p class="p3 spec-section-item-body js-spec-section-item-body">No</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">HDMI AUDIO RETURN CHANNEL (ARC)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Yes</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">RF (TERRESTRIAL/CABLE) CONNECTION INPUT(S)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">1 (Side)</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">USB PORTS</h3><p class="p3 spec-section-item-body js-spec-section-item-body">2 (Side/Stacking)</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">USB PLAYBACK CODECS</h3><p class="p3 spec-section-item-body js-spec-section-item-body">MPEG1/MPEG2PS/MPEG2TS/AVCHD/MP4Part10/MP4Part2/AVI(XVID)/AVI(MotionJpeg)/WMV9/MKV/WEBM/WAV/MP3/WMA/JPEG</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">WI-FI STANDARD</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Wi-Fi Certified 802.11b/g/n</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">HDMI-CEC</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Yes</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">BLUETOOTH PROFILE SUPPORT</h3><p class="p3 spec-section-item-body js-spec-section-item-body">No</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">ETHERNET INPUTS</h3><p class="p3 spec-section-item-body js-spec-section-item-body">1 (Rear)</p></li></ul></li></ul></li><li class="grid no-grid-at-567 spec-section js-spec-section" style="text-align: left;"><div class="span3"><h2 class="t6-light spec-section-label js-spec-section-label">Picture (Panel)</h2></div><ul class="spec-section-list js-spec-section-list span9"><li class="span5 "><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">BACKLIGHT DIMMING TYPE</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Frame Dimming</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">BACKLIGHT TYPE</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Edge LED</p></li></ul></li><li class="span5 offset2"><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">DISPLAY RESOLUTION (H X V, PIXELS)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">1366x768</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">DISPLAY TYPE</h3><p class="p3 spec-section-item-body js-spec-section-item-body">LCD</p></li></ul></li></ul></li><li class="grid no-grid-at-567 spec-section js-spec-section" style="text-align: left;"><div class="span3"><h2 class="t6-light spec-section-label js-spec-section-label">Picture (processing)</h2></div><ul class="spec-section-list js-spec-section-list span9"><li class="span5 "><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">COLOUR ENHANCEMENT</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Live Colour&trade; Technology</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">CONTRAST ENHANCEMENT</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Dynamic Contrast Enhancer</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">HDR (HIGH DYNAMIC RANGE) COMPATIBILITY</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Yes</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">HEVC SUPPORT (BROADCAST)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Yes (Up to 1920x1080/60p 10bit)</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">VIDEO SIGNAL SUPPORT</h3><p class="p3 spec-section-item-body js-spec-section-item-body">1080p(30,50,60Hz), 1080/24p, 1080i(50,60Hz), 720p(30,50,60Hz), 720/24p, 576p, 576i, 480p, 480i</p></li></ul></li><li class="span5 offset2"><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">CLARITY ENHANCEMENT</h3><p class="p3 spec-section-item-body js-spec-section-item-body">X-Reality&trade; PRO</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">PICTURE MODES</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Vivid,Standard,Custom,Cinema,Sports,Photo-Vivid,Photo-Standard,Photo-Custom,Game,Graphics,HDR Game,HDR Cinema</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">PICTURE PROCESSOR</h3><p class="p3 spec-section-item-body js-spec-section-item-body">No</p></li><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">MOTION ENHANCER (NATIVE HZ)</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Motionflow&trade; XR 400Hz (Native 50Hz)</p></li></ul></li></ul></li><li class="grid no-grid-at-567 spec-section js-spec-section"><div class="span3" style="text-align: left;"><h2 class="t6-light spec-section-label js-spec-section-label">Sound (Speakers and Amplifier)</h2></div><ul class="spec-section-list js-spec-section-list span9"><li class="span5 " style="text-align: left;"><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header">SPEAKER TYPE</h3><p class="p3 spec-section-item-body js-spec-section-item-body">Open Baffle Speaker</p></li></ul></li><li class="span5 offset2"><ul><li class="spec-section-item js-spec-section-item"><h3 class="l3 spec-section-item-header js-spec-section-item-header" style="text-align: left;">AUDIO POWER OUTPUT</h3><p class="p3 spec-section-item-body js-spec-section-item-body" style="text-align: left;">5W + 5W</p></li></ul></li></ul></li></ul></section></div></div>`,
    ],
    category: 2,
    images: [
      'public/images/uploads/sony_kdl32_1.jpg',
      'public/images/uploads/sony_kdl32_2.jpg',
      'public/images/uploads/sony_kdl32_3.jpg',
      'public/images/uploads/sony_kdl32_4.jpg',
      'public/images/uploads/sony_kdl32_5.jpg',
    ],
    seller: 3,
    startPrice: 4000000,
    currentPrice: 4000000,
    stepPrice: 100000,
    expiredAt: new Date(Date.now() + 40 * 60 * 1000),
  },
  // Category 3
  // Product 15
  {
    name: 'Samsung Galaxy Z Flip 5G - 256GB - Phantom Black (O2)',
    descriptions: [
      `<p>Used for less then a year (prefer iphones so im selling ) . Its been in the Samsung case from a week old so it is in great condition. Theres a slight mark on the fold where the case doesn&rsquo;t cover but doesn&rsquo;t effect how it works , was also used as a second phone so hasn&rsquo;t had much use .and on the inside there a small mark where the rubber stopper that comes on it has marked the opposite side but you can hardly notice.</p><p>No charger or box but will come well packed.</p><p>Isnt unlocked its on o2</p>`,
    ],
    category: 3,
    images: [
      'public/images/uploads/samsung_zflip_1.jpg',
      'public/images/uploads/samsung_zflip_2.jpg',
      'public/images/uploads/samsung_zflip_3.jpg',
      'public/images/uploads/samsung_zflip_4.jpg',
    ],
    seller: 3,
    startPrice: 10000000,
    currentPrice: 10000000,
    stepPrice: 100000,
    buyPrice: 18000000,
    expiredAt: new Date(Date.now() + 40 * 60 * 1000),
  },
  // Product 16
  {
    name: 'Google Pixel 4a G025J - 128GB - Just Black (Unlocked CDMA+GSM) Smartphone',
    descriptions: [
      `<div><h3>About this product</h3></div><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td colspan="2">Product Identifiers</td></tr><tr><td width="35%">Brand</td><td width="65%">Google</td></tr><tr><td width="35%">MPN</td><td width="65%">G025J</td></tr><tr><td width="35%">GTIN</td><td width="65%">0649661038986</td></tr><tr><td width="35%">UPC</td><td width="65%">0649661038986, 0810029930239</td></tr><tr><td width="35%">Model</td><td width="65%">Pixel 4a</td></tr><tr><td width="35%">eBay Product ID (ePID)</td><td width="65%">22040321907</td></tr><tr></tr><tr><td colspan="2">Product Key Features</td></tr><tr><td width="35%">SIM Card Slot</td><td width="65%">Single SIM</td></tr><tr><td width="35%">Network</td><td width="65%">Unlocked</td></tr><tr><td width="35%">Operating System</td><td width="65%">Android</td></tr><tr><td width="35%">Storage Capacity</td><td width="65%">128 GB</td></tr><tr><td width="35%">Color</td><td width="65%">Black</td></tr><tr><td width="35%">Model Number</td><td width="65%">G025J, GA02099-US</td></tr><tr><td width="35%">Connectivity</td><td width="65%">Bluetooth, 4G, 3G, 2G, GPS, LTE</td></tr><tr><td width="35%">Contract</td><td width="65%">Google Fi Network</td></tr><tr><td width="35%">Processor</td><td width="65%">Octa Core</td></tr><tr><td width="35%">Lock Status</td><td width="65%">Factory Unlocked</td></tr><tr><td width="35%">Style</td><td width="65%">Bar</td></tr><tr><td width="35%">Features</td><td width="65%">HD + OLED</td></tr><tr><td width="35%">Camera Resolution</td><td width="65%">12.0 MP</td></tr><tr><td width="35%">Screen Size</td><td width="65%">5.8 in</td></tr><tr><td width="35%">Cellular Band</td><td width="65%">GSM 850 / 900 / 1800 / 1900; HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100; LTE 1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 20, 25, 26, 28, 29, 30, 38, 39, 40, 41, 66, 71</td></tr><tr><td width="35%">RAM</td><td width="65%">6 GB</td></tr><tr></tr><tr><td colspan="2">Additional Product Features</td></tr><tr><td width="35%">Manufacturer Color</td><td width="65%">Just Black</td></tr></tbody></table>`,
    ],
    category: 3,
    images: [
      'public/images/uploads/google_pixel4a_1.jpg',
      'public/images/uploads/google_pixel4a_2.jpg',
      'public/images/uploads/google_pixel4a_3.jpg',
      'public/images/uploads/google_pixel4a_4.jpg',
    ],
    seller: 1,
    startPrice: 5000000,
    currentPrice: 5000000,
    stepPrice: 100000,
    buyPrice: 8000000,
    expiredAt: new Date(Date.now() + 10 * 60 * 1000),
  },
  // Product 17
  {
    name: 'Xiaomi Redmi Note 8 - Smartphone 64GB, 4GB RAM, Dual Sim, Space Black',
    descriptions: [
      `<p dir="ltr">Xiaomi Redmi Note 8 eight generation of the Redmi Note series - 6.4inch screen Smartphone 64GB, 4GB RAM, Dual Sim +SDcard 48MP + 8MP + 2MP and selfie camera 13MP complete with 4000mAh battery with fast charging based on Android 9.0 pie MIUI 10</p><p dir="ltr">PHONE is in very good condition no scratch damage or crack on phone can see pictures as they are part of description. Open to any network for any questions feel free to ask Thanks for looking</p>`,
    ],
    category: 3,
    images: [
      'public/images/uploads/xiaomi_redmiNote8_1.jpg',
      'public/images/uploads/xiaomi_redmiNote8_2.jpg',
      'public/images/uploads/xiaomi_redmiNote8_3.jpg',
      'public/images/uploads/xiaomi_redmiNote8_4.jpg',
    ],
    seller: 3,
    startPrice: 1000000,
    currentPrice: 1000000,
    stepPrice: 50000,
    buyPrice: 2100000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 18
  {
    name: 'Apple iPhone 11 Pro - 64GB - Space Grey (Three) A2215 (CDMA + GSM)',
    descriptions: [
      `<p>RELISTED DUE TO NON PAYING BIDDER</p><p>Apple iPhone 11 Pro - 64GB - Space Grey (Three) A2215 (CDMA + GSM).</p><p>In very good but used condition, Please see photos.</p><p>The screen has been replaced and is now an LCD screen, not OLED.</p><p>Has always been in a UAG military grade case which will be included in the sale. Handset, box and case only, no plug or charger cable. Battery capacity outs max 87% of new.</p><p>This will be posted by special delivery signed for.</p>`,
    ],
    category: 3,
    images: [
      'public/images/uploads/iphone_11pro_1.jpg',
      'public/images/uploads/iphone_11pro_2.jpg',
      'public/images/uploads/iphone_11pro_3.jpg',
      'public/images/uploads/iphone_11pro_4.jpg',
    ],
    seller: 1,
    startPrice: 6000000,
    currentPrice: 6000000,
    stepPrice: 100000,
    buyPrice: 13000000,
    expiredAt: new Date(Date.now() + 40 * 60 * 1000),
  },
  // Category 4
  // Product 19
  {
    name: 'Nike Air Destroyer Bomber Jacket ‘Championship Athletes’ Size M.',
    descriptions: [
      `<p>Nike Air Destroyer Bomber Jacket &lsquo;Championship Athletes&rsquo; Size M.</p><p>True size.</p><p>Great black wool/leather bomber with marvelous embroidery and details.</p><p>Jacket has been worn but still in very good condition.</p><p>Some light wear on collar and cuffs.</p><p>See pictures.</p><p>Rare piece.</p>`,
    ],
    category: 4,
    images: [
      'public/images/uploads/nike_airDestroyer_1.jpg',
      'public/images/uploads/nike_airDestroyer_2.jpg',
      'public/images/uploads/nike_airDestroyer_3.jpg',
      'public/images/uploads/nike_airDestroyer_4.jpg',
      'public/images/uploads/nike_airDestroyer_5.jpg',
    ],
    seller: 2,
    startPrice: 4000000,
    currentPrice: 4000000,
    stepPrice: 100000,
    buyPrice: 6000000,
    expiredAt: new Date(Date.now() + 10 * 60 * 1000),
  },
  // Product 20
  {
    name: 'Brooks Brothers Men’s Checkered Dress Shirt XL',
    descriptions: [
      `<p>Men&rsquo;s XL Brooks Brothers long sleeve button down dress shirt. Features check design with wine, gold, and blue colors over white background. New without tags and comes from smoke free home.</p>`,
    ],
    category: 4,
    images: [
      'public/images/uploads/brook_checkered_1.jpg',
      'public/images/uploads/brook_checkered_2.jpg',
      'public/images/uploads/brook_checkered_3.jpg',
      'public/images/uploads/brook_checkered_4.jpg',
    ],
    seller: 1,
    startPrice: 400000,
    currentPrice: 400000,
    stepPrice: 30000,
    expiredAt: new Date(Date.now() + 20 * 60 * 1000),
  },
  // Product 21
  {
    name: 'BNWT Adidas Long Sleeve T-shirt Size 3XL',
    descriptions: [
      `<p>Adidas Long Sleeve T-shirt Size 3XL.</p><p>Never worn, tags still attached.</p><p>Has multicolour/rainbow price stickers down each sleeve and on chest logo. There is a nice nutrition facts graphic on the back of the shirt. Great for anyone who has an interest in fitness. Would be a good gym shirt.</p>`,
    ],
    category: 4,
    images: [
      'public/images/uploads/adidas_bnwt_1.jpg',
      'public/images/uploads/adidas_bnwt_2.jpg',
      'public/images/uploads/adidas_bnwt_3.jpg',
      'public/images/uploads/adidas_bnwt_4.jpg',
    ],
    seller: 2,
    startPrice: 400000,
    currentPrice: 400000,
    stepPrice: 20000,
    buyPrice: 800000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 22
  {
    name: 'Adidas T Shirt 3 Stripes Size Medium Brand New with Tags H09022',
    descriptions: [
      `<p>Adidas T Shirt 3 Stripes Size Medium Brand New with Tags H09022</p><p>The 3 stripe tee shirts are brand new and sealed</p><p>Only opened to take pictures</p><p>Never been worn</p><p>Beautiful embroidered Adidas detailing on collar and centre of tee shirt in blue</p><p>New tee shirt for 20/21</p><p>Currently retailing in Adidas for &pound;25</p><p>Great quality and design</p><p>Will look good on Denim or Joggers</p><p>Soft cotton, feels great</p><p>Please see full array of pictures</p><p>Any questions, feel free to ask</p>`,
    ],
    category: 4,
    images: [
      'public/images/uploads/adidas_3stripes_1.jpg',
      'public/images/uploads/adidas_3stripes_2.jpg',
      'public/images/uploads/adidas_3stripes_3.jpg',
      'public/images/uploads/adidas_3stripes_4.jpg',
    ],
    seller: 3,
    startPrice: 100000,
    currentPrice: 100000,
    stepPrice: 20000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Category 5
  // Product 23
  {
    name: 'BNWT ZARA Cotton Strappy Sun Dress White Blue Strip Size M',
    descriptions: [
      `<div><strong>Label/BRAND:&nbsp;ZARA</strong></div><div><strong>Size: M<br /></strong></div><h1><strong>Underarm to underarm: 50 cm</strong></h1><h1><strong>Length: 88 cm</strong></h1><p><strong>Fabric: cotton, lined</strong><br /><br /><strong>Stretchy: no</strong><br /><br /><strong>Condition: brand new with tags</strong></p>`,
    ],
    category: 5,
    images: [
      'public/images/uploads/zara_bnwt_1.jpg',
      'public/images/uploads/zara_bnwt_2.jpg',
      'public/images/uploads/zara_bnwt_3.jpg',
      'public/images/uploads/zara_bnwt_4.jpg',
    ],
    seller: 1,
    startPrice: 200000,
    currentPrice: 200000,
    stepPrice: 30000,
    buyPrice: 600000,
    expiredAt: new Date(Date.now() + 20 * 60 * 1000),
  },
  // Product 24
  {
    name: 'anthropologie dress 00P strappy sundress',
    descriptions: [
      `<p>anthropologie dress 00P strappy sundress.</p><p>Brand new.</p><p>Retails for $178.00</p>`,
    ],
    category: 5,
    images: [
      'public/images/uploads/anth_oop_1.jpg',
      'public/images/uploads/anth_oop_2.jpg',
      'public/images/uploads/anth_oop_3.jpg',
      'public/images/uploads/anth_oop_4.jpg',
    ],
    seller: 1,
    startPrice: 800000,
    currentPrice: 800000,
    stepPrice: 50000,
    buyPrice: 1900000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 25
  {
    name: 'Silver Pleated Skirt Size 18 New With Tags',
    descriptions: [
      `<p>Gorgeous Silver Pleated Skirt</p><p>Size 18</p><p>New With Tags</p><p>Very pretty silver skirt from Marks and Spencer. Would fit a size 16 if you like to wear your skirts lower on the hips. Side zip fastening</p><p>Approx 31 inches from top of waistband to hem</p><p>Gorgeous for Christmas!</p>`,
    ],
    category: 5,
    images: [
      'public/images/uploads/silver_dress_1.jpg',
      'public/images/uploads/silver_dress_2.jpg',
      'public/images/uploads/silver_dress_3.jpg',
      'public/images/uploads/silver_dress_4.jpg',
    ],
    seller: 1,
    startPrice: 200000,
    currentPrice: 200000,
    stepPrice: 20000,
    buyPrice: 600000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 26
  {
    name: 'Black pleated skirt size 10',
    descriptions: [
      `<p>anthropologie dress 00P strappy sundress.</p><p>Brand new.</p><p>Retails for $178.00</p>`,
    ],
    category: 5,
    images: [
      'public/images/uploads/black_skirt_1.jpg',
      'public/images/uploads/black_skirt_2.jpg',
      'public/images/uploads/black_skirt_3.jpg',
      'public/images/uploads/black_skirt_4.jpg',
    ],
    seller: 3,
    startPrice: 100000,
    currentPrice: 100000,
    stepPrice: 10000,
    buyPrice: 400000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Category 6
  // Product 27
  {
    name: 'Nike Dunk High ‘Black Action Red’ Size UK8,5,EU42.',
    descriptions: [
      `<p>Nike Dunk High &lsquo;Black Action Red&rsquo; Size UK8,5,EU42.</p><p>Nice pair in good condition.</p><p>They are worn as you can see on pictures but still have a lot of life left.</p><p>Light creasing toe boxes , light wear bottom soles and little damage tight heel.</p><p>See pics!</p><p>They don&rsquo;t have their original box unfortunately.</p>`,
    ],
    category: 6,
    images: [
      'public/images/uploads/nike_dunk_1.jpg',
      'public/images/uploads/nike_dunk_2.jpg',
      'public/images/uploads/nike_dunk_3.jpg',
      'public/images/uploads/nike_dunk_4.jpg',
    ],
    seller: 3,
    startPrice: 2000000,
    currentPrice: 2000000,
    stepPrice: 100000,
    isAutoRenew: true,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 28
  {
    name: 'Size UK 9 - ADIDAS ULTRABOOST 5.0 DNA SHOES - £140RRP - BLACK/WHITE',
    descriptions: [
      `<div>Size UK 9 - Adidas UltraBoost 21 Cloud White 2021 - &pound;160RRP.</div>`,
    ],
    category: 6,
    images: [
      'public/images/uploads/adidas_ultraboost_1.jpg',
      'public/images/uploads/adidas_ultraboost_2.jpg',
      'public/images/uploads/adidas_ultraboost_3.jpg',
      'public/images/uploads/adidas_ultraboost_4.jpg',
    ],
    seller: 3,
    startPrice: 1000000,
    currentPrice: 1000000,
    stepPrice: 100000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Category 7
  // Product 29
  {
    name: 'Fitness Pull Rope Tube Resistance Elastic Bands Yoga Gym Exercise Training',
    descriptions: [
      `<p>Package included:<br />1 x Fitness Rope Tube<br /><br />Specification:<br />- Color: Red, Green, Black, Yellow (Optional)<br />- Diameter: 5x11mm(Black), 5x10mm(Blue), 6x9mm(Green), 5x9mm(Red), 5x8mm(Yellow)<br />- Yellow (5-10LB), Red (8-18LB), Blue (18-25LB), green (15-20LB) and Black (25-35LB)<br />- Pipe length: 120CM<br />- Material: TPE<br /><br />Features:<br />● ELASTIC EXERCISE TUBE: Made of quality TPE. Exercise tube length is about 120cm/ 47.25'', total length is 135cm/ 53.15".<br />● COMFORTABLE HANDLE: Cushioned foam handles, anti-slip, easy to absorb sweat.<br />● FITNESS GOAL: Offer the versatility and quality that you need for your best workout. You can use it to increase cardio, build muscle, lose weight and enhance flexibility.<br />● UNISEX RESISTANCE BAND: Adults can use the exercise band for any exercise to tone the arms, legs, thighs, and butt.<br />● LIGHTWEIGHT &amp; PORTABLE: You can take your workout anywhere. Ideal for a wide variety of fitness-related uses, including physical therapy, weight loss, Pilates, muscle toning, muscle strengthening, stretching, rehabilitation and general health and fitness.</p>`,
    ],
    category: 7,
    images: [
      'public/images/uploads/fitness_rope_1.jpg',
      'public/images/uploads/fitness_rope_2.jpg',
      'public/images/uploads/fitness_rope_3.jpg',
      'public/images/uploads/fitness_rope_4.jpg',
    ],
    seller: 2,
    startPrice: 200000,
    currentPrice: 200000,
    stepPrice: 10000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Category 8
  // Product 30
  {
    name: 'Mens RH Golf Club DYNACRAFT Plus 8 Iron Blade Steel shaft',
    descriptions: [
      `<p>Mens RH Golf Club DYNACRAFT Plus 8 Iron Blade Steel shaft.</p>`,
    ],
    category: 8,
    images: [
      'public/images/uploads/golf_dynacraft_1.jpg',
      'public/images/uploads/golf_dynacraft_2.jpg',
      'public/images/uploads/golf_dynacraft_3.jpg',
      'public/images/uploads/golf_dynacraft_4.jpg',
    ],
    seller: 1,
    startPrice: 200000,
    currentPrice: 200000,
    stepPrice: 10000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 31
  {
    name: 'Callaway XR 10.5° Driver Project X Regular Flex Graphite Shaft golf pride Grip',
    descriptions: [
      `<p>Callaway XR 10.5&deg; Driver Project X Regular Flex 5.5 Graphite Shaft&nbsp;</p><div>golf pride Grip.<div>matching head cover</div><div>no wrench</div><div>nice condition</div><div>general play wear no sky marks or bag rub</div><div>golf pride mid size grip</div><div>free p and P</div></div>`,
    ],
    category: 8,
    images: [
      'public/images/uploads/golf_callaway_1.jpg',
      'public/images/uploads/golf_callaway_2.jpg',
      'public/images/uploads/golf_callaway_3.jpg',
      'public/images/uploads/golf_callaway_4.jpg',
    ],
    seller: 3,
    startPrice: 1000000,
    currentPrice: 1000000,
    stepPrice: 100000,
    expiredAt: new Date(Date.now() + 20 * 60 * 1000),
  },
  // Category 9
  // Product 32
  {
    name: '30cm Big Jumbo Pokemon Snorlax Plushie Pillow Cushion Plush Doll Toy Gift 12inch',
    descriptions: [
      `<div><strong>Description:</strong></div><div></div><div><strong>Condition: 100% New</strong></div><div><strong>Quantity: 1 piece</strong></div><div><strong>Material: High Quality Plush</strong></div><div><strong>Content: Polyester Fibers, cotton</strong></div><div><strong>Size: 12''</strong></div><div><strong>Packing: OPP bag</strong></div><div></div><div><strong>Please be sure to take a closer look at the size of the item,there may be 1-2 centimeters of error.&nbsp;</strong></div>`,
    ],
    category: 9,
    images: [
      'public/images/uploads/plushie_snorlax_1.jpg',
      'public/images/uploads/plushie_snorlax_2.jpg',
      'public/images/uploads/plushie_snorlax_3.jpg',
      'public/images/uploads/plushie_snorlax_4.jpg',
    ],
    seller: 1,
    startPrice: 300000,
    currentPrice: 300000,
    stepPrice: 20000,
    isAutoRenew: true,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 33
  {
    name: 'Barnsie Bear plushie color brown used with bow tie',
    descriptions: [
      `<p>Barnsie Bear plushie color brown used with bow tie.</p>`,
    ],
    category: 9,
    images: [
      'public/images/uploads/plushie_bear_1.jpg',
      'public/images/uploads/plushie_bear_2.jpg',
      'public/images/uploads/plushie_bear_3.jpg',
      'public/images/uploads/plushie_bear_4.jpg',
    ],
    seller: 1,
    startPrice: 100000,
    currentPrice: 100000,
    stepPrice: 20000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Category 10
  // Category 11
  // Product 34
  {
    name: 'Gretsch 6120 Electric Guitar In Good Condition Shipped Japan',
    descriptions: [
      `<p>This is a used item. There is a feeling of use. Please have a look at the photos.<br />■ Functional :<br />The operation works well.<br />The sound output is also no problem.<br />And the operation of each button is also comfortable.<br />■ Include :<br />Please confirm the accessories with photos.<br />All the accessories appearing in the photos are attached.<br />*If you want to know more details of condition, please feel free to contact me.</p>`,
    ],
    category: 11,
    images: [
      'public/images/uploads/guitar_gretsch_1.jpg',
      'public/images/uploads/guitar_gretsch_2.jpg',
      'public/images/uploads/guitar_gretsch_3.jpg',
      'public/images/uploads/guitar_gretsch_4.jpg',
    ],
    seller: 1,
    startPrice: 30000000,
    currentPrice: 30000000,
    stepPrice: 100000,
    isAutoRenew: true,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Product 35
  {
    name: 'Martin guitar Shipped from Japan Good condition Free shipping',
    descriptions: [
      `<p>Since it is a new and unused item- there is no reduction in frets.<br /><br />You can customize the string height as you like.<br /><br />It is so elaborately made that it is indistinguishable from the real thing- such as the dummy serial number engraved inside.<br /><br />Its a guitar that is mostly used in style- but the sound is surprisingly good.<br />(Subjective.</p>`,
    ],
    category: 11,
    images: [
      'public/images/uploads/guitar_martin_1.jpg',
      'public/images/uploads/guitar_martin_2.jpg',
      'public/images/uploads/guitar_martin_3.jpg',
      'public/images/uploads/guitar_martin_4.jpg',
    ],
    seller: 1,
    startPrice: 18000000,
    currentPrice: 18000000,
    stepPrice: 100000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  // Category 12
  // Category 13
  // Product 36
  {
    name: 'Yamaha NS-10M Speaker System Studio Monitors Used From Japan',
    descriptions: [
      `<p><strong>Condition:</strong><strong>Used</strong></p><p>・Achieved sales of more than 300,000 units<br />・An 18cm cone woofer is mounted in the low frequency range.<br />・18cm cone woofer for low frequency range and 3.5cm soft dome tweeter for high frequency range<br />・High sound quality<br />・Sealed cabinet</p>`,
    ],
    category: 13,
    images: [
      'public/images/uploads/speaker_yamaha_1.png',
      'public/images/uploads/speaker_yamaha_2.png',
      'public/images/uploads/speaker_yamaha_3.png',
      'public/images/uploads/speaker_yamaha_4.png',
      'public/images/uploads/speaker_yamaha_5.png',
    ],
    seller: 1,
    startPrice: 7000000,
    currentPrice: 7000000,
    stepPrice: 50000,
    expiredAt: new Date(Date.now() + 30 * 60 * 1000),
  },
];

export const bidSeeds: BidSeed[] = [
  // Product 0
  {
    bidder: 4,
    product: 0,
    price: 130000,
  },
  {
    bidder: 5,
    product: 0,
    price: 160000,
  },
  {
    bidder: 6,
    product: 0,
    price: 190000,
  },
  {
    bidder: 5,
    product: 0,
    price: 220000,
  },
  {
    bidder: 4,
    product: 0,
    price: 250000,
  },
  // Product 1
  {
    bidder: 7,
    product: 1,
    price: 1520000,
  },
  {
    bidder: 4,
    product: 1,
    price: 1540000,
  },
  {
    bidder: 7,
    product: 1,
    price: 1560000,
  },
  {
    bidder: 4,
    product: 1,
    price: 1580000,
  },
  {
    bidder: 7,
    product: 1,
    price: 1600000,
  },
  // Product 2
  {
    bidder: 5,
    product: 2,
    price: 2100000,
  },
  {
    bidder: 7,
    product: 2,
    price: 2200000,
  },
  {
    bidder: 5,
    product: 2,
    price: 2300000,
  },
  {
    bidder: 7,
    product: 2,
    price: 2400000,
  },
  {
    bidder: 5,
    product: 2,
    price: 2600000,
  },
  // Product 3
  {
    bidder: 6,
    product: 3,
    price: 1700000,
  },
  {
    bidder: 7,
    product: 3,
    price: 1900000,
  },
  {
    bidder: 6,
    product: 3,
    price: 2100000,
  },
  {
    bidder: 7,
    product: 3,
    price: 2300000,
  },
  {
    bidder: 6,
    product: 3,
    price: 2500000,
  },
  // Product 4
  {
    bidder: 5,
    product: 4,
    price: 1050000,
  },
  {
    bidder: 6,
    product: 4,
    price: 1100000,
  },
  {
    bidder: 5,
    product: 4,
    price: 1150000,
  },
  {
    bidder: 4,
    product: 4,
    price: 1200000,
  },
  {
    bidder: 5,
    product: 4,
    price: 1250000,
  },
  // Product 5
  {
    bidder: 4,
    product: 5,
    price: 15100000,
  },
  {
    bidder: 7,
    product: 5,
    price: 15200000,
  },
  {
    bidder: 4,
    product: 5,
    price: 15300000,
  },
  {
    bidder: 7,
    product: 5,
    price: 15400000,
  },
  {
    bidder: 4,
    product: 5,
    price: 15500000,
  },
  // Product 6
  {
    bidder: 6,
    product: 6,
    price: 16100000,
  },
  {
    bidder: 5,
    product: 6,
    price: 16200000,
  },
  {
    bidder: 6,
    product: 6,
    price: 16300000,
  },
  {
    bidder: 5,
    product: 6,
    price: 16400000,
  },
  {
    bidder: 6,
    product: 6,
    price: 16500000,
  },
  // Product 7
  {
    bidder: 4,
    product: 7,
    price: 3050000,
  },
  {
    bidder: 6,
    product: 7,
    price: 3100000,
  },
  {
    bidder: 4,
    product: 7,
    price: 3150000,
  },
  {
    bidder: 6,
    product: 7,
    price: 3200000,
  },
  {
    bidder: 4,
    product: 7,
    price: 3250000,
  },
  // Product 8
  {
    bidder: 4,
    product: 8,
    price: 15300000,
  },
  {
    bidder: 5,
    product: 8,
    price: 15600000,
  },
  {
    bidder: 4,
    product: 8,
    price: 15900000,
  },
  {
    bidder: 5,
    product: 8,
    price: 16200000,
  },
  {
    bidder: 4,
    product: 8,
    price: 16500000,
  },
  // Product 9
  {
    bidder: 7,
    product: 9,
    price: 8200000,
  },
  {
    bidder: 5,
    product: 9,
    price: 8400000,
  },
  {
    bidder: 7,
    product: 9,
    price: 8600000,
  },
  {
    bidder: 5,
    product: 9,
    price: 8800000,
  },
  {
    bidder: 7,
    product: 9,
    price: 9000000,
  },
  // Product 10
  {
    bidder: 6,
    product: 10,
    price: 10200000,
  },
  {
    bidder: 7,
    product: 10,
    price: 10400000,
  },
  {
    bidder: 6,
    product: 10,
    price: 10600000,
  },
  {
    bidder: 7,
    product: 10,
    price: 10800000,
  },
  {
    bidder: 6,
    product: 10,
    price: 11000000,
  },
  // Product 11
  {
    bidder: 5,
    product: 11,
    price: 2600000,
  },
  {
    bidder: 4,
    product: 11,
    price: 2800000,
  },
  {
    bidder: 5,
    product: 11,
    price: 2900000,
  },
  {
    bidder: 4,
    product: 11,
    price: 3000000,
  },
  {
    bidder: 6,
    product: 11,
    price: 3100000,
  },
  // Product 12
  {
    bidder: 6,
    product: 12,
    price: 4100000,
  },
  {
    bidder: 7,
    product: 12,
    price: 4200000,
  },
  {
    bidder: 6,
    product: 12,
    price: 4300000,
  },
  {
    bidder: 7,
    product: 12,
    price: 4400000,
  },
  {
    bidder: 6,
    product: 12,
    price: 4500000,
  },
  // Product 13
  {
    bidder: 4,
    product: 13,
    price: 18100000,
  },
  {
    bidder: 5,
    product: 13,
    price: 18200000,
  },
  {
    bidder: 4,
    product: 13,
    price: 18300000,
  },
  {
    bidder: 5,
    product: 13,
    price: 18400000,
  },
  {
    bidder: 4,
    product: 13,
    price: 18600000,
  },
  // Product 14
  {
    bidder: 6,
    product: 14,
    price: 4100000,
  },
  {
    bidder: 5,
    product: 14,
    price: 4200000,
  },
  {
    bidder: 6,
    product: 14,
    price: 4300000,
  },
  {
    bidder: 5,
    product: 14,
    price: 4400000,
  },
  {
    bidder: 6,
    product: 14,
    price: 4500000,
  },
  // Product 15
  {
    bidder: 7,
    product: 15,
    price: 10100000,
  },
  {
    bidder: 4,
    product: 15,
    price: 10200000,
  },
  {
    bidder: 7,
    product: 15,
    price: 10300000,
  },
  {
    bidder: 4,
    product: 15,
    price: 10400000,
  },
  {
    bidder: 7,
    product: 15,
    price: 10500000,
  },
  // Product 16
  {
    bidder: 5,
    product: 16,
    price: 5100000,
  },
  {
    bidder: 4,
    product: 16,
    price: 5200000,
  },
  {
    bidder: 7,
    product: 16,
    price: 5300000,
  },
  {
    bidder: 4,
    product: 16,
    price: 5400000,
  },
  {
    bidder: 7,
    product: 16,
    price: 5500000,
  },
  // Product 17
  {
    bidder: 4,
    product: 17,
    price: 1050000,
  },
  {
    bidder: 7,
    product: 17,
    price: 1100000,
  },
  {
    bidder: 5,
    product: 17,
    price: 1150000,
  },
  {
    bidder: 4,
    product: 17,
    price: 1200000,
  },
  {
    bidder: 7,
    product: 17,
    price: 1250000,
  },
  // Product 18
  {
    bidder: 6,
    product: 18,
    price: 6100000,
  },
  {
    bidder: 5,
    product: 18,
    price: 6200000,
  },
  {
    bidder: 6,
    product: 18,
    price: 6300000,
  },
  {
    bidder: 5,
    product: 18,
    price: 6400000,
  },
  {
    bidder: 6,
    product: 18,
    price: 6500000,
  },
  // Product 19
  {
    bidder: 6,
    product: 19,
    price: 4100000,
  },
  {
    bidder: 5,
    product: 19,
    price: 4200000,
  },
  {
    bidder: 6,
    product: 19,
    price: 4300000,
  },
  {
    bidder: 5,
    product: 19,
    price: 4400000,
  },
  {
    bidder: 6,
    product: 19,
    price: 4500000,
  },
  // Product 20
  {
    bidder: 4,
    product: 20,
    price: 430000,
  },
  {
    bidder: 5,
    product: 20,
    price: 460000,
  },
  {
    bidder: 4,
    product: 20,
    price: 490000,
  },
  {
    bidder: 5,
    product: 20,
    price: 520000,
  },
  {
    bidder: 7,
    product: 20,
    price: 550000,
  },
  // Product 21
  {
    bidder: 6,
    product: 21,
    price: 420000,
  },
  {
    bidder: 5,
    product: 21,
    price: 440000,
  },
  {
    bidder: 4,
    product: 21,
    price: 460000,
  },
  {
    bidder: 5,
    product: 21,
    price: 480000,
  },
  {
    bidder: 7,
    product: 21,
    price: 500000,
  },
  // Product 22
  {
    bidder: 5,
    product: 22,
    price: 120000,
  },
  {
    bidder: 4,
    product: 22,
    price: 140000,
  },
  {
    bidder: 5,
    product: 22,
    price: 160000,
  },
  {
    bidder: 4,
    product: 22,
    price: 180000,
  },
  {
    bidder: 5,
    product: 22,
    price: 200000,
  },
  // Product 23
  {
    bidder: 4,
    product: 23,
    price: 230000,
  },
  {
    bidder: 7,
    product: 23,
    price: 260000,
  },
  {
    bidder: 4,
    product: 23,
    price: 290000,
  },
  {
    bidder: 7,
    product: 23,
    price: 320000,
  },
  {
    bidder: 4,
    product: 23,
    price: 350000,
  },
  // Product 24
  {
    bidder: 4,
    product: 24,
    price: 850000,
  },
  {
    bidder: 7,
    product: 24,
    price: 900000,
  },
  {
    bidder: 4,
    product: 24,
    price: 950000,
  },
  {
    bidder: 7,
    product: 24,
    price: 1000000,
  },
  {
    bidder: 4,
    product: 24,
    price: 1050000,
  },
  // Product 25
  {
    bidder: 4,
    product: 25,
    price: 220000,
  },
  {
    bidder: 7,
    product: 25,
    price: 240000,
  },
  {
    bidder: 4,
    product: 25,
    price: 260000,
  },
  {
    bidder: 7,
    product: 25,
    price: 280000,
  },
  {
    bidder: 4,
    product: 25,
    price: 300000,
  },
  // Product 26
  {
    bidder: 4,
    product: 26,
    price: 110000,
  },
  {
    bidder: 7,
    product: 26,
    price: 120000,
  },
  {
    bidder: 4,
    product: 26,
    price: 130000,
  },
  {
    bidder: 7,
    product: 26,
    price: 140000,
  },
  {
    bidder: 4,
    product: 26,
    price: 150000,
  },
  // Product 27
  {
    bidder: 4,
    product: 27,
    price: 2100000,
  },
  {
    bidder: 7,
    product: 27,
    price: 2200000,
  },
  {
    bidder: 4,
    product: 27,
    price: 2300000,
  },
  {
    bidder: 7,
    product: 27,
    price: 2400000,
  },
  {
    bidder: 4,
    product: 27,
    price: 2500000,
  },
  // Product 28
  {
    bidder: 4,
    product: 28,
    price: 1100000,
  },
  {
    bidder: 7,
    product: 28,
    price: 1200000,
  },
  {
    bidder: 4,
    product: 28,
    price: 1300000,
  },
  {
    bidder: 7,
    product: 28,
    price: 1400000,
  },
  {
    bidder: 4,
    product: 28,
    price: 1500000,
  },
  // Product 29
  {
    bidder: 4,
    product: 29,
    price: 210000,
  },
  {
    bidder: 7,
    product: 29,
    price: 220000,
  },
  {
    bidder: 4,
    product: 29,
    price: 230000,
  },
  {
    bidder: 7,
    product: 29,
    price: 240000,
  },
  {
    bidder: 4,
    product: 29,
    price: 250000,
  },
  // Product 30
  {
    bidder: 4,
    product: 30,
    price: 210000,
  },
  {
    bidder: 7,
    product: 30,
    price: 220000,
  },
  {
    bidder: 4,
    product: 30,
    price: 230000,
  },
  {
    bidder: 7,
    product: 30,
    price: 240000,
  },
  {
    bidder: 4,
    product: 30,
    price: 250000,
  },
  // Product 31
  {
    bidder: 4,
    product: 31,
    price: 1100000,
  },
  {
    bidder: 7,
    product: 31,
    price: 1200000,
  },
  {
    bidder: 4,
    product: 31,
    price: 1300000,
  },
  {
    bidder: 7,
    product: 31,
    price: 1400000,
  },
  {
    bidder: 4,
    product: 31,
    price: 1500000,
  },
  // Product 32
  {
    bidder: 4,
    product: 32,
    price: 320000,
  },
  {
    bidder: 7,
    product: 32,
    price: 340000,
  },
  {
    bidder: 4,
    product: 32,
    price: 360000,
  },
  {
    bidder: 7,
    product: 32,
    price: 380000,
  },
  {
    bidder: 4,
    product: 32,
    price: 400000,
  },
  // Product 33
  {
    bidder: 4,
    product: 33,
    price: 120000,
  },
  {
    bidder: 7,
    product: 33,
    price: 140000,
  },
  {
    bidder: 4,
    product: 33,
    price: 160000,
  },
  {
    bidder: 7,
    product: 33,
    price: 180000,
  },
  {
    bidder: 4,
    product: 33,
    price: 200000,
  },
  // Product 34
  {
    bidder: 4,
    product: 34,
    price: 30100000,
  },
  {
    bidder: 7,
    product: 34,
    price: 30200000,
  },
  {
    bidder: 4,
    product: 34,
    price: 30300000,
  },
  {
    bidder: 7,
    product: 34,
    price: 30400000,
  },
  {
    bidder: 4,
    product: 34,
    price: 30500000,
  },
  // Product 35
  {
    bidder: 4,
    product: 35,
    price: 18100000,
  },
  {
    bidder: 7,
    product: 35,
    price: 18200000,
  },
  {
    bidder: 4,
    product: 35,
    price: 18300000,
  },
  {
    bidder: 7,
    product: 35,
    price: 18400000,
  },
  {
    bidder: 4,
    product: 35,
    price: 18500000,
  },
  // Product 36
  {
    bidder: 4,
    product: 36,
    price: 7050000,
  },
  {
    bidder: 7,
    product: 36,
    price: 7100000,
  },
  {
    bidder: 4,
    product: 36,
    price: 7150000,
  },
  {
    bidder: 7,
    product: 36,
    price: 7200000,
  },
  {
    bidder: 4,
    product: 36,
    price: 7250000,
  },
]
