import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Divider,
  Fade,
  Grow,
  Zoom,
  Alert,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (!isLogin && !formData.name) {
      setError("Name is required for registration");
      setLoading(false);
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(
        `https://task-tracker-f2t1.onrender.com${endpoint}`,
        formData
      );

      if (response.data.token) {
        login(response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        `${isLogin ? "Login" : "Registration"} failed. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(140deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "-200px",
          right: "-200px",
          animation: "pulse 15s ease-in-out infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(30, 144, 255, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "-150px",
          left: "-150px",
          animation: "pulse 12s ease-in-out infinite reverse",
        },
        "@keyframes pulse": {
          "0%, 100%": { 
            transform: "scale(1) rotate(0deg)",
            opacity: 1,
          },
          "50%": { 
            transform: "scale(1.1) rotate(180deg)",
            opacity: 0.8,
          },
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        
        <Fade in timeout={800}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Zoom in timeout={1000}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-12px)" },
                  },
                }}
              >
                <RocketLaunchIcon sx={{ fontSize: 48, color: "#fff" }} />
              </Box>
            </Zoom>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #fff 0%, #e0e7ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 1,
                letterSpacing: "-0.02em",
              }}
            >
              TaskFlow
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255, 255, 255, 0.6)", fontWeight: 500 }}
            >
              {isLogin ? "Welcome back! Let's get productive" : "Start your productivity journey"}
            </Typography>
          </Box>
        </Fade>

        
        <Grow in timeout={1000}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #667eea, #764ba2, #667eea)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s linear infinite",
              },
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "200% 0" },
                "100%": { backgroundPosition: "-200% 0" },
              },
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                  }}
                >
                  {isLogin ? (
                    <LoginIcon sx={{ color: "#fff", fontSize: 28 }} />
                  ) : (
                    <PersonAddOutlinedIcon sx={{ color: "#fff", fontSize: 28 }} />
                  )}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700} sx={{ color: "#fff", mb: 0.5 }}>
                    {isLogin ? "Sign In" : "Create Account"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    {isLogin ? "Access your dashboard" : "Join us today"}
                  </Typography>
                </Box>
              </Box>

              
              {error && (
                <Fade in>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      borderRadius: 2,
                      backgroundColor: "rgba(244, 67, 54, 0.1)",
                      border: "1px solid rgba(244, 67, 54, 0.3)",
                      color: "#ef5350",
                      "& .MuiAlert-icon": {
                        color: "#ef5350",
                      },
                    }}
                  >
                    {error}
                  </Alert>
                </Fade>
              )}

              
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  
                  {!isLogin && (
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AutoAwesomeIcon sx={{ color: "#667eea" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                          borderRadius: 3,
                          color: "#fff",
                          transition: "all 0.3s ease",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.15)",
                            borderWidth: 2,
                          },
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                            "& fieldset": {
                              borderColor: "rgba(102, 126, 234, 0.5)",
                            },
                          },
                          "&.Mui-focused": {
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                            boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15)",
                            "& fieldset": {
                              borderColor: "#667eea",
                              borderWidth: 2,
                            },
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.6)",
                          fontWeight: 600,
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#667eea",
                        },
                      }}
                    />
                  )}

                  
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: "#667eea" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderRadius: 3,
                        color: "#fff",
                        transition: "all 0.3s ease",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.15)",
                          borderWidth: 2,
                        },
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.12)",
                          "& fieldset": {
                            borderColor: "rgba(102, 126, 234, 0.5)",
                          },
                        },
                        "&.Mui-focused": {
                          backgroundColor: "rgba(255, 255, 255, 0.12)",
                          boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15)",
                          "& fieldset": {
                            borderColor: "#667eea",
                            borderWidth: 2,
                          },
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.6)",
                        fontWeight: 600,
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#667eea",
                      },
                    }}
                  />

                  
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: "#667eea" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderRadius: 3,
                        color: "#fff",
                        transition: "all 0.3s ease",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.15)",
                          borderWidth: 2,
                        },
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.12)",
                          "& fieldset": {
                            borderColor: "rgba(102, 126, 234, 0.5)",
                          },
                        },
                        "&.Mui-focused": {
                          backgroundColor: "rgba(255, 255, 255, 0.12)",
                          boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15)",
                          "& fieldset": {
                            borderColor: "#667eea",
                            borderWidth: 2,
                          },
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.6)",
                        fontWeight: 600,
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#667eea",
                      },
                    }}
                  />

                  
                  {isLogin && (
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            sx={{
                              color: "rgba(255, 255, 255, 0.6)",
                              "&.Mui-checked": {
                                color: "#667eea",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                            Remember me
                          </Typography>
                        }
                      />
                      <Link
                        href="#"
                        underline="hover"
                        sx={{
                          color: "#667eea",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          "&:hover": {
                            color: "#7c91f7",
                          },
                        }}
                      >
                        Forgot Password?
                      </Link>
                    </Stack>
                  )}

                  
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "#fff",
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: "none",
                      fontSize: "1.05rem",
                      py: 1.8,
                      boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                        transition: "left 0.5s",
                      },
                      "&:hover": {
                        background: "linear-gradient(135deg, #7c91f7 0%, #8a5cb5 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 32px rgba(102, 126, 234, 0.5)",
                        "&::before": {
                          left: "100%",
                        },
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                      "&:disabled": {
                        background: "rgba(102, 126, 234, 0.3)",
                        color: "rgba(255, 255, 255, 0.5)",
                      },
                    }}
                  >
                    {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
                  </Button>

                  
                  <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", px: 2 }}>
                      or continue with
                    </Typography>
                  </Divider>

                  
                  <Stack direction="row" spacing={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<GoogleIcon />}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 600,
                        py: 1.5,
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        color: "#fff",
                        borderWidth: 2,
                        "&:hover": {
                          borderColor: "rgba(255, 255, 255, 0.4)",
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Google
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 600,
                        py: 1.5,
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        color: "#fff",
                        borderWidth: 2,
                        "&:hover": {
                          borderColor: "rgba(255, 255, 255, 0.4)",
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      GitHub
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grow>

        
        <Fade in timeout={1200}>
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                component="button"
                type="button"
                onClick={toggleMode}
                underline="hover"
                sx={{
                  color: "#667eea",
                  fontWeight: 700,
                  cursor: "pointer",
                  "&:hover": {
                    color: "#7c91f7",
                  },
                }}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </Link>
            </Typography>
          </Box>
        </Fade>

        
        <Fade in timeout={1400}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.4)",
              mt: 4,
            }}
          >
            © 2025 TaskFlow. All rights reserved.
          </Typography>
        </Fade>
      </Container>
    </Box>
  );
}