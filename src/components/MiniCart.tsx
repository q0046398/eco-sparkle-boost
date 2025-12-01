import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/hooks/use-cart";

interface MiniCartProps {
  cart: CartItem[];
  getTotalItems: () => number;
  getTotalPrice: () => number;
  onOpenCart: () => void;
}

export const MiniCart = ({
  cart,
  getTotalItems,
  getTotalPrice,
  onOpenCart,
}: MiniCartProps) => {
  return (
    <Button
      onClick={onOpenCart}
      variant="outline"
      className="relative h-10 px-3 gap-2 border-2 hover:border-primary hover:bg-muted"
    >
      <ShoppingCart className="w-4 h-4" />
      
      {getTotalItems() > 0 && (
        <>
          <div className="flex flex-col items-start">
            <span className="text-xs font-semibold leading-none">
              {getTotalItems()} 件
            </span>
            {getTotalPrice() > 0 && (
              <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
                NT${getTotalPrice().toLocaleString()}
              </span>
            )}
          </div>
          
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {getTotalItems()}
          </span>
        </>
      )}
      
      {getTotalItems() === 0 && (
        <span className="text-sm font-medium">購物車</span>
      )}
    </Button>
  );
};
