import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Wallet,
  Check,
  Crown,
  Zap,
  Shield,
  Star,
  Users,
  Brain,
  BarChart3,
  Lock,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

// Mock user data
const mockUser = {
  name: "Alex Chen",
  email: "alex.chen@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
};

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [mpesaData, setMpesaData] = useState({
    phone: "",
  });

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 0,
      period: "month",
      description: "Perfect for getting started",
      features: [
        "3 AI Agents",
        "Basic Memory (1GB)",
        "Standard Support",
        "Basic Analytics",
        "Community Access",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 29,
      period: "month",
      description: "Most popular for professionals",
      features: [
        "Unlimited AI Agents",
        "Advanced Memory (25GB)",
        "Priority Support",
        "Advanced Analytics",
        "Voice Capabilities",
        "Team Collaboration",
        "API Access",
        "Custom Integrations",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      period: "month",
      description: "For large teams and organizations",
      features: [
        "Everything in Pro",
        "Unlimited Memory",
        "Dedicated Support",
        "Custom AI Models",
        "Advanced Security",
        "SSO Integration",
        "Custom Deployment",
        "SLA Guarantee",
      ],
      popular: false,
    },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsProcessing(false);
    // In real app, handle payment success/failure
    alert("Payment processed successfully! Welcome to Pro!");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={mockUser} />

      <div className="container mx-auto max-w-7xl px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Page Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Upgrade to Pro
                </h1>
                <p className="text-muted-foreground">
                  Unlock unlimited agents and advanced features
                </p>
              </div>
            </div>
          </motion.div>

          {/* Pricing Plans */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`relative cursor-pointer transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50"
                    } ${plan.popular ? "ring-2 ring-primary/20" : ""}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                        {plan.id === "starter" && (
                          <Zap className="w-8 h-8 text-primary" />
                        )}
                        {plan.id === "pro" && (
                          <Crown className="w-8 h-8 text-primary" />
                        )}
                        {plan.id === "enterprise" && (
                          <Shield className="w-8 h-8 text-primary" />
                        )}
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold text-foreground">
                        ${plan.price}
                        <span className="text-lg font-normal text-muted-foreground">
                          /{plan.period}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {plan.description}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-green-500" />
                            </div>
                            <span className="text-sm text-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {selectedPlan === plan.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20"
                        >
                          <div className="flex items-center gap-2 text-primary">
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Selected Plan
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-6"
                >
                  <TabsList className="grid w-full grid-cols-3 bg-card/40">
                    <TabsTrigger
                      value="card"
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger
                      value="mpesa"
                      className="flex items-center gap-2"
                    >
                      <Smartphone className="w-4 h-4" />
                      M-Pesa
                    </TabsTrigger>
                    <TabsTrigger
                      value="wallet"
                      className="flex items-center gap-2"
                    >
                      <Wallet className="w-4 h-4" />
                      Wallet
                    </TabsTrigger>
                  </TabsList>

                  {/* Card Payment */}
                  <TabsContent value="card" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          value={cardData.name}
                          onChange={(e) =>
                            setCardData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="John Doe"
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={cardData.number}
                          onChange={(e) =>
                            setCardData((prev) => ({
                              ...prev,
                              number: e.target.value,
                            }))
                          }
                          placeholder="1234 5678 9012 3456"
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          value={cardData.expiry}
                          onChange={(e) =>
                            setCardData((prev) => ({
                              ...prev,
                              expiry: e.target.value,
                            }))
                          }
                          placeholder="MM/YY"
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={cardData.cvv}
                          onChange={(e) =>
                            setCardData((prev) => ({
                              ...prev,
                              cvv: e.target.value,
                            }))
                          }
                          placeholder="123"
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* M-Pesa Payment */}
                  <TabsContent value="mpesa" className="space-y-4">
                    <div className="max-w-md">
                      <div className="space-y-2">
                        <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="mpesaPhone"
                            value={mpesaData.phone}
                            onChange={(e) =>
                              setMpesaData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            placeholder="+254 700 000 000"
                            className="bg-background/50 pl-10"
                          />
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Smartphone className="w-5 h-5 text-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-foreground">
                              M-Pesa Payment
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              You'll receive an STK push notification on your
                              phone to complete the payment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Wallet Payment */}
                  <TabsContent value="wallet" className="space-y-4">
                    <div className="max-w-md">
                      <div className="p-6 bg-card/30 rounded-lg text-center">
                        <Wallet className="w-12 h-12 mx-auto mb-4 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Wallet Balance
                        </h3>
                        <div className="text-3xl font-bold text-foreground mb-2">
                          $45.00
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Insufficient balance. Please add funds to your wallet.
                        </p>
                        <Button variant="outline" className="w-full">
                          Add Funds to Wallet
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Summary & Action */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {plans.find((p) => p.id === selectedPlan)?.name} Plan
                    </h3>
                    <p className="text-muted-foreground">
                      Billed monthly • Cancel anytime
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      ${plans.find((p) => p.id === selectedPlan)?.price}/month
                    </div>
                    <div className="text-sm text-muted-foreground">
                      50% off first month
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    Secure payment powered by industry-leading encryption
                  </span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || selectedPlan === "starter"}
                  className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium py-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to{" "}
                      {plans.find((p) => p.id === selectedPlan)?.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
