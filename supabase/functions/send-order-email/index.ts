import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProductItem {
  name: string;
  quantity: string;
}

interface OrderEmailRequest {
  products: ProductItem[];
  customerName: string;
  phone: string;
  email: string;
  contactTime: string;
  address: string;
  notes: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderEmailRequest = await req.json();
    console.log("Received order data:", orderData);

    // Format products list
    const productsList = orderData.products
      .map((p, i) => `${i + 1}. ${p.name} - 數量：${p.quantity}`)
      .join("<br>");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
          📦 新訂單通知
        </h1>
        
        <h2 style="color: #333; margin-top: 20px;">訂購產品</h2>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
          ${productsList}
        </div>
        
        <h2 style="color: #333; margin-top: 20px;">客戶資訊</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">客戶名稱：</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${orderData.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">聯絡電話：</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${orderData.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">聯絡信箱：</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${orderData.email || "未提供"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">聯繫時間：</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${orderData.contactTime}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">寄送地址：</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${orderData.address}</td>
          </tr>
          ${orderData.notes ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">備註：</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${orderData.notes}</td>
          </tr>
          ` : ""}
        </table>
        
        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          此郵件由綠昕科技網站自動發送<br>
          發送時間：${new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}
        </p>
      </div>
    `;

    console.log("Sending email to dean0046298@gmail.com");

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "綠昕科技 <onboarding@resend.dev>",
        to: ["dean0046298@gmail.com"],
        subject: `[新訂單] ${orderData.customerName} - ${orderData.products[0].name}`,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true, data: emailResult }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
