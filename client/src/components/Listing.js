import React from "react";
import './listing.css';

/*
A listing is required for each individual item in the shop.
Data obtained from the etsy endpoint is mapped to the elements for an item card
*/

function Listing (props){
  // every element must have a unique key
  return (
    <div className="listing-container" key={props.listingsToRender.title + "array"}>
        {props.listingsToRender.map(post => (
          <a className="listing-box" href={post.url} target="_blank" key={post.url}>
            <div className="image-box">
              <img src={post.image} className="listing-image" alt={post.title} key={post.title + "image"}/>
            </div>
            <p className="etsy-title" key={post.title}>{post.title}</p>
            <p className="etsy-section" key={post.section}>{post.section}</p>
            <p className="etsy-price" key={post.currencyCode}>{"$" + post.price + " " + post.currencyCode}</p>
            <div key={post.title + "div"}>
              <p className="etsy-tag" key={post.title + "p"}>Materials</p>
              <div className="etsy-tag-box" key={post.title + "div2"}>
                {post.materials.slice(0,4).map( tag => (
                  <p className="etsy-tags" key={tag}>{tag}</p>
                ))}
              </div>
            </div>
          </a>
        ))}
    </div>
  );
};

export default Listing;