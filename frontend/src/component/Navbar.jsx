import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ onSearch }) {
  const { logout, user } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(15, 12, 41, 0.75)",
        backdropFilter: "blur(30px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 72,
          px: { xs: 2, md: 4 },
          display: "flex",
          gap: 2,
        }}
      >
        
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              background:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 20px rgba(102,126,234,0.45)",
            }}
          >
            <RocketLaunchIcon sx={{ color: "#fff" }} />
          </Box>

          {!isMobile && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#fff",
                letterSpacing: 0.4,
                whiteSpace: "nowrap",
              }}
            >
              Task Manager
            </Typography>
          )}
        </Box>


        {!isMobile && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 420,
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                px: 2,
                py: 0.8,
                borderRadius: 3,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                transition: "all 0.3s ease",
                "&:focus-within": {
                  borderColor: "#667eea",
                  boxShadow: "0 0 0 3px rgba(102,126,234,0.25)",
                  background: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <SearchIcon sx={{ color: "#667eea" }} />
              <InputBase
                placeholder="Search tasks..."
                value={query}
                onChange={handleSearch}
                sx={{
                  color: "#fff",
                  width: "100%",
                  fontSize: "0.95rem",
                  "& input::placeholder": {
                    color: "rgba(255,255,255,0.45)",
                  },
                }}
              />
            </Box>
          </Box>
        )}

        
        <Box display="flex" alignItems="center" gap={2}>
          {!isMobile && (
            <Avatar
              sx={{
                width: 36,
                height: 36,
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 16px rgba(102,126,234,0.4)",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
          )}

          <IconButton
            onClick={logout}
            sx={{
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              transition: "all 0.3s ease",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 6px 18px rgba(102,126,234,0.45)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
