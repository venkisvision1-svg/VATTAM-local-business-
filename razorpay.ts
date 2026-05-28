// Razorpay Payment Gateway - Ready structure
// Add your Razorpay Key ID in .env as NEXT_PUBLIC_RAZORPAY_KEY_ID

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';

export const isRazorpayConfigured = (): boolean => !!RAZORPAY_KEY;

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async (params: {
  amount: number;
  description: string;
  customerName?: string;
  customerPhone?: string;
  onSuccess: (paymentId: string, orderId: string) => void;
  onFailure?: () => void;
}): Promise<void> => {
  const loaded = await loadRazorpayScript();
  if (!loaded || !RAZORPAY_KEY) {
    // Fallback: simulate payment for demo
    params.onSuccess(`pay_${Date.now()}`, `order_${Date.now()}`);
    return;
  }

  const options: RazorpayOptions = {
    key: RAZORPAY_KEY,
    amount: params.amount * 100, // Razorpay takes paise
    currency: 'INR',
    name: 'VATTAM',
    description: params.description,
    handler: (response) => {
      params.onSuccess(
        response.razorpay_payment_id,
        response.razorpay_order_id
      );
    },
    prefill: {
      name: params.customerName,
      contact: params.customerPhone,
    },
    theme: { color: '#f97316' },
    modal: {
      ondismiss: params.onFailure,
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
