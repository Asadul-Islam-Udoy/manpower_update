//Bangladesh all division

const bangladeshDivisions = [
    { id: 100, division_name: "Dhaka" },
    { id: 101, division_name: "Chattogram" },
    { id: 102, division_name: "Khulna" },
    { id: 103, division_name: "Rajshahi" },
    { id: 104, division_name: "Barishal" },
    { id: 105, division_name: "Sylhet" },
    { id: 106, division_name: "Rangpur" },
    { id: 107, division_name: "Mymensingh" },
  ];
  
  // division with districts
  
  const divisionsWithDistricts = [
    {
      division_id: 100,
      districts: [
        { id: 1001, district_name: "Dhaka" },
        { id: 1002, district_name: "Narayanganj" },
        { id: 1003, district_name: "Narsingdi" },
        { id: 1004, district_name: "Manikganj" },
        { id: 1005, district_name: "Munshiganj" },
        { id: 1006, district_name: "Gazipur" },
        { id: 1007, district_name: "Tangail" },
        { id: 1008, district_name: "Kishoreganj" },
        { id: 1009, district_name: "Shariatpur" },
        { id: 1010, district_name: "Madaripur" },
        { id: 1011, district_name: "Netrokona" },
        { id: 1012, district_name: "Faridpur" },
        { id: 1013, district_name: "Gopalganj" },
        { id: 1014, district_name: "Rajbari" },
      ],
    },
    {
      division_id: 101,
      districts: [
        { id: 1015, district_name: "Chattogram" },
        { id: 1016, district_name: "Cox's Bazar" },
        { id: 1017, district_name: "Cumilla" },
        { id: 1018, district_name: "Feni" },
        { id: 1019, district_name: "Lakshmipur" },
        { id: 1020, district_name: "Noakhali" },
        { id: 1021, district_name: "Rangamati" },
        { id: 1022, district_name: "Khagrachari" },
        { id: 1023, district_name: "Bandarban" },
        { id: 1024, district_name: "Brambon Bariya" },
        { id: 1025, district_name: "Chandpur" },
      ],
    },
    {
      division_id: 102,
      districts: [
        { id: 1026, district_name: "Khulna" },
        { id: 1027, district_name: "Bagerhat" },
        { id: 1028, district_name: "Chuadanga" },
        { id: 1029, district_name: "Jashore" },
        { id: 1030, district_name: "Jhenaidah" },
        { id: 1031, district_name: "Kushtia" },
        { id: 1032, district_name: "Magura" },
        { id: 1033, district_name: "Meherpur" },
        { id: 1034, district_name: "Narail" },
        { id: 1035, district_name: "Satkhira" },
      ],
    },
    {
      division_id: 103,
      districts: [
        { id: 1036, district_name: "Rajshahi" },
        { id: 1037, district_name: "Bogra" },
        { id: 1038, district_name: "Joypurhat" },
        { id: 1039, district_name: "Naogaon" },
        { id: 1040, district_name: "Natore" },
        { id: 1041, district_name: "Pabna" },
        { id: 1042, district_name: "Chapainawabganj" },
        { id: 1043, district_name: "Sherpur" },
      ],
    },
    {
      division_id: 104,
      districts: [
        { id: 1044, district_name: "Barishal" },
        { id: 1045, district_name: "Bhola" },
        { id: 1046, district_name: "Jhalokati" },
        { id: 1047, district_name: "Barguna" },
        { id: 1048, district_name: "Patuakhali" },
        { id: 1049, district_name: "Pirojpur" },
      ],
    },
    {
      division_id: 105,
      districts: [
        { id: 1050, district_name: "Sylhet" },
        { id: 1051, district_name: "Moulvibazar" },
        { id: 1052, district_name: "Habiganj" },
        { id: 1053, district_name: "Sunamganj" },
      ],
    },
    {
      division_id: 106,
      districts: [
        { id: 1054, district_name: "Rangpur" },
        { id: 1055, district_name: "Dinajpur" },
        { id: 1056, district_name: "Kurigram" },
        { id: 1057, district_name: "Lalmonirhat" },
        { id: 1058, district_name: "Nilphamari" },
        { id: 1059, district_name: "Panchagarh" },
        { id: 1060, district_name: "Thakurgaon" },
        { id: 1061, district_name: "Gaibandha" },
      ],
    },
    {
      division_id: 107,
      districts: [
        { id: 1062, district_name: "Mymensingh" },
        { id: 1063, district_name: "Jamalpur" },
        { id: 1064, district_name: "Sherpur" },
        { id: 1065, district_name: "Netrokona" },
      ],
    },
  ];
  
  // district with  upzila
  
  const districtWithUpzila = [
    {
      district_id: 1001,
      upazilas: [
        { id: 5001, upazila_name: "Dhamrai" },
        { id: 5002, upazila_name: "Dohar" },
        { id: 5003, upazila_name: "Keraniganj" },
        { id: 5004, upazila_name: "Nawabganj" },
        { id: 5005, upazila_name: "Savar" },
      ],
    },
    {
      district_id: 1002,
      upazilas: [
        { id: 5006, upazila_name: "Narayanganj Sadar" },
        { id: 5007, upazila_name: "Araihazar" },
        { id: 5008, upazila_name: "Narayanganj" },
        { id: 5009, upazila_name: "Sonargaon" },
        { id: 5010, upazila_name: "Bandar" },
      ],
    },
    {
      district_id: 1003,
      upazilas: [
        { id: 5011, upazila_name: "Narsingdi Sadar" },
        { id: 5012, upazila_name: "Belabo" },
        { id: 5013, upazila_name: "Monohordi" },
        { id: 5014, upazila_name: "Shibpur" },
        { id: 5015, upazila_name: "Raipura" },
        { id: 5016, upazila_name: "Palash" },
      ],
    },
    {
      district_id: 1004,
      upazilas: [
        { id: 5017, upazila_name: "Manikganj Sadar" },
        { id: 5018, upazila_name: "Saturia" },
        { id: 5019, upazila_name: "Shivalaya" },
        { id: 5020, upazila_name: "Singair" },
        { id: 5021, upazila_name: "Harirampur" },
        { id: 5022, upazila_name: "Daulatpur" },
        { id: 5023, upazila_name: "Ghior" },
      ],
    },
    {
      district_id: 1005,
      upazilas: [
        { id: 5024, upazila_name: "Munshiganj Sadar" },
        { id: 5025, upazila_name: "Sreenagar" },
        { id: 5026, upazila_name: "Sirajdikhan" },
        { id: 5027, upazila_name: "Tongibari" },
        { id: 5028, upazila_name: "Louhajang" },
        { id: 5029, upazila_name: "Gazaria" },
      ],
    },
    {
      district_id: 1006,
      upazilas: [
        { id: 5030, upazila_name: "Gazipur Sadar" },
        { id: 5031, upazila_name: "Kaliakair" },
        { id: 5032, upazila_name: "Sreepur" },
        { id: 5033, upazila_name: "Kapasia" },
        { id: 5034, upazila_name: "Kaliganj" },
      ],
    },
    {
      district_id: 1007,
      upazilas: [
        { id: 5035, upazila_name: "Tangail Sadar" },
        { id: 5036, upazila_name: "Ghatail" },
        { id: 5037, upazila_name: "Kalihati" },
        { id: 5038, upazila_name: "Nagarpur" },
        { id: 5039, upazila_name: "Dhanbari" },
        { id: 5040, upazila_name: "Basail" },
        { id: 5041, upazila_name: "Bhuapur" },
        { id: 5042, upazila_name: "Delduar" },
        { id: 5043, upazila_name: "Gopalpur" },
        { id: 5044, upazila_name: "Madhupur" },
        { id: 5045, upazila_name: "Mirzapur" },
        { id: 5046, upazila_name: "Shakhipur" },
      ],
    },
    {
      district_id: 1008,
      upazilas: [
        { id: 5047, upazila_name: "Kishoreganj Sadar" },
        { id: 5048, upazila_name: "Nikli" },
        { id: 5049, upazila_name: "Itna" },
        { id: 5050, upazila_name: "Tarail" },
        { id: 5051, upazila_name: "Hossainpur" },
        { id: 5052, upazila_name: "Austagram" },
        { id: 5053, upazila_name: "Bajitpur" },
        { id: 5054, upazila_name: "Bhairab" },
        { id: 5055, upazila_name: "Karimganj" },
        { id: 5056, upazila_name: "Katiadi" },
        { id: 5057, upazila_name: "Kuliarchar" },
        { id: 5058, upazila_name: "Mithamoin" },
        { id: 5059, upazila_name: "Pakundia" },
      ],
    },
    {
      district_id: 1009,
      upazilas: [
        { id: 5060, upazila_name: "Shariatpur Sadar" },
        { id: 5061, upazila_name: "Naria" },
        { id: 5062, upazila_name: "Jajira" },
        { id: 5063, upazila_name: "Bhedarganj" },
        { id: 5064, upazila_name: "Gosairhat" },
        { id: 5065, upazila_name: "Damuddya" },
      ],
    },
    {
      district_id: 1010,
      upazilas: [
        { id: 5066, upazila_name: "Madaripur Sadar" },
        { id: 5067, upazila_name: "Shibchar" },
        { id: 5068, upazila_name: "Kalkini" },
        { id: 5069, upazila_name: "Rajoir" },
        { id: 5070, upazila_name: "Zajira" },
      ],
    },
    {
      district_id: 1011,
      upazilas: [
        { id: 5071, upazila_name: "Netrokona Sadar" },
        { id: 5072, upazila_name: "Barhatta" },
        { id: 5073, upazila_name: "Khaliajuri" },
        { id: 5074, upazila_name: "Durgapur" },
        { id: 5075, upazila_name: "Atpara" },
        { id: 5076, upazila_name: "Kenduli" },
        { id: 5077, upazila_name: "Purbadhala" },
        { id: 5078, upazila_name: "Mohanganj" },
        { id: 5079, upazila_name: "Netrokona" },
        { id: 5080, upazila_name: "Khaliajuri" },
      ],
    },
    {
      district_id: 1012,
      upazilas: [
        { id: 5081, upazila_name: "Faridpur Sadar" },
        { id: 5082, upazila_name: "Alfadanga" },
        { id: 5083, upazila_name: "Bhanga" },
        { id: 5084, upazila_name: "Boalmari" },
        { id: 5085, upazila_name: "Charbhadrasan" },
        { id: 5086, upazila_name: "Madhukhali" },
        { id: 5087, upazila_name: "Nagarkanda" },
        { id: 5088, upazila_name: "Sadarpur" },
        { id: 5089, upazila_name: "Saltha" },
      ],
    },
    {
      district_id: 1013,
      upazilas: [
        { id: 5090, upazila_name: "Gopalganj Sadar" },
        { id: 5091, upazila_name: "Kashiani" },
        { id: 5092, upazila_name: "Tungipara" },
        { id: 5093, upazila_name: "Kotwalipara" },
        { id: 5094, upazila_name: "Muksudpur" },
      ],
    },
    {
      district_id: 1014,
      upazilas: [
        { id: 5095, upazila_name: "Rajbari Sadar" },
        { id: 5096, upazila_name: "Kalukhali" },
        { id: 5097, upazila_name: "Goalondo" },
        { id: 5098, upazila_name: "Baliakandi" },
        { id: 5099, upazila_name: "Pangsha" },
      ],
    },
  
    //   chattogram divison
  
    {
      district_id: 1015,
      upazilas: [
        { id: 5071, upazila_name: "Chattogram Sadar" },
        { id: 5072, upazila_name: "Patiya" },
        { id: 5073, upazila_name: "Fatikchhari" },
        { id: 5074, upazila_name: "Mirsharai" },
        { id: 5075, upazila_name: "Sandwip" },
        { id: 5076, upazila_name: "Rangunia" },
        { id: 5077, upazila_name: "Sitakunda" },
        { id: 5078, upazila_name: "Banskhali" },
        { id: 5079, upazila_name: "Boalkhali" },
        { id: 5080, upazila_name: "Hathazari" },
        { id: 5081, upazila_name: "Anwara" },
        { id: 5082, upazila_name: "Fatikchhari" },
        { id: 5083, upazila_name: "Raozan" },
        { id: 5084, upazila_name: "Satkania" },
        { id: 1114, upazila_name: "Chandanish" },
        { id: 1115, upazila_name: "Karnaphuli" },
        { id: 1116, upazila_name: "Lohagara" },
      ],
    },
    {
      district_id: 1016,
      upazilas: [
        { id: 5085, upazila_name: "Cox's Bazar Sadar" },
        { id: 5086, upazila_name: "Teknaf" },
        { id: 5087, upazila_name: "Ukhiya" },
        { id: 5088, upazila_name: "Ramu" },
        { id: 5089, upazila_name: "Maheshkhali" },
        { id: 5090, upazila_name: "Kutubdia" },
        { id: 5091, upazila_name: "Chakaria" },
        { id: 1117, upazila_name: "Pekua" },
      ],
    },
    {
      district_id: 1017,
      upazilas: [
        { id: 5092, upazila_name: "Cumilla Sadar" },
        { id: 5093, upazila_name: "Titas" },
        { id: 5094, upazila_name: "Debidwar" },
        { id: 5095, upazila_name: "Muradnagar" },
        { id: 5096, upazila_name: "Barura" },
        { id: 5097, upazila_name: "Brahmanpara" },
        { id: 5098, upazila_name: "Nangalkot" },
        { id: 5099, upazila_name: "Laksam" },
        { id: 5100, upazila_name: "Homna" },
        { id: 5101, upazila_name: "Chandina" },
        { id: 5101, upazila_name: "Burichong" },
        { id: 5101, upazila_name: "Chouddagram" },
        { id: 5101, upazila_name: "Daudkandi" },
        { id: 5101, upazila_name: "Lalmai" },
        { id: 5101, upazila_name: "Meghna" },
        { id: 5101, upazila_name: "Monohorganj" },
      ],
    },
    {
      district_id: 1018,
      upazilas: [
        { id: 5102, upazila_name: "Feni Sadar" },
        { id: 5103, upazila_name: "Daganbhuiyan" },
        { id: 5104, upazila_name: "Parshuram" },
        { id: 5105, upazila_name: "Chhagalnaiya" },
        { id: 5106, upazila_name: "Fulgazi" },
        { id: 5107, upazila_name: "Sonagazi" },
      ],
    },
    {
      district_id: 1019,
      upazilas: [
        { id: 5108, upazila_name: "Lakshmipur Sadar" },
        { id: 5109, upazila_name: "Raipur" },
        { id: 5110, upazila_name: "Ramganj" },
        { id: 5111, upazila_name: "Ramgati" },
        { id: 5112, upazila_name: "Kamolnagar" },
      ],
    },
    {
      district_id: 1020,
      upazilas: [
        { id: 5113, upazila_name: "Noakhali Sadar" },
        { id: 5114, upazila_name: "Companiganj" },
        { id: 5115, upazila_name: "Chatkhil" },
        { id: 5116, upazila_name: "Sonaimuri" },
        { id: 5117, upazila_name: "Begumganj" },
        { id: 5118, upazila_name: "Subarnachar" },
        { id: 5119, upazila_name: "Hatiya" },
        { id: 5119, upazila_name: "Kabir Hat" },
        { id: 5119, upazila_name: "Senbag" },
      ],
    },
    {
      district_id: 1021,
      upazilas: [
        { id: 5120, upazila_name: "Rangamati Sadar" },
        { id: 5121, upazila_name: "Baghaichhari" },
        { id: 5122, upazila_name: "Barkal" },
        { id: 5123, upazila_name: "Kaptai" },
        { id: 5124, upazila_name: "Juraichhari" },
        { id: 5125, upazila_name: "Belaichari" },
        { id: 5126, upazila_name: "Langadu" },
        { id: 5126, upazila_name: "Kaukhali" },
        { id: 5126, upazila_name: "Nanniarchar" },
        { id: 5126, upazila_name: "Rajosthali" },
      ],
    },
    {
      district_id: 1022,
      upazilas: [
        { id: 5127, upazila_name: "Khagrachari Sadar" },
        { id: 5128, upazila_name: "Dighinala" },
        { id: 5129, upazila_name: "Lakshmichhari" },
        { id: 5130, upazila_name: "Manikchhari" },
        { id: 5131, upazila_name: "Mahalchhari" },
        { id: 5132, upazila_name: "Panchhari" },
        { id: 5132, upazila_name: "Guimara" },
        { id: 5132, upazila_name: "Matiranga" },
        { id: 5132, upazila_name: "Ramgarh" },
      ],
    },
    {
      district_id: 1023,
      upazilas: [
        { id: 5133, upazila_name: "Bandarban Sadar" },
        { id: 5134, upazila_name: "Thanchi" },
        { id: 5135, upazila_name: "Rowangchhari" },
        { id: 5136, upazila_name: "Lama" },
        { id: 5137, upazila_name: "Ruma" },
        { id: 5138, upazila_name: "Naikhongchhari" },
        { id: 5138, upazila_name: "Alikadam" },
      ],
    },
    {
      district_id: 1024,
      upazilas: [
        { id: 5139, upazila_name: "Brahmanbaria Sadar" },
        { id: 5140, upazila_name: "Ashuganj" },
        { id: 5141, upazila_name: "Sarail" },
        { id: 5142, upazila_name: "Nabinagar" },
        { id: 5143, upazila_name: "Bancharampur" },
        { id: 5144, upazila_name: "Kasba" },
        { id: 5145, upazila_name: "Akhaura" },
        { id: 5146, upazila_name: "Nasirnagar" },
      ],
    },
    {
      district_id: 1025,
      upazilas: [
        { id: 5147, upazila_name: "Chandpur Sadar" },
        { id: 5148, upazila_name: "Matlab Dakshin" },
        { id: 5149, upazila_name: "Matlab Uttar" },
        { id: 5150, upazila_name: "Haimchar" },
        { id: 5151, upazila_name: "Kachua" },
        { id: 5152, upazila_name: "Faridganj" },
        { id: 5153, upazila_name: "Shahrasti" },
      ],
    },
  
    //   khulna
  
    {
      district_id: 1026,
      upazilas: [
        { id: 5154, upazila_name: "Khulna Sadar" },
        { id: 5155, upazila_name: "Dighalia" },
        { id: 5156, upazila_name: "Koira" },
        { id: 5157, upazila_name: "Terkhida" },
        { id: 5158, upazila_name: "Dumuria" },
        { id: 5159, upazila_name: "Batiaghata" },
        { id: 5160, upazila_name: "Phultala" },
        { id: 5161, upazila_name: "Khalishpur" },
        { id: 5162, upazila_name: "Paikgacha" },
        { id: 5163, upazila_name: "Rupsa" },
      ],
    },
    {
      district_id: 1027,
      upazilas: [
        { id: 5164, upazila_name: "Bagerhat Sadar" },
        { id: 5165, upazila_name: "Mollahat" },
        { id: 5166, upazila_name: "Kachua" },
        { id: 5167, upazila_name: "Chitalmari" },
        { id: 5168, upazila_name: "Sadar" },
        { id: 5169, upazila_name: "Fakirhat" },
        { id: 5170, upazila_name: "Morrelganj" },
      ],
    },
    {
      district_id: 1028,
      upazilas: [
        { id: 5171, upazila_name: "Chuadanga Sadar" },
        { id: 5172, upazila_name: "Damurhuda" },
        { id: 5173, upazila_name: "Alamdanga" },
        { id: 5174, upazila_name: "Jibannagar" },
      ],
    },
    {
      district_id: 1029,
      upazilas: [
        { id: 5175, upazila_name: "Jashore Sadar" },
        { id: 5176, upazila_name: "Abhaynagar" },
        { id: 5177, upazila_name: "Bagherpara" },
        { id: 5178, upazila_name: "Benapole" },
        { id: 5179, upazila_name: "Sharsha" },
      ],
    },
    {
      district_id: 1030,
      upazilas: [
        { id: 5180, upazila_name: "Jhenaidah Sadar" },
        { id: 5181, upazila_name: "Shailkupa" },
        { id: 5182, upazila_name: "Kotchandpur" },
        { id: 5183, upazila_name: "Harinakundu" },
        { id: 5184, upazila_name: "Kaliganj" },
      ],
    },
    {
      district_id: 1031,
      upazilas: [
        { id: 5185, upazila_name: "Khustia Sadar" },
        { id: 5186, upazila_name: "Kumarkhali" },
        { id: 5187, upazila_name: "Shailkupa" },
        { id: 5188, upazila_name: "Daulatkur" },
      ],
    },
    {
      district_id: 1032,
      upazilas: [
        { id: 5189, upazila_name: "Magura Sadar" },
        { id: 5190, upazila_name: "Sreepur" },
        { id: 5191, upazila_name: "Mohammadpur" },
      ],
    },
    {
      district_id: 1033,
      upazilas: [
        { id: 5192, upazila_name: "Meherpur Sadar" },
        { id: 5193, upazila_name: "Mujibnagar" },
      ],
    },
    {
      district_id: 1034,
      upazilas: [
        { id: 5194, upazila_name: "Narail Sadar" },
        { id: 5195, upazila_name: "Kalia" },
      ],
    },
    {
      district_id: 1035,
      upazilas: [
        { id: 5196, upazila_name: "Satkhira Sadar" },
        { id: 5197, upazila_name: "Kaliganj" },
        { id: 5198, upazila_name: "Assasuni" },
        { id: 5199, upazila_name: "Shyamnagar" },
        { id: 5200, upazila_name: "Tala" },
      ],
    },
  
    // Rajshahi
  
    {
      district_id: 1036,
      upazilas: [
        { id: 5201, upazila_name: "Rajshahi Sadar" },
        { id: 5202, upazila_name: "Puthia" },
        { id: 5203, upazila_name: "Bagmara" },
        { id: 5204, upazila_name: "Charghat" },
        { id: 5205, upazila_name: "Durgapur" },
        { id: 5206, upazila_name: "Tanore" },
        { id: 5207, upazila_name: "Mohadevpur" },
        { id: 5208, upazila_name: "Nawabganj" },
      ],
    },
    {
      district_id: 1037,
      upazilas: [
        { id: 5209, upazila_name: "Bogra Sadar" },
        { id: 5210, upazila_name: "Sarai Akram" },
        { id: 5211, upazila_name: "Shajahanpur" },
        { id: 5212, upazila_name: "Kahaloo" },
        { id: 5213, upazila_name: "Nandigram" },
        { id: 5214, upazila_name: "Dhunat" },
        { id: 5215, upazila_name: "Sonatola" },
        { id: 5216, upazila_name: "Dupchanchia" },
        { id: 5217, upazila_name: "Sherpur" },
      ],
    },
    {
      district_id: 1038,
      upazilas: [
        { id: 5218, upazila_name: "Joypurhat Sadar" },
        { id: 5219, upazila_name: "Kahalu" },
        { id: 5220, upazila_name: "Akkelpur" },
        { id: 5221, upazila_name: "Santahar" },
        { id: 5222, upazila_name: "Kalai" },
      ],
    },
    {
      district_id: 1039,
      upazilas: [
        { id: 5223, upazila_name: "Naogaon Sadar" },
        { id: 5224, upazila_name: "Atrai" },
        { id: 5225, upazila_name: "Raninagar" },
        { id: 5226, upazila_name: "Porsha" },
        { id: 5227, upazila_name: "Manda" },
        { id: 5228, upazila_name: "Niamatpur" },
        { id: 5229, upazila_name: "Sapahar" },
      ],
    },
    {
      district_id: 1040,
      upazilas: [
        { id: 5230, upazila_name: "Natore Sadar" },
        { id: 5231, upazila_name: "Baraigram" },
        { id: 5232, upazila_name: "Lalpur" },
        { id: 5233, upazila_name: "Singra" },
        { id: 5234, upazila_name: "Gurdaspur" },
      ],
    },
    {
      district_id: 1041,
      upazilas: [
        { id: 5235, upazila_name: "Pabna Sadar" },
        { id: 5236, upazila_name: "Chatmohar" },
        { id: 5237, upazila_name: "Santhia" },
        { id: 5238, upazila_name: "Sujanagar" },
        { id: 5239, upazila_name: "Faridpur" },
        { id: 5240, upazila_name: "Atghoria" },
      ],
    },
    {
      district_id: 1042,
      upazilas: [
        { id: 5241, upazila_name: "Chapainawabganj Sadar" },
        { id: 5242, upazila_name: "Shibganj" },
        { id: 5243, upazila_name: "Gomostapur" },
        { id: 5244, upazila_name: "Niamatpur" },
        { id: 5245, upazila_name: "Bholahat" },
      ],
    },
    {
      district_id: 1043,
      upazilas: [
        { id: 5246, upazila_name: "Sherpur Sadar" },
        { id: 5247, upazila_name: "Jamalpur" },
        { id: 5248, upazila_name: "Nokla" },
        { id: 5249, upazila_name: "Sreerampur" },
      ],
    },
  
    // Barisal
  
    {
      district_id: 1044,
      upazilas: [
        { id: 5250, upazila_name: "Barishal Sadar" },
        { id: 5251, upazila_name: "Babuganj" },
        { id: 5252, upazila_name: "Muladi" },
        { id: 5253, upazila_name: "Hizla" },
        { id: 5254, upazila_name: "Banaripara" },
        { id: 5255, upazila_name: "Mehendiganj" },
        { id: 5256, upazila_name: "Wazirpur" },
      ],
    },
    {
      district_id: 1045,
      upazilas: [
        { id: 5257, upazila_name: "Bhola Sadar" },
        { id: 5258, upazila_name: "Char Fasson" },
        { id: 5259, upazila_name: "Daudkandi" },
        { id: 5260, upazila_name: "Lalmohan" },
        { id: 5261, upazila_name: "Tazumuddin" },
        { id: 5262, upazila_name: "Borhanuddin" },
        { id: 5263, upazila_name: "Monpura" },
        { id: 5264, upazila_name: "Sadar" },
      ],
    },
    {
      district_id: 1046,
      upazilas: [
        { id: 5265, upazila_name: "Jhalokati Sadar" },
        { id: 5266, upazila_name: "Kathalia" },
        { id: 5267, upazila_name: "Rajapur" },
        { id: 5268, upazila_name: "Bakerganj" },
      ],
    },
    {
      district_id: 1047,
      upazilas: [
        { id: 5269, upazila_name: "Barguna Sadar" },
        { id: 5270, upazila_name: "Amtali" },
        { id: 5271, upazila_name: "Taltali" },
        { id: 5272, upazila_name: "Bauphal" },
        { id: 5273, upazila_name: "Patuakhali" },
      ],
    },
    {
      district_id: 1048,
      upazilas: [
        { id: 5274, upazila_name: "Patuakhali Sadar" },
        { id: 5275, upazila_name: "Galachipa" },
        { id: 5276, upazila_name: "Mirzaganj" },
        { id: 5277, upazila_name: "Dashmina" },
        { id: 5278, upazila_name: "Sadar" },
      ],
    },
    {
      district_id: 1049,
      upazilas: [
        { id: 5279, upazila_name: "Pirojpur Sadar" },
        { id: 5280, upazila_name: "Bhandaria" },
        { id: 5281, upazila_name: "Kawkhali" },
        { id: 5282, upazila_name: "Mathbaria" },
        { id: 5283, upazila_name: "Zianagar" },
      ],
    },
  
    //Sylhet
  
    {
      district_id: 1050,
      upazilas: [
        { id: 5284, upazila_name: "Sylhet Sadar" },
        { id: 5285, upazila_name: "Beanibazar" },
        { id: 5286, upazila_name: "Bishwanath" },
        { id: 5287, upazila_name: "Companiganj" },
        { id: 5288, upazila_name: "Jaintiapur" },
        { id: 5289, upazila_name: "South Surma" },
        { id: 5290, upazila_name: "Gowainghat" },
        { id: 5291, upazila_name: "Fenchuganj" },
      ],
    },
    {
      district_id: 1051,
      upazilas: [
        { id: 5292, upazila_name: "Moulvibazar Sadar" },
        { id: 5293, upazila_name: "Kamalganj" },
        { id: 5294, upazila_name: "Rajnagar" },
        { id: 5295, upazila_name: "Sreemangal" },
        { id: 5296, upazila_name: "Barlekha" },
        { id: 5297, upazila_name: "Juri" },
      ],
    },
    {
      district_id: 1052,
      upazilas: [
        { id: 5298, upazila_name: "Habiganj Sadar" },
        { id: 5299, upazila_name: "Lakhai" },
        { id: 5300, upazila_name: "Madhabpur" },
        { id: 5301, upazila_name: "Nabiganj" },
        { id: 5302, upazila_name: "Bahubal" },
        { id: 5303, upazila_name: "Chunarughat" },
      ],
    },
    {
      district_id: 1053,
      upazilas: [
        { id: 5304, upazila_name: "Sunamganj Sadar" },
        { id: 5305, upazila_name: "Bishwambharpur" },
        { id: 5306, upazila_name: "Jamalganj" },
        { id: 5307, upazila_name: "Dakkhin Sunamganj" },
        { id: 5308, upazila_name: "Shalla" },
        { id: 5309, upazila_name: "Doarabazar" },
        { id: 5310, upazila_name: "Taherpur" },
      ],
    },
  
    // Rangpur
  
    {
      district_id: 1054,
      upazilas: [
        { id: 5311, upazila_name: "Rangpur Sadar" },
        { id: 5312, upazila_name: "Badarganj" },
        { id: 5313, upazila_name: "Pirgachha" },
        { id: 5314, upazila_name: "Kaunia" },
        { id: 5315, upazila_name: "Mithapukur" },
        { id: 5316, upazila_name: "Ranishankail" },
        { id: 5317, upazila_name: "Tariqul" },
      ],
    },
    {
      district_id: 1055,
      upazilas: [
        { id: 5318, upazila_name: "Dinajpur Sadar" },
        { id: 5319, upazila_name: "Kaharol" },
        { id: 5320, upazila_name: "Birampur" },
        { id: 5321, upazila_name: "Ghoraghat" },
        { id: 5322, upazila_name: "Chirirbandar" },
        { id: 5323, upazila_name: "Nawabganj" },
        { id: 5324, upazila_name: "Hili" },
      ],
    },
    {
      district_id: 1056,
      upazilas: [
        { id: 5325, upazila_name: "Kurigram Sadar" },
        { id: 5326, upazila_name: "Bhurungamari" },
        { id: 5327, upazila_name: "Nageshwari" },
        { id: 5328, upazila_name: "Rajarhat" },
        { id: 5329, upazila_name: "Char Rajibpur" },
        { id: 5330, upazila_name: "Ulipur" },
        { id: 5331, upazila_name: "Ranishankail" },
      ],
    },
    {
      district_id: 1057,
      upazilas: [
        { id: 5332, upazila_name: "Lalmonirhat Sadar" },
        { id: 5333, upazila_name: "Kaliganj" },
        { id: 5334, upazila_name: "Hatibandha" },
        { id: 5335, upazila_name: "Patgram" },
        { id: 5336, upazila_name: "Aditmari" },
      ],
    },
    {
      district_id: 1058,
      upazilas: [
        { id: 5337, upazila_name: "Nilphamari Sadar" },
        { id: 5338, upazila_name: "Domar" },
        { id: 5339, upazila_name: "Jaldhaka" },
        { id: 5340, upazila_name: "Kishoreganj" },
        { id: 5341, upazila_name: "Saidpur" },
      ],
    },
    {
      district_id: 1059,
      upazilas: [
        { id: 5342, upazila_name: "Panchagarh Sadar" },
        { id: 5343, upazila_name: "Boda" },
        { id: 5344, upazila_name: "Debiganj" },
        { id: 5345, upazila_name: "Tetulia" },
        { id: 5346, upazila_name: "Atwari" },
      ],
    },
    {
      district_id: 1060,
      upazilas: [
        { id: 5347, upazila_name: "Thakurgaon Sadar" },
        { id: 5348, upazila_name: "Pirganj" },
        { id: 5349, upazila_name: "Haripur" },
        { id: 5350, upazila_name: "Ranishankail" },
        { id: 5351, upazila_name: "Baliadangi" },
      ],
    },
    {
      district_id: 1061,
      upazilas: [
        { id: 5352, upazila_name: "Gaibandha Sadar" },
        { id: 5353, upazila_name: "Sundarganj" },
        { id: 5354, upazila_name: "Gobindaganj" },
        { id: 5355, upazila_name: "Sadullapur" },
        { id: 5356, upazila_name: "Palashbari" },
        { id: 5357, upazila_name: "Kamarjani" },
      ],
    },
  
    //Mymensingh
  
    {
      district_id: 1062,
      upazilas: [
        { id: 5358, upazila_name: "Mymensingh Sadar" },
        { id: 5359, upazila_name: "Muktagachha" },
        { id: 5360, upazila_name: "Trishal" },
        { id: 5361, upazila_name: "Gaffargaon" },
        { id: 5362, upazila_name: "Ishwarganj" },
        { id: 5363, upazila_name: "Haluaghat" },
        { id: 5364, upazila_name: "Nandail" },
      ],
    },
    {
      district_id: 1063,
      upazilas: [
        { id: 5365, upazila_name: "Jamalpur Sadar" },
        { id: 5366, upazila_name: "Sarishabari" },
        { id: 5367, upazila_name: "Islampur" },
        { id: 5368, upazila_name: "Dewanganj" },
        { id: 5369, upazila_name: "Madhura" },
        { id: 5370, upazila_name: "Bakshiganj" },
      ],
    },
    {
      district_id: 1064,
      upazilas: [
        { id: 5371, upazila_name: "Sherpur Sadar" },
        { id: 5372, upazila_name: "Nakur" },
        { id: 5373, upazila_name: "Jamalpur" },
        { id: 5374, upazila_name: "Sreerampur" },
        { id: 5375, upazila_name: "Shahjahanpur" },
      ],
    },
    {
      district_id: 1065,
      upazilas: [
        { id: 5376, upazila_name: "Netrokona Sadar" },
        { id: 5377, upazila_name: "Atpara" },
        { id: 5378, upazila_name: "Durgapur" },
        { id: 5379, upazila_name: "Khaliajuri" },
        { id: 5380, upazila_name: "Mohanganj" },
        { id: 5381, upazila_name: "Purbadhola" },
        { id: 5382, upazila_name: "Barhatta" },
      ],
    },
  ];
  
  export { bangladeshDivisions, divisionsWithDistricts, districtWithUpzila };