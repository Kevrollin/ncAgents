import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet as WalletIcon,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Smartphone,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  Eye,
  DollarSign,
  PiggyBank,
  Target,
  Award,
  Zap,
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

// Mock wallet data
const mockWalletData = {
  balance: 245.5,
  pendingBalance: 12.3,
  totalEarned: 1250.75,
  totalSpent: 1005.25,
  monthlySpending: 89.5,
  savingsGoal: 500.0,
  currentSavings: 245.5,
};

// Mock transactions
const mockTransactions = [
  {
    id: "tx_1",
    type: "credit",
    amount: 25.0,
    description: "Agent marketplace earnings",
    date: "2024-01-20T14:30:00Z",
    status: "completed",
    category: "earnings",
  },
  {
    id: "tx_2",
    type: "debit",
    amount: 15.0,
    description: "Sales Assistant Pro subscription",
    date: "2024-01-20T10:15:00Z",
    status: "completed",
    category: "subscription",
  },
  {
    id: "tx_3",
    type: "credit",
    amount: 50.0,
    description: "Wallet top-up via M-Pesa",
    date: "2024-01-19T16:45:00Z",
    status: "completed",
    category: "topup",
  },
  {
    id: "tx_4",
    type: "debit",
    amount: 12.0,
    description: "Content Creator agent",
    date: "2024-01-19T09:20:00Z",
    status: "completed",
    category: "purchase",
  },
  {
    id: "tx_5",
    type: "credit",
    amount: 8.5,
    description: "Referral bonus",
    date: "2024-01-18T11:30:00Z",
    status: "completed",
    category: "bonus",
  },
  {
    id: "tx_6",
    type: "debit",
    amount: 20.0,
    description: "Code Assistant subscription",
    date: "2024-01-17T14:15:00Z",
    status: "pending",
    category: "subscription",
  },
];

const Wallet = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [filterType, setFilterType] = useState("all");
  const [topupAmount, setTopupAmount] = useState("");

  const filteredTransactions = mockTransactions.filter(
    (tx) => filterType === "all" || tx.type === filterType,
  );

  const getTransactionIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      earnings: <TrendingUp className="w-4 h-4 text-green-500" />,
      subscription: <CreditCard className="w-4 h-4 text-blue-500" />,
      topup: <Plus className="w-4 h-4 text-primary" />,
      purchase: <ArrowUpRight className="w-4 h-4 text-orange-500" />,
      bonus: <Award className="w-4 h-4 text-purple-500" />,
    };
    return (
      icons[category] || (
        <DollarSign className="w-4 h-4 text-muted-foreground" />
      )
    );
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "bg-green-500/20 text-green-400 border-green-500/30",
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      failed: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[status] || colors.completed;
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
          <motion.div variants={itemVariants}>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Wallet
              </h1>
              <p className="text-muted-foreground">
                Manage your funds and track transactions
              </p>
            </div>
          </motion.div>

          {/* Balance Cards */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <WalletIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        ${mockWalletData.balance.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Available Balance
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        ${mockWalletData.pendingBalance.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Pending Balance
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        ${mockWalletData.totalEarned.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Earned
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        ${mockWalletData.totalSpent.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Spent
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-4 bg-card/40 backdrop-blur-sm">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="flex items-center gap-2"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="hidden sm:inline">Transactions</span>
                </TabsTrigger>
                <TabsTrigger value="topup" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Top Up</span>
                </TabsTrigger>
                <TabsTrigger
                  value="savings"
                  className="flex items-center gap-2"
                >
                  <PiggyBank className="w-4 h-4" />
                  <span className="hidden sm:inline">Savings</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quick Actions */}
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Funds
                      </Button>
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Send Money
                      </Button>
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Withdraw Funds
                      </Button>
                      <Link to="/payment" className="block">
                        <Button
                          className="w-full justify-start"
                          variant="outline"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Upgrade to Pro
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Recent Transactions */}
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ArrowUpRight className="w-5 h-5" />
                        Recent Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {mockTransactions.slice(0, 5).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 bg-card/30 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {getTransactionIcon(transaction.category)}
                            <div>
                              <div className="font-medium text-foreground text-sm">
                                {transaction.description}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(
                                  transaction.date,
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`font-medium text-sm ${
                                transaction.type === "credit"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {transaction.type === "credit" ? "+" : "-"}$
                              {transaction.amount.toFixed(2)}
                            </div>
                            <Badge
                              className={getStatusColor(transaction.status)}
                              variant="outline"
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <ArrowUpRight className="w-5 h-5" />
                        Transaction History
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-card/30 rounded-lg hover:bg-card/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                              {getTransactionIcon(transaction.category)}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">
                                {transaction.description}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(transaction.date).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-lg font-semibold ${
                                transaction.type === "credit"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {transaction.type === "credit" ? "+" : "-"}$
                              {transaction.amount.toFixed(2)}
                            </div>
                            <Badge
                              className={getStatusColor(transaction.status)}
                              variant="outline"
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Top Up Tab */}
              <TabsContent value="topup" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Add Funds
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Amount
                        </label>
                        <Input
                          type="number"
                          value={topupAmount}
                          onChange={(e) => setTopupAmount(e.target.value)}
                          placeholder="Enter amount..."
                          className="bg-background/50"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {[10, 25, 50, 100, 250, 500].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => setTopupAmount(amount.toString())}
                            className="text-xs"
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <Button
                          className="w-full justify-start"
                          variant="outline"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Credit/Debit Card
                        </Button>
                        <Button
                          className="w-full justify-start"
                          variant="outline"
                        >
                          <Smartphone className="w-4 h-4 mr-2" />
                          M-Pesa
                        </Button>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        disabled={!topupAmount || parseFloat(topupAmount) <= 0}
                      >
                        Add ${topupAmount || "0"} to Wallet
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Payment Methods
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-card/30 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <CreditCard className="w-5 h-5 text-blue-500" />
                          <span className="font-medium text-foreground">
                            Credit Card
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Instant top-up with Visa, Mastercard, or American
                          Express
                        </p>
                      </div>

                      <div className="p-4 bg-card/30 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <Smartphone className="w-5 h-5 text-green-500" />
                          <span className="font-medium text-foreground">
                            M-Pesa
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Quick and secure mobile money transfer
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Savings Tab */}
              <TabsContent value="savings" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PiggyBank className="w-5 h-5" />
                      Savings Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">
                          ${mockWalletData.currentSavings.toFixed(2)} / $
                          {mockWalletData.savingsGoal.toFixed(2)}
                        </span>
                      </div>

                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${(mockWalletData.currentSavings / mockWalletData.savingsGoal) * 100}%`,
                          }}
                        />
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round(
                            (mockWalletData.currentSavings /
                              mockWalletData.savingsGoal) *
                              100,
                          )}
                          %
                        </div>
                        <div className="text-sm text-muted-foreground">
                          $
                          {(
                            mockWalletData.savingsGoal -
                            mockWalletData.currentSavings
                          ).toFixed(2)}{" "}
                          to go
                        </div>
                      </div>

                      <Button className="w-full" variant="outline">
                        Update Savings Goal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wallet;
