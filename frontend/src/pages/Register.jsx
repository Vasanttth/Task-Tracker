import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Link,
  InputAdornment,
  IconButton,
  Stack,
  Fade,
  Grow,
  Zoom,
  Alert,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SecurityIcon from "@mui/icons-material/Security";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    setError("");

    
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://task-tracker-sm7e.onrender.com/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          minHeight="100vh"
          alignItems="center"
          justifyContent="center"
          spacing={4}
        >
          
          <Grid
            item
            md={6}
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
            justifyContent="center"
          >
            <Fade in timeout={1000}>
              <Box px={6}>

                <Zoom in timeout={1200}>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: 5,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 4,
                      boxShadow: "0 20px 60px rgba(102, 126, 234, 0.4)",
                      animation: "float 3s ease-in-out infinite",
                      "@keyframes float": {
                        "0%, 100%": { transform: "translateY(0)" },
                        "50%": { transform: "translateY(-20px)" },
                      },
                    }}
                  >
                    <RocketLaunchIcon sx={{ fontSize: 72, color: "#fff" }} />
                  </Box>
                </Zoom>

                <Typography
                  variant="h2"
                  fontWeight={800}
                  sx={{
                    background: "linear-gradient(135deg, #fff 0%, #e0e7ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: 2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Join TaskFlow
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    mb: 4,
                    fontWeight: 500,
                    lineHeight: 1.6,
                  }}
                >
                  Start your journey to extraordinary productivity and seamless task management
                </Typography>

                
                <Stack spacing={3}>
                  {[
                    {
                      icon: <TrendingUpIcon />,
                      title: "Boost Productivity",
                      desc: "Organize and prioritize tasks effortlessly",
                    },
                    {
                      icon: <FlashOnIcon />,
                      title: "Lightning Fast",
                      desc: "Optimized performance for smooth experience",
                    },
                    {
                      icon: <SecurityIcon />,
                      title: "Secure & Private",
                      desc: "Your data is encrypted and protected",
                    },
                  ].map((feature, index) => (
                    <Grow in timeout={1400 + index * 200} key={index}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 3,
                            background: "rgba(102, 126, 234, 0.15)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(102, 126, 234, 0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#667eea",
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="body1"
                            fontWeight={700}
                            sx={{ color: "#fff", mb: 0.5 }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                          >
                            {feature.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </Grow>
                  ))}
                </Stack>
              </Box>
            </Fade>
          </Grid>

          
          <Grid item xs={12} sm={10} md={6} lg={5}>
            <Grow in timeout={800}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                  backdropFilter: "blur(40px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow:
                    "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background:
                      "linear-gradient(90deg, #667eea, #764ba2, #667eea)",
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
                      <PersonAddOutlinedIcon sx={{ color: "#fff", fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography variant="h5" fontWeight={700} sx={{ color: "#fff", mb: 0.5 }}>
                        Create Account
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        Join us and start your journey
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

                  
                  <Stack spacing={3}>
                    
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        setError("");
                      }}
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

                    
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        setError("");
                      }}
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
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => {
                        setForm({ ...form, password: e.target.value });
                        setError("");
                      }}
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

                    
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={acceptTerms}
                          onChange={(e) => {
                            setAcceptTerms(e.target.checked);
                            setError("");
                          }}
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
                          I accept the{" "}
                          <Link
                            href="#"
                            sx={{
                              color: "#667eea",
                              fontWeight: 600,
                              textDecoration: "none",
                              "&:hover": {
                                color: "#7c91f7",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            Terms & Conditions
                          </Link>
                        </Typography>
                      }
                    />

                    
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      disabled={loading}
                      onClick={submit}
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
                          background:
                            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
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
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>


                    <Divider sx={{ my: 1 }}>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", px: 2 }}>
                        or sign up with
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


                    <Box textAlign="center" mt={2}>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        Already have an account?{" "}
                        <Link
                          component="button"
                          type="button"
                          onClick={() => navigate("/")}
                          sx={{
                            color: "#667eea",
                            fontWeight: 700,
                            textDecoration: "none",
                            cursor: "pointer",
                            "&:hover": {
                              color: "#7c91f7",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Sign In
                        </Link>
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Fade in timeout={1600}>
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.4)",
            zIndex: 1,
          }}
        >
          © 2025 TaskFlow. All rights reserved.
        </Typography>
      </Fade>
    </Box>
  );
}