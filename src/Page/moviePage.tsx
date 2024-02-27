import { useParams } from "react-router-dom";
import { MovieService } from "../service/movieService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DetailGetRes } from "../model/Response/detailGetRes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";

function MoviePage() {
  const navItems = ["HOME"];
  const params = useParams();
  const navigate = useNavigate();
  const movieService = new MovieService();
  const id = params.id;

  const [detail, setDetail] = useState<DetailGetRes>();

  useEffect(() => {
    const loadDataAsync = async () => {
      const res = await movieService.SearchById(id!);
      setDetail(res);
    };
    loadDataAsync();
  }, []);

  return (
    <>
      <AppBar position="fixed" style={{ height: "60px" }}>
        <Toolbar style={{ width: "82%", margin: "0 auto" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/889/889199.png"
            alt=""
            width={"90px"}
            style={{ padding: "10px" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>
          <Box>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }} onClick={() => {}}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <div
        style={{
          margin: "0 auto",
          marginTop: "70px",
          width: "80%",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosIcon style={{ fontSize: "30px" }}></ArrowBackIosIcon>
          <h1 style={{ color: "#E3AF00" }}>back</h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ fontSize: "40px" }}>{detail?.Title}</h1>
          <div style={{ width: "40%", display: "flex", justifyContent: "end" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>IMDB RATING</h4>
              </div>
              <div style={{ display: "flex" }}>
                <StarIcon sx={{ color: "#E3AF00", width: "20px" }}></StarIcon>
                <h4>{detail?.imdbRating}/10</h4>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {detail?.Year}
          <CircleIcon style={{ fontSize: "3px", padding: "5px" }}></CircleIcon>
          {detail?.Rated}
          <CircleIcon style={{ fontSize: "3px", padding: "5px" }}></CircleIcon>
          {detail?.Runtime}
        </div>
      </div>

      <div
        style={{
          margin: "0 auto",
          width: "80%",
          height: "400px",
          display: "flex",
          marginTop: "10px",
        }}
      >
        <img
          height={"100%"}
          width={"20%"}
          style={{ margin: "2px" }}
          src={detail?.Poster}
          alt=""
        />
        <iframe
          width="60%"
          height="100%"
          style={{ margin: "2px" }}
          src={`https://www.youtube.com/embed/null`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div style={{ width: "20%" }}>
          <div
            style={{
              background: "linear-gradient(to left, #707070, #3E3E3E)",
              width: "100%",
              height: "50%",
              margin: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <VideoLibraryIcon style={{ fontSize: "30px" }}></VideoLibraryIcon>
              <br />
              <h5>99+ VIDEOS</h5>
            </div>
          </div>
          <div
            style={{
              background: "linear-gradient(to left, #707070, #3E3E3E)",
              width: "100%",
              height: "50%",
              margin: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PhotoLibraryIcon style={{ fontSize: "30px" }}></PhotoLibraryIcon>
              <br />
              <h5>99+ PHOTOS</h5>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          margin: "0 auto",
          width: "80%",
          height: "100px",
          marginTop: "40px",
          display: "flex",
        }}
      >
        <div style={{ width: "70%" }}>
          <p>{detail?.Plot}</p>
          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "#7B7B7B",
              marginTop: "20px",
            }}
          />
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <h3>Director</h3>
            <h3 style={{ marginLeft: "10px", color: "#2E48DA" }}>
              {detail?.Director}
            </h3>
          </div>
          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "#7B7B7B",
              marginTop: "20px",
            }}
          />
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <h3>Writers</h3>
            <h3 style={{ marginLeft: "10px", color: "#2E48DA" }}>
              {detail?.Writer}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviePage;
