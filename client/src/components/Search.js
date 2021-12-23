import React, {useCallback, useState} from 'react';
import './search.css';
import Listing from './Listing'; 

const initialListings = 12;
let arrayForHoldingListings = [];
let disabledButton = false ;
let sorted = false;

function Search() {
  // intializing state variables
  const [listings, setListings] = useState([]);
  const [listingsToShow, setListingsToShow] = useState([]); 
  const [sortedNecklaces, setSortedNecklaces] = useState([]); 
  const [sortedBracelets, setSortedBracelets] = useState([]); 
  const [sortedEarrings, setSortedEarrings] = useState([]); 
  let [currentJewelrySelect, setCurrentJewelrySelect] = useState ('Show All');
  let [empty, setEmpty] = useState(false);
  
  // when the user clicks "view more" or "view less"
  const handleShowMoreListings = () => {
    if (sorted) {return;}; // cannot load more on a specific search 

    if (!disabledButton){
      const slicedListings = listings.slice(initialListings, listings.length);
      // set array for holding posts to its previous self plus the new sliced array
      arrayForHoldingListings = [...arrayForHoldingListings, ...slicedListings]; 
      setListingsToShow(arrayForHoldingListings);
      disabledButton = true ;
    } else {
      arrayForHoldingListings = listings.slice(0, initialListings); // holds 12
      setListingsToShow(arrayForHoldingListings); // renders the 12
      disabledButton = false ;
    }
  }; 

  React.useEffect(() => { 
    // fetching the etsy listing data at the endpoint in the express server
    fetch('/allListings')
    .then(res => {
      return res.json();
    })
    .then(data => {
      setListings(data); // setting the listing array to ALL the listings obtained
      arrayForHoldingListings = data.slice(0, initialListings); // holds 12
      setListingsToShow(arrayForHoldingListings); // renders the 12
      
      //Sort Necklaces, Bracelets, and Earrrings
      let tempSort = data.filter(checkIndex => {
        return (checkIndex.section === "Necklaces");
      });
      setSortedNecklaces(tempSort);

      tempSort = data.filter(checkIndex => {
        return (checkIndex.section === "Bracelets");
      });
      setSortedBracelets(tempSort);

      tempSort = data.filter(checkIndex => {
        return (checkIndex.section === "Earrings");
      });
      setSortedEarrings(tempSort);
    });   
  }, [])

  // resets search results
  function resetListings(){
    setListingsToShow(arrayForHoldingListings);
    document.getElementById('searchBar').value = '';
    sorted = false;
  }

  // drop down menu logic
  function dropSort (event){
    setCurrentJewelrySelect(event.target.innerHTML); // grabbing the users selection

    // depending on their choice, display the listings that they request
    if (event.target.innerHTML === "Bracelets"){
      setListingsToShow(sortedBracelets);
      sorted = true;
    }
    else if (event.target.innerHTML === "Necklaces"){
      setListingsToShow(sortedNecklaces);
      sorted = true;
    }
    else if (event.target.innerHTML === "Earrings"){
      setListingsToShow(sortedEarrings);
      sorted = true;
    }
    else if (event.target.innerHTML === "Show All"){
      resetListings();
    }
  }

  // logic for the search bar
  function initiateSearch(event){
    event.preventDefault(); // stops page from reloading on submit
    let search = event.target.searchBar.value;

    // sort listings to hold items that match the users search
    let tmpSort = listings.filter(index =>{
      return (index.title).toLowerCase().includes(search.toLowerCase());
    })

    sorted = true;
    setCurrentJewelrySelect("Show All"); // reset drop down
    setListingsToShow(tmpSort); // display new listings

    // handle no result case
    if (tmpSort.length === 0){
      setEmpty(true);
    } else {setEmpty(false)};
  }

  return (
    <div className="App">
       <div class="selected-images">
        <div class="image-title">
            <h5>Browse Listings</h5>
        </div>
      </div>

      <div className="search-section">
          <form onSubmit={initiateSearch} class="form-area">
            <input type="text" id="searchBar" placeholder="What are you looking for?"></input> 
            <input type="submit" value="Search" className="searchSubmit"></input>
          </form>
          <button onClick={resetListings} className="reset-btn">Reset Results</button>

        <div class="dropdown">
          <button class="dropbtn">
            {currentJewelrySelect}
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="18" y1="13" x2="12" y2="19" />
                  <line x1="6" y1="13" x2="12" y2="19" />
            </svg>
          </button>
          <div class="dropdown-content">
            <ul>
                <li className="option" onClick={dropSort}>Show All</li>
                <li className="option" onClick={dropSort}>Necklaces</li>
                <li className="option" onClick={dropSort}>Bracelets</li>
                <li className="option" onClick={dropSort}>Earrings</li>
              </ul>
          </div>
        </div>
      </div>
      <div></div>
      <Listing listingsToRender={listingsToShow} />
      <p id="search-area" class="no-result">{empty ? 'No Results: check your spelling!' : ''}</p>
      {empty ? null : <button className="load-etsy" onClick={handleShowMoreListings}>{disabledButton ? 'View Less' : 'View More'}</button>}
    </div>
  );
}

export default Search;
