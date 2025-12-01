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
      <>
        {/* Desktop collapsed button */}
        <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-50">
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

        {/* Mobile collapsed button */}
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setIsExpanded(true)}
            className="rounded-full eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg h-16 w-16 relative"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </div>
      </>
    );
  }

  return (
    <Card className="fixed right-4 top-20 md:w-80 w-[calc(100vw-2rem)] max-w-md md:max-h-[calc(100vh-6rem)] max-h-[70vh] md:top-20 bottom-4 md:bottom-auto z-50 shadow-2xl border-2 overflow-hidden flex flex-col md:animate-slide-in-right animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <h3 className="font-bold text-base md:text-lg">購物車</h3>
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
          <X className="w-4 h-4 md:hidden" />
          <ChevronRight className="w-4 h-4 hidden md:block" />
        </Button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3">
        {cart.length === 0 ? (
          <div className="py-6 md:py-8 text-center text-muted-foreground">
            <ShoppingCart className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 opacity-30" />
            <p className="text-xs md:text-sm">購物車是空的</p>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-muted/30 rounded-lg p-2 md:p-3 space-y-2 animate-fade-in"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-xs md:text-sm leading-tight line-clamp-2">
                      {item.productName}
                    </h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
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
                    className="h-5 w-5 md:h-6 md:w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 md:gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateCartItemQuantity(index, item.quantity - 1)
                      }
                      className="h-6 w-6 md:h-7 md:w-7"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-xs md:text-sm font-semibold min-w-[1.5rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateCartItemQuantity(index, item.quantity + 1)
                      }
                      className="h-6 w-6 md:h-7 md:w-7"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {item.productType === "original" && (
                    <div className="font-bold text-xs md:text-sm">
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
        <div className="border-t bg-card p-3 md:p-4 space-y-2 md:space-y-3">
          {getTotalPrice() > 0 && (
            <div className="flex justify-between items-center font-bold text-sm md:text-base">
              <span>總計</span>
              <span className="text-base md:text-lg">
                NT${getTotalPrice().toLocaleString()}
              </span>
            </div>
          )}
          <Button
            onClick={onCheckout}
            className="w-full eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg text-sm md:text-base h-10 md:h-11"
          >
            <Send className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            前往結帳
          </Button>
        </div>
      )}
    </Card>
  );
};
