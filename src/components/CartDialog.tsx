import { Minus, Plus, Trash2, Send, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CartItem } from "@/hooks/use-cart";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  removeFromCart: (index: number) => void;
  updateCartItemQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  onCheckout: () => void;
}

export const CartDialog = ({
  open,
  onOpenChange,
  cart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  getTotalItems,
  getTotalPrice,
  onCheckout,
}: CartDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                onClick={clearCart}
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
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">
                    {item.productName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.productType === "original" ? (
                      <>
                        {item.priceType.includes("untaxed") ? "未稅" : "含稅"} NT$
                        {item.unitPrice.toLocaleString()}
                      </>
                    ) : (
                      "請聯繫報價"
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateCartItemQuantity(index, item.quantity - 1)
                    }
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
                    onClick={() =>
                      updateCartItemQuantity(index, item.quantity + 1)
                    }
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {item.productType === "original" && (
                  <div className="text-right min-w-[5rem]">
                    <p className="font-bold text-foreground">
                      NT${(item.unitPrice * item.quantity).toLocaleString()}
                    </p>
                  </div>
                )}

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
              {getTotalPrice() > 0 && (
                <div className="flex justify-between items-center text-lg font-bold mb-4">
                  <span>總計</span>
                  <span>NT${getTotalPrice().toLocaleString()}</span>
                </div>
              )}

              <Button
                onClick={onCheckout}
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
  );
};
