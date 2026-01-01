import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Grow,
  InputAdornment,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Navbar from "../component/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [profile, setProfile] = useState({});
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [editTask, setEditTask] = useState({ id: "", title: "" });

  const headers = { authorization: token };

  const loadData = async () => {
    const userRes = await axios.get(
      "http://localhost:5000/api/user/profile",
      { headers }
    );
    const taskRes = await axios.get(
      "http://localhost:5000/api/tasks",
      { headers }
    );
    setProfile(userRes.data);
    setTasks(taskRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers }
    );
    setTitle("");
    loadData();
  };

  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`,
      { headers }
    );
    loadData();
  };

  const openEditDialog = (task) => {
    setEditTask({ id: task._id, title: task.title });
    setOpenEdit(true);
  };

  const updateTask = async () => {
    if (!editTask.title.trim()) return;
    await axios.put(
      `http://localhost:5000/api/tasks/${editTask.id}`,
      { title: editTask.title },
      { headers }
    );
    setOpenEdit(false);
    loadData();
  };

  return (
    <>
      <Navbar />

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
        <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 5, md: 6 }, position: "relative", zIndex: 1 }}>
          {/* Premium Header Section */}
          <Fade in timeout={1000}>
            <Box mb={{ xs: 4, sm: 6 }}>
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={3}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                mb={3}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: { xs: 56, sm: 72 },
                      height: { xs: 56, sm: 72 },
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "3px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                      fontSize: "2rem",
                      fontWeight: 700,
                    }}
                  >
                    {profile.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography
                      variant={isMobile ? "h5" : "h3"}
                      fontWeight={800}
                      sx={{
                        background: "linear-gradient(135deg, #fff 0%, #e0e7ff 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        mb: 0.5,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Welcome back, {profile.name}
                    </Typography>
                    <Typography 
                      variant={isMobile ? "body2" : "body1"}
                      sx={{ 
                        color: "rgba(255, 255, 255, 0.6)",
                        fontWeight: 500,
                      }}
                    >
                      Let's make today extraordinary
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={2}>
                  <Paper
                    elevation={0}
                    sx={{
                      px: 3,
                      py: 1.5,
                      background: "rgba(102, 126, 234, 0.15)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(102, 126, 234, 0.3)",
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <RocketLaunchIcon sx={{ color: "#667eea", fontSize: 24 }} />
                    <Box>
                      <Typography variant="h5" fontWeight={700} sx={{ color: "#fff", lineHeight: 1 }}>
                        {tasks.length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        Active Tasks
                      </Typography>
                    </Box>
                  </Paper>
                </Stack>
              </Stack>

              <Divider 
                sx={{ 
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: 1,
                  mb: 4,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                }} 
              />
            </Box>
          </Fade>

          {/* Premium Add Task Card */}
          <Grow in timeout={800}>
            <Card
              elevation={0}
              sx={{
                mb: 5,
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
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 28px 80px rgba(102, 126, 234, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
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
                    <AutoAwesomeIcon sx={{ color: "#fff", fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#fff", mb: 0.5 }}>
                      Create New Task
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                      What would you like to accomplish today?
                    </Typography>
                  </Box>
                </Box>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    placeholder="Enter your task here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTask()}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TrendingUpIcon sx={{ color: "#667eea" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderRadius: 3,
                        color: "#fff",
                        fontSize: "1.05rem",
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
                      "& .MuiInputBase-input::placeholder": {
                        color: "rgba(255, 255, 255, 0.4)",
                      },
                    }}
                  />
                  <Button
                    size="large"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addTask}
                    sx={{
                      minWidth: { xs: "100%", sm: 180 },
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "#fff",
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: "none",
                      fontSize: "1.05rem",
                      px: 4,
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
                    }}
                  >
                    Add Task
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grow>

          {/* Premium Tasks Grid */}
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {tasks.length === 0 ? (
              <Grid item xs={12}>
                <Grow in timeout={1000}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      textAlign: "center",
                      py: { xs: 8, sm: 12 },
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(40px)",
                      border: "2px dashed rgba(255, 255, 255, 0.15)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 100, sm: 120 },
                        height: { xs: 100, sm: 120 },
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                        animation: "float 3s ease-in-out infinite",
                        "@keyframes float": {
                          "0%, 100%": { transform: "translateY(0)" },
                          "50%": { transform: "translateY(-12px)" },
                        },
                      }}
                    >
                      <RocketLaunchIcon sx={{ fontSize: { xs: 48, sm: 64 }, color: "#667eea" }} />
                    </Box>
                    <Typography 
                      variant={isMobile ? "h5" : "h4"}
                      sx={{ 
                        color: "#fff",
                        fontWeight: 700,
                        mb: 2,
                      }}
                    >
                      Your Canvas Awaits
                    </Typography>
                    <Typography 
                      variant="body1"
                      sx={{ 
                        color: "rgba(255, 255, 255, 0.6)",
                        maxWidth: 480,
                        mx: "auto",
                      }}
                    >
                      Start your journey by creating your first task and watch your productivity soar
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ) : (
              tasks.map((task, index) => (
                <Grid item xs={12} sm={6} lg={4} key={task._id}>
                  <Grow in timeout={400 + index * 100}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)",
                        backdropFilter: "blur(40px)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "4px",
                          height: "100%",
                          background: "linear-gradient(180deg, #667eea, #764ba2)",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        },
                        "&:hover": {
                          transform: "translateY(-12px) scale(1.02)",
                          boxShadow: "0 24px 60px rgba(102, 126, 234, 0.3)",
                          border: "1px solid rgba(102, 126, 234, 0.4)",
                          "&::before": {
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2,
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              boxShadow: "0 4px 16px rgba(102, 126, 234, 0.4)",
                            }}
                          >
                            <CheckCircleOutlineIcon sx={{ color: "#fff", fontSize: 22 }} />
                          </Box>
                          <Typography
                            fontWeight={600}
                            variant="body1"
                            sx={{
                              wordBreak: "break-word",
                              color: "#fff",
                              lineHeight: 1.7,
                              flex: 1,
                            }}
                          >
                            {task.title}
                          </Typography>
                        </Box>

                        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />

                        <Stack direction="row" spacing={1.5}>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => openEditDialog(task)}
                            sx={{
                              borderRadius: 2.5,
                              textTransform: "none",
                              fontWeight: 600,
                              borderColor: "rgba(102, 126, 234, 0.4)",
                              color: "#667eea",
                              borderWidth: 2,
                              py: 1.2,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                borderColor: "#667eea",
                                backgroundColor: "rgba(102, 126, 234, 0.15)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                              },
                            }}
                          >
                            {isMobile ? "" : "Edit"}
                          </Button>
                          <IconButton
                            onClick={() => deleteTask(task._id)}
                            sx={{
                              border: "2px solid rgba(239, 83, 80, 0.4)",
                              borderRadius: 2.5,
                              color: "#ef5350",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "rgba(239, 83, 80, 0.15)",
                                borderColor: "#ef5350",
                                transform: "translateY(-2px) rotate(5deg)",
                                boxShadow: "0 4px 12px rgba(239, 83, 80, 0.3)",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>

      {/* Premium Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "linear-gradient(135deg, rgba(15, 12, 41, 0.98) 0%, rgba(48, 43, 99, 0.98) 100%)",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.6)",
            overflow: "visible",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #667eea, #764ba2, #667eea)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        />
        <DialogTitle 
          sx={{ 
            fontWeight: 700,
            color: "#fff",
            fontSize: "1.75rem",
            pt: 4,
            pb: 2,
          }}
        >
          Edit Your Task
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 3 }}>
          <TextField
            fullWidth
            autoFocus
            label="Task Title"
            value={editTask.title}
            onChange={(e) =>
              setEditTask({ ...editTask, title: e.target.value })
            }
            onKeyPress={(e) => e.key === "Enter" && updateTask()}
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#fff",
                fontSize: "1.05rem",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  borderWidth: 2,
                },
                "&:hover fieldset": {
                  borderColor: "rgba(102, 126, 234, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                  borderWidth: 2,
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
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2, gap: 2 }}>
          <Button 
            onClick={() => setOpenEdit(false)}
            sx={{ 
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2.5,
              px: 3,
              py: 1.2,
              color: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={updateTask}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2.5,
              px: 4,
              py: 1.2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #7c91f7 0%, #8a5cb5 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px rgba(102, 126, 234, 0.5)",
              },
            }}
          >
            Update Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}