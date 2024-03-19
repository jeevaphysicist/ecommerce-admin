"use client";
import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete, EditCalendarOutlined, EditNote } from "@mui/icons-material";
import Link from "next/link";
import Popup from "./Popup";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductCard = ({ product, DeleteHandler }) => {
  const [isPopup, setIsPopup] = React.useState(false);

  const handlePopup = (action) => {
    if (action) DeleteHandler(product._id);
    setIsPopup(!isPopup);
  };



  return (
    <Fragment>
      {isPopup ? <Popup isDelete={true} handleModel={handlePopup} /> : null}
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              A
            </Avatar>
          }
          action={
            <IconButton aria-label="share">{/* <ShareIcon /> */}</IconButton>
          }
          title="Admin"
          subheader={new Date(product.createdAt).toLocaleString()}
        />
        {/* <Link href={`/product/${product._id}`}> */}
          <CardMedia
            component="img"
            height="194"
            image={product.productImages[0]}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {product.productName}
            </Typography>
          </CardContent>
        {/* </Link> */}
        <CardActions disableSpacing>
          <IconButton aria-label="Edit">
            <Link href={`/product/edit-product/${product._id}`}>
              <EditNote />
            </Link>
          </IconButton>
          <IconButton aria-label="Delete">
            <Delete onClick={() => setIsPopup(true)} />
          </IconButton>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default ProductCard;
