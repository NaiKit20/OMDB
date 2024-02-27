import { MovieService } from "../service/movieService";
import InputBase from "@mui/material/InputBase";
import { MovieGetRes } from "../model/Response/movieGetRes";
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

function HomePage() {
  const navItems = ["HOME"];
  const movieService = new MovieService();
  const input = useRef<HTMLInputElement>();

  const [movie, setMovie] = useState<MovieGetRes>();
  const [pageCount, setPageCount] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [movieName, setMovieName] = useState<string>();
  const [pageNumbers, setPageNumbers] = useState<number[]>(
    Array.from({ length: 0 }, (_, index) => index + 1)
  );

  const navigate = useNavigate();

  const navigateTo = (value: string) => {
    navigate("/movie/" + value);
  };

  ///////////////////////////////////////////////
  const [startIndex, setStartIndex] = useState<number>(0);

  const displayPageNumbers = pageNumbers.slice(startIndex, startIndex + 10);

  const nextPage = () => {
    if (startIndex + 10 < pageNumbers.length) {
      setStartIndex(startIndex + 10);
    }
  };

  const prevPage = () => {
    if (startIndex - 10 >= 0) {
      setStartIndex(startIndex - 10);
    }
  };
  ///////////////////////////////////////////////

  useEffect(() => {
    const loadDataAsync = async () => {};
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
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "99%",
                height: "25px",
                backgroundColor: "white",
                border: "2px solid #FEE63B",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, color: "#000000" }}
                placeholder="Search IMDb"
                inputRef={input}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={async () => {
                  if (input.current) {
                    const res = await movieService.SearchMovie(
                      input.current.value + "&page=" + page
                    );
                    setMovieName(input.current.value);
                    setMovie(res);
                    setPageNumbers(
                      Array.from(
                        { length: Math.ceil(parseInt(res.totalResults) / 10) },
                        (_, index) => index + 1
                      )
                    );
                  }
                }}
              >
                <SearchIcon sx={{ color: "#000000" }} />
              </IconButton>
            </Paper>
          </Typography>
          <Box>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={() => {
                  console.log(movie?.Search);
                  console.log(pageCount);
                  console.log(movieName);
                }}
              >
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
        {movie?.Search.map((item) => (
          <div
            style={{ padding: "3px" }}
            onClick={() => navigateTo(item.imdbID)}
          >
            <Card style={{ width: "100%", height: "200px", display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: 151, height: "100%" }}
                image={item.Poster}
                alt="Live from space album cover"
              />
              <div style={{ marginLeft: "20px" }}>
                <h1 style={{ fontSize: "25px" }}>{item.Title}</h1>
                <p>{item.Year}</p>
                <p>{item.Type}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div>
        <div style={{ padding: "1px", border: "1px solid red" }}>
          {displayPageNumbers.map((pageNumber) => (
            <button
              style={{ margin: "5px" }}
              key={pageNumber}
              onClick={async () => {
                const res = await movieService.SearchMovie(
                  movieName + "&page=" + pageNumber
                );
                setMovie(res);
              }}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button onClick={prevPage} disabled={startIndex === 0}>
          ก่อนหน้า
        </button>
        <button
          onClick={nextPage}
          disabled={startIndex + 10 >= pageNumbers.length}
        >
          ถัดไป
        </button>
      </div>

    </>
  );
}

export default HomePage;
