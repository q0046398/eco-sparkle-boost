import { useState } from "react";
import { ShoppingCart, X, Minus, Plus, Trash2, Send, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/hooks/use-cart";

interface FloatingCartProps {
  cart: CartItem[];
  removeFromCart: (index: number) => void;
  updateCartItemQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  onCheckout: () => void;
}

export const FloatingCart = ({
  cart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  getTotalItems,
  getTotalPrice,
  onCheckout,
}: FloatingCartProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isExpanded) {
    return (
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="rounded-l-full rounded-r-none eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg h-20 px-4"
        >
          <div className="flex flex-col items-center gap-1">
            <ShoppingCart className="w-5 h-5" />
            {getTotalItems() > 0 && (
              <span className="text-xs font-bold">{getTotalItems()}</span>
            )}
          </div>
          <ChevronLeft className="w-4 h-4 ml-1" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed right-4 top-20 w-80 max-h-[calc(100vh-6rem)] z-50 shadow-2xl border-2 overflow-hidden flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg">購物車</h3>
          {getTotalItems() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
              {getTotalItems()}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(false)}
          className="h-8 w-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">購物車是空的</p>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-muted/30 rounded-lg p-3 space-y-2 animate-fade-in"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-tight truncate">
                      {item.productName}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.productType === "original" ? (
                        <>
                          {item.priceType.includes("untaxed") ? "未稅" : "含稅"}{" "}
                          NT${item.unitPrice.toLocaleString()}
                        </>
                      ) : (
                        "請聯繫報價"
                      )}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(index)}
                    className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateCartItemQuantity(index, item.quantity - 1)
                      }
                      className="h-7 w-7"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-semibold min-w-[1.5rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateCartItemQuantity(index, item.quantity + 1)
                      }
                      className="h-7 w-7"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {item.productType === "original" && (
                    <div className="font-bold text-sm">
                      NT${(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {cart.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                清空購物車
              </Button>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="border-t bg-card p-4 space-y-3">
          {getTotalPrice() > 0 && (
            <div className="flex justify-between items-center font-bold">
              <span>總計</span>
              <span className="text-lg">
                NT${getTotalPrice().toLocaleString()}
              </span>
            </div>
          )}
          <Button
            onClick={onCheckout}
            className="w-full eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg"
          >
            <Send className="w-4 h-4 mr-2" />
            前往結帳
          </Button>
        </div>
      )}
    </Card>
  );
};
