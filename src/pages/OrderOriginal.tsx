import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Leaf,
  ShoppingCart,
  Send,
  Phone,
  Plus,
  Trash2,
  Minus,
  Store,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
}

const products: Product[] = [
  // BROTHER
  {
    id: "TN-420",
    modelNumber: "TN-420",
    name: "原廠原裝標準容量碳粉匣",
    price: 1199,
    compatibility: "HL-2220、HL-2240D、DCP-7060D、MFC-7360、MFC-7460DN、MFC-7860DW、FAX-2840、MFC-7290",
    brand: "BROTHER",
  },
  {
    id: "TN-261C",
    modelNumber: "TN-261C",
    name: "原廠原裝標準容量藍色碳粉匣",
    price: 1877,
    compatibility: "MFC-9330CDW、HL-3170CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-261Y",
    modelNumber: "TN-261Y",
    name: "原廠原裝標準容量黃色碳粉匣",
    price: 1877,
    compatibility: "MFC-9330CDW、HL-3170CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-261M",
    modelNumber: "TN-261M",
    name: "原廠原裝標準容量洋紅色碳粉匣",
    price: 1877,
    compatibility: "MFC-9330CDW、HL-3170CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-265C",
    modelNumber: "TN-265C",
    name: "原廠原裝高容量藍色碳粉匣",
    price: 2283,
    compatibility: "MFC-9330CDW、HL-3170CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-265Y",
    modelNumber: "TN-265Y",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 2283,
    compatibility: "MFC-9330CDW、HL-3170CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-265M",
    modelNumber: "TN-265M",
    name: "原廠原裝高容量洋紅色碳粉匣",
    price: 2283,
    compatibility: "MFC-9330CDW、HL-3170CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-351BK",
    modelNumber: "TN-351BK",
    name: "原廠原裝標準容量黑色碳粉匣",
    price: 2294,
    compatibility: "HL-L8350CDW、MFC-L8600CDW、MFCL8850CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-351C",
    modelNumber: "TN-351C",
    name: "原廠原裝標準容量藍色碳粉匣",
    price: 1804,
    compatibility: "HL-L8350CDW、MFC-L8600CDW、MFCL8850CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-351Y",
    modelNumber: "TN-351Y",
    name: "原廠原裝標準容量黃色碳粉匣",
    price: 1804,
    compatibility: "HL-L8350CDW、MFC-L8600CDW、MFCL8850CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-351M",
    modelNumber: "TN-351M",
    name: "原廠原裝標準容量洋紅色碳粉匣",
    price: 1804,
    compatibility: "HL-L8350CDW、MFC-L8600CDW、MFCL8850CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-359C",
    modelNumber: "TN-359C",
    name: "原廠原裝高容量藍色碳粉匣",
    price: 4777,
    compatibility: "HL-L8350CDW、MFC-L8600CDW、MFCL8850CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-359Y",
    modelNumber: "TN-359Y",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 4777,
    compatibility: "HL-L8350CDW、MFC-L8600CDW、MFCL8850CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-359M",
    modelNumber: "TN-359M",
    name: "原廠原裝高容量洋紅色碳粉匣",
    price: 4777,
    compatibility: "HL-L8350CDW、MFC-L8600CDW、MFCL8850CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-451BK",
    modelNumber: "TN-451BK",
    name: "原廠原裝標準容量黑色碳粉匣",
    price: 2179,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-459BK",
    modelNumber: "TN-459BK",
    name: "原廠原裝超高容量黑色碳粉匣",
    price: 4437,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-459C",
    modelNumber: "TN-459C",
    name: "Brother TN-459C 原廠超高容量藍色碳粉",
    price: 5865,
    compatibility: "L8360CDW / L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-459Y",
    modelNumber: "TN-459Y",
    name: "原廠原裝超高容量黃色碳粉匣",
    price: 4970,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-459M",
    modelNumber: "TN-459M",
    name: "Brother TN-459M 原廠超高容量紅色碳粉",
    price: 5865,
    compatibility: "L8360CDW / L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-3428",
    modelNumber: "TN-3428",
    name: "原廠原裝標準容量碳粉匣",
    price: 2340,
    compatibility: "HL-L5100DN、MFCL5700DN、HL-L6400DW、MFC-L6900DW",
    brand: "BROTHER",
  },
  {
    id: "TN-3478",
    modelNumber: "TN-3478",
    name: "Brother TN-3478 原廠碳粉匣",
    price: 3978,
    compatibility: "MFC-L5700DN / L6900DN",
    brand: "BROTHER",
  },
  {
    id: "TN-3498",
    modelNumber: "TN-3498",
    name: "原廠原裝極高容量碳粉匣",
    price: 6427,
    compatibility: "HL-L6400DW、MFC-L6900DW",
    brand: "BROTHER",
  },
  {
    id: "TN-451C",
    modelNumber: "TN-451C",
    name: "原廠原裝標準容量藍色碳粉匣",
    price: 2017,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-451Y",
    modelNumber: "TN-451Y",
    name: "原廠原裝標準容量黃色碳粉匣",
    price: 2017,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-451M",
    modelNumber: "TN-451M",
    name: "原廠原裝標準容量洋紅色碳粉匣",
    price: 2017,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-456BK",
    modelNumber: "TN-456BK",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 4599,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-456C",
    modelNumber: "TN-456C",
    name: "原廠原裝高容量藍色碳粉匣",
    price: 4367,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-456Y",
    modelNumber: "TN-456Y",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 4367,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-456M",
    modelNumber: "TN-456M",
    name: "原廠原裝高容量洋紅色碳粉匣",
    price: 4367,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "DR-451CL",
    modelNumber: "DR-451CL",
    name: "原廠原裝感光滾筒組",
    price: 6883,
    compatibility: "HL-L8360CDW、MFC-L8900CDW",
    brand: "BROTHER",
  },
  {
    id: "DR-3455",
    modelNumber: "DR-3455",
    name: "原廠原裝感光滾筒組",
    price: 5567,
    compatibility: "HL-L5100DN、MFCL5700DN、HL-L6400DW、MFC-L6900DW",
    brand: "BROTHER",
  },
  {
    id: "TN-2460",
    modelNumber: "TN-2460",
    name: "原廠原裝標準容量碳粉匣",
    price: 1241,
    compatibility: "HL-L2375DW、MFC-L2715DW、MFCL2770DW",
    brand: "BROTHER",
  },
  {
    id: "TN-2480",
    modelNumber: "TN-2480",
    name: "原廠原裝高容量碳粉匣",
    price: 2211,
    compatibility: "HL-L2375DW、MFC-L2715DW、MFCL2770DW",
    brand: "BROTHER",
  },
  {
    id: "DR-2355",
    modelNumber: "DR-2355",
    name: "原廠原裝感光滾筒組",
    price: 2711,
    compatibility: "HL-L2320D、HLL2365DW、DCPL2540DW、MFC-L2700D、MFC-L2700DW、MFCL2740DW",
    brand: "BROTHER",
  },
  {
    id: "TN-3448",
    modelNumber: "TN-3448",
    name: "原廠原裝高容量碳粉匣",
    price: 4243,
    compatibility: "HL-L5100DN、MFCL5700DN、HL-L6400DW、MFC-L6900DW",
    brand: "BROTHER",
  },
  {
    id: "TN-2380",
    modelNumber: "TN-2380",
    name: "原廠原裝高容量碳粉匣",
    price: 1877,
    compatibility: "HL-L2320D、HLL2365DW、DCPL2540DW、MFC-L2700D、MFC-L2700DW、MFCL2740DW",
    brand: "BROTHER",
  },
  {
    id: "TN-450",
    modelNumber: "TN-450",
    name: "原廠原裝標準容量碳粉",
    price: 1772,
    compatibility: "HL-2220、HL-2240D、DCP-7060D、MFC-7360、MFC-7460DN、MFC-7860DW、FAX-2840、MFC-7290",
    brand: "BROTHER",
  },
  {
    id: "TN-261BK",
    modelNumber: "TN-261BK",
    name: "原廠原裝標準容量黑色碳粉匣",
    price: 2377,
    compatibility: "HL-3170CDW、MFC-9330CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-267BK",
    modelNumber: "TN-267BK",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 2450,
    compatibility: "HL-L3270CDW、MFC-L3750CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-267C",
    modelNumber: "TN-267C",
    name: "原廠原裝高容量藍色碳粉匣",
    price: 2450,
    compatibility: "HL-L3270CDW、MFC-L3750CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-267M",
    modelNumber: "TN-267M",
    name: "原廠原裝高容量洋紅色碳粉匣",
    price: 2450,
    compatibility: "HL-L3270CDW、MFC-L3750CDW",
    brand: "BROTHER",
  },
  {
    id: "TN-267Y",
    modelNumber: "TN-267Y",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 2450,
    compatibility: "HL-L3270CDW、MFC-L3750CDW",
    brand: "BROTHER",
  },
  {
    id: "DR-263CL",
    modelNumber: "DR-263CL",
    name: "原廠原裝感光滾筒組",
    price: 7186,
    compatibility: "HL-L3270CDW、MFC-L3750CDW",
    brand: "BROTHER",
  },
  {
    id: "DR861CL",
    modelNumber: "DR861CL",
    name: "原廠原裝感光滾筒組",
    price: 9383,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861BK",
    modelNumber: "TN861BK",
    name: "原廠原裝標準容量黑色碳粉匣",
    price: 3826,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861C",
    modelNumber: "TN861C",
    name: "原廠原裝標準容量藍色碳粉匣",
    price: 5494,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861M",
    modelNumber: "TN861M",
    name: "原廠原裝標準容量洋紅色碳粉匣",
    price: 5494,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861Y",
    modelNumber: "TN861Y",
    name: "原廠原裝標準容量黃色碳粉匣",
    price: 5494,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861XLBK",
    modelNumber: "TN861XLBK",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 4137,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861XLC",
    modelNumber: "TN861XLC",
    name: "原廠原裝高容量藍色碳粉匣",
    price: 5773,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861XLM",
    modelNumber: "TN861XLM",
    name: "原廠原裝高容量洋紅色碳粉匣",
    price: 5773,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861XLY",
    modelNumber: "TN861XLY",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 5773,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861XXLBK",
    modelNumber: "TN861XXLBK",
    name: "原廠原裝超高容量黑色碳粉匣",
    price: 4137,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861XXLC",
    modelNumber: "TN861XXLC",
    name: "原廠原裝超高容量藍色碳粉匣",
    price: 6268,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861XXLM",
    modelNumber: "TN861XXLM",
    name: "原廠原裝超高容量洋紅色碳粉匣",
    price: 6268,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "TN861XXLY",
    modelNumber: "TN861XXLY",
    name: "原廠原裝超高容量黃色碳粉匣",
    price: 6268,
    compatibility: "HL-L9430CDN、MFC-L9630CDN",
    brand: "BROTHER",
  },
  {
    id: "DR3608",
    modelNumber: "DR3608",
    name: "原廠原裝感光滾筒組",
    price: 6247,
    compatibility: "HL-L5210DN、MFCL5710DN、HL-L6415DW",
    brand: "BROTHER",
  },
  {
    id: "TN3608",
    modelNumber: "TN3608",
    name: "原廠原裝標準容量碳粉匣",
    price: 2160,
    compatibility: "HL-L5210DN、MFCL5710DN、HL-L6415DW",
    brand: "BROTHER",
  },
  {
    id: "TN3608XL",
    modelNumber: "TN3608XL",
    name: "原廠原裝高容量碳粉匣",
    price: 2733,
    compatibility: "HL-L5210DN、MFCL5710DN、HL-L6415DW",
    brand: "BROTHER",
  },
  {
    id: "TN3608XXL",
    modelNumber: "TN3608XXL",
    name: "原廠原裝超高容量碳粉匣",
    price: 3854,
    compatibility: "HL-L5210DN、MFCL5710DN、HL-L6415DW",
    brand: "BROTHER",
  },
  {
    id: "TN3618",
    modelNumber: "TN3618",
    name: "原廠原裝極高容量碳粉匣",
    price: 5781,
    compatibility: "HL-L5210DN、MFCL5710DN、HL-L6415DW",
    brand: "BROTHER",
  },
  {
    id: "DR269CL",
    modelNumber: "DR269CL",
    name: "原廠原裝感光滾筒組",
    price: 5671,
    compatibility: "HL-L3280CDW、MFC-L3760CDW",
    brand: "BROTHER",
  },
  {
    id: "TN269BK",
    modelNumber: "TN269BK",
    name: "原廠原裝標準容量黑色碳粉匣",
    price: 1470,
    compatibility: "HL-L3280CDW、MFC-L3760CDW",
    brand: "BROTHER",
  },
  {
    id: "TN269C",
    modelNumber: "TN269C",
    name: "原廠原裝標準容量藍色碳粉匣",
    price: 1687,
    compatibility: "HL-L3280CDW、MFC-L3760CDW",
    brand: "BROTHER",
  },
  {
    id: "TN269M",
    modelNumber: "TN269M",
    name: "原廠原裝標準容量洋紅色碳粉匣",
    price: 1687,
    compatibility: "HL-L3280CDW、MFC-L3760CDW",
    brand: "BROTHER",
  },
  {
    id: "TN269Y",
    modelNumber: "TN269Y",
    name: "原廠原裝標準容量黃色碳粉匣",
    price: 1687,
    compatibility: "HL-L3280CDW、MFC-L3760CDW",
    brand: "BROTHER",
  },
  {
    id: "TN269XLBK",
    modelNumber: "TN269XLBK",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 1782,
    compatibility: "HL-L3280CDW、MFC-L3760CDW",
    brand: "BROTHER",
  },
  {
    id: "TN269XLC",
    modelNumber: "TN269XLC",
    name: "原廠原裝高容量藍色碳粉匣",
    price: 2338,
    compatibility: "HL-L3280CDW、MFC-L3760CDW",
    brand: "BROTHER",
  },
  {
    id: "TN269XLM",
    modelNumber: "TN269XLM",
    name: "原廠原裝高容量洋紅色碳粉匣",
    price: 2338,
    compatibility: "HL-L3280CDW、MFC-L3760CDW",
    brand: "BROTHER",
  },
  {
    id: "TN269XLY",
    modelNumber: "TN269XLY",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 2338,
    compatibility: "HL-L3280CDW、MFC-L3760CDW",
    brand: "BROTHER",
  },
  {
    id: "TN2560",
    modelNumber: "TN2560",
    name: "原廠原裝標準容量碳粉匣",
    price: 1241,
    compatibility: "HL-L2460DW、MFC-L2805DW、MFCL2885DW",
    brand: "BROTHER",
  },
  {
    id: "TN2560XXL",
    modelNumber: "TN2560XXL",
    name: "原廠原裝極高容量碳粉匣",
    price: 3543,
    compatibility: "HL-L2460DW、MFC-L2805DW、MFCL2885DW",
    brand: "BROTHER",
  },
  {
    id: "TN3618XL",
    modelNumber: "TN3618XL",
    name: "原廠原裝超級高容量碳粉匣",
    price: 7352,
    compatibility: "HL-L6415DW",
    brand: "BROTHER",
  },

  // Canon
  {
    id: "CRG-051H",
    modelNumber: "CRG-051H",
    name: "原廠原裝高容量碳粉",
    price: 3477,
    compatibility: "LBP162dw、MF267dw、MF269dw",
    brand: "Canon",
  },
  {
    id: "Drum 051",
    modelNumber: "Drum 051",
    name: "原廠原裝感光滾筒組",
    price: 2674,
    compatibility: "LBP162dw、MF267dw、MF269dw",
    brand: "Canon",
  },
  {
    id: "CRG-052H",
    modelNumber: "CRG-052H",
    name: "原廠原裝高容量碳粉",
    price: 6507,
    compatibility: "LBP215x、MF429x",
    brand: "Canon",
  },
  {
    id: "CRG-046H BK",
    modelNumber: "CRG-046H BK",
    name: "原廠原裝高容量黑色碳粉",
    price: 4278,
    compatibility: "MF735Cx",
    brand: "Canon",
  },
  {
    id: "CRG-046 C",
    modelNumber: "CRG-046 C",
    name: "原廠原裝標準容量藍色碳粉",
    price: 3387,
    compatibility: "MF735Cx",
    brand: "Canon",
  },
  {
    id: "CRG-046 Y",
    modelNumber: "CRG-046 Y",
    name: "原廠原裝標準容量黃色碳粉",
    price: 3387,
    compatibility: "MF735Cx",
    brand: "Canon",
  },
  {
    id: "CRG-046 M",
    modelNumber: "CRG-046 M",
    name: "原廠原裝標準容量洋紅色碳粉",
    price: 3387,
    compatibility: "MF735Cx",
    brand: "Canon",
  },
  {
    id: "CRG-055H BK",
    modelNumber: "CRG-055H BK",
    name: "原廠原裝高容量黑色碳粉",
    price: 4725,
    compatibility: "MF746Cx",
    brand: "Canon",
  },
  {
    id: "CRG-055 C",
    modelNumber: "CRG-055 C",
    name: "原廠原裝標準容量藍色碳粉",
    price: 3209,
    compatibility: "MF746Cx",
    brand: "Canon",
  },
  {
    id: "CRG-055 Y",
    modelNumber: "CRG-055 Y",
    name: "原廠原裝標準容量黃色碳粉",
    price: 3209,
    compatibility: "MF746Cx",
    brand: "Canon",
  },
  {
    id: "CRG-055 M",
    modelNumber: "CRG-055 M",
    name: "原廠原裝標準容量洋紅色碳粉",
    price: 3209,
    compatibility: "MF746Cx",
    brand: "Canon",
  },
  {
    id: "CRG-051",
    modelNumber: "CRG-051",
    name: "原廠原裝標準容量碳粉",
    price: 1649,
    compatibility: "LBP162dw、MF267dw、MF269dw",
    brand: "Canon",
  },
  {
    id: "CRG-054 BK",
    modelNumber: "CRG-054 BK",
    name: "原廠原裝標準容量黑色碳粉",
    price: 2454,
    compatibility: "MF644Cdw",
    brand: "Canon",
  },
  {
    id: "CRG-054 C",
    modelNumber: "CRG-054 C",
    name: "原廠原裝標準容量藍色碳粉",
    price: 3025,
    compatibility: "MF644Cdw",
    brand: "Canon",
  },
  {
    id: "CRG-054 Y",
    modelNumber: "CRG-054 Y",
    name: "原廠原裝標準容量黃色碳粉",
    price: 3025,
    compatibility: "MF644Cdw",
    brand: "Canon",
  },
  {
    id: "CRG-054 M",
    modelNumber: "CRG-054 M",
    name: "原廠原裝標準容量洋紅色碳粉",
    price: 3025,
    compatibility: "MF644Cdw",
    brand: "Canon",
  },
  {
    id: "CRG-054H BK",
    modelNumber: "CRG-054H BK",
    name: "原廠原裝高容量黑色碳粉",
    price: 2942,
    compatibility: "MF644Cdw",
    brand: "Canon",
  },
  {
    id: "CRG-054H C",
    modelNumber: "CRG-054H C",
    name: "原廠原裝高容量藍色碳粉",
    price: 3387,
    compatibility: "MF644Cdw",
    brand: "Canon",
  },
  {
    id: "CRG-054H Y",
    modelNumber: "CRG-054H Y",
    name: "原廠原裝高容量黃色碳粉",
    price: 3387,
    compatibility: "MF644Cdw",
    brand: "Canon",
  },
  {
    id: "CRG-054H M",
    modelNumber: "CRG-054H M",
    name: "原廠原裝高容量洋紅色碳粉",
    price: 3387,
    compatibility: "MF644Cdw",
    brand: "Canon",
  },
  {
    id: "CRG-057H",
    modelNumber: "CRG-057H",
    name: "原廠原裝高容量碳粉",
    price: 6798,
    compatibility: "LBP228x、MF449x",
    brand: "Canon",
  },
  {
    id: "CRG-069 BK",
    modelNumber: "CRG-069 BK",
    name: "原廠原裝標準容量黑色碳粉",
    price: 3018,
    compatibility: "MF756Cx",
    brand: "Canon",
  },
  {
    id: "CRG-069 C",
    modelNumber: "CRG-069 C",
    name: "原廠原裝標準容量藍色碳粉",
    price: 3959,
    compatibility: "MF756Cx",
    brand: "Canon",
  },
  {
    id: "CRG-069 Y",
    modelNumber: "CRG-069 Y",
    name: "原廠原裝標準容量黃色碳粉",
    price: 3959,
    compatibility: "MF756Cx",
    brand: "Canon",
  },
  {
    id: "CRG-069 M",
    modelNumber: "CRG-069 M",
    name: "原廠原裝標準容量洋紅色碳粉",
    price: 3959,
    compatibility: "MF756Cx",
    brand: "Canon",
  },
  {
    id: "CRG-069H BK",
    modelNumber: "CRG-069H BK",
    name: "原廠原裝高容量黑色碳粉",
    price: 6798,
    compatibility: "MF756Cx",
    brand: "Canon",
  },
  {
    id: "CRG-069H C",
    modelNumber: "CRG-069H C",
    name: "原廠原裝高容量藍色碳粉",
    price: 8290,
    compatibility: "MF756Cx",
    brand: "Canon",
  },
  {
    id: "CRG-069H Y",
    modelNumber: "CRG-069H Y",
    name: "原廠原裝高容量黃色碳粉",
    price: 8290,
    compatibility: "MF756Cx",
    brand: "Canon",
  },
  {
    id: "CRG-069H M",
    modelNumber: "CRG-069H M",
    name: "原廠原裝高容量洋紅色碳粉",
    price: 8290,
    compatibility: "MF756Cx",
    brand: "Canon",
  },

  // EPSON
  {
    id: "S015535",
    modelNumber: "S015535",
    name: "原廠原裝黑色色帶",
    price: 130,
    compatibility: "LQ-680C",
    brand: "EPSON",
  },
  {
    id: "S015540",
    modelNumber: "S015540",
    name: "原廠原裝黑色色帶",
    price: 313,
    compatibility: "LQ-2080C/ LQ-2180C/ LQ-2190C",
    brand: "EPSON",
  },
  {
    id: "S015544",
    modelNumber: "S015544",
    name: "原廠原裝黑色色帶",
    price: 862,
    compatibility: "DLQ-3500C/DLQ-3500CII",
    brand: "EPSON",
  },
  {
    id: "S015611",
    modelNumber: "S015611",
    name: "原廠原裝黑色色帶",
    price: 248,
    compatibility: "LQ-690C/LQ-695C",
    brand: "EPSON",
  },
  {
    id: "S015652",
    modelNumber: "S015652",
    name: "原廠原裝黑色色帶",
    price: 173,
    compatibility: "LQ-635C",
    brand: "EPSON",
  },
  {
    id: "S050590",
    modelNumber: "S050590",
    name: "EPSON AL-C3900/CX37DNF 全新原廠黃色碳粉匣",
    price: 5814,
    compatibility: "AL-C3900 / CX37DNF",
    brand: "EPSON",
  },
  {
    id: "S050591",
    modelNumber: "S050591",
    name: "EPSON AL-C3900/CX37DNF 全新原廠紅色碳粉匣",
    price: 5814,
    compatibility: "AL-C3900 / CX37DNF",
    brand: "EPSON",
  },
  {
    id: "S050592",
    modelNumber: "S050592",
    name: "EPSON AL-C3900/CX37DNF 全新原廠藍色碳粉匣",
    price: 5814,
    compatibility: "AL-C3900 / CX37DNF",
    brand: "EPSON",
  },
  {
    id: "S050593",
    modelNumber: "S050593",
    name: "EPSON AL-C3900/CX37DNF 全新原廠黑色碳粉匣",
    price: 5814,
    compatibility: "AL-C3900 / CX37DNF",
    brand: "EPSON",
  },
  {
    id: "S050595",
    modelNumber: "S050595",
    name: "原廠原裝碳粉收集器",
    price: 746,
    compatibility: "AcuLaser C3900N/ AcuLaser C3900DN / AL-C300N/ALC300DN",
    brand: "EPSON",
  },
  {
    id: "S051201",
    modelNumber: "S051201",
    name: "原廠原裝黃色感光滾筒",
    price: 4996,
    compatibility: "AcuLaser C3900N/ AcuLaser C3900DN / AL-C300N/ALC300DN",
    brand: "EPSON",
  },
  {
    id: "S051202",
    modelNumber: "S051202",
    name: "原廠原裝洋紅色感光滾筒",
    price: 4996,
    compatibility: "AcuLaser C3900N/ AcuLaser C3900DN / AL-C300N/ALC300DN",
    brand: "EPSON",
  },
  {
    id: "S051203",
    modelNumber: "S051203",
    name: "原廠原裝青色感光滾筒",
    price: 4996,
    compatibility: "AcuLaser C3900N/ AcuLaser C3900DN / AL-C300N/ALC300DN",
    brand: "EPSON",
  },
  {
    id: "S051204",
    modelNumber: "S051204",
    name: "原廠原裝黑色感光滾筒",
    price: 4996,
    compatibility: "AcuLaser C3900N/ AcuLaser C3900DN / AL-C300N/ALC300DN",
    brand: "EPSON",
  },
  {
    id: "S053042",
    modelNumber: "S053042",
    name: "原廠原裝加熱器單元",
    price: 6065,
    compatibility: "AcuLaser C3900N/ AcuLaser C3900DN",
    brand: "EPSON",
  },
  {
    id: "S050602",
    modelNumber: "S050602",
    name: "EPSON AL-C9300N 全新原廠原裝黃色碳粉匣",
    price: 6120,
    compatibility: "AL-C9300N",
    brand: "EPSON",
  },
  {
    id: "S050603",
    modelNumber: "S050603",
    name: "原廠原裝洋紅色碳粉匣",
    price: 7517,
    compatibility: "AcuLaser C9300N",
    brand: "EPSON",
  },
  {
    id: "S050604",
    modelNumber: "S050604",
    name: "EPSON AL-C9300N 全新原廠原裝藍色碳粉匣",
    price: 6120,
    compatibility: "AL-C9300N",
    brand: "EPSON",
  },
  {
    id: "S050605",
    modelNumber: "S050605",
    name: "EPSON AL-C9300N 全新原廠原裝黑色碳粉匣",
    price: 3500,
    compatibility: "AL-C9300N",
    brand: "EPSON",
  },
  {
    id: "S050610",
    modelNumber: "S050610",
    name: "原廠原裝碳粉收集器",
    price: 638,
    compatibility: "AcuLaser C9300N/ALC9400DN/ AL-C9500DN",
    brand: "EPSON",
  },
  {
    id: "S051209",
    modelNumber: "S051209",
    name: "原廠原裝彩色感光滾筒",
    price: 3643,
    compatibility: "AcuLaser C9300N/ALC9400DN/ AL-C9500DN",
    brand: "EPSON",
  },
  {
    id: "S051210",
    modelNumber: "S051210",
    name: "原廠原裝黑色感光滾筒",
    price: 3643,
    compatibility: "AcuLaser C9300N/ALC9400DN/ AL-C9500DN",
    brand: "EPSON",
  },
  {
    id: "S050691",
    modelNumber: "S050691",
    name: "EPSON AL-M300/M300DN/MX300DNF 原廠高容量碳粉匣",
    price: 5400,
    compatibility: "AL-M300 / M300DN",
    brand: "EPSON",
  },
  {
    id: "S051228",
    modelNumber: "S051228",
    name: "原廠原裝感光滾筒",
    price: 3966,
    compatibility: "AL-M300D/ AL-M300DN",
    brand: "EPSON",
  },
  {
    id: "S053050",
    modelNumber: "S053050",
    name: "原廠原裝加熱器單元",
    price: 7498,
    compatibility: "AL-M300D/ AL-M300DN",
    brand: "EPSON",
  },
  {
    id: "S050698",
    modelNumber: "S050698",
    name: "原廠原裝碳粉匣",
    price: 9419,
    compatibility: "AL-M400DN",
    brand: "EPSON",
  },
  {
    id: "S050699",
    modelNumber: "S050699",
    name: "原廠原裝高容量碳粉匣",
    price: 11538,
    compatibility: "AL-M400DN",
    brand: "EPSON",
  },
  {
    id: "S051230",
    modelNumber: "S051230",
    name: "原廠原裝感光滾筒",
    price: 3991,
    compatibility: "AL-M400DN",
    brand: "EPSON",
  },
  {
    id: "S053058",
    modelNumber: "S053058",
    name: "原廠原裝維護單元",
    price: 8426,
    compatibility: "AL-M400DN",
    brand: "EPSON",
  },
  {
    id: "S050656",
    modelNumber: "S050656",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 11380,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S050657",
    modelNumber: "S050657",
    name: "原廠原裝高容量洋紅色碳粉匣",
    price: 11380,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S050658",
    modelNumber: "S050658",
    name: "原廠原裝高容量青色碳粉匣",
    price: 11380,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S050659",
    modelNumber: "S050659",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 9515,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S050664",
    modelNumber: "S050664",
    name: "原廠原裝碳粉收集器",
    price: 1114,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S051224",
    modelNumber: "S051224",
    name: "原廠原裝黃色感光滾筒",
    price: 3694,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S051225",
    modelNumber: "S051225",
    name: "原廠原裝洋紅色感光滾筒",
    price: 3694,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S051226",
    modelNumber: "S051226",
    name: "原廠原裝青色感光滾筒",
    price: 3694,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S051227",
    modelNumber: "S051227",
    name: "原廠原裝黑色感光滾筒",
    price: 3694,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S053047",
    modelNumber: "S053047",
    name: "原廠原裝加熱器單元",
    price: 5884,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S053048",
    modelNumber: "S053048",
    name: "原廠原裝轉寫單元",
    price: 8676,
    compatibility: "AL-C500DN",
    brand: "EPSON",
  },
  {
    id: "S050747",
    modelNumber: "S050747",
    name: "EPSON AL-C300N/DN 全新原廠原裝黃色碳粉匣",
    price: 8400,
    compatibility: "AL-C300N / DN",
    brand: "EPSON",
  },
  {
    id: "S050748",
    modelNumber: "S050748",
    name: "EPSON AL-C300N/DN 全新原廠原裝紅色碳粉匣",
    price: 8400,
    compatibility: "AL-C300N / DN",
    brand: "EPSON",
  },
  {
    id: "S050749",
    modelNumber: "S050749",
    name: "EPSON AL-C300N/DN 全新原廠原裝藍色碳粉匣",
    price: 8400,
    compatibility: "AL-C300N / DN",
    brand: "EPSON",
  },
  {
    id: "S050750",
    modelNumber: "S050750",
    name: "EPSON AL-C300N/DN 全新原廠原裝黑色碳粉匣",
    price: 5600,
    compatibility: "AL-C300N / DN",
    brand: "EPSON",
  },
  {
    id: "S053062",
    modelNumber: "S053062",
    name: "原廠原裝加熱器單元",
    price: 6816,
    compatibility: "AL-C300N/ AL-C300DN",
    brand: "EPSON",
  },
  {
    id: "S050761",
    modelNumber: "S050761",
    name: "原廠原裝碳粉匣",
    price: 7324,
    compatibility: "AL-M7100DN/ ALM8200DN",
    brand: "EPSON",
  },
  {
    id: "S110078",
    modelNumber: "S110078",
    name: "EPSON AL-M320DN 原廠超大高印碳粉匣 10078",
    price: 5400,
    compatibility: "AL-M320DN",
    brand: "EPSON",
  },
  {
    id: "T792150",
    modelNumber: "T792150",
    name: "原廠原裝黑色墨水匣",
    price: 1825,
    compatibility: "WF-5191/ WF-5621",
    brand: "EPSON",
  },
  {
    id: "T792250",
    modelNumber: "T792250",
    name: "原廠原裝藍色墨水匣",
    price: 2401,
    compatibility: "WF-5191/ WF-5621",
    brand: "EPSON",
  },
  {
    id: "T792350",
    modelNumber: "T792350",
    name: "原廠原裝紅色墨水匣",
    price: 2401,
    compatibility: "WF-5191/ WF-5621",
    brand: "EPSON",
  },
  {
    id: "T792450",
    modelNumber: "T792450",
    name: "原廠原裝黃色墨水匣",
    price: 2401,
    compatibility: "WF-5191/ WF-5621",
    brand: "EPSON",
  },
  {
    id: "T6425",
    modelNumber: "T6425",
    name: "原廠原裝淡藍色墨水卡匣",
    price: 2864,
    compatibility: "STYLUS PRO 7890/7900/9890/9900",
    brand: "EPSON",
  },
  {
    id: "T6426",
    modelNumber: "T6426",
    name: "原廠原裝淡靚紅墨水卡匣",
    price: 2864,
    compatibility: "STYLUS PRO 7890/7900/9890/9900",
    brand: "EPSON",
  },
  {
    id: "T6427",
    modelNumber: "T6427",
    name: "原廠原裝淡黑色墨水卡匣",
    price: 2864,
    compatibility: "STYLUS PRO 7890/7900/9890/9900",
    brand: "EPSON",
  },
  {
    id: "T6429",
    modelNumber: "T6429",
    name: "原廠原裝超淡黑墨水卡匣",
    price: 2864,
    compatibility: "STYLUS PRO 7890/7900/9890/9900",
    brand: "EPSON",
  },
  {
    id: "T6421",
    modelNumber: "T6421",
    name: "原廠原裝亮黑色墨水卡匣",
    price: 2879,
    compatibility: "STYLUS PRO 7700/7890/7900/9700/9890 /9900",
    brand: "EPSON",
  },
  {
    id: "T6422",
    modelNumber: "T6422",
    name: "原廠原裝藍色墨水卡匣",
    price: 2879,
    compatibility: "STYLUS PRO 7700/7890/7900/9700/9890 /9900",
    brand: "EPSON",
  },
  {
    id: "T6423",
    modelNumber: "T6423",
    name: "原廠原裝靚紅色墨水卡匣",
    price: 2879,
    compatibility: "STYLUS PRO 7700/7890/7900/9700/9890 /9900",
    brand: "EPSON",
  },
  {
    id: "T6424",
    modelNumber: "T6424",
    name: "原廠原裝黃色墨水卡匣",
    price: 2879,
    compatibility: "STYLUS PRO 7700/7890/7900/9700/9890 /9900",
    brand: "EPSON",
  },
  {
    id: "T6428",
    modelNumber: "T6428",
    name: "原廠原裝消光黑墨水卡匣",
    price: 2879,
    compatibility: "STYLUS PRO 7700/7890/7900/9700/9890 /9900",
    brand: "EPSON",
  },
  {
    id: "T6921",
    modelNumber: "T6921",
    name: "原廠原裝亮黑色墨水卡匣",
    price: 2287,
    compatibility: "SureColor T3070/T5070/T7070/T5270",
    brand: "EPSON",
  },
  {
    id: "T6922",
    modelNumber: "T6922",
    name: "原廠原裝藍色墨水匣",
    price: 2287,
    compatibility: "SureColor T3070/T5070/T7070/T5270",
    brand: "EPSON",
  },
  {
    id: "T6923",
    modelNumber: "T6923",
    name: "原廠原裝紅色墨水匣",
    price: 2287,
    compatibility: "SureColor T3070/T5070/T7070/T5270",
    brand: "EPSON",
  },
  {
    id: "T6924",
    modelNumber: "T6924",
    name: "原廠原裝黃色墨水匣",
    price: 2287,
    compatibility: "SureColor T3070/T5070/T7070/T5270",
    brand: "EPSON",
  },
  {
    id: "T6925",
    modelNumber: "T6925",
    name: "原廠原裝消光黑墨水卡匣",
    price: 2287,
    compatibility: "SureColor T3070/T5070/T7070/T5270",
    brand: "EPSON",
  },
  {
    id: "T188150",
    modelNumber: "T188150",
    name: "原廠原裝黑色墨水匣",
    price: 1174,
    compatibility: "WF-7111/7211/7611/3621",
    brand: "EPSON",
  },
  {
    id: "T188250",
    modelNumber: "T188250",
    name: "原廠原裝藍色墨水匣",
    price: 846,
    compatibility: "WF-7111/7211/7611/3621",
    brand: "EPSON",
  },
  {
    id: "T188350",
    modelNumber: "T188350",
    name: "原廠原裝紅色墨水匣",
    price: 846,
    compatibility: "WF-7111/7211/7611/3621",
    brand: "EPSON",
  },
  {
    id: "T188450",
    modelNumber: "T188450",
    name: "原廠原裝黃色墨水匣",
    price: 846,
    compatibility: "WF-7111/7211/7611/3621",
    brand: "EPSON",
  },
  {
    id: "S050762",
    modelNumber: "S050762",
    name: "EPSON AL-M8200 全新原廠原裝高容量碳粉匣",
    price: 8976,
    compatibility: "AL-M8200",
    brand: "EPSON",
  },
  {
    id: "S110079",
    modelNumber: "S110079",
    name: "EPSON M220DN/M310/M320 原廠高印量碳粉匣",
    price: 4550,
    compatibility: "M220DN / M310 / M320",
    brand: "EPSON",
  },
  {
    id: "S110080",
    modelNumber: "S110080",
    name: "EPSON AL-M220DN/M310/M320 原廠碳粉匣",
    price: 3500,
    compatibility: "AL-M220DN / M310 / M320",
    brand: "EPSON",
  },
  {
    id: "T9491",
    modelNumber: "T9491",
    name: "原廠原裝黑色墨水",
    price: 2254,
    compatibility: "WF-C5290/ WF-C5790",
    brand: "EPSON",
  },
  {
    id: "T9492",
    modelNumber: "T9492",
    name: "原廠原裝藍色墨水",
    price: 3113,
    compatibility: "WF-C5290/ WF-C5790",
    brand: "EPSON",
  },
  {
    id: "T9493",
    modelNumber: "T9493",
    name: "原廠原裝紅色墨水",
    price: 3113,
    compatibility: "WF-C5290/ WF-C5790",
    brand: "EPSON",
  },
  {
    id: "T9494",
    modelNumber: "T9494",
    name: "原廠原裝黃色墨水",
    price: 3113,
    compatibility: "WF-C5290/ WF-C5790",
    brand: "EPSON",
  },
  {
    id: "T40A1",
    modelNumber: "T40A1",
    name: "原廠原裝黑色墨水匣",
    price: 1169,
    compatibility: "SC-T3130N/T3130/T5130",
    brand: "EPSON",
  },
  {
    id: "T40A2",
    modelNumber: "T40A2",
    name: "原廠原裝藍色墨水匣",
    price: 840,
    compatibility: "SC-T3130N/T3130/T5130",
    brand: "EPSON",
  },
  {
    id: "T40A3",
    modelNumber: "T40A3",
    name: "原廠原裝紅色墨水匣",
    price: 840,
    compatibility: "SC-T3130N/T3130/T5130",
    brand: "EPSON",
  },
  {
    id: "T40A4",
    modelNumber: "T40A4",
    name: "原廠原裝黃色墨水匣",
    price: 840,
    compatibility: "SC-T3130N/T3130/T5130",
    brand: "EPSON",
  },
  {
    id: "T9691",
    modelNumber: "T9691",
    name: "EPSON WF-M5799 全新原廠墨水袋 (黑)",
    price: 3300,
    compatibility: "WF-M5799 / WF-M5299",
    brand: "EPSON",
  },
  {
    id: "T05N150",
    modelNumber: "T05N150",
    name: "原廠原裝黑色墨水匣",
    price: 1134,
    compatibility: "WF-7311",
    brand: "EPSON",
  },
  {
    id: "T05N250",
    modelNumber: "T05N250",
    name: "原廠原裝藍色墨水匣",
    price: 826,
    compatibility: "WF-7311",
    brand: "EPSON",
  },
  {
    id: "T05N350",
    modelNumber: "T05N350",
    name: "原廠原裝紅色墨水匣",
    price: 826,
    compatibility: "WF-7311",
    brand: "EPSON",
  },
  {
    id: "T05N450",
    modelNumber: "T05N450",
    name: "原廠原裝黃色墨水匣",
    price: 826,
    compatibility: "WF-7311",
    brand: "EPSON",
  },
  {
    id: "S110124",
    modelNumber: "S110124",
    name: "原廠原裝黑色碳粉匣",
    price: 6444,
    compatibility: "AL-C9400DN/AL-C9500DN",
    brand: "EPSON",
  },
  {
    id: "S110125",
    modelNumber: "S110125",
    name: "原廠原裝青色碳粉匣",
    price: 7568,
    compatibility: "AL-C9400DN/AL-C9500DN",
    brand: "EPSON",
  },
  {
    id: "S110126",
    modelNumber: "S110126",
    name: "原廠原裝洋紅色碳粉匣",
    price: 7568,
    compatibility: "AL-C9400DN/AL-C9500DN",
    brand: "EPSON",
  },
  {
    id: "S110127",
    modelNumber: "S110127",
    name: "原廠原裝黃色碳粉匣",
    price: 7568,
    compatibility: "AL-C9400DN/AL-C9500DN",
    brand: "EPSON",
  },
  {
    id: "S110141",
    modelNumber: "S110141",
    name: "原廠原裝碳粉匣",
    price: 8047,
    compatibility: "AL-M7150DN/AL-M8250DN",
    brand: "EPSON",
  },
  {
    id: "S110142",
    modelNumber: "S110142",
    name: "原廠原裝高容量碳粉匣",
    price: 11030,
    compatibility: "AL-M8250DN",
    brand: "EPSON",
  },
  {
    id: "T6716",
    modelNumber: "T6716",
    name: "原廠原裝廢棄墨水收集盒",
    price: 942,
    compatibility: "WF-M5299/ WF-M5799/ WF-C5290/ WF-C5790",
    brand: "EPSON",
  },
  {
    id: "T11G1",
    modelNumber: "T11G1",
    name: "原廠原裝黑色墨水",
    price: 3098,
    compatibility: "WF-C5890",
    brand: "EPSON",
  },
  {
    id: "T11G2",
    modelNumber: "T11G2",
    name: "原廠原裝藍色墨水",
    price: 4121,
    compatibility: "WF-C5890",
    brand: "EPSON",
  },
  {
    id: "T11G3",
    modelNumber: "T11G3",
    name: "原廠原裝紅色墨水",
    price: 4121,
    compatibility: "WF-C5890",
    brand: "EPSON",
  },
  {
    id: "T11G4",
    modelNumber: "T11G4",
    name: "原廠原裝黃色墨水",
    price: 4121,
    compatibility: "WF-C5890",
    brand: "EPSON",
  },
  {
    id: "T11W1",
    modelNumber: "T11W1",
    name: "原廠原裝黑色墨水",
    price: 5592,
    compatibility: "WF-M5899",
    brand: "EPSON",
  },
  {
    id: "T49G1",
    modelNumber: "T49G1",
    name: "原廠原裝亮光黑色墨水匣",
    price: 2330,
    compatibility: "SC-P8530D",
    brand: "EPSON",
  },
  {
    id: "T49G2",
    modelNumber: "T49G2",
    name: "原廠原裝青色墨水匣",
    price: 2330,
    compatibility: "SC-P8530D",
    brand: "EPSON",
  },
  {
    id: "T49G3",
    modelNumber: "T49G3",
    name: "原廠原裝洋紅色墨水匣",
    price: 2330,
    compatibility: "SC-P8530D",
    brand: "EPSON",
  },
  {
    id: "T49G4",
    modelNumber: "T49G4",
    name: "原廠原裝黃色墨水匣",
    price: 2330,
    compatibility: "SC-P8530D",
    brand: "EPSON",
  },
  {
    id: "T49G8",
    modelNumber: "T49G8",
    name: "原廠原裝消光黑色墨水匣",
    price: 2330,
    compatibility: "SC-P8530D",
    brand: "EPSON",
  },
  {
    id: "T49GE",
    modelNumber: "T49GE",
    name: "原廠原裝灰色墨水匣",
    price: 2330,
    compatibility: "SC-P8530D",
    brand: "EPSON",
  },
  {
    id: "T54V1",
    modelNumber: "T54V1",
    name: "原廠原裝亮光黑色墨水匣",
    price: 2855,
    compatibility: "SCP6000/ P7000/P8000/P9000",
    brand: "EPSON",
  },
  {
    id: "T54V2",
    modelNumber: "T54V2",
    name: "原廠原裝青色墨水匣",
    price: 2855,
    compatibility: "SCP6000/ P7000/P8000/P9000",
    brand: "EPSON",
  },
  {
    id: "T54V3",
    modelNumber: "T54V3",
    name: "原廠原裝靓紅色墨水匣",
    price: 2855,
    compatibility: "SCP6000/ P7000/P8000/P9000",
    brand: "EPSON",
  },
  {
    id: "T54V4",
    modelNumber: "T54V4",
    name: "原廠原裝黃色墨水匣",
    price: 2855,
    compatibility: "SCP6000/ P7000/P8000/P9000",
    brand: "EPSON",
  },
  {
    id: "T54V5",
    modelNumber: "T54V5",
    name: "原廠原裝淡青色墨水匣",
    price: 2855,
    compatibility: "SCP6000/ P7000/P8000/P9000",
    brand: "EPSON",
  },
  {
    id: "T54V6",
    modelNumber: "T54V6",
    name: "原廠原裝淡靓紅色墨水匣",
    price: 2855,
    compatibility: "SCP6000/ P7000/P8000/P9000",
    brand: "EPSON",
  },
  {
    id: "T54V7",
    modelNumber: "T54V7",
    name: "原廠原裝淡黑墨水匣",
    price: 2855,
    compatibility: "SCP6000/ P7000/P8000/P9000",
    brand: "EPSON",
  },
  {
    id: "T54V8",
    modelNumber: "T54V8",
    name: "原廠原裝消光黑色墨水匣",
    price: 2855,
    compatibility: "SCP6000/ P7000/P8000/P9000",
    brand: "EPSON",
  },
  {
    id: "T54V9",
    modelNumber: "T54V9",
    name: "原廠原裝超淡黑色墨水匣",
    price: 2855,
    compatibility: "SCP6000/ P7000/P8000/P9000",
    brand: "EPSON",
  },
  {
    id: "T9701",
    modelNumber: "T9701",
    name: "EPSON WF-M5799 全新原廠墨水袋 (高容量)",
    price: 11500,
    compatibility: "WF-M5799 / WF-M5299",
    brand: "EPSON",
  },
  {
    id: "C1700組",
    modelNumber: "C1700組",
    name: "EPSON AL-C1700/C1750N 原廠碳粉匣 (四色套組)",
    price: 7200,
    compatibility: "C1700 / C1750N / CX17NF",
    brand: "EPSON",
  },
  {
    id: "S050166",
    modelNumber: "S050166",
    name: "EPSON EPL-6200 / S050166 原廠高容量碳粉匣",
    price: 2000,
    compatibility: "EPL-6200",
    brand: "EPSON",
  },
  {
    id: "S050245",
    modelNumber: "S050245",
    name: "EPSON C4200/C4200DN 原廠黑色碳粉匣 (S050286)",
    price: 2450,
    compatibility: "C4200 / C4200DN",
    brand: "EPSON",
  },
  {
    id: "S050283",
    modelNumber: "S050283",
    name: "EPSON C4200/C4200DN 原廠黃色碳粉匣 (S050242)",
    price: 6400,
    compatibility: "C4200 / C4200DN",
    brand: "EPSON",
  },
  {
    id: "S050284",
    modelNumber: "S050284",
    name: "EPSON C4200/C4200DN 原廠紅色(洋紅)碳粉匣",
    price: 6400,
    compatibility: "C4200 / C4200DN",
    brand: "EPSON",
  },
  {
    id: "S050285",
    modelNumber: "S050285",
    name: "EPSON C4200/C4200DN 原廠藍色(青色)碳粉匣",
    price: 6400,
    compatibility: "C4200 / C4200DN",
    brand: "EPSON",
  },
  {
    id: "S050475",
    modelNumber: "S050475",
    name: "EPSON C9200 高容量紅色碳粉",
    price: 3000,
    compatibility: "C9200 / C9200N",
    brand: "EPSON",
  },
  {
    id: "S050477",
    modelNumber: "S050477",
    name: "EPSON C9200 高容量黑色碳粉",
    price: 2000,
    compatibility: "C9200 / C9200N",
    brand: "EPSON",
  },
  {
    id: "S050588",
    modelNumber: "S050588",
    name: "EPSON M2410DN/MX21DNF 原廠高容量黑色碳粉匣",
    price: 1500,
    compatibility: "M2410DN / MX21DNF",
    brand: "EPSON",
  },
  {
    id: "S050611",
    modelNumber: "S050611",
    name: "EPSON AL-C1700/C1750N 原廠黃色碳粉匣",
    price: 1867,
    compatibility: "C1700 / C1750N / CX17NF",
    brand: "EPSON",
  },
  {
    id: "S050612",
    modelNumber: "S050612",
    name: "EPSON AL-C1700/C1750N 原廠紅色碳粉匣",
    price: 1867,
    compatibility: "C1700 / C1750N / CX17NF",
    brand: "EPSON",
  },
  {
    id: "S050613",
    modelNumber: "S050613",
    name: "EPSON AL-C1700/C1750N 原廠藍色碳粉匣",
    price: 1867,
    compatibility: "C1700 / C1750N / CX17NF",
    brand: "EPSON",
  },
  {
    id: "S050614",
    modelNumber: "S050614",
    name: "EPSON AL-C1700/C1750N 原廠黑色碳粉匣",
    price: 2000,
    compatibility: "C1700 / C1750N / CX17NF",
    brand: "EPSON",
  },
  {
    id: "S051124",
    modelNumber: "S051124",
    name: "EPSON C3800/C3800DN 原廠高容量黃色碳粉匣",
    price: 6800,
    compatibility: "AcuLaser C3800 / DN",
    brand: "EPSON",
  },
  {
    id: "S051125",
    modelNumber: "S051125",
    name: "EPSON C3800/C3800DN 原廠高容量紅色碳粉匣",
    price: 6800,
    compatibility: "AcuLaser C3800 / DN",
    brand: "EPSON",
  },
  {
    id: "S051126",
    modelNumber: "S051126",
    name: "EPSON C3800/C3800DN 原廠高容量藍色碳粉匣",
    price: 6800,
    compatibility: "AcuLaser C3800 / DN",
    brand: "EPSON",
  },
  {
    id: "S051127",
    modelNumber: "S051127",
    name: "EPSON C3800/C3800DN 原廠高容量黑色碳粉匣",
    price: 5610,
    compatibility: "AcuLaser C3800 / DN",
    brand: "EPSON",
  },
  {
    id: "S051158",
    modelNumber: "S051158",
    name: "EPSON AL-C2800N 全新原廠原裝黃色碳粉匣",
    price: 6400,
    compatibility: "AL-C2800N",
    brand: "EPSON",
  },
  {
    id: "S051159",
    modelNumber: "S051159",
    name: "EPSON AL-C2800N 全新原廠原裝紅色碳粉匣",
    price: 6400,
    compatibility: "AL-C2800N",
    brand: "EPSON",
  },
  {
    id: "S051189",
    modelNumber: "S051189",
    name: "EPSON M8000N/M8000 全新原廠碳粉匣",
    price: 5100,
    compatibility: "M8000N / M8000",
    brand: "EPSON",
  },
  {
    id: "S050477-感光鼓",
    modelNumber: "S050477",
    name: "EPSON C9200 黑色高容量碳粉匣感光鼓組",
    price: 6100,
    compatibility: "C9200 (感光鼓)",
    brand: "EPSON",
  },
  {
    id: "S051109",
    modelNumber: "S051109",
    name: "EPSON AL-C4200 C4200N 全新原廠原裝感光鼓",
    price: 8600,
    compatibility: "AL-C4200 / C4200N (感光鼓)",
    brand: "EPSON",
  },
  {
    id: "S051175",
    modelNumber: "S051175",
    name: "EPSON C9200 S051175 黃色原廠感光滾筒",
    price: 7038,
    compatibility: "C9200 (感光鼓)",
    brand: "EPSON",
  },
  {
    id: "S051176",
    modelNumber: "S051176",
    name: "EPSON C9200 S051176 紅色原廠感光滾筒",
    price: 7038,
    compatibility: "C9200 (感光鼓)",
    brand: "EPSON",
  },
  {
    id: "S051177",
    modelNumber: "S051177",
    name: "EPSON C9200 S051177 藍色原廠感光滾筒",
    price: 7038,
    compatibility: "C9200 (感光鼓)",
    brand: "EPSON",
  },
  {
    id: "S051178",
    modelNumber: "S051178",
    name: "EPSON C9200 S051178 黑色原廠感光滾筒",
    price: 7956,
    compatibility: "C9200 (感光鼓)",
    brand: "EPSON",
  },

  // FUJIFILM
  {
    id: "CT203482",
    modelNumber: "CT203482",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 5214,
    compatibility: "ApeosPort Print 3410SD/ApeosPort 3410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT203483",
    modelNumber: "CT203483",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 3663,
    compatibility: "ApeosPort Print 3410SD/ApeosPort 3410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT351281",
    modelNumber: "CT351281",
    name: "原廠原裝感光鼓",
    price: 3173,
    compatibility: "ApeosPort Print 3410SD/ApeosPort 3410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT203478",
    modelNumber: "CT203478",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 14274,
    compatibility: "ApeosPort Print 4020SD/ApeosPort 4020SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT203550",
    modelNumber: "CT203550",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 5989,
    compatibility: "ApeosPort Print 4020SD/ApeosPort 4020SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT351280",
    modelNumber: "CT351280",
    name: "原廠原裝感光鼓",
    price: 4288,
    compatibility: "ApeosPort Print 4020SD/ApeosPort 4020SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT203475",
    modelNumber: "CT203475",
    name: "原廠原裝黑色碳粉匣",
    price: 17421,
    compatibility: "ApeosPort Print 4730SD/ApeosPort 4730SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT351279",
    modelNumber: "CT351279",
    name: "原廠原裝感光鼓",
    price: 6030,
    compatibility: "ApeosPort Print 4730SD/ApeosPort 4730SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT203999",
    modelNumber: "CT203999",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 9731,
    compatibility: "ApeosPrint 5330",
    brand: "FUJIFILM",
  },
  {
    id: "CT351408",
    modelNumber: "CT351408",
    name: "原廠原裝感光鼓",
    price: 6813,
    compatibility: "ApeosPrint 5330",
    brand: "FUJIFILM",
  },
  {
    id: "CT203666",
    modelNumber: "CT203666",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 10340,
    compatibility: "ApeosPrint 6340",
    brand: "FUJIFILM",
  },
  {
    id: "CT351340",
    modelNumber: "CT351340",
    name: "原廠原裝感光鼓",
    price: 10340,
    compatibility: "ApeosPrint 6340",
    brand: "FUJIFILM",
  },
  {
    id: "CT203922",
    modelNumber: "CT203922",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 8325,
    compatibility: "ApeosPrint 3360 S/3960 S/4560 S",
    brand: "FUJIFILM",
  },
  {
    id: "CT351379",
    modelNumber: "CT351379",
    name: "原廠原裝感光鼓",
    price: 6876,
    compatibility: "ApeosPrint 3360 S/3960 S/4560 S",
    brand: "FUJIFILM",
  },
  {
    id: "CT351263",
    modelNumber: "CT351263",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 6599,
    compatibility: "ApeosPort Print C2410SD/ApeosPort C2410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT351264",
    modelNumber: "CT351264",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 7405,
    compatibility: "ApeosPort Print C2410SD/ApeosPort C2410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT351265",
    modelNumber: "CT351265",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 7405,
    compatibility: "ApeosPort Print C2410SD/ApeosPort C2410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT351266",
    modelNumber: "CT351266",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 7405,
    compatibility: "ApeosPort Print C2410SD/ApeosPort C2410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT351267",
    modelNumber: "CT351267",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 2929,
    compatibility: "ApeosPort Print C2410SD/ApeosPort C2410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT351268",
    modelNumber: "CT351268",
    name: "原廠原裝藍色標準容量碳粉匣",
    price: 3288,
    compatibility: "ApeosPort Print C2410SD/ApeosPort C2410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT351269",
    modelNumber: "CT351269",
    name: "原廠原裝紅色標準容量碳粉匣",
    price: 3288,
    compatibility: "ApeosPort Print C2410SD/ApeosPort C2410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT351270",
    modelNumber: "CT351270",
    name: "原廠原裝黃色標準容量碳粉匣",
    price: 3288,
    compatibility: "ApeosPort Print C2410SD/ApeosPort C2410SD",
    brand: "FUJIFILM",
  },
  {
    id: "CT203502",
    modelNumber: "CT203502",
    name: "原廠原裝黑色碳粉匣",
    price: 4656,
    compatibility: "ApeosPrint C325 dw/Apeos C325 z",
    brand: "FUJIFILM",
  },
  {
    id: "CT203503",
    modelNumber: "CT203503",
    name: "原廠原裝藍色碳粉匣",
    price: 5098,
    compatibility: "ApeosPrint C325 dw/Apeos C325 z",
    brand: "FUJIFILM",
  },
  {
    id: "CT203504",
    modelNumber: "CT203504",
    name: "原廠原裝紅色碳粉匣",
    price: 5098,
    compatibility: "ApeosPrint C325 dw/Apeos C325 z",
    brand: "FUJIFILM",
  },
  {
    id: "CT204287",
    modelNumber: "CT204287",
    name: "原廠原裝黃色碳粉匣",
    price: 5098,
    compatibility: "ApeosPrint C325 dw/Apeos C325 z",
    brand: "FUJIFILM",
  },
  {
    id: "CT351282",
    modelNumber: "CT351282",
    name: "原廠原裝成像光鼓",
    price: 8016,
    compatibility: "ApeosPrint C325 dw/Apeos C325 z",
    brand: "FUJIFILM",
  },
  {
    id: "CT203982",
    modelNumber: "CT203982",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 6690,
    compatibility: "ApeosPrint C4030",
    brand: "FUJIFILM",
  },
  {
    id: "CT203983",
    modelNumber: "CT203983",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 11133,
    compatibility: "ApeosPrint C4030",
    brand: "FUJIFILM",
  },
  {
    id: "CT203984",
    modelNumber: "CT203984",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 11133,
    compatibility: "ApeosPrint C4030",
    brand: "FUJIFILM",
  },
  {
    id: "CT203985",
    modelNumber: "CT203985",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 11133,
    compatibility: "ApeosPrint C4030",
    brand: "FUJIFILM",
  },
  {
    id: "CT351398",
    modelNumber: "CT351398",
    name: "原廠原裝黑色成像光鼓",
    price: 3928,
    compatibility: "ApeosPrint C4030",
    brand: "FUJIFILM",
  },
  {
    id: "CT351399",
    modelNumber: "CT351399",
    name: "原廠原裝藍色成像光鼓",
    price: 3928,
    compatibility: "ApeosPrint C4030",
    brand: "FUJIFILM",
  },
  {
    id: "CT351400",
    modelNumber: "CT351400",
    name: "原廠原裝紅色成像光鼓",
    price: 3928,
    compatibility: "ApeosPrint C4030",
    brand: "FUJIFILM",
  },
  {
    id: "CT351401",
    modelNumber: "CT351401",
    name: "原廠原裝黃色成像光鼓",
    price: 3928,
    compatibility: "ApeosPrint C4030",
    brand: "FUJIFILM",
  },
  {
    id: "CT203648",
    modelNumber: "CT203648",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 6800,
    compatibility: "ApeosPrint C5240",
    brand: "FUJIFILM",
  },
  {
    id: "CT203649",
    modelNumber: "CT203649",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 12119,
    compatibility: "ApeosPrint C5240",
    brand: "FUJIFILM",
  },
  {
    id: "CT203650",
    modelNumber: "CT203650",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 12119,
    compatibility: "ApeosPrint C5240",
    brand: "FUJIFILM",
  },
  {
    id: "CT203651",
    modelNumber: "CT203651",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 12119,
    compatibility: "ApeosPrint C5240",
    brand: "FUJIFILM",
  },
  {
    id: "CT351328",
    modelNumber: "CT351328",
    name: "原廠原裝黑色成像光鼓",
    price: 10626,
    compatibility: "ApeosPrint C5240",
    brand: "FUJIFILM",
  },
  {
    id: "CT351329",
    modelNumber: "CT351329",
    name: "原廠原裝藍色成像光鼓",
    price: 13126,
    compatibility: "ApeosPrint C5240",
    brand: "FUJIFILM",
  },
  {
    id: "CT351330",
    modelNumber: "CT351330",
    name: "原廠原裝紅色成像光鼓",
    price: 13126,
    compatibility: "ApeosPrint C5240",
    brand: "FUJIFILM",
  },
  {
    id: "CT351331",
    modelNumber: "CT351331",
    name: "原廠原裝黃色成像光鼓",
    price: 13126,
    compatibility: "ApeosPrint C5240",
    brand: "FUJIFILM",
  },
  {
    id: "CT204013",
    modelNumber: "CT204013",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 5924,
    compatibility: "Apeos C2450 S",
    brand: "FUJIFILM",
  },
  {
    id: "CT204014",
    modelNumber: "CT204014",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 17468,
    compatibility: "Apeos C2450 S",
    brand: "FUJIFILM",
  },
  {
    id: "CT204015",
    modelNumber: "CT204015",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 17468,
    compatibility: "Apeos C2450 S",
    brand: "FUJIFILM",
  },
  {
    id: "CT204016",
    modelNumber: "CT204016",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 17468,
    compatibility: "Apeos C2450 S",
    brand: "FUJIFILM",
  },
  {
    id: "CT204295",
    modelNumber: "CT204295",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 17468,
    compatibility: "Apeos C2450 S",
    brand: "FUJIFILM",
  },
  {
    id: "CT351410",
    modelNumber: "CT351410",
    name: "原廠原裝成像光鼓",
    price: 16375,
    compatibility: "Apeos C2450 S",
    brand: "FUJIFILM",
  },
  {
    id: "CT203875",
    modelNumber: "CT203875",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 8856,
    compatibility: "ApeosPrint C5570",
    brand: "FUJIFILM",
  },
  {
    id: "CT203876",
    modelNumber: "CT203876",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 15183,
    compatibility: "ApeosPrint C5570",
    brand: "FUJIFILM",
  },
  {
    id: "CT203877",
    modelNumber: "CT203877",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 15183,
    compatibility: "ApeosPrint C5570",
    brand: "FUJIFILM",
  },
  {
    id: "CT203878",
    modelNumber: "CT203878",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 15183,
    compatibility: "ApeosPrint C5570",
    brand: "FUJIFILM",
  },
  {
    id: "CT204289",
    modelNumber: "CT204289",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 15183,
    compatibility: "ApeosPrint C5570",
    brand: "FUJIFILM",
  },
  {
    id: "CT351368",
    modelNumber: "CT351368",
    name: "原廠原裝感光鼓",
    price: 16943,
    compatibility: "ApeosPrint C5570",
    brand: "FUJIFILM",
  },
  {
    id: "CT204229",
    modelNumber: "CT204229",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 5566,
    compatibility: "ApeosPrint 4620/Apeos 4620",
    brand: "FUJIFILM",
  },
  {
    id: "CT204231",
    modelNumber: "CT204231",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 8350,
    compatibility: "ApeosPrint 4620/Apeos 4620",
    brand: "FUJIFILM",
  },
  {
    id: "CT351436",
    modelNumber: "CT351436",
    name: "原廠原裝感光鼓",
    price: 6705,
    compatibility: "ApeosPrint 4620/Apeos 4620",
    brand: "FUJIFILM",
  },

  // FujiXerox
  {
    id: "CT202137",
    modelNumber: "CT202137",
    name: "原廠原裝黑色碳粉匣",
    price: 1081,
    compatibility: "DocuPrint P115b/M115b/M115fs",
    brand: "FujiXerox",
  },
  {
    id: "CT201610",
    modelNumber: "CT201610",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 1724,
    compatibility: "DocuPrint P205/M205/P215/M215 series",
    brand: "FujiXerox",
  },
  {
    id: "CT202329",
    modelNumber: "CT202329",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 1217,
    compatibility: "DocuPrint P225/P265/M225/M265 series",
    brand: "FujiXerox",
  },
  {
    id: "CT202330",
    modelNumber: "CT202330",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 1992,
    compatibility: "DocuPrint P225/P265/M225/M265 series",
    brand: "FujiXerox",
  },
  {
    id: "CT351055",
    modelNumber: "CT351055",
    name: "原廠原裝成像光鼓",
    price: 2255,
    compatibility: "DocuPrint P225/P265/M225/M265 series",
    brand: "FujiXerox",
  },
  {
    id: "CT201918",
    modelNumber: "CT201918",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 2290,
    compatibility: "DocuPrint P255dw/M255z",
    brand: "FujiXerox",
  },
  {
    id: "CT201919",
    modelNumber: "CT201919",
    name: "原廠原裝雙包裝黑色標準容量碳粉匣",
    price: 3846,
    compatibility: "DocuPrint P255dw/M255z",
    brand: "FujiXerox",
  },
  {
    id: "CT202877",
    modelNumber: "CT202877",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 3342,
    compatibility: "DocuPrint P285dw/M285z",
    brand: "FujiXerox",
  },
  {
    id: "CT202878",
    modelNumber: "CT202878",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 4525,
    compatibility: "DocuPrint P285dw/M285z",
    brand: "FujiXerox",
  },
  {
    id: "CT351134",
    modelNumber: "CT351134",
    name: "原廠原裝成像光鼓",
    price: 3592,
    compatibility: "DocuPrint P285dw/M285z",
    brand: "FujiXerox",
  },
  {
    id: "CT201938",
    modelNumber: "CT201938",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 4208,
    compatibility: "DocuPrint P355d/M355df",
    brand: "FujiXerox",
  },
  {
    id: "CT350973",
    modelNumber: "CT350973",
    name: "原廠原裝感光鼓",
    price: 4606,
    compatibility: "DocuPrint P355d/M355df",
    brand: "FujiXerox",
  },
  {
    id: "CT203108",
    modelNumber: "CT203108",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 4132,
    compatibility: "DocuPrint P375d/M375z",
    brand: "FujiXerox",
  },
  {
    id: "CT203109",
    modelNumber: "CT203109",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 5599,
    compatibility: "DocuPrint P375d/M375z",
    brand: "FujiXerox",
  },
  {
    id: "CT351174",
    modelNumber: "CT351174",
    name: "原廠原裝成像光鼓",
    price: 5162,
    compatibility: "DocuPrint P375d/M375z",
    brand: "FujiXerox",
  },
  {
    id: "CT201948",
    modelNumber: "CT201948",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 4142,
    compatibility: "DocuPrint P455d/M455df",
    brand: "FujiXerox",
  },
  {
    id: "CT201949",
    modelNumber: "CT201949",
    name: "FujiXerox M455df/P455d 原廠高容量黑色碳粉匣",
    price: 4800,
    compatibility: "M455df / P455d",
    brand: "FujiXerox",
  },
  {
    id: "CT350976",
    modelNumber: "CT350976",
    name: "原廠原裝感光鼓",
    price: 5281,
    compatibility: "DocuPrint P455d/M455df",
    brand: "FujiXerox",
  },
  {
    id: "CT203365",
    modelNumber: "CT203365",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 5227,
    compatibility: "DocuPrint P475/ApeosPort-VII 4021_5021",
    brand: "FujiXerox",
  },
  {
    id: "CT203366",
    modelNumber: "CT203366",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 8028,
    compatibility: "DocuPrint P475/ApeosPort-VII 4021_5021",
    brand: "FujiXerox",
  },
  {
    id: "CT351230",
    modelNumber: "CT351230",
    name: "原廠原裝感光鼓",
    price: 5818,
    compatibility: "DocuPrint P475/ApeosPort-VII 4021_5021",
    brand: "FujiXerox",
  },
  {
    id: "CT203069",
    modelNumber: "CT203069",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 4840,
    compatibility: "DocuPrint P505d",
    brand: "FujiXerox",
  },
  {
    id: "CT203070",
    modelNumber: "CT203070",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 9682,
    compatibility: "DocuPrint P505d",
    brand: "FujiXerox",
  },
  {
    id: "CT351157",
    modelNumber: "CT351157",
    name: "原廠原裝成像光鼓",
    price: 10687,
    compatibility: "DocuPrint P505d",
    brand: "FujiXerox",
  },
  {
    id: "CWAA0711",
    modelNumber: "CWAA0711",
    name: "原廠原裝黑色碳粉匣",
    price: 5305,
    compatibility: "DocuPrint 3055/2065",
    brand: "FujiXerox",
  },
  {
    id: "CT350936",
    modelNumber: "CT350936",
    name: "原廠原裝黑色碳粉匣",
    price: 5777,
    compatibility: "DocuPrint 3105",
    brand: "FujiXerox",
  },
  {
    id: "CT203094",
    modelNumber: "CT203094",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 5584,
    compatibility: "DocuPrint 3205/3505/4405",
    brand: "FujiXerox",
  },
  {
    id: "CT203095",
    modelNumber: "CT203095",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 6722,
    compatibility: "DocuPrint 3205/3505/4405",
    brand: "FujiXerox",
  },
  {
    id: "CT351168",
    modelNumber: "CT351168",
    name: "原廠原裝成像光鼓",
    price: 6218,
    compatibility: "DocuPrint 3205/3505/4405",
    brand: "FujiXerox",
  },
  {
    id: "113R00684",
    modelNumber: "113R00684",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 5039,
    compatibility: "Phaser 5550",
    brand: "FujiXerox",
  },
  {
    id: "CT202337",
    modelNumber: "CT202337",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 6017,
    compatibility: "DocuPrint 5105d",
    brand: "FujiXerox",
  },
  {
    id: "CT202338",
    modelNumber: "CT202338",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 3708,
    compatibility: "DocuPrint 5105d",
    brand: "FujiXerox",
  },
  {
    id: "CT351059",
    modelNumber: "CT351059",
    name: "原廠原裝成像光鼓",
    price: 10331,
    compatibility: "DocuPrint 5105d",
    brand: "FujiXerox",
  },
  {
    id: "CT201591",
    modelNumber: "CT201591",
    name: "原廠原裝黑色碳粉匣",
    price: 1655,
    compatibility: "DocuPrint CP105b/CP205/CM205/CP215/CM215 series",
    brand: "FujiXerox",
  },
  {
    id: "CT201592",
    modelNumber: "CT201592",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 1716,
    compatibility: "DocuPrint CP105b/CP205/CM205/CP215/CM215 series",
    brand: "FujiXerox",
  },
  {
    id: "CT201593",
    modelNumber: "CT201593",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 1716,
    compatibility: "DocuPrint CP105b/CP205/CM205/CP215/CM215 series",
    brand: "FujiXerox",
  },
  {
    id: "CT201594",
    modelNumber: "CT201594",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 1716,
    compatibility: "DocuPrint CP105b/CP205/CM205/CP215/CM215 series",
    brand: "FujiXerox",
  },
  {
    id: "CT202264",
    modelNumber: "CT202264",
    name: "原廠原裝黑色碳粉匣",
    price: 1720,
    compatibility: "DocuPrint CP115/CP116/CP225/CM115/CM225 series",
    brand: "FujiXerox",
  },
  {
    id: "CT202265",
    modelNumber: "CT202265",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 1858,
    compatibility: "DocuPrint CP115/CP116/CP225/CM115/CM225 series",
    brand: "FujiXerox",
  },
  {
    id: "CT202266",
    modelNumber: "CT202266",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 1858,
    compatibility: "DocuPrint CP115/CP116/CP225/CM115/CM225 series",
    brand: "FujiXerox",
  },
  {
    id: "CT202267",
    modelNumber: "CT202267",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 1858,
    compatibility: "DocuPrint CP115/CP116/CP225/CM115/CM225 series",
    brand: "FujiXerox",
  },
  {
    id: "CT201632",
    modelNumber: "CT201632",
    name: "原廠原裝黑色碳粉匣",
    price: 2009,
    compatibility: "DocuPrint CP305d/CM305df",
    brand: "FujiXerox",
  },
  {
    id: "CT201633",
    modelNumber: "CT201633",
    name: "原廠原裝青色碳粉匣",
    price: 2890,
    compatibility: "DocuPrint CP305d/CM305df",
    brand: "FujiXerox",
  },
  {
    id: "CT201634",
    modelNumber: "CT201634",
    name: "原廠原裝紅色碳粉匣",
    price: 2890,
    compatibility: "DocuPrint CP305d/CM305df",
    brand: "FujiXerox",
  },
  {
    id: "CT201635",
    modelNumber: "CT201635",
    name: "原廠原裝黃色碳粉匣",
    price: 2890,
    compatibility: "DocuPrint CP305d/CM305df",
    brand: "FujiXerox",
  },
  {
    id: "CT350876",
    modelNumber: "CT350876",
    name: "原廠原裝成像光鼓",
    price: 5808,
    compatibility: "DocuPrint CP305d/CM305df",
    brand: "FujiXerox",
  },
  {
    id: "CT202606",
    modelNumber: "CT202606",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 2798,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT202607",
    modelNumber: "CT202607",
    name: "原廠原裝藍色標準容量碳粉匣",
    price: 3179,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT202608",
    modelNumber: "CT202608",
    name: "原廠原裝紅色標準容量碳粉匣",
    price: 3179,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT202609",
    modelNumber: "CT202609",
    name: "原廠原裝黃色標準容量碳粉匣",
    price: 3179,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT202610",
    modelNumber: "CT202610",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 4231,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT202611",
    modelNumber: "CT202611",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 5614,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT202612",
    modelNumber: "CT202612",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 5614,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT202613",
    modelNumber: "CT202613",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 5614,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT351100",
    modelNumber: "CT351100",
    name: "原廠原裝黑色成像光鼓",
    price: 1687,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT351101",
    modelNumber: "CT351101",
    name: "原廠原裝藍色成像光鼓",
    price: 1687,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT351102",
    modelNumber: "CT351102",
    name: "原廠原裝紅色成像光鼓",
    price: 1687,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT351103",
    modelNumber: "CT351103",
    name: "原廠原裝黃色成像光鼓",
    price: 1687,
    compatibility: "DocuPrint CP315/CM315",
    brand: "FujiXerox",
  },
  {
    id: "CT202018",
    modelNumber: "CT202018",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 3070,
    compatibility: "DocuPrint CP405d/CM405df",
    brand: "FujiXerox",
  },
  {
    id: "CT202019",
    modelNumber: "CT202019",
    name: "原廠原裝藍色標準容量碳粉匣",
    price: 5338,
    compatibility: "DocuPrint CP405d/CM405df",
    brand: "FujiXerox",
  },
  {
    id: "CT202020",
    modelNumber: "CT202020",
    name: "原廠原裝紅色標準容量碳粉匣",
    price: 5338,
    compatibility: "DocuPrint CP405d/CM405df",
    brand: "FujiXerox",
  },
  {
    id: "CT202021",
    modelNumber: "CT202021",
    name: "原廠原裝黃色標準容量碳粉匣",
    price: 5338,
    compatibility: "DocuPrint CP405d/CM405df",
    brand: "FujiXerox",
  },
  {
    id: "CT202033",
    modelNumber: "CT202033",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 3409,
    compatibility: "DocuPrint CP405d/CM405df",
    brand: "FujiXerox",
  },
  {
    id: "CT202034",
    modelNumber: "CT202034",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 6401,
    compatibility: "DocuPrint CP405d/CM405df",
    brand: "FujiXerox",
  },
  {
    id: "CT202035",
    modelNumber: "CT202035",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 6401,
    compatibility: "DocuPrint CP405d/CM405df",
    brand: "FujiXerox",
  },
  {
    id: "CT202036",
    modelNumber: "CT202036",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 6401,
    compatibility: "DocuPrint CP405d/CM405df",
    brand: "FujiXerox",
  },
  {
    id: "CT350983",
    modelNumber: "CT350983",
    name: "原廠原裝感光鼓",
    price: 5566,
    compatibility: "DocuPrint CP405d/CM405df",
    brand: "FujiXerox",
  },
  {
    id: "CT203346",
    modelNumber: "CT203346",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 5114,
    compatibility: "DocuPrint CP475/ApeosPort-VII C3321_C4421",
    brand: "FujiXerox",
  },
  {
    id: "CT203347",
    modelNumber: "CT203347",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 8447,
    compatibility: "DocuPrint CP475/ApeosPort-VII C3321_C4421",
    brand: "FujiXerox",
  },
  {
    id: "CT203348",
    modelNumber: "CT203348",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 8447,
    compatibility: "DocuPrint CP475/ApeosPort-VII C3321_C4421",
    brand: "FujiXerox",
  },
  {
    id: "CT203349",
    modelNumber: "CT203349",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 8447,
    compatibility: "DocuPrint CP475/ApeosPort-VII C3321_C4421",
    brand: "FujiXerox",
  },
  {
    id: "CT351220",
    modelNumber: "CT351220",
    name: "原廠原裝黑色成像光鼓",
    price: 3156,
    compatibility: "DocuPrint CP475/ApeosPort-VII C3321_C4421",
    brand: "FujiXerox",
  },
  {
    id: "CT351221",
    modelNumber: "CT351221",
    name: "原廠原裝藍色成像光鼓",
    price: 3156,
    compatibility: "DocuPrint CP475/ApeosPort-VII C3321_C4421",
    brand: "FujiXerox",
  },
  {
    id: "CT351222",
    modelNumber: "CT351222",
    name: "原廠原裝紅色成像光鼓",
    price: 3156,
    compatibility: "DocuPrint CP475/ApeosPort-VII C3321_C4421",
    brand: "FujiXerox",
  },
  {
    id: "CT351223",
    modelNumber: "CT351223",
    name: "原廠原裝黃色成像光鼓",
    price: 3156,
    compatibility: "DocuPrint CP475/ApeosPort-VII C3321_C4421",
    brand: "FujiXerox",
  },
  {
    id: "106R01515",
    modelNumber: "106R01515",
    name: "原廠原裝藍色碳粉匣",
    price: 7915,
    compatibility: "Phaser 6700",
    brand: "FujiXerox",
  },
  {
    id: "106R01516",
    modelNumber: "106R01516",
    name: "原廠原裝洋紅色碳粉匣",
    price: 7915,
    compatibility: "Phaser 6700",
    brand: "FujiXerox",
  },
  {
    id: "106R01517",
    modelNumber: "106R01517",
    name: "原廠原裝黃色碳粉匣",
    price: 7915,
    compatibility: "Phaser 6700",
    brand: "FujiXerox",
  },
  {
    id: "106R01518",
    modelNumber: "106R01518",
    name: "原廠原裝黑色碳粉匣",
    price: 5558,
    compatibility: "Phaser 6700",
    brand: "FujiXerox",
  },
  {
    id: "108R00971",
    modelNumber: "108R00971",
    name: "原廠原裝藍色成像光鼓",
    price: 8846,
    compatibility: "Phaser 6700",
    brand: "FujiXerox",
  },
  {
    id: "108R00972",
    modelNumber: "108R00972",
    name: "原廠原裝洋紅色成像光鼓",
    price: 8846,
    compatibility: "Phaser 6700",
    brand: "FujiXerox",
  },
  {
    id: "108R00973",
    modelNumber: "108R00973",
    name: "原廠原裝黃色成像光鼓",
    price: 8846,
    compatibility: "Phaser 6700",
    brand: "FujiXerox",
  },
  {
    id: "108R00974",
    modelNumber: "108R00974",
    name: "原廠原裝黑色成像光鼓",
    price: 6101,
    compatibility: "Phaser 6700",
    brand: "FujiXerox",
  },
  {
    id: "CT203041",
    modelNumber: "CT203041",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 5590,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT203042",
    modelNumber: "CT203042",
    name: "原廠原裝藍色標準容量碳粉匣",
    price: 5590,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT203043",
    modelNumber: "CT203043",
    name: "原廠原裝紅色標準容量碳粉匣",
    price: 5590,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT203044",
    modelNumber: "CT203044",
    name: "原廠原裝黃色標準容量碳粉匣",
    price: 5590,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT203045",
    modelNumber: "CT203045",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 8162,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT203046",
    modelNumber: "CT203046",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 9239,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT203047",
    modelNumber: "CT203047",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 9239,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT203048",
    modelNumber: "CT203048",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 9239,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT351192",
    modelNumber: "CT351192",
    name: "原廠原裝黑色成像光鼓",
    price: 9920,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT351193",
    modelNumber: "CT351193",
    name: "原廠原裝藍色成像光鼓",
    price: 12422,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT351194",
    modelNumber: "CT351194",
    name: "原廠原裝紅色成像光鼓",
    price: 12422,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT351195",
    modelNumber: "CT351195",
    name: "原廠原裝黃色成像光鼓",
    price: 12422,
    compatibility: "DocuPrint CP505d",
    brand: "FujiXerox",
  },
  {
    id: "CT202246",
    modelNumber: "CT202246",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 3820,
    compatibility: "DocuCentre SC2020",
    brand: "FujiXerox",
  },
  {
    id: "CT202247",
    modelNumber: "CT202247",
    name: "原廠原裝藍色標準容量碳粉匣",
    price: 3973,
    compatibility: "DocuCentre SC2020",
    brand: "FujiXerox",
  },
  {
    id: "CT202248",
    modelNumber: "CT202248",
    name: "原廠原裝紅色標準容量碳粉匣",
    price: 3973,
    compatibility: "DocuCentre SC2020",
    brand: "FujiXerox",
  },
  {
    id: "CT202249",
    modelNumber: "CT202249",
    name: "原廠原裝黃色標準容量碳粉匣",
    price: 3973,
    compatibility: "DocuCentre SC2020",
    brand: "FujiXerox",
  },
  {
    id: "CT202396",
    modelNumber: "CT202396",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 4776,
    compatibility: "DocuCentre SC2020",
    brand: "FujiXerox",
  },
  {
    id: "CT202397",
    modelNumber: "CT202397",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 7560,
    compatibility: "DocuCentre SC2020",
    brand: "FujiXerox",
  },
  {
    id: "CT202398",
    modelNumber: "CT202398",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 7560,
    compatibility: "DocuCentre SC2020",
    brand: "FujiXerox",
  },
  {
    id: "CT202399",
    modelNumber: "CT202399",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 7560,
    compatibility: "DocuCentre SC2020",
    brand: "FujiXerox",
  },
  {
    id: "CT351053",
    modelNumber: "CT351053",
    name: "原廠原裝成像光鼓",
    price: 10847,
    compatibility: "DocuCentre SC2020/SC2022",
    brand: "FujiXerox",
  },
  {
    id: "CT203020",
    modelNumber: "CT203020",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 4426,
    compatibility: "DocuCentre SC2022",
    brand: "FujiXerox",
  },
  {
    id: "CT203021",
    modelNumber: "CT203021",
    name: "原廠原裝藍色標準容量碳粉匣",
    price: 6335,
    compatibility: "DocuCentre SC2022",
    brand: "FujiXerox",
  },
  {
    id: "CT203022",
    modelNumber: "CT203022",
    name: "原廠原裝紅色標準容量碳粉匣",
    price: 6335,
    compatibility: "DocuCentre SC2022",
    brand: "FujiXerox",
  },
  {
    id: "CT203023",
    modelNumber: "CT203023",
    name: "原廠原裝黃色標準容量碳粉匣",
    price: 6335,
    compatibility: "DocuCentre SC2022",
    brand: "FujiXerox",
  },
  {
    id: "CT203024",
    modelNumber: "CT203024",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 2891,
    compatibility: "DocuCentre SC2022",
    brand: "FujiXerox",
  },
  {
    id: "CT203025",
    modelNumber: "CT203025",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 7774,
    compatibility: "DocuCentre SC2022",
    brand: "FujiXerox",
  },
  {
    id: "CT203026",
    modelNumber: "CT203026",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 7774,
    compatibility: "DocuCentre SC2022",
    brand: "FujiXerox",
  },
  {
    id: "CT203027",
    modelNumber: "CT203027",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 7774,
    compatibility: "DocuCentre SC2022",
    brand: "FujiXerox",
  },
  {
    id: "CT203271",
    modelNumber: "CT203271",
    name: "原廠原裝黑色標準容量碳粉匣",
    price: 3294,
    compatibility: "DocuPrint C3555 d",
    brand: "FujiXerox",
  },
  {
    id: "CT203272",
    modelNumber: "CT203272",
    name: "原廠原裝藍色標準容量碳粉匣",
    price: 6031,
    compatibility: "DocuPrint C3555 d",
    brand: "FujiXerox",
  },
  {
    id: "CT203273",
    modelNumber: "CT203273",
    name: "原廠原裝紅色標準容量碳粉匣",
    price: 6031,
    compatibility: "DocuPrint C3555 d",
    brand: "FujiXerox",
  },
  {
    id: "CT203274",
    modelNumber: "CT203274",
    name: "原廠原裝黃色標準容量碳粉匣",
    price: 6031,
    compatibility: "DocuPrint C3555 d",
    brand: "FujiXerox",
  },
  {
    id: "CT203275",
    modelNumber: "CT203275",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 6086,
    compatibility: "DocuPrint C3555 d",
    brand: "FujiXerox",
  },
  {
    id: "CT203276",
    modelNumber: "CT203276",
    name: "原廠原裝藍色高容量碳粉匣",
    price: 8004,
    compatibility: "DocuPrint C3555 d",
    brand: "FujiXerox",
  },
  {
    id: "CT203277",
    modelNumber: "CT203277",
    name: "原廠原裝紅色高容量碳粉匣",
    price: 8004,
    compatibility: "DocuPrint C3555 d",
    brand: "FujiXerox",
  },
  {
    id: "CT203278",
    modelNumber: "CT203278",
    name: "原廠原裝黃色高容量碳粉匣",
    price: 8004,
    compatibility: "DocuPrint C3555 d",
    brand: "FujiXerox",
  },
  {
    id: "CT351189",
    modelNumber: "CT351189",
    name: "原廠原裝黑色成像光鼓",
    price: 3770,
    compatibility: "DocuPrint C3555 d",
    brand: "FujiXerox",
  },
  {
    id: "CT351190",
    modelNumber: "CT351190",
    name: "原廠原裝藍紅黃色成像光鼓",
    price: 3770,
    compatibility: "DocuPrint C3555 d",
    brand: "FujiXerox",
  },
  {
    id: "CT201664",
    modelNumber: "CT201664",
    name: "原廠原裝黑色碳粉匣",
    price: 5294,
    compatibility: "DocuPrint C5005d",
    brand: "FujiXerox",
  },
  {
    id: "CT201665",
    modelNumber: "CT201665",
    name: "原廠原裝藍色碳粉匣",
    price: 8551,
    compatibility: "DocuPrint C5005d",
    brand: "FujiXerox",
  },
  {
    id: "CT201666",
    modelNumber: "CT201666",
    name: "原廠原裝紅色碳粉匣",
    price: 8551,
    compatibility: "DocuPrint C5005d",
    brand: "FujiXerox",
  },
  {
    id: "CT201667",
    modelNumber: "CT201667",
    name: "原廠原裝黃色碳粉匣",
    price: 8551,
    compatibility: "DocuPrint C5005d",
    brand: "FujiXerox",
  },
  {
    id: "CT350894",
    modelNumber: "CT350894",
    name: "原廠原裝成像光鼓",
    price: 9733,
    compatibility: "DocuPrint C5005d/C5155d",
    brand: "FujiXerox",
  },
  {
    id: "CT203161",
    modelNumber: "CT203161",
    name: "原廠原裝黑色碳粉匣",
    price: 6486,
    compatibility: "DocuPrint C5155d",
    brand: "FujiXerox",
  },
  {
    id: "CT203162",
    modelNumber: "CT203162",
    name: "原廠原裝藍色碳粉匣",
    price: 10246,
    compatibility: "DocuPrint C5155d",
    brand: "FujiXerox",
  },
  {
    id: "CT203163",
    modelNumber: "CT203163",
    name: "原廠原裝紅色碳粉匣",
    price: 10246,
    compatibility: "DocuPrint C5155d",
    brand: "FujiXerox",
  },
  {
    id: "CT203164",
    modelNumber: "CT203164",
    name: "原廠原裝黃色碳粉匣",
    price: 10246,
    compatibility: "DocuPrint C5155d",
    brand: "FujiXerox",
  },
  {
    id: "CT203402",
    modelNumber: "CT203402",
    name: "原廠原裝黑色碳粉匣",
    price: 7957,
    compatibility: "ApeosPort Print C5570 (FX)",
    brand: "FujiXerox",
  },
  {
    id: "CT203403",
    modelNumber: "CT203403",
    name: "原廠原裝藍色碳粉匣",
    price: 13265,
    compatibility: "ApeosPort Print C5570 (FX)",
    brand: "FujiXerox",
  },
  {
    id: "CT203404",
    modelNumber: "CT203404",
    name: "原廠原裝紅色碳粉匣",
    price: 13265,
    compatibility: "ApeosPort Print C5570 (FX)",
    brand: "FujiXerox",
  },
  {
    id: "CT203405",
    modelNumber: "CT203405",
    name: "原廠原裝黃色碳粉匣",
    price: 13265,
    compatibility: "ApeosPort Print C5570 (FX)",
    brand: "FujiXerox",
  },
  {
    id: "CT204290",
    modelNumber: "CT204290",
    name: "原廠原裝黃色碳粉匣",
    price: 13001,
    compatibility: "ApeosPort Print C5570 (FX)",
    brand: "FujiXerox",
  },
  {
    id: "CT351236",
    modelNumber: "CT351236",
    name: "原廠原裝成像光鼓",
    price: 14686,
    compatibility: "ApeosPort Print C5570 (FX)",
    brand: "FujiXerox",
  },

  // KYOCERA
  {
    id: "TK-1114",
    modelNumber: "TK-1114",
    name: "KYOCERA FS-1040/1020MFP 原廠黑色碳粉匣",
    price: 2310,
    compatibility: "FS-1040 / 1020MFP",
    brand: "KYOCERA",
  },
  {
    id: "TK-1124",
    modelNumber: "TK-1124",
    name: "KYOCERA FS-1060DN/1025MFP 原廠黑色碳粉匣",
    price: 2452,
    compatibility: "FS-1060DN / 1025MFP",
    brand: "KYOCERA",
  },
  {
    id: "TK-1196",
    modelNumber: "TK-1196",
    name: "KYOCERA P2230DN 原廠黑色碳粉匣",
    price: 3360,
    compatibility: "ECOSYS P2230dn",
    brand: "KYOCERA",
  },
  {
    id: "TK-1156",
    modelNumber: "TK-1156",
    name: "KYOCERA ECOSYS P2235DN 原廠黑色碳粉匣",
    price: 3380,
    compatibility: "ECOSYS P2235DN",
    brand: "KYOCERA",
  },
  {
    id: "TK-1166",
    modelNumber: "TK-1166",
    name: "KYOCERA P2040DN 原廠黑色碳粉匣",
    price: 5145,
    compatibility: "P2040DN",
    brand: "KYOCERA",
  },
  {
    id: "TK-1186",
    modelNumber: "TK-1186",
    name: "KYOCERA M-2635DN 原廠黑色碳粉匣",
    price: 2940,
    compatibility: "M-2635DN",
    brand: "KYOCERA",
  },
  {
    id: "TK-1176",
    modelNumber: "TK-1176",
    name: "KYOCERA M2540dn 原廠黑色碳粉匣",
    price: 4494,
    compatibility: "M2540dn",
    brand: "KYOCERA",
  },
  {
    id: "TK-3104",
    modelNumber: "TK-3104",
    name: "KYOCERA FS-2100DN 全新原廠黑色碳粉匣",
    price: 3000,
    compatibility: "FS-2100DN",
    brand: "KYOCERA",
  },
  {
    id: "TK-3166",
    modelNumber: "TK-3166",
    name: "KYOCERA P3045dn/M3645idn 原廠黑色碳粉匣",
    price: 4883,
    compatibility: "P3045dn / M3645idn",
    brand: "KYOCERA",
  },
  {
    id: "TK-3176",
    modelNumber: "TK-3176",
    name: "KYOCERA ECOSYS P3050dn 原廠黑色碳粉匣",
    price: 5775,
    compatibility: "ECOSYS P3050dn",
    brand: "KYOCERA",
  },
  {
    id: "TK-3196",
    modelNumber: "TK-3196",
    name: "原廠原裝黑色碳粉匣",
    price: 5951,
    compatibility: "ECOSYS P3155dn/ P3060dn/ P3260dn/ M3860idn",
    brand: "KYOCERA",
  },
  {
    id: "TK-3206",
    modelNumber: "TK-3206",
    name: "原廠原裝黑色碳粉匣",
    price: 8219,
    compatibility: "ECOSYS P3260dn",
    brand: "KYOCERA",
  },
  {
    id: "TK-7304",
    modelNumber: "TK-7304",
    name: "KYOCERA P4035dn/P4040dn 全新原廠黑色碳粉匣",
    price: 6983,
    compatibility: "P4035dn / P4040dn",
    brand: "KYOCERA",
  },
  {
    id: "TK-7316",
    modelNumber: "TK-7316",
    name: "原廠原裝黑色碳粉匣",
    price: 6842,
    compatibility: "ECOSYS P4135dn/ P4145dn",
    brand: "KYOCERA",
  },
  {
    id: "TK-6336",
    modelNumber: "TK-6336",
    name: "原廠原裝黑色碳粉匣",
    price: 7409,
    compatibility: "ECOSYS P4060dn",
    brand: "KYOCERA",
  },
  {
    id: "TK-1144",
    modelNumber: "TK-1144",
    name: "KYOCERA FS-1035MFP/FS-1135M 原廠黑色碳粉匣",
    price: 3570,
    compatibility: "FS-1035MFP / 1135M",
    brand: "KYOCERA",
  },
  {
    id: "TK-134",
    modelNumber: "TK-134",
    name: "KYOCERA FS-1300/1300D 原廠黑色碳粉匣",
    price: 2730,
    compatibility: "FS-1300 / 1300D",
    brand: "KYOCERA",
  },
  {
    id: "TK-164",
    modelNumber: "TK-164",
    name: "KYOCERA FS-1120D 原廠黑色碳粉匣",
    price: 2400,
    compatibility: "FS-1120D",
    brand: "KYOCERA",
  },
  {
    id: "TK-174",
    modelNumber: "TK-174",
    name: "KYOCERA FS-1320D/1370D 原廠黑色碳粉匣",
    price: 4410,
    compatibility: "FS-1320D / 1370D",
    brand: "KYOCERA",
  },
  {
    id: "TK-3134",
    modelNumber: "TK-3134",
    name: "KYOCERA FS-4200/4300DN 全新原廠黑色碳粉匣",
    price: 6195,
    compatibility: "FS-4200 / 4300DN",
    brand: "KYOCERA",
  },
  {
    id: "TK-454",
    modelNumber: "TK-454",
    name: "KYOCERA FS-6970DN/6975DN 原廠黑色碳粉匣",
    price: 4200,
    compatibility: "FS-6970DN / 6975DN",
    brand: "KYOCERA",
  },
  {
    id: "TK-5236K",
    modelNumber: "TK-5236K",
    name: "KYOCERA M5520cdn/P5020cdn 原廠黑色碳粉匣",
    price: 2484,
    compatibility: "M5520cdn / P5020cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5236C",
    modelNumber: "TK-5236C",
    name: "KYOCERA M5520cdn/P5020cdn 原廠藍色碳粉匣",
    price: 3564,
    compatibility: "M5520cdn / P5020cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5236M",
    modelNumber: "TK-5236M",
    name: "KYOCERA M5520cdn/P5020cdn 原廠紅色碳粉匣",
    price: 3564,
    compatibility: "M5520cdn / P5020cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5236Y",
    modelNumber: "TK-5236Y",
    name: "KYOCERA M5520cdn/P5020cdn 原廠黃色碳粉匣",
    price: 3564,
    compatibility: "M5520cdn / P5020cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5246K",
    modelNumber: "TK-5246K",
    name: "原廠原裝黑色碳粉匣",
    price: 3030,
    compatibility: "ECOSYS P5025cdn/ M5525cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5246M",
    modelNumber: "TK-5246M",
    name: "原廠原裝洋紅色碳粉匣",
    price: 3780,
    compatibility: "ECOSYS P5025cdn/ M5525cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5246Y",
    modelNumber: "TK-5246Y",
    name: "原廠原裝黃色碳粉匣",
    price: 3780,
    compatibility: "ECOSYS P5025cdn/ M5525cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5246C",
    modelNumber: "TK-5246C",
    name: "原廠原裝青藍色碳粉匣",
    price: 3780,
    compatibility: "ECOSYS P5025cdn/ M5525cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5276K",
    modelNumber: "TK-5276K",
    name: "原廠原裝黑色碳粉匣",
    price: 4460,
    compatibility: "ECOSYS P6230cdn/ M6630cidn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5276M",
    modelNumber: "TK-5276M",
    name: "原廠原裝洋紅色碳粉匣",
    price: 4680,
    compatibility: "ECOSYS P6230cdn/ M6630cidn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5276Y",
    modelNumber: "TK-5276Y",
    name: "原廠原裝黃色碳粉匣",
    price: 4680,
    compatibility: "ECOSYS P6230cdn/ M6630cidn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5276C",
    modelNumber: "TK-5276C",
    name: "原廠原裝青藍色碳粉匣",
    price: 4680,
    compatibility: "ECOSYS P6230cdn/ M6630cidn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5286K",
    modelNumber: "TK-5286K",
    name: "原廠原裝黑色碳粉匣",
    price: 7180,
    compatibility: "ECOSYS P6235cdn/ M6635cidn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5286M",
    modelNumber: "TK-5286M",
    name: "原廠原裝洋紅色碳粉匣",
    price: 7230,
    compatibility: "ECOSYS P6235cdn/ M6635cidn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5286Y",
    modelNumber: "TK-5286Y",
    name: "原廠原裝黃色碳粉匣",
    price: 7230,
    compatibility: "ECOSYS P6235cdn/ M6635cidn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5286C",
    modelNumber: "TK-5286C",
    name: "原廠原裝青藍色碳粉匣",
    price: 7230,
    compatibility: "ECOSYS P6235cdn/ M6635cidn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5296K",
    modelNumber: "TK-5296K",
    name: "原廠原裝黑色碳粉匣",
    price: 7130,
    compatibility: "ECOSYS P7240cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5296M",
    modelNumber: "TK-5296M",
    name: "原廠原裝洋紅色碳粉匣",
    price: 7560,
    compatibility: "ECOSYS P7240cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5296Y",
    modelNumber: "TK-5296Y",
    name: "原廠原裝黃色碳粉匣",
    price: 7560,
    compatibility: "ECOSYS P7240cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5296C",
    modelNumber: "TK-5296C",
    name: "原廠原裝青藍色碳粉匣",
    price: 7560,
    compatibility: "ECOSYS P7240cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-5376K",
    modelNumber: "TK-5376K",
    name: "原廠原裝黑色碳粉匣",
    price: 3821,
    compatibility: "ECOSYS PA3500cx/MA3500cifx",
    brand: "KYOCERA",
  },
  {
    id: "TK-5376M",
    modelNumber: "TK-5376M",
    name: "原廠原裝洋紅色碳粉匣",
    price: 3821,
    compatibility: "ECOSYS PA3500cx/MA3500cifx",
    brand: "KYOCERA",
  },
  {
    id: "TK-5376Y",
    modelNumber: "TK-5376Y",
    name: "原廠原裝黃色碳粉匣",
    price: 3821,
    compatibility: "ECOSYS PA3500cx/MA3500cifx",
    brand: "KYOCERA",
  },
  {
    id: "TK-5376C",
    modelNumber: "TK-5376C",
    name: "原廠原裝青藍色碳粉匣",
    price: 3821,
    compatibility: "ECOSYS PA3500cx/MA3500cifx",
    brand: "KYOCERA",
  },
  {
    id: "TK-5386K",
    modelNumber: "TK-5386K",
    name: "原廠原裝黑色碳粉匣",
    price: 7085,
    compatibility: "ECOSYS PA4000cx/MA4000cifx",
    brand: "KYOCERA",
  },
  {
    id: "TK-5386M",
    modelNumber: "TK-5386M",
    name: "原廠原裝洋紅色碳粉匣",
    price: 6579,
    compatibility: "ECOSYS PA4000cx/MA4000cifx",
    brand: "KYOCERA",
  },
  {
    id: "TK-5386Y",
    modelNumber: "TK-5386Y",
    name: "原廠原裝黃色碳粉匣",
    price: 6579,
    compatibility: "ECOSYS PA4000cx/MA4000cifx",
    brand: "KYOCERA",
  },
  {
    id: "TK-5386C",
    modelNumber: "TK-5386C",
    name: "原廠原裝青藍色碳粉匣",
    price: 6579,
    compatibility: "ECOSYS PA4000cx/MA4000cifx",
    brand: "KYOCERA",
  },
  {
    id: "TK-584K",
    modelNumber: "TK-584K",
    name: "KYOCERA FS-C5150DN 原廠黑色碳粉匣",
    price: 3938,
    compatibility: "FS-C5150DN",
    brand: "KYOCERA",
  },
  {
    id: "TK-584C",
    modelNumber: "TK-584C",
    name: "KYOCERA FS-C5150DN 原廠藍色碳粉匣",
    price: 3938,
    compatibility: "FS-C5150DN",
    brand: "KYOCERA",
  },
  {
    id: "TK-584M",
    modelNumber: "TK-584M",
    name: "KYOCERA FS-C5150DN 原廠紅色碳粉匣",
    price: 3938,
    compatibility: "FS-C5150DN",
    brand: "KYOCERA",
  },
  {
    id: "TK-584Y",
    modelNumber: "TK-584Y",
    name: "KYOCERA FS-C5150DN 原廠黃色碳粉匣",
    price: 3938,
    compatibility: "FS-C5150DN",
    brand: "KYOCERA",
  },
  {
    id: "TK-8806K",
    modelNumber: "TK-8806K",
    name: "原廠原裝黑色碳粉匣",
    price: 11620,
    compatibility: "ECOSYS P8060cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-8806M",
    modelNumber: "TK-8806M",
    name: "原廠原裝洋紅色碳粉匣",
    price: 11620,
    compatibility: "ECOSYS P8060cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-8806Y",
    modelNumber: "TK-8806Y",
    name: "原廠原裝黃色碳粉匣",
    price: 11620,
    compatibility: "ECOSYS P8060cdn",
    brand: "KYOCERA",
  },
  {
    id: "TK-8806C",
    modelNumber: "TK-8806C",
    name: "原廠原裝青藍色碳粉匣",
    price: 11620,
    compatibility: "ECOSYS P8060cdn",
    brand: "KYOCERA",
  },

  // LEDOMARS
  {
    id: "LP-7700/7800",
    modelNumber: "LP-7700/7800II/7800III/7800IV/8000",
    name: "原廠原裝黑色色帶",
    price: 648,
    compatibility: "LP-7700/7800II/7800III/7800IV/ 8000",
    brand: "LEDOMARS",
  },
  {
    id: "LP-2000",
    modelNumber: "LP-2000",
    name: "原廠原裝黑色色帶",
    price: 433,
    compatibility: "LP-2000",
    brand: "LEDOMARS",
  },

  // Lexmark
  {
    id: "50F3H0E",
    modelNumber: "50F3H0E",
    name: "原廠原裝黑色碳粉匣",
    price: 5001,
    compatibility: "MS310/MS312/MS410/MS4 15/MS510/MS610",
    brand: "Lexmark",
  },
  {
    id: "50F3X0E",
    modelNumber: "50F3X0E",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 6015,
    compatibility: "MS410/MS415/MS510/MS6 10",
    brand: "Lexmark",
  },
  {
    id: "70C8HCE",
    modelNumber: "70C8HCE",
    name: "原廠原裝高容量青色碳粉匣",
    price: 4507,
    compatibility: "CS310/CS410/CX410/CX510",
    brand: "Lexmark",
  },
  {
    id: "70C8HME",
    modelNumber: "70C8HME",
    name: "原廠原裝高容量紅色碳粉匣",
    price: 4507,
    compatibility: "CS310/CS410/CX410/CX510",
    brand: "Lexmark",
  },
  {
    id: "70C8HYE",
    modelNumber: "70C8HYE",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 4507,
    compatibility: "CS310/CS410/CX410/CX510",
    brand: "Lexmark",
  },
  {
    id: "70C8HKE",
    modelNumber: "70C8HKE",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 3337,
    compatibility: "CS310/CS410/CX410/CX510",
    brand: "Lexmark",
  },
  {
    id: "60F3H0E",
    modelNumber: "60F3H0E",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 6518,
    compatibility: "MX310/MX410/MX510",
    brand: "Lexmark",
  },
  {
    id: "56F3000",
    modelNumber: "56F3000",
    name: "原廠原裝黑色碳粉匣",
    price: 3533,
    compatibility: "MS421/MS521/MS621/MX4 21/MX521",
    brand: "Lexmark",
  },
  {
    id: "56F3H00",
    modelNumber: "56F3H00",
    name: "原廠原裝黑色高容量碳粉匣",
    price: 6982,
    compatibility: "MS421/MS521/MS621/MX4 21/MX521",
    brand: "Lexmark",
  },
  {
    id: "56F3U00",
    modelNumber: "56F3U00",
    name: "原廠原裝黑色特高容量碳粉匣",
    price: 8923,
    compatibility: "MS521/MS621/MX521",
    brand: "Lexmark",
  },
  {
    id: "58D3U00",
    modelNumber: "58D3U00",
    name: "原廠原裝黑色特高容量碳粉匣",
    price: 15802,
    compatibility: "MS823",
    brand: "Lexmark",
  },
  {
    id: "78C3XK0",
    modelNumber: "78C3XK0",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 2778,
    compatibility: "CS421/CS521/CX522",
    brand: "Lexmark",
  },
  {
    id: "78C3XC0",
    modelNumber: "78C3XC0",
    name: "原廠原裝高容量青色碳粉匣",
    price: 4140,
    compatibility: "CS421/CS521/CX522",
    brand: "Lexmark",
  },
  {
    id: "78C3XM0",
    modelNumber: "78C3XM0",
    name: "原廠原裝高容量紅色碳粉匣",
    price: 4140,
    compatibility: "CS421/CS521/CX522",
    brand: "Lexmark",
  },
  {
    id: "78C3XY0",
    modelNumber: "78C3XY0",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 4140,
    compatibility: "CS421/CS521/CX522",
    brand: "Lexmark",
  },
  {
    id: "20N30K0",
    modelNumber: "20N30K0",
    name: "原廠原裝黑色碳粉匣",
    price: 1688,
    compatibility: "CS331/CX331",
    brand: "Lexmark",
  },
  {
    id: "20N30C0",
    modelNumber: "20N30C0",
    name: "原廠原裝青色碳粉匣",
    price: 2270,
    compatibility: "CS331/CX331",
    brand: "Lexmark",
  },
  {
    id: "20N30M0",
    modelNumber: "20N30M0",
    name: "原廠原裝紅色碳粉匣",
    price: 2270,
    compatibility: "CS331/CX331",
    brand: "Lexmark",
  },
  {
    id: "20N30Y0",
    modelNumber: "20N30Y0",
    name: "原廠原裝黃色碳粉匣",
    price: 2270,
    compatibility: "CS331/CX331",
    brand: "Lexmark",
  },
  {
    id: "20N3HK0",
    modelNumber: "20N3HK0",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 3473,
    compatibility: "CS331/CX331",
    brand: "Lexmark",
  },
  {
    id: "20N3HC0",
    modelNumber: "20N3HC0",
    name: "原廠原裝高容量青色碳粉匣",
    price: 4363,
    compatibility: "CS331/CX331",
    brand: "Lexmark",
  },
  {
    id: "20N3HM0",
    modelNumber: "20N3HM0",
    name: "原廠原裝高容量紅色碳粉匣",
    price: 4363,
    compatibility: "CS331/CX331",
    brand: "Lexmark",
  },
  {
    id: "20N3HY0",
    modelNumber: "20N3HY0",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 4363,
    compatibility: "CS331/CX331",
    brand: "Lexmark",
  },
  {
    id: "55B3000",
    modelNumber: "55B3000",
    name: "原廠原裝黑色碳粉匣",
    price: 2651,
    compatibility: "MX331/MS431",
    brand: "Lexmark",
  },
  {
    id: "76C0HK0",
    modelNumber: "76C0HK0",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 10810,
    compatibility: "CS923",
    brand: "Lexmark",
  },
  {
    id: "76C0HC0",
    modelNumber: "76C0HC0",
    name: "原廠原裝高容量青色碳粉匣",
    price: 13604,
    compatibility: "CS923",
    brand: "Lexmark",
  },
  {
    id: "76C0HM0",
    modelNumber: "76C0HM0",
    name: "原廠原裝高容量紅色碳粉匣",
    price: 13604,
    compatibility: "CS923",
    brand: "Lexmark",
  },
  {
    id: "76C0HY0",
    modelNumber: "76C0HY0",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 13604,
    compatibility: "CS923",
    brand: "Lexmark",
  },
  {
    id: "55B0ZA0",
    modelNumber: "55B0ZA0",
    name: "原廠原裝感光鼓",
    price: 2894,
    compatibility: "MX331/MS431",
    brand: "Lexmark",
  },

  // OKI
  {
    id: "44469818",
    modelNumber: "44469818",
    name: "原廠原裝黑色碳粉匣",
    price: 1864,
    compatibility: "C310/C330/MC361",
    brand: "OKI",
  },
  {
    id: "44469755",
    modelNumber: "44469755",
    name: "原廠原裝黃色碳粉匣",
    price: 1970,
    compatibility: "C310/C330/MC361",
    brand: "OKI",
  },
  {
    id: "44469756",
    modelNumber: "44469756",
    name: "原廠原裝紅色碳粉匣",
    price: 1970,
    compatibility: "C310/C330/MC361",
    brand: "OKI",
  },
  {
    id: "44469757",
    modelNumber: "44469757",
    name: "原廠原裝藍色碳粉匣",
    price: 1970,
    compatibility: "C310/C330/MC361",
    brand: "OKI",
  },
  {
    id: "44494203",
    modelNumber: "44494203",
    name: "原廠原裝感光鼓",
    price: 7037,
    compatibility: "C310/C330/C530/MC361/M C561",
    brand: "OKI",
  },
  {
    id: "46508720",
    modelNumber: "46508720",
    name: "原廠原裝黑色碳粉匣",
    price: 3190,
    compatibility: "C332/MC363",
    brand: "OKI",
  },
  {
    id: "46508719",
    modelNumber: "46508719",
    name: "原廠原裝藍色碳粉匣",
    price: 3722,
    compatibility: "C332/MC363",
    brand: "OKI",
  },
  {
    id: "46508718",
    modelNumber: "46508718",
    name: "原廠原裝紅色碳粉匣",
    price: 3722,
    compatibility: "C332/MC363",
    brand: "OKI",
  },
  {
    id: "46508717",
    modelNumber: "46508717",
    name: "原廠原裝黃色碳粉匣",
    price: 3722,
    compatibility: "C332/MC363",
    brand: "OKI",
  },
  {
    id: "44469806",
    modelNumber: "44469806",
    name: "原廠原裝黑色碳粉匣",
    price: 2346,
    compatibility: "C530n/MC561",
    brand: "OKI",
  },
  {
    id: "44469725",
    modelNumber: "44469725",
    name: "原廠原裝黃色碳粉匣",
    price: 3934,
    compatibility: "C530n/MC561",
    brand: "OKI",
  },
  {
    id: "44469726",
    modelNumber: "44469726",
    name: "原廠原裝紅色碳粉匣",
    price: 3928,
    compatibility: "C530n/MC561",
    brand: "OKI",
  },
  {
    id: "44469727",
    modelNumber: "44469727",
    name: "原廠原裝藍色碳粉匣",
    price: 3934,
    compatibility: "C530n/MC561",
    brand: "OKI",
  },
  {
    id: "46490612",
    modelNumber: "46490612",
    name: "原廠原裝黑色碳粉匣",
    price: 3565,
    compatibility: "C532/MC573",
    brand: "OKI",
  },
  {
    id: "46490611",
    modelNumber: "46490611",
    name: "原廠原裝藍色碳粉匣",
    price: 5970,
    compatibility: "C532/MC573",
    brand: "OKI",
  },
  {
    id: "46490610",
    modelNumber: "46490610",
    name: "原廠原裝紅色碳粉匣",
    price: 5970,
    compatibility: "C532/MC573",
    brand: "OKI",
  },
  {
    id: "46490609",
    modelNumber: "46490609",
    name: "原廠原裝黃色碳粉匣",
    price: 5970,
    compatibility: "C532/MC573",
    brand: "OKI",
  },
  {
    id: "46484112",
    modelNumber: "46484112",
    name: "原廠原裝黑色感光鼓",
    price: 2568,
    compatibility: "C532/MC573",
    brand: "OKI",
  },
  {
    id: "46484111",
    modelNumber: "46484111",
    name: "原廠原裝藍色感光鼓",
    price: 2568,
    compatibility: "C532/MC573",
    brand: "OKI",
  },
  {
    id: "46484110",
    modelNumber: "46484110",
    name: "原廠原裝紅色感光鼓",
    price: 2568,
    compatibility: "C532/MC573",
    brand: "OKI",
  },
  {
    id: "46484109",
    modelNumber: "46484109",
    name: "原廠原裝黃色感光鼓",
    price: 2568,
    compatibility: "C532/MC573",
    brand: "OKI",
  },
  {
    id: "46394902",
    modelNumber: "46394902",
    name: "原廠原裝傳送皮帶",
    price: 4079,
    compatibility: "C532/MC573",
    brand: "OKI",
  },
  {
    id: "46358504",
    modelNumber: "46358504",
    name: "原廠原裝加熱器",
    price: 4756,
    compatibility: "C532/MC573",
    brand: "OKI",
  },
  {
    id: "44318645",
    modelNumber: "44318645",
    name: "原廠原裝黃色碳粉匣",
    price: 7172,
    compatibility: "C711/C710",
    brand: "OKI",
  },
  {
    id: "44318646",
    modelNumber: "44318646",
    name: "原廠原裝紅色碳粉匣",
    price: 7172,
    compatibility: "C711/C710",
    brand: "OKI",
  },
  {
    id: "44318647",
    modelNumber: "44318647",
    name: "原廠原裝藍色碳粉匣",
    price: 7172,
    compatibility: "C711/C710",
    brand: "OKI",
  },
  {
    id: "44318648",
    modelNumber: "44318648",
    name: "原廠原裝黑色碳粉匣",
    price: 2631,
    compatibility: "C711/C710",
    brand: "OKI",
  },
  {
    id: "44844549",
    modelNumber: "44844549",
    name: "原廠原裝黃色碳粉匣",
    price: 6858,
    compatibility: "ES8441",
    brand: "OKI",
  },
  {
    id: "44844550",
    modelNumber: "44844550",
    name: "原廠原裝紅色碳粉匣",
    price: 6858,
    compatibility: "ES8441",
    brand: "OKI",
  },
  {
    id: "44844551",
    modelNumber: "44844551",
    name: "原廠原裝藍色碳粉匣",
    price: 6858,
    compatibility: "ES8441",
    brand: "OKI",
  },
  {
    id: "44844552",
    modelNumber: "44844552",
    name: "原廠原裝黑色碳粉匣",
    price: 4040,
    compatibility: "ES8441",
    brand: "OKI",
  },
  {
    id: "44844441",
    modelNumber: "44844441",
    name: "原廠原裝黃色感光鼓",
    price: 3440,
    compatibility: "ES8441",
    brand: "OKI",
  },
  {
    id: "44844442",
    modelNumber: "44844442",
    name: "原廠原裝紅色感光鼓",
    price: 3440,
    compatibility: "ES8441",
    brand: "OKI",
  },
  {
    id: "44844443",
    modelNumber: "44844443",
    name: "原廠原裝藍色感光鼓",
    price: 3440,
    compatibility: "ES8441",
    brand: "OKI",
  },
  {
    id: "44844444",
    modelNumber: "44844444",
    name: "原廠原裝黑色感光鼓",
    price: 3440,
    compatibility: "ES8441",
    brand: "OKI",
  },
  {
    id: "44848807",
    modelNumber: "44848807",
    name: "原廠原裝加熱器",
    price: 4944,
    compatibility: "C841/ES8441/ES8473",
    brand: "OKI",
  },
  {
    id: "44846204",
    modelNumber: "44846204",
    name: "原廠原裝傳送皮帶",
    price: 5051,
    compatibility: "C841/ES8441/ES8473",
    brand: "OKI",
  },
  {
    id: "45536445",
    modelNumber: "45536445",
    name: "原廠原裝黃色碳粉匣",
    price: 9239,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45536446",
    modelNumber: "45536446",
    name: "原廠原裝紅色碳粉匣",
    price: 9239,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45536447",
    modelNumber: "45536447",
    name: "原廠原裝藍色碳粉匣",
    price: 9239,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45536448",
    modelNumber: "45536448",
    name: "原廠原裝黑色碳粉匣",
    price: 5529,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45103731",
    modelNumber: "45103731",
    name: "原廠原裝黃色感光鼓",
    price: 8188,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45103732",
    modelNumber: "45103732",
    name: "原廠原裝紅色感光鼓",
    price: 8188,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45103733",
    modelNumber: "45103733",
    name: "原廠原裝藍色感光鼓",
    price: 8188,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45103734",
    modelNumber: "45103734",
    name: "原廠原裝黑色感光鼓",
    price: 8243,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45536525",
    modelNumber: "45536525",
    name: "原廠原裝黃色碳粉匣",
    price: 12866,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45536526",
    modelNumber: "45536526",
    name: "原廠原裝紅色碳粉匣",
    price: 12866,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45536527",
    modelNumber: "45536527",
    name: "原廠原裝藍色碳粉匣",
    price: 12866,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45536528",
    modelNumber: "45536528",
    name: "原廠原裝黑色碳粉匣",
    price: 7710,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45531224",
    modelNumber: "45531224",
    name: "原廠原裝傳送皮帶",
    price: 16057,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45531114",
    modelNumber: "45531114",
    name: "原廠原裝加熱器",
    price: 16376,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "45531504",
    modelNumber: "45531504",
    name: "原廠原裝碳粉回收盒",
    price: 2297,
    compatibility: "C911",
    brand: "OKI",
  },
  {
    id: "44574903",
    modelNumber: "44574903",
    name: "原廠原裝黑色碳粉匣",
    price: 4162,
    compatibility: "B431dn",
    brand: "OKI",
  },
  {
    id: "44574303",
    modelNumber: "44574303",
    name: "原廠原裝黑色感光鼓",
    price: 3190,
    compatibility: "B431/MB471/MB491/B432/ B512",
    brand: "OKI",
  },
  {
    id: "45807112",
    modelNumber: "45807112",
    name: "原廠原裝黑色碳粉匣",
    price: 4189,
    compatibility: "B432",
    brand: "OKI",
  },
  {
    id: "45807117",
    modelNumber: "45807117",
    name: "原廠原裝黑色碳粉匣",
    price: 4679,
    compatibility: "ES5112/ES4192/ES5162",
    brand: "OKI",
  },
  {
    id: "44574306",
    modelNumber: "44574306",
    name: "原廠原裝黑色感光鼓",
    price: 3190,
    compatibility: "ES5112/ES4192/ES5162",
    brand: "OKI",
  },
  {
    id: "45460503",
    modelNumber: "45460503",
    name: "原廠原裝黑色碳粉匣",
    price: 9890,
    compatibility: "ES7131",
    brand: "OKI",
  },
  {
    id: "45456303",
    modelNumber: "45456303",
    name: "原廠原裝黑色感光鼓",
    price: 7550,
    compatibility: "ES7131",
    brand: "OKI",
  },
  {
    id: "45435101",
    modelNumber: "45435101",
    name: "原廠原裝加熱器",
    price: 14355,
    compatibility: "ES7131",
    brand: "OKI",
  },
  {
    id: "44708002",
    modelNumber: "44708002",
    name: "原廠原裝黑色碳粉匣",
    price: 4519,
    compatibility: "B840",
    brand: "OKI",
  },
  {
    id: "44707402",
    modelNumber: "44707402",
    name: "原廠原裝黑色感光鼓",
    price: 4544,
    compatibility: "B840",
    brand: "OKI",
  },
  {
    id: "44707604",
    modelNumber: "44707604",
    name: "原廠原裝維護套件",
    price: 5933,
    compatibility: "B840",
    brand: "OKI",
  },
  {
    id: "46861309",
    modelNumber: "46861309",
    name: "原廠原裝黃色碳粉匣",
    price: 9101,
    compatibility: "C824/C834/C844",
    brand: "OKI",
  },
  {
    id: "46861310",
    modelNumber: "46861310",
    name: "原廠原裝紅色碳粉匣",
    price: 9101,
    compatibility: "C824/C834/C844",
    brand: "OKI",
  },
  {
    id: "46861311",
    modelNumber: "46861311",
    name: "原廠原裝藍色碳粉匣",
    price: 9101,
    compatibility: "C824/C834/C844",
    brand: "OKI",
  },
  {
    id: "46861312",
    modelNumber: "46861312",
    name: "原廠原裝黑色碳粉匣",
    price: 4827,
    compatibility: "C824/C834/C844",
    brand: "OKI",
  },
  {
    id: "46857509",
    modelNumber: "46857509",
    name: "原廠原裝黃色感光鼓",
    price: 4129,
    compatibility: "C824/C834/C844",
    brand: "OKI",
  },
  {
    id: "46857510",
    modelNumber: "46857510",
    name: "原廠原裝紅色感光鼓",
    price: 4129,
    compatibility: "C824/C834/C844",
    brand: "OKI",
  },
  {
    id: "46857511",
    modelNumber: "46857511",
    name: "原廠原裝藍色感光鼓",
    price: 4129,
    compatibility: "C824/C834/C844",
    brand: "OKI",
  },
  {
    id: "46857512",
    modelNumber: "46857512",
    name: "原廠原裝黑色感光鼓",
    price: 4129,
    compatibility: "C824/C834/C844",
    brand: "OKI",
  },
  {
    id: "47219627",
    modelNumber: "47219627",
    name: "原廠原裝加熱器",
    price: 7018,
    compatibility: "C824/C834/C844",
    brand: "OKI",
  },
  {
    id: "47074503",
    modelNumber: "47074503",
    name: "原廠原裝傳送皮帶",
    price: 7819,
    compatibility: "C824/C834/C844",
    brand: "OKI",
  },
  {
    id: "YA8001-1088G033",
    modelNumber: "YA8001-1088G033",
    name: "原廠原裝黃色碳粉匣",
    price: 6390,
    compatibility: "C650",
    brand: "OKI",
  },
  {
    id: "YA8001-1088G034",
    modelNumber: "YA8001-1088G034",
    name: "原廠原裝紅色碳粉匣",
    price: 6390,
    compatibility: "C650",
    brand: "OKI",
  },
  {
    id: "YA8001-1088G035",
    modelNumber: "YA8001-1088G035",
    name: "原廠原裝藍色碳粉匣",
    price: 6390,
    compatibility: "C650",
    brand: "OKI",
  },
  {
    id: "YA8001-1088G036",
    modelNumber: "YA8001-1088G036",
    name: "原廠原裝黑色碳粉匣",
    price: 3857,
    compatibility: "C650",
    brand: "OKI",
  },
  {
    id: "YA8001-1099G013",
    modelNumber: "YA8001-1099G013",
    name: "原廠原裝黃色感光鼓",
    price: 4066,
    compatibility: "C650",
    brand: "OKI",
  },
  {
    id: "YA8001-1099G014",
    modelNumber: "YA8001-1099G014",
    name: "原廠原裝紅色感光鼓",
    price: 4066,
    compatibility: "C650",
    brand: "OKI",
  },
  {
    id: "YA8001-1099G015",
    modelNumber: "YA8001-1099G015",
    name: "原廠原裝藍色感光鼓",
    price: 4066,
    compatibility: "C650",
    brand: "OKI",
  },
  {
    id: "YA8001-1099G016",
    modelNumber: "YA8001-1099G016",
    name: "原廠原裝黑色感光鼓",
    price: 4066,
    compatibility: "C650",
    brand: "OKI",
  },

  // Ricoh
  {
    id: "407547",
    modelNumber: "407547",
    name: "原廠原裝黑色碳粉匣",
    price: 2016,
    compatibility: "SP C261DNw, SP C261SFNw",
    brand: "Ricoh",
  },
  {
    id: "407548",
    modelNumber: "407548",
    name: "原廠原裝青色碳粉匣",
    price: 2819,
    compatibility: "SP C261DNw, SP C261SFNw",
    brand: "Ricoh",
  },
  {
    id: "407549",
    modelNumber: "407549",
    name: "原廠原裝紅色碳粉匣",
    price: 2819,
    compatibility: "SP C261DNw, SP C261SFNw",
    brand: "Ricoh",
  },
  {
    id: "407550",
    modelNumber: "407550",
    name: "原廠原裝黃色碳粉匣",
    price: 2819,
    compatibility: "SP C261DNw, SP C261SFNw",
    brand: "Ricoh",
  },
  {
    id: "408200",
    modelNumber: "408200",
    name: "原廠原裝高容量黑色碳粉匣",
    price: 3789,
    compatibility: "SP C360DNw, SP C360SFNw",
    brand: "Ricoh",
  },
  {
    id: "408201",
    modelNumber: "408201",
    name: "原廠原裝高容量青色碳粉匣",
    price: 4190,
    compatibility: "SP C360DNw, SP C360SFNw",
    brand: "Ricoh",
  },
  {
    id: "408202",
    modelNumber: "408202",
    name: "原廠原裝高容量紅色碳粉匣",
    price: 4190,
    compatibility: "SP C360DNw, SP C360SFNw",
    brand: "Ricoh",
  },
  {
    id: "408203",
    modelNumber: "408203",
    name: "原廠原裝高容量黃色碳粉匣",
    price: 4190,
    compatibility: "SP C360DNw, SP C360SFNw",
    brand: "Ricoh",
  },
  {
    id: "408204",
    modelNumber: "408204",
    name: "原廠原裝低容量黑色碳粉匣",
    price: 1964,
    compatibility: "SP C360DNw, SP C360SFNw",
    brand: "Ricoh",
  },
  {
    id: "408205",
    modelNumber: "408205",
    name: "原廠原裝低容量青色碳粉匣",
    price: 2211,
    compatibility: "SP C360DNw, SP C360SFNw",
    brand: "Ricoh",
  },
  {
    id: "408206",
    modelNumber: "408206",
    name: "原廠原裝低容量紅色碳粉匣",
    price: 2211,
    compatibility: "SP C360DNw, SP C360SFNw",
    brand: "Ricoh",
  },
  {
    id: "408207",
    modelNumber: "408207",
    name: "原廠原裝低容量黃色碳粉匣",
    price: 2211,
    compatibility: "SP C360DNw, SP C360SFNw",
    brand: "Ricoh",
  },
  {
    id: "408356",
    modelNumber: "408356",
    name: "原廠原裝黑色碳粉匣",
    price: 2343,
    compatibility: "M C250FWB, P C300W",
    brand: "Ricoh",
  },
  {
    id: "408357",
    modelNumber: "408357",
    name: "原廠原裝青色碳粉匣",
    price: 4271,
    compatibility: "M C250FWB, P C300W",
    brand: "Ricoh",
  },
  {
    id: "408358",
    modelNumber: "408358",
    name: "原廠原裝紅色碳粉匣",
    price: 4271,
    compatibility: "M C250FWB, P C300W",
    brand: "Ricoh",
  },
  {
    id: "408359",
    modelNumber: "408359",
    name: "原廠原裝黃色碳粉匣",
    price: 4271,
    compatibility: "M C250FWB, P C300W",
    brand: "Ricoh",
  },
];

const ITEMS_PER_PAGE = 20;

const OrderOriginal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateCartItemQuantity, clearCart, getTotalItems, getTotalPrice } =
    useCart();

  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [selectedTaxOptions, setSelectedTaxOptions] = useState<Record<string, "untaxed" | "taxed">>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("全部");
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique brands
  const brands = ["全部", ...Array.from(new Set(products.map((p) => p.brand)))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.compatibility.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand = selectedBrand === "全部" || product.brand === selectedBrand;

    return matchesSearch && matchesBrand;
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

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setCurrentPage(1);
  };

  const getQuantity = (productId: string) => selectedQuantities[productId] || 1;
  const getTaxOption = (productId: string) => selectedTaxOptions[productId] || "untaxed";

  const setQuantity = (productId: string, qty: number) => {
    setSelectedQuantities((prev) => ({ ...prev, [productId]: qty }));
  };

  const setTaxOption = (productId: string, option: "untaxed" | "taxed") => {
    setSelectedTaxOptions((prev) => ({ ...prev, [productId]: option }));
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">原廠碳粉匣</h1>
              <p className="text-muted-foreground">多品牌原廠碳粉匣特惠價格</p>
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

              {/* Brand Filter */}
              <div className="flex flex-wrap gap-4 justify-center">
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
                  <Card
                    key={product.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
                  >
                    <CardContent className="p-0">
                      <div className="bg-white p-4 flex items-center justify-center min-h-[180px]">
                        <img src={productPlaceholder} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                              {product.brand}
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
                            <Label htmlFor={`tax-${product.id}-untaxed`} className="text-sm cursor-pointer">
                              未稅
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="taxed" id={`tax-${product.id}-taxed`} />
                            <Label htmlFor={`tax-${product.id}-taxed`} className="text-sm cursor-pointer">
                              含稅
                            </Label>
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
                          <span className="text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
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
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 10) {
                    pageNum = i + 1;
                  } else if (currentPage <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 4) {
                    pageNum = totalPages - 9 + i;
                  } else {
                    pageNum = currentPage - 4 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? "eco-gradient text-primary-foreground" : ""}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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
                    <DialogDescription>查看您選擇的商品</DialogDescription>
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
                        <span className="text-lg font-semibold min-w-[2rem] text-center">{item.quantity}</span>
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
          <p className="text-muted-foreground text-sm">© 2024 綠昕科技有限公司 版權所有</p>
        </div>
      </footer>
    </div>
  );
};

export default OrderOriginal;
