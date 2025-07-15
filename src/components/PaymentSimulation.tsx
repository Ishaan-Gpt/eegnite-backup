import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, CreditCard, Smartphone, Building, Shield, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface PaymentSimulationProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
}

const paymentSchema = z.object({
  cardNumber: z.string().min(12, "Card number is required"),
  expiry: z.string().min(4, "Expiry is required"),
  cvv: z.string().min(3, "CVV is required"),
  cardholder: z.string().min(2, "Cardholder name is required"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export function PaymentSimulation({ isOpen, onClose, planName, planPrice }: PaymentSimulationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiry: '',
      cvv: '',
      cardholder: '',
    },
  });
  const [currentStep, setCurrentStep] = useState<'method' | 'card' | 'upi' | 'success'>('method');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handlePaymentMethod = (method: string) => {
    setSelectedMethod(method);
    setCurrentStep(method as 'card' | 'upi');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setCurrentStep('success');
    
    // Auto close after success
    setTimeout(() => {
      onClose();
      setCurrentStep('method');
    }, 3000);
  };

  const resetForm = () => {
    setCurrentStep('method');
    setSelectedMethod('');
    setIsProcessing(false);
  };

  const API_URL = import.meta.env.VITE_PAYMENT_API_URL;

  const onSubmit = async (data: PaymentFormData) => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Payment failed');
      // Simulate payment success
      setCurrentStep('success');
      reset();
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto glass-strong border-2 border-foreground/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-clash font-bold text-center">
            Secure Checkout
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Payment Method Selection */}
          {currentStep === 'method' && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Order Summary */}
              <div className="neumorphism p-4 rounded-2xl">
                <h3 className="font-clash font-semibold mb-2">{planName}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-xl font-clash font-bold gradient-text">{planPrice}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="font-inter font-semibold">Choose Payment Method</h4>
                
                <Button
                  onClick={() => handlePaymentMethod('card')}
                  className="w-full justify-start glass hover-lift p-4 h-auto"
                  variant="ghost"
                >
                  <CreditCard className="w-6 h-6 mr-4 text-primary" />
                  <div className="text-left">
                    <div className="font-semibold">Credit/Debit Card</div>
                    <div className="text-sm text-muted-foreground">Visa, Mastercard, American Express</div>
                  </div>
                </Button>

                <Button
                  onClick={() => handlePaymentMethod('upi')}
                  className="w-full justify-start glass hover-lift p-4 h-auto"
                  variant="ghost"
                >
                  <Smartphone className="w-6 h-6 mr-4 text-primary" />
                  <div className="text-left">
                    <div className="font-semibold">UPI Payment</div>
                    <div className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</div>
                  </div>
                </Button>

                <Button
                  className="w-full justify-start glass hover-lift p-4 h-auto opacity-50 cursor-not-allowed"
                  variant="ghost"
                  disabled
                >
                  <Building className="w-6 h-6 mr-4 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-semibold text-muted-foreground">Net Banking</div>
                    <div className="text-sm text-muted-foreground">Coming Soon</div>
                  </div>
                </Button>
              </div>

              <div className="flex items-center justify-center text-xs text-muted-foreground">
                <Shield className="w-4 h-4 mr-2" />
                256-bit SSL Encryption • Secure Payments
              </div>
            </motion.div>
          )}

          {/* Card Payment Form */}
          {currentStep === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                  className="p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <h3 className="font-clash font-semibold">Card Details</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Card Number</label>
                  <Input 
                    placeholder="1234 5678 9012 3456"
                    className="neumorphism-inset mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Expiry</label>
                    <Input 
                      placeholder="MM/YY"
                      className="neumorphism-inset mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CVV</label>
                    <Input 
                      placeholder="123"
                      className="neumorphism-inset mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Cardholder Name</label>
                  <Input 
                    placeholder="John Doe"
                    className="neumorphism-inset mt-1"
                  />
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full neumorphism hover-glow py-3 text-lg font-semibold"
                style={{ background: 'var(--gradient-orange)' }}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Pay ${planPrice}`
                )}
              </Button>
            </motion.div>
          )}

          {/* UPI Payment */}
          {currentStep === 'upi' && (
            <motion.div
              key="upi"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                  className="p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <h3 className="font-clash font-semibold">UPI Payment</h3>
              </div>

              <div className="text-center space-y-4">
                <div className="neumorphism p-6 rounded-2xl">
                  <div className="w-32 h-32 mx-auto mb-4 neumorphism-inset rounded-2xl flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">QR Code</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scan with any UPI app to pay {planPrice}
                  </p>
                </div>

                <div className="text-center text-muted-foreground">or</div>

                <div>
                  <label className="text-sm font-medium">UPI ID</label>
                  <Input 
                    placeholder="yourname@upi"
                    className="neumorphism-inset mt-1"
                  />
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full neumorphism hover-glow py-3 text-lg font-semibold"
                style={{ background: 'var(--gradient-orange)' }}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Pay ${planPrice}`
                )}
              </Button>
            </motion.div>
          )}

          {/* Success Screen */}
          {currentStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6 py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto rounded-full neumorphism flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-green-500" />
              </motion.div>

              <div>
                <h3 className="text-xl font-clash font-bold gradient-text mb-2">
                  Payment Successful!
                </h3>
                <p className="text-muted-foreground">
                  Welcome to {planName}. You'll receive a confirmation email shortly.
                </p>
              </div>

              <div className="neumorphism p-4 rounded-2xl text-sm">
                <div className="flex justify-between mb-2">
                  <span>Transaction ID:</span>
                  <span className="font-mono">TXN{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Paid:</span>
                  <span className="font-semibold">{planPrice}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}