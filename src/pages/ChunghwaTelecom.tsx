import { Link } from "react-router-dom";
import { Phone, ArrowLeft, Search, Building2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const products = [
  // Group 2 - Brother
  {
    group: 2,
    brand: "Brother",
    model: "Intellifax-2820/2920/mfc-T220/T225N/T420/T820N/HL-2040/2070N/DCP-T010/T020【碳粉匣】",
    yield: 2500,
    price: 1117,
    tonerModel: "CyberTek BR-TN350-T",
    ecoNo: "4967",
  },
  {
    group: 2,
    brand: "Brother",
    model: "Intellifax-2820/2920/mfc-T220/T225N/T420/T820N/HL-2040/2070N/DCP-T010/T020【感光滾筒】",
    yield: 12000,
    price: 1269,
    tonerModel: "CyberTek Green-DP203A(D)/TN350(D)",
    ecoNo: "4968",
  },
  {
    group: 2,
    brand: "Brother",
    model: "Intellifax-2820/2920/mfc-T220/T225N/T420/T820N/HL-2040/2070N/DCP-T010/T020【感光滾筒】",
    yield: 12000,
    price: 1269,
    tonerModel: "綠蔭 Green-DP203A(D)/TN350(D)",
    ecoNo: "5134",
  },
  // Group 2 - CANON
  {
    group: 2,
    brand: "CANON",
    model: "PC330/320/310/425/770/FC220/290/920",
    yield: null,
    price: 1320,
    tonerModel: "",
    ecoNo: "",
  },
  {
    group: 2,
    brand: "CANON",
    model: "AcuLaser C1100/CX11F (黑色)",
    yield: 4000,
    price: 1320,
    tonerModel: "CyberTek EN-C1100B",
    ecoNo: "3544",
  },
  {
    group: 2,
    brand: "CANON",
    model: "AcuLaser C1100/CX11F (黃色)",
    yield: 4000,
    price: 1320,
    tonerModel: "綠蔭 Green-C1100(Y)",
    ecoNo: "4182",
  },
  {
    group: 2,
    brand: "CANON",
    model: "AcuLaser C1100/CX11F (藍色)",
    yield: 4000,
    price: 1888,
    tonerModel: "CyberTek EN-C1100C",
    ecoNo: "3545",
  },
  {
    group: 2,
    brand: "CANON",
    model: "AcuLaser C1100/CX11F (藍色)",
    yield: 4000,
    price: 1888,
    tonerModel: "綠蔭 Green-C1100(C)",
    ecoNo: "4183",
  },
  {
    group: 2,
    brand: "CANON",
    model: "AcuLaser C1100/CX11F (黃色)",
    yield: 4000,
    price: 1888,
    tonerModel: "CyberTek EN-C1100Y",
    ecoNo: "3547",
  },
  {
    group: 2,
    brand: "CANON",
    model: "AcuLaser C1100/CX11F (黃色)",
    yield: 4000,
    price: 1888,
    tonerModel: "綠蔭 Green-C1100(Y)",
    ecoNo: "4184",
  },
  {
    group: 2,
    brand: "CANON",
    model: "AcuLaser C1100/CX11F (紅色)",
    yield: 4000,
    price: 1888,
    tonerModel: "CyberTek EN-C1100M",
    ecoNo: "3546",
  },
  {
    group: 2,
    brand: "CANON",
    model: "AcuLaser C1100/CX11F (紅色)",
    yield: 4000,
    price: 1888,
    tonerModel: "綠蔭 Green-C1100(M)",
    ecoNo: "4185",
  },
  // Group 3 - EPSON
  {
    group: 3,
    brand: "EPSON",
    model: "AcuLaser C900/C1900(碳粉)",
    yield: 4500,
    price: 1157,
    tonerModel: "CyberTek EN-C900B",
    ecoNo: "2833",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "AcuLaser C900/C1900(黑色)",
    yield: 4500,
    price: 1157,
    tonerModel: "綠蔭 Green-C900(B)",
    ecoNo: "2870",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "AcuLaser C900/C1900(藍色)",
    yield: 4500,
    price: 1794,
    tonerModel: "CyberTek EN-C900C",
    ecoNo: "2834",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "AcuLaser C900/C1900(藍色)",
    yield: 4500,
    price: 1794,
    tonerModel: "綠蔭 Green-C900(C)",
    ecoNo: "2871",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "AcuLaser C900/C1900(紅色)",
    yield: 4500,
    price: 1794,
    tonerModel: "CyberTek EN-C900M",
    ecoNo: "2836",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "AcuLaser C900/C1900(黃色)",
    yield: 4500,
    price: 1794,
    tonerModel: "CyberTek EN-C900Y",
    ecoNo: "2837",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "AcuLaser C900/C1900(黃色)",
    yield: 4500,
    price: 1794,
    tonerModel: "綠蔭 Green-C900(Y)",
    ecoNo: "2873",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "AcuLaser C900/C1900【光鼓】",
    yield: 11250,
    price: 2132,
    tonerModel: "CyberTek EN-C900-D",
    ecoNo: "2835",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "AcuLaser C900/C1900【光鼓】",
    yield: 11250,
    price: 2132,
    tonerModel: "綠蔭 Green-C900(D)",
    ecoNo: "3627",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-5500【碳粉】",
    yield: 3000,
    price: 1117,
    tonerModel: "CyberTek E-5700T",
    ecoNo: "",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-5700/5800【碳粉】",
    yield: 6000,
    price: 1117,
    tonerModel: "綠蔭 Green-Pagework8",
    ecoNo: "1008",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL 5700/5800【感光鼓】",
    yield: 20000,
    price: 1218,
    tonerModel: "CyberTek E-5700D",
    ecoNo: "4029",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-5900/6100【碳粉】",
    yield: 6000,
    price: 1117,
    tonerModel: "CyberTek E-5900T",
    ecoNo: "4032",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-6200/6200L【光鼓】",
    yield: 20000,
    price: 1254,
    tonerModel: "CyberTek E-6200D",
    ecoNo: "3181",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-6200/6200L【光鼓】",
    yield: 20000,
    price: 1254,
    tonerModel: "綠蔭 Green-C6200(D)",
    ecoNo: "2401",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-6200/6200L【碳粉】",
    yield: 3000,
    price: 1168,
    tonerModel: "CyberTek EN-6200L-TC",
    ecoNo: "2832",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-6200/6200L【碳粉】",
    yield: 3000,
    price: 1168,
    tonerModel: "綠蔭 Green-C6200(T)(3K)",
    ecoNo: "5126",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-6200【碳粉】",
    yield: 6000,
    price: 1492,
    tonerModel: "CyberTek EN-6200-TC",
    ecoNo: "2831",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-6200【碳粉】",
    yield: 6000,
    price: 1492,
    tonerModel: "綠蔭 Green-C6200(T)",
    ecoNo: "2400",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-N2010/N1610",
    yield: 7600,
    price: 1878,
    tonerModel: "綠蔭 Green-N2010(依據8000張)",
    ecoNo: "1039",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-N2120",
    yield: 10000,
    price: 2081,
    tonerModel: "CyberTek EN-N2120",
    ecoNo: "1585",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-N2120",
    yield: 10000,
    price: 2081,
    tonerModel: "綠蔭 Green-N2120",
    ecoNo: "1783",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-N2500",
    yield: 10000,
    price: 2784,
    tonerModel: "CyberTek E-N2500",
    ecoNo: "3180",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-N2500",
    yield: 10000,
    price: 2784,
    tonerModel: "綠蔭 Green-N2500(10K)",
    ecoNo: "4186",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-N2700/2750",
    yield: 15000,
    price: 2893,
    tonerModel: "CyberTek EN-N2750",
    ecoNo: "1587",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-N2700/2750",
    yield: 15000,
    price: 2893,
    tonerModel: "綠蔭 Green-N2750",
    ecoNo: "5127",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-N3000",
    yield: 17000,
    price: 3198,
    tonerModel: "CyberTek EN-N3000",
    ecoNo: "3539",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-N3000",
    yield: 17000,
    price: 3198,
    tonerModel: "綠蔭 Green-N3000",
    ecoNo: "5139",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "EPL-N7000",
    yield: 15000,
    price: 3340,
    tonerModel: "CyberTek EN-N7000",
    ecoNo: "4969",
  },
  {
    group: 3,
    brand: "EPSON",
    model: "AcuLaser M2010D / M2010DN",
    yield: 8000,
    price: 3045,
    tonerModel: "CyberTek EN-M2010",
    ecoNo: "5045",
  },
  // Group 4 - Fuji-Xerox
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Xerox Phaser 3115/3120/3130/3150/3121",
    yield: 3000,
    price: 1381,
    tonerModel: "綠蔭 Green-ML17D3",
    ecoNo: "2881",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint240A/340A",
    yield: 10000,
    price: 2893,
    tonerModel: "CyberTek X-240A",
    ecoNo: "4453",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint240A/340A",
    yield: 10000,
    price: 2893,
    tonerModel: "綠蔭 Green-DP340A(10K)",
    ecoNo: "5137",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint340A",
    yield: 17000,
    price: 3553,
    tonerModel: "CyberTek X-340A",
    ecoNo: "4436",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint340A",
    yield: 17000,
    price: 3553,
    tonerModel: "綠蔭 Green-DP340A(17K)",
    ecoNo: "5138",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint205/255/305",
    yield: 10000,
    price: 2843,
    tonerModel: "CyberTek X-DP255",
    ecoNo: "4452",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint205/255/305",
    yield: 10000,
    price: 2843,
    tonerModel: "綠蔭 Green-DP305(10K)",
    ecoNo: "5136",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint203A/204A【感光滾筒】",
    yield: 12000,
    price: 1411,
    tonerModel: "CyberTek FX-DP203A-D",
    ecoNo: "4971",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint203A/204A【感光滾筒】",
    yield: 12000,
    price: 1411,
    tonerModel: "綠蔭 Green-DP203A(D)/TN350(D)",
    ecoNo: "5134",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint203A/204A(2.5K)【碳粉匣】",
    yield: 2500,
    price: 913,
    tonerModel: "CyberTek FX-DP203A-T",
    ecoNo: "4970",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint203A/204A(2.5K)【碳粉匣】",
    yield: 2500,
    price: 913,
    tonerModel: "綠蔭 Green-DP203A(T)/TN350(T)",
    ecoNo: "5135",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint2065/3055高印量",
    yield: 10000,
    price: 3308,
    tonerModel: "CyberTek X-DP3055",
    ecoNo: "5046",
  },
  {
    group: 4,
    brand: "Fuji-Xerox",
    model: "Fuji Xerox DocuPrint2065/3055高印量",
    yield: 10000,
    price: 3308,
    tonerModel: "綠蔭 Green-DP2065",
    ecoNo: "5146",
  },

  // Group 6 - IBM
  {
    group: 6,
    brand: "IBM",
    model: "InfoPrint 1226",
    yield: 12000,
    price: 2579,
    tonerModel: "CyberTek I-1226",
    ecoNo: "3182",
  },
  {
    group: 6,
    brand: "IBM",
    model: "InfoPrint 1226",
    yield: 12000,
    price: 2579,
    tonerModel: "綠蔭 Green-info1226(12K)",
    ecoNo: "2403",
  },
  {
    group: 6,
    brand: "IBM",
    model: "InfoPrint 1412/1512 高印量",
    yield: 6000,
    price: 1645,
    tonerModel: "CyberTek I-1412T",
    ecoNo: "3187",
  },
  {
    group: 6,
    brand: "IBM",
    model: "InfoPrint 1412/1512 高印量",
    yield: 6000,
    price: 1645,
    tonerModel: "綠蔭 Green-info1412",
    ecoNo: "4190",
  },
  {
    group: 6,
    brand: "IBM",
    model: "InfoPrint 1412/1512【光鼓】",
    yield: 30000,
    price: 1269,
    tonerModel: "CyberTek IM-1412-D",
    ecoNo: "4977",
  },
  {
    group: 6,
    brand: "IBM",
    model: "InfoPrint 1412/1512【光鼓】",
    yield: 30000,
    price: 1269,
    tonerModel: "綠蔭 Green-info1412(D)",
    ecoNo: "4191",
  },
  {
    group: 6,
    brand: "IBM",
    model: "InfoPrint 32/40",
    yield: 23000,
    price: 3086,
    tonerModel: "綠蔭 Green-N24/32",
    ecoNo: "2879",
  },
  {
    group: 6,
    brand: "IBM",
    model: "Infoprint 1332/1352/1372",
    yield: 21000,
    price: 3858,
    tonerModel: "綠蔭 Green-info1332",
    ecoNo: "2877",
  },
  {
    group: 6,
    brand: "IBM",
    model: "Infoprint 1312",
    yield: 6000,
    price: 2203,
    tonerModel: "綠蔭 Green-info1312",
    ecoNo: "2876",
  },
  // Group 7 - Konica Minolta
  {
    group: 7,
    brand: "Konica Minolta",
    model: "PP 1300W/1350W/1380MF/1390MF",
    yield: 6000,
    price: 1523,
    tonerModel: "CyberTek KM-PP1350-T",
    ecoNo: "4451",
  },
  {
    group: 7,
    brand: "Konica Minolta",
    model: "PP 1300W/1350W/1380MF/1390MF",
    yield: 6000,
    price: 1523,
    tonerModel: "綠蔭 Green-C1350(T)(6K)",
    ecoNo: "5125",
  },
  {
    group: 7,
    brand: "Konica Minolta",
    model: "Konica Minolta magicolor 2400W/2430x/2450/2500W/2530DL/2550/2480MF/2490MF(黑色)",
    yield: 4500,
    price: 1320,
    tonerModel: "CyberTek KM-2530B",
    ecoNo: "4980",
  },
  {
    group: 7,
    brand: "Konica Minolta",
    model: "Konica Minolta magicolor 2500W/2530DL/2550/2480MF/2490MF(藍色)",
    yield: 4500,
    price: 1777,
    tonerModel: "CyberTek KM-2530C",
    ecoNo: "4981",
  },
  {
    group: 7,
    brand: "Konica Minolta",
    model: "Konica Minolta magicolor 2400W/2430x/2450/2480MF(藍色)",
    yield: 4500,
    price: 1777,
    tonerModel: "CyberTek KM-2530M",
    ecoNo: "4982",
  },
  // Group 8 - KYOCERA
  {
    group: 8,
    brand: "KYOCERA",
    model: "FS-1000/1010【碳粉】",
    yield: 6000,
    price: 914,
    tonerModel: "CyberTek KA-TK17",
    ecoNo: "1588",
  },
  {
    group: 8,
    brand: "KYOCERA",
    model: "FS-1000/1010【碳粉】",
    yield: 6000,
    price: 914,
    tonerModel: "綠蔭 Green-TK17",
    ecoNo: "1785",
  },
  {
    group: 8,
    brand: "KYOCERA",
    model: "FS-1020D【碳粉】",
    yield: 7200,
    price: 1218,
    tonerModel: "CyberTek K-TK18",
    ecoNo: "3183",
  },
  {
    group: 8,
    brand: "KYOCERA",
    model: "FS-1020D【碳粉】",
    yield: 7200,
    price: 1218,
    tonerModel: "綠蔭 Green-TK18",
    ecoNo: "2874",
  },
  {
    group: 8,
    brand: "KYOCERA",
    model: "FS-6020/6026",
    yield: 10000,
    price: 1980,
    tonerModel: "綠蔭 Green-TK402",
    ecoNo: "4187",
  },
  {
    group: 8,
    brand: "KYOCERA",
    model: "FS-720/820/920",
    yield: 6000,
    price: 1168,
    tonerModel: "CyberTek KA-TK110",
    ecoNo: "4979",
  },
  {
    group: 8,
    brand: "KYOCERA",
    model: "FS-720/820/920",
    yield: 6000,
    price: 1168,
    tonerModel: "綠蔭 Green-TK110",
    ecoNo: "5124",
  },
  // Group 9 - LEXMARK
  {
    group: 9,
    brand: "LEXMARK",
    model: "Optra E210",
    yield: 2500,
    price: 1624,
    tonerModel: "CyberTek LK-E210",
    ecoNo: "2830",
  },
  // Group 10 - SAMSUNG
  {
    group: 10,
    brand: "SAMSUNG",
    model: "ML-1510/1710/1740/1750/17P SCX-4216F",
    yield: 3000,
    price: 1371,
    tonerModel: "CyberTek S-ML1740",
    ecoNo: "3184",
  },
  {
    group: 10,
    brand: "SAMSUNG",
    model: "ML-1510/1710/1740/1750/17P SCX-4216F",
    yield: 3000,
    price: 1371,
    tonerModel: "綠蔭 Green-ML17D3",
    ecoNo: "2881",
  },
  {
    group: 10,
    brand: "SAMSUNG",
    model: "FAX SF-5100/5100P/530/531P/535e/515",
    yield: 3000,
    price: 1371,
    tonerModel: "CyberTek S-SF5100",
    ecoNo: "3186",
  },
  {
    group: 10,
    brand: "SAMSUNG",
    model: "FAX SF-5100/5100P/530/531P/535e/515",
    yield: 3000,
    price: 1371,
    tonerModel: "綠蔭 Green-ML12D3",
    ecoNo: "2880",
  },
  {
    group: 10,
    brand: "SAMSUNG",
    model: "4116/4016/4216/M6Y750/755P/SF500/560P/750/755P",
    yield: 3000,
    price: 1371,
    tonerModel: "CyberTek Green-ML17D3",
    ecoNo: "2881",
  },
  {
    group: 10,
    brand: "SAMSUNG",
    model: "SCX-4521F",
    yield: 3000,
    price: 1371,
    tonerModel: "CyberTek SG-SCX4521",
    ecoNo: "4984",
  },
  {
    group: 10,
    brand: "SAMSUNG",
    model: "SCX-4521F",
    yield: 3000,
    price: 1371,
    tonerModel: "綠蔭 Green-ML2D03",
    ecoNo: "4193",
  },
  {
    group: 10,
    brand: "SAMSUNG",
    model: "SF-560R/565PR",
    yield: 3000,
    price: 1411,
    tonerModel: "CyberTek SG-SF550",
    ecoNo: "5052",
  },
];

const brands = [
  "全部",
  "Brother",
  "CANON",
  "EPSON",
  "Fuji-Xerox",
  "HP",
  "IBM",
  "Konica Minolta",
  "KYOCERA",
  "LEXMARK",
  "SAMSUNG",
];

const ChunghwaTelecom = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("全部");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tonerModel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "全部" || product.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold text-foreground">返回首頁</span>
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="tel:02-2970-2232" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">02-2970-2232</span>
              </a>
              <a href="tel:0925-665321" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">0925-665321</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="eco-gradient py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">中華電信共同供應契約</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-6">
            101年印表機回收再利用碳粉匣產品目錄
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge variant="secondary" className="px-4 py-2">
              <FileText className="w-4 h-4 mr-2" />
              招標案號：NBJ000207
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              立約商編號：NBJ000207-21
            </Badge>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="搜尋型號或碳粉匣..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="選擇品牌" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground mt-4">共 {filteredProducts.length} 項產品</p>
        </div>
      </section>

      {/* Products Table */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">組別</TableHead>
                    <TableHead className="font-semibold">品牌</TableHead>
                    <TableHead className="font-semibold min-w-[300px]">品名/適用機型</TableHead>
                    <TableHead className="font-semibold text-center">列印張數</TableHead>
                    <TableHead className="font-semibold text-right">決標價格</TableHead>
                    <TableHead className="font-semibold">碳粉匣廠牌型號</TableHead>
                    <TableHead className="font-semibold text-center">環保編號</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product, index) => (
                    <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{product.group}</TableCell>
                      <TableCell className="font-medium text-primary">{product.brand}</TableCell>
                      <TableCell className="text-foreground">{product.model}</TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {product.yield ? `${product.yield.toLocaleString()}張` : "-"}
                      </TableCell>
                      <TableCell className="text-right font-bold text-destructive">
                        ${product.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{product.tonerModel}</TableCell>
                      <TableCell className="text-center text-muted-foreground">{product.ecoNo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredProducts.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">找不到符合的產品</div>
            )}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="p-6 bg-secondary/50 rounded-xl border border-border">
            <h3 className="font-semibold text-foreground mb-3">注意事項</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 本目錄僅供參考，決標價以中華電信企業聯購網為主</li>
              <li>• 產品規格如有變動，以實際出貨為準</li>
              <li>• 歡迎來電洽詢訂購：02-2970-2232</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 eco-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">立即聯繫我們訂購</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">專業服務，品質保證，歡迎機關學校團體採購</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:02-2970-2232" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                02-2970-2232
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a href="tel:0925-665321" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                0925-665321
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">© 2024 綠昕科技有限公司 Lyu Sin Technology Co.,Ltd. 版權所有</p>
          <p className="text-muted-foreground text-xs mt-2">
            營業據點：新北市三重區昌隆街69號3樓 | 客服專線：(02) 2970-2232 | 傳真號碼：(02) 2970-2252
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ChunghwaTelecom;
