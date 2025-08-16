import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Brain,
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useNormalToast } from "@/hooks/use-normal-toast";
import { useDestructiveToast } from "@/hooks/use-destructive-toast";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (tokenParam) {
      setToken(tokenParam);
      setIsValidToken(true);
      // Auto-verify if token is present
      handleVerifyEmail(tokenParam);
    }

    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerifyEmail = async (verificationToken: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/verify-email", {
        token: verificationToken,
      });

      if (response.status === 200) {
        setIsVerified(true);
        useNormalToast("Email verified successfully!");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(
          err.response.data.detail || "Invalid or expired verification token",
        );
      } else {
        setError("Email verification failed. Please try again.");
      }
      useDestructiveToast("Email verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0 || !email) return;

    setIsResending(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/auth/request-email-verification",
        {
          email: email,
        },
      );

      if (response.status === 200) {
        useNormalToast("Verification email sent successfully!");
        setResendCooldown(60); // 60 second cooldown
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        // Don't reveal if email exists or not
        useNormalToast(
          "If the email exists, a verification link has been sent",
        );
        setResendCooldown(60);
      } else {
        setError("Failed to resend verification email. Please try again.");
        useDestructiveToast("Failed to resend verification email");
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleRequestVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsResending(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/auth/request-email-verification",
        {
          email: email,
        },
      );

      if (response.status === 200) {
        useNormalToast("Verification email sent successfully!");
        setResendCooldown(60);
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        // Don't reveal if email exists or not
        useNormalToast(
          "If the email exists, a verification link has been sent",
        );
        setResendCooldown(60);
      } else {
        setError("Failed to send verification email. Please try again.");
        useDestructiveToast("Failed to send verification email");
      }
    } finally {
      setIsResending(false);
    }
  };

  if (!isValidToken && !email) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
        <div
          className="absolute inset-0 bg-dot-pattern opacity-30"
          style={{ backgroundSize: "20px 20px" }}
        />

        <motion.div
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Email Verification
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your email address to receive a verification link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleRequestVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={handleEmailInput}
                      className="bg-background/50 border-border focus:border-primary pl-10"
                      disabled={isResending}
                    />
                  </div>
                </div>

                {error && (
                  <motion.div
                    className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  size="lg"
                  disabled={isResending || !email}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending Verification Email...
                    </>
                  ) : (
                    "Send Verification Email"
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
        <div
          className="absolute inset-0 bg-dot-pattern opacity-30"
          style={{ backgroundSize: "20px 20px" }}
        />

        <motion.div
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Email Verified Successfully!
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your email has been verified. Redirecting to sign in...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mx-auto">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>

              <div className="space-y-2">
                <p className="text-foreground font-medium text-center">
                  Email verified successfully!
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  You'll be redirected to sign in shortly.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-dot-pattern opacity-30"
        style={{ backgroundSize: "20px 20px" }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-accent rounded-xl shadow-glow">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">ncAGENTS</span>
          </div>
          <p className="text-muted-foreground">
            {isVerified
              ? "Email verified successfully!"
              : "Verify your email address"}
          </p>
        </motion.div>

        {/* Email Verification Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                {isVerified ? "Verification Complete!" : "Check Your Email"}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {isVerified
                  ? "Your email has been verified. Redirecting to sign in..."
                  : email
                    ? `We've sent a verification link to ${email}`
                    : "Enter your email to receive a verification link"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isVerified && (
                <>
                  {error && (
                    <motion.div
                      className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {isLoading && (
                    <div className="text-center space-y-4">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Verifying your email...
                      </p>
                    </div>
                  )}

                  {email && !isLoading && (
                    <div className="text-center space-y-4">
                      <div className="space-y-2">
                        <p className="text-foreground font-medium">
                          Verification link sent to:
                        </p>
                        <p className="text-primary font-semibold">{email}</p>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>Didn't receive the email? Check your spam folder.</p>
                        <p>The link will expire in 24 hours.</p>
                      </div>

                      <Button
                        onClick={handleResendVerification}
                        variant="outline"
                        className="w-full"
                        disabled={resendCooldown > 0 || isResending}
                      >
                        {isResending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : resendCooldown > 0 ? (
                          `Resend in ${resendCooldown}s`
                        ) : (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Resend Verification Email
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}

              <div className="text-center">
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
