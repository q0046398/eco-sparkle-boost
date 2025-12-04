import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Leaf, ShoppingCart, Send, Phone, Plus, Trash2, Minus, Store, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { MiniCart } from "@/components/MiniCart";
import { CartDialog } from "@/components/CartDialog";
import productPlaceholder from "@/assets/product-placeholder.png";

interface Product {
  id: string;
  modelNumber: string;
  name: string;
  price: number;
  compatibility: string;
  brand: string;
  category: string;
}

const products: Product[] = [
  // EPSON 碳粉匣
  { id: "S110078", modelNumber: "S110078", name: "EPSON AL-M320DN 原廠超大高印碳粉匣 10078", price: 5400, compatibility: "AL-M320DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S110079", modelNumber: "S110079", name: "EPSON M220DN/M310/M320 原廠高印量碳粉匣", price: 4550, compatibility: "M220DN / M310 / M320", brand: "EPSON", category: "碳粉匣" },
  { id: "S110080", modelNumber: "S110080", name: "EPSON AL-M220DN/M310/M320 原廠碳粉匣", price: 3500, compatibility: "AL-M220DN / M310 / M320", brand: "EPSON", category: "碳粉匣" },
  { id: "C1700組", modelNumber: "C1700組", name: "EPSON AL-C1700/C1750N 原廠碳粉匣 (四色套組)", price: 7200, compatibility: "C1700 / C1750N / CX17NF", brand: "EPSON", category: "碳粉匣" },
  { id: "S050166", modelNumber: "S050166", name: "EPSON EPL-6200 / S050166 原廠高容量碳粉匣", price: 2000, compatibility: "EPL-6200", brand: "EPSON", category: "碳粉匣" },
  { id: "S050245", modelNumber: "S050245", name: "EPSON C4200/C4200DN 原廠黑色碳粉匣 (S050286)", price: 2450, compatibility: "C4200 / C4200DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S050283", modelNumber: "S050283", name: "EPSON C4200/C4200DN 原廠黃色碳粉匣 (S050242)", price: 6400, compatibility: "C4200 / C4200DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S050284", modelNumber: "S050284", name: "EPSON C4200/C4200DN 原廠紅色(洋紅)碳粉匣", price: 6400, compatibility: "C4200 / C4200DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S050285", modelNumber: "S050285", name: "EPSON C4200/C4200DN 原廠藍色(青色)碳粉匣", price: 6400, compatibility: "C4200 / C4200DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S050475", modelNumber: "S050475", name: "EPSON C9200 高容量紅色碳粉", price: 3000, compatibility: "C9200 / C9200N", brand: "EPSON", category: "碳粉匣" },
  { id: "S050477", modelNumber: "S050477", name: "EPSON C9200 高容量黑色碳粉", price: 2000, compatibility: "C9200 / C9200N", brand: "EPSON", category: "碳粉匣" },
  { id: "S050588", modelNumber: "S050588", name: "EPSON M2410DN/MX21DNF 原廠高容量黑色碳粉匣", price: 1500, compatibility: "M2410DN / MX21DNF", brand: "EPSON", category: "碳粉匣" },
  { id: "S050590", modelNumber: "S050590", name: "EPSON AL-C3900/CX37DNF 全新原廠黃色碳粉匣", price: 5814, compatibility: "AL-C3900 / CX37DNF", brand: "EPSON", category: "碳粉匣" },
  { id: "S050591", modelNumber: "S050591", name: "EPSON AL-C3900/CX37DNF 全新原廠紅色碳粉匣", price: 5814, compatibility: "AL-C3900 / CX37DNF", brand: "EPSON", category: "碳粉匣" },
  { id: "S050592", modelNumber: "S050592", name: "EPSON AL-C3900/CX37DNF 全新原廠藍色碳粉匣", price: 5814, compatibility: "AL-C3900 / CX37DNF", brand: "EPSON", category: "碳粉匣" },
  { id: "S050593", modelNumber: "S050593", name: "EPSON AL-C3900/CX37DNF 全新原廠黑色碳粉匣", price: 5814, compatibility: "AL-C3900 / CX37DNF", brand: "EPSON", category: "碳粉匣" },
  { id: "S050602", modelNumber: "S050602", name: "EPSON AL-C9300N 全新原廠原裝黃色碳粉匣", price: 6120, compatibility: "AL-C9300N", brand: "EPSON", category: "碳粉匣" },
  { id: "S050604", modelNumber: "S050604", name: "EPSON AL-C9300N 全新原廠原裝藍色碳粉匣", price: 6120, compatibility: "AL-C9300N", brand: "EPSON", category: "碳粉匣" },
  { id: "S050605", modelNumber: "S050605", name: "EPSON AL-C9300N 全新原廠原裝黑色碳粉匣", price: 3500, compatibility: "AL-C9300N", brand: "EPSON", category: "碳粉匣" },
  { id: "S050611", modelNumber: "S050611", name: "EPSON AL-C1700/C1750N 原廠黃色碳粉匣", price: 1867, compatibility: "C1700 / C1750N / CX17NF", brand: "EPSON", category: "碳粉匣" },
  { id: "S050612", modelNumber: "S050612", name: "EPSON AL-C1700/C1750N 原廠紅色碳粉匣", price: 1867, compatibility: "C1700 / C1750N / CX17NF", brand: "EPSON", category: "碳粉匣" },
  { id: "S050613", modelNumber: "S050613", name: "EPSON AL-C1700/C1750N 原廠藍色碳粉匣", price: 1867, compatibility: "C1700 / C1750N / CX17NF", brand: "EPSON", category: "碳粉匣" },
  { id: "S050614", modelNumber: "S050614", name: "EPSON AL-C1700/C1750N 原廠黑色碳粉匣", price: 2000, compatibility: "C1700 / C1750N / CX17NF", brand: "EPSON", category: "碳粉匣" },
  { id: "S050691", modelNumber: "S050691", name: "EPSON AL-M300/M300DN/MX300DNF 原廠高容量碳粉匣", price: 5400, compatibility: "AL-M300 / M300DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S050747", modelNumber: "S050747", name: "EPSON AL-C300N/DN 全新原廠原裝黃色碳粉匣", price: 8400, compatibility: "AL-C300N / DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S050748", modelNumber: "S050748", name: "EPSON AL-C300N/DN 全新原廠原裝紅色碳粉匣", price: 8400, compatibility: "AL-C300N / DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S050749", modelNumber: "S050749", name: "EPSON AL-C300N/DN 全新原廠原裝藍色碳粉匣", price: 8400, compatibility: "AL-C300N / DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S050750", modelNumber: "S050750", name: "EPSON AL-C300N/DN 全新原廠原裝黑色碳粉匣", price: 5600, compatibility: "AL-C300N / DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S050762", modelNumber: "S050762", name: "EPSON AL-M8200 全新原廠原裝高容量碳粉匣", price: 8976, compatibility: "AL-M8200", brand: "EPSON", category: "碳粉匣" },
  { id: "S051124", modelNumber: "S051124", name: "EPSON C3800/C3800DN 原廠高容量黃色碳粉匣", price: 6800, compatibility: "AcuLaser C3800 / DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S051125", modelNumber: "S051125", name: "EPSON C3800/C3800DN 原廠高容量紅色碳粉匣", price: 6800, compatibility: "AcuLaser C3800 / DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S051126", modelNumber: "S051126", name: "EPSON C3800/C3800DN 原廠高容量藍色碳粉匣", price: 6800, compatibility: "AcuLaser C3800 / DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S051127", modelNumber: "S051127", name: "EPSON C3800/C3800DN 原廠高容量黑色碳粉匣", price: 5610, compatibility: "AcuLaser C3800 / DN", brand: "EPSON", category: "碳粉匣" },
  { id: "S051158", modelNumber: "S051158", name: "EPSON AL-C2800N 全新原廠原裝黃色碳粉匣", price: 6400, compatibility: "AL-C2800N", brand: "EPSON", category: "碳粉匣" },
  { id: "S051159", modelNumber: "S051159", name: "EPSON AL-C2800N 全新原廠原裝紅色碳粉匣", price: 6400, compatibility: "AL-C2800N", brand: "EPSON", category: "碳粉匣" },
  { id: "S051189", modelNumber: "S051189", name: "EPSON M8000N/M8000 全新原廠碳粉匣", price: 5100, compatibility: "M8000N / M8000", brand: "EPSON", category: "碳粉匣" },
  
  // KYOCERA 碳粉匣
  { id: "TK-1114", modelNumber: "TK-1114", name: "KYOCERA FS-1040/1020MFP 原廠黑色碳粉匣", price: 2310, compatibility: "FS-1040 / 1020MFP", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-1124", modelNumber: "TK-1124", name: "KYOCERA FS-1060DN/1025MFP 原廠黑色碳粉匣", price: 2452, compatibility: "FS-1060DN / 1025MFP", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-1144", modelNumber: "TK-1144", name: "KYOCERA FS-1035MFP/FS-1135M 原廠黑色碳粉匣", price: 3570, compatibility: "FS-1035MFP / 1135M", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-1156", modelNumber: "TK-1156", name: "KYOCERA ECOSYS P2235DN 原廠黑色碳粉匣", price: 3380, compatibility: "ECOSYS P2235DN", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-1166", modelNumber: "TK-1166", name: "KYOCERA P2040DN 原廠黑色碳粉匣", price: 5145, compatibility: "P2040DN", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-1176", modelNumber: "TK-1176", name: "KYOCERA M2540dn 原廠黑色碳粉匣", price: 4494, compatibility: "M2540dn", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-1186", modelNumber: "TK-1186", name: "KYOCERA M-2635DN 原廠黑色碳粉匣", price: 2940, compatibility: "M-2635DN", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-1196", modelNumber: "TK-1196", name: "KYOCERA P2230DN 原廠黑色碳粉匣", price: 3360, compatibility: "ECOSYS P2230dn", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-134", modelNumber: "TK-134", name: "KYOCERA FS-1300/1300D 原廠黑色碳粉匣", price: 2730, compatibility: "FS-1300 / 1300D", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-164", modelNumber: "TK-164", name: "KYOCERA FS-1120D 原廠黑色碳粉匣", price: 2400, compatibility: "FS-1120D", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-174", modelNumber: "TK-174", name: "KYOCERA FS-1320D/1370D 原廠黑色碳粉匣", price: 4410, compatibility: "FS-1320D / 1370D", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-3104", modelNumber: "TK-3104", name: "KYOCERA FS-2100DN 全新原廠黑色碳粉匣", price: 3000, compatibility: "FS-2100DN", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-3134", modelNumber: "TK-3134", name: "KYOCERA FS-4200/4300DN 全新原廠黑色碳粉匣", price: 6195, compatibility: "FS-4200 / 4300DN", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-3166", modelNumber: "TK-3166", name: "KYOCERA P3045dn/M3645idn 原廠黑色碳粉匣", price: 4883, compatibility: "P3045dn / M3645idn", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-3176", modelNumber: "TK-3176", name: "KYOCERA ECOSYS P3050dn 原廠黑色碳粉匣", price: 5775, compatibility: "ECOSYS P3050dn", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-454", modelNumber: "TK-454", name: "KYOCERA FS-6970DN/6975DN 原廠黑色碳粉匣", price: 4200, compatibility: "FS-6970DN / 6975DN", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-5236C", modelNumber: "TK-5236C", name: "KYOCERA M5520cdn/P5020cdn 原廠藍色碳粉匣", price: 3564, compatibility: "M5520cdn / P5020cdn", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-5236K", modelNumber: "TK-5236K", name: "KYOCERA M5520cdn/P5020cdn 原廠黑色碳粉匣", price: 2484, compatibility: "M5520cdn / P5020cdn", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-5236M", modelNumber: "TK-5236M", name: "KYOCERA M5520cdn/P5020cdn 原廠紅色碳粉匣", price: 3564, compatibility: "M5520cdn / P5020cdn", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-5236Y", modelNumber: "TK-5236Y", name: "KYOCERA M5520cdn/P5020cdn 原廠黃色碳粉匣", price: 3564, compatibility: "M5520cdn / P5020cdn", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-584C", modelNumber: "TK-584C", name: "KYOCERA FS-C5150DN 原廠藍色碳粉匣", price: 3938, compatibility: "FS-C5150DN", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-584K", modelNumber: "TK-584K", name: "KYOCERA FS-C5150DN 原廠黑色碳粉匣", price: 3938, compatibility: "FS-C5150DN", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-584M", modelNumber: "TK-584M", name: "KYOCERA FS-C5150DN 原廠紅色碳粉匣", price: 3938, compatibility: "FS-C5150DN", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-584Y", modelNumber: "TK-584Y", name: "KYOCERA FS-C5150DN 原廠黃色碳粉匣", price: 3938, compatibility: "FS-C5150DN", brand: "KYOCERA", category: "碳粉匣" },
  { id: "TK-7304", modelNumber: "TK-7304", name: "KYOCERA P4035dn/P4040dn 全新原廠黑色碳粉匣", price: 6983, compatibility: "P4035dn / P4040dn", brand: "KYOCERA", category: "碳粉匣" },
  
  // HP 碳粉匣
  { id: "CE260X", modelNumber: "CE260X", name: "HP CE260X 全新原廠黑色碳粉匣 (CP4525)", price: 2500, compatibility: "CP4525 / CP4025", brand: "HP", category: "碳粉匣" },
  { id: "CE410XC", modelNumber: "CE410XC", name: "HP CLJ M351/M451 原廠黑色碳粉匣 (高容量)", price: 3300, compatibility: "M351 / M375 / M451", brand: "HP", category: "碳粉匣" },
  { id: "CE411AC", modelNumber: "CE411AC", name: "HP CLJ M351/M451 原廠藍色碳粉匣", price: 3800, compatibility: "M351 / M375 / M451", brand: "HP", category: "碳粉匣" },
  { id: "CE412AC", modelNumber: "CE412AC", name: "HP CLJ M351/M451 原廠黃色碳粉匣", price: 3800, compatibility: "M351 / M375 / M451", brand: "HP", category: "碳粉匣" },
  { id: "CE413AC", modelNumber: "CE413AC", name: "HP CLJ M351/M451 原廠紅色碳粉匣", price: 3800, compatibility: "M351 / M375 / M451", brand: "HP", category: "碳粉匣" },
  { id: "CF214XC", modelNumber: "CF214XC", name: "HP M712dn/M725DN 全新原廠高容量碳粉匣 14X", price: 6009, compatibility: "M712dn / M725DN", brand: "HP", category: "碳粉匣" },
  { id: "CF287X", modelNumber: "CF287X", name: "HP M506dn/M527 全新原廠高容量黑色碳粉匣 87X", price: 6180, compatibility: "M506dn / M527", brand: "HP", category: "碳粉匣" },
  { id: "CF330XC", modelNumber: "CF330XC", name: "HP M651DN/M650 全新原廠黑色碳粉匣", price: 9000, compatibility: "M651dn / M650", brand: "HP", category: "碳粉匣" },
  { id: "CF331AC", modelNumber: "CF331AC", name: "HP M651DN/M650 全新原廠藍色碳粉匣", price: 12000, compatibility: "M651dn / M650", brand: "HP", category: "碳粉匣" },
  { id: "CF332AC", modelNumber: "CF332AC", name: "HP M651DN/M650 全新原廠黃色碳粉匣", price: 12000, compatibility: "M651dn / M650", brand: "HP", category: "碳粉匣" },
  { id: "CF333AC", modelNumber: "CF333AC", name: "HP M651DN/M650 全新原廠紅色碳粉匣", price: 12000, compatibility: "M651dn / M650", brand: "HP", category: "碳粉匣" },
  
  // BROTHER 碳粉匣
  { id: "TN-3478", modelNumber: "TN-3478", name: "Brother TN-3478 原廠碳粉匣", price: 3978, compatibility: "MFC-L5700DN / L6900DN", brand: "BROTHER", category: "碳粉匣" },
  { id: "TN-459C", modelNumber: "TN-459C", name: "Brother TN-459C 原廠超高容量藍色碳粉", price: 5865, compatibility: "L8360CDW / L8900CDW", brand: "BROTHER", category: "碳粉匣" },
  { id: "TN-459M", modelNumber: "TN-459M", name: "Brother TN-459M 原廠超高容量紅色碳粉", price: 5865, compatibility: "L8360CDW / L8900CDW", brand: "BROTHER", category: "碳粉匣" },
  
  // FujiXerox 碳粉匣
  { id: "CT201949", modelNumber: "CT201949", name: "FujiXerox M455df/P455d 原廠高容量黑色碳粉匣", price: 4800, compatibility: "M455df / P455d", brand: "FujiXerox", category: "碳粉匣" },
  
  // EPSON 感光鼓
  { id: "S050477-2", modelNumber: "S050477", name: "EPSON C9200 黑色高容量碳粉匣感光鼓組", price: 6100, compatibility: "C9200 (感光鼓)", brand: "EPSON", category: "感光鼓" },
  { id: "S051109", modelNumber: "S051109", name: "EPSON AL-C4200 C4200N 全新原廠原裝感光鼓", price: 8600, compatibility: "AL-C4200 / C4200N (感光鼓)", brand: "EPSON", category: "感光鼓" },
  { id: "S051175", modelNumber: "S051175", name: "EPSON C9200 S051175 黃色原廠感光滾筒", price: 7038, compatibility: "C9200 (感光鼓)", brand: "EPSON", category: "感光鼓" },
  { id: "S051176", modelNumber: "S051176", name: "EPSON C9200 S051176 紅色原廠感光滾筒", price: 7038, compatibility: "C9200 (感光鼓)", brand: "EPSON", category: "感光鼓" },
  { id: "S051177", modelNumber: "S051177", name: "EPSON C9200 S051177 藍色原廠感光滾筒", price: 7038, compatibility: "C9200 (感光鼓)", brand: "EPSON", category: "感光鼓" },
  { id: "S051178", modelNumber: "S051178", name: "EPSON C9200 S051178 黑色原廠感光滾筒", price: 7956, compatibility: "C9200 (感光鼓)", brand: "EPSON", category: "感光鼓" },
  
  // EPSON 墨水袋
  { id: "T9691", modelNumber: "T9691", name: "EPSON WF-M5799 全新原廠墨水袋 (黑)", price: 3300, compatibility: "WF-M5799 / WF-M5299", brand: "EPSON", category: "墨水袋" },
  { id: "T9701", modelNumber: "T9701", name: "EPSON WF-M5799 全新原廠墨水袋 (高容量)", price: 11500, compatibility: "WF-M5799 / WF-M5299", brand: "EPSON", category: "墨水袋" },
];

const ITEMS_PER_PAGE = 20;

const OrderOriginal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [selectedTaxOptions, setSelectedTaxOptions] = useState<Record<string, "untaxed" | "taxed">>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [selectedBrand, setSelectedBrand] = useState<string>("全部");
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories and brands
  const categories = ["全部", ...Array.from(new Set(products.map(p => p.category)))];
  const brands = ["全部", ...Array.from(new Set(products.map(p => p.brand)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.compatibility.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "全部" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "全部" || product.brand === selectedBrand;
    
    return matchesSearch && matchesCategory && matchesBrand;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setCurrentPage(1);
  };

  const getQuantity = (productId: string) => selectedQuantities[productId] || 1;
  const getTaxOption = (productId: string) => selectedTaxOptions[productId] || "untaxed";

  const setQuantity = (productId: string, qty: number) => {
    setSelectedQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  const setTaxOption = (productId: string, option: "untaxed" | "taxed") => {
    setSelectedTaxOptions(prev => ({ ...prev, [productId]: option }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = getQuantity(product.id);
    const taxOption = getTaxOption(product.id);
    const unitPrice = taxOption === "taxed" ? Math.round(product.price * 1.05) : product.price;
    const priceType = taxOption === "taxed" ? "含稅" : "未稅";

    addToCart(product.id, product.name, quantity, priceType, unitPrice, "original");

    toast({
      title: "✓ 已加入購物車",
      description: `${product.name} (${priceType}) x ${quantity}`,
      duration: 2000,
    });

    // Reset quantity after adding to cart
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
              <MiniCart
                cart={cart}
                getTotalItems={getTotalItems}
                getTotalPrice={getTotalPrice}
                onOpenCart={() => setIsCartDialogOpen(true)}
              />
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

      {/* Order Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Product Display Section */}
          <div className="max-w-7xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                原廠碳粉匣
              </h1>
              <p className="text-muted-foreground">EPSON 原廠碳粉匣特惠價格</p>
            </div>

            {/* Filters */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <Input
                  type="text"
                  placeholder="搜尋產品型號、名稱或適用機型..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="text-lg"
                />
              </div>
              
              {/* Category and Brand Filters */}
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-muted-foreground">產品類別</Label>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-muted-foreground">品牌</Label>
                  <Select value={selectedBrand} onValueChange={handleBrandChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
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
              </div>
            </div>

            {/* Product Count */}
            <div className="mb-4 text-center text-muted-foreground">
              共 {filteredProducts.length} 項產品 (第 {currentPage} / {totalPages || 1} 頁)
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => {
                const quantity = getQuantity(product.id);
                const taxOption = getTaxOption(product.id);
                const displayPrice = taxOption === "taxed" ? Math.round(product.price * 1.05) : product.price;
                const alternatePrice = taxOption === "taxed" ? product.price : Math.round(product.price * 1.05);

                return (
                  <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <CardContent className="p-0">
                      <div className="bg-white p-4 flex items-center justify-center min-h-[180px]">
                        <img 
                          src={productPlaceholder} 
                          alt={product.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                              {product.brand}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary-foreground font-medium">
                              {product.category}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">型號: {product.modelNumber}</p>
                          <h3 className="font-medium text-sm text-foreground leading-snug min-h-[2.5rem]">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">適用: {product.compatibility}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-lg font-bold text-foreground">
                            {taxOption === "untaxed" ? "未稅" : "含稅"} NT${displayPrice.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {taxOption === "untaxed" ? "含稅" : "未稅"} NT${alternatePrice.toLocaleString()}
                          </p>
                        </div>
                        
                        <RadioGroup 
                          value={taxOption} 
                          onValueChange={(value) => setTaxOption(product.id, value as "untaxed" | "taxed")} 
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="untaxed" id={`tax-${product.id}-untaxed`} />
                            <Label htmlFor={`tax-${product.id}-untaxed`} className="text-sm cursor-pointer">未稅</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="taxed" id={`tax-${product.id}-taxed`} />
                            <Label htmlFor={`tax-${product.id}-taxed`} className="text-sm cursor-pointer">含稅</Label>
                          </div>
                        </RadioGroup>
                        
                        <div className="flex items-center justify-center gap-3 py-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(product.id, Math.max(1, quantity - 1))}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-lg font-semibold min-w-[2rem] text-center">
                            {quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(product.id, quantity + 1)}
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
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "eco-gradient text-primary-foreground" : ""}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>沒有找到符合的產品</p>
              </div>
            )}
          </div>

          {/* Cart Dialog */}
          <Dialog open={isCartDialogOpen} onOpenChange={setIsCartDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl">購物車</DialogTitle>
                    <DialogDescription>
                      查看您選擇的商品
                    </DialogDescription>
                  </div>
                  {cart.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearCart}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      清空購物車
                    </Button>
                  )}
                </div>
              </DialogHeader>
              
              {cart.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>購物車是空的</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.priceType.includes("untaxed") ? "未稅" : "含稅"} NT${item.unitPrice.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateCartItemQuantity(index, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateCartItemQuantity(index, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right min-w-[5rem]">
                        <p className="font-bold text-foreground">
                          NT${(item.unitPrice * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold mb-4">
                      <span>總計</span>
                      <span>NT${getTotalPrice().toLocaleString()}</span>
                    </div>
                    
                    <Button
                      onClick={() => {
                        setIsCartDialogOpen(false);
                        navigate("/checkout");
                      }}
                      className="w-full eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg"
                      size="lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      前往結帳
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
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

export default OrderOriginal;
