import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, ShoppingCart, Phone, Plus, Minus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { CartDialog } from "@/components/CartDialog";
import productPlaceholder from "@/assets/product-placeholder.png";

interface Product {
  id: string;
  brand: string;
  modelNumber: string;
  name: string;
  compatibility: string;
  price: number;
  category: string;
}

// Products data - deduplicated by model number
const products: Product[] = [
  // Brother
  { id: "eco-1", brand: "Brother", modelNumber: "DCI-B-TN450", name: "TN450 環保碳粉匣", compatibility: "MFC-7360/7360N/MFC-7460DN/7860DW/DCP-7060D/HL-2220/2240D/FAX-2840 高印量", price: 562, category: "碳粉匣" },
  
  // Epson
  { id: "eco-2", brand: "Epson", modelNumber: "DCI-E-S050699", name: "S050699 環保碳粉匣", compatibility: "WorkForce AL-M400DN", price: 1113, category: "碳粉匣" },
  { id: "eco-3", brand: "Epson", modelNumber: "DCI-E-S110079", name: "S110079 環保碳粉匣", compatibility: "AL-M220DN / AL-M310DN / AL-M320DN", price: 956, category: "碳粉匣" },
  
  // Fuji-Xerox
  { id: "eco-4", brand: "Fuji-Xerox", modelNumber: "DCI-X-CWAA0711", name: "CWAA0711 環保碳粉匣", compatibility: "DocuPrint2065/3055", price: 1265, category: "碳粉匣" },
  
  // HP - LaserJet Enterprise
  { id: "eco-5", brand: "HP", modelNumber: "LHPCF237A", name: "CF237A 環保碳粉匣", compatibility: "LaserJet Enterprise M607dn/M608dn 標準印量", price: 2169, category: "碳粉匣" },
  { id: "eco-6", brand: "HP", modelNumber: "DCI-H-CF237X", name: "CF237X 環保碳粉匣", compatibility: "LaserJet Enterprise M608dn 高印量", price: 2522, category: "碳粉匣" },
  { id: "eco-7", brand: "HP", modelNumber: "DCI-H-CF237Y", name: "CF237Y 環保碳粉匣", compatibility: "LaserJet Enterprise M608dn/M609dn 超高印量", price: 3326, category: "碳粉匣" },
  { id: "eco-8", brand: "HP", modelNumber: "DCI-H-CF237Z", name: "CF237Z 環保碳粉匣", compatibility: "LaserJet Enterprise M607dn/M608dn/M609dn", price: 1391, category: "碳粉匣" },
  
  // HP - LaserJet M433/M436
  { id: "eco-9", brand: "HP", modelNumber: "DCI-H-CF256A", name: "CF256A 環保碳粉匣", compatibility: "LaserJet M433a/M436dn/M436n/M436nda", price: 1106, category: "碳粉匣" },
  { id: "eco-10", brand: "HP", modelNumber: "DCI-H-CF256X", name: "CF256X 環保碳粉匣", compatibility: "LaserJet M433a/M436dn/M436n/M436nda", price: 1305, category: "碳粉匣" },
  
  // HP - LaserJet Pro M15/M28
  { id: "eco-11", brand: "HP", modelNumber: "DCI-H-CF248A", name: "CF248A 環保碳粉匣 (有晶片)", compatibility: "LaserJet Pro M15w/M28w", price: 795, category: "碳粉匣" },
  { id: "eco-12", brand: "HP", modelNumber: "DCI-H-CF248A-NC", name: "CF248A 環保碳粉匣 (無晶片)", compatibility: "LaserJet Pro M15w/M28w", price: 336, category: "碳粉匣" },
  
  // HP - LaserJet Pro M102/M130
  { id: "eco-13", brand: "HP", modelNumber: "DCI-H-CF217A", name: "CF217A 環保碳粉匣 (有晶片)", compatibility: "LaserJet Pro M102a/M102w/M130a/M130fn/M130fw/M130nw", price: 579, category: "碳粉匣" },
  { id: "eco-14", brand: "HP", modelNumber: "DCI-H-CF217A-NC", name: "CF217A 環保碳粉匣 (無晶片)", compatibility: "LaserJet Pro M102a/M102w/M130a/M130fn/M130fw/M130nw", price: 336, category: "碳粉匣" },
  
  // HP - LaserJet Pro M104/M132
  { id: "eco-15", brand: "HP", modelNumber: "DCI-H-CF218A", name: "CF218A 環保碳粉匣 (有晶片)", compatibility: "LaserJet Pro M104a/M104w/M132a/M132fn/M132fp/M132fw/M132nw/M132snw", price: 579, category: "碳粉匣" },
  { id: "eco-16", brand: "HP", modelNumber: "DCI-H-CF218A-NC", name: "CF218A 環保碳粉匣 (無晶片)", compatibility: "LaserJet Pro M104a/M104w/M132a/M132fn/M132fp/M132fw/M132nw/M132snw", price: 336, category: "碳粉匣" },
  
  // HP - LaserJet Pro P1102/M1132
  { id: "eco-17", brand: "HP", modelNumber: "DCI-H-CE285A", name: "CE285A 環保碳粉匣", compatibility: "LaserJet Pro M1132/M1212/P1102/P1102W", price: 402, category: "碳粉匣" },
  
  // HP - LaserJet Pro M12/M26
  { id: "eco-18", brand: "HP", modelNumber: "DCI-H-CF279A", name: "CF279A 環保碳粉匣 (有晶片)", compatibility: "LaserJet Pro M12a/M12w/M26a/M26nw", price: 579, category: "碳粉匣" },
  { id: "eco-19", brand: "HP", modelNumber: "DCI-H-CF279A-NC", name: "CF279A 環保碳粉匣 (無晶片)", compatibility: "LaserJet Pro M12a/M12w/M26a/M26nw", price: 336, category: "碳粉匣" },
  
  // HP - LaserJet Pro M125/M127/M201/M225
  { id: "eco-20", brand: "HP", modelNumber: "DCI-H-CF283A", name: "CF283A 環保碳粉匣", compatibility: "LaserJet Pro M125a/M125nw/M127fn/M127fw/M201dw/M225dw", price: 412, category: "碳粉匣" },
  { id: "eco-21", brand: "HP", modelNumber: "DCI-H-CF283X", name: "CF283X 環保碳粉匣", compatibility: "LaserJet Pro M201dw/M225dw 高印量", price: 482, category: "碳粉匣" },
  
  // HP - LaserJet Pro M203/M227
  { id: "eco-22", brand: "HP", modelNumber: "DCI-H-CF230A", name: "CF230A 環保碳粉匣 (有晶片)", compatibility: "LaserJet Pro M203d/M203dn/M203dw/M227fdn/M227fdw/M227sdn", price: 978, category: "碳粉匣" },
  { id: "eco-23", brand: "HP", modelNumber: "DCI-H-CF230A-NC", name: "CF230A 環保碳粉匣 (無晶片)", compatibility: "LaserJet Pro M203d/M203dn/M203dw/M227fdn/M227fdw/M227sdn", price: 386, category: "碳粉匣" },
  { id: "eco-24", brand: "HP", modelNumber: "DCI-H-CF230X", name: "CF230X 環保碳粉匣 (有晶片)", compatibility: "LaserJet Pro M203d/M203dn/M203dw/M227fdn/M227fdw/M227sdn 高印量", price: 1269, category: "碳粉匣" },
  { id: "eco-25", brand: "HP", modelNumber: "DCI-H-CF230X-NC", name: "CF230X 環保碳粉匣 (無晶片)", compatibility: "LaserJet Pro M203d/M203dn/M203dw/M227fdn/M227fdw/M227sdn 高印量", price: 435, category: "碳粉匣" },
  
  // HP - LaserJet Pro M304/M404/M428
  { id: "eco-26", brand: "HP", modelNumber: "DCI-H-CF276A", name: "CF276A 環保碳粉匣 (有晶片)", compatibility: "LaserJet Pro M304a/M404n/M404dn/M404dw/M428dw/M428fdn/M428fdw", price: 2244, category: "碳粉匣" },
  { id: "eco-27", brand: "HP", modelNumber: "DCI-H-CF276A-NC", name: "CF276A 環保碳粉匣 (無晶片)", compatibility: "LaserJet Pro M304a/M404n/M404dn/M404dw/M428dw/M428fdn/M428fdw", price: 867, category: "碳粉匣" },
  { id: "eco-28", brand: "HP", modelNumber: "DCI-H-CF276X", name: "CF276X 環保碳粉匣 (有晶片)", compatibility: "LaserJet Pro M304a/M404n/M404dn/M404dw/M428dw/M428fdn/M428fdw 高印量", price: 3490, category: "碳粉匣" },
  { id: "eco-29", brand: "HP", modelNumber: "DCI-H-CF276X-NC", name: "CF276X 環保碳粉匣 (無晶片)", compatibility: "LaserJet Pro M304a/M404n/M404dn/M404dw/M428dw/M428fdn/M428fdw 高印量", price: 867, category: "碳粉匣" },
  
  // HP - LaserJet Pro M402/M426
  { id: "eco-30", brand: "HP", modelNumber: "DCI-H-CF226A", name: "CF226A 環保碳粉匣", compatibility: "LaserJet Pro M402d/M402dn/M402dne/M402dw/M402n/M426dw/M426fdn/M426fdw", price: 1133, category: "碳粉匣" },
  { id: "eco-31", brand: "HP", modelNumber: "DCI-H-CF226X", name: "CF226X 環保碳粉匣", compatibility: "LaserJet Pro M402d/M402dn/M402dne/M402dw/M402n/M426dw/M426fdn/M426fdw 高印量", price: 1283, category: "碳粉匣" },
  
  // HP - LaserJet Pro M403/M427
  { id: "eco-32", brand: "HP", modelNumber: "DCI-H-CF228A", name: "CF228A 環保碳粉匣 (有晶片)", compatibility: "LaserJet Pro M403d/M403dn/M403n/M427dw/M427fdn/M427fdw", price: 1399, category: "碳粉匣" },
  { id: "eco-33", brand: "HP", modelNumber: "DCI-H-CF228A-NC", name: "CF228A 環保碳粉匣 (無晶片)", compatibility: "LaserJet Pro M403d/M403dn/M403n/M427dw/M427fdn/M427fdw", price: 579, category: "碳粉匣" },
  { id: "eco-34", brand: "HP", modelNumber: "DCI-H-CF228X", name: "CF228X 環保碳粉匣 (有晶片)", compatibility: "LaserJet Pro M403d/M403dn/M403n/M427dw/M427fdn/M427fdw 高印量", price: 1549, category: "碳粉匣" },
  { id: "eco-35", brand: "HP", modelNumber: "DCI-H-CF228X-NC", name: "CF228X 環保碳粉匣 (無晶片)", compatibility: "LaserJet Pro M403d/M403dn/M403n/M427dw/M427fdn/M427fdw 高印量", price: 622, category: "碳粉匣" },
  
  // HP - LaserJet Pro M501/M506/M527
  { id: "eco-36", brand: "HP", modelNumber: "DCI-H-CF287A", name: "CF287A 環保碳粉匣", compatibility: "LaserJet Pro M501dn/M501n/Enterprise M506/M527", price: 1698, category: "碳粉匣" },
  { id: "eco-37", brand: "HP", modelNumber: "DCI-H-CF287X", name: "CF287X 環保碳粉匣", compatibility: "LaserJet Pro M501dn/M501n/Enterprise M506/M527 高印量", price: 1965, category: "碳粉匣" },
  
  // HP - LaserJet Pro M1536/P1566/P1606
  { id: "eco-38", brand: "HP", modelNumber: "DCI-H-CE278A", name: "CE278A 環保碳粉匣", compatibility: "LaserJet Pro M1536dnf/P1566/P1606dn", price: 402, category: "碳粉匣" },
  
  // HP - Color LaserJet Enterprise M552/M553/M577
  { id: "eco-39", brand: "HP", modelNumber: "DCI-H-CF360A", name: "CF360A 環保碳粉匣 黑色", compatibility: "Color LaserJet Enterprise M552dn/M553dn/M553n/M553x/M577dn/M577f", price: 2242, category: "彩色碳粉匣" },
  { id: "eco-40", brand: "HP", modelNumber: "DCI-H-CF360X", name: "CF360X 環保碳粉匣 黑色高印量", compatibility: "Color LaserJet Enterprise M552dn/M553dn/M553n/M553x/M577dn/M577f", price: 3543, category: "彩色碳粉匣" },
  { id: "eco-41", brand: "HP", modelNumber: "DCI-H-CF361A", name: "CF361A 環保碳粉匣 青色", compatibility: "Color LaserJet Enterprise M552dn/M553dn/M553n/M553x/M577dn/M577f", price: 2865, category: "彩色碳粉匣" },
  { id: "eco-42", brand: "HP", modelNumber: "DCI-H-CF361X", name: "CF361X 環保碳粉匣 青色高印量", compatibility: "Color LaserJet Enterprise M552dn/M553dn/M553n/M553x/M577dn/M577f", price: 4358, category: "彩色碳粉匣" },
  { id: "eco-43", brand: "HP", modelNumber: "DCI-H-CF362A", name: "CF362A 環保碳粉匣 黃色", compatibility: "Color LaserJet Enterprise M552dn/M553dn/M553n/M553x/M577dn/M577f", price: 2865, category: "彩色碳粉匣" },
  { id: "eco-44", brand: "HP", modelNumber: "DCI-H-CF362X", name: "CF362X 環保碳粉匣 黃色高印量", compatibility: "Color LaserJet Enterprise M552dn/M553dn/M553n/M553x/M577dn/M577f", price: 4358, category: "彩色碳粉匣" },
  { id: "eco-45", brand: "HP", modelNumber: "DCI-H-CF363A", name: "CF363A 環保碳粉匣 洋紅色", compatibility: "Color LaserJet Enterprise M552dn/M553dn/M553n/M553x/M577dn/M577f", price: 2865, category: "彩色碳粉匣" },
  { id: "eco-46", brand: "HP", modelNumber: "DCI-H-CF363X", name: "CF363X 環保碳粉匣 洋紅色高印量", compatibility: "Color LaserJet Enterprise M552dn/M553dn/M553n/M553x/M577dn/M577f", price: 4358, category: "彩色碳粉匣" },
  
  // HP - Color LaserJet Pro M252/M274/M277
  { id: "eco-47", brand: "HP", modelNumber: "DCI-H-CF400A", name: "CF400A 環保碳粉匣 黑色", compatibility: "Color LaserJet Pro M252dw/M252n/M274n/M277dw/M277n", price: 1133, category: "彩色碳粉匣" },
  { id: "eco-48", brand: "HP", modelNumber: "DCI-H-CF400X", name: "CF400X 環保碳粉匣 黑色高印量", compatibility: "Color LaserJet Pro M252dw/M252n/M274n/M277dw/M277n", price: 1391, category: "彩色碳粉匣" },
  { id: "eco-49", brand: "HP", modelNumber: "DCI-H-CF401A", name: "CF401A 環保碳粉匣 青色", compatibility: "Color LaserJet Pro M252dw/M252n/M274n/M277dw/M277n", price: 1133, category: "彩色碳粉匣" },
  { id: "eco-50", brand: "HP", modelNumber: "DCI-H-CF401X", name: "CF401X 環保碳粉匣 青色高印量", compatibility: "Color LaserJet Pro M252dw/M252n/M274n/M277dw/M277n", price: 1391, category: "彩色碳粉匣" },
  { id: "eco-51", brand: "HP", modelNumber: "DCI-H-CF402A", name: "CF402A 環保碳粉匣 黃色", compatibility: "Color LaserJet Pro M252dw/M252n/M274n/M277dw/M277n", price: 1133, category: "彩色碳粉匣" },
  { id: "eco-52", brand: "HP", modelNumber: "DCI-H-CF402X", name: "CF402X 環保碳粉匣 黃色高印量", compatibility: "Color LaserJet Pro M252dw/M252n/M274n/M277dw/M277n", price: 1391, category: "彩色碳粉匣" },
  { id: "eco-53", brand: "HP", modelNumber: "DCI-H-CF403A", name: "CF403A 環保碳粉匣 洋紅色", compatibility: "Color LaserJet Pro M252dw/M252n/M274n/M277dw/M277n", price: 1133, category: "彩色碳粉匣" },
  { id: "eco-54", brand: "HP", modelNumber: "DCI-H-CF403X", name: "CF403X 環保碳粉匣 洋紅色高印量", compatibility: "Color LaserJet Pro M252dw/M252n/M274n/M277dw/M277n", price: 1391, category: "彩色碳粉匣" },
  
  // HP - Color LaserJet Pro M452/M477
  { id: "eco-55", brand: "HP", modelNumber: "DCI-H-CF410A", name: "CF410A 環保碳粉匣 黑色", compatibility: "Color LaserJet Pro M452dn/M452dw/M452nw/M477fdn/M477fdw/M477fnw", price: 1362, category: "彩色碳粉匣" },
  { id: "eco-56", brand: "HP", modelNumber: "DCI-H-CF410X", name: "CF410X 環保碳粉匣 黑色高印量", compatibility: "Color LaserJet Pro M452dn/M452dw/M452nw/M477fdn/M477fdw/M477fnw", price: 1965, category: "彩色碳粉匣" },
  { id: "eco-57", brand: "HP", modelNumber: "DCI-H-CF411A", name: "CF411A 環保碳粉匣 青色", compatibility: "Color LaserJet Pro M452dn/M452dw/M452nw/M477fdn/M477fdw/M477fnw", price: 1362, category: "彩色碳粉匣" },
  { id: "eco-58", brand: "HP", modelNumber: "DCI-H-CF411X", name: "CF411X 環保碳粉匣 青色高印量", compatibility: "Color LaserJet Pro M452dn/M452dw/M452nw/M477fdn/M477fdw/M477fnw", price: 1965, category: "彩色碳粉匣" },
  { id: "eco-59", brand: "HP", modelNumber: "DCI-H-CF412A", name: "CF412A 環保碳粉匣 黃色", compatibility: "Color LaserJet Pro M452dn/M452dw/M452nw/M477fdn/M477fdw/M477fnw", price: 1362, category: "彩色碳粉匣" },
  { id: "eco-60", brand: "HP", modelNumber: "DCI-H-CF412X", name: "CF412X 環保碳粉匣 黃色高印量", compatibility: "Color LaserJet Pro M452dn/M452dw/M452nw/M477fdn/M477fdw/M477fnw", price: 1965, category: "彩色碳粉匣" },
  { id: "eco-61", brand: "HP", modelNumber: "DCI-H-CF413A", name: "CF413A 環保碳粉匣 洋紅色", compatibility: "Color LaserJet Pro M452dn/M452dw/M452nw/M477fdn/M477fdw/M477fnw", price: 1362, category: "彩色碳粉匣" },
  { id: "eco-62", brand: "HP", modelNumber: "DCI-H-CF413X", name: "CF413X 環保碳粉匣 洋紅色高印量", compatibility: "Color LaserJet Pro M452dn/M452dw/M452nw/M477fdn/M477fdw/M477fnw", price: 1965, category: "彩色碳粉匣" },
  
  // HP - Color LaserJet Pro M254/M280/M281 (無晶片)
  { id: "eco-63", brand: "HP", modelNumber: "DCI-H-CF500A-NC", name: "CF500A 環保碳粉匣 黑色 (無晶片)", compatibility: "Color LaserJet Pro M254dw/M254nw/M280nw/M281fdn/M281fdw", price: 650, category: "彩色碳粉匣" },
  { id: "eco-64", brand: "HP", modelNumber: "DCI-H-CF500X-NC", name: "CF500X 環保碳粉匣 黑色高印量 (無晶片)", compatibility: "Color LaserJet Pro M254dw/M254nw/M280nw/M281fdn/M281fdw", price: 650, category: "彩色碳粉匣" },
  { id: "eco-65", brand: "HP", modelNumber: "DCI-H-CF501A-NC", name: "CF501A 環保碳粉匣 青色 (無晶片)", compatibility: "Color LaserJet Pro M254dw/M254nw/M280nw/M281fdn/M281fdw", price: 650, category: "彩色碳粉匣" },
  { id: "eco-66", brand: "HP", modelNumber: "DCI-H-CF501X-NC", name: "CF501X 環保碳粉匣 青色高印量 (無晶片)", compatibility: "Color LaserJet Pro M254dw/M254nw/M280nw/M281fdn/M281fdw", price: 650, category: "彩色碳粉匣" },
  { id: "eco-67", brand: "HP", modelNumber: "DCI-H-CF502A-NC", name: "CF502A 環保碳粉匣 黃色 (無晶片)", compatibility: "Color LaserJet Pro M254dw/M254nw/M280nw/M281fdn/M281fdw", price: 650, category: "彩色碳粉匣" },
  { id: "eco-68", brand: "HP", modelNumber: "DCI-H-CF502X-NC", name: "CF502X 環保碳粉匣 黃色高印量 (無晶片)", compatibility: "Color LaserJet Pro M254dw/M254nw/M280nw/M281fdn/M281fdw", price: 650, category: "彩色碳粉匣" },
  { id: "eco-69", brand: "HP", modelNumber: "DCI-H-CF503A-NC", name: "CF503A 環保碳粉匣 洋紅色 (無晶片)", compatibility: "Color LaserJet Pro M254dw/M254nw/M280nw/M281fdn/M281fdw", price: 650, category: "彩色碳粉匣" },
  { id: "eco-70", brand: "HP", modelNumber: "DCI-H-CF503X-NC", name: "CF503X 環保碳粉匣 洋紅色高印量 (無晶片)", compatibility: "Color LaserJet Pro M254dw/M254nw/M280nw/M281fdn/M281fdw", price: 650, category: "彩色碳粉匣" },
  
  // HP - Color LaserJet Pro M154/M180/M181 (無晶片)
  { id: "eco-71", brand: "HP", modelNumber: "DCI-H-CF510A-NC", name: "CF510A 環保碳粉匣 黑色 (無晶片)", compatibility: "Color LaserJet Pro M154a/M154nw/M180n/M180nw/M181fw", price: 650, category: "彩色碳粉匣" },
  { id: "eco-72", brand: "HP", modelNumber: "DCI-H-CF511A-NC", name: "CF511A 環保碳粉匣 青色 (無晶片)", compatibility: "Color LaserJet Pro M154a/M154nw/M180n/M180nw/M181fw", price: 650, category: "彩色碳粉匣" },
  { id: "eco-73", brand: "HP", modelNumber: "DCI-H-CF512A-NC", name: "CF512A 環保碳粉匣 黃色 (無晶片)", compatibility: "Color LaserJet Pro M154a/M154nw/M180n/M180nw/M181fw", price: 650, category: "彩色碳粉匣" },
  { id: "eco-74", brand: "HP", modelNumber: "DCI-H-CF513A-NC", name: "CF513A 環保碳粉匣 洋紅色 (無晶片)", compatibility: "Color LaserJet Pro M154a/M154nw/M180n/M180nw/M181fw", price: 650, category: "彩色碳粉匣" },
];

const brands = ["全部", "Brother", "Epson", "Fuji-Xerox", "HP"];
const categories = ["全部", "碳粉匣", "彩色碳粉匣"];

const OrderEco = () => {
  const { toast } = useToast();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("全部");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [selectedTaxOptions, setSelectedTaxOptions] = useState<Record<string, "untaxed" | "taxed">>({});

  const getQuantity = (productId: string) => selectedQuantities[productId] || 1;
  const getTaxOption = (productId: string) => selectedTaxOptions[productId] || "untaxed";

  const setQuantity = (productId: string, qty: number) => {
    setSelectedQuantities(prev => ({ ...prev, [productId]: Math.max(1, qty) }));
  };

  const setTaxOption = (productId: string, option: "untaxed" | "taxed") => {
    setSelectedTaxOptions(prev => ({ ...prev, [productId]: option }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.compatibility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "全部" || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === "全部" || product.category === selectedCategory;
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    const taxOption = getTaxOption(product.id);
    const quantity = getQuantity(product.id);
    const unitPrice = taxOption === "taxed" ? Math.round(product.price * 1.05) : product.price;
    const priceType = taxOption === "taxed" ? "含稅" : "未稅";
    
    addToCart(product.id, `${product.name} (${product.modelNumber})`, quantity, priceType, unitPrice, "eco");

    toast({
      title: "✓ 已加入購物車",
      description: `${product.name} x ${quantity}`,
      duration: 2000,
    });
    
    setQuantity(product.id, 1);
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "購物車已清空",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">返回首頁</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg eco-gradient flex items-center justify-center shadow-eco">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-lg leading-tight text-foreground">綠昕科技</span>
                <span className="text-xs text-muted-foreground">環保碳粉匣專家</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                className="relative"
                onClick={() => setIsCartDialogOpen(true)}
              >
                <ShoppingCart className="w-4 h-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
              <a href="tel:02-2970-2232">
                <Button className="eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg transition-all">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">立即諮詢</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Product Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                環保碳粉匣
              </h1>
              <p className="text-muted-foreground">台灣製造 ・ 品質優良 ・ 價格實惠 ・ 環保認證</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="搜尋型號、名稱或適用機型..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="品牌" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="分類" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              共 {filteredProducts.length} 項產品
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="p-4">
                    <div className="bg-muted rounded-lg p-4 flex items-center justify-center min-h-[120px] mb-4">
                      <img 
                        src={productPlaceholder} 
                        alt={product.name}
                        className="max-h-[100px] object-contain"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {product.brand}
                        </span>
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          {product.category}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">{product.modelNumber}</p>
                      <h3 className="font-medium text-foreground text-sm min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        適用：{product.compatibility}
                      </p>
                      
                      {/* Price Display */}
                      <div className="pt-2 border-t border-border">
                        <RadioGroup
                          value={getTaxOption(product.id)}
                          onValueChange={(value) => setTaxOption(product.id, value as "untaxed" | "taxed")}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="untaxed" id={`${product.id}-untaxed`} />
                            <Label htmlFor={`${product.id}-untaxed`} className="text-xs cursor-pointer">
                              未稅 ${product.price.toLocaleString()}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="taxed" id={`${product.id}-taxed`} />
                            <Label htmlFor={`${product.id}-taxed`} className="text-xs cursor-pointer">
                              含稅 ${Math.round(product.price * 1.05).toLocaleString()}
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center justify-center gap-3 py-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(product.id, getQuantity(product.id) - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold min-w-[2rem] text-center">
                          {getQuantity(product.id)}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(product.id, getQuantity(product.id) + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button 
                        className="w-full eco-gradient text-primary-foreground"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        加入購物車
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Dialog */}
          <CartDialog
            open={isCartDialogOpen}
            onOpenChange={setIsCartDialogOpen}
            cart={cart}
            removeFromCart={removeFromCart}
            updateCartItemQuantity={updateCartItemQuantity}
            clearCart={handleClearCart}
            getTotalItems={getTotalItems}
            getTotalPrice={getTotalPrice}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 綠昕科技有限公司 版權所有
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OrderEco;
