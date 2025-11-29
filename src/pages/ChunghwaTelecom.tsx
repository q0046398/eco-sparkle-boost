import { Link } from "react-router-dom";
import { Phone, ArrowLeft, Search, Building2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const products = [
  // Group 2 - Brother
  { group: 2, brand: "Brother", model: "Intellifax-2820/2920/mfc-T220/T225N/T420/T820N/HL-2040/2070N/DCP-T010/T020【碳粉匣】", yield: 2500, price: 1117, tonerModel: "CyberTek BR-TN350-T", ecoNo: "4967" },
  { group: 2, brand: "Brother", model: "Intellifax-2820/2920/mfc-T220/T225N/T420/T820N/HL-2040/2070N/DCP-T010/T020【感光滾筒】", yield: 12000, price: 1269, tonerModel: "CyberTek Green-DP203A(D)/TN350(D)", ecoNo: "4968" },
  { group: 2, brand: "Brother", model: "Intellifax-2820/2920/mfc-T220/T225N/T420/T820N/HL-2040/2070N/DCP-T010/T020【感光滾筒】", yield: 12000, price: 1269, tonerModel: "綠蔭 Green-DP203A(D)/TN350(D)", ecoNo: "5134" },
  // Group 2 - CANON
  { group: 2, brand: "CANON", model: "PC330/320/310/425/770/FC220/290/920", yield: null, price: 1320, tonerModel: "", ecoNo: "" },
  { group: 2, brand: "CANON", model: "AcuLaser C1100/CX11F (黑色)", yield: 4000, price: 1320, tonerModel: "CyberTek EN-C1100B", ecoNo: "3544" },
  { group: 2, brand: "CANON", model: "AcuLaser C1100/CX11F (黃色)", yield: 4000, price: 1320, tonerModel: "綠蔭 Green-C1100(Y)", ecoNo: "4182" },
  { group: 2, brand: "CANON", model: "AcuLaser C1100/CX11F (藍色)", yield: 4000, price: 1888, tonerModel: "CyberTek EN-C1100C", ecoNo: "3545" },
  { group: 2, brand: "CANON", model: "AcuLaser C1100/CX11F (藍色)", yield: 4000, price: 1888, tonerModel: "綠蔭 Green-C1100(C)", ecoNo: "4183" },
  { group: 2, brand: "CANON", model: "AcuLaser C1100/CX11F (黃色)", yield: 4000, price: 1888, tonerModel: "CyberTek EN-C1100Y", ecoNo: "3547" },
  { group: 2, brand: "CANON", model: "AcuLaser C1100/CX11F (黃色)", yield: 4000, price: 1888, tonerModel: "綠蔭 Green-C1100(Y)", ecoNo: "4184" },
  { group: 2, brand: "CANON", model: "AcuLaser C1100/CX11F (紅色)", yield: 4000, price: 1888, tonerModel: "CyberTek EN-C1100M", ecoNo: "3546" },
  { group: 2, brand: "CANON", model: "AcuLaser C1100/CX11F (紅色)", yield: 4000, price: 1888, tonerModel: "綠蔭 Green-C1100(M)", ecoNo: "4185" },
  // Group 3 - EPSON
  { group: 3, brand: "EPSON", model: "AcuLaser C900/C1900(碳粉)", yield: 4500, price: 1157, tonerModel: "CyberTek EN-C900B", ecoNo: "2833" },
  { group: 3, brand: "EPSON", model: "AcuLaser C900/C1900(黑色)", yield: 4500, price: 1157, tonerModel: "綠蔭 Green-C900(B)", ecoNo: "2870" },
  { group: 3, brand: "EPSON", model: "AcuLaser C900/C1900(藍色)", yield: 4500, price: 1794, tonerModel: "CyberTek EN-C900C", ecoNo: "2834" },
  { group: 3, brand: "EPSON", model: "AcuLaser C900/C1900(藍色)", yield: 4500, price: 1794, tonerModel: "綠蔭 Green-C900(C)", ecoNo: "2871" },
  { group: 3, brand: "EPSON", model: "AcuLaser C900/C1900(紅色)", yield: 4500, price: 1794, tonerModel: "CyberTek EN-C900M", ecoNo: "2836" },
  { group: 3, brand: "EPSON", model: "AcuLaser C900/C1900(黃色)", yield: 4500, price: 1794, tonerModel: "CyberTek EN-C900Y", ecoNo: "2837" },
  { group: 3, brand: "EPSON", model: "AcuLaser C900/C1900(黃色)", yield: 4500, price: 1794, tonerModel: "綠蔭 Green-C900(Y)", ecoNo: "2873" },
  { group: 3, brand: "EPSON", model: "AcuLaser C900/C1900【光鼓】", yield: 11250, price: 2132, tonerModel: "CyberTek EN-C900-D", ecoNo: "2835" },
  { group: 3, brand: "EPSON", model: "AcuLaser C900/C1900【光鼓】", yield: 11250, price: 2132, tonerModel: "綠蔭 Green-C900(D)", ecoNo: "3627" },
  { group: 3, brand: "EPSON", model: "EPL-5500【碳粉】", yield: 3000, price: 1117, tonerModel: "CyberTek E-5700T", ecoNo: "" },
  { group: 3, brand: "EPSON", model: "EPL-5700/5800【碳粉】", yield: 6000, price: 1117, tonerModel: "綠蔭 Green-Pagework8", ecoNo: "1008" },
  { group: 3, brand: "EPSON", model: "EPL 5700/5800【感光鼓】", yield: 20000, price: 1218, tonerModel: "CyberTek E-5700D", ecoNo: "4029" },
  { group: 3, brand: "EPSON", model: "EPL-5900/6100【碳粉】", yield: 6000, price: 1117, tonerModel: "CyberTek E-5900T", ecoNo: "4032" },
  { group: 3, brand: "EPSON", model: "EPL-6200/6200L【光鼓】", yield: 20000, price: 1254, tonerModel: "CyberTek E-6200D", ecoNo: "3181" },
  { group: 3, brand: "EPSON", model: "EPL-6200/6200L【光鼓】", yield: 20000, price: 1254, tonerModel: "綠蔭 Green-C6200(D)", ecoNo: "2401" },
  { group: 3, brand: "EPSON", model: "EPL-6200/6200L【碳粉】", yield: 3000, price: 1168, tonerModel: "CyberTek EN-6200L-TC", ecoNo: "2832" },
  { group: 3, brand: "EPSON", model: "EPL-6200/6200L【碳粉】", yield: 3000, price: 1168, tonerModel: "綠蔭 Green-C6200(T)(3K)", ecoNo: "5126" },
  { group: 3, brand: "EPSON", model: "EPL-6200【碳粉】", yield: 6000, price: 1492, tonerModel: "CyberTek EN-6200-TC", ecoNo: "2831" },
  { group: 3, brand: "EPSON", model: "EPL-6200【碳粉】", yield: 6000, price: 1492, tonerModel: "綠蔭 Green-C6200(T)", ecoNo: "2400" },
  { group: 3, brand: "EPSON", model: "EPL-N2010/N1610", yield: 7600, price: 1878, tonerModel: "綠蔭 Green-N2010(依據8000張)", ecoNo: "1039" },
  { group: 3, brand: "EPSON", model: "EPL-N2120", yield: 10000, price: 2081, tonerModel: "CyberTek EN-N2120", ecoNo: "1585" },
  { group: 3, brand: "EPSON", model: "EPL-N2120", yield: 10000, price: 2081, tonerModel: "綠蔭 Green-N2120", ecoNo: "1783" },
  { group: 3, brand: "EPSON", model: "EPL-N2500", yield: 10000, price: 2784, tonerModel: "CyberTek E-N2500", ecoNo: "3180" },
  { group: 3, brand: "EPSON", model: "EPL-N2500", yield: 10000, price: 2784, tonerModel: "綠蔭 Green-N2500(10K)", ecoNo: "4186" },
  { group: 3, brand: "EPSON", model: "EPL-N2700/2750", yield: 15000, price: 2893, tonerModel: "CyberTek EN-N2750", ecoNo: "1587" },
  { group: 3, brand: "EPSON", model: "EPL-N2700/2750", yield: 15000, price: 2893, tonerModel: "綠蔭 Green-N2750", ecoNo: "5127" },
  { group: 3, brand: "EPSON", model: "EPL-N3000", yield: 17000, price: 3198, tonerModel: "CyberTek EN-N3000", ecoNo: "3539" },
  { group: 3, brand: "EPSON", model: "EPL-N3000", yield: 17000, price: 3198, tonerModel: "綠蔭 Green-N3000", ecoNo: "5139" },
  { group: 3, brand: "EPSON", model: "EPL-N7000", yield: 15000, price: 3340, tonerModel: "CyberTek EN-N7000", ecoNo: "4969" },
  { group: 3, brand: "EPSON", model: "AcuLaser M2010D / M2010DN", yield: 8000, price: 3045, tonerModel: "CyberTek EN-M2010", ecoNo: "5045" },
  // Group 4 - Fuji-Xerox
  { group: 4, brand: "Fuji-Xerox", model: "Xerox Phaser 3115/3120/3130/3150/3121", yield: 3000, price: 1381, tonerModel: "綠蔭 Green-ML17D3", ecoNo: "2881" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint240A/340A", yield: 10000, price: 2893, tonerModel: "CyberTek X-240A", ecoNo: "4453" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint240A/340A", yield: 10000, price: 2893, tonerModel: "綠蔭 Green-DP340A(10K)", ecoNo: "5137" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint340A", yield: 17000, price: 3553, tonerModel: "CyberTek X-340A", ecoNo: "4436" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint340A", yield: 17000, price: 3553, tonerModel: "綠蔭 Green-DP340A(17K)", ecoNo: "5138" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint205/255/305", yield: 10000, price: 2843, tonerModel: "CyberTek X-DP255", ecoNo: "4452" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint205/255/305", yield: 10000, price: 2843, tonerModel: "綠蔭 Green-DP305(10K)", ecoNo: "5136" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint203A/204A【感光滾筒】", yield: 12000, price: 1411, tonerModel: "CyberTek FX-DP203A-D", ecoNo: "4971" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint203A/204A【感光滾筒】", yield: 12000, price: 1411, tonerModel: "綠蔭 Green-DP203A(D)/TN350(D)", ecoNo: "5134" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint203A/204A(2.5K)【碳粉匣】", yield: 2500, price: 913, tonerModel: "CyberTek FX-DP203A-T", ecoNo: "4970" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint203A/204A(2.5K)【碳粉匣】", yield: 2500, price: 913, tonerModel: "綠蔭 Green-DP203A(T)/TN350(T)", ecoNo: "5135" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint2065/3055高印量", yield: 10000, price: 3308, tonerModel: "CyberTek X-DP3055", ecoNo: "5046" },
  { group: 4, brand: "Fuji-Xerox", model: "Fuji Xerox DocuPrint2065/3055高印量", yield: 10000, price: 3308, tonerModel: "綠蔭 Green-DP2065", ecoNo: "5146" },
  // Group 5 - HP
  { group: 5, brand: "HP", model: "Color LaserJet 1500/2500(黑色)", yield: 5000, price: 1208, tonerModel: "綠蔭 Green-C2500(B)", ecoNo: "2849" },
  { group: 5, brand: "HP", model: "Color LaserJet 1500/2500(藍色)", yield: 4000, price: 1624, tonerModel: "CyberTek H-87C", ecoNo: "2394" },
  { group: 5, brand: "HP", model: "Color LaserJet 1500/2500(藍色)", yield: 4000, price: 1624, tonerModel: "綠蔭 Green-C2500(C)", ecoNo: "2850" },
  { group: 5, brand: "HP", model: "Color LaserJet 1500/2500(黃色)", yield: 4000, price: 1624, tonerModel: "CyberTek H-87Y", ecoNo: "2395" },
  { group: 5, brand: "HP", model: "Color LaserJet 1500/2500(黃色)", yield: 4000, price: 1624, tonerModel: "綠蔭 Green-C2500(Y)", ecoNo: "2851" },
  { group: 5, brand: "HP", model: "Color LaserJet 1500/2500(紅色)", yield: 4000, price: 1624, tonerModel: "CyberTek H-87M", ecoNo: "2396" },
  { group: 5, brand: "HP", model: "Color LaserJet 1500/2500(紅色)", yield: 4000, price: 1624, tonerModel: "綠蔭 Green-C2500(M)", ecoNo: "2852" },
  { group: 5, brand: "HP", model: "Color LaserJet 1600/2600/2605/CM1015 MFP/CM1017 MFP(黑色)", yield: 2000, price: 1706, tonerModel: "CyberTek HP-C2600C", ecoNo: "3541" },
  { group: 5, brand: "HP", model: "Color LaserJet 1600/2600/2605/CM1015 MFP/CM1017 MFP(藍色)", yield: 2000, price: 1706, tonerModel: "綠蔭 Green-C26K(C)", ecoNo: "4179" },
  { group: 5, brand: "HP", model: "Color LaserJet 1600/2600/2605/CM1015 MFP/CM1017 MFP(黃色)", yield: 2000, price: 1706, tonerModel: "CyberTek HP-C2600Y", ecoNo: "3543" },
  { group: 5, brand: "HP", model: "Color LaserJet 1600/2600/2605/CM1015 MFP/CM1017 MFP(黃色)", yield: 2000, price: 1706, tonerModel: "綠蔭 Green-C2600M", ecoNo: "5142" },
  { group: 5, brand: "HP", model: "Color LaserJet CM1015 MFP/CM1017 MFP(紅色)", yield: 2000, price: 1706, tonerModel: "綠蔭 Green-C26K(M)", ecoNo: "4181" },
  { group: 5, brand: "HP", model: "Color LaserJet 2550/2820/2840(碳粉)", yield: 5000, price: 1421, tonerModel: "CyberTek H-C2550B", ecoNo: "3173" },
  { group: 5, brand: "HP", model: "Color LaserJet 2550/2820/2840(黑色)", yield: 5000, price: 1421, tonerModel: "綠蔭 Green-C2550(B)", ecoNo: "2853" },
  { group: 5, brand: "HP", model: "Color LaserJet 2550/2820/2840(藍色)", yield: 4000, price: 1777, tonerModel: "CyberTek H-C2550C", ecoNo: "3174" },
  { group: 5, brand: "HP", model: "Color LaserJet 2550/2820/2840(藍色)", yield: 4000, price: 1777, tonerModel: "綠蔭 Green-C2550(C)", ecoNo: "2854" },
  { group: 5, brand: "HP", model: "Color LaserJet 2550/2820/2840(黃色)", yield: 4000, price: 1777, tonerModel: "CyberTek H-C2550Y", ecoNo: "3176" },
  { group: 5, brand: "HP", model: "Color LaserJet 2550/2820/2840(黃色)", yield: 4000, price: 1777, tonerModel: "綠蔭 Green-C2550(Y)", ecoNo: "2855" },
  { group: 5, brand: "HP", model: "Color LaserJet 2550/2820/2840(紅色)", yield: 4000, price: 1777, tonerModel: "CyberTek H-C2550M", ecoNo: "3175" },
  { group: 5, brand: "HP", model: "Color LaserJet 2550/2820/2840(紅色)", yield: 4000, price: 1777, tonerModel: "綠蔭 Green-C2550(M)", ecoNo: "2856" },
  { group: 5, brand: "HP", model: "Color LaserJet 3500/3550/3700(黑色)", yield: 6000, price: 2609, tonerModel: "CyberTek HP-C3500B", ecoNo: "3780" },
  { group: 5, brand: "HP", model: "Color LaserJet 3500/3550/3700(黑色)", yield: 6000, price: 2609, tonerModel: "綠蔭 Green-C35K7(B)", ecoNo: "3628" },
  { group: 5, brand: "HP", model: "Color LaserJet 3500/3550(藍色)", yield: 4000, price: 2609, tonerModel: "CyberTek HP-C3500C", ecoNo: "3781" },
  { group: 5, brand: "HP", model: "Color LaserJet 3500/3550(藍色)", yield: 4000, price: 2609, tonerModel: "綠蔭 Green-C35K7(C)", ecoNo: "3629" },
  { group: 5, brand: "HP", model: "Color LaserJet 3500/3550(紅色)", yield: 4000, price: 2609, tonerModel: "CyberTek HP-C3500M", ecoNo: "3782" },
  { group: 5, brand: "HP", model: "Color LaserJet 3500/3550(紅色)", yield: 4000, price: 2609, tonerModel: "綠蔭 Green-C35K7(M)", ecoNo: "3630" },
  { group: 5, brand: "HP", model: "Color LaserJet 3500/3550(黃色)", yield: 4000, price: 2609, tonerModel: "CyberTek HP-C3500Y", ecoNo: "3783" },
  { group: 5, brand: "HP", model: "Color LaserJet 3500/3550(黃色)", yield: 4000, price: 2609, tonerModel: "綠蔭 Green-C35K7(Y)", ecoNo: "3631" },
  { group: 5, brand: "HP", model: "Color LaserJet 3600/3800/CP3505(黑色)", yield: 6000, price: 2416, tonerModel: "CyberTek HP-C3800B", ecoNo: "3787" },
  { group: 5, brand: "HP", model: "Color LaserJet 3600/3800/CP3505(黑色)", yield: 6000, price: 2416, tonerModel: "綠蔭 Green-C35K8(B)", ecoNo: "4170" },
  { group: 5, brand: "HP", model: "Color LaserJet 3600(藍色)", yield: 4000, price: 2609, tonerModel: "CyberTek H-C3600C", ecoNo: "4433" },
  { group: 5, brand: "HP", model: "Color LaserJet 3600(黃色)", yield: 4000, price: 2609, tonerModel: "CyberTek H-C3600Y", ecoNo: "4435" },
  { group: 5, brand: "HP", model: "Color LaserJet 3600(黃色)", yield: 4000, price: 2609, tonerModel: "綠蔭 Green-C35K8(Y)", ecoNo: "4172" },
  { group: 5, brand: "HP", model: "Color LaserJet 3600(紅色)", yield: 4000, price: 2609, tonerModel: "CyberTek H-C3600M", ecoNo: "4434" },
  { group: 5, brand: "HP", model: "Color LaserJet 3600(紅色)", yield: 4000, price: 2609, tonerModel: "綠蔭 Green-C35K8(M)", ecoNo: "4173" },
  { group: 5, brand: "HP", model: "Color LaserJet 3700(藍色)", yield: 6000, price: 2893, tonerModel: "CyberTek HP-C3700C", ecoNo: "3784" },
  { group: 5, brand: "HP", model: "Color LaserJet 3700(藍色)", yield: 6000, price: 2893, tonerModel: "綠蔭 Green-C3700(C)", ecoNo: "5114" },
  { group: 5, brand: "HP", model: "Color LaserJet 3700(紅色)", yield: 6000, price: 2893, tonerModel: "CyberTek HP-C3700M", ecoNo: "3785" },
  { group: 5, brand: "HP", model: "Color LaserJet 3700(紅色)", yield: 6000, price: 2893, tonerModel: "綠蔭 Green-C3700(M)", ecoNo: "5115" },
  { group: 5, brand: "HP", model: "Color LaserJet 3700(黃色)", yield: 6000, price: 2893, tonerModel: "CyberTek HP-C3700Y", ecoNo: "3786" },
  { group: 5, brand: "HP", model: "Color LaserJet 3700(黃色)", yield: 6000, price: 2893, tonerModel: "綠蔭 Green-C3700(Y)", ecoNo: "5116" },
  { group: 5, brand: "HP", model: "Color LaserJet 3800/CP3505(藍色)", yield: 6000, price: 3198, tonerModel: "CyberTek HP-C3800C", ecoNo: "3788" },
  { group: 5, brand: "HP", model: "Color LaserJet 3800/CP3505(藍色)", yield: 6000, price: 3198, tonerModel: "綠蔭 Green-C3800(C)", ecoNo: "5117" },
  { group: 5, brand: "HP", model: "Color LaserJet 3800/CP3505(黃色)", yield: 6000, price: 3198, tonerModel: "CyberTek HP-C3800Y", ecoNo: "3790" },
  { group: 5, brand: "HP", model: "Color LaserJet 3800/CP3505(黃色)", yield: 6000, price: 3198, tonerModel: "綠蔭 Green-C3800(Y)", ecoNo: "5119" },
  { group: 5, brand: "HP", model: "Color LaserJet 3800/CP3505(紅色)", yield: 6000, price: 3198, tonerModel: "CyberTek HP-C3800M", ecoNo: "3789" },
  { group: 5, brand: "HP", model: "Color LaserJet 3800/CP3505(紅色)", yield: 6000, price: 3198, tonerModel: "綠蔭 Green-C3800(M)", ecoNo: "5118" },
  { group: 5, brand: "HP", model: "Color LaserJet 4600/4650(黑色)", yield: 9000, price: 2701, tonerModel: "CyberTek H-C4600B", ecoNo: "3169" },
  { group: 5, brand: "HP", model: "Color LaserJet 4600/4650(黑色)", yield: 9000, price: 2701, tonerModel: "綠蔭 Green-C46K(B)", ecoNo: "3632" },
  { group: 5, brand: "HP", model: "Color LaserJet 4600/4650(藍色)", yield: 8000, price: 3523, tonerModel: "CyberTek H-C4600C", ecoNo: "3170" },
  { group: 5, brand: "HP", model: "Color LaserJet 4600/4650(藍色)", yield: 8000, price: 3523, tonerModel: "綠蔭 Green-C46K(C)", ecoNo: "3633" },
  { group: 5, brand: "HP", model: "Color LaserJet 4600/4650(綠色)", yield: 8000, price: 3523, tonerModel: "CyberTek H-C4600M", ecoNo: "3171" },
  { group: 5, brand: "HP", model: "Color LaserJet 4600/4650(紅色)", yield: 8000, price: 3523, tonerModel: "綠蔭 Green-C46K(M)", ecoNo: "3634" },
  { group: 5, brand: "HP", model: "Color LaserJet 4600/4650(黃色)", yield: 8000, price: 3523, tonerModel: "CyberTek H-C4600Y", ecoNo: "3172" },
  { group: 5, brand: "HP", model: "Color LaserJet 4600/4650(黃色)", yield: 8000, price: 3523, tonerModel: "綠蔭 Green-C46K(Y)", ecoNo: "3635" },
  { group: 5, brand: "HP", model: "Color LaserJet 5500/5550(黑色)", yield: 13000, price: 3858, tonerModel: "CyberTek HP-C5500B", ecoNo: "3791" },
  { group: 5, brand: "HP", model: "Color LaserJet 5500/5550(黑色)", yield: 13000, price: 3858, tonerModel: "綠蔭 Green-C5550(B)", ecoNo: "4174" },
  { group: 5, brand: "HP", model: "Color LaserJet 5500/5550(藍色)", yield: 12000, price: 5279, tonerModel: "CyberTek HP-C5500C", ecoNo: "3792" },
  { group: 5, brand: "HP", model: "Color LaserJet 5500/5550(藍色)", yield: 12000, price: 5279, tonerModel: "綠蔭 Green-C5550藍(C)", ecoNo: "4175" },
  { group: 5, brand: "HP", model: "Color LaserJet 5500/5550(紅色)", yield: 12000, price: 5279, tonerModel: "CyberTek HP-C5500Y", ecoNo: "3794" },
  { group: 5, brand: "HP", model: "Color LaserJet 5500/5550(黃色)", yield: 12000, price: 5279, tonerModel: "綠蔭 Green-C5550(Y)", ecoNo: "4176" },
  { group: 5, brand: "HP", model: "Color LaserJet 5500/5550(紅色)", yield: 12000, price: 5279, tonerModel: "CyberTek HP-C5500M", ecoNo: "3793" },
  { group: 5, brand: "HP", model: "Color LaserJet 5500/5550(紅色)", yield: 12000, price: 5279, tonerModel: "綠蔭 Green-C5550(M)", ecoNo: "4177" },
  { group: 5, brand: "HP", model: "LaserJet 5P/5MP/6P/6MP", yield: 4000, price: 741, tonerModel: "CyberTek HP-03F", ecoNo: "0629" },
  { group: 5, brand: "HP", model: "LaserJet 5P/5MP/6P/6MP", yield: 4000, price: 741, tonerModel: "綠蔭 Green-VX", ecoNo: "1037" },
  { group: 5, brand: "HP", model: "LaserJet 5L/6L", yield: 2500, price: 711, tonerModel: "綠蔭 Green-AX", ecoNo: "992" },
  { group: 5, brand: "HP", model: "LaserJet 5Si/8000", yield: 16500, price: 2359, tonerModel: "綠蔭 Green-WX", ecoNo: "996" },
  { group: 5, brand: "HP", model: "LaserJet 2300", yield: 6000, price: 2090, tonerModel: "CyberTek H-10A", ecoNo: "2331" },
  { group: 5, brand: "HP", model: "LaserJet 2300", yield: 6000, price: 2090, tonerModel: "綠蔭 Green-10A(C10A)", ecoNo: "1779" },
  { group: 5, brand: "HP", model: "LaserJet 2400/2410/2420/2430低印量", yield: 6000, price: 2029, tonerModel: "CyberTek H-11A", ecoNo: "3177" },
  { group: 5, brand: "HP", model: "LaserJet 2400/2410/2420/2430低印量", yield: 6000, price: 2029, tonerModel: "綠蔭 Green-11", ecoNo: "2847" },
  { group: 5, brand: "HP", model: "LaserJet 1300低印量", yield: 2500, price: 1020, tonerModel: "CyberTek H-13A", ecoNo: "2332" },
  { group: 5, brand: "HP", model: "LaserJet 1300低印量", yield: 2500, price: 1020, tonerModel: "綠蔭 Green-13A", ecoNo: "5141" },
  { group: 5, brand: "HP", model: "LaserJet 1300高印量", yield: 4000, price: 1024, tonerModel: "CyberTek H-13X", ecoNo: "4445" },
  { group: 5, brand: "HP", model: "LaserJet 1300高印量", yield: 4000, price: 1024, tonerModel: "綠蔭 Green-13X(C13X)", ecoNo: "1778" },
  { group: 5, brand: "HP", model: "LaserJet 1000/1200/1220/1000/3330/3380/3300 MFP(低印量)", yield: 2500, price: 812, tonerModel: "CyberTek H-15A", ecoNo: "4026" },
  { group: 5, brand: "HP", model: "LaserJet 1000/1200/1220/1000/3330/3380/3300 MFP(高印量)", yield: 3500, price: 883, tonerModel: "CyberTek H-15X", ecoNo: "4446" },
  { group: 5, brand: "HP", model: "LaserJet 1000/1200/1220/1000/3330/3380/3300 MFP(高印量)", yield: 3500, price: 883, tonerModel: "綠蔭 Green-15X", ecoNo: "5142" },
  { group: 5, brand: "HP", model: "LaserJet 5200系列", yield: 12000, price: 2722, tonerModel: "CyberTek HP-16A", ecoNo: "3548" },
  { group: 5, brand: "HP", model: "LaserJet 5200系列", yield: 12000, price: 2722, tonerModel: "綠蔭 Green-16A", ecoNo: "3626" },
  { group: 5, brand: "HP", model: "LaserJet 4000/4050", yield: 10000, price: 1452, tonerModel: "CyberTek HP-27X", ecoNo: "0631" },
  { group: 5, brand: "HP", model: "LaserJet 4000/4050", yield: 10000, price: 1452, tonerModel: "綠蔭 Green-52", ecoNo: "1038" },
  { group: 5, brand: "HP", model: "LaserJet 5000/5000LE/5100", yield: 10000, price: 1598, tonerModel: "CyberTek HP-29X", ecoNo: "0829" },
  { group: 5, brand: "HP", model: "LaserJet 5000/5000LE/5100", yield: 10000, price: 1598, tonerModel: "綠蔭 Green-62X", ecoNo: "1001" },
  { group: 5, brand: "HP", model: "LaserJet 4200", yield: 12000, price: 2598, tonerModel: "CyberTek H-38A", ecoNo: "2333" },
  { group: 5, brand: "HP", model: "LaserJet 4200", yield: 12000, price: 2598, tonerModel: "綠蔭 Green-38A(38A))", ecoNo: "1780" },
  { group: 5, brand: "HP", model: "LaserJet 4300", yield: 18000, price: 3574, tonerModel: "CyberTek HP-39A-C", ecoNo: "2827" },
  { group: 5, brand: "HP", model: "LaserJet 4300", yield: 18000, price: 3574, tonerModel: "綠蔭 Green-39A(39A)", ecoNo: "1781" },
  { group: 5, brand: "HP", model: "LaserJet 2250/4350 低印量", yield: 10000, price: 2578, tonerModel: "CyberTek H-42A", ecoNo: "3178" },
  { group: 5, brand: "HP", model: "LaserJet 2250/4350 低印量", yield: 10000, price: 2578, tonerModel: "綠蔭 Green-42", ecoNo: "2848" },
  { group: 5, brand: "HP", model: "LaserJet 2250/4350 高印量", yield: 20000, price: 3858, tonerModel: "CyberTek H-42XC", ecoNo: "4447" },
  { group: 5, brand: "HP", model: "LaserJet 2250/4350 高印量", yield: 20000, price: 3858, tonerModel: "綠蔭 Green-4250X", ecoNo: "5131" },
  { group: 5, brand: "HP", model: "LaserJet 1160/1320 低印量", yield: 2500, price: 1217, tonerModel: "CyberTek H-49A", ecoNo: "3179" },
  { group: 5, brand: "HP", model: "LaserJet 1160/1320 低印量", yield: 2500, price: 1217, tonerModel: "綠蔭 Green-49", ecoNo: "2846" },
  { group: 5, brand: "HP", model: "LaserJet 1320 高印量", yield: 6000, price: 1806, tonerModel: "CyberTek H-49XC", ecoNo: "4432" },
  { group: 5, brand: "HP", model: "LaserJet 1320 高印量", yield: 6000, price: 1806, tonerModel: "綠蔭 Green-1320X", ecoNo: "5144" },
  { group: 5, brand: "HP", model: "LaserJet P3005/M3035/3027系列低印量", yield: 6500, price: 1929, tonerModel: "CyberTek HP-51A", ecoNo: "3795" },
  { group: 5, brand: "HP", model: "LaserJet P3005/M3035/3027系列低印量", yield: 6500, price: 1929, tonerModel: "綠蔭 Green-51A", ecoNo: "4166" },
  { group: 5, brand: "HP", model: "LaserJet P3005/M3035/3027系列高印量", yield: 13000, price: 3381, tonerModel: "CyberTek H-51X", ecoNo: "4430" },
  { group: 5, brand: "HP", model: "LaserJet P3005/M3035/3027系列高印量", yield: 13000, price: 3381, tonerModel: "綠蔭 Green-51X", ecoNo: "5147" },
  { group: 5, brand: "HP", model: "LaserJet P2014/P2015/M2727MFP系列低印量", yield: 3000, price: 1330, tonerModel: "CyberTek HP-53A", ecoNo: "3796" },
  { group: 5, brand: "HP", model: "LaserJet P2014/P2015/M2727MFP系列低印量", yield: 3000, price: 1330, tonerModel: "綠蔭 Green-53A", ecoNo: "4168" },
  { group: 5, brand: "HP", model: "LaserJet P2014/P2015系列高印量", yield: 7000, price: 2335, tonerModel: "CyberTek H-53X", ecoNo: "4429" },
  { group: 5, brand: "HP", model: "LaserJet P2014/P2015系列高印量", yield: 7000, price: 2335, tonerModel: "綠蔭 Green-53X", ecoNo: "4169" },
  { group: 5, brand: "HP", model: "LaserJet 4100 高印量", yield: 10000, price: 1726, tonerModel: "CyberTek H-61X", ecoNo: "4027" },
  { group: 5, brand: "HP", model: "LaserJet 4100 高印量", yield: 10000, price: 1726, tonerModel: "綠蔭 Green-61", ecoNo: "1004" },
  { group: 5, brand: "HP", model: "LaserJet 8100/8150", yield: 20000, price: 2386, tonerModel: "CyberTek HP-82X", ecoNo: "1584" },
  { group: 5, brand: "HP", model: "LaserJet 8100/8150", yield: 20000, price: 2386, tonerModel: "綠蔭 Green-72X", ecoNo: "1002" },
  { group: 5, brand: "HP", model: "LaserJet 1100/1100A/3200", yield: 2500, price: 772, tonerModel: "CyberTek HP-92A", ecoNo: "0827" },
  { group: 5, brand: "HP", model: "LaserJet 1100/1100A/3200", yield: 2500, price: 772, tonerModel: "綠蔭 Green-22X", ecoNo: "1036" },
  { group: 5, brand: "HP", model: "LaserJet 2100/2200", yield: 5000, price: 1147, tonerModel: "CyberTek HP-96A", ecoNo: "0828" },
  { group: 5, brand: "HP", model: "LaserJet 2100/2200", yield: 5000, price: 1147, tonerModel: "綠蔭 Green-32X", ecoNo: "1000" },
  { group: 5, brand: "HP", model: "HP LaserJet P1505/P1505n/M1522MFP/M1120MFP", yield: 2000, price: 1238, tonerModel: "CyberTek H-36AC", ecoNo: "4449" },
  { group: 5, brand: "HP", model: "HP LaserJet P1505/P1505n/M1522MFP/M1120MFP", yield: 2000, price: 1238, tonerModel: "綠蔭 Green-436", ecoNo: "4165" },
  { group: 5, brand: "HP", model: "LaserJet 9000/9040/9050", yield: 30000, price: 5685, tonerModel: "CyberTek H-43X", ecoNo: "4450" },
  { group: 5, brand: "HP", model: "LaserJet 9000/9040/9050", yield: 30000, price: 5685, tonerModel: "綠蔭 Green-43X", ecoNo: "5132" },
  { group: 5, brand: "HP", model: "Color LJ 2700/2700n/3000/3000n/dn(黑色)", yield: 6500, price: 2843, tonerModel: "CyberTek H-C2700B", ecoNo: "4441" },
  { group: 5, brand: "HP", model: "Color LJ 2700/2700n/3000/3000n/dn(黑色)", yield: 6500, price: 2843, tonerModel: "綠蔭 Green-C2700(B)", ecoNo: "5110" },
  { group: 5, brand: "HP", model: "Color LJ 2700/2700n/3000/3000n/dn(藍色)", yield: 3500, price: 2741, tonerModel: "CyberTek H-C2700C", ecoNo: "4442" },
  { group: 5, brand: "HP", model: "Color LJ 2700/2700n/3000/3000n/dn(藍色)", yield: 3500, price: 2741, tonerModel: "綠蔭 Green-C2700(C)", ecoNo: "5111" },
  { group: 5, brand: "HP", model: "Color LJ 2700/2700n/3000/3000n/dn(紅色)", yield: 3500, price: 2741, tonerModel: "CyberTek H-C2700M", ecoNo: "4443" },
  { group: 5, brand: "HP", model: "Color LJ 2700/2700n/3000/3000n/dn(黃色)", yield: 3500, price: 2741, tonerModel: "綠蔭 Green-C2700(M)", ecoNo: "5112" },
  { group: 5, brand: "HP", model: "Color LJ 2700/2700n/3000/3000n/dn(黃色)", yield: 3500, price: 2741, tonerModel: "CyberTek H-C2700Y", ecoNo: "5113" },
  { group: 5, brand: "HP", model: "Color LaserJet 4700n/dn/dtn(黑色)", yield: 11000, price: 3756, tonerModel: "CyberTek H-C4700B", ecoNo: "4437" },
  { group: 5, brand: "HP", model: "Color LaserJet 4700n/dn/dtn(黑色)", yield: 11000, price: 3756, tonerModel: "綠蔭 Green-C4700(B)", ecoNo: "5120" },
  { group: 5, brand: "HP", model: "Color LaserJet 4700n/dn/dtn(藍色)", yield: 10000, price: 5279, tonerModel: "CyberTek H-C4700C", ecoNo: "4438" },
  { group: 5, brand: "HP", model: "Color LaserJet 4700n/dn/dtn(藍色)", yield: 10000, price: 5279, tonerModel: "綠蔭 Green-C4700(C)", ecoNo: "5121" },
  { group: 5, brand: "HP", model: "Color LaserJet 4700n/dn/dtn(洋紅色)", yield: 10000, price: 5279, tonerModel: "CyberTek H-C4700M", ecoNo: "4439" },
  { group: 5, brand: "HP", model: "Color LaserJet 4700n/dn/dtn(洋紅色)", yield: 10000, price: 5279, tonerModel: "綠蔭 Green-C4700(M)", ecoNo: "5122" },
  { group: 5, brand: "HP", model: "Color LaserJet 4700n/dn/dtn(黃色)", yield: 10000, price: 5279, tonerModel: "CyberTek H-C4700Y", ecoNo: "4440" },
  { group: 5, brand: "HP", model: "Color LaserJet 4700n/dn/dtn(黃色)", yield: 10000, price: 5279, tonerModel: "綠蔭 Green-C4700(Y)", ecoNo: "5123" },
  { group: 5, brand: "HP", model: "LaserJet P4014/4015/4515(10K)", yield: 10000, price: 2183, tonerModel: "綠蔭 Green-364A", ecoNo: "5144" },
  { group: 5, brand: "HP", model: "LaserJet P4015/4515(24K)", yield: 24000, price: 4873, tonerModel: "CyberTek HP-64X", ecoNo: "5054" },
  { group: 5, brand: "HP", model: "LaserJet P4015/4515(24K)", yield: 24000, price: 4873, tonerModel: "綠蔭 Green-364X", ecoNo: "5144" },
  { group: 5, brand: "HP", model: "LaserJet P1005/P1006", yield: 1500, price: 1168, tonerModel: "CyberTek H-35AC", ecoNo: "4164" },
  { group: 5, brand: "HP", model: "LaserJet P1005/P1006", yield: 1500, price: 1168, tonerModel: "綠蔭 Green-435", ecoNo: "4164" },
  { group: 5, brand: "HP", model: "LaserJet M5025/5035seriesMFP", yield: 15000, price: 3452, tonerModel: "綠蔭 Green-70A", ecoNo: "5133" },
  { group: 5, brand: "HP", model: "LaserJet CP1210/1215/1510/1515/1518/CM1300/1312(黑)", yield: 2200, price: 1573, tonerModel: "CyberTek HP-CP1215B", ecoNo: "5048" },
  { group: 5, brand: "HP", model: "LaserJet CP1210/1215/1510/1515/1518/CM1300/1312(黑)", yield: 2200, price: 1573, tonerModel: "綠蔭 Green-CP1215(B)", ecoNo: "5106" },
  { group: 5, brand: "HP", model: "LaserJet CP1210/1215/1510/1515/1518/CM1300/1312(藍)", yield: 1400, price: 1573, tonerModel: "CyberTek HP-CP1215C", ecoNo: "5049" },
  { group: 5, brand: "HP", model: "LaserJet CP1210/1215/1510/1515/1518/CM1300/1312(藍)", yield: 1500, price: 1573, tonerModel: "綠蔭 Green-CP1215(C)", ecoNo: "5107" },
  { group: 5, brand: "HP", model: "LaserJet CP1210/1215/1510/1515/1518/CM1300/1312(紅)", yield: 1500, price: 1573, tonerModel: "綠蔭 Green-CP1215(M)", ecoNo: "5108" },
  { group: 5, brand: "HP", model: "LaserJet CP1210/1215/1510/1515/1518/CM1300/1312(黃)", yield: 1500, price: 1573, tonerModel: "CyberTek HP-CP1215Y", ecoNo: "5051" },
  { group: 5, brand: "HP", model: "LaserJet CP1210/1215/1510/1515/1518/CM1300/1312(黃)", yield: 1500, price: 1573, tonerModel: "綠蔭 Green-CP1215(Y)", ecoNo: "5109" },
  { group: 5, brand: "HP", model: "LaserJet P2035/n/2055d/dn/x", yield: 2300, price: 1320, tonerModel: "CyberTek HP-C302", ecoNo: "" },
  { group: 5, brand: "HP", model: "LaserJet 4345 MFP/M4345 MFP/M4345x MFP", yield: 18000, price: 3553, tonerModel: "綠蔭 Green-H-45A", ecoNo: "5047" },
  { group: 5, brand: "HP", model: "Color LaserJet CP2025/CM2320 MFP(黑色)", yield: 3500, price: 3045, tonerModel: "CyberTek HP-CP2025B", ecoNo: "5055" },
  { group: 5, brand: "HP", model: "Color LaserJet CP2025/CM2320 MFP(黑色)", yield: 2800, price: 2538, tonerModel: "CyberTek HP-CP2025C", ecoNo: "5056" },
  { group: 5, brand: "HP", model: "Color LaserJet CP2025/CM2320 MFP(紅色)", yield: 2800, price: 2538, tonerModel: "CyberTek HP-CP2025M", ecoNo: "5057" },
  { group: 5, brand: "HP", model: "Color LaserJet CP2025/CM2320 MFP(黃色)", yield: 2800, price: 2538, tonerModel: "CyberTek HP-CP2025Y", ecoNo: "5058" },
  // Group 6 - IBM
  { group: 6, brand: "IBM", model: "InfoPrint 1226", yield: 12000, price: 2579, tonerModel: "CyberTek I-1226", ecoNo: "3182" },
  { group: 6, brand: "IBM", model: "InfoPrint 1226", yield: 12000, price: 2579, tonerModel: "綠蔭 Green-info1226(12K)", ecoNo: "2403" },
  { group: 6, brand: "IBM", model: "InfoPrint 1412/1512 高印量", yield: 6000, price: 1645, tonerModel: "CyberTek I-1412T", ecoNo: "3187" },
  { group: 6, brand: "IBM", model: "InfoPrint 1412/1512 高印量", yield: 6000, price: 1645, tonerModel: "綠蔭 Green-info1412", ecoNo: "4190" },
  { group: 6, brand: "IBM", model: "InfoPrint 1412/1512【光鼓】", yield: 30000, price: 1269, tonerModel: "CyberTek IM-1412-D", ecoNo: "4977" },
  { group: 6, brand: "IBM", model: "InfoPrint 1412/1512【光鼓】", yield: 30000, price: 1269, tonerModel: "綠蔭 Green-info1412(D)", ecoNo: "4191" },
  { group: 6, brand: "IBM", model: "InfoPrint 32/40", yield: 23000, price: 3086, tonerModel: "綠蔭 Green-N24/32", ecoNo: "2879" },
  { group: 6, brand: "IBM", model: "Infoprint 1332/1352/1372", yield: 21000, price: 3858, tonerModel: "綠蔭 Green-info1332", ecoNo: "2877" },
  { group: 6, brand: "IBM", model: "Infoprint 1312", yield: 6000, price: 2203, tonerModel: "綠蔭 Green-info1312", ecoNo: "2876" },
  // Group 7 - Konica Minolta
  { group: 7, brand: "Konica Minolta", model: "PP 1300W/1350W/1380MF/1390MF", yield: 6000, price: 1523, tonerModel: "CyberTek KM-PP1350-T", ecoNo: "4451" },
  { group: 7, brand: "Konica Minolta", model: "PP 1300W/1350W/1380MF/1390MF", yield: 6000, price: 1523, tonerModel: "綠蔭 Green-C1350(T)(6K)", ecoNo: "5125" },
  { group: 7, brand: "Konica Minolta", model: "Konica Minolta magicolor 2400W/2430x/2450/2500W/2530DL/2550/2480MF/2490MF(黑色)", yield: 4500, price: 1320, tonerModel: "CyberTek KM-2530B", ecoNo: "4980" },
  { group: 7, brand: "Konica Minolta", model: "Konica Minolta magicolor 2500W/2530DL/2550/2480MF/2490MF(藍色)", yield: 4500, price: 1777, tonerModel: "CyberTek KM-2530C", ecoNo: "4981" },
  { group: 7, brand: "Konica Minolta", model: "Konica Minolta magicolor 2400W/2430x/2450/2480MF(藍色)", yield: 4500, price: 1777, tonerModel: "CyberTek KM-2530M", ecoNo: "4982" },
  // Group 8 - KYOCERA
  { group: 8, brand: "KYOCERA", model: "FS-1000/1010【碳粉】", yield: 6000, price: 914, tonerModel: "CyberTek KA-TK17", ecoNo: "1588" },
  { group: 8, brand: "KYOCERA", model: "FS-1000/1010【碳粉】", yield: 6000, price: 914, tonerModel: "綠蔭 Green-TK17", ecoNo: "1785" },
  { group: 8, brand: "KYOCERA", model: "FS-1020D【碳粉】", yield: 7200, price: 1218, tonerModel: "CyberTek K-TK18", ecoNo: "3183" },
  { group: 8, brand: "KYOCERA", model: "FS-1020D【碳粉】", yield: 7200, price: 1218, tonerModel: "綠蔭 Green-TK18", ecoNo: "2874" },
  { group: 8, brand: "KYOCERA", model: "FS-6020/6026", yield: 10000, price: 1980, tonerModel: "綠蔭 Green-TK402", ecoNo: "4187" },
  { group: 8, brand: "KYOCERA", model: "FS-720/820/920", yield: 6000, price: 1168, tonerModel: "CyberTek KA-TK110", ecoNo: "4979" },
  { group: 8, brand: "KYOCERA", model: "FS-720/820/920", yield: 6000, price: 1168, tonerModel: "綠蔭 Green-TK110", ecoNo: "5124" },
  // Group 9 - LEXMARK
  { group: 9, brand: "LEXMARK", model: "Optra E210", yield: 2500, price: 1624, tonerModel: "CyberTek LK-E210", ecoNo: "2830" },
  // Group 10 - SAMSUNG
  { group: 10, brand: "SAMSUNG", model: "ML-1510/1710/1740/1750/17P SCX-4216F", yield: 3000, price: 1371, tonerModel: "CyberTek S-ML1740", ecoNo: "3184" },
  { group: 10, brand: "SAMSUNG", model: "ML-1510/1710/1740/1750/17P SCX-4216F", yield: 3000, price: 1371, tonerModel: "綠蔭 Green-ML17D3", ecoNo: "2881" },
  { group: 10, brand: "SAMSUNG", model: "FAX SF-5100/5100P/530/531P/535e/515", yield: 3000, price: 1371, tonerModel: "CyberTek S-SF5100", ecoNo: "3186" },
  { group: 10, brand: "SAMSUNG", model: "FAX SF-5100/5100P/530/531P/535e/515", yield: 3000, price: 1371, tonerModel: "綠蔭 Green-ML12D3", ecoNo: "2880" },
  { group: 10, brand: "SAMSUNG", model: "4116/4016/4216/M6Y750/755P/SF500/560P/750/755P", yield: 3000, price: 1371, tonerModel: "CyberTek Green-ML17D3", ecoNo: "2881" },
  { group: 10, brand: "SAMSUNG", model: "SCX-4521F", yield: 3000, price: 1371, tonerModel: "CyberTek SG-SCX4521", ecoNo: "4984" },
  { group: 10, brand: "SAMSUNG", model: "SCX-4521F", yield: 3000, price: 1371, tonerModel: "綠蔭 Green-ML2D03", ecoNo: "4193" },
  { group: 10, brand: "SAMSUNG", model: "SF-560R/565PR", yield: 3000, price: 1411, tonerModel: "CyberTek SG-SF550", ecoNo: "5052" },
];

const brands = ["全部", "Brother", "CANON", "EPSON", "Fuji-Xerox", "HP", "IBM", "Konica Minolta", "KYOCERA", "LEXMARK", "SAMSUNG"];

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
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            中華電信共同供應契約
          </h1>
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
          <p className="text-sm text-muted-foreground mt-4">
            共 {filteredProducts.length} 項產品
          </p>
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
              <div className="py-12 text-center text-muted-foreground">
                找不到符合的產品
              </div>
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
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            立即聯繫我們訂購
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            專業服務，品質保證，歡迎機關學校團體採購
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:02-2970-2232" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                02-2970-2232
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
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
          <p className="text-muted-foreground text-sm">
            © 2024 綠昕科技有限公司 Lyu Sin Technology Co.,Ltd. 版權所有
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            營業據點：新北市三重區昌隆街69號3樓 | 客服專線：(02) 2970-2232 | 傳真號碼：(02) 2970-2252
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ChunghwaTelecom;
